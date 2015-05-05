// PostCSS CSS Variables (postcss-css-variables)
// v0.3.1
//
// https://github.com/MadLittleMods/postcss-css-variables

// For Debugging
//var nomo = require('node-monkey').start({port: 50501});

var postcss = require('postcss');
var extend = require('extend');

// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS)
// `--foo`
// See: http://dev.w3.org/csswg/css-variables/#custom-property
var RE_VAR_PROP = (/(--(.+))/);
// matches `name[, fallback]`, captures "name" and "fallback"
// var() = var( <custom-property-name> [, <any-value> ]? )
// See: http://dev.w3.org/csswg/css-variables/#funcdef-var
var RE_VAR_FUNC = (/var\((--[^,\s]+?)(?:\s*,\s*(.+))?\)/);


// Unit Tests: https://regex101.com/r/oP0fM9/13
//
// It is a shame the regex has to be this long. Maybe a CSS selector parser would be better.
// We could almost use `/\b\s(?![><+~][\s]+?)/` to split the selector but this doesn't work with attribute selectors
var RE_SELECTOR_DESCENDANT_SPLIT = (/(.*?(?:(?:\[[^\]]+\]|(?![><+~\s]).)+)(?:(?:(?:\s(?!>>))|(?:\t(?!>>))|(?:\s?>>\s?))(?!\s+))(?![><+~][\s]+?))/);



// Splice on a parent scope onto a node
// And return a detached clone
function cloneSpliceParentOntoNodeWhen(node, parent, /*optional*/whenCb) {
	whenCb = whenCb || function() {
		return true;
	};

	var cloneList = [];

	// Gather node ancestors and clone along the way
	var current = node;
	var isWhenNow = false;
	while(current && !isWhenNow) {
		if(current.type === 'decl') {
			cloneList.push(current.clone());
		}
		else {
			cloneList.push(current.clone().removeAll());
		}

		isWhenNow = whenCb(current);
		current = current.parent;
	}


	// Gather parent ancestors all the way up and clone along the way
	var cloneParentList = [];
	var currentParent = parent;
	while(currentParent) {
		cloneParentList.push(currentParent.clone().removeAll());

		currentParent = currentParent.parent;
	}
	// Assign parents to our parent clones
	cloneParentList.forEach(function(parentClone, index, cloneParentList) {
		// Keep assigning parents detached until the very end
		if(index+1 < cloneParentList.length) {
			parentClone.parent = cloneParentList[index+1];
		}
	});


	// Assign parents to our node clones
	cloneList.forEach(function(clone, index, cloneList) {
		// Keep assigning parents detached until the very end
		if(index+1 < cloneList.length) {
			clone.parent = cloneList[index+1];
		// Then splice on the new parent scope
		} else {
			// Set the highest parent ancestor to back to where we should splice in
			cloneParentList.slice(-1)[0].parent = current;
			// Set the node clone to the lowest parent ancestor
			clone.parent = cloneParentList[0];
		}
	});

	return cloneList[0];
}


// Find a node starting from the given node that matches
function findNodeAncestorWithSelector(selector, node) {
	var matchingNode;

	var currentNode = node;
	var stillFindingNode = true;
	// Keep going until we run out of parents to search
	// or we found the node
	while(currentNode.parent && !matchingNode) {
		// A trick to get the selector split up. Generate a scope list on a clone(clean parent)
		var currentNodeScopeList = generateScopeList(currentNode.clone(), true);

		currentNodeScopeList.some(function(scopePieces) {
			return scopePieces.some(function(scopePiece) {
				if(scopePiece === selector) {
					matchingNode = currentNode;
					return true;
				}

				return false;
			});
		});

		currentNode = currentNode.parent;
	}

	return matchingNode;
}


