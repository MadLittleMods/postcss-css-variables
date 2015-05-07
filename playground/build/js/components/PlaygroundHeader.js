import React from 'react';

import PlaygroundStore from '../stores/PlaygroundStore';
import PlaygroundActions from '../actions/PlaygroundActions';

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
			React.createElement("header", {
				className: "playground-header"
			}, 
				React.createElement("h1", {
					className: "playground-header-heading"
				}, 
					React.createElement("a", {className: "playground-header-heading-primary-title", href: "https://github.com/MadLittleMods/postcss-css-variables"}, "postcss-css-variables"), " Playground - ", React.createElement("a", {href: "https://github.com/postcss/postcss"}, "PostCSS")
				), 

				React.createElement("div", {
					className: "playground-options-holder", 
					ref: "playgroundOptionsHolder"
				}, 
					React.createElement("input", {
						type: "checkbox", 
						id: "id-playground-options-menu-display-toggle-checkbox", 
						className: "playground-options-menu-toggle-checkbox visually-hidden", 
						checked: this.state.optionsMenuDisplayToggle, 
						onChange: this._onOptionsMenuDisplayToggleCheckboxChanged.bind(this)}
					), 

					React.createElement("label", {
						className: "playground-options-menu-toggle", 
						htmlFor: "id-playground-options-menu-display-toggle-checkbox"
					}, 
						React.createElement("svg", {
							className: "playground-options-menu-toggle-icon icon", 
							viewBox: "0 0 1024 1024", 
							dangerouslySetInnerHTML: {__html: '<use xlink:href="#shape-gear"></use>'}}
						)
					), 

					React.createElement("div", {
						className: "playground-options-menu-wrapper"
					}, 
						React.createElement("div", {
							className: "playground-options-menu"
						}, 
							React.createElement("ul", {
								className: "playground-options-menu-options-group"
							}, 
								React.createElement("li", {className: "playground-options-menu-item"}, 
									React.createElement("label", {
										className: "playground-options-menu-item-label", 
										htmlFor: "id-playground-postcss-css-variables-preserve-menu-option"
									}, 
										"Preserve:"
									), 
									React.createElement("input", {
										type: "checkbox", 
										id: "id-playground-postcss-css-variables-preserve-menu-option", 
										checked: this.props.postcssCssVariablesPreserve, 
										onChange: this._onPostcssCssVariablesPreserveCheckboxChanged.bind(this)}
									)
								)
							), 

							React.createElement("hr", null), 

							React.createElement("ul", {
								className: "playground-options-menu-options-group"
							}, 
								React.createElement("li", {className: "playground-options-menu-item"}, 
									React.createElement("label", {
										className: "playground-options-menu-item-label", 
										htmlFor: "id-playground-tab-width-menu-option"
									}, 
										"Tab Width:"
									), 
									React.createElement("div", null, 
										React.createElement("div", {className: "playground-options-menu-item-secondary"}, 
											React.createElement("label", {
												className: "playground-options-menu-item-label-secondary", 
												htmlFor: "id-playground-tab-width-inherit-menu-option"
											}, 
												"Auto:"
											), 
											React.createElement("input", {
												type: "checkbox", 
												id: "id-playground-tab-width-inherit-menu-option", 
												checked: this.props.tabWidth === 'inherit', 
												onChange: this._onTabWidthAutoCheckboxChanged.bind(this)}
											)
										), 
										React.createElement("input", {
											type: "range", 
											id: "id-playground-tab-width-menu-option", 
											value: this.props.tabWidth === 'inherit' ? '4' : this.props.tabWidth, 
											onChange: this._onTabWidthChanged.bind(this), 

											min: "1", 
											max: "12", 
											step: "1", 
											disabled: this.props.tabWidth === 'inherit'}
										)
									)
								), 
								React.createElement("li", {className: "playground-options-menu-item"}, 
									React.createElement("label", {
										className: "playground-options-menu-item-label", 
										htmlFor: "id-playground-should-live-reload-menu-option"
									}, 
										"Live Reload:"
									), 
									React.createElement("input", {
										type: "checkbox", 
										id: "id-playground-should-live-reload-menu-option", 
										checked: this.props.shouldLiveReload, 
										onChange: this._onLiveReloadCheckboxChanged.bind(this)}
									)
								)
							)
						)
					)
				), 

				React.createElement("div", null, 
					React.createElement("input", {
						type: "checkbox", 
						id: "id-playground-live-reload-checkbox", 
						className: "playground-live-reload-toggle-checkbox visually-hidden", 
						"aria-label": "Live Reload", 
						checked: this.props.shouldLiveReload, 
						onChange: this._onLiveReloadCheckboxChanged.bind(this)}
					), 
					React.createElement("label", {
						className: "playground-live-reload-toggle-togglebox", 
						htmlFor: "id-playground-live-reload-checkbox"
					}, 
						React.createElement("label", {
							className: "switch", 
							htmlFor: "id-playground-live-reload-checkbox"
						}
						)
					)
				), 

				React.createElement("button", {
					className: "playground-header-save-button", 
					onClick: this._onProcessClick.bind(this)
				}, 
					"Process"
				)
			)

		);
	}

	_onProcessClick() {
		PlaygroundActions.processInput();
	}

	_onPostcssCssVariablesPreserveCheckboxChanged(e) {
		PlaygroundActions.setPostcssCssVariablesPreserveOption(e.target.checked);
	}

	_onLiveReloadCheckboxChanged(e) {
		PlaygroundActions.setShouldLiveReloadOption(e.target.checked);
	}

	_onTabWidthChanged(e) {
		//console.log(e.target.value);
		PlaygroundActions.setTabWidthOption(e.target.value);
	}
	_onTabWidthAutoCheckboxChanged(e) {
		if(e.target.checked) {
			PlaygroundActions.setTabWidthOption('inherit');
		}
		else {
			PlaygroundActions.setTabWidthOption('4');
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