import React, { Component } from "react";
import Logo from "./Logo";
import "./css/registrace.css";
// import { Link } from "react-router-dom";

class Registrace extends Component {
	state = {
		nazevTymu: "",
		hraci: [
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
			{
				jmeno: "",
				trida: "6.A",
			},
		],
		classes: ["", "", "", "", "", "", "", ""],
		classTym: {},
		firstCircle: "primary",
		secondCircle: "secondary",
		firstRound: { display: "block" },
		secondRound: { display: "none" },
	};

	createInputs = () => {
		let result = [];

		for (let i = 1; i <= 8; i++) {
			result.push(
				<div key={i} className="registrace-jmena-div">
					<div className="registrace-labels">
						<span>Jméno hráče</span>
						<span>Třída</span>
					</div>
					<div className="registrace-jmena-flex">
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
							value={this.state.hraci[i - 1].trida}
						>
							<option value="6.A">6.A</option>
							<option value="7.A">7.A</option>
							<option value="8.A">8.A</option>
						</select>
					</div>
				</div>
			);
		}

		return result;
	};

	createTeam = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				nazevTymu: this.state.nazevTymu,
				hraci: this.state.hraci,
			}),
		};
		fetch("http://127.0.0.1:5000/register", requestOptions);

		localStorage.setItem("registrovan", JSON.stringify(true));
	};

	switchView = (button) => {
		if (button === "next") {
			this.setState({
				firstCircle: "secondary",
				secondCircle: "primary",
				secondRound: { display: "block" },
				firstRound: { display: "none" },
			});
		} else {
			this.setState({
				firstCircle: "primary",
				secondCircle: "secondary",
				firstRound: { display: "block" },
				secondRound: { display: "none" },
			});
		}
	};

	render() {
		return (
			<>
				<Logo />

				<section id="register-sect">
					{/*
					<div id="register-top-div">
						<h1>Registrace týmu*</h1>
						<div id="register-star-div">
							<span id="register-star">
								*do 24 hodin musíte potvrdit svou účast zprávou
								na Messengeru{" "}
								<a
									href="https://m.me/michal.pavlicek.56"
									target="blank"
								>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/8/83/Facebook_Messenger_4_Logo.svg"
										alt="Messenger logo"
										id="messenger-image"
									/>
								</a>
							</span>
							<span id="register-coze">Cože?</span>
						</div>
				</div>*/}

					<div id="register-status">
						<div
							id={this.state.firstCircle}
							onClick={this.switchView}
						>
							<span>1</span>
							<p>Název týmu</p>
						</div>
						<div
							id={this.state.secondCircle}
							onClick={() => this.switchView("next")}
						>
							<span>2</span>
							<p>Soupiska</p>
						</div>
					</div>

					<div
						id="registrace-first-round"
						style={this.state.firstRound}
						onKeyDown={(e) => {
							console.log(e.key);
							if (e.key === "Enter") {
								this.switchView("next");
							}
						}}
					>
						<div id="registrace-tym-div">
							<label
								htmlFor="nazev-tymu"
								id="register-nazev-tymu-label"
							>
								Název týmu
							</label>
							<input
								type="text"
								name="nazev-tymu"
								id="register-nazev-tymu-input"
								style={this.state.classTym}
								autoComplete="off"
								onBlur={(e) => {
									this.setState({
										nazevTymu: e.target.value,
									});

									if (e.target.value !== "") {
										this.setState({
											classTym: {
												backgroundColor: "#e63946",
												color: "#f1faee",
											},
										});
									} else {
										this.setState({ classTym: {} });
									}
								}}
							/>
							<span id="registrace-max-deset">max. 10 znaků</span>
						</div>
						<button
							id="regiser-pokracovat-button"
							onClick={() => this.switchView("next")}
						>
							Pokračovat
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								viewBox="0 0 35 30"
								fill="none"
								style={{ marginLeft: "10px" }}
							>
								<path
									d="M0 15H29.5M29.5 15L17.5 3M29.5 15L17.5 27"
									stroke="#F1FAEE"
									strokeWidth="7"
								/>
								<rect
									x="30.5352"
									y="11.5"
									width="5"
									height="5"
									transform="rotate(45 30.5352 11.5)"
									fill="#F1FAEE"
								/>
							</svg>
						</button>
					</div>

					{/* Show After */}
					<div
						id="registrace-second-round"
						style={this.state.secondRound}
					>
						<div id="registrace-inputs">
							{this.createInputs()}
							<span id="registrace-proc-jmeno">
								Proč musím zadávat jméno a třídu?
							</span>
						</div>
						<button
							id="regiser-button-zpet"
							onClick={this.switchView}
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
						{/*<Link to="/"> */}
						<button id="regiser-button" onClick={this.createTeam}>
							Registrovat
						</button>
					</div>
					{/*<Link/> */}
				</section>
			</>
		);
	}
}

export default Registrace;
