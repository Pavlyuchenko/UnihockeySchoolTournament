import React, { Component } from "react";
import "./css/logo.css";
import { Link } from "react-router-dom";

class Logo extends Component {
	state = {};
	render() {
		return (
			<Link to="/">
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
			</Link>
		);
	}
}

export default Logo;
