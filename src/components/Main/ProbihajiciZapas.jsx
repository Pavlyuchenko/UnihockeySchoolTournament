import React, { Component } from "react";
import "../css/probihajici_zapas.css";

class ProbihajiciZapas extends Component {
	render() {
		return (
			<section id="prob-zap-sect">
				<h2 id="prob-zap-h2">Hřiště {this.props.hriste}</h2>
				<div id="prob-zap-wrapper">
					<div id="prob-zap-tymy"></div>
					<div id="prob-zap-skore-wrapper">
						<div
							id="prob-zap-domaci"
							className={this.props.blikClassDomaci ? "anim" : ""}
						>
							<span className="prob-zap-jmeno">
								{this.props.zapas?.domaci}
							</span>
							{this.props.zapas?.skore1}
							<span
								id="prob-zap-timer-left"
								style={
									this.props.casovac.pause
										? { color: "#23426E" }
										: {}
								}
							>
								{this.props.casovac.minuty < this.props.delkaZapasu &&
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
								{this.props.zapas?.hoste}
							</span>
							{this.props.zapas?.skore2}
							<span
								id="prob-zap-timer-right"
								style={
									this.props.casovac.pause
										? { color: "#23426E" }
										: {}
								}
							>
								{this.props.casovac.minuty < this.props.delkaZapasu &&
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
