import React, { Component } from "react";
import Logo from "../Logo";
import Navigation from "../Navigation";
import AdminGPořadíZápasů from "./AdminGPořadíZápasů";
import AdminGNovyZapas from "./AdminGNovyZapas";
import AdminGTabulka from "./AdminGTabulka";
import AdminGChosenTeam from "./AdminGChosenTeam";
import "../css/adming.css";

class AdminGroup extends Component {
	state = {
		zapasy: [],
		classes: [],
		displayNew: "none",
		tymy: [],
		chosenId: 1,
	};

	componentDidMount() {
		this.loadZapasyAndTymy();
	}

	loadZapasyAndTymy = () => {
		fetch("http://127.0.0.1:5000/adming")
			.then((response) => response.json())
			.then((result) => {
				let classes = [];
				for (let i = 0; i < result.zapasy.length; i++) {
					classes.push("");
				}

				this.setState({
					zapasy: result.zapasy,
					classes: classes,
					classesOdehrane: classes,
					tymy: result.tymy,
					odehraneZapasy: result.odehrane_zapasy,
				});
			});
	};

	createOdehraneZapasy = () => {
		let res = [];

		if (this.state.odehraneZapasy) {
			for (let zapas of this.state.odehraneZapasy) {
				res.push(
					<div
						className="adming-odehrany-zapas"
						key={zapas.id + "asedsadasf"}
					>
						<div className="adming-odehrany-zapas-flex">
							<span className="adming-odehrany-zapasy-home-team">
								{zapas.domaci}
							</span>
							<span className="adming-odehrany-zapasy-cas">
								{zapas.cas}
							</span>
							<span className="adming-odehrany-zapasy-away-team">
								{zapas.hoste}
							</span>
						</div>
						<span className="adming-odehrany-zapasy-order">
							<input
								type="text"
								onChange={(e) =>
									this.onOdehranyZapasChangeDomaci(
										e,
										this.state.odehraneZapasy.indexOf(zapas)
									)
								}
								value={zapas.skore1}
								className="adming-odehrany-zapasy-skore-domaci-input"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										const requestOptions = {
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												id: zapas.id,
												skore1: zapas.skore1,
												skore2: zapas.skore2,
											}),
										};
										fetch(
											"http://127.0.0.1:5000/update_skore_odehrany_zapas",
											requestOptions
										).then(() => this.loadZapasyAndTymy());
									}
								}}
							/>

							<input
								type="text"
								onChange={(e) =>
									this.onOdehranyZapasChangeHoste(
										e,
										this.state.odehraneZapasy.indexOf(zapas)
									)
								}
								value={zapas.skore2}
								className="adming-odehrany-zapasy-skore-domaci-input"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										const requestOptions = {
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												id: zapas.id,
												skore1: zapas.skore1,
												skore2: zapas.skore2,
											}),
										};
										fetch(
											"http://127.0.0.1:5000/update_skore_odehrany_zapas",
											requestOptions
										).then(() => this.loadZapasyAndTymy());
									}
								}}
							/>
						</span>
						<span className="adming-odehrany-zapasy-order">
							<input
								type="text"
								onChange={(e) =>
									this.onOdehranyZapasChange(
										e,
										this.state.odehraneZapasy.indexOf(zapas)
									)
								}
								value={zapas.order}
								className="adming-odehrany-zapasy-order-input"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										const requestOptions = {
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												id: zapas.id,
												order: e.target.value,
											}),
										};
										fetch(
											"http://127.0.0.1:5000/update_order",
											requestOptions
										).then(() => this.loadZapasyAndTymy());
									}
								}}
								style={{
									backgroundColor: this.state.classesOdehrane[
										this.state.odehraneZapasy.indexOf(zapas)
									],
								}}
							/>
						</span>
					</div>
				);
			}
		}

		return res;
	};

	onOrderChange = (e, id) => {
		let zapasy = [...this.state.zapasy];
		let zapas = { ...zapasy[id] };

		zapas.order = e.target.value;
		zapasy[id] = zapas;

		let classes = [...this.state.classes];
		let clas = { ...classes[id] };

		clas = "#4CAF50";
		classes[id] = clas;

		this.setState({ zapasy: zapasy, classes: classes });
	};

	onOdehranyZapasChange = (e, id) => {
		let zapasy = [...this.state.odehraneZapasy];
		let zapas = { ...zapasy[id] };

		zapas.order = e.target.value;
		zapasy[id] = zapas;

		let classes = [...this.state.classesOdehrane];
		let clas = { ...classes[id] };

		clas = "#4CAF50";
		classes[id] = clas;

		this.setState({ odehraneZapasy: zapasy, classesOdehrane: classes });
	};

	onOdehranyZapasChangeDomaci = (e, id) => {
		let zapasy = [...this.state.odehraneZapasy];
		let zapas = { ...zapasy[id] };

		zapas.skore1 = e.target.value;
		zapasy[id] = zapas;

		this.setState({ odehraneZapasy: zapasy });
	};

	onOdehranyZapasChangeHoste = (e, id) => {
		let zapasy = [...this.state.odehraneZapasy];
		let zapas = { ...zapasy[id] };

		zapas.skore2 = e.target.value;
		zapasy[id] = zapas;

		this.setState({ odehraneZapasy: zapasy });
	};

	addZapasDisplayBox = () => {
		if (this.state.displayNew === "none") {
			this.setState({ displayNew: "" });
		} else {
			this.setState({ displayNew: "none" });
		}
	};

	addTableRow = () => {
		let res = [];

		for (let tym of this.state.tymy) {
			res.push(
				<tr
					key={tym.nazev + tym.id}
					onClick={() => this.setState({ chosenId: tym.id })}
				>
					<td>{tym.nazev}</td>
					<td align="right">{tym.skupina ? tym.skupina : ""}</td>
					<td align="right">{tym.body}</td>
					<td align="right">{tym.vyhry}</td>
					<td align="right">{tym.remizy}</td>
					<td align="right">{tym.prohry}</td>
					<td align="right">{tym.zapasy}</td>
				</tr>
			);
		}

		return res;
	};

	updateTymStatistiky = (e, tym, stat) => {
		let tymy = [...this.state.tymy];
		let tymVar = tymy.filter((a) => tym.id === a.id)[0];

		switch (stat) {
			case "body":
				tymVar.body = e.target.value;
				break;
			case "zapasy":
				tymVar.zapasy = e.target.value;
				break;
			case "vyhry":
				tymVar.vyhry = e.target.value;
				break;
			case "remizy":
				tymVar.remizy = e.target.value;
				break;
			case "prohry":
				tymVar.prohry = e.target.value;
				break;
			case "vstrelene_goly":
				tymVar.vstrelene_goly = e.target.value;
				break;
			case "skupina":
				tymVar.skupina = e.target.value;
				break;
			case "obdrzene_goly":
				tymVar.obdrzene_goly = e.target.value;
				break;
			default:
				break;
		}

		this.setState({ tymy: tymy });
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />

				<AdminGPořadíZápasů
					addZapasDisplayBox={this.addZapasDisplayBox}
					zapasy={this.state.zapasy}
					classes={this.state.classes}
					onOrderChange={this.onOrderChange}
					loadZapasyAndTymy={this.loadZapasyAndTymy}
				/>

				<AdminGNovyZapas
					displayNew={this.state.displayNew}
					tymy={this.state.tymy}
					loadZapasyAndTymy={this.loadZapasyAndTymy}
					addZapasDisplayBox={this.addZapasDisplayBox}
				/>
				<div id="adming-flex-wrapper">
					<AdminGTabulka
						addTableRow={this.addTableRow}
						chosenTeam={this.chosenTeam}
					/>

					<AdminGChosenTeam
						tymy={this.state.tymy}
						chosenId={this.state.chosenId}
						zapasy={this.state.zapasy}
						updateTymStatistiky={this.updateTymStatistiky}
						loadZapasyAndTymy={this.loadZapasyAndTymy}
					/>
				</div>

				<section id="adming-odehrany-zapasy">
					<h3>Odehrané zápasy</h3>
					<div id="adming-odehrany-zapasy-popis-flex">
						<div id="adming-odehrany-zapasy-popis">
							<span>Domácí</span>
							<span>Čas</span>
							<span>Hosté</span>
						</div>
						<span id="adming-odehrany-zapasy-order-popis">
							Skóre
						</span>
						<span id="adming-odehrany-zapasy-order-popis">
							Order
						</span>
					</div>

					{this.createOdehraneZapasy()}
				</section>
			</>
		);
	}
}

export default AdminGroup;
