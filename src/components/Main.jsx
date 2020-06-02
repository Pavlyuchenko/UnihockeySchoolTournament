import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import ProbihajiciZapas from "./ProbihajiciZapas";
import NasledujiciZapasy from "./NasledujiciZapasy";

class Main extends Component {
	componentDidMount() {
		const favTeam = JSON.parse(localStorage.getItem("favTeam"));

		this.setState({ favTeam: favTeam });

		/*fetch("http://127.0.0.1:5000/")
			.then((result) => result.json())
			.then((result) =>
				this.setState({ test: result.hello }, function () {
					console.log(this.state.test);
				})
			);*/
	}

	state = { favTeam: "", test: "" };
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
