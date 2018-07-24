const debug = require('debug')('postcss-css-variables:plugin');
const postcss = require('postcss');
const specificityLib = require('specificity');
const generateSelectorBranchesFromPostcssNode = require('postcss-node-scope-utility/lib/generate-branches');
const isSelectorBranchUnderScope = require('postcss-node-scope-utility/lib/is-branch-under-scope');

const {
	RE_VAR_PROP,
	RE_VAR_FUNC
} = require('./lib/var-regex');
const expandVarUsageFromVarDefinition = require('./lib/expand-var-usage-from-var-definition');



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

const cssvariables = postcss.plugin('postcss-css-variables', function(options) {

	var opts = Object.assign({}, defaults, options);

	return function (css, result) {
		// Map of variable names to a list of declarations
		let map = {};


		// Add the js defined variables `opts.variables` to the map
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		const rootNode = postcss.rule({ selector: ':root' });
		if(opts.variables && Object.keys(opts.variables).length > 0 && opts.preserve && opts.preserveInjectedVariables) {
			css.prepend(rootNode);
		}

		Object.keys(opts.variables).forEach(function(variableKey) {
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
				selectorBranches: generateSelectorBranchesFromPostcssNode(rootNode)
			});

			if(opts.preserve && opts.preserveInjectedVariables) {
				const variableDecl = postcss.decl({ prop: variableName, value: variableValue });
				rootNode.append(variableDecl);
			}
		});




		// Collect all of the variables defined `--foo: #f00;`
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		const usageDeclsToSkip = [];
		eachCssVariableDeclaration(css, function(variableDecl) {
			// We cache the parent rule because after decl removal, it will be undefined
			const variableDeclParentRule = variableDecl.parent;
			const variableName = variableDecl.prop;
			const variableValue = variableDecl.value;
			const isImportant = variableDecl.important || false;
			const variableSelectorBranches = generateSelectorBranchesFromPostcssNode(variableDeclParentRule);

			debug(`Collecting ${variableName}=${variableValue} isImportant=${isImportant} from ${variableDeclParentRule.selector.toString()}`);

			const variableEntry = {
				name: variableName,
				value: variableValue,
				isImportant,
				selectorBranches: variableSelectorBranches
			};

			map[variableName] = (map[variableName] || []).concat(variableEntry);


			// Expand/rollout/unroll variable usage
			// Where we define variables, also add in any usage that falls under scope
			// ex.
			// Before:
			// .foo { --color: #f00; color: var(--color); }
			// .foo:hover { --color: #0f0; };
			// After:
			// .foo { --color: #f00; color: var(--color); }
			// .foo:hover { --color: #0f0; color: var(--color); }
			// --------------------------------
			css.walkDecls(function(usageDecl) {
				if(
					// Avoid iterating a var declaration `--var: #f00`
					RE_VAR_PROP.test(usageDecl.prop) ||
					// Make sure this decl has `var()` usage
					!RE_VAR_FUNC.test(usageDecl.value) ||
					// Avoid duplicating the usage decl on itself
					variableDeclParentRule === usageDecl.parent ||
					// Avoid iterating a clone we may have just added before
					usageDeclsToSkip.some((skipDecl) => skipDecl === usageDecl)
				) {
					return;
				}

				// TODO: Is there a way to walk the decls backwards so we can get the @media queries in the correct order
				const newUsageDecl = expandVarUsageFromVarDefinition(variableEntry, variableDecl, usageDecl);
				// Keep track of the cloned decls we should skip over
				usageDeclsToSkip.push(newUsageDecl);
			});



			// Remove the variable declaration because they are pretty much useless after we resolve them
			if(!opts.preserve) {
				variableDecl.remove();
			}
			// Or we can also just show the computed value used for that variable
			else if(opts.preserve === 'computed') {
				// TODO: put computed value here
			}
			// Otherwise just leave them alone
			// else {}

			// Clean up the rule that declared them if it doesn't have anything left after we potentially remove the variable decl
			let currentNodeToCheckEmpty = variableDeclParentRule;
			while(currentNodeToCheckEmpty && currentNodeToCheckEmpty.nodes.length === 0) {
				const nodeToRemove = currentNodeToCheckEmpty;
				currentNodeToCheckEmpty = nodeToRemove.parent;
				nodeToRemove.remove();
			}
		});

		debug('map', map);

		debug('After collecting variables ------');
		debug(css.toString());
		debug('---------------------------------');




		// Resolve variable values
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		// TODO





		// Split comma separated selectors into separate rules
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		// TODO




		// Resolve variable usage everywhere `var(--foo)`
		// ---------------------------------------------------------
		// ---------------------------------------------------------
		css.walkDecls(function(decl) {
			// Avoid any variable decls, `--foo: var(--bar);`, that may have been preserved
			if(!RE_VAR_PROP.test(decl.prop)) {
				const selectorBranches = generateSelectorBranchesFromPostcssNode(decl.parent);
				console.log('selectorBranches', selectorBranches.map((branch) => branch.selector.toString()));

				const newDeclValue = decl.value.replace(new RegExp(RE_VAR_FUNC.source, 'g'), (match, variableName, fallback) => {
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

								debug(`isUnderScope=${isUnderScope} compareSpecificity=${compareSpecificity(specificity, currentGreatestSpecificity)} specificity=${specificity}`, variableSelectorBranch.selector.toString(), '|', selectorBranch.selector.toString(), '-->', variableEntry.value)

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

					// We use 'undefined' value as a string to avoid making other plugins down the line unhappy, see #22
					return resultantValue || 'undefined';
				});


				if(newDeclValue !== decl.value) {
					let potentialClone = decl;
					if(opts.preserve === true) {
						potentialClone = decl.cloneBefore();
					}

					// We `cloneBefore` and put the value on the clone so that
					// `walkDecl` doesn't try to iterate on the new decl
					potentialClone.value = newDeclValue;
				}

			}
		});



		debug('postcss-css-variables completed -');
		debug(css.toString());
		debug('---------------------------------');

	};
});


module.exports = cssvariables;
