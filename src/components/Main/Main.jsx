import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import ProbihajiciZapas from "./ProbihajiciZapas";
import NasledujiciZapasy from "./NasledujiciZapasy";
import HrajiciTabulka from "./HrajiciTabulka";

class Main extends Component {
	state = {
		test: "",
		zapasyA: [],
		zapasyB: [],
		casovacA: "",
		casovacB: "",
		prvniZapasA: [],
		prvniZapasB: [],
		blikClassDomaciA: false,
		blikClassHosteA: false,
		blikClassDomaciB: false,
		blikClassHosteB: false,
		delkaZapasu: 12,
		timeToNext: 0,
	};

	componentDidMount() {
		fetch("http://127.0.0.1:5000/main")
			.then((response) => response.json())
			.then((result) => {
				console.log(result)

				let arrA = [];
				let arrB = [];
				for (let zapas of result.zapasyA) {
					arrA.push(zapas);
				}
				for (let zapas of result.zapasyB) {
					arrB.push(zapas);
				}

				let timeToNextMatch = result.casovacA.trvani_zapasu - result.casovacA.minuty + parseInt(result.casovacA.prestavka_mezi_zapasy)

				this.setState(
					{
						zapasyA: arrA,
						zapasyB: arrB,
						casovacA: result.casovacA,
						casovacB: result.casovacB,
						prvniZapasA: arrA[0],
						prvniZapasB: arrB[0],
						/* tymy: result.tymy, */
						delkaZapasu: result.casovacA.trvani_zapasu,
						timeToNext: timeToNextMatch,
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
		fetch("http://127.0.0.1:5000/main")
			.then((response) => response.json())
			.then((result) => {
				let arrA = [];
				let arrB = [];
				for (let zapas of result.zapasyA) {
					arrA.push(zapas);
				}
				for (let zapas of result.zapasyB) {
					arrB.push(zapas);
				}

				let domaciGolA = "";
				let hosteGolA = "";
				let domaciGolB = "";
				let hosteGolB = "";

				if (this.state.prvniZapasA.skore1 < arrA[0].skore1) {
					domaciGolA = "anim";
					setTimeout(() => {
						this.setState({ blikClassDomaciA: "" });
					}, 4000);
				}
				if (this.state.prvniZapasA.skore2 < arrA[0].skore2) {
					hosteGolA = "animh";
					setTimeout(() => {
						this.setState({ blikClassHosteA: "" });
					}, 4000);
				}
				if (this.state.prvniZapasB.skore1 < arrB[0].skore1) {
					domaciGolB = "anim";
					setTimeout(() => {
						this.setState({ blikClassDomaciB: "" });
					}, 4000);
				}
				if (this.state.prvniZapasB.skore2 < arrB[0].skore2) {
					hosteGolB = "animh";
					setTimeout(() => {
						this.setState({ blikClassHosteB: "" });
					}, 4000);
				}
				this.setState(
					{
						zapasyA: arrA,
						zapasyB: arrB,
						casovacA: result.casovacA,
						casovacB: result.casovacB,
						prvniZapasA: arrA[0],
						prvniZapasB: arrB[0],
						blikClassDomaciA: domaciGolA,
						blikClassHosteA: hosteGolA,
						blikClassDomaciB: domaciGolB,
						blikClassHosteB: hosteGolB,
						/* tymy: result.tymy, */
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
		if (!this.state.casovacA.pause) {
			let casovac = this.state.casovacA;

			if (casovac.sekundy >= 59) {
				casovac.minuty++;
				casovac.sekundy = 0;
			} else {
				casovac.sekundy++;
			}

			let timeToNext = this.state.casovacA.trvani_zapasu - casovac.minuty + parseInt(casovac.prestavka_mezi_zapasy)

			this.setState({ casovacA: casovac, timeToNext: timeToNext });
		}
		if (!this.state.casovacB.pause) {
			let casovac = this.state.casovacB;

			if (casovac.sekundy >= 59) {
				casovac.minuty++;
				casovac.sekundy = 0;
			} else {
				casovac.sekundy++;
			}

			let timeToNext = this.state.casovacA.trvani_zapasu - casovac.minuty + parseInt(casovac.prestavka_mezi_zapasy)

			this.setState({ casovacB: casovac, timeToNext: timeToNext });
		}
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<ProbihajiciZapas
					casovac={this.state.casovacA}
					zapas={this.state.prvniZapasA}
					blikClassDomaci={this.state.blikClassDomaciA}
					blikClassHoste={this.state.blikClassHosteA}
					delkaZapasu={this.state.delkaZapasu}
					hriste="A"
				/>
				<ProbihajiciZapas
					casovac={this.state.casovacB}
					zapas={this.state.prvniZapasB}
					blikClassDomaci={this.state.blikClassDomaciB}
					blikClassHoste={this.state.blikClassHosteB}
					delkaZapasu={this.state.delkaZapasu}
					hriste="B"
				/>
				<NasledujiciZapasy
					zapasy={this.state.zapasyA}
					delkaZapasu={this.state.delkaZapasu}
					timeToNext={this.state.timeToNext}
					prestavkaMeziZapasy={parseInt(this.state.casovacA.prestavka_mezi_zapasy)}
					hriste="A"
				/>
				<div style={{ marginTop: "-35px" }}></div>
				<NasledujiciZapasy
					zapasy={this.state.zapasyB}
					delkaZapasu={this.state.delkaZapasu}
					timeToNext={this.state.timeToNext}
					prestavkaMeziZapasy={parseInt(this.state.casovacB.prestavka_mezi_zapasy)}
					hriste="B"
				/>
				{/* <HrajiciTabulka tymy={this.state.tymy} /> */}
			</>
		);
	}
}

export default Main;
