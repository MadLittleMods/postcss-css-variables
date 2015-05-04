import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaygroundConstants from '../constants/PlaygroundConstants';

import events from 'events';
var EventEmitter = events.EventEmitter;
import assign from 'object-assign';


import postcss from 'postcss';
import cssvariables from 'postcss-css-variables';


var CHANGE_EVENT = 'CHANGE_EVENT';


var playgroundProcessor = postcss()
	.use(cssvariables());

var postcssInputText = '';
var postcssOutputResult = '';
var postcssProcessingError = null;

var PlaygroundStore = assign({}, EventEmitter.prototype, {


	getInputText: function() {
		return postcssInputText;
	},

	getOutputResult: function() {
		return {
			result: postcssOutputResult,
			error: postcssProcessingError
		};
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

	dispatcherIndex: AppDispatcher.register(function(action) {
		switch(action.actionType) {
			case PlaygroundConstants.PLAYGROUND_INPUT_UPDATED:
				var input = action.input;
				updateInput(action.input);

				break;
			default:
				// no op
		}

		// No errors. Needed by promise in Dispatcher.
		return true;
	})
});


function updateInput(input) {
	postcssInputText = input;

	playgroundProcessor.process(input).then(function(result) {
		updateOuput(result.css, null);
		PlaygroundStore.emitChange();
	}).catch(function(error) {
		// Because there was an error, reset the output text
		updateOuput('', error);
		console.warn(error);
		PlaygroundStore.emitChange();
	});
}

function updateOuput(text, error) {
	postcssOutputResult = text;
	postcssProcessingError = error;
}



export default PlaygroundStore;