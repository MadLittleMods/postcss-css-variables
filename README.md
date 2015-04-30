# PostCSS CSS Variables

PostCSS plugin to transform [`CSS Custom Properties(CSS variables)`](http://dev.w3.org/csswg/css-variables/) syntax into a static representation. This plugin provides a future-proof way of using most of CSS variables featuers.

CSS variables polyfill/shim.

We strive for the most complete transformation but we this plugin can't achieve complete parity.

## Latest Version: 0.1.0
### Changelog


# Usage

```
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');

postcss([
	cssvariables(/*options*/)
])
.process(css, opts);
```

[*For more general PostCSS usage, see this section*](https://github.com/postcss/postcss#usage)

## At-rule support `@media`, `@support`, etc

```
todo
```

will be processed to:

```
todo
```



## Interoperability

`post-css-variables` is plays really nice with [postcss-nested](https://github.com/postcss/postcss-nested) in order to get a larger subset of CSS variables features.


## Syntax

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

See: [*W3C Draft: CSS Custom Properties for Cascading Variables, section 2*](http://dev.w3.org/csswg/css-variables/#defining-variables) for more information.


### [Using Cascading Variables: the var() notation](http://dev.w3.org/csswg/css-variables/#using-variables)


```
.foo {
	width: var(--foo-width);
	/* You can even provide a fallback */
	background: var(--foo-bg-color, #ff0000);
}
```

See: [*W3C Draft: CSS Custom Properties for Cascading Variables, section 3*](http://dev.w3.org/csswg/css-variables/#using-variables) for more information.


# Options:

### `preserve` (default: `false`)

Allows you to preserve custom properties & var() usage in output.
Allowed values: 
 - `false`: Removes `--var` declarations and replaces `var()` with their resolved/computed values.
 - `true`: Keeps `var()` declarations in the output and has the computed value as a fallback declaration. Also keeps computed `--var` declarations
 - `'computed'`: Keeps computed `--var` declarations in the output. Handy to make them available to your JavaScript.

### `variables` (default: `{}`)

Define variables in JavaScript.

Can be a simple key-value pair or an object with a `value` property and an optional `isImportant` bool property


```
var postcss = require('postcss');
var cssvariables = require('postcss-css-variables');

postcss([
	cssvariables({
		variables: {
			'--some-var': 100pxpx,
			'--other-var': {
				value: #00ff00
			},
			'--important-var': {
				value: #ff0000,
				isImportant: true
			}
		}
	})
])
.process(css, opts);
```

# Notes

 - This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99)
 - We provide a larger CSS variable feature subset than [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties).
 - Solves these issues:
 	 - [var declared in media query should pull in properties that use/reference that var *on `cssnext/cssnext`*](https://github.com/cssnext/cssnext/issues/99)
 	 - [Investigate support for media-query scoped properties *on `postcss/postcss-custom-properties`*](https://github.com/postcss/postcss-custom-properties/issues/9)
 	 - [remove `:root` limitation by injecting rules with new declarations that just contains modified properties. *on `postcss/postcss-custom-properties`*](https://github.com/postcss/postcss-custom-properties/issues/1)


# Testing:

We have a suite of [Mocha](http://mochajs.org/) tests. If you see something that doesnt' have coverage, make an issue or pull request.

Run once:

`npm install`

Run whenever you want to test:

`npm run test`