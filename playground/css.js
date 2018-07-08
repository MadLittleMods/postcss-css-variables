import Loader from 'jspm-loader-css/src/loader.js';

import inlineComments from 'postcss-inline-comment';
import mixins from 'postcss-mixins';
import nestedcss from 'postcss-nested';
import cssvariables from 'postcss-css-variables';
import autoprefixer from 'autoprefixer';

import cursorHandMixin from './custom-postcss-mixins/cursor-hand.js';
import toggleCheckboxEnclosedMixin from './custom-postcss-mixins/toggle-checkbox-enclosed.js';

const plugins = [
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

const { fetch, bundle } = new Loader(plugins);
export { fetch, bundle };
