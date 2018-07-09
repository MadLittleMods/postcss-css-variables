// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS)
// `--foo`
// See: http://dev.w3.org/csswg/css-variables/#custom-property
const RE_VAR_PROP = (/(--(.+))/);
const RE_VAR_FUNC = (/var\((--[^,\s]+?)(?:\s*,\s*(.+))?\)/);

module.exports = {
	RE_VAR_PROP,
	RE_VAR_FUNC
};
