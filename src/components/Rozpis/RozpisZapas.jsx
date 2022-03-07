import React, { Component } from "react";

class RozpisZapas extends Component {
	state = {};
	render() {
		return (
			<div style={{ position: "relative" }}>
			<div className="rozpis-zapas">
				<span className="rozpis-domaci">{this.props.domaci}</span>
				<span className="rozpis-cas">
					{this.props.cas
						? this.props.cas.split(":")[0]
						: this.props.skore1}
				</span>
				<span className="rozpis-cas-2">
					{this.props.cas
						? this.props.cas.split(":")[1]
						: this.props.skore2}
				</span>
				<span className="rozpis-hoste">{this.props.hoste}</span>
			</div>
			<span className="zapas-skupiny">{this.props.skupina}</span>
			</div>
		);
	}
}

export default RozpisZapas;
