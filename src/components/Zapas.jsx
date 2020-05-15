import React, { Component } from "react";

class Zapas extends Component {
	state = {};
	render() {
		return (
			<div className="nasl-zap-zap-wrapper">
				<div className="nasl-zap-zap-domaci">{this.props.domaci}</div>
				<div className="nasl-zap-zap-hoste">{this.props.hoste}</div>
			</div>
		);
	}
}

export default Zapas;
