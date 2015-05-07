import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaygroundConstants from '../constants/PlaygroundConstants';

import Immutable from 'immutable';
import events from 'events';
var EventEmitter = events.EventEmitter;
import assign from 'object-assign';
import localforage from 'localforage';
import Promise from 'bluebird';


localforage.config({
	name        : 'postcss-css-variables-playground',
	version     : 1.0,
	storeName   : 'postcss-css-variables-playground-settings'
});

var CHANGE_EVENT = 'CHANGE_EVENT';


var playgroundSettings = Immutable.Map({
	shouldLiveReload: true,
	tabWidth: 'inherit'
});

var pluginSettings = Immutable.Map({
	'postcss-css-variables': Immutable.Map({
		preserve: false
	})
});



var PlaygroundSettingsStore = assign({}, EventEmitter.prototype, {



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
			case PlaygroundConstants.PLAYGROUND_INIT:
				retrieveSettingsFromPersistantStorage()
					.then(function() {
						console.log('Settings Retrieved!');
						PlaygroundSettingsStore.emitChange();
					})
					.catch(function(e) {
						console.log('Error retrieving playground settings:', e);
					});
				break;

			case PlaygroundConstants.PLAYGROUND_SET_POSTCSS_CSS_VARIABLES_PRESERVE:
				pluginSettings = pluginSettings.setIn(['postcss-css-variables', 'preserve'], action.value);
				savePersistently();
				PlaygroundSettingsStore.emitChange();
				break;

			case PlaygroundConstants.PLAYGROUND_SET_SHOULD_LIVE_RELOAD:
				playgroundSettings = playgroundSettings.set('shouldLiveReload', action.value);
				savePersistently();
				PlaygroundSettingsStore.emitChange();
				break;

			case PlaygroundConstants.PLAYGROUND_SET_TAB_WIDTH:
				playgroundSettings = playgroundSettings.set('tabWidth', action.value);
				savePersistently();
				PlaygroundSettingsStore.emitChange();
				break;

			default:
				// no op
		}

		// No errors. Needed by promise in Dispatcher.
		return true;
	})
});


function retrieveSettingsFromPersistantStorage() {
	console.log('Retrieving settings from persistent storage...');
	return Promise.all([
		localforage.getItem('PlaygroundSettingsStore.PlaygroundSettings').then(function(value) {
			playgroundSettings = playgroundSettings.mergeDeep(JSON.parse(value) || {});
		}),
		localforage.getItem('PlaygroundSettingsStore.PluginSettings').then(function(value) {
			pluginSettings = pluginSettings.mergeDeep(JSON.parse(value) || {});
		})
	]);
}

function savePersistently() {
	console.log('Saving settings persistently...');
	return Promise.all([
		localforage.setItem('PlaygroundSettingsStore.PlaygroundSettings', JSON.stringify(playgroundSettings.toObject())),
		localforage.setItem('PlaygroundSettingsStore.PluginSettings', JSON.stringify(pluginSettings.toObject()))
	])
	.then(function() {
		console.log('Settings saved!');
	})
	.catch(function(e) {
		console.log('Error saving:', e);

		return e;
	});
}


export default PlaygroundSettingsStore;