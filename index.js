// PostCSS CSS Variables (postcss-css-variables)
// v0.3.5
//
// https://github.com/MadLittleMods/postcss-css-variables

// For Debugging
//var nomo = require('node-monkey').start({port: 50501});

var postcss = require('postcss');
var extend = require('extend');

var cloneSpliceParentOntoNodeWhen = require('./lib/clone-splice-parent-onto-node-when');
var findNodeAncestorWithSelector = require('./lib/find-node-ancestor-with-selector');
var resolveValue = require('./lib/resolve-value');
var isNodeUnderScope = require('./lib/is-node-under-scope');
var generateScopeList = require('./lib/generate-scope-list');
var gatherVariableDependencies = require('./lib/gather-variable-dependencies');


// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS)
// `--foo`
// See: http://dev.w3.org/csswg/css-variables/#custom-property
var RE_VAR_PROP = (/(--(.+))/);




function eachCssVariableDeclaration(css, cb) {
	// Loop through all of the declarations and grab the variables and put them in the map
	css.eachDecl(function(decl, index) {
		// If declaration is a variable
		if(RE_VAR_PROP.test(decl.prop)) {
			cb(decl);
		}
	});
}


function eachMapItemUnderAtRuleUsedByVariable(variablesUsedList, map, decl, cb) {
	// Now find any at-rule declarations that pertains to each rule
	// Loop through the variables used
	variablesUsedList.forEach(function(variableUsedName) {

		// Find anything in the map that corresponds to that variable
		gatherVariableDependencies(variablesUsedList, map).deps.forEach(function(mapItem) {
			if(mapItem.isUnderAtRule) {
				
				// Get the inner-most selector of the at-rule scope variable declaration we are matching
				//		Because the inner-most selector will be the same for each branch, we can look at the first one [0] or any of the others
				var varDeclScopeList = generateScopeList(mapItem.parent, true);
				var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
				var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, decl.parent);

				// Splice on where the selector starts matching the selector inside at-rule
				// See: `test/fixtures/cascade-on-nested-rules.css`
				var varDeclAtRule = mapItem.parent.parent;
				var mimicDecl = cloneSpliceParentOntoNodeWhen(decl, varDeclAtRule, function(ancestor) {
					return ancestor === nodeToSpliceParentOnto;
				});


				//console.log('amd og', generateScopeList(decl.parent, true));
				//console.log('amd', generateScopeList(mimicDecl.parent, true));
				//console.log(generateScopeList(mapItem.parent, true));
				//console.log('amd isNodeUnderScope', isNodeUnderScope(mimicDecl.parent, mapItem.parent), mapItem.decl.value);

				// If it is under the proper scope,
				// we need to check because we are iterating over all map entries that are `isUnderAtRule`
				// Then lets create the new rules
				if(isNodeUnderScope(mimicDecl.parent, mapItem.parent)) {
					cb(mimicDecl, mapItem);
				}
			}
		});
	});
}





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
			Object.keys(opts.variables).reduce(function(prevVariableMap, variableName) {
				var variableEntry = opts.variables[variableName];
				// Automatically prefix any variable with `--` (CSS custom property syntax) if it doesn't have it already
				variableName = variableName.slice(0, 2) === '--' ? variableName : '--' + variableName;
				var variableValue = (variableEntry || {}).value || variableEntry;
				var isImportant = (variableEntry || {}).isImportant || false;


				// Add a root node to the AST
				var variableRootRule = postcss.rule({ selector: ':root' });
				css.root().prepend(variableRootRule);
				// Add the variable decl to the root node
				var varDecl = postcss.decl({
					prop: variableName,
					value: variableValue
				});
				varDecl.moveTo(variableRootRule);

				// Add the entry to the map
				prevVariableMap[variableName] = (prevVariableMap[variableName] || []).concat({
					decl: varDecl,
					prop: variableName,
					calculatedInPlaceValue: variableValue,
					isImportant: isImportant,
					variablesUsed: [],
					parent: variableRootRule,
					isUnderAtRule: false
				});

				return prevVariableMap;
			}, {})
		);


		// Chainable helper function to log any messages (warnings)
		var logResolveValueResult = function(valueResult) {
			// Log any warnings that might of popped up
			var warningList = [].concat(valueResult.warnings);
			warningList.forEach(function(warningArgs) {
				warningArgs = [].concat(warningArgs);
				result.warn.apply(result, warningArgs);
			});

			// Keep the chain going
			return valueResult;
		};


		// Collect all of the variables defined
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		eachCssVariableDeclaration(css, function(decl) {
			var declParentRule = decl.parent;

			var valueResults = logResolveValueResult(resolveValue(decl, map));
			// Split out each selector piece into its own declaration for easier logic down the road
			decl.parent.selectors.forEach(function(selector) {
				// Create a detached clone
				var splitOutRule = decl.parent.clone().removeAll();
				splitOutRule.selector = selector;
				splitOutRule.parent = decl.parent.parent;

				var declClone = decl.clone();
				declClone.moveTo(splitOutRule);

				var prop = decl.prop;
				map[prop] = (map[prop] || []).concat({
					decl: declClone,
					prop: prop,
					calculatedInPlaceValue: valueResults.value,
					isImportant: decl.important || false,
					variablesUsed: valueResults.variablesUsed,
					parent: splitOutRule,
					// variables inside root or at-rules (eg. @media, @support)
					isUnderAtRule: splitOutRule.parent.type === 'atrule'
				});
			});

			// Remove the variable declaration because they are pretty much useless after we resolve them
			if(!opts.preserve) {
				decl.removeSelf();
			}
			// Or we can also just show the computed value used for that variable
			else if(opts.preserve === 'computed') {
				decl.value = valueResults.value;
			}
			// Otherwise just keep them as var declarations
			//else {}

			// We add to the clean up list if we removed some variable declarations to make it become an empty rule
			if(declParentRule.nodes.length <= 0) {
				nodesToRemoveAtEnd.push(declParentRule);
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
				eachMapItemUnderAtRuleUsedByVariable(valueResults.variablesUsed, map, decl, function(mimicDecl, mapItem) {
					// Create the clean atRule for which we place the declaration under
					var atRuleNode = mapItem.parent.parent.clone().removeAll();

					var ruleClone = decl.parent.clone().removeAll();
					var declClone = decl.clone();
					declClone.value = logResolveValueResult(resolveValue(mimicDecl, map)).value;

					// Add the declaration to our new rule
					ruleClone.append(declClone);
					// Add the rule to the atRule
					atRuleNode.append(ruleClone);


					// Since that atRuleNode can be nested in other atRules, we need to make the appropriate structure
					var parentAtRuleNode = atRuleNode;
					var currentAtRuleNode = mapItem.parent.parent;
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


		//console.log('map', map);

		/* * /
		}
		catch(e) {
			//console.log('e', e.message);
			console.log('e', e.message, e.stack);
		}
		/* */

	};
});
