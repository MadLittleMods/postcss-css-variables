var corepostcss = require('postcss');

module.exports = function(mixins) {
	var cursorCss = `& {
		cursor: pointer;
		cusror: hand;
	}`;
	
	var root = corepostcss.parse(cursorCss);

	mixins.replaceWith(root);
};