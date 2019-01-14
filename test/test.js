var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var postcss = require('postcss');
var cssvariables = require('../');
var cssnano = require('cssnano');
var normalizeWhitespace = require('postcss-normalize-whitespace');
var discardComments = require('postcss-discard-comments');

var MOCK_JS_VARIABLES =  {
	'--js-defined1': '75px',
	'--js-defined2': {
		value: '80px'
	},
	'--js-defined-important': {
		value: '#0f0',
		isImportant: true
	},
	// Should be automatically prefixed with `--`
	'js-defined-no-prefix': '#ff0000'
};

var NON_STRING_VARIABLES = {
	'number-value': 50,
	'zero-value': 0,
	'null-value': null,
	'undefined-value': undefined,
	'object-value-passed-by-mistake': {},
	'true-value': true,
	'false-value': false,
};

var testPlugin = function(filePath, expectedFilePath, options) {
	options = options || {};
	return Promise.props({
		actualBuffer: fs.readFileAsync(filePath),
		expectedBuffer: fs.readFileAsync(expectedFilePath)
	})
		.then(function({ actualBuffer, expectedBuffer }) {
			var actualResult = postcss([
				cssvariables(options),
				cssnano({
					preset: { plugins: [normalizeWhitespace, discardComments] }
				})
			])
				.process(String(actualBuffer));

			var expectedResult = postcss([
				cssnano({
					preset: { plugins: [normalizeWhitespace, discardComments] }
				})
			])
				.process(String(expectedBuffer));

			return Promise.props({
				actualResult: actualResult,
				expectedResult: expectedResult
			});
		})
		.then(({ actualResult, expectedResult }) => {
			expect(actualResult.css.replace(/\r?\n/g, '')).to.equal(expectedResult.css.replace(/\r?\n/g, ''));
		});
};

var fixtureBasePath = './test/fixtures/';
var test = function(message, fixtureName, options) {
	it(message, function() {
		return testPlugin(
			path.join(fixtureBasePath, fixtureName + '.css'),
			path.join(fixtureBasePath, fixtureName + '.expected.css'),
			options
		);
	});
};



