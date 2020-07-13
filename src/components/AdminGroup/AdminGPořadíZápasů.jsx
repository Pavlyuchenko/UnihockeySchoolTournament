import React, { Component } from "react";

class AdminGPořadíZápasů extends Component {
	state = {};

	createZapasy = () => {
		let res = [];

		for (let zapas of this.props.zapasy) {
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
								this.props.onChange(
									e,
									this.props.zapasy.indexOf(zapas)
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
									).then(() =>
										this.props.loadZapasyAndTymy()
									);
								}
							}}
							style={{
								backgroundColor: this.props.classes[
									this.props.zapasy.indexOf(zapas)
								],
							}}
						/>
					</span>
				</div>
			);
		}
		return res;
	};

	render() {
		return (
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

				<div
					id="adming-zapasy-pridat"
					onClick={this.props.addZapasDisplayBox}
				>
					Přidat
				</div>
			</section>
		);
	}
}

export default AdminGPořadíZápasů;
