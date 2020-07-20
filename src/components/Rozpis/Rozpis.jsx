import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import { isMobile } from "react-device-detect";
import RozpisZapas from "./RozpisZapas";
import RozpisNewZapas from "./RozpisNewZapas";
import "../css/rozpis.css";

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
				this.setState({
					zapasy: result.zapasy,
					odehraneZapasy: result.odehrane_zapasy,
				});
			});
	};

	createRozpis = () => {
		let zapasy = [];

		for (let zapas of this.state.zapasy) {
			if (isMobile) {
				zapasy.push(
					<RozpisNewZapas
						domaci={zapas.domaci}
						cas={"9:00" /*zapas.cas*/}
						hoste={zapas.hoste}
						key={zapas.domaci + " asd1 " + zapas.hoste}
					/>
				);
			} else {
				zapasy.push(
					<RozpisZapas
						domaci={zapas.domaci}
						cas={"9:00" /*zapas.cas*/}
						hoste={zapas.hoste}
						key={zapas.domaci + " asd2 " + zapas.hoste}
					/>
				);
			}
		}
		return zapasy;
	};

	createOdehrane = () => {
		let zapasy = [];

		if (this.state.odehraneZapasy) {
			for (let zapas of this.state.odehraneZapasy) {
				if (isMobile) {
					zapasy.push(
						<RozpisNewZapas
							domaci={zapas.domaci}
							hoste={zapas.hoste}
							skore1={zapas.skore1}
							skore2={zapas.skore2}
							key={zapas.domaci + " asd " + zapas.hoste}
						/>
					);
				} else {
					zapasy.push(
						<RozpisZapas
							domaci={zapas.domaci}
							hoste={zapas.hoste}
							skore1={zapas.skore1}
							skore2={zapas.skore2}
							key={zapas.domaci + " asd " + zapas.hoste}
						/>
					);
				}
			}
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
						<h1>Rozpis</h1>
					</div>
					<div id="rozpis-zapasy">{this.createRozpis()}</div>
				</div>

				<div id="rozp-wrapper">
					<div id="rozpis-nadpis">
						<h1>Odehrané zápasy</h1>
					</div>
					<div id="rozpis-zapasy">{this.createOdehrane()}</div>
				</div>
			</>
		);
	}
}

export default Rozpis;
