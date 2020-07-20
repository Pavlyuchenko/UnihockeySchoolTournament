import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";

class Pavouk extends Component {
	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				Pavouk
			</>
		);
	}
}

export default Pavouk;
