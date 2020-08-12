
var log = require('debug')('postcss-css-variables:resolve-decl');

var resolveValue = require('./resolve-value');
var generateScopeList = require('./generate-scope-list');
var gatherVariableDependencies = require('./gather-variable-dependencies');

var isUnderScope = require('./is-under-scope');
var isNodeUnderScope = require('./is-node-under-scope');

var shallowCloneNode = require('./shallow-clone-node');
var findNodeAncestorWithSelector = require('./find-node-ancestor-with-selector');
var cloneSpliceParentOntoNodeWhen = require('./clone-splice-parent-onto-node-when');

var parser = require('postcss-selector-parser');

function equals(a, b) {
	return a && b && a.type !== undefined && a.value !== undefined && a.type === b.type && a.value === b.value;
}

function compatible(a, b) {
	var af = a.filter(c => !b.find(d => equals(d, c)));
	var bf = b.filter(c => !a.find(d => equals(d, c)));
	var ac = a.find(c => c.type == 'combinator');
	var bc = b.find(c => c.type == 'combinator');

	if(bf.length == 0 && ((!ac && !bc) || equals(ac, bc)))
	{
		return true;
	}

	return false;
}

function compatible2(a, b) {
	var af = a.filter(c => !b.find(d => equals(d, c)));
	var bf = b.filter(c => !a.find(d => equals(d, c)));

	if(bf.length == 0 && af.length != 0)
	{
		return true;
	}

	return false;
}

function isSpace(a) {
	return a && a.type === 'combinator' && a.value.trim() === '';
}

function findIndex(s, fn, start)
{
	if(!start) {
		start = 0;
	}
	else {
		s = s.slice(start);
	}

	var pos = s.findIndex(fn);

	return pos === -1 ? -1 : s.findIndex(fn) + start;
}

function parseSelector(selector) {
	var ret;

	parser(selectors => {
		ret = selectors.first.split(selector => selector.type === 'combinator').map(a => a.filter(b => !isSpace(b)));
	}).processSync(selector);

	return ret;
}

function removeWildcard(selector) {
	return parser(selectors => {
		selectors.first.nodes[selectors.first.nodes.length-1].remove();
	}).processSync(selector, { updateSelector: false });
}

function eachMapItemDependencyOfDecl(variablesUsedList, map, decl, cb) {
	log('>>>>>>>>> DECL ' + decl.parent.selector + ' / ' + decl.prop + ' = ' + decl.value);

	var declSelector = decl.parent.selector ? parseSelector(decl.parent) : null;

	log(declSelector);

	// Now find any at-rule declarations that pertains to each rule
	// Loop through the variables used
	variablesUsedList.forEach(function(variableUsedName) {

		log('>>>>>> VAR '+variableUsedName);

		// Find anything in the map that corresponds to that variable
		gatherVariableDependencies(variablesUsedList, map).deps.forEach(function(mapItem, i) {

			log('>>> DEP '+i+' / ' + mapItem.parent.selector + ' / ' + mapItem.prop + ' = ' + mapItem.calculatedInPlaceValue);

			var state = 0;
			var mimicDecl;
			if(mapItem.isUnderAtRule) {

				// Get the inner-most selector of the at-rule scope variable declaration we are matching
				//		Because the inner-most selector will be the same for each branch, we can look at the first one [0] or any of the others
				var varDeclScopeList = generateScopeList(mapItem.parent, true);
				var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
				var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, decl.parent);

				// Splice on where the selector starts matching the selector inside at-rule
				// See: `test/fixtures/cascade-on-nested-rules.css`
				var varDeclAtRule = mapItem.parent.parent;
				mimicDecl = cloneSpliceParentOntoNodeWhen(decl, varDeclAtRule, function(ancestor) {
					return ancestor === nodeToSpliceParentOnto;
				});


				//console.log('amd og', generateScopeList(decl.parent, true));
				//console.log('amd', generateScopeList(mimicDecl.parent, true));
				//console.log(generateScopeList(mapItem.parent, true));
				//console.log('amd isNodeUnderScope', isNodeUnderScope(mimicDecl.parent, mapItem.parent), mapItem.decl.value);
			}
			else if(mapItem.parent.selector !== decl.parent.selector && declSelector) {
				var s = parseSelector(mapItem.parent);

				log(s);

				var append = null;
				var idx = 0;
				var process = s.length > 1;
				for(var i = 0; i < declSelector.length; i++) {
					var a = declSelector[i];
					var b = findIndex(s, c => compatible(c, a), idx);
					process |= s.findIndex(c => compatible2(c, a), idx) != -1;

					if(b < idx) {
						// no match: already compatible or wildcard
						if(i === 0) {
							state = 1;
							break;
						}
						// invalid unless last item
						else if(i != declSelector.length-1) {
							state = 2;
							break;
						}

						log('append', a);
						append = a;
					}
					else {
						// check if the element following the combinator is compatible
						if(s[b].find(a => a.type === 'combinator') && !equals(declSelector[i+1][0], s[b+1][0])) {
							state = 6;
							break;
						}

						idx = b;
					}
				}

				// #foo li:hover a @ compound16.css
				if(state === 0 && !append && idx != s.length-1) {
					state = 3;
				}

				// already compatible
				if(state === 0 && !process) {
					state = 4;
				}

				// compound20.css
				if(state === 1 && s.length != 1 && s[s.length-1].length === 1 && s[s.length-1][0].type === 'universal') {
					state = 5;
				}

				log("STATE", state);

				if(state === 0 || state === 5) {
					// Create a detached clone
					var ruleClone = shallowCloneNode(decl.parent);
					ruleClone.parent = decl.parent.parent;

					// Add the declaration to it
					mimicDecl = decl.clone();

					ruleClone.append(mimicDecl);

					if(state === 0) {
						ruleClone.selector = mapItem.parent.selector;

						// append last element of selector where needed
						if(append) {
							ruleClone.selector += ' ';
							append.forEach(a => ruleClone.selector += String(a));
						}
					}
					else if(state === 5) {
						ruleClone.selector = removeWildcard(mapItem.parent.selector).trim() + ' ' + decl.parent.selector;
					}
					else {
						throw new Error("Invalid state: "+state);
					}
				}
			}

			// If it is under the proper scope,
			// we need to check because we are iterating over all map entries
			var valid = state === 5 || (mimicDecl && isNodeUnderScope(mimicDecl, mapItem.parent, true));

			if(valid) {
				cb(mimicDecl, mapItem);
			}

			log('SELECTOR '+(mimicDecl ? mimicDecl.parent.selector : null));
			log('VALID? '+valid);
			log('<<< DEP '+i+' / ' + mapItem.parent.selector + ' / ' + mapItem.prop + ' = ' + mapItem.calculatedInPlaceValue);
		});

		log('<<<<<< VAR '+variableUsedName);
	});

	log('<<<<<<<<< DECL ' + decl.parent.selector + ' / ' + decl.prop + ' = ' + decl.value);
}




