[![npm version](https://badge.fury.io/js/postcss-css-variables.svg)](http://badge.fury.io/js/postcss-css-variables) [![Build Status](https://travis-ci.org/MadLittleMods/postcss-css-variables.svg)](https://travis-ci.org/MadLittleMods/postcss-css-variables)

# PostCSS CSS Variables

[PostCSS](https://github.com/postcss/postcss) plugin to transform [`CSS Custom Properties(CSS variables)`](http://dev.w3.org/csswg/css-variables/) syntax into a static representation. This plugin provides a future-proof way of using **most** of CSS variables features.

CSS variables or CSS Custom Properties limited subset polyfill/shim.

We strive for the most complete transformation but we/no plugin can achieve true complete parity according to the [specification](http://dev.w3.org/csswg/css-variables/) because of the DOM cascade unknowns.

### [Changelog](https://github.com/MadLittleMods/postcss-css-variables/blob/master/CHANGELOG.md)

### Install

`npm install postcss-css-variables --save-dev`

# [Code Playground](https://madlittlemods.github.io/postcss-css-variables/playground/)

[Try it](https://madlittlemods.github.io/postcss-css-variables/playground/) before you install it!

Add some PostCSS and it will show you the transformed/compiled CSS.

# Usage

You can try any of these examples on the [code playground](https://madlittlemods.github.io/postcss-css-variables/playground/).

```js
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

// Process your CSS with postcss-css-variables
var output = postcss([
		cssvariables(/*options*/)
	])
	.process(mycss)
	.css;

console.log(output);
```

[*For more general PostCSS usage, see this section*](https://github.com/postcss/postcss#usage)


## At-rule support `@media`, `@support`, etc

You can add rules that declare CSS variables nested inside at-rules. You can even nest the at-rules however deep you want.

The following CSS:

```css
:root {
	--width: 100px;
}

@media (max-width: 1000px) {
	:root {
		--width: 200px;
	}
}

.box {
	width: var(--width);
}
```

will be processed to:

```css
.box {
	width: 100px;
}

@media (max-width: 1000px) {
	.box {
		width: 200px;
	}
}
```

## Pseudo class and elements

```css
.foo {
	--foo-color: #ff0000;
	color: var(--foo-color);
}

.foo:hover {
	--foo-color: #00ff00;
}
```

will be processed to:

```css
.foo {
	color: #ff0000;
}

.foo:hover {
	color: #00ff00;
}
```



## Nested rules

When using this feature, `postcss-css-variables` will output invalid CSS by itself(but you did input invalid CSS anyway). This feature is best paired with [`postcss-nested`](https://github.com/postcss/postcss-nested) in order to properly expand the rules.

Run `postcss-nested` before `postcss-css-variables` so that `postcss-nested` can properly expand the `&` references before we start resolving variable values.


```js
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');
var nestedcss = require('postcss-nested');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

// Process your CSS with postcss-css-variables
var output = postcss([
		// Flatten/unnest rules
		nestedcss,
		// Then process any CSS variables
		cssvariables(/*options*/)
	])
	.process(mycss)
	.css;

console.log(output);
```

### Simple example

The following CSS:

```css
.box-foo {
	--some-width: 150px;
	width: var(--some-width);

	.box-bar {
		width: var(--some-width);
	}
}
```

will be processed to:

```css
.box-foo {
	width: 150px;

	.box-bar {
		width: 150px;
	}
}
```

### Complex example

The following CSS:

```css
:root {
	--some-width: 150px;
}

.box-foo {
	width: var(--some-width);

	.box-bar {
		width: var(--some-width);
	}
}

@media (max-width: 800px) {
	.box-foo {
		--some-width: 300px;
	}
}
```

will be processed to:

```css
.box-foo {
	width: 150px;

	.box-bar {
		width: 150px;
	}

	@media (max-width: 800px) {
		.box-bar {
			width: 300px;
		}
	}
}

@media (max-width: 800px) {
	.box-foo {
		width: 300px;
	}
}
```



## Interoperability

`postcss-css-variables` plays really nice with [`postcss-nested`](https://github.com/postcss/postcss-nested) in order to get a larger subset of CSS variables features. *See [Nested rules, Usage section](#nested-rules)*

If you are using [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties) previously, we have a compatible feature set and more so you can switch over without having to refactor any of your code. You can just start writing the new awesome stuff.


# Why?

This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99) and a personal need.

There is another similar plugin available, [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), which at the moment, covers less of the [CSS-variable/custom-property draft/spec](http://dev.w3.org/csswg/css-variables/) compared to this plugin. It also happened to not cover the feature I was after and after dealing with it, making an incomplete prototype piggybacking off of it; I decided to write my own starting from scratch. I do use some of the same/similar unit tests because that just makes sense to get proper code coverage.

### Differences from `postcss-custom-properties`

The main features that we`postcss-css-variables` add/provide are:

 - No limitation on what scope CSS variables can be declared or used (`:root` or wherever)
 	 - Proper value substitution based on explicit DOM/structure traversal
 - At-rule support `@media`, `@support`, etc
 - Nested rules which can be fully deduced with [`postcss-nested`](https://github.com/postcss/postcss-nested).
 - Pseudo class/element support `:hover`, etc




# Syntax

### [Defining Custom Properties: the --* family of properties](http://dev.w3.org/csswg/css-variables/#defining-variables)

A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS). A property must be in a `rule`.

*Note: `:root` is nothing more than the selector for the root DOM node. You could use any other selector (class, id, etc)*
```
:root {
	--foo-width: 100px;
	--foo-bg-color: rgba(255, 0, 0, 0.85);
}
```

A custom property can be declared multiple times.

*See: [W3C Draft: CSS Custom Properties for Cascading Variables, section 2](http://dev.w3.org/csswg/css-variables/#defining-variables) for more information.*


### [Using Cascading Variables: the var() notation](http://dev.w3.org/csswg/css-variables/#using-variables)


```
.foo {
	width: var(--foo-width);
	/* You can even provide a fallback */
	background: var(--foo-bg-color, #ff0000);
}
```

*See: [W3C Draft: CSS Custom Properties for Cascading Variables, section 3](http://dev.w3.org/csswg/css-variables/#using-variables) for more information.*




# Options:

### `preserve` (default: `false`)

Allows you to preserve custom properties & var() usage in output.
Allowed values:
 - `false`: Removes `--var` declarations and replaces `var()` with their resolved/computed values.
 - `true`: Keeps `var()` declarations in the output and has the computed value as a fallback declaration. Also keeps computed `--var` declarations
 - `'computed'`: Keeps computed `--var` declarations in the output. Handy to make them available to your JavaScript.

### `variables` (default: `{}`)

Define an object map of variables in JavaScript that will be declared at the `:root` scope.

Can be a simple key-value pair or an object with a `value` property and an optional `isImportant` bool property

The object keys are automatically prefixed with `--` (according to CSS custom property syntax) if you do not provide it.


```
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');

postcss([
	cssvariables({
		variables: {
			'--some-var': '100px',
			'--other-var': {
				value: '#00ff00'
			},
			'--important-var': {
				value: '#ff0000',
				isImportant: true
			}
		}
	})
])
.process(css, opts);
```


# Quick Reference/Notes

 - This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99)
 - We provide a larger CSS variable feature subset than [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties).
 - Related links and issues:
 	 - [var declared in media query should pull in properties that use/reference that var *on `cssnext/cssnext`*](https://github.com/cssnext/cssnext/issues/99)
 	 - [Investigate support for media-query scoped properties *on `postcss/postcss-custom-properties`*](https://github.com/postcss/postcss-custom-properties/issues/9)
 	 - [remove `:root` limitation by injecting rules with new declarations that just contains modified properties. *on `postcss/postcss-custom-properties`*](https://github.com/postcss/postcss-custom-properties/issues/1)


# Testing

We have a suite of [Mocha](http://mochajs.org/) tests. If you see something that doesn't have coverage, make an issue or pull request.

Run once:

`npm install`

Run whenever you want to test:

`npm run test`
