import React, { Component } from "react";
import AdminGNasledujiciZapas from "./AdminGNasledujiciZapas";

class AdminGPořadíZápasů extends Component {
	state = {};

	createZapasy = () => {
		let res = [];

		for (let zapas of this.props.zapasy) {
			res.push(
				<AdminGNasledujiciZapas
					zapas={zapas}
					zapasy={this.props.zapasy}
					classes={this.props.classes}
					onOrderChange={this.props.onOrderChange}
					loadZapasyAndTymy={this.props.loadZapasyAndTymy}
				/>
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
