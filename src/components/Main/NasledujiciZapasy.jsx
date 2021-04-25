import React, { Component } from "react";
import "../css/nasledujici_zapasy.css";
import Zapas from "./Zapas";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import RozpisNewZapas from "../Rozpis/RozpisNewZapas";

class NasledujiciZapasy extends Component {
	state = { zapasy: [] };

	/*componentDidMount() {
		fetch("https://vfbapi.pythonanywhere.com/main")
			.then((response) => response.json())
			.then((result) => {
				let arr = [];
				for (let zapas of result.zapasy) {
					arr.push(zapas);
				}

				this.setState({
					zapasy: arr,
				});
			});
	}*/

	createZapasy = () => {
		let result = [];
		let domaci = "";
		let hoste = "";

		for (let i = 1; i < this.props.zapasy.length; i++) {
			domaci = this.props.zapasy[i].domaci;
			hoste = this.props.zapasy[i].hoste;
			if (isMobile) {
				result.push(
					<RozpisNewZapas
						domaci={domaci}
						hoste={hoste}
						cas={"09:00"}
						key={domaci + " asd " + hoste}
					/>
				);
			} else {
				result.push(
					<Zapas
						domaci={domaci}
						hoste={hoste}
						cas="9:00"
						key={domaci + "vs" + hoste + i}
					/>
				);
			}
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
