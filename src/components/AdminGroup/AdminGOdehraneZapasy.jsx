import React, { Component } from "react";

class AdminGOdehraneZapasy extends Component {
	createOdehraneZapasy = () => {
		let res = [];

		if (this.props.odehraneZapasy && this.props.classesOdehrane) {
			for (let zapas of this.props.odehraneZapasy) {
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
									this.props.onOdehranyZapasChangeDomaci(
										e,
										this.props.odehraneZapasy.indexOf(zapas)
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
											"https://vfbapi.pythonanywhere.com/update_skore_odehrany_zapas",
											requestOptions
										).then(() =>
											this.props.loadZapasyAndTymy()
										);
									}
								}}
							/>

							<input
								type="text"
								onChange={(e) =>
									this.props.onOdehranyZapasChangeHoste(
										e,
										this.props.odehraneZapasy.indexOf(zapas)
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
											"https://vfbapi.pythonanywhere.com/update_skore_odehrany_zapas",
											requestOptions
										).then(() =>
											this.props.loadZapasyAndTymy()
										);
									}
								}}
							/>
						</span>
						<span className="adming-odehrany-zapasy-order">
							<input
								type="text"
								onChange={(e) =>
									this.props.onOdehranyZapasChange(
										e,
										this.props.odehraneZapasy.indexOf(zapas)
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
											"https://vfbapi.pythonanywhere.com/update_order",
											requestOptions
										).then(() =>
											this.props.loadZapasyAndTymy()
										);
									}
								}}
								style={{
									backgroundColor: this.props.classesOdehrane[
										this.props.odehraneZapasy.indexOf(zapas)
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

	render() {
		return (
			<section id="adming-odehrany-zapasy">
				<h3>Odehrané zápasy</h3>
				<div id="adming-odehrany-zapasy-popis-flex">
					<div id="adming-odehrany-zapasy-popis">
						<span>Domácí</span>
						<span>Čas</span>
						<span>Hosté</span>
					</div>
					<span id="adming-odehrany-zapasy-order-popis">Skóre</span>
					<span id="adming-odehrany-zapasy-order-popis">Order</span>
				</div>

				{this.createOdehraneZapasy()}
			</section>
		);
	}
}

export default AdminGOdehraneZapasy;
