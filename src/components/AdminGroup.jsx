import React, { Component } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import "./css/adming.css";

class AdminGroup extends Component {
	state = { zapasy: [], classes: [], displayNew: "none" };

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
									).then(() => this.loadZapasy());
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
						<select>
							<option value="Antišunky">Antišunky</option>
							<option value="Antišunky">Antišunky</option>
							<option value="Antišunky">Antišunky</option>
							<option value="Antišunky">Antišunky</option>
							<option value="Antišunky">Antišunky</option>
							<option value="Antišunky">Antišunky</option>
						</select>
					</div>
					<div id="adming-zapasy-novy-hoste">
						<span>Hosté</span>
						<select>
							<option value="Antišunky">Antišunky</option>
						</select>
					</div>
					<div id="adming-zapasy-novy-order">
						<span>Order</span>
						<div style={{ display: "flex" }}>
							<input />
							<button>+</button>
						</div>
					</div>
				</section>

				<section id="adming-tymy">
					<h3>Seznam týmů</h3>
					<table>
						<thead>
							<tr>
								<th>Název</th>
								<th>Sk</th>
								<th>B</th>
								<th>Z</th>
								<th>Post</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Antišunkofleci</td>
								<td>A</td>
								<td>3</td>
								<td>2</td>
								<td>V</td>
							</tr>
							<tr>
								<td>Učitelé</td>
								<td>B</td>
								<td>6</td>
								<td>2</td>
								<td>V</td>
							</tr>
							<tr>
								<td>Vygrachanci</td>
								<td>C</td>
								<td>4</td>
								<td>2</td>
								<td>V</td>
							</tr>
							<tr>
								<td>Antišunkofleci</td>
								<td>A</td>
								<td>3</td>
								<td>2</td>
								<td>V</td>
							</tr>
							<tr>
								<td>Učitelé</td>
								<td>B</td>
								<td>6</td>
								<td>2</td>
								<td>V</td>
							</tr>
							<tr>
								<td>Vygrachanci</td>
								<td>C</td>
								<td>4</td>
								<td>2</td>
								<td>V</td>
							</tr>
						</tbody>
					</table>
				</section>
			</>
		);
	}
}

export default AdminGroup;
