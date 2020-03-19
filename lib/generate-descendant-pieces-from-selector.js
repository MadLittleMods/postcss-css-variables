// Unit Tests: https://regex101.com/r/oP0fM9/15
//
// It is a shame the regex has to be this long. Maybe a CSS selector parser would be better.
// We could almost use `/\b\s(?![><+~][\s]+?)/` to split the selector but this doesn't work with attribute selectors
var RE_SELECTOR_DESCENDANT_SPLIT = (/(.*?(?:(?:\([^\)]+\)|\[[^\]]+\]|(?![><+~\s]).)+)(?:(?:(?:\s(?!>>))|(?:\t(?!>>))|(?:\s?>>\s?))(?!\s+))(?![><+~][\s]+?))/);

// Separate selector to classes and ids
var RE_SELECTOR_SEPARATOR = /(([\.#]?)[^\.#]+)/g;

// Helper function to get all combination of a text array
var getCombinations = function(strings) {
    var result = [];
    var f = function(prefix, strings) {
      for (var i = 0; i < strings.length; i++) {
        result.push(prefix + strings[i]);
        f(prefix + strings[i], strings.slice(i + 1));
      }
    }
    f('', strings);
    return result;
}

var generateDescendantPiecesFromSelector = function(selector) {
	return selector.split(RE_SELECTOR_DESCENDANT_SPLIT)
		.filter(function(piece) {
			if(piece.length > 0) {
				return true;
			}
			return false;
		})
		.map(function(piece) {
			// Trim whitespace which would be a normal descendant selector
			// and trim off the CSS4 descendant `>>` into a normal descendant selector
			return piece.trim().replace(/\s*?>>\s*?/g, '');
		})
		.reduce(function(result, piece) {
			if (piece.indexOf(' ') !== -1) {
				result.push(piece);
				return result;
			}
			// a.b#c => [a, .b, #c]
			var pieces = piece.match(RE_SELECTOR_SEPARATOR);
			// [a, .b, #c] => [a, a.b, a.b#c, a#c, .b, .b#c, #c]
            var combinations = getCombinations(pieces);
			result = result.concat(combinations);
            return result;
        }, []);
};

module.exports = generateDescendantPiecesFromSelector;