// Resolve the decl with the computed value
// Also add in any media queries that change the value as necessary
function resolveDecl(decl, map, /*optional*/shouldPreserve, /*optional*/preserveAtRulesOrder, /*optional*/logResolveValueResult) {
	shouldPreserve = (typeof shouldPreserve === "function" ? shouldPreserve(decl) : shouldPreserve) || false;
	preserveAtRulesOrder = preserveAtRulesOrder || false;

	// Make it chainable
	var _logResolveValueResult = function(valueResults) {
		if(logResolveValueResult) {
			logResolveValueResult(valueResults);
		}

		return valueResults;
	};



	// Grab the balue for this declarations
	//console.log('resolveDecl 1');
	var valueResults = _logResolveValueResult(resolveValue(decl, map));


	// Resolve the cascade dependencies
	// Now find any at-rule declarations that need to be added below each rule
	//console.log('resolveDecl 2');
	var previousAtRuleNode;
	eachMapItemDependencyOfDecl(valueResults.variablesUsed, map, decl, function(mimicDecl, mapItem) {
		var ruleClone = shallowCloneNode(decl.parent);
		var declClone = decl.clone();
		// Add the declaration to our new rule
		ruleClone.append(declClone);

		let preserveVariable;
		if(typeof shouldPreserve === "function") {
			preserveVariable = shouldPreserve(decl);
		} else {
			preserveVariable = shouldPreserve;
		}
		if(preserveVariable === true) {
			declClone.cloneAfter();
		}

		// No mangle resolve
		declClone.value = _logResolveValueResult(resolveValue(mimicDecl, map, true)).value;

		if(mapItem.isUnderAtRule) {
			// Create the clean atRule for which we place the declaration under
			var atRuleNode = shallowCloneNode(mapItem.parent.parent);

			// Add the rule to the atRule
			atRuleNode.append(ruleClone);


			// Since that atRuleNode can be nested in other atRules, we need to make the appropriate structure
			var parentAtRuleNode = atRuleNode;
			var currentAtRuleNode = mapItem.parent.parent;
			while(currentAtRuleNode.parent.type === 'atrule') {
				// Create a new clean clone of that at rule to nest under
				var newParentAtRuleNode = shallowCloneNode(currentAtRuleNode.parent);

				// Append the old parent
				newParentAtRuleNode.append(parentAtRuleNode);
				// Then set the new one as the current for next iteration
				parentAtRuleNode = newParentAtRuleNode;

				currentAtRuleNode = currentAtRuleNode.parent;
			}

			// Put the first atRuleStructure after the declaration's rule,
			// and after that, put them right after the previous one
			decl.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl.parent, parentAtRuleNode);

			// Save referance of previous atRuleStructure
			previousAtRuleNode = parentAtRuleNode
		}
		else {
			ruleClone.selector = mimicDecl.parent.selector;

			// Put the first atRuleStructure after the declaration's rule,
			// and after that, put them right after the previous one
			decl.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl.parent, ruleClone);
		}
	});


	// If we are preserving var(...) usage and the value changed meaning it had some
	if(shouldPreserve === true && decl.value !== valueResults.value) {
		decl.cloneAfter();
	}


	// Set 'undefined' value as a string to avoid making other plugins down the line unhappy
	// See #22
	if (valueResults.value === undefined) {
		valueResults.value = 'undefined';
	}


	// Set the new value after we are done dealing with at-rule stuff
	decl.value = valueResults.value;
}






module.exports = resolveDecl;
