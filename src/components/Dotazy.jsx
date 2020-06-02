import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";

class Dotazy extends Component {
	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				Dotazy
			</>
		);
	}
}

export default Dotazy;
