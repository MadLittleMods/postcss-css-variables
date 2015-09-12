import pluginPostcss from 'plugin-postcss';

import inlineComments from 'postcss-inline-comment';
import mixins from 'postcss-mixins';
import nestedcss from 'postcss-nested';
import cssvariables from 'postcss-css-variables';
import autoprefixer from 'autoprefixer';

import cursorHandMixin from './custom-postcss-mixins/cursor-hand';
import toggleCheckboxEnclosedMixin from './custom-postcss-mixins/toggle-checkbox-enclosed';

let processors = [
	inlineComments(),
	mixins({
		mixins: {
			'cursor-hand': cursorHandMixin,
			'toggle-checkbox-enclosed': toggleCheckboxEnclosedMixin
		}
	}),
	nestedcss,
	cssvariables(),
	autoprefixer({browsers: ['last 10 versions']})
];

export default pluginPostcss(processors);
