import React, { Component } from "react";
import Logo from "./Logo";
import TeamOption from "./TeamOption";
import "./css/choose_team.css";
import { Link } from "react-router-dom";

class ChooseTeam extends Component {
	state = {
		favTeam: "",
		showButton: "nodisplay",
		colors: [
			"grey",
			"white",
			"blue",
			"red",
			"white",
			"red",
			"blue",
			"white",
		],
		teams: [
			"Chci zůstat neutrální",
			"Vygrachanci",
			"Učitelé",
			"Boney M",
			"Antišunkofleci",
			"Kaspaři",
			"Pobo Team",
			"Koťátka",
		],
		lastGreen: "",
		search: "",
	};

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
			this.state.lastGreen.setState({ green: "" });
		}
	};

	render() {
		var teamOptions = [];

		for (let i = 0; i < this.state.teams.length; i++) {
			teamOptions.push(
				<TeamOption
					teamName={this.state.teams[i]}
					color={this.state.colors[i]}
					teamChoose={this.teamChoose}
					green=""
					key={this.state.teams[i]}
				/>
			);
		}

		if (teamOptions.length >= 0) {
			teamOptions = teamOptions.filter((item, index) => {
				if (
					this.state.teams[index]
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
				} else {
					return null;
				}
			});
		}

		return (
			<>
				<Logo />
				<header id="chos-team-header">
					<h1>Vyber si svůj tým*</h1>
					<h3>*jehož jsi fanouškem nebo hráčem</h3>
					<span>Proč?</span>
					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="Hledat podle jména týmu, hráče nebo třídy"
							onChange={this.search}
						/>
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
