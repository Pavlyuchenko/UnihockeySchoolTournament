import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegistraceSecond extends Component {
	state = {
		classes: ["", "", "", "", "", "", "", ""],
		hraci: [
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
			{
				jmeno: "",
				trida: "8.A",
			},
		],
		pocetHracu: 4,
		textPocetHracu: 4,
	};

	createInputs = () => {
		let result = [];

		for (let i = 1; i <= this.state.pocetHracu; i++) {
			result.push(
				<div key={i} className="registrace-jmena-div">
					<div className="registrace-labels">
						<span>Jméno hráče</span>
						<span>Třída</span>
					</div>
					<div className="registrace-jmena-flex">
						<div className="register-jmeno-wrapper">
							<input
								type="text"
								name={"jmeno-hrace-" + i}
								className={
									"register-jmeno-hrace " +
									this.state.classes[i - 1]
								}
								autoComplete="off"
								onBlur={(e) => {
									let hraci = [...this.state.hraci];
									let hrac = { ...hraci[i - 1] };
									hrac.jmeno = e.target.value;
									hraci[i - 1] = hrac;
									this.setState({ hraci: hraci });

									if (e.target.value !== "") {
										let clone = [...this.state.classes];
										clone[i - 1] = "text-entered";

										this.setState({ classes: clone });
									} else {
										let clone = [...this.state.classes];
										clone[i - 1] = "";

										this.setState({ classes: clone });
									}
								}}
							/>
						</div>
						<select
							type="text"
							name={"trida-" + i}
							className="register-trida"
							onChange={(e) => {
								let hraci = [...this.state.hraci];
								let hrac = { ...hraci[i - 1] };
								hrac.trida = e.target.value;
								hraci[i - 1] = hrac;
								this.setState({ hraci: hraci });
							}}
							value={this.state.hraci[i - 1]?.trida}
						>
							<option value="1.A">1.A</option>
							<option value="2.A">2.A</option>
							<option value="3.A">3.A</option>
							<option value="4.A">4.A</option>
							<option value="5.A">5.A</option>
							<option value="1.B">1.B</option>
							<option value="1.C">1.C</option>
							<option value="1.D">1.D</option>
							<option value="6.A">6.A</option>
							<option value="2.B">2.B</option>
							<option value="2.C">2.C</option>
							<option value="2.D">2.D</option>
							<option value="7.A">7.A</option>
							<option value="3.B">3.B</option>
							<option value="3.C">3.C</option>
							<option value="3.D">3.D</option>
							<option value="8.A">8.A</option>
							<option value="4.B">4.B</option>
							<option value="4.C">4.C</option>
							<option value="4.D">4.D</option>
						</select>
					</div>
				</div>
			);
		}

		return result;
	};

	createTeam = () => {
		let pocetHracu = 0;

		for (let i = 0; i < this.state.hraci.length; i++) {
			if (this.state.hraci[i].jmeno.length > 0) {
				pocetHracu += 1;
			}
		}

		console.log(pocetHracu)
		console.log(this.props.nazevTymu.length)
		if (pocetHracu < 4) return
		if (this.props.nazevTymu.length < 4 || this.props.nazevTymu.length > 15) return

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				nazevTymu: this.props.nazevTymu,
				hraci: this.state.hraci.slice(0, this.state.pocetHracu),
			}),
		};
		fetch("https://vfbapi.pythonanywhere.com/register", requestOptions).then(() => {
			localStorage.setItem("registrovan", JSON.stringify(true));
			window.location.href = "/"
		});
	};

	render() {
		return (
			<div id="registrace-second-round" style={this.props.secondRound}>
				<div id="registrace-pocet-hracu-div">
					<span>Počet hráčů (4-10): </span>
					<input
						type="text"
						value={this.state.textPocetHracu}
						onBlur={(e) => {
							if (!(e.target.value >= 4 && e.target.value <= 10)) {
								this.setState({ textPocetHracu: this.state.pocetHracu })
							}
						}}
						onChange={(e) => {
							if (e.target.value >= 4 && e.target.value <= 10) {
								this.setState({ pocetHracu: e.target.value });
							}
							this.setState({ textPocetHracu: e.target.value });
						}}
					/>
					<button
						onClick={() => {
							if (this.state.pocetHracu < 10) {
								this.setState({
									pocetHracu: this.state.pocetHracu + 1,
									textPocetHracu: this.state.pocetHracu + 1,
								});
							}
						}}
						style={{cursor: "pointer"}}
					>
						+
					</button>
					<button
						onClick={() => {
							if (this.state.pocetHracu > 4) {
								this.setState({
									pocetHracu: this.state.pocetHracu - 1,
									textPocetHracu: this.state.pocetHracu - 1,
								});
							}
						}}
						style={{cursor: "pointer"}}
					>
						-
					</button>
				</div>

				<div id="registrace-inputs">
					{this.createInputs()}
					<span id="registrace-proc-jmeno">
						Proč musím zadávat jméno a třídu?
					</span>
				</div>
				<button
					id="regiser-button-zpet"
					onClick={this.props.switchView}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="29"
						height="24"
						viewBox="0 0 29 24"
						fill="none"
						style={{
							position: "absolute",
							left: "5%",
							top: "20px",
							transform: "translateY(-50%)",
						}}
					>
						<path
							d="M29 12H4M4 12L14.1695 2M4 12L14.1695 22"
							stroke="#E63946"
							strokeWidth="5"
						/>
						<rect
							x="1"
							y="11.8281"
							width="4.2"
							height="4.2"
							transform="rotate(-45 1 11.8281)"
							fill="#E63946"
						/>
					</svg>
					Zpět
				</button>
				<div id="regiser-button" onClick={this.createTeam}>
					Registrovat
				</div>
			</div>
		);
	}
}

export default RegistraceSecond;
