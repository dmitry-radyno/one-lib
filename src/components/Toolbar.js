import React, { Component } from 'react';

export class Toolbar extends Component {
	render() {
		return (
			<div className="toolbar">
				{this.props.children}
			</div>
		);
	}
}