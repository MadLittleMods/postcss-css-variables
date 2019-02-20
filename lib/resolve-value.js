var generateScopeList = require('./generate-scope-list');
var isNodeUnderScope = require('./is-node-under-scope');
var gatherVariableDependencies = require('./gather-variable-dependencies');

var findNodeAncestorWithSelector = require('./find-node-ancestor-with-selector');
var cloneSpliceParentOntoNodeWhen = require('./clone-splice-parent-onto-node-when');



// var() = var( <custom-property-name> [, <any-value> ]? )
// matches `name[, fallback]`, captures "name" and "fallback"
// See: http://dev.w3.org/csswg/css-variables/#funcdef-var
var RE_VAR_FUNC = (/var\(\s*(--[^,\s]+?)(?:\s*,\s*(.+))?\s*\)/);

function toString(value) {
	return String(value);
}

// Pass in a value string to parse/resolve and a map of available values
// and we can figure out the final value
//
// `ignorePseudoScope`: Optional bool to determine whether the scope resolution should be left alone or not
//
// Note: We do not modify the declaration
// Note: Resolving a declaration value without any `var(...)` does not harm the final value.
//		This means, feel free to run everything through this function
var resolveValue = function(decl, map, /*optional*/ignorePseudoScope, /*internal debugging*/_debugIsInternal) {
	var debugIndent = _debugIsInternal ? '\t' : '';

	var resultantValue = toString(decl.value);
	var warnings = [];

	var variablesUsedInValueMap = {};
	// Use `replace` as a loop to go over all occurrences with the `g` flag
	resultantValue.replace(new RegExp(RE_VAR_FUNC.source, 'g'), function(match, variableName, fallback) {
		variablesUsedInValueMap[variableName] = true;
	});
	var variablesUsedInValue = Object.keys(variablesUsedInValueMap);

	//console.log(debugIndent, (_debugIsInternal ? '' : 'Try resolving'), generateScopeList(decl.parent, true), `ignorePseudoScope=${ignorePseudoScope}`, '------------------------');

	// Resolve any var(...) substitutons
	var isResultantValueUndefined = false;
	resultantValue = resultantValue.replace(new RegExp(RE_VAR_FUNC.source, 'g'), function(match, variableName, fallback) {
		// Loop through the list of declarations for that value and find the one that best matches
		// By best match, we mean, the variable actually applies. Criteria:
		//		- is under the same scope
		//		- The latest defined `!important` if any
		var matchingVarDeclMapItem;
		(map[variableName] || []).forEach(function(varDeclMapItem) {
			// Make sure the variable declaration came from the right spot
			// And if the current matching variable is already important, a new one to replace it has to be important
			var isRoot = varDeclMapItem.parent.type === 'root' || varDeclMapItem.parent.selectors[0] === ':root';

			var underScope = isNodeUnderScope(decl.parent, varDeclMapItem.parent);
			var underScsopeIgnorePseudo = isNodeUnderScope(decl.parent, varDeclMapItem.parent, ignorePseudoScope);

			//console.log(debugIndent, 'isNodeUnderScope', underScope, underScsopeIgnorePseudo, generateScopeList(varDeclMapItem.parent, true), varDeclMapItem.decl.value);

			if(
				underScsopeIgnorePseudo &&
				// And if the currently matched declaration is `!important`, it will take another `!important` to override it
				(!(matchingVarDeclMapItem || {}).isImportant || varDeclMapItem.isImportant)
			) {
				matchingVarDeclMapItem = varDeclMapItem;
			}
		});

		// Default to the calculatedInPlaceValue which might be a previous fallback, then try this declarations fallback
		var replaceValue = (matchingVarDeclMapItem || {}).calculatedInPlaceValue || (function() {
			// Resolve `var` values in fallback
			var fallbackValue = fallback;
			if(fallback) {
				var fallbackDecl = decl.clone({ parent: decl.parent, value: fallback });
				fallbackValue = resolveValue(fallbackDecl, map, false, /*internal*/true).value;
			}

			return fallbackValue;
		})();
		// Otherwise if the dependency health is good(no circular or self references), dive deeper and resolve
		if(matchingVarDeclMapItem !== undefined && !gatherVariableDependencies(variablesUsedInValue, map).hasCircularOrSelfReference) {
			// Splice the declaration parent onto the matching entry

			var varDeclScopeList = generateScopeList(decl.parent.parent, true);
			var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
			var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, matchingVarDeclMapItem.decl.parent);
			// See: `test/fixtures/cascade-with-calc-expression-on-nested-rules`
			var matchingMimicDecl = cloneSpliceParentOntoNodeWhen(matchingVarDeclMapItem.decl, decl.parent.parent, function(ancestor) {
				return ancestor === nodeToSpliceParentOnto;
			});

			replaceValue = resolveValue(matchingMimicDecl, map, false, /*internal*/true).value;
		}

		isResultantValueUndefined = replaceValue === undefined;
		if(isResultantValueUndefined) {
			warnings.push(['variable ' + variableName + ' is undefined and used without a fallback', { node: decl }]);
		}

		//console.log(debugIndent, 'replaceValue', replaceValue);

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

resolveValue.RE_VAR_FUNC = RE_VAR_FUNC;


module.exports = resolveValue;
