import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import ProbihajiciZapas from "./ProbihajiciZapas";
import NasledujiciZapasy from "./NasledujiciZapasy";
import HrajiciTabulka from "./HrajiciTabulka";

class Main extends Component {
	state = {
		favTeam: "",
		test: "",
		zapasy: [],
		casovac: "",
		prvniZapas: [],
		blikClassDomaci: false,
		blikClassHoste: false,
	};

	componentDidMount() {
		const favTeam = JSON.parse(localStorage.getItem("favTeam"));

		this.setState({ favTeam: favTeam });

		/*fetch("https://vfbapi.pythonanywhere.com/")
			.then((result) => result.json())
			.then((result) =>
				this.setState({ test: result.hello }, function () {
					console.log(this.state.test);
				})
			);*/
		fetch("https://vfbapi.pythonanywhere.com/main")
			.then((response) => response.json())
			.then((result) => {
				let arr = [];
				for (let zapas of result.zapasy) {
					arr.push(zapas);
				}
				this.setState(
					{
						zapasy: arr,
						casovac: result.casovac,
						prvniZapas: arr[0],
						tymy: result.tymy,
					},
					function () {
						if (this.interval) {
							clearInterval(this.interval);
						}

						this.interval = setInterval(this.updateTimer, 1000);
					}
				);
			});
		this.fetchUpdateInt = setInterval(this.fetchUpdate, 10000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		clearInterval(this.fetchUpdateInt);
	}

	fetchUpdate = () => {
		fetch("https://vfbapi.pythonanywhere.com/main")
			.then((response) => response.json())
			.then((result) => {
				let arr = [];
				for (let zapas of result.zapasy) {
					arr.push(zapas);
				}

				let domaciGol = "";
				let hosteGol = "";

				if (this.state.prvniZapas.skore1 < arr[0].skore1) {
					domaciGol = "anim";
					setTimeout(() => {
						this.setState({ blikClassDomaci: "" });
					}, 4000);
				}
				if (this.state.prvniZapas.skore2 < arr[0].skore2) {
					hosteGol = "animh";
					setTimeout(() => {
						this.setState({ blikClassHoste: "" });
					}, 4000);
				}
				this.setState(
					{
						zapasy: arr,
						casovac: result.casovac,
						prvniZapas: arr[0],
						blikClassDomaci: domaciGol,
						blikClassHoste: hosteGol,
						tymy: result.tymy,
					},
					function () {
						if (this.interval) {
							clearInterval(this.interval);
						}

						this.interval = setInterval(this.updateTimer, 1000);
					}
				);
			});
	};

	updateTimer = () => {
		if (!this.state.casovac.pause) {
			let casovac = this.state.casovac;

			if (casovac.sekundy >= 59) {
				casovac.minuty++;
				casovac.sekundy = 0;
			} else {
				casovac.sekundy++;
			}

			this.setState({ casovac: casovac });
		}
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<ProbihajiciZapas
					casovac={this.state.casovac}
					zapas={this.state.prvniZapas}
					blikClassDomaci={this.state.blikClassDomaci}
					blikClassHoste={this.state.blikClassHoste}
				/>
				<NasledujiciZapasy zapasy={this.state.zapasy} />
				<HrajiciTabulka tymy={this.state.tymy} />
			</>
		);
	}
}

export default Main;
