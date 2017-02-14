
# v0.6.0 - 2016-9-23

 - Update/refactor readme
    - Thank you to [@isiahmeadows](github.com/isiahmeadows) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/36)
 - Use string value for `undefined` variables to play nice with other plugins downstream
    - Thank you to [@vincentorback](github.com/vincentorback) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/44)


# v0.5.2 - 2016-8-24

 - Fix [#42](https://github.com/MadLittleMods/postcss-css-variables/issues/42) where `opts.preserve` was not working inside at-rules
    - Thank you to [@muftiev](github.com/muftiev) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/43)


# v0.5.1 - 2015-10-24

 - Fix [postcss/postcss#611](https://github.com/postcss/postcss/issues/611) where we were trying to remove the root node on clean up
 - Improved test setup

# v0.5.0 - 2015-9-12

 - Upgrade to PostCSS v5. Fix [#20](https://github.com/MadLittleMods/postcss-css-variables/issues/20)

# v0.4.0 - 2015-7-2

 - Fix [#15](https://github.com/MadLittleMods/postcss-css-variables/issues/15)
 	 - Remove slowness from cloning the `root` with `node.clone().removeAll()`. Now using `./lib/shallow-clone-node.js` to avoid cloning children which will get removed right after.
 	 - Thank you to [@ddprrt](https://github.com/ddprrt) for bringing up the slowness issue in this article, [PostCSS misconceptions](https://medium.com/@ddprrt/postcss-misconceptions-faf5dc5038df).



# v0.3.9 - 2015-6-29

 - Remove `opts` global leak. Fix [#13](https://github.com/MadLittleMods/postcss-css-variables/issues/13)


# v0.3.8 - 2015-5-28

 - Add support for pseudo selectors `:hover` `:before`

# v0.3.7 - 2015-5-27

 - Fix [#7](https://github.com/MadLittleMods/postcss-css-variables/issues/7): Support for child combinator
 - Added tests for child-combinator/direct-descendant coverage

# v0.3.6 - 2015-5-21

 - Fix [#6](https://github.com/MadLittleMods/postcss-css-variables/issues/6). Variable usage in comma separated selector to use proper scope

# v0.3.5 - 2015-5-12

 - Big refactor of code to reduce cyclomatic complexity. Still needs work though.
 - Fix variable referencing another variable resolution when being changed by at-rule in non-root rule

# v0.3.4 - 2015-5-12

 - Fix variable referencing another variable resolution when being changed by at-rule

# v0.3.3 - 2015-5-11

 - Add support for last piece of combinator chain in selector resolution matching.
 	 - `.foo + .bar` can match variables declared in `.bar`

# v0.3.1 - 2015-5-5

 - Large overhaul of code to make it more robust on proper scope resolution.
 - Fix [#2]](https://github.com/MadLittleMods/postcss-css-variables/issues/2)

# v0.2.3 - 2015-5-4

 - Add support for CSS4 descendant selector `>>` syntax

# v0.2.2 - 2015-5-1

 - Automatically prefix any variables defined in `options.variables` with `--` (according to CSS custom property syntax).

# v0.2.1 - 2015-4-30

 - Added support for descendant selector nesting instead of just physical space nesting
 - Fixed issue with comma separated rules. It was throwing a undefined is not a function error
 - Moved to external scope check `isUnderScope` instead of integrated into `resolveValue`
 - Added test for empty `var()` call. See [test/fixtures/empty-var-func.css](https://github.com/MadLittleMods/postcss-css-variables/blob/master/test/fixtures/empty-var-func.css)

# v0.1.0 - 2015-4-29

 - First release
