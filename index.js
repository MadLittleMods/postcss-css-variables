const debug = require('debug')('postcss-css-variables:plugin');
const postcss = require('postcss');
const specificityLib = require('specificity');
const generateSelectorBranchesFromPostcssNode = require('postcss-node-scope-utility/lib/generate-branches');
const isSelectorBranchUnderScope = require('postcss-node-scope-utility/lib/is-branch-under-scope');

// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS)
// `--foo`
// See: http://dev.w3.org/csswg/css-variables/#custom-property
const RE_VAR_PROP = (/(--(.+))/);
const RE_VAR_FUNC = (/var\((--[^,\s]+?)(?:\s*,\s*(.+))?\)/);

function getSpecificity(selector) {
	// We only care about the first piece because we have already split the comma-separated pieces before we use this
	return specificityLib.calculate(selector)[0].specificityArray;
}

function compareSpecificity(specificityArrayA, specificityArrayB) {
	if(!specificityArrayA) return -1;
	if(!specificityArrayB) return 1;

	return specificityLib.compare(specificityArrayA, specificityArrayB);
}


function eachCssVariableDeclaration(css, cb) {
	// Loop through all of the declarations and grab the variables and put them in the map
	css.walkDecls(function(decl) {
		// If declaration is a variable
		if(RE_VAR_PROP.test(decl.prop)) {
			cb(decl);
		}
	});
}


var defaults = {
	// Allows you to preserve custom properties & var() usage in output.
	// `true`, `false`, or `'computed'`
	preserve: false,
	// Define variables via JS
	// Simple key-value pair
	// or an object with a `value` property and an optional `isImportant` bool property
	variables: {},
	// Preserve variables injected via JS with the `variables` option above
	// before serializing to CSS (`false` will remove these variables from output)
	preserveInjectedVariables: true
};

module.exports = postcss.plugin('postcss-css-variables', function(options) {

	var opts = Object.assign({}, defaults, options);

	// Work with opts here

	return function (css, result) {
		// Map of variable names to a list of declarations
		let map = {};

		// Add the js defined variables `opts.variables` to the map
		Object.keys(opts.variables).forEach(function(prevVariableMap, variableKey) {
			const variableEntry = opts.variables[variableKey];
			// Automatically prefix any variable with `--` (CSS custom property syntax) if it doesn't have it already
			const variableName = variableKey.slice(0, 2) === '--' ? variableKey : '--' + variableKey;
			const variableValue = (variableEntry || {}).value || variableEntry;
			const isImportant = (variableEntry || {}).isImportant || false;

			// Add the entry to the map
			map[variableName] = (map[variableName] || []).concat({
				name: variableName,
				value: variableValue,
				isImportant,
				selectorBranches: [':root']
			});
		});




		// Collect all of the variables defined
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		eachCssVariableDeclaration(css, function(variableDecl) {
			// We cache the parent rule because after decl removal, it will be undefined
			const variableDeclParentRule = variableDecl.parent;
			const variableName = variableDecl.prop;
			const variableValue = variableDecl.value;
			const isImportant = variableDecl.important || false;
			const variableSelectorBranchs = generateSelectorBranchesFromPostcssNode(variableDeclParentRule);

			debug(`Collecting ${variableName}=${variableValue} isImportant=${isImportant} from ${variableDeclParentRule.selector.toString()}`);

			map[variableName] = (map[variableName] || []).concat({
				name: variableName,
				value: variableValue,
				isImportant,
				selectorBranches: variableSelectorBranchs
			});


			// Expand/rollout/unroll variable usage
			// Where we define variables, also add in any usage that falls under scope
			// ex.
			// Before:
			// .foo { --color: #f00; color: var(--color); }
			// .foo:hover { --color: #0f0; };
			// After:
			// .foo { color: #f00; }
			// .foo:hover { color: #0f0; }
			// --------------------------------
			css.walkDecls(function(usageDecl) {
				// Avoid duplicating the usage decl on itself
				if(variableDeclParentRule === usageDecl.parent) {
					return;
				}

				const usageSelectorBranches = generateSelectorBranchesFromPostcssNode(usageDecl.parent);

				variableSelectorBranchs.some((variableSelectorBranch) => {
					return usageSelectorBranches.some((usageSelectorBranch) => {
						// In this case, we look whether the usage is under the scope of the definition
						const isUnderScope = isSelectorBranchUnderScope(usageSelectorBranch, variableSelectorBranch);

						debug(`Should expand usage? isUnderScope=${isUnderScope}`, usageSelectorBranch.selector.toString(), '|', variableSelectorBranch.selector.toString())

						if(isUnderScope) {
							usageDecl.value.replace(new RegExp(RE_VAR_FUNC.source, 'g'), (match, matchedVariableName) => {
								if(matchedVariableName === variableName) {
									variableDecl.after(usageDecl.clone());
								}
							});
						}

						return isUnderScope;
					});
				});
			});



			// Remove the variable declaration because they are pretty much useless after we resolve them
			if(!opts.preserve) {
				variableDecl.remove();
			}
			// Or we can also just show the computed value used for that variable
			else if(opts.preserve === 'computed') {
				// TODO: put computed value here
			}

			// Clean up the rule that declared them if it doesn't have anything left after we potentially remove the variable decl
			if(variableDeclParentRule.nodes.length <= 0) {
				variableDeclParentRule.remove();
			}
		});

		debug('map', map);

		debug('After collecting variables ------');
		debug(css.toString());
		debug('---------------------------------');


		// Resolve variables everywhere
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		css.walkDecls(function(decl) {
			// Avoid any variable decls, `--foo: var(--bar);`, that may have been preserved
			if(!RE_VAR_PROP.test(decl.prop)) {
				const selectorBranches = generateSelectorBranchesFromPostcssNode(decl.parent);

				decl.value = decl.value.replace(new RegExp(RE_VAR_FUNC.source, 'g'), (match, variableName, fallback) => {
					debug('usage', variableName);
					const variableEntries = map[variableName] || [];

					let currentGreatestSpecificity = null;
					let currentGreatestVariableEntry = null;

					// Go through all of the variables and find the one with the highest specificity
					variableEntries.forEach((variableEntry) => {
						// We only need to find one branch that matches
						variableEntry.selectorBranches.some((variableSelectorBranch) => {
							return selectorBranches.some((selectorBranch) => {
								// Look whether the variable definition is under the scope of the usage
								const isUnderScope = isSelectorBranchUnderScope(variableSelectorBranch, selectorBranch);
								const specificity = getSpecificity(variableSelectorBranch.selector.toString());

								debug(`isUnderScope=${isUnderScope} compareSpecificity=${compareSpecificity(specificity, currentGreatestSpecificity)} specificity=${specificity}`, variableSelectorBranch.selector.toString(), '|', selectorBranch.selector.toString())

								if(isUnderScope && compareSpecificity(specificity, currentGreatestSpecificity) >= 0) {
									currentGreatestSpecificity = specificity;
									currentGreatestVariableEntry = variableEntry;
								}

								return isUnderScope;
							});
						});
					});

					debug('currentGreatestVariableEntry', currentGreatestVariableEntry);

					const resultantValue = (currentGreatestVariableEntry && currentGreatestVariableEntry.value) || fallback;

					if(!resultantValue) {
						result.warn(['variable ' + variableName + ' is undefined and used without a fallback', { node: decl }]);
					}

					return resultantValue || 'undefined';
				});
			}
		});


	};
});
