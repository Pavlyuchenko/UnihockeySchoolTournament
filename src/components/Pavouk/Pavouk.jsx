import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import "../css/pavouk.css";

class Pavouk extends Component {
	componentDidMount() {
		fetch("https://vfbapi.pythonanywhere.com/pavouk")
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
			})
	}

	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<header id="chos-team-header">
					<h1>Vyřazovací fáze</h1>
					<div id="zapasy">
						<div id="ctvrtfinale">
							<div class="pavouk-zapasy">
								<div id="red">Vygrachanci</div>
								<div id="white">Antišunkofleci</div>
							</div>
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
						</div>
						<div id="semifinale">
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
						</div>
						<div id="finale">
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
							<div class="pavouk-zapasy">
								<div id="red"></div>
								<div id="white"></div>
							</div>
						</div>
					</div>
				</header>
			</>
		);
	}
}

export default Pavouk;
