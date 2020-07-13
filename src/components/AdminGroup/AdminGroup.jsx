import React, { Component } from "react";
import Logo from "../Logo";
import Navigation from "../Navigation";
import AdminGPořadíZápasů from "./AdminGPořadíZápasů";
import AdminGNovyZapas from "./AdminGNovyZapas";
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

	onChange = (e, id) => {
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

	sendData = (e, tym) => {
		if (e.key === "Enter") {
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: tym.id,
					body: tym.body,
					zapasy: tym.zapasy,
					vyhry: tym.vyhry,
					remizy: tym.remizy,
					prohry: tym.prohry,
					obdrzene_goly: tym.obdrzene_goly,
					vstrelene_goly: tym.vstrelene_goly,
					skupina: tym.skupina,
				}),
			};
			fetch(
				"http://127.0.0.1:5000/update_tym_statistiky",
				requestOptions
			).then(() => this.loadZapasyAndTymy());
		}
	};

	chosenTeam = () => {
		let tym = this.state.tymy.filter(
			(team) => team.id === this.state.chosenId
		);

		let nazev = "";
		let hraciArr = [];
		let zapasy = [];
		let zapasyArr = [];
		let tymStatistiky = [];
		if (tym.length > 0) {
			nazev = tym[0].nazev;

			for (let hrac of tym[0].hraci) {
				hraciArr.push(
					<div
						key={hrac.jmeno + hrac}
						className="adming-tym-detail-hraci"
					>
						<span>{hrac.jmeno}</span>
						<span>{hrac.trida}</span>
					</div>
				);
			}

			zapasy = this.state.zapasy.filter(
				(zapas) => zapas.domaci === nazev || zapas.hoste === nazev
			);

			for (let zapas of zapasy) {
				zapasyArr.push(
					<div
						className="adming-tym-detail-zapas"
						key={zapas + zapas.skore1 + zapas.domaci + zapas.hoste}
					>
						<span>{zapas.domaci}</span>
						<span>{zapas.cas}</span>
						<span>{zapas.hoste}</span>
					</div>
				);
			}

			tym = tym[0];

			tymStatistiky.push(
				<React.Fragment key={"Stat" + tym.skupina + tym.nazev}>
					<div>
						<label htmlFor="">Sk</label>
						<input
							type="text"
							value={tym.skupina}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "skupina")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">Body</label>
						<input
							type="text"
							value={tym.body}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "body")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">Záp</label>
						<input
							type="text"
							value={tym.zapasy}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "zapasy")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">V</label>
						<input
							type="text"
							value={tym.vyhry}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "vyhry")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">R</label>
						<input
							type="text"
							value={tym.remizy}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "remizy")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">P</label>
						<input
							type="text"
							value={tym.prohry}
							onChange={(e) =>
								this.updateTymStatistiky(e, tym, "prohry")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>

					<div>
						<label htmlFor="">VG</label>
						<input
							type="text"
							value={tym.vstrelene_goly}
							onChange={(e) =>
								this.updateTymStatistiky(
									e,
									tym,
									"vstrelene_goly"
								)
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">OG</label>
						<input
							type="text"
							value={tym.obdrzene_goly}
							onChange={(e) =>
								this.updateTymStatistiky(
									e,
									tym,
									"obdrzene_goly"
								)
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
				</React.Fragment>
			);
		}

		return (
			<section id="adming-tym-detail">
				<h3>{nazev}</h3>
				<div id="adming-tym-detail-flex">
					<div style={{ width: "48%" }}>
						<h4>Následující zápasy</h4>
						{zapasyArr}
					</div>
					<div style={{ width: "48%" }}>
						<h4 style={{ textAlign: "right" }}>Soupiska</h4>
						{hraciArr}
					</div>
				</div>

				<div id="adming-tym-info">
					{
						tymStatistiky /*<div>
						<label htmlFor="">Body</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">Záp</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">V</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">R</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">P</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">GR</label>
						<input type="text" value="7" onChange={() => ""} />
					</div>
					<div>
						<label htmlFor="">Sk</label>
						<input type="text" value="A" onChange={() => ""} />
					</div>*/
					}
				</div>
			</section>
		);
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />

				<AdminGPořadíZápasů
					createZapasy={this.createZapasy}
					addZapasDisplayBox={this.addZapasDisplayBox}
					zapasy={this.state.zapasy}
					classes={this.state.classes}
					onChange={this.onChange}
					loadZapasyAndTymy={this.loadZapasyAndTymy}
				/>

				<AdminGNovyZapas
					displayNew={this.state.displayNew}
					tymy={this.state.tymy}
					loadZapasyAndTymy={this.loadZapasyAndTymy}
					addZapasDisplayBox={this.addZapasDisplayBox}
				/>

				<div id="adming-flex-wrapper">
					<section id="adming-tymy">
						<h3>Seznam týmů</h3>
						<table>
							<thead>
								<tr>
									<th>Název</th>
									<th align="right">Sk</th>
									<th align="right">B</th>
									<th align="right">V</th>
									<th align="right">R</th>
									<th align="right">P</th>
									<th align="right">Z</th>
								</tr>
							</thead>
							<tbody>{this.addTableRow()}</tbody>
						</table>
					</section>

					{this.chosenTeam()}
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
