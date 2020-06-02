import React, { Component } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import "./css/admin.css";

class Admin extends Component {
	state = {
		nove_tymy: "",
		prijate_tymy: "",
		registrovane_tymy: "",
		navstiveno: "",
	};

	componentDidMount() {
		fetch("http://127.0.0.1:5000/admin")
			.then((response) => response.json())
			.then((result) => {
				for (let tym of result.tymy) {
					if (tym.potvrzeno) {
						this.setState({
							prijate_tymy: [...this.state.prijate_tymy, tym],
						});
					} else {
						this.setState({
							nove_tymy: [...this.state.nove_tymy, tym],
						});
					}
				}

				this.setState({
					registrovane_tymy: result.registrovane_tymy,
					navstiveno: result.navstiveno,
				});
			});
	}

	confirmTeam = (index, teamId) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idTymu: teamId,
			}),
		};

		fetch("http://127.0.0.1:5000/update_potvrzeno", requestOptions).then(
			() => {
				var copy = [...this.state.nove_tymy];
				let asd = copy.splice(index, 1);
				this.setState({
					nove_tymy: copy,
					prijate_tymy: [...this.state.prijate_tymy, asd[0]],
				});
			}
		);
	};

	deleteTeam = (index, teamId) => {
		var copy = [...this.state.nove_tymy];
		copy.splice(index, 1);
		this.setState({ nove_tymy: copy });

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idTymu: teamId,
			}),
		};
		fetch("http://127.0.0.1:5000/delete_tym", requestOptions);
	};

	confirmZaplaceno = (index, teamId) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idTymu: teamId,
			}),
		};
		fetch("http://127.0.0.1:5000/zaplaceni_potvrzeno", requestOptions).then(
			() => {
				let tymy = this.state.prijate_tymy;
				tymy[index].zaplaceno = !this.state.prijate_tymy[index]
					.zaplaceno;

				this.setState({
					prijate_tymy: tymy,
				});
			}
		);
	};

	displayNoveTymy = () => {
		let res = [];

		if (!this.state.nove_tymy.length) {
			return "";
		}
		for (let i = 0; i < this.state.nove_tymy.length; i++) {
			res.push(
				<div key={"novy_tym" + i} className="admin-nove-tymy-div">
					<span className="admin-nove-tymy-nazev">
						{this.state.nove_tymy[i].nazev}
					</span>
					<div className="admin-nove-tymy-buttons">
						<button
							onClick={() =>
								this.confirmTeam(i, this.state.nove_tymy[i].id)
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="21"
								viewBox="0 0 25 21"
								fill="none"
							>
								<path
									d="M2 8.37931L8.44318 17L23 2"
									stroke="#F1FAEE"
									strokeWidth="4"
								/>
							</svg>
						</button>
						<button
							onClick={() =>
								this.deleteTeam(i, this.state.nove_tymy[i].id)
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M10 10L18 2M10 10L2 18M10 10L18 18M10 10L2 2"
									stroke="#F1FAEE"
									strokeWidth="4"
								/>
							</svg>
						</button>
					</div>
				</div>
			);
		}

		return res;
	};

	displayPrijateTymy = () => {
		let result = [];

		if (!this.state.prijate_tymy.length) {
			return "";
		}

		for (let i = 0; i < this.state.prijate_tymy.length; i++) {
			let zaplaceno = {};
			let zaplacenoButton = {};

			if (this.state.prijate_tymy[i].zaplaceno) {
				zaplaceno = { background: "#4caf50", color: "#f1faee" };
				zaplacenoButton = { background: "#E63946" };
			} else {
				zaplaceno = {};
			}

			result.push(
				<div
					key={"prijaty_tym" + i}
					className="admin-prijate-tymy-div "
					style={zaplaceno}
				>
					<span className="admin-prijate-tymy-nazev">
						{this.state.prijate_tymy[i].nazev}
					</span>
					<div className="admin-prijate-tymy-buttons">
						<button
							onClick={() =>
								this.confirmZaplaceno(
									i,
									this.state.prijate_tymy[i].id
								)
							}
							style={zaplacenoButton}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="27"
								viewBox="0 0 18 27"
								fill="none"
							>
								<path
									d="M7.7 27C7.5 27 7.33 26.93 7.19 26.79C7.05 26.67 6.98 26.5 6.98 26.28V24.18C5.54 24.04 4.3 23.7 3.26 23.16C2.24 22.6 1.46 21.92 0.92 21.12C0.4 20.3 0.12 19.43 0.0800001 18.51C0.0800001 18.33 0.14 18.18 0.26 18.06C0.4 17.94 0.56 17.88 0.74 17.88H3.41C3.63 17.88 3.8 17.93 3.92 18.03C4.06 18.11 4.19 18.25 4.31 18.45C4.53 19.13 4.99 19.7 5.69 20.16C6.41 20.62 7.4 20.85 8.66 20.85C10.06 20.85 11.12 20.62 11.84 20.16C12.56 19.68 12.92 19.02 12.92 18.18C12.92 17.62 12.74 17.16 12.38 16.8C12.02 16.44 11.47 16.13 10.73 15.87C9.99 15.59 8.9 15.27 7.46 14.91C5.1 14.35 3.37 13.61 2.27 12.69C1.19 11.75 0.65 10.42 0.65 8.7C0.65 7.14 1.21 5.83 2.33 4.77C3.47 3.69 5.02 3.03 6.98 2.79V0.719999C6.98 0.499999 7.05 0.329998 7.19 0.209999C7.33 0.0699993 7.5 -3.57628e-07 7.7 -3.57628e-07H9.53C9.73 -3.57628e-07 9.9 0.0699993 10.04 0.209999C10.18 0.349999 10.25 0.52 10.25 0.719999V2.85C11.55 3.03 12.66 3.42 13.58 4.02C14.52 4.6 15.23 5.28 15.71 6.06C16.21 6.84 16.48 7.6 16.52 8.34C16.52 8.52 16.46 8.67 16.34 8.79C16.22 8.91 16.07 8.97 15.89 8.97H13.1C12.66 8.97 12.36 8.78 12.2 8.4C12.1 7.76 11.71 7.23 11.03 6.81C10.35 6.37 9.5 6.15 8.48 6.15C7.38 6.15 6.51 6.36 5.87 6.78C5.23 7.2 4.91 7.81 4.91 8.61C4.91 9.17 5.07 9.63 5.39 9.99C5.71 10.35 6.21 10.67 6.89 10.95C7.59 11.23 8.59 11.54 9.89 11.88C11.65 12.28 13.05 12.73 14.09 13.23C15.15 13.73 15.93 14.36 16.43 15.12C16.93 15.88 17.18 16.85 17.18 18.03C17.18 19.75 16.56 21.16 15.32 22.26C14.08 23.34 12.39 23.99 10.25 24.21V26.28C10.25 26.48 10.18 26.65 10.04 26.79C9.9 26.93 9.73 27 9.53 27H7.7Z"
									fill="#F1FAEE"
								/>
							</svg>
						</button>
					</div>
				</div>
			);
		}

		return result;
	};

	render() {
		return (
			<>
				<Logo />
				<Navigation />

				<section id="registrace-nove-tymy-sect">
					<div id="admin-tymy-statistika">
						<div id="admin-reg-tymy">
							<h2>Registrované týmy</h2>
							<h1>{this.state.registrovane_tymy}</h1>
						</div>
						<div id="admin-reg-navstevnici">
							<h2>Návštěvníci</h2>
							<h1>{this.state.navstiveno}</h1>
						</div>
					</div>
					<h1>Nové registrace</h1>
					{this.state.nove_tymy === "" ||
					this.state.nove_tymy === [] ? (
						<span
							style={{
								color: "#f1faee",
								fontSize: "18px",
								marginLeft: "10px",
							}}
						>
							* Ticho po pěšině *
						</span>
					) : (
						this.displayNoveTymy()
					)}
				</section>
				<section id="registrace-prijate-tymy-sect">
					<h1>Přijaté týmy</h1>
					{this.displayPrijateTymy()}
				</section>
			</>
		);
	}
}

export default Admin;
