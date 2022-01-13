import React, { Component } from "react";
import RegistraceNavigation from "../Registrace/RegistraceNavigation";
import Logo from "../Logo";

class Pravidla extends Component {
	state = {};
	render() {
		return (
			<>
				<Logo />
				<RegistraceNavigation active={2} />
				
				<header id="chos-team-header">
					Pravidla
				</header>
			</>
		);
	}
}

export default Pravidla;
