import React, { Component } from "react";
import "./css/logo.css";

class Logo extends Component {
	state = {};
	render() {
		return (
			<header id="logo-wrapper">
				<div id="logo-red"></div>
				<h1 id="logo-text">
					Vánoční
					<br />
					florbalový
					<br />
					turnaj
				</h1>
			</header>
		);
	}
}

export default Logo;