function generateScopeList(node, /*optional*/includeSelf) {
	includeSelf = includeSelf || false;

	var selectorScopeList = [
		// Start off with one branch
		[]
	];
	var currentNodeParent = includeSelf ? node : node.parent;
	while(currentNodeParent) {

		// `currentNodeParent.selectors` is a list of each comma separated piece of the selector
		var scopePieces = (currentNodeParent.selectors || []).map(function(selectorPiece) {
			return {
				value: selectorPiece,
				type: 'selector'
			};
		});

		// If it is a at-rule, then we need to construct the proper piece
		if(currentNodeParent.type === 'atrule') {
			scopePieces = [].concat(currentNodeParent.params).map(function(param, index) {
				return {
					value: '@' + currentNodeParent.name + ' ' + param,
					type: 'atrule'
				};
			});
		}

		// Branch each current scope for each comma separated selector
		// Otherwise just keep the [1] branch going
		var branches = (scopePieces.length > 0 ? scopePieces : [1]).map(function() {
			return selectorScopeList.map(function(scopePieces) {
				return scopePieces.slice(0);
			});
		});

		scopePieces.forEach(function(scopeObject, index) {
			// Update each selector string with the new piece
			branches[index] = branches[index].map(function(scopeStringPieces) {

				var descendantPieces = [scopeObject.value];
				// Split at any descendant combinators to properly make the scope list
				if(scopeObject.type === 'selector') {
					descendantPieces = scopeObject.value.split(RE_SELECTOR_DESCENDANT_SPLIT)
						.filter(function(piece) {
							if(piece.length > 0) {
								return true;
							}
							return false;
						})
						.map(function(piece) {
							// Trim whitespace which would be a normal descendant selector
							// and trim off the CSS4 descendant `>>` into a normal descendant selector
							return piece.trim().replace(/\s*?>>\s*?/, function(match) {
								return '';
							});
						});
				}

				// Add to the front of the array
				scopeStringPieces.unshift.apply(scopeStringPieces, descendantPieces);
				
				return scopeStringPieces;
			});
		});

		selectorScopeList = [];
		branches.forEach(function(branch) {
			selectorScopeList = selectorScopeList.concat(branch);
		});

		currentNodeParent = currentNodeParent.parent;
	}

	return selectorScopeList;
}

function isUnderScope(node, scopeNode) {

	var nodeScopeList = generateScopeList(node, true);
	var scopeNodeList = generateScopeList(scopeNode, true);

	var matchesScope = scopeNodeList.some(function(scopeNodeScopePieces) {
		return nodeScopeList.some(function(nodeScopePieces) {
			var currentPieceOffset;
			var wasEveryPieceFound = scopeNodeScopePieces.every(function(scopePiece) {
				var pieceOffset = currentPieceOffset || 0;
				// Start from the previous index and make sure we can find it
				var foundIndex = nodeScopePieces.indexOf(scopePiece, pieceOffset);
				// If it is a star or root, then it is valid no matter what
				// We might consider adding `html` and `body` to this list as well
				if(foundIndex < 0 && (scopePiece === '*' || scopePiece === ':root')) {
					foundIndex = pieceOffset + 1;
				}

				var isFurther = foundIndex > pieceOffset || (foundIndex >= 0 && currentPieceOffset === undefined);

				currentPieceOffset = foundIndex;
				return isFurther;
			});

			return wasEveryPieceFound;
		});
	});

	return matchesScope;
}


// Pass in a value string to parse/resolve and a map of available values
// and we can figure out the final value
// 
// Note: We do not modify the declaration
// Note: Resolving a declaration value without any `var(...)` does not harm the final value. 
//		This means, feel free to run everything through this function
var resolveValue = function(decl, map) {

	var resultantValue = decl.value;
	var variablesUsedInValue = [];
	var warnings = [];

	// Resolve any var(...) substitutons
	var isResultantValueUndefined = false;
	resultantValue = resultantValue.replace(new RegExp(RE_VAR_FUNC.source, 'g'), function(match, variableName, fallback) {
		variablesUsedInValue.push(variableName);

		// Loop through the list of declarations for that value and find the one that best matches
		// By best match, we mean, the variable actually applies. Criteria:
		//		- At the root
		//		- Defined in the same rule
		//		- The latest defined `!important` if any
		var matchingVarDeclMapItem;
		(map[variableName] || []).forEach(function(varDeclMapItem) {
			// Make sure the variable declaration came from the right spot
			// And if the current matching variable is already important, a new one to replace it has to be important
			var isRoot = varDeclMapItem.parent.type === 'root' || varDeclMapItem.parent.selectors[0] === ':root';

			var mimicDeclParent = decl.parent;

			//console.log(generateScopeList(mimicDeclParent, true));
			//console.log(generateScopeList(varDeclMapItem.parent, true));
			//console.log('isunderscope', isUnderScope(mimicDeclParent, varDeclMapItem.parent), varDeclMapItem.value);
			if(
				isUnderScope(mimicDeclParent, varDeclMapItem.parent) &&
				// And if the currently matched declaration is `!important`, it will take another `!important` to override it
				(!(matchingVarDeclMapItem || {}).isImportant || varDeclMapItem.isImportant)
			) {
				matchingVarDeclMapItem = varDeclMapItem;
			}
		});

		
		var replaceValue = (matchingVarDeclMapItem || {}).value || fallback;
		isResultantValueUndefined = replaceValue === undefined;
		if(isResultantValueUndefined) {
			warnings.push(["variable '" + variableName + "' is undefined and used without a fallback", { node: decl }]);
		}

		return replaceValue;
	});

	return {
		// The resolved value
		value: !isResultantValueUndefined ? resultantValue : undefined,
		// Array of variable names used in resolving this value
		variablesUsed: variablesUsedInValue,
		// Any warnings generated from parsing this value
		warnings: warnings
	};
};




