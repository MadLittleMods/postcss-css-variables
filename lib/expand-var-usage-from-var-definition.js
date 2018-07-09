const debug = require('debug')('postcss-css-variables:plugin:expand-var-usage');
const generateSelectorBranchesFromPostcssNode = require('postcss-node-scope-utility/lib/generate-branches');
const isSelectorBranchUnderScope = require('postcss-node-scope-utility/lib/is-branch-under-scope');

const {
	RE_VAR_FUNC
} = require('./var-regex');
const cloneParentAncestry = require('./clone-parent-ancestry');

function insertNodeIntoAncestry(ancestry, insertNode) {
	let deepestNode = ancestry;
	while(!deepestNode.nodes || deepestNode.nodes.length > 0) {
		deepestNode = deepestNode.nodes[0];
	}

	deepestNode.append(insertNode);
}


function expandVarUsageFromVarDefinition(variableEntry, variableDecl, usageDecl) {
	const newUsageDecl = usageDecl.clone();
	const usageSelectorBranches = generateSelectorBranchesFromPostcssNode(usageDecl.parent);

	variableEntry.selectorBranches.some((variableSelectorBranch) => {
		return usageSelectorBranches.some((usageSelectorBranch) => {
			// In this case, we look whether the usage is under the scope of the definition
			const isUnderScope = isSelectorBranchUnderScope(usageSelectorBranch, variableSelectorBranch);

			debug(`Should unroll decl? isUnderScope=${isUnderScope}`, usageSelectorBranch.selector.toString(), '|', variableSelectorBranch.selector.toString())

			// For general cases, we can put variable usage right-below the variable definition
			if(isUnderScope) {
				usageDecl.value.replace(new RegExp(RE_VAR_FUNC.source, 'g'), (match, matchedVariableName) => {
					if(matchedVariableName === variableEntry.name) {
						variableDecl.after(newUsageDecl);
					}
				});
			}
			// For at-rules
			else {
				// If there is a conditional like a atrule/media-query, then we should check whether
				// the variable can apply and put our usage within that same context
				// Before:
				// :root { --color: #f00; }
				// @media (max-width: 1000px) { :root { --color: #0f0; } }
				// .box { color: var(--color); }
				// After:
				// .box { color: #f00; }
				// @media (max-width: 1000px) {.box { color: #0f0; } }
				const hasAtRule = (variableSelectorBranch.conditionals || []).some((conditional) => {
					return conditional.type === 'atrule';
				})
				if(hasAtRule) {
					const doesVariableApplyToUsage = isSelectorBranchUnderScope(variableSelectorBranch, usageSelectorBranch, { ignoreConditionals: true });
					debug(`Should expand atrule? doesVariableApplyToUsage=${doesVariableApplyToUsage}`, variableSelectorBranch.selector.toString(), '|', usageSelectorBranch.selector.toString())

					if(doesVariableApplyToUsage) {
						// Create a new usage clone with only the usage decl
						const newUsageRule = usageDecl.parent.clone();
						newUsageRule.removeAll();
						newUsageRule.append(newUsageDecl);

						const variableAncestry = cloneParentAncestry(variableDecl.parent);
						insertNodeIntoAncestry(variableAncestry, newUsageRule);

						usageDecl.parent.cloneBefore();
						usageDecl.parent.replaceWith(variableAncestry);
					}
				}
			}

			return isUnderScope;
		});
	});

	return newUsageDecl;
}

module.exports = expandVarUsageFromVarDefinition;
