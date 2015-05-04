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
				React.createElement("div", {
					className: "postcss-editor-pane-error", 
					// Live region attributes: http://www.smashingmagazine.com/2015/04/27/its-alive-apps-that-feed-back-accessibly/
					"aria-live": "polite", 
					role: "status"
				}, 
					React.createElement("div", {
						className: "postcss-editor-pane-error-message"
					}, 
						this.state.postcssOutputResult.error.toString()
					)
				)
			);
		}

		return (
			React.createElement("div", {className: "playground-app-wrapper"}, 
				React.createElement("header", {
					className: "playground-header"
				}, 
					React.createElement("h1", {
						className: "playground-header-heading"
					}, 
						React.createElement("a", {className: "playground-header-heading-primary-title", href: "https://github.com/MadLittleMods/postcss-css-variables"}, "postcss-css-variables"), " Playground - ", React.createElement("a", {href: "https://github.com/postcss/postcss"}, "PostCSS")
					), 
					React.createElement("label", {
						className: "live-reload-toggle-checkbox", 
						htmlFor: "id-live-reload-checkbox", 
						onChange: this._onLiveReloadCheckboxChanged.bind(this)
					}, 
						React.createElement("input", {
							type: "checkbox", 
							id: "id-live-reload-checkbox", 
							checked: this.state.shouldLiveReload, 
							onChange: this._onLiveReloadCheckboxChanged.bind(this)}
						)
					), 
					React.createElement("button", {
						className: "playground-header-save-button", 
						onClick: this._onSave.bind(this)
					}, 
						"Save"
					)
				), 

				React.createElement("div", {className: "postcss-editor-area"}, 
					React.createElement("div", {className: "postcss-editor-pane"}, 
						React.createElement("div", {
							className: "postcss-editor-pane-label"
						}, 
							"Input ", React.createElement("kbd", null, "i")
						), 
						React.createElement(EditorTextarea, {
							ref: "postcssInputTextarea", 
							className: "postcss-textarea", 
							onChange: this._onInputChanged.bind(this), 
							value: this.state.postcssInputText}
						)
					), 
					React.createElement("div", {className: "postcss-editor-pane"}, 
						React.createElement("div", {
							className: "postcss-editor-pane-label"
						}, 
							"Output ", React.createElement("kbd", null, "o")
						), 
						React.createElement(EditorTextarea, {
							ref: "postcssOutputTextarea", 
							className: classnames('postcss-textarea', {'is-not-current': doesInputHaveError}), 
							value: output}
						), 
						parsingErrorMarkup
					)
				)
			)
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