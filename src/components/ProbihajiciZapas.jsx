import React, { Component } from "react";
import "./css/probihajici_zapas.css";

class ProbihajiciZapas extends Component {
	state = {};
	render() {
		return (
			<section id="prob-zap-sect">
				<h2 id="prob-zap-h2">Probíhající zápas:</h2>
				<div id="prob-zap-wrapper">
					<div id="prob-zap-tymy"></div>
					<div id="prob-zap-skore-wrapper">
						<div id="prob-zap-domaci">
							<span className="prob-zap-jmeno">Vygrachanci</span>5
							<span id="prob-zap-timer-left">12</span>
						</div>
						<div id="prob-zap-hoste">
							<span className="prob-zap-jmeno">
								Antišunkofleci
							</span>
							4<span id="prob-zap-timer-right">56</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default ProbihajiciZapas;
