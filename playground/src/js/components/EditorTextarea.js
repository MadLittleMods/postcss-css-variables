import React from 'react';

import tabOverride from 'wjbryant/taboverride';


export default class EditorTextarea extends React.Component {
	constructor(props) {
		super(props);
		//this.state = {};
	}

	componentDidMount() {
		tabOverride.set(React.findDOMNode(this));
	}

	render() {
		return (
			<textarea
				className={this.props.className || ''}
				onChange={this._onChange.bind(this)}
				value={this.props.value}
			></textarea>
		);
	}

	_onChange(event) {
		var inputValue = event.target.value;

		if(this.props.onChange) {
			this.props.onChange(inputValue);
		}
	}
}

EditorTextarea.propTypes = {
	onChange: React.PropTypes.func,
	className: React.PropTypes.string,
	value: React.PropTypes.string
};