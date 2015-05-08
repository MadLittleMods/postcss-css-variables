import React from 'react';

import PlaygroundStore from '../stores/PlaygroundStore';
import PlaygroundActions from '../actions/PlaygroundActions';
import * as PlaygroundPersistentSettingsDAO from '../services/PlaygroundPersistentSettingsDAO';

import assign from 'object-assign';


export default class PlaygroundHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = assign({
			optionsMenuDisplayToggle: false
		});
	}

	componentDidMount() {
		PlaygroundStore.getKeyboardActionStream().on('KEYBOARD_ACTION', this._handleKeyboardAction.bind(this));

		document.addEventListener('mousedown', this._handleMouseDown.bind(this));
	}

	componentWillUnmount() {
		PlaygroundStore.getKeyboardActionStream().removeEventListener('KEYBOARD_ACTION', this._handleKeyboardAction.bind(this));

		document.removeEventListener('mousedown', this._handleMouseDown.bind(this));
	}

	render() {
		//console.log('render', this.state);
		return (
			<header
				className="playground-header"
			>
				<h1
					className="playground-header-heading"
				>
					<a className="playground-header-heading-primary-title" href="https://github.com/MadLittleMods/postcss-css-variables">postcss-css-variables</a> Playground - <a href="https://github.com/postcss/postcss">PostCSS</a>
				</h1>

				<div
					className="playground-options-holder"
					ref="playgroundOptionsHolder"
				>
					<input
						type="checkbox"
						id="id-playground-options-menu-display-toggle-checkbox"
						className="playground-options-menu-toggle-checkbox visually-hidden"
						checked={this.state.optionsMenuDisplayToggle}
						onChange={this._onOptionsMenuDisplayToggleCheckboxChanged.bind(this)}
					/>

					<label
						className="playground-options-menu-toggle"
						htmlFor="id-playground-options-menu-display-toggle-checkbox"
					>
						<svg
							className="playground-options-menu-toggle-icon icon"
							viewBox="0 0 1024 1024"
							dangerouslySetInnerHTML={{__html: '<use xlink:href="#shape-gear"></use>' }}
						/>
					</label>

					<div
						className="playground-options-menu-wrapper"
					>
						<div
							className="playground-options-menu"
						>
							<ul
								className="playground-options-menu-options-group"
							>
								<li className="playground-options-menu-item">
									<label
										className="playground-options-menu-item-label"
										htmlFor="id-playground-postcss-css-variables-preserve-menu-option"
									>
										Preserve:
									</label>
									<input
										type="checkbox"
										id="id-playground-postcss-css-variables-preserve-menu-option"
										checked={this.props.postcssCssVariablesPreserve}
										onChange={this._onPostcssCssVariablesPreserveCheckboxChanged.bind(this)}
									/>
								</li>
							</ul>

							<hr />

							<ul
								className="playground-options-menu-options-group"
							>
								<li className="playground-options-menu-item">
									<label
										className="playground-options-menu-item-label"
										htmlFor="id-playground-tab-width-menu-option"
									>
										Tab Width:
									</label>
									<div>
										<div className="playground-options-menu-item-secondary">
											<label
												className="playground-options-menu-item-label-secondary"
												htmlFor="id-playground-tab-width-inherit-menu-option"
											>
												Auto:
											</label>
											<input
												type="checkbox"
												id="id-playground-tab-width-inherit-menu-option"
												checked={this.props.tabWidth === 'inherit'}
												onChange={this._onTabWidthAutoCheckboxChanged.bind(this)}
											/>
										</div>
										<input
											type="range"
											id="id-playground-tab-width-menu-option"
											value={this.props.tabWidth === 'inherit' ? '4' : this.props.tabWidth}
											onChange={this._onTabWidthChanged.bind(this)}

											min="1"
											max="12"
											step="1"
											disabled={this.props.tabWidth === 'inherit'}
										/>
									</div>
								</li>
								<li className="playground-options-menu-item">
									<label
										className="playground-options-menu-item-label"
										htmlFor="id-playground-should-live-reload-menu-option"
									>
										Live Reload:
									</label>
									<input
										type="checkbox"
										id="id-playground-should-live-reload-menu-option"
										checked={this.props.shouldLiveReload}
										onChange={this._onLiveReloadCheckboxChanged.bind(this)}
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div>
					<input
						type="checkbox"
						id="id-playground-live-reload-checkbox"
						className="playground-live-reload-toggle-checkbox visually-hidden"
						aria-label="Live Reload"
						checked={this.props.shouldLiveReload}
						onChange={this._onLiveReloadCheckboxChanged.bind(this)}
					/>
					<label
						className="playground-live-reload-toggle-togglebox"
						htmlFor="id-playground-live-reload-checkbox"
					>
						<label
							className="switch"
							htmlFor="id-playground-live-reload-checkbox"
						>
						</label>
					</label>
				</div>

				<button
					className="playground-header-save-button"
					onClick={this._onProcessClick.bind(this)}
				>
					Process
				</button>
			</header>

		);
	}

	_onProcessClick() {
		PlaygroundActions.processInput();
	}

	_onPostcssCssVariablesPreserveCheckboxChanged(e) {
		PlaygroundPersistentSettingsDAO.setPostCssCssVariablesPreserveOption(e.target.checked);
	}

	_onLiveReloadCheckboxChanged(e) {
		PlaygroundPersistentSettingsDAO.setShouldLiveReload(e.target.checked);
	}

	_onTabWidthChanged(e) {
		//console.log(e.target.value);
		PlaygroundPersistentSettingsDAO.setTabWidth(e.target.value);
	}
	_onTabWidthAutoCheckboxChanged(e) {
		if(e.target.checked) {
			PlaygroundPersistentSettingsDAO.setTabWidth('inherit');
		}
		else {
			PlaygroundPersistentSettingsDAO.setTabWidth('4');
		}
	}

	_onOptionsMenuDisplayToggleCheckboxChanged(e) {
		this.setState({
			optionsMenuDisplayToggle: e.target.checked
		});
	}


	_handleKeyboardAction() {
		//console.log('keyboard action');

		// Also hide the options menu because we need it out of the way to start typing
		this.setState({
			optionsMenuDisplayToggle: false
		});
	}

	_handleMouseDown(e) {
		// If they clicked somewhere outside of the menu, then close it
		if(!React.findDOMNode(this.refs.playgroundOptionsHolder).contains(e.target)) {
			this.setState({
				optionsMenuDisplayToggle: false
			});
		}
	}
}

PlaygroundHeader.propTypes = {
	tabWidth: React.PropTypes.string.isRequired,
	shouldLiveReload: React.PropTypes.bool.isRequired,

	postcssCssVariablesPreserve: React.PropTypes.bool.isRequired
};