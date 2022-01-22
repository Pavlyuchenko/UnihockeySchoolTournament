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
		fetch("https://vfbapi.pythonanywhere.com/get_zapasy")
			.then((response) => response.json())
			.then((result) => {
				let currMinuty = parseInt(result.match_info.current_minuty)
				let delkaZapasu = parseInt(result.match_info.delka_zapasu)
				let prestavkaMeziZapasy = parseInt(result.match_info.prestavka_mezi_zapasy)
				if (currMinuty > delkaZapasu || currMinuty < 0) {
					currMinuty = delkaZapasu
				}

				console.log(result)

				this.setState({
					zapasy: result.zapasy,
					odehraneZapasy: result.odehrane_zapasy,
					matchInfo: {
						currMinuty: currMinuty,
						delkaZapasu: delkaZapasu,
						prestavkaMeziZapasy: prestavkaMeziZapasy,
					}
				});

			});
	};

	createRozpis = () => {
		let zapasy = [];
		let cas = "";

		let timeToNext = this.state.matchInfo?.delkaZapasu - this.state.matchInfo?.currMinuty + parseInt(this.state.matchInfo?.prestavkaMeziZapasy)
		
		var tempDate = new Date()
		var date = new Date(Math.ceil((tempDate.getTime()) / 60000) * 60000 + parseInt(timeToNext) * 60000);
		var minutes = date.getMinutes();
		var hour = date.getHours();
		console.log(hour, minutes)
		console.log(this.state.matchInfo)
		console.log(timeToNext)

		if (this.state.matchInfo?.currMinuty > this.state.matchInfo?.delkaZapasu / 2) {
			minutes -= 1
		}
		
		let hrajici = true;
		for (let zapas of this.state.zapasy) {
			if (minutes >= 60) {
				hour += 1
				minutes = minutes % 60
			}

			if (hrajici) {
				cas = zapas.skore1 + ":" + zapas.skore2
			} else {
				cas = hour + ":" + minutes
			}
			if (isMobile) {
				zapasy.push(
					<RozpisNewZapas
						domaci={zapas.domaci}
						cas={"9:00"}
						hoste={zapas.hoste}
						key={zapas.domaci + " asd1 " + zapas.hoste}
					/>
				);
			} else {
				zapasy.push(
					<RozpisZapas
						domaci={zapas.domaci}
						cas={cas}
						hoste={zapas.hoste}
						key={zapas.domaci + " asd2 " + zapas.hoste}
					/>
				);
			}
			if (!hrajici) {
				minutes += this.state.matchInfo?.delkaZapasu + this.state.matchInfo?.prestavkaMeziZapasy
			}
			hrajici = false
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
