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
	};

	teamChoose = (team, obj, pos) => {
		if (this.state.lastGreen !== "") {
			this.state.lastGreen.setState(
				{ greenL: "", greenR: "" },
				function () {
					if (pos === "left") {
						obj.state.greenL = "green";
					} else {
						obj.state.greenR = "green";
					}
				}
			);
		} else {
			if (pos === "left") {
				obj.state.greenL = "green";
			} else {
				obj.state.greenR = "green";
			}
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

	createTeamOptions = () => {
		let result = [];

		for (let i = 0; i < this.state.teams.length; i += 2) {
			result.push(
				<TeamOption
					left={this.state.teams[i]}
					right={this.state.teams[i + 1]}
					colorL={this.state.colors[i]}
					colorR={this.state.colors[i + 1]}
					teamChoose={this.teamChoose}
					green=""
					key={this.state.teams[i]}
				/>
			);
		}

		return result;
	};

	saveFavTeam = () => {
		localStorage.setItem("favTeam", JSON.stringify(this.state.favTeam));
	};

	render() {
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
						/>
					</div>
				</header>
				<section id="chos-team-sect">
					{this.createTeamOptions()}
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
