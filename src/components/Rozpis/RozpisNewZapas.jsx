import React, { Component } from "react";

class RozpisNewZapas extends Component {
	state = {};
	render() {
		return (
			<div style={{position: "relative"}}>
			<div className="rozpis-new-zapas">
				<div className="rozpis-new-domaci-div">
					<span>{this.props.domaci}</span>
					{this.props.skore1 && (
						<span className="rozpis-new-cas">
							{this.props.skore1}
						</span>
					)}
				</div>
				<div className="rozpis-new-hoste-div">
					<span>{this.props.hoste}</span>
					<span className="rozpis-new-cas">
						{this.props.cas ? this.props.cas : this.props.skore2}
					</span>
				</div>
			</div>
			<span className="zapas-skupiny">{this.props.skupina}</span>
			</div>
		);
	}
}

export default RozpisNewZapas;