describe('postcss-css-variables', function() {
	// Just make sure it doesn't mangle anything
	test('should work when there are no var() functions to consume declarations', 'no-var-func');
	test('should work when there are no var() functions(just `:root`) to consume declarations', 'no-var-func-just-root');
	test('should work when no variable name passed to `var()`', 'empty-var-func');


	test('should work with variables declared in root', 'root-variable');

	test('should work with locally scoped variable in a non-root rule', 'local-variable-non-root');


	test(
		'should work with any combinator selector if the last piece is the variable we have in the map',
		'scope-last-piece-of-combinator-sequence'
	);


	test('should work with descendant selector type "nesting"', 'descendant-selector');
	test('should work with css4 descendant selector type "nesting"', 'css4-descendant-selector');
	test('should work with direct descendant selector', 'direct-descendant-selector');

	test(
		'should work with direct descendant selector where variables are scoped in a descendant selector',
		'direct-descendant-selector-descendant-scope'
	);
	test(
		'should work with direct descendant selector where variables are scoped in a direct descendant selector',
		'direct-descendant-selector-direct-descendant-scope'
	);


	test('should work with pseudo selectors', 'pseudo-selector');
	//test('should work with multiple pseudo selectors', 'pseudo-multi');
	test('should work with variables declared in pseudo selectors', 'pseudo-selector-declare-variable');



	test('should work with variables defined in comma separated selector', 'comma-separated-variable-declaration');


	test('should work use the correct variable in comma separated selector', 'comma-separated-variable-usage');


	test('should work with star selector', 'star-selector-scope');

	test('should work with `!important` variable declarations', 'important-variable-declaration');



	describe('with at-rules', function() {
		test('should add rule declaration of property in @media', 'media-query');
		test('should add rule declaration of property in @support', 'support-directive');

		test('should work with nested @media', 'media-query-nested', { preserveAtRulesOrder: false });
		test('should work with nested @media, mobile first', 'media-query-nested-mobile-first', { preserveAtRulesOrder: true });

		test('should cascade to nested rules', 'cascade-on-nested-rules');

		test('should cascade with calc-expression to nested rules', 'cascade-with-calc-expression-on-nested-rules');

		test('should cascade to nested rules in the proper scope. See issue #2', 'cascade-on-nested-rules-in-proper-scope');
	});


	test('should work with variables that reference other variables', 'variable-reference-other-variable');

	test(
		'should work with variable with calc-expression that reference other variables',
		'variable-with-calc-expression-reference-other-variable'
	);

	test(
		'should work with variables that reference other variables with at-rule changing the value',
		'variable-reference-other-variable-media-query1'
	);
	test(
		'should work with local variables that reference other variables with at-rule changing the value',
		'variable-reference-other-variable-media-query2'
	);



	test('should work with variables that try to self reference', 'self-reference');
	test('should work with variables that try to self reference and fallback properly', 'self-reference-fallback');
	test('should work with circular reference', 'circular-reference');


	describe('with `options.variables`', function() {
		test(
			'should work with JS defined variables',
			'js-defined',
			{ variables: MOCK_JS_VARIABLES }
		);
		test(
			'should work with JS defined important variables',
			'js-defined-important',
			{ variables: MOCK_JS_VARIABLES }
		);
		test(
			'should preserve -- declarations and var() values with `options.variables` AND `options.preserve`',
			'js-defined-preserve',
			{
				variables: MOCK_JS_VARIABLES,
				preserve: true
			}
		);
		test(
			'should preserve var() values and clean injected declarations with `options.variables` AND `options.preserve` AND `options.preserveInjectedVariables: false`',
			'js-defined-preserve-injected',
			{
				variables: MOCK_JS_VARIABLES,
				preserve: true,
				preserveInjectedVariables: false,
			}
		);
		test(
			'should cast non-string values to string',
			'js-defined-non-string-values-casted-to-string',
			{
				variables: NON_STRING_VARIABLES
			}
		);
	});

	describe('with `options.preserve`', function() {
		test(
			'preserves variables when `preserve` is `true`',
			'preserve-variables',
			{ preserve: true }
		);

		test(
			'preserves variables in @media when `preserve` is `true`',
			'preserve-variables-in-media',
			{ preserve: true }
		);

		test(
			'preserves computed value when `preserve` is `\'computed\'`',
			'preserve-computed',
			{ preserve: 'computed' }
		);
	});


	describe('missing variable declarations', function() {
		test('should work with missing variables', 'missing-variable-usage');
		test('should use fallback value if provided with missing variables', 'missing-variable-should-fallback');
		it('should use string values for `undefined` values, see #22', function() {
			return fs.readFileAsync('./test/fixtures/missing-variable-usage.css', 'utf8')
				.then(function(buffer) {
					var contents = String(buffer);
					return postcss([
						cssvariables()
					])
					.process(contents)
					.then(function(result) {
						var root = result.root;
						var fooRule = root.nodes[0];
						expect(fooRule.selector).to.equal('.box-foo');
						var colorDecl = fooRule.nodes[0];
						expect(colorDecl.value).to.be.a('string');
						expect(colorDecl.value).to.be.equal('undefined');

						expect(result.warnings().length).to.be.equal(1);
						expect(result.warnings()[0].type).to.be.equal('warning');
						expect(result.warnings()[0].text).to.be.equal('variable --missing is undefined and used without a fallback');
					});
				});
		});
		test('should use fallback variable if provided with missing variables', 'missing-variable-should-fallback-var');
		test('should use fallback variable if provided with missing variables calc', 'missing-variable-should-fallback-calc');
		test('should use fallback variable if provided with missing variables nested', 'missing-variable-should-fallback-nested');
		test('should not mangle outer function parentheses', 'nested-inside-other-func');
	});

	it('should not parse malformed var() declarations', function() {
		return expect(testPlugin(
			'./test/fixtures/malformed-variable-usage.css',
			'./test/fixtures/malformed-variable-usage.expected.css'
			)
		).to.eventually.be.rejected;
	});

	describe('rule clean up', function() {
		test(
			'should clean up rules if we removed variable declarations to make it empty',
			'remove-empty-rules-after-variable-collection'
		);
		test(
			'should clean up neseted rules if we removed variable declarations to make it empty',
			'remove-nested-empty-rules-after-variable-collection'
		);
	});
});
