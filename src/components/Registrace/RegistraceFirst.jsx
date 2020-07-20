import React, { Component } from "react";

class RegistraceFirst extends Component {
	state = { classTym: {} };

	componentDidMount() {
		this.nameInput.focus();
	}

	render() {
		return (
			<div
				id="registrace-first-round"
				style={this.props.firstRound}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						this.props.switchView("next");
					}
				}}
			>
				<div id="registrace-tym-div">
					<label htmlFor="nazev-tymu" id="register-nazev-tymu-label">
						Název týmu
					</label>
					<input
						type="text"
						name="nazev-tymu"
						id="register-nazev-tymu-input"
						style={this.state.classTym}
						autoComplete="off"
						ref={(input) => {
							this.nameInput = input;
						}}
						onBlur={(e) => {
							this.props.setNazevTymu(e.target.value);

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
					onClick={() => this.props.switchView("next")}
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
		);
	}
}

export default RegistraceFirst;
