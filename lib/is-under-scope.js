var escapeStringRegexp = require('escape-string-regexp');

var isPieceIsAlwaysAncestorSelector = require('./is-piece-always-ancestor-selector');

// Given the nodes scope, and the target scope,
// Is the node in the same or under the target scope (cascade wise)
//
// Another way to think about it: Can the target cascade properties to the node?
//
// For scope-lists see: `generateScopeList`
var isUnderScope = function(nodeScopeList, scopeNodeScopeList) {
	var matchesScope = scopeNodeScopeList.some(function(scopeNodeScopePieces) {
		return nodeScopeList.some(function(nodeScopePieces) {
			var currentPieceOffset;
			var wasEveryPieceFound = scopeNodeScopePieces.every(function(scopePiece) {
				var pieceOffset = currentPieceOffset || 0;

				var foundIndex = -1;
				var firstAlwaysAncestorPieceIndex = -1;
				// Look through the remaining pieces(start from the offset)
				var piecesWeCanMatch = nodeScopePieces.slice(pieceOffset);
				piecesWeCanMatch.some(function(nodeScopePiece, index) {
					var overallIndex = pieceOffset + index;

					if(firstAlwaysAncestorPieceIndex < 0 && isPieceIsAlwaysAncestorSelector(nodeScopePiece)) {
						firstAlwaysAncestorPieceIndex = overallIndex;
					}

					// Find the scope piece at the end of the node selector
					// Last-occurence
					if(new RegExp(escapeStringRegexp(scopePiece) + '$').test(nodeScopePiece)) {
						foundIndex = overallIndex;
						// Escape
						return true;
					}
					return false;
				});
				// If the scope piece is a always-ancestor, then it is valid no matter what
				if(foundIndex < 0 && isPieceIsAlwaysAncestorSelector(scopePiece)) {
					foundIndex = pieceOffset + 1;
				}
				// The piece could be a always-ancestor selector itself
				// And we only want the first occurence so we can keep matching future scope pieces
				else if(foundIndex < 0 && firstAlwaysAncestorPieceIndex > 0) {
					foundIndex = firstAlwaysAncestorPieceIndex;
				}

				var isFurther = foundIndex > pieceOffset || (foundIndex >= 0 && currentPieceOffset === undefined);

				currentPieceOffset = foundIndex;
				return isFurther;
			});

			return wasEveryPieceFound;
		});
	});

	return matchesScope;
};

module.exports = isUnderScope;