

# 0.2.3 - 2015-5-4

 - Add support for CSS4 descendant selector `>>` syntax


# 0.2.2 - 2015-5-1

 - Automatically prefix any variables defined in `options.variables` with `--` (according to CSS custom property syntax).

# 0.2.1 - 2015-4-30

 - Added support for descendant selector nesting instead of just physical space nesting
 - Fixed issue with comma separated rules. It was throwing a undefined is not a function error
 - Moved to external scope check `isUnderScope` instead of integrated into `resolveValue`
 - Added test for empty `var()` call. See [test/fixtures/empty-var-func.css](https://github.com/MadLittleMods/postcss-css-variables/blob/master/test/fixtures/empty-var-func.css)

# 0.1.0 - 2015-4-29

 - First release