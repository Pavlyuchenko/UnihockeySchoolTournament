import React, { Component } from "react";

class AdminGNasledujiciZapas extends Component {
	state = {};
	render() {
		return (
			<div
				className="adming-zapas"
				key={this.props.zapas.id + "asedsadasf"}
			>
				<div className="adming-zapas-flex">
					<span className="adming-zapasy-home-team">
						{this.props.zapas.domaci}
					</span>
					<span className="adming-zapasy-cas">
						{this.props.zapas.cas}
					</span>
					<span className="adming-zapasy-away-team">
						{this.props.zapas.hoste}
					</span>
				</div>
				<span className="adming-zapasy-order">
					<input
						type="text"
						onChange={(e) =>
							this.props.onOrderChange(
								e,
								this.props.zapasy.indexOf(this.props.zapas)
							)
						}
						value={this.props.zapas.order}
						className="adming-zapasy-order-input"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const requestOptions = {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										id: this.props.zapas.id,
										order: e.target.value,
									}),
								};
								fetch(
									"https://vfbapi.pythonanywhere.com/update_order",
									requestOptions
								).then(() => this.props.loadZapasyAndTymy());
							}
						}}
						style={{
							backgroundColor: this.props.classes[
								this.props.zapasy.indexOf(this.props.zapas)
							],
						}}
					/>
				</span>
			</div>
		);
	}
}

export default AdminGNasledujiciZapas;
