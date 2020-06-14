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
		this.fetchUpdate();
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
				let arr = [];
				for (let zapas of result.zapasy) {
					arr.push(zapas);
				}

				this.setState(
					{
						zapasy: arr,
						casovac: result.casovac,
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
		let casovac = this.state.casovac;

		if (casovac.sekundy >= 59) {
			casovac.minuty++;
			casovac.sekundy = 0;
		} else {
			casovac.sekundy++;
		}

		this.setState({ casovac: casovac });
	};

	state = { favTeam: "", test: "", zapasy: [], casovac: "" };
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<ProbihajiciZapas casovac={this.state.casovac} />
				<NasledujiciZapasy zapasy={this.state.zapasy} />
			</>
		);
	}
}

export default Main;
