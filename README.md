# PostCSS CSS Variables

[![npm version](https://badge.fury.io/js/postcss-css-variables.svg)](http://badge.fury.io/js/postcss-css-variables) [![Build Status](https://travis-ci.org/MadLittleMods/postcss-css-variables.svg)](https://travis-ci.org/MadLittleMods/postcss-css-variables) [![Gitter](https://badges.gitter.im/MadLittleMods/postcss-css-variables.svg)](https://gitter.im/MadLittleMods/postcss-css-variables?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[PostCSS](https://github.com/postcss/postcss) plugin to transform [`CSS Custom Properties (CSS variables)`](http://dev.w3.org/csswg/css-variables/) syntax into a static representation. This plugin provides a future-proof way of using **most** of CSS variables features, including selector cascading with some caveats, because this can only see the CSS, not the potentially dynamic HTML and DOM the CSS is applied to.

### Install

```
npm install postcss-css-variables --save-dev
```

### Table of Contents

 - [Code Playground](#code-playground)
 - [Usage](#usage)
 - [Syntax](#syntax)
	 - [Defining Custom Properties: the `--*` family of properties](#defining-custom-properties-the----family-of-properties)
	 - [Using Cascading Variables: the `var()` notation](#using-cascading-variables-the-var-notation)
 - [Features](#features)
	 - [At-rules like `@media`, `@support`, etc.](#at-rules-like-media-support-etc)
	 - [Pseudo-classes and Elements](#pseudo-classes-and-elements)
	 - [Nested Rules](#nested-rules)
	 - [`calc()`](#calc)
 - [Why?](#why)
	 - [Interoperability](#interoperability)
	 - [Differences from `postcss-custom-properties`](#differences-from-postcss-custom-properties)
 - [Caveats](#caveats)
 - [Options](#options)
 - [Quick Reference/Notes](#quick-referencenotes)
 - [Testing](#testing)
 - [Changelog](https://github.com/MadLittleMods/postcss-css-variables/blob/master/CHANGELOG.md)


# Code Playground

[Try it in the playground](https://madlittlemods.github.io/postcss-css-variables/playground/) and see what you think! Just add some CSS and see to see the final transformed/compiled CSS. You can try anything here in the playground, too.


# Usage

[*For more general PostCSS usage, look here.*](https://github.com/postcss/postcss#usage)

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


# Syntax

### Defining Custom Properties: the `--*` family of properties

A [custom property](http://dev.w3.org/csswg/css-variables/#defining-variables) is any property whose name starts with two dashes (U+002D HYPHEN-MINUS). A property must be in a rule.

You may declare them in a special `:root` selector that represents the root DOM node.

```css
:root {
	--foo-width: 100px;
	--foo-bg-color: rgba(255, 0, 0, 0.85);
}
```

You may also declare them in a normal selector.

```css
.foo {
	--foo-width: 100px;
	--foo-bg-color: rgba(255, 0, 0, 0.85);
}
```

A custom property can be declared multiple times, but only the last one takes precedence.

```css
:root {
	--foo-width: 100px;
	--foo-width: 200px; /* This is the declaration used. */
}

.foo {
	--foo-width: 100px;
}

.foo {
	--foo-width: 200px; /* This is the declaration used. */
}
```

*[W3C Draft: CSS Custom Properties for Cascading Variables, section 2](http://dev.w3.org/csswg/css-variables/#defining-variables)*

### Using Cascading Variables: the `var()` notation

You can use a CSS variable with [`var(--variable-name)`](http://dev.w3.org/csswg/css-variables/#using-variables).

```css
.foo {
	width: var(--foo-width);
	/* You can even provide a fallback */
	background: var(--foo-bg-color, #ff0000);
}
```

*[W3C Draft: CSS Custom Properties for Cascading Variables, section 3](http://dev.w3.org/csswg/css-variables/#using-variables)*


# Features

### At-rules like `@media`, `@support`, etc.

It's perfectly okay to declare CSS variables inside media queries and the like. It'll work just as you would expect.

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

This will be transformed to:

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

### Pseudo-classes and Elements

Psuedo-classes are also dealt with correctly, because it's easy to statically determine.

```css
.foo {
	--foo-color: red;
	color: var(--foo-color);
}

.foo:hover {
	--foo-color: green;
}
```

This will be transformed to:

```css
.foo {
	color: red;
}

.foo:hover {
	color: green;
}
```

### Nested Rules

This pairs very well with [`postcss-nested`](https://github.com/postcss/postcss-nested) or [`postcss-nesting`](https://github.com/jonathantneal/postcss-nesting), adding support for nested rules. For either one, you must use that plugin before `postcss-css-variables` in your setup so the `&` references can be expanded first (`postcss-css-variables` doesn't understand them). For example, with `postcss-nested`, your PostCSS setup can look like this:


```js
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');
var nestedcss = require('postcss-nested');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

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

For a simple example with nesting:

```css
.box-foo {
	--some-width: 150px;
	width: var(--some-width);

	.box-bar {
		width: var(--some-width);
	}
}
```

With also `postcss-nesting`, this will be transformed to:

```css
.box-foo {
	width: 150px;
}

.box-foo .box-bar {
	width: 150px;
}
```

For a more complex example, with a media query and a `:root` selector:

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

This will be transformed to:

```css
.box-foo {
	width: 150px;
}

.box-foo .box-bar {
	width: 150px;
}

@media (max-width: 800px) {
	.box-foo {
		width: 300px;
	}
	
	.box-foo .box-bar {
		width: 300px;
	}
}
```

### `calc()`

It also pairs well with [`postcss-calc`](https://github.com/postcss/postcss-calc) to reduce `calc()` expressions arising from using variables.

```js
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');
var calc = require('postcss-calc');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

var output = postcss([
		// Process any CSS variables
		cssvariables(/*options*/)
		// Then reduce `calc()` expressions
		calc()
	])
	.process(mycss)
	.css;

console.log(output);
```

```css
:root {
	--page-margin: 1em;
}

/* Easy centering */
.wrapper {
	width: calc(100% - 2 * var(--page-margin));
	margin-left: var(--page-margin);
	margin-right: var(--page-margin);
}
```

This will be transformed to:

```css
.wrapper {
	width: calc(100% - 2em);
	margin-left: 1em;
	margin-right: 1em;
}
```


# Why?

This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99) and a personal need.

There is another similar plugin available, [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), although it restricts itself much more than this, preferring spec conformance over imperfect feature support.

### Interoperability

If you are/were already using [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), this should work out of the box, without issue, and other than differences in the JavaScript API, it's a drop-in replacement. The only difference in CSS handling is that this attempts much broader support, and you can just start taking advantage immediately. Note the [caveats](#caveats), in that although this does correctly support what `postcss-custom-properties` does, there are certain edge cases it doesn't get perfectly.

### Differences from `postcss-custom-properties`

In [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), CSS variable declarations are specifically restricted to the `:root` selector. In `postcss-css-variables`, this is not the case, but they may be declared anywhere, and the values are substituted based on statically known CSS selector inheritance.

Here's a quick overview of the differences:

 - CSS variables may be declared in any selector like `.foo` or `.foo .bar:hover`, and is not limited to just `:root`
 - CSS variables may be declared in `@media`, `@support`, and other at-rules.
 - CSS variables may be declared in `:hover` and other psuedo-classes, and they are evaluated properly.
 - Variables in nested rules can be deduced with the help of [`postcss-nested`](https://github.com/postcss/postcss-nested) or [`postcss-nesting`](https://github.com/jonathantneal/postcss-nesting).

Continue to the next section to see where some of these might be unsafe to do. There are reasons behind the ethos of why the other plugin, `postcss-custom-properties`, is very limited in what it supports, due to differing opinions on whether broader, yet potentially incorrect, support is okay.


# Caveats

When declaring a CSS variable inside one selector, but consume it in another, this does make an unsafe assumption which can be non-conforming in certain edge cases. Here is an example where these limitations unavoidably result in non-conforming behavior.

Using the following CSS:

```css
.component {
  --text-color: blue;
}

.component .header {
  color: var(--text-color);
}

.component .text {
  --text-color: green;
  color: var(--text-color);
}
```
   
When nesting the markup like this, you may get incorrect behavior, because this only knows the CSS inheritance, not the HTML structure. (Note the innermost `<h1 class="Title">`.)

```html
<div class="component">
    Black

    <h1 class="title">
        Blue

        <p class="decoration">
            Green

            <h1 class="title">Blue with this plugin, but green per spec</h1>
        </p>
    </h1>
</div>
```

This spec deviation is intentional, as there's nothing this tool can do about that. [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties) avoids this problem entirely by restricting itself to just the `:root` selector. This is because the developers there would prefer to not support a feature instead of supporting it almost-correct like what this plugin does.


# Options

### `preserve` (default: `false`)

Allows you to preserve custom properties & var() usage in output.

Possible values:

 - `false`: Removes `--var` declarations and replaces `var()` with their resolved/computed values.
 - `true`: Keeps `var()` declarations in the output and has the computed value as a fallback declaration. Also keeps computed `--var` declarations.
 - `'computed'`: Keeps computed `--var` declarations in the output. Handy to make them available to your JavaScript.

### `variables` (default: `{}`)

Define an object map of variables in JavaScript that will be declared at the `:root` scope.

Can be a simple key-value pair or an object with a `value` property and an optional `isImportant` bool property.

The object keys are automatically prefixed with `--` (according to CSS custom property syntax) if you do not provide it.


```js
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
