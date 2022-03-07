import React, { Component } from "react";
import "../css/hrajici_tabulka.css";
import { Link } from "react-router-dom";

class HrajiciTabulka extends Component {
	state = {};

	createRow = () => {
		let res = [];

		if (this.props.tymy) {
			for (let tym of this.props.tymy) {
				res.push(
					<div key={tym + "TymStatistika" + tym.nazev}>
						<span style={{ textDecoration: "underline" }}>
							<Link to={"/tym/" + tym.nazev}>{tym.nazev}</Link>
						</span>

						<span>{tym.zapasy}</span>
						<span>{tym.vyhry}</span>
						<span>{tym.remizy}</span>
						<span>{tym.prohry}</span>
						<span>{tym.vstrelene_goly - tym.obdrzene_goly}</span>
						<span>{tym.body}</span>
					</div>
				);
			}
		}
		return res;
	};

	render() {
		return (
			<section id="hrajici-tabulka-sect">
				<div id="hrajici-tabulka-nadpis">
					<h3>Tabulka skupiny {this.props.skupina}</h3>
				</div>
				<div id="hrajici-tabulka-popis">
					<span>Jméno</span>
					<span>Z</span>
					<span>V</span>
					<span>R</span>
					<span>P</span>
					<span>G</span>
					<span>B</span>
				</div>
				<div id="hrajici-tabulka-tabulka">{this.createRow()}</div>
			</section>
		);
	}
}

export default HrajiciTabulka;
