import React, { Component } from "react";
import Logo from "../Logo";
import TeamOption from "./TeamOption";
import "../css/choose_team.css";
import { Link } from "react-router-dom";

class ChooseTeam extends Component {
	state = {
		favTeam: "",
		showButton: "nodisplay",
		tymy: ["Chci zůstat neutrální"],
		jmenaHracu: [[]],
		tridy: [""],
		lastGreen: "",
		search: "",
		showWhy: false,
	};

	componentDidMount() {
		fetch("http://127.0.0.1:5000/choose_team")
			.then((response) => response.json())
			.then((result) => {
				for (let tym of result.tymy) {
					let hraci = [];
					let tridy = "";
					for (let hrac of tym.hraci) {
						hraci.push(hrac.jmeno);
						if (!tridy.includes(hrac.trida)) {
							tridy += hrac.trida + ", ";
						}
					}
					tridy = tridy.slice(0, -2);
					this.setState({
						tymy: [...this.state.tymy, tym.nazev],
						jmenaHracu: [...this.state.jmenaHracu, hraci],
						tridy: [...this.state.tridy, tridy],
					});
				}
			});
	}

	teamChoose = (team, obj) => {
		if (this.state.lastGreen !== "") {
			this.state.lastGreen.setState({ green: "" }, function () {
				obj.state.green = "green";
			});
		} else {
			obj.state.green = "green";
		}

		if (team === this.state.favTeam) {
			this.setState({
				favTeam: "",
				showButton: "nodisplay",
				lastGreen: obj,
			});
		} else {
			this.setState({ favTeam: team }, function () {
				console.log(this.state.favTeam);
				this.setState({ showButton: "", lastGreen: obj });
			});
		}
	};

	saveFavTeam = () => {
		localStorage.setItem("favTeam", JSON.stringify(this.state.favTeam));
	};

	search = (e) => {
		this.setState({ search: e.target.value, lastGreen: "" });
		if (this.state.lastGreen !== "") {
			this.state.lastGreen.setState({
				green: "",
			});
			this.setState({ favTeam: "", showButton: "nodisplay" });
		}
	};

	showWhy = () => {
		this.setState({ showWhy: !this.state.showWhy });
	};

	render() {
		var teamOptions = [];

		for (let i = 0; i < this.state.tymy.length; i++) {
			teamOptions.push(
				<TeamOption
					teamName={this.state.tymy[i]}
					teamChoose={this.teamChoose}
					green=""
					key={this.state.tymy[i]}
					jmenaHracu={this.state.jmenaHracu[i]}
					trida={this.state.tridy[i]}
				/>
			);
		}
		if (teamOptions.length >= 0) {
			teamOptions = teamOptions.filter((item, index) => {
				if (
					this.state.tymy[index]
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.match(
							this.state.search
								.toLowerCase()
								.normalize("NFD")
								.replace(/[\u0300-\u036f]/, "")
						)
				) {
					return item;
				} else {
					for (
						let j = 0;
						j < this.state.jmenaHracu[index].length;
						j++
					) {
						if (
							this.state.jmenaHracu[index][j]
								.toLowerCase()
								.normalize("NFD")
								.replace(/[\u0300-\u036f]/g, "")
								.match(
									this.state.search
										.toLowerCase()
										.normalize("NFD")
										.replace(/[\u0300-\u036f]/g, "")
								)
						) {
							return item;
						}
					}
					if (
						this.state.tridy[index]
							.toLowerCase()
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
							.match(
								this.state.search
									.toLowerCase()
									.normalize("NFD")
									.replace(/[\u0300-\u036f]/g, "")
									.replace(". ", ".")
									.replace(" ", ".")
									.replace(",", ".")
									.replace(":", ".")
							)
					) {
						return item;
					} else {
						return null;
					}
				}
			});
		}

		return (
			<>
				<Logo />
				<header id="chos-team-header">
					<h1>Vyber si svůj tým*</h1>
					<h3>*jehož jsi fanouškem nebo hráčem</h3>
					<span onClick={this.showWhy}>Proč?</span>
					<div id={this.state.showWhy ? "show-why" : "dont-show-why"}>
						<span onClick={this.showWhy}>x</span>
					</div>
					<div id="chos-team-search-wrapper">
						<input
							type="text"
							placeholder="Hledat podle jména týmu, hráče nebo třídy"
							value={this.state.search}
							onChange={this.search}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							onClick={() => this.setState({ search: "" })}
							style={{
								display: this.state.search ? "block" : "none",
							}}
						>
							<path
								d="M2 2L16 16"
								stroke="#E63946"
								strokeWidth="4"
							/>
							<path
								d="M16 2L2 16"
								stroke="#E63946"
								strokeWidth="4"
							/>
						</svg>
					</div>
				</header>
				<section id="chos-team-sect">
					{teamOptions.map((team) => team)}
				</section>
				<Link
					id={"chos-team-ulozit"}
					className={this.state.showButton}
					onClick={this.saveFavTeam}
					to="/"
				>
					Uložit
				</Link>
			</>
		);
	}
}

export default ChooseTeam;
