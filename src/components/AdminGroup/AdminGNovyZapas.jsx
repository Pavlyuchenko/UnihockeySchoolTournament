import React, { Component } from "react";

class AdminGNovyZapas extends Component {
	state = { chosenDomaci: "11", chosenHoste: "11", order: 10 };

	tymyOption = () => {
		let res = [];

		for (let tym of this.props.tymy) {
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
			<section
				id="adming-zapasy-novy-zapas"
				style={{ display: this.props.displayNew }}
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
									).then(() =>
										this.props.loadZapasyAndTymy()
									);
									this.props.addZapasDisplayBox();
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
								).then(() => this.props.loadZapasyAndTymy());
								this.props.addZapasDisplayBox();
							}}
						>
							+
						</button>
					</div>
				</div>
			</section>
		);
	}
}

export default AdminGNovyZapas;
