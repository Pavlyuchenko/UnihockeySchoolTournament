import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import RozpisZapas from "./RozpisZapas";
import "./css/rozpis.css";

class Rozpis extends Component {
	state = { zapasy: "" };

	componentDidMount() {
		this.getZapasy();
		setInterval(this.getZapasy, 120000);
	}

	getZapasy = () => {
		fetch("http://127.0.0.1:5000/get_zapasy")
			.then((response) => response.json())
			.then((result) => {
				this.setState({ zapasy: result.zapasy });
			});
	};

	createRozpis = () => {
		let zapasy = [];

		for (let zapas of this.state.zapasy) {
			zapasy.push(
				<RozpisZapas
					domaci={zapas.domaci}
					cas={"9:00" /*zapas.cas*/}
					hoste={zapas.hoste}
					key={zapas.domaci + " asd " + zapas.hoste}
				/>
			);
		}
		return zapasy;
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<div id="rozp-wrapper">
					<div id="rozpis-nadpis">
						<h1>Rozpis zápasů</h1>
					</div>
					<div id="rozpis-zapasy">{this.createRozpis()}</div>
				</div>
			</>
		);
	}
}

export default Rozpis;
