import React, { Component } from "react";
import "./css/nasledujici_zapasy.css";
import Zapas from "./Zapas";
import { Link } from "react-router-dom";

class NasledujiciZapasy extends Component {
	state = { zapasy: [] };

	componentDidMount() {
		fetch("http://127.0.0.1:5000/main")
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
	}

	createZapasy = () => {
		let result = [];
		let domaci = "";
		let hoste = "";

		for (let i = 0; i < this.state.zapasy.length; i++) {
			domaci = this.state.zapasy[i].domaci;
			hoste = this.state.zapasy[i].hoste;
			result.push(
				<Zapas
					domaci={domaci}
					hoste={hoste}
					key={domaci + "vs" + hoste + i}
				/>
			);
		}

		return result;
	};

	render() {
		return (
			<section id="nasl-zap-sect">
				<div id="nasl-zap-h2">
					<h2>Následující zápasy</h2>
					{this.createZapasy()}
					{/*<Zapas domaci="Učitelé" hoste="Vygrachanci" />
					<Zapas domaci="Sugarboyz" hoste="Koťátka" />
					<Zapas domaci="Kaspaři" hoste="Adámkovy ŠD" />
					<Zapas domaci="Boney M" hoste="Koťátka" />
					<Zapas domaci="Pobo Team" hoste="Kaspaři" />*/}
					<Link to="/rozpis" id="nasl-zap-rozpis">
						Celý rozpis
					</Link>
				</div>
			</section>
		);
	}
}

export default NasledujiciZapasy;
