var resolveValue = require('./resolve-value');
var generateScopeList = require('./generate-scope-list');
var gatherVariableDependencies = require('./gather-variable-dependencies');
var isNodeUnderScope = require('./is-node-under-scope');

var findNodeAncestorWithSelector = require('./find-node-ancestor-with-selector');
var cloneSpliceParentOntoNodeWhen = require('./clone-splice-parent-onto-node-when');

// Resolve the decl with the computed value
// Also add in any media queries that change the value as necessary
function resolveDecl(decl, map, /*optional*/logResolveValueResult) {
	var _logResolveValueResult = function(valueResults) {
		if(logResolveValueResult) {
			logResolveValueResult(valueResults);
		}

		return valueResults;
	};



	// Grab the balue for this declarations
	var valueResults = _logResolveValueResult(resolveValue(decl, map));
	


	// Resolve the cascade
	// Now find any at-rule declarations that need to be added below each rule
	eachMapItemUnderAtRuleUsedByVariable(valueResults.variablesUsed, map, decl, function(mimicDecl, mapItem) {
		// Create the clean atRule for which we place the declaration under
		var atRuleNode = mapItem.parent.parent.clone().removeAll();

		var ruleClone = decl.parent.clone().removeAll();
		var declClone = decl.clone();
		declClone.value = _logResolveValueResult(resolveValue(mimicDecl, map)).value;

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

		// Put the atRuleStructure after the declaration's rule
		decl.parent.parent.insertAfter(decl.parent, parentAtRuleNode);
		
	});


	// If we are preserving var(...) usage and the value changed meaning it had some
	if(opts.preserve === true && decl.value !== valueResults.value) {
		decl.cloneAfter();
	}

	// Set the new value after we are done dealing with at-rule stuff
	decl.value = valueResults.value;
	
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




module.exports = resolveDecl;