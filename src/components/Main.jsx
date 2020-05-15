import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import ProbihajiciZapas from "./ProbihajiciZapas";
import NasledujiciZapasy from "./NasledujiciZapasy";

class Main extends Component {
	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<ProbihajiciZapas />
				<NasledujiciZapasy />
			</>
		);
	}
}

export default Main;
