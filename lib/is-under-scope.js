var escapeStringRegexp = require('escape-string-regexp');

var isPieceAlwaysAncestorSelector = require('./is-piece-always-ancestor-selector');
var generateDirectDescendantPiecesFromSelector = require('./generate-direct-descendant-pieces-from-selector');



function asdfqwer(nodeScopeList, scopeNodeScopeList) {
	var currentPieceOffset;
	var scopePieceIndex;

	// Check each comma separated piece of the complex selector
	var doesMatchScope = scopeNodeScopeList.some(function(scopeNodeScopePieces) {
		return nodeScopeList.some(function(nodeScopePieces) {


			currentPieceOffset = null;
			var wasEveryPieceFound = true;
			// scopeNodeScopePieces.every(function(scopePiece) {
			for(scopePieceIndex = 0; scopePieceIndex < scopeNodeScopePieces.length; scopePieceIndex++) {
				var scopePiece = scopeNodeScopePieces[scopePieceIndex];
				var pieceOffset = currentPieceOffset || 0;

				var foundIndex = -1;
				// Look through the remaining pieces(start from the offset)
				var piecesWeCanMatch = nodeScopePieces.slice(pieceOffset);
				//piecesWeCanMatch.some(function(nodeScopePiece, index) {
				for(var nodeScopePieceIndex = 0; nodeScopePieceIndex < piecesWeCanMatch.length; nodeScopePieceIndex++) {
					var nodeScopePiece = piecesWeCanMatch[nodeScopePieceIndex];
					var overallIndex = pieceOffset + nodeScopePieceIndex;

					// Find the scope piece at the end of the node selector
					// Last-occurence
					if(
						// If the part on the end of the piece itself matches:
						//		scopePiece `.bar` matches node `.bar`
						//		scopePiece `.bar` matches node `.foo + .bar`
						new RegExp(escapeStringRegexp(scopePiece) + '$').test(nodeScopePiece)
					) {
						foundIndex = overallIndex;
						break;
					}


					// If the scope piece is a always-ancestor, then it is valid no matter what
					//
					// Or the node scope piece could be an always-ancestor selector itself
					// And we only want the first occurence so we can keep matching future scope pieces
					if(isPieceAlwaysAncestorSelector(scopePiece) || isPieceAlwaysAncestorSelector(nodeScopePiece)) { 
						foundIndex = overallIndex;

						break;
					}


					// Handle any direct descendant operators in each piece
					var directDescendantPieces = generateDirectDescendantPiecesFromSelector(nodeScopePiece);
					if(directDescendantPieces.length > 1) {

						var ddNodeScopeList = [].concat([directDescendantPieces]);
						var ddScopeList = [].concat([
							scopeNodeScopePieces
								.slice(scopePieceIndex)
								.reduce(function(prevScopePieces, scopePiece) {
									return prevScopePieces.concat(generateDirectDescendantPiecesFromSelector(scopePiece));
								}, [])
						]);
						var result = asdfqwer(ddNodeScopeList, ddScopeList);

						// If it matches completely
						// or there are still more pieces to match in the future
						if(result.doesMatchScope || scopePieceIndex+1 < scopeNodeScopePieces.length) {
							foundIndex = overallIndex;
							// -1 because the fo loop increments at the top
							scopePieceIndex += result.scopePieceIndex-1;
						}

						break;
					}

					if(directDescendantPieces.length > 1) {
						var asdf = scopeNodeScopePieces.slice(scopePieceIndex);

					}
				}
				

				var isFurther = foundIndex >= pieceOffset;

				currentPieceOffset = foundIndex+1;

				wasEveryPieceFound = wasEveryPieceFound && isFurther;
				if(!wasEveryPieceFound) {
					break;
				}
			}

			return wasEveryPieceFound;
		});
	});

	return {
		doesMatchScope: doesMatchScope,
		nodeScopePieceIndex: currentPieceOffset-1,
		scopePieceIndex: scopePieceIndex
	};
}





// Given the nodes scope, and the target scope,
// Is the node in the same or under the target scope (cascade wise)
//
// Another way to think about it: Can the target scope cascade properties to the node?
//
// For scope-lists see: `generateScopeList`
var isUnderScope = function isUnderScope(nodeScopeList, scopeNodeScopeList) {
	return asdfqwer(nodeScopeList, scopeNodeScopeList).doesMatchScope;
};

module.exports = isUnderScope;