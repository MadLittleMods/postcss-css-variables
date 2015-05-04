import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaygroundConstants from '../constants/PlaygroundConstants';

var TodoActions = {
	updateInput: function(input) {
		AppDispatcher.dispatch({
			actionType: PlaygroundConstants.PLAYGROUND_INPUT_UPDATED,
			input: input
		});
	}
};

export default TodoActions;