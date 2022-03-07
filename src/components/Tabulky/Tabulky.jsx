import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import HrajiciTabulka from "./HrajiciTabulka";

class Tabulky extends Component {
	componentDidMount() {
		fetch("https://vfbapi.pythonanywhere.com/get_teams")
			.then((response) => response.json())
			.then((result) => {
				let tymy = result.tymy
				let A = tymy.filter((el) => el.skupina === "A").sort((a, b) => {
					if (b.body === a.body) {
						let a_goly = a.vstrelene_goly - a.obdrzene_goly
						let b_goly = b.vstrelene_goly - b.obdrzene_goly
						return a_goly > b_goly ? -1 : 1
					}else {
						return a.body > b.body ? -1 : 1
					}
				})
				let B = tymy.filter((el) => el.skupina === "B").sort((a, b) => {
					if (b.body === a.body) {
						let a_goly = a.vstrelene_goly - a.obdrzene_goly
						let b_goly = b.vstrelene_goly - b.obdrzene_goly
						return a_goly > b_goly ? -1 : 1
					}else {
						return a.body > b.body ? -1 : 1
					}
				})
				let C = tymy.filter((el) => el.skupina === "C").sort((a, b) => {
					if (b.body === a.body) {
						let a_goly = a.vstrelene_goly - a.obdrzene_goly
						let b_goly = b.vstrelene_goly - b.obdrzene_goly
						return a_goly > b_goly ? -1 : 1
					}else {
						return a.body > b.body ? -1 : 1
					}
				})
				let D = tymy.filter((el) => el.skupina === "D").sort((a, b) => {
					if (b.body === a.body) {
						let a_goly = a.vstrelene_goly - a.obdrzene_goly
						let b_goly = b.vstrelene_goly - b.obdrzene_goly
						return a_goly > b_goly ? -1 : 1
					}else {
						return a.body > b.body ? -1 : 1
					}
				})
				let E = tymy.filter((el) => el.skupina === "E").sort((a, b) => {
					if (b.body === a.body) {
						let a_goly = a.vstrelene_goly - a.obdrzene_goly
						let b_goly = b.vstrelene_goly - b.obdrzene_goly
						return a_goly > b_goly ? -1 : 1
					}else {
						return a.body > b.body ? -1 : 1
					}
				})

				this.setState(
					{
						A: A,
						B: B,
						C: C,
						D: D,
						E: E,
					});
			});
	}
	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<div style={{marginTop: "50px"}}></div>
				<HrajiciTabulka tymy={this.state.A} skupina="A" />
				<HrajiciTabulka tymy={this.state.B} skupina="B" />
				<HrajiciTabulka tymy={this.state.C} skupina="C" />
				<HrajiciTabulka tymy={this.state.D} skupina="D" />
				<HrajiciTabulka tymy={this.state.E} skupina="E" />
			</>
		);
	}
}

export default Tabulky;
