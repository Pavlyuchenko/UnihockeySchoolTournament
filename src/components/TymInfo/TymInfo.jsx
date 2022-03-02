import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import TymInfoZapas from "./TymInfoZapas";
import TymInfoMainInfo from "./TymInfoMainInfo";
import "../css/tym-info.css";

class TymInfo extends Component {
	state = {
		tym: "",
		tridy: []
	};

	componentDidMount() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				nazev: this.props.nazev,
			}),
		};
		fetch("http://127.0.0.1:5000/get_tym", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.tym === "No") {
					this.setState({
						error: "Tento tym neexistuje",
					});
				} else {
					let alreadyMentioned = []
					for (let i = 0; i < result.tym.hraci.length; i++) {
						if (!alreadyMentioned.includes(result.tym.hraci[i].trida)) {
							alreadyMentioned.push(result.tym.hraci[i].trida)
						}
					}
					this.setState({
						tym: result.tym,
						tridy: alreadyMentioned,
					});
				}
			});
	}

	render() {
		return (
			<>
				<Logo />
				<Navigation />
				{this.state.error
					? this.state.error
					: this.state.tym && (
							<>
								<TymInfoMainInfo tym={this.state.tym} nazev={this.props.nazev} tridy={this.state.tridy} />

								<div id="tym-info-zap-sou-flex">
									<div id="tym-info-zapasy">
										<h3>Zápasy</h3>

										<h4>Odehrané</h4>
										<div>
											{
												this.state.tym.zapasy_arr.filter(zapas => zapas.order <= this.state.tym.current_order).length > 0
													? 
														(this.state.tym?.zapasy_arr.map(zapas => {
															return (
																zapas.order <= this.state.tym.current_order &&
																<TymInfoZapas
																	key={zapas.order + "Zapas"}
																	domaci={zapas.domaci}
																	hoste={zapas.hoste}
																	cas1={zapas.skore.split(":")[0]}
																	cas2={zapas.skore.split(":")[1]}
																/>
															)
														
														}))
													: <p style={{ marginLeft: "20px", color: "#fff" }}>Žádné odehrané zápasy nejsou</p>
											}
										</div>

										<h4>Následující</h4>
										<div>
											{	
												this.state.tym.zapasy_arr.filter(zapas => zapas.order > this.state.tym.current_order).length > 0
													?
														(this.state.tym?.zapasy_arr.map(zapas => {
															return (
																zapas.order > this.state.tym.current_order &&
																<TymInfoZapas
																	key={zapas.order + "Zapas"}
																	domaci={zapas.domaci}
																	hoste={zapas.hoste}
																	cas1="?"
																	cas2="?"
																/>
															)
														}))
													: <p style={{ marginLeft: "20px", color: "#fff" }}>Žádné následující zápasy nejsou</p>
											}
										</div>
									</div>
									<div id="tym-info-soupiska">
										<h3>Soupiska</h3>
										<div id="tym-info-soupiska-wrapper">
											{this.state.tym?.hraci?.map(hrac => {
												return (
													<div className="tym-info-soupiska-item" key={hrac.jmeno}>
														<span>{hrac.jmeno}</span>
														<span>{hrac.trida}</span>
													</div>
												)
											})}
										</div>
									</div>
								</div>
							</>
					  )}
			</>
		);
	}
}

export default TymInfo;
