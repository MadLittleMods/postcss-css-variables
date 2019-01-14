import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaygroundConstants from '../constants/PlaygroundConstants';

import assign from 'object-assign';
import Immutable from 'immutable';
import events from 'events';
let EventEmitter = events.EventEmitter;


let CHANGE_EVENT = 'CHANGE_EVENT';



let playgroundSettings = Immutable.Map({
	shouldLiveReload: true,
	tabWidth: 'inherit'
});

let pluginSettings = Immutable.Map({
	'postcss-css-variables': Immutable.Map({
		preserve: false
	})
});



let PlaygroundSettingsStore = assign({}, EventEmitter.prototype, {


	getPluginSettings: function() {
		return pluginSettings;
	},


	getShouldLiveReload: function() {
		return playgroundSettings.get('shouldLiveReload', true);
	},
	getTabWidth: function() {
		return playgroundSettings.get('tabWidth', 'inherit');
	},



	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatchToken: AppDispatcher.register(function(action) {
		switch(action.actionType) {
			case PlaygroundConstants.PLAYGROUND_SET_POSTCSS_CSS_VARIABLES_PRESERVE:
				pluginSettings = pluginSettings.setIn(['postcss-css-variables', 'preserve'], action.value);
				PlaygroundSettingsStore.emitChange();
				break;

			case PlaygroundConstants.PLAYGROUND_SET_SHOULD_LIVE_RELOAD:
				playgroundSettings = playgroundSettings.set('shouldLiveReload', action.value);
				PlaygroundSettingsStore.emitChange();
				break;

			case PlaygroundConstants.PLAYGROUND_SET_TAB_WIDTH:
				playgroundSettings = playgroundSettings.set('tabWidth', action.value);
				PlaygroundSettingsStore.emitChange();
				break;

			default:
				// no op
		}

		// No errors. Needed by promise in Dispatcher.
		return true;
	})
});



export default PlaygroundSettingsStore;
