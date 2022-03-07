import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import { isMobile } from "react-device-detect";
import RozpisZapas from "./RozpisZapas";
import RozpisNewZapas from "./RozpisNewZapas";
import "../css/rozpis.css";

class Rozpis extends Component {
	state = { zapasyA: [], zapasyB: [] };

	componentDidMount() {
		this.getZapasy();
		setInterval(this.getZapasy, 120000);
	}

	getZapasy = () => {
		fetch("https://vfbapi.pythonanywhere.com/get_zapasy")
			.then((response) => response.json())
			.then((result) => {
				let delkaZapasu = parseInt(result.match_info.delka_zapasu)
				let prestavkaMeziZapasy = parseInt(result.match_info.prestavka_mezi_zapasy)

				if (result.zapasyA.length === 0 && result.zapasyB.length === 0){
					window.location.href = "/"
				}

				this.setState({
					zapasyA: result.zapasyA,
					odehraneZapasyA: result.odehrane_zapasyA,
					zapasyB: result.zapasyB,
					odehraneZapasyB: result.odehrane_zapasyB,
					matchInfo: {
						delkaZapasu: delkaZapasu,
						prestavkaMeziZapasy: prestavkaMeziZapasy,
					}
				});


			});
	};

	/* createRozpis = () => {
		let zapasy = [];
		let cas = "";

		let timeToNext = this.state.matchInfo?.delkaZapasu - this.state.matchInfo?.currMinuty + parseInt(this.state.matchInfo?.prestavkaMeziZapasy)
		
		var tempDate = new Date()
		var date = new Date(Math.ceil((tempDate.getTime()) / 60000) * 60000 + parseInt(timeToNext) * 60000);
		var minutes = date.getMinutes();
		var hour = date.getHours();

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
	}; */

	createRozpis = () => {
		let zapasy = [];
		
		for (let i = 0; i < Math.max(this.state.zapasyA.length, this.state.zapasyB.length); i++) {
			let zapasA = this.state.zapasyA[i];
			let zapasB = this.state.zapasyB[i];
			console.log(zapasA)
			if (isMobile) {
				zapasy.push(
					<>
						<RozpisNewZapas
							domaci={zapasA?.domaci}
							cas={zapasA?.cas}
							hoste={zapasA?.hoste}
							key={zapasA?.domaci + " vsA " + zapasA?.hoste}
							skupina={this.state.zapasyA[i]?.skupina}
						/>
						<div style={{ marginTop: "-9px" }}></div>
						<RozpisNewZapas
							domaci={zapasB?.domaci}
							cas={zapasB?.cas}
							hoste={zapasB?.hoste}
							key={zapasB?.domaci + " vsB " + zapasB?.hoste}
							skupina={this.state.zapasyB[i]?.skupina}
						/>
						<div style={{ height: "16px" }}></div>
					</>
				);
			} else {
				zapasy.push(
					<>
						<RozpisZapas
							domaci={zapasA?.domaci}
							cas={zapasA?.cas}
							hoste={zapasA?.hoste}
							key={zapasA?.domaci + " vsA " + zapasA?.hoste}
							skupina={this.state.zapasyA[i]?.skupina}
						/>
						<div style={{ marginTop: "-7px" }}></div>
						<RozpisZapas
							domaci={zapasB?.domaci}
							cas={zapasB?.cas}
							hoste={zapasB?.hoste}
							key={zapasB?.domaci + " vsB " + zapasB?.hoste}
							skupina={this.state.zapasyB[i]?.skupina}
						/>
						<div style={{ height: "2px" }}></div>
					</>
				);
			}
		}
		return zapasy;
	};

	createOdehrane = () => {
		let zapasy = [];

		for (let i = 0; i < Math.max(this.state.odehraneZapasyA?.length, this.state.odehraneZapasyB?.length); i++) {
			let zapasA = this.state.odehraneZapasyA[i];
			let zapasB = this.state.odehraneZapasyB[i];
			if (isMobile) {
				zapasy.push(
					<>
						<RozpisNewZapas
							domaci={zapasA?.domaci}
							cas={zapasA?.skore1 + ":" + zapasA?.skore2}
							hoste={zapasA?.hoste}
							key={zapasA?.domaci + " vsAo " + zapasA?.hoste}
						/>
						<div style={{ marginTop: "-9px" }}></div>
						<RozpisNewZapas
							domaci={zapasB?.domaci}
							cas={zapasB?.skore1 + ":" + zapasB?.skore2}
							hoste={zapasB?.hoste}
							key={zapasB?.domaci + " vsBo " + zapasB?.hoste}
						/>
						<div style={{ height: "16px" }}></div>
					</>
				);
			} else {
				zapasy.push(
					<>
						<RozpisZapas
							domaci={zapasA?.domaci}
							cas={zapasA?.skore1 + ":" + zapasA?.skore2}
							hoste={zapasA?.hoste}
							key={zapasA?.domaci + " vsAo " + zapasA?.hoste}
						/>
						<div style={{ marginTop: "-7px" }}></div>
						<RozpisZapas
							domaci={zapasB?.domaci}
							cas={zapasB?.skore1 + ":" + zapasB?.skore2}
							hoste={zapasB?.hoste}
							key={zapasB?.domaci + " vsBo " + zapasB?.hoste}
						/>
						<div style={{ height: "2px" }}></div>
					</>
				);
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
						<p onClick={() => {
							alert("Horní zápas ve dvojici se hraje na hřišti A, dolní na hřišti B.")
						}} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
					</div>

					<div id="rozpis-zapasy">{this.createRozpis()}</div>
				</div>

				<div id="rozp-wrapper">
					<div id="rozpis-nadpis">
						<h1>Odehrané zápasy</h1>
						<p onClick={() => {
							alert("Horní zápas ve dvojici se odehrál na hřišti A, dolní na hřišti B.")
						}} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
					</div>
					<div id="rozpis-zapasy">{this.createOdehrane()}</div>
				</div>
			</>
		);
	}
}

export default Rozpis;