module.exports = postcss.plugin('postcss-css-variables', function(options) {
	var defaults = {
		// Allows you to preserve custom properties & var() usage in output.
		// `true`, `false`, or `'computed'`
		preserve: false,
		// Define variables via JS
		// Simple key-value pair
		// or an object with a `value` property and an optional `isImportant` bool property
		variables: {}
	};
	opts = extend({}, defaults, options);

	// Work with opts here

	return function (css, result) {
		// Transform CSS AST here

		/* * /
		try {
		/* */

		// List of nodes to add at the end
		// We use this so we don't add to the tree as we are processing it (infinite loop)
		var createNodeCallbackList = [];
		// List of nodes that if empty, will be removed
		// We use this because we don't want to modify the AST when we still need to reference these later on
		var nodesToRemoveAtEnd = [];

		// Map of variable names to a list of declarations
		var map = {};

		// Add the js defined variables `opts.variables` to the map
		map = extend(
			map, 
			Object.keys(opts.variables)
				.reduce(function(prevVariableMap, variableName) {
					var variableValue = opts.variables[variableName];
					// Automatically prefix any variable with `--` (CSS custom property syntax) if it doesn't have it already
					variableName = variableName.slice(0, 2) === '--' ? variableName : '--' + variableName;


					// If they didn't pass a object, lets construct one
					if(typeof variableValue !== 'object') {
						variableValue = {
							value: variableValue,
							isImportant: false,
							parent: css.root(),
							isUnderAtRule: false
						};
					}

					prevVariableMap[variableName] = (prevVariableMap[variableName] || []).concat(extend({
						value: undefined,
						isImportant: false,
						parent: css.root(),
						isUnderAtRule: false
					}, variableValue));

					return prevVariableMap;
				}, {})
		);

		// Chainable helper function to log any messages (warnings)
		function logResolveValueResult(valueResult) {
			// Log any warnings that might of popped up
			var warningList = [].concat(valueResult.warnings);
			warningList.forEach(function(warningArgs) {
				warningArgs = [].concat(warningArgs);
				result.warn.apply(result, warningArgs);
			});

			// Keep the chain going
			return valueResult;
		}


		// Collect all of the variables defined
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		var addedRules = [];
		css.eachRule(function(rule) {
			// We don't want infinite recursion possibly, so don't iterate over the rules we add inside
			var shouldNotIterateOverThisRule = addedRules.some(function(addedRule) {
				return addedRule === rule;
			});
			if(shouldNotIterateOverThisRule) {
				return;
			}


			var numberOfStartingChildren = rule.nodes.length;

			// Loop through all of the declarations and grab the variables and put them in the map
			rule.eachDecl(function(decl, index) {
				var prop = decl.prop;
				// If declaration is a variable
				if(RE_VAR_PROP.test(prop)) {
					var resolvedValue = logResolveValueResult(resolveValue(decl, map)).value;
					if(resolvedValue !== undefined) {
						// Split out each selector piece into its own declaration for easier logic down the road
						decl.parent.selectors.forEach(function(selector, index) {
							// Create a detached clone
							var splitOutRule = rule.clone();
							rule.selector = selector;
							splitOutRule.parent = rule.parent;

							map[prop] = (map[prop] || []).concat({
								prop: prop,
								value: resolvedValue,
								isImportant: decl.important || false,
								// variables inside root or at-rules (eg. @media, @support)
								parent: splitOutRule,
								isUnderAtRule: splitOutRule.parent.type === 'atrule'
							});
						});
					}

					// Remove the variable declaration because they are pretty much useless after we resolve them
					if(!opts.preserve) {
						decl.removeSelf();
					}
					// Or we can also just show the computed value used for that variable
					else if(opts.preserve === 'computed') {
						decl.value = resolvedValue;
					}
					// Otherwise just keep them as var declarations
				}
			});

			// We don't want to mess up their code if they wrote a empty rule
			// We add to the clean up list if we removed some variable declarations to make it become empty
			if(numberOfStartingChildren > 0 && rule.nodes.length <= 0) {
				nodesToRemoveAtEnd.push(rule);
			}
		});




		// Resolve variables everywhere
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		css.eachDecl(function(decl) {
			// Ignore any variable declarations that we may be preserving from earlier
			// Don't worry, they are already processed
			// If not a variable decalaraton... then resolve
			if(!RE_VAR_PROP.test(decl.prop)) {


				// Grab the balue for this declarations
				var valueResults = logResolveValueResult(resolveValue(decl, map));

				// Resolve the cascade
				// Now find any at-rule declarations that need to be added below each rule
				// Loop through the variables used
				valueResults.variablesUsed.forEach(function(variableUsedName) {
					// Find anything in the map that corresponds to that variable
					(map[variableUsedName] || []).forEach(function(varDeclMapItem) {
						if(varDeclMapItem.isUnderAtRule) {
							

							// Get the inner-most selector of the at-rule scope variable declaration we are matching
							// Because the inner-most selector will be the same for each branch, we can look in any of them
							var varDeclScopeList = generateScopeList(varDeclMapItem.parent, true);
							var selector = varDeclScopeList[0].slice(-1)[0];

							var currentNodeToSpliceParentOnto = findNodeAncestorWithSelector(selector, decl.parent);

							var varDeclAtRule = varDeclMapItem.parent.parent;
							var mimicDecl = cloneSpliceParentOntoNodeWhen(decl, varDeclAtRule, function(ancestor) {
								return ancestor === currentNodeToSpliceParentOnto;
							});



							//console.log('amd og', generateScopeList(decl.parent, true));
							//console.log('amd', generateScopeList(mimicDecl.parent, true));
							//console.log(generateScopeList(varDeclMapItem.parent, true));
							//console.log('amd isunderscope', isUnderScope(mimicDecl.parent, varDeclMapItem.parent), varDeclMapItem.value);
							

							// If it is under the proper scope
							// Then lets create the new rules
							if(isUnderScope(mimicDecl.parent, varDeclMapItem.parent)) {
								// Create the clean atRule for which we place the declaration under
								var atRuleNode = varDeclMapItem.parent.parent.clone().removeAll();

								var ruleClone = decl.parent.clone().removeAll();
								var declClone = decl.clone();
								declClone.value = logResolveValueResult(resolveValue(mimicDecl, map)).value;

								// Add the declaration to our new rule
								ruleClone.append(declClone);
								// Add the rule to the atRule
								atRuleNode.append(ruleClone);


								// Since that atRuleNode can be nested in other atRules, we need to make the appropriate structure
								var parentAtRuleNode = atRuleNode;
								var currentAtRuleNode = varDeclMapItem.parent.parent;
								while(currentAtRuleNode.parent.type === 'atrule') {
									// Create a new clean clone of that at rule to nest under
									var newParentAtRuleNode = currentAtRuleNode.parent.clone().removeAll();

									// Append the old parent
									newParentAtRuleNode.append(parentAtRuleNode);
									// Then set the new one as the current for next iteration
									parentAtRuleNode = newParentAtRuleNode;

									currentAtRuleNode = currentAtRuleNode.parent;
								}

								createNodeCallbackList.push(function() {
									// Put the atRuleStructure after the declaration's rule
									decl.parent.parent.insertAfter(decl.parent, parentAtRuleNode);
								});
							}
							
						}
					});
				});


				// If we are preserving var(...) usage and the value changed meaning it had some
				if(opts.preserve === true && decl.value !== valueResults.value) {
					createNodeCallbackList.push(function() {
						decl.cloneAfter();

						// Set the new value after we are done dealing with at-rule stuff
						decl.value = valueResults.value;
					});
				}
				else {
					// Set the new value after we are done dealing with at-rule stuff
					decl.value = valueResults.value;
				}
				
			}
		});



		// Add some nodes that we need to add
		// We use this so we don't add to the tree as we are processing it (infinite loop)
		createNodeCallbackList.forEach(function(cb) {
			cb();
		});

		// Clean up any nodes we don't want anymore
		nodesToRemoveAtEnd.forEach(function(currentChildToRemove) {
			// If we removed all of the declarations in the rule(making it empty), then just remove it
			var currentNodeToPossiblyCleanUp = currentChildToRemove;
			while(currentNodeToPossiblyCleanUp && currentNodeToPossiblyCleanUp.nodes.length <= 0) {
				var nodeToRemove = currentNodeToPossiblyCleanUp;
				// Get a reference to it before we remove and lose reference to the child after removing it
				currentNodeToPossiblyCleanUp = currentNodeToPossiblyCleanUp.parent;

				nodeToRemove.removeSelf();
			}
		});


		//console.log(map);

		/* * /
		}
		catch(e) {
			console.log('e', e.message, e.stack);
		}
		/* */

	};
});
