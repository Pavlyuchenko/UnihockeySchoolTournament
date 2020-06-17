import React, { Component } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import "./css/adming.css";

class AdminGroup extends Component {
	state = {
		zapasy: [],
		classes: [],
		displayNew: "none",
		tymy: [],
		chosenId: 1,
		chosenDomaci: 1,
		chosenHoste: 1,
		order: 10,
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
					tymy: result.tymy,
				});
			});
	};

	createZapasy = () => {
		let res = [];

		for (let zapas of this.state.zapasy) {
			res.push(
				<div className="adming-zapas" key={zapas.id + "asedsadasf"}>
					<div className="adming-zapas-flex">
						<span className="adming-zapasy-home-team">
							{zapas.domaci}
						</span>
						<span className="adming-zapasy-cas">{zapas.cas}</span>
						<span className="adming-zapasy-away-team">
							{zapas.hoste}
						</span>
					</div>
					<span className="adming-zapasy-order">
						<input
							type="text"
							onChange={(e) =>
								this.onChange(
									e,
									this.state.zapasy.indexOf(zapas)
								)
							}
							value={zapas.order}
							className="adming-zapasy-order-input"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									const requestOptions = {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
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
								backgroundColor: this.state.classes[
									this.state.zapasy.indexOf(zapas)
								],
							}}
						/>
					</span>
				</div>
			);
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

	addZapas = () => {
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
					<td align="right">A</td>
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

	chosenTeam = () => {
		let tym = this.state.tymy.filter(
			(team) => team.id === this.state.chosenId
		);

		let nazev = "";
		let hraciArr = [];
		let zapasy = [];
		let zapasyArr = [];
		if (tym.length > 0) {
			nazev = tym[0].nazev;

			for (let hrac of tym[0].hraci) {
				hraciArr.push(
					<div key={hrac.jmeno} className="adming-tym-detail-hraci">
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
					<div className="adming-tym-detail-zapas" key={zapas}>
						<span key={"Domaci" + zapas.domaci + zapas.hoste}>
							{zapas.domaci}
						</span>
						<span
							key={"Cas" + zapas.cas + zapas.domaci + zapas.hoste}
						>
							{zapas.cas}
						</span>
						<span key={"Hoste" + zapas.domaci + zapas.hoste}>
							{zapas.hoste}
						</span>
					</div>
				);
			}
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
					<div>
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
				</div>
			</section>
		);
	};

	tymyOption = () => {
		let res = [];

		for (let tym of this.state.tymy) {
			res.push(
				<option value={tym.id} key={"tyym" + tym.id}>
					{tym.nazev}
				</option>
			);
		}

		return res;
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />

				<section id="adming-zapasy">
					<h3>Pořadí zápasů</h3>
					<div id="adming-zapasy-popis-flex">
						<div id="adming-zapasy-popis">
							<span>Domácí</span>
							<span>Čas</span>
							<span>Hosté</span>
						</div>
						<span id="adming-zapasy-order-popis">Order</span>
					</div>

					{this.createZapasy()}

					<div id="adming-zapasy-pridat" onClick={this.addZapas}>
						Přidat
					</div>
				</section>

				<section
					id="adming-zapasy-novy-zapas"
					style={{ display: this.state.displayNew }}
				>
					<div id="adming-zapasy-novy-domaci">
						<span>Domácí</span>
						<select
							onChange={(e) => {
								this.setState({ chosenDomaci: e.target.value });
							}}
							value={this.state.chosenDomaci}
						>
							{this.tymyOption()}
						</select>
					</div>
					<div id="adming-zapasy-novy-hoste">
						<span>Hosté</span>
						<select
							onChange={(e) => {
								this.setState({ chosenHoste: e.target.value });
							}}
							value={this.state.chosenHoste}
						>
							{this.tymyOption()}
						</select>
					</div>
					<div id="adming-zapasy-novy-order">
						<span>Order</span>
						<div style={{ display: "flex" }}>
							<input
								value={this.state.order}
								onChange={(e) => {
									this.setState({ order: e.target.value });
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										const requestOptions = {
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												domaci_id: this.state
													.chosenDomaci,
												hoste_id: this.state
													.chosenHoste,
												order: this.state.order,
											}),
										};
										fetch(
											"http://127.0.0.1:5000/add_zapas",
											requestOptions
										).then(() => this.loadZapasyAndTymy());
										this.addZapas();
									}
								}}
							/>
							<button
								onClick={(e) => {
									const requestOptions = {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											domaci_id: this.state.chosenDomaci,
											hoste_id: this.state.chosenHoste,
											order: this.state.order,
										}),
									};
									fetch(
										"http://127.0.0.1:5000/add_zapas",
										requestOptions
									).then(() => this.loadZapasyAndTymy());
									this.addZapas();
								}}
							>
								+
							</button>
						</div>
					</div>
				</section>

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
			</>
		);
	}
}

export default AdminGroup;
