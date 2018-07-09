
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var postcss = require('postcss');
var cloneParentAncestry = require('../lib/clone-parent-ancestry');

let getDeepestChildRule = function(css) {
	let deepestNode;
	let currentNode = postcss.parse(css);
	while(currentNode) {
		//console.log(currentNode);
		let child = currentNode.first;
		if(child && child.type === 'rule') {
			deepestNode = child;
		}

		currentNode = child;
	}

	return deepestNode;
};


var test = function(message, css, expected) {
	it(message, function() {
		const node = getDeepestChildRule(css);

		const ancestry = cloneParentAncestry(node);

		expect(ancestry && ancestry.toString().replace(/(\r?\n)|\s/g, '')).to.equal(expected);
	});
};


describe('cloneParentAncestry', () => {
	test('should work with 1 rule', `.foo{}`, null);

	test('should work with nested rules', `.foo{.bar{}}`, '.foo{}');

	test('should work with nested at-rules and rules', `@media print { .foo {} }`, '@mediaprint{}');

	test('should with at-rules', `@media print { .foo { .bar{} } }`, '@mediaprint{.foo{}}');

	test('should work with 2 levels of at-rules', `
		@media print {
			@media (max-width: 1250px) {
				.foo {}
			}
		}
	`, '@mediaprint{@media(max-width:1250px){}}');

	test('should work with 3 levels of at-rules', `
		@media print {
			@media (max-width: 1250px) {
				@media (max-width: 1000px) {
					.foo {}
				}
			}
		}
	`, '@mediaprint{@media(max-width:1250px){@media(max-width:1000px){}}}');
});
