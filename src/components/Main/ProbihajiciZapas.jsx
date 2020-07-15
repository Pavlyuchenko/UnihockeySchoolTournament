import React, { Component } from "react";
import "../css/probihajici_zapas.css";

class ProbihajiciZapas extends Component {
	state = {};

	/*componentDidMount() {
		fetch("http://127.0.0.1:5000/choose_team")
			.then((response) => response.json())
			.then((result) => {
				for (let tym of result.tymy) {
					let hraci = [];
					let tridy = "";
					for (let hrac of tym.hraci) {
						hraci.push(hrac.jmeno);
						if (!tridy.includes(hrac.trida)) {
							tridy += hrac.trida + ", ";
						}
					}
					tridy = tridy.slice(0, -2);
					this.setState({
						tymy: [...this.state.tymy, tym.nazev],
						jmenaHracu: [...this.state.jmenaHracu, hraci],
						tridy: [...this.state.tridy, tridy],
					});
				}
			});
	}*/

	render() {
		return (
			<section id="prob-zap-sect">
				{/*<h2 id="prob-zap-h2">Probíhající zápas:</h2>*/}
				<div id="prob-zap-wrapper">
					<div id="prob-zap-tymy"></div>
					<div id="prob-zap-skore-wrapper">
						<div
							id="prob-zap-domaci"
							className={this.props.blikClassDomaci ? "anim" : ""}
						>
							<span className="prob-zap-jmeno">
								{this.props.zapas.domaci}
							</span>
							{this.props.zapas.skore1}
							<span
								id="prob-zap-timer-left"
								style={
									this.props.casovac.pause
										? { color: "#23426E" }
										: {}
								}
							>
								{this.props.casovac.minuty < 12 &&
								this.props.casovac.minuty >= 0
									? this.props.casovac.minuty < 10
										? "0" + this.props.casovac.minuty
										: this.props.casovac.minuty
									: "kon"}
							</span>
						</div>
						<div
							id="prob-zap-hoste"
							className={this.props.blikClassHoste ? "animh" : ""}
						>
							<span className="prob-zap-jmeno">
								{this.props.zapas.hoste}
							</span>
							{this.props.zapas.skore2}
							<span
								id="prob-zap-timer-right"
								style={
									this.props.casovac.pause
										? { color: "#23426E" }
										: {}
								}
							>
								{this.props.casovac.minuty < 12 &&
								this.props.casovac.minuty >= 0
									? this.props.casovac.sekundy < 10
										? "0" + this.props.casovac.sekundy
										: this.props.casovac.sekundy
									: "ec"}
							</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default ProbihajiciZapas;
