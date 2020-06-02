import React, { Component } from "react";

class RozpisZapas extends Component {
	state = {};
	render() {
		return (
			<div className="rozpis-zapas">
				<span className="rozpis-domaci">{this.props.domaci}</span>
				<span className="rozpis-cas">
					{this.props.cas.split(":")[0]}
				</span>
				<span className="rozpis-cas-2">
					{this.props.cas.split(":")[1]}
				</span>
				<span className="rozpis-hoste">{this.props.hoste}</span>
			</div>
		);
	}
}

export default RozpisZapas;
