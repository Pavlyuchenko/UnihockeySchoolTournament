import React, { Component } from "react";
import Logo from "../Logo";
import Navigation from "../Navigation";
import "../css/admin.css";
import AdminStatistika from "./AdminStatistika";
import AdminPrijateTymy from "./AdminPrijateTymy";
import AdminNoveTymy from "./AdminNoveTymy";

class Admin extends Component {
	state = {
		nove_tymy: "",
		prijate_tymy: "",
		registrovane_tymy: "",
		navstiveno: "",
	};

	componentDidMount() {
		fetch("http://127.0.0.1:5000/adminn")
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

	render() {
		return (
			<>
				<Logo />
				<Navigation />

				<section id="registrace-nove-tymy-sect">
					<AdminStatistika
						registrovane_tymy_count={this.state.registrovane_tymy}
						navstiveno={this.state.navstiveno}
					/>
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
						<AdminNoveTymy
							nove_tymy={this.state.nove_tymy}
							deleteTeam={this.deleteTeam}
							confirmTeam={this.confirmTeam}
						/>
					)}
				</section>
				<section id="registrace-prijate-tymy-sect">
					<h1>Přijaté týmy</h1>
					<AdminPrijateTymy
						prijate_tymy={this.state.prijate_tymy}
						confirmZaplaceno={this.confirmZaplaceno}
					/>
				</section>
			</>
		);
	}
}

export default Admin;
