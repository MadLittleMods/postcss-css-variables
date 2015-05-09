import React from 'react';
import assign from 'object-assign';
import classnames from 'classnames';
import throttle from 'throttle';

import '../../postcss/playground.css!';
import PlaygroundStore from '../stores/PlaygroundStore';
import PlaygroundSettingsStore from '../stores/PlaygroundSettingsStore';
import PlaygroundActions from '../actions/PlaygroundActions';


import PlaygroundHeader from './PlaygroundHeader';
import EditorTextarea from './EditorTextarea';



function gatherPlaygroundStoreState(props, state) {
	let newOutputResult = PlaygroundStore.getOutputResult();

	return  {
		postcssInputText: PlaygroundStore.getInputText(),
		postcssOutputResult: newOutputResult,
		// If there was an error in parsing, then use the last known good one
		prevSuccessfulPostcssOutputResult: newOutputResult.get('error') ? state.prevSuccessfulPostcssOutputResult : newOutputResult
	};
}

function gatherPlaygroundSettingsStoreState(props, state) {
	return  {
		postcssCssVariablesPreserve: PlaygroundSettingsStore.getPluginSettings().getIn(['postcss-css-variables', 'preserve']),
		shouldLiveReload: PlaygroundSettingsStore.getShouldLiveReload(),
		tabWidth: PlaygroundSettingsStore.getTabWidth()
	};
}

export default class PlaygroundApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = assign(
			gatherPlaygroundStoreState(props, (this.state || {})),
			gatherPlaygroundSettingsStoreState(props, (this.state || {}))
		);

		this._throttledProcessInputAction = throttle(PlaygroundActions.processInput, 500);
	}

	componentDidMount() {
		PlaygroundStore.addChangeListener(this._onPlaygroundStoreChange.bind(this));
		PlaygroundSettingsStore.addChangeListener(this._onPlaygroundSettingsStoreChange.bind(this));

		document.addEventListener('keyup', this._handleKeyUp.bind(this));
	}

	componentWillUnmount() {
		PlaygroundStore.removeChangeListener(this._onPlaygroundStoreChange.bind(this));
		PlaygroundSettingsStore.removeChangeListener(this._onPlaygroundSettingsStoreChange.bind(this));

		document.removeEventListener('keyup', this._handleKeyUp.bind(this));
	}

	render() {
		//console.log('render', this.state);

		let doesInputHaveError = !!this.state.postcssOutputResult.get('error');
		let output = doesInputHaveError ? this.state.prevSuccessfulPostcssOutputResult.get('output') : this.state.postcssOutputResult.get('output');

		let parsingErrorMarkup;
		if(this.state.postcssOutputResult.get('error')) {
			parsingErrorMarkup = (
				<div
					className="postcss-editor-pane-error"
					// Live region attributes: http://www.smashingmagazine.com/2015/04/27/its-alive-apps-that-feed-back-accessibly/
					aria-live="polite"
					role="status"
				>
					<div
						className="postcss-editor-pane-error-message"
					>
						{this.state.postcssOutputResult.get('error').toString()}
					</div>
				</div>
			);
		}


		let tabWidthStyleValue = this.state.tabWidth === 'inherit' ? this.state.tabWidth : this.state.tabWidth + 'ch';

		return (
			<div className="playground-app-wrapper">

				<PlaygroundHeader
					tabWidth={this.state.tabWidth}
					shouldLiveReload={this.state.shouldLiveReload}

					postcssCssVariablesPreserve={this.state.postcssCssVariablesPreserve}
				/>

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

							style={{
								tabSize: tabWidthStyleValue
							}}
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

							style={{
								tabSize: tabWidthStyleValue
							}}
						/>
						{parsingErrorMarkup}
					</div>
				</div>
			</div>
		);
	}

	_onInputChanged(text) {
		PlaygroundActions.updateInput(text);

		// Defaults to true if undefined
		if(this.state.shouldLiveReload) {
			this._throttledProcessInputAction();
		}
	}

	_handleKeyUp(e) {
		//console.log(e);

		// escape
		if(e.keyCode === 27) {
			// Unfocus/blur the currently focused elemnt
			document.activeElement.blur();

			PlaygroundActions.keyboardActionFired();
		}

		// If nothing is focused currently
		if(document.querySelectorAll('*:focus').length === 0) {
			// i
			if(e.keyCode === 73) {
				//console.log('focus input');
				React.findDOMNode(this.refs.postcssInputTextarea).focus();

				PlaygroundActions.keyboardActionFired();
			}
			// o
			else if(e.keyCode === 79) {
				//console.log('focus output');
				React.findDOMNode(this.refs.postcssOutputTextarea).focus();

				PlaygroundActions.keyboardActionFired();
			}
		}
	}


	_onPlaygroundStoreChange() {
		//console.log('change in PlaygroundStore');
		this.setState(gatherPlaygroundStoreState(this.props, this.state));
	}

	_onPlaygroundSettingsStoreChange() {
		//console.log('change in PlaygroundSettingsStore');
		this.setState(gatherPlaygroundSettingsStoreState(this.props, this.state));
	}
}

PlaygroundApp.propTypes = {
	// ...
};