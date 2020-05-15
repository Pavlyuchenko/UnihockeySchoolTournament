import React, { Component } from "react";
import "./css/nasledujici_zapasy.css";
import Zapas from "./Zapas";
import { Link } from "react-router-dom";

class NasledujiciZapasy extends Component {
	state = {};
	render() {
		return (
			<section id="nasl-zap-sect">
				<div id="nasl-zap-h2">
					<h2>Následující zápasy</h2>
					<Zapas domaci="Učitelé" hoste="Vygrachanci" />
					<Zapas domaci="Sugarboyz" hoste="Koťátka" />
					<Zapas domaci="Kaspaři" hoste="Adámkovy ŠD" />
					<Zapas domaci="Boney M" hoste="Koťátka" />
					<Zapas domaci="Pobo Team" hoste="Kaspaři" />
					<Link to="/rozpis" id="nasl-zap-rozpis">
						Celý rozpis
					</Link>
				</div>
			</section>
		);
	}
}

export default NasledujiciZapasy;
