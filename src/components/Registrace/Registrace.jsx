import React, { Component } from "react";
import Logo from "../Logo";
import RegistraceNavigation from "./RegistraceNavigation";
import RegistraceHeader from "./RegistraceHeader";
import RegistraceFirst from "./RegistraceFirst";
import RegistraceSecond from "./RegistraceSecond";
import "../css/registrace.css";

class Registrace extends Component {
	state = {
		nazevTymu: "",
		firstCircle: "primary",
		secondCircle: "secondary",
		firstRound: { display: "block" },
		secondRound: { display: "none" },
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

	setNazevTymu = (nazev) => {
		this.setState({ nazevTymu: nazev });
	};

	render() {
		return (
			<>
				<Logo />
				<RegistraceNavigation active={1} />

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

					<RegistraceHeader
						firstCircle={this.state.firstCircle}
						secondCircle={this.state.secondCircle}
						switchView={this.switchView}
					/>

					<RegistraceFirst
						firstRound={this.state.firstRound}
						switchView={this.switchView}
						setNazevTymu={this.setNazevTymu}
					/>

					{/* Show After */}
					<RegistraceSecond
						secondRound={this.state.secondRound}
						createInputs={this.createInputs}
						switchView={this.switchView}
						createTeam={this.createTeam}
						nazevTymu={this.state.nazevTymu}
					/>
				</section>
			</>
		);
	}
}

export default Registrace;
