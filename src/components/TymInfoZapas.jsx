import React, { Component } from "react";

class TymInfoZapas extends Component {
	state = {};
	render() {
		return (
			<div className="tym-info-zapas-wrapper">
				<span className="tym-info-domaci">{this.props.domaci}</span>
				<span className="tym-info-zapas-cas">{this.props.cas1}</span>
				<span className="tym-info-zapas-cas-2">{this.props.cas2}</span>
				<span className="tym-info-zapas-hoste">{this.props.hoste}</span>
			</div>
		);
	}
}

export default TymInfoZapas;
