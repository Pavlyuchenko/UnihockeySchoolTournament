import React, { Component } from "react";
import "../css/nasledujici_zapasy.css";
import Zapas from "./Zapas";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import RozpisNewZapas from "../Rozpis/RozpisNewZapas";
import RozpisZapas from "../Rozpis/RozpisZapas";

class NasledujiciZapasy extends Component {
	state = { zapasy: [] };

	createZapasy = () => {
		let result = [];
		let domaci = "";
		let hoste = "";

		var tempDate = new Date()
		var date = new Date(Math.ceil((tempDate.getTime()) / 60000) * 60000 + parseInt(this.props.timeToNext) * 60000);
		var minutes = date.getMinutes();
		var hour = date.getHours();

		for (let i = 1; i < this.props.zapasy.length; i++) {
			domaci = this.props.zapasy[i].domaci;
			hoste = this.props.zapasy[i].hoste;

			if (minutes >= 60) {
				hour += 1
				minutes = minutes % 60
			}

			if (isMobile) {
				result.push(
					<RozpisNewZapas
						domaci={domaci}
						hoste={hoste}
						cas={hour + ":" + (minutes < 10 ? "0" + minutes : minutes) }
						key={domaci + " asd " + hoste}
					/>
				);
			} else {
				result.push(
					<RozpisZapas
						domaci={domaci}
						hoste={hoste}
						cas={hour + ":" + (minutes < 10 ? "0" + minutes : minutes) }
						key={domaci + "vs" + hoste + i}
					/>
				);
			}

			minutes += this.props.delkaZapasu + this.props.prestavkaMeziZapasy
		}

		return result;
	};

	render() {
		return (
			<section id="nasl-zap-sect">
				<div id="nasl-zap-h2">
					<h2>Následující zápasy</h2>
					{this.createZapasy()}
					<Link to="/rozpis" id="nasl-zap-rozpis">
						Celý rozpis
					</Link>
				</div>
			</section>
		);
	}
}

export default NasledujiciZapasy;
