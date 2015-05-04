import React from 'react';
import assign from 'object-assign';
import classnames from 'classnames';

import '../../css/playground.css!';
import PlaygroundStore from '../stores/PlaygroundStore';
import PlaygroundActions from '../actions/PlaygroundActions';


import EditorTextarea from './EditorTextarea';


function getPlaygroundState(props, state) {
	var newOutputResult = PlaygroundStore.getOutputResult();

	return  {
		postcssOutputResult: newOutputResult,
		// If there was an error in parsing, then use the last known good one
		prevSuccessfulPostcssOutputResult: newOutputResult.error ? state.postcssOutputResult : newOutputResult
	};
}

export default class PlaygroundApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = assign(getPlaygroundState(props, (this.state || {})), {
			shouldLiveReload: props.initialShouldLiveReload || true,
			postcssInputText: props.initialPostcssInputText || '',
		});
	}

	componentDidMount() {
		PlaygroundStore.addChangeListener(this._onStoreChange.bind(this));

		document.addEventListener('keyup', this._handleKeyUp.bind(this));
	}

	componentWillUnmount() {
		PlaygroundStore.removeChangeListener(this._onStoreChange);

		document.removeEventListener('keyup', this._handleKeyUp.bind(this));
	}

	render() {
		//console.log('render', this.state);

		var doesInputHaveError = !!this.state.postcssOutputResult.error;
		var output = doesInputHaveError ? this.state.prevSuccessfulPostcssOutputResult.result : this.state.postcssOutputResult.result;


		var parsingErrorMarkup;
		if(this.state.postcssOutputResult.error) {
			parsingErrorMarkup = (
				<div className="postcss-editor-pane-error">
					<div className="postcss-editor-pane-error-message">{this.state.postcssOutputResult.error.toString()}</div>
				</div>
			);
		}

		return (
			<div className="playground-app-wrapper">
				<header
					className="playground-header"
				>
					<h1
						className="playground-header-heading"
					>
						<a className="playground-header-heading-primary-title" href="https://github.com/MadLittleMods/postcss-css-variables">postcss-css-variables</a> Playground - <a href="https://github.com/postcss/postcss">PostCSS</a>
					</h1>
					<label
						className="live-reload-toggle-checkbox"
						htmlFor="id-live-reload-checkbox"
						onChange={this._onLiveReloadCheckboxChanged.bind(this)}
					>
						<input
							type="checkbox"
							id="id-live-reload-checkbox"
							checked={this.state.shouldLiveReload}
							onChange={this._onLiveReloadCheckboxChanged.bind(this)}
						/>
					</label>
					<button
						className="playground-header-save-button"
						onClick={this._onSave.bind(this)}
					>
						Save
					</button>
				</header>

				<div className="postcss-editor-area">
					<div className="postcss-editor-pane">
						<div
							className="postcss-editor-pane-label"
						>
							Input <kbd>i</kbd>
						</div>
						<EditorTextarea
							ref="postcssInputTextarea"
							className="postcss-textarea"
							onChange={this._onInputChanged.bind(this)}
							value={this.state.postcssInputText}
						/>
					</div>
					<div className="postcss-editor-pane">
						<div
							className="postcss-editor-pane-label"
						>
							Output <kbd>o</kbd>
						</div>
						<EditorTextarea
							ref="postcssOutputTextarea"
							className={classnames('postcss-textarea', {'is-not-current': doesInputHaveError})}
							value={output}
						/>
						{parsingErrorMarkup}
					</div>
				</div>
			</div>
		);
	}

	_onSave() {
		//console.log('saving');
		PlaygroundActions.updateInput(this.state.postcssInputText);
	}

	_onInputChanged(text) {
		//console.log('input changed');
		this.setState({
			postcssInputText: text
		});

		// Defaults to true if undefined
		if(this.state.shouldLiveReload) {
			PlaygroundActions.updateInput(text);
		}
	}

	_onLiveReloadCheckboxChanged() {
		this.setState({
			shouldLiveReload: event.target.checked
		});
	}

	_handleKeyUp(e) {
		//console.log(e);

		// escape
		if(e.keyCode === 27) {
			// Unfocus/blur the currently focused elemnt
			document.activeElement.blur();
		}

		// If nothing is focused currently
		if(document.querySelectorAll('*:focus').length === 0) {
			// i
			if(e.keyCode === 73) {
				//console.log('focus input');
				React.findDOMNode(this.refs.postcssInputTextarea).focus();
			}
			// o
			else if(e.keyCode === 79) {
				//console.log('focus output');
				React.findDOMNode(this.refs.postcssOutputTextarea).focus();
			}
		}
	}

	_onStoreChange() {
		//console.log('change in PlaygroundStore');
		this.setState(getPlaygroundState(this.props, this.state));
	}
}

PlaygroundApp.propTypes = {
	// Defaults to true
	initialShouldLiveReload: React.PropTypes.bool,
	initialPostcssInputText: React.PropTypes.string
};