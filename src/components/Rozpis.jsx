import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import RozpisZapas from "./RozpisZapas";
import "./css/rozpis.css";

class Rozpis extends Component {
	state = {};

	createRozpis = () => {
		let zapasy = [];

		for (let i = 0; i < 20; i++) {
			zapasy.push(
				<RozpisZapas
					domaci="Antišunkofleci"
					cas={i + ":00"}
					hoste="Adámkovy ŠD"
					key={i}
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
