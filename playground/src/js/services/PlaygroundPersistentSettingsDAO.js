import PlaygroundActions from '../actions/PlaygroundActions';

import Immutable from 'immutable';
import localforage from 'localforage';

localforage.config({
	name		: 'postcss-css-variables-playground',
	version		: 1.0,
	storeName	: 'postcss-css-variables-playground-settings'
});



let playgroundSettingsStoreKey = 'PlaygroundSettingsStore';
let playgroundSettingsStoreTypeKeys = {
	playgroundSettings: 'PlaygroundSettingsStore.PlaygroundSettings',
	pluginSettings: 'PlaygroundSettingsStore.PluginSettings'
};

let actionMap = {
	[playgroundSettingsStoreTypeKeys.playgroundSettings]: {
		shouldLiveReload: PlaygroundActions.setShouldLiveReloadOption,
		tabWidth: PlaygroundActions.setTabWidthOption
	},
	[playgroundSettingsStoreTypeKeys.pluginSettings]: {
		'postcss-css-variables': {
			preserve: PlaygroundActions.setPostcssCssVariablesPreserveOption
		}
	}
};


// Iterates over JS objects or Immutable.js Maps
function iterateOverObjectRecursively(obj, cb, _originalObj, _path) {
	_originalObj = _originalObj || obj || {};
	_path = _path || [];

	// http://facebook.github.io/immutable-js/docs/#/Map/isMap
	let isMap = Immutable.Map.isMap(obj);

	let iteratingFunc = isMap ? Immutable.Map.prototype.mapKeys.bind(obj) : Array.prototype.forEach.bind(Object.keys(obj));
	iteratingFunc((key) => {
		let value = isMap ? obj.get(key) : obj[key];
		let currentPath = _path.concat(key);

		cb(currentPath, value);

		if(typeof value === 'object' && value !== _originalObj) {
			iterateOverObjectRecursively(value, cb, _originalObj, currentPath);
		}
	});
}



let settings = Immutable.fromJS((function() {
	let _tempSettings = {};
	_tempSettings[playgroundSettingsStoreTypeKeys.playgroundSettings] = {
		shouldLiveReload: {
			value: true,
			action: PlaygroundActions.setShouldLiveReloadOption
		},
		tabWidth: {
			value: 'inherit',
			action: PlaygroundActions.setTabWidthOption
		}
	};
	_tempSettings[playgroundSettingsStoreTypeKeys.pluginSettings] = {
		'postcss-css-variables': {
			preserve: {
				value: false,
				action:  PlaygroundActions.setPostcssCssVariablesPreserveOption
			}
		}
	};

	return _tempSettings;
})());



// Grab the settings from localforage and fire off the actions
function retrieveSettingsFromPersistantStorage() {
	console.log('Retrieving settings from persistent storage...');


	return localforage.getItem(playgroundSettingsStoreKey).then((value) => {
		let parsedObject = JSON.parse(value) || {};
		settings = settings.mergeDeep(parsedObject);
	})
	.then(function() {
		// Look through the settings and fire off the actions since we just updated them from localforage
		iterateOverObjectRecursively(settings, (path, value) => {
			if(Immutable.Map.isMap(value)) {
				let actionCallback = value.get('action');

				if(actionCallback) {
					actionCallback(value.get('value'));
				}
			}
		});
	})
	.catch(function(e) {
		console.log('Error retrieving', e);

		throw e;
	});
}

function savePersistently() {
	console.log('Saving settings persistently...');
	return localforage.setItem(
		playgroundSettingsStoreKey,
		JSON.stringify(settings.toJS())
	)
	.then(function() {
		console.log('Settings saved!', settings.toJS());
	})
	.catch(function(e) {
		console.log('Error saving:', e);

		throw e;
	});
}



export function init() {
	retrieveSettingsFromPersistantStorage();
}

export function setShouldLiveReload(value) {
	settings = settings.setIn([playgroundSettingsStoreTypeKeys.playgroundSettings, 'shouldLiveReload', 'value'], value);
	savePersistently();
	PlaygroundActions.setShouldLiveReloadOption(value);
}

export function setTabWidth(value) {
	settings = settings.setIn([playgroundSettingsStoreTypeKeys.playgroundSettings, 'tabWidth', 'value'], value);
	savePersistently();
	PlaygroundActions.setTabWidthOption(value);
}


export function setPostCssCssVariablesPreserveOption(value) {
	settings = settings.setIn([playgroundSettingsStoreTypeKeys.pluginSettings, 'postcss-css-variables', 'preserve', 'value'], value);
	savePersistently();
	PlaygroundActions.setPostcssCssVariablesPreserveOption(value);
}