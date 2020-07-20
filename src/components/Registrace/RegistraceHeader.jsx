import React, { Component } from "react";

class RegistraceHeader extends Component {
	state = {};
	render() {
		return (
			<div id="register-status">
				<div
					id={this.props.firstCircle}
					onClick={this.props.switchView}
				>
					<span>1</span>
					<p>Název týmu</p>
				</div>
				<div
					id={this.props.secondCircle}
					onClick={() => this.props.switchView("next")}
				>
					<span>2</span>
					<p>Soupiska</p>
				</div>
			</div>
		);
	}
}

export default RegistraceHeader;
