import React, { Component } from "react";
import RegistraceNavigation from "../Registrace/RegistraceNavigation";
import Logo from "../Logo";
import Dotaz from "./Dotaz";
import "../css/dotazy.css"

class Dotazy extends Component {
	state = {
		dotazy: [
			{q: "asd", a: "asd"},
			{q: "dw", a: "asd"},
		]
	};
	render() {
		return (
			<>
				<Logo />
				<RegistraceNavigation active={3} />

				<header id="chos-team-header">>
					{this.state.dotazy.map(dotaz => {
						return <Dotaz key={dotaz.q} q={dotaz.q} a={dotaz.a} />
					})}
				</header>
			</>
		);
	}
}

export default Dotazy;
