import React, { Component } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import TymInfoZapas from "./TymInfoZapas";
import "./css/tym-info.css";

class TymInfo extends Component {
	state = {};

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
					this.setState({
						tym: result.tym,
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
								<div id="tym-info-badge">
									<div id="tym-info-line"></div>
									<div id="tym-info-nadpis-div">
										<h2 id="tym-info-nadpis">
											{this.state.tym.nazev}
										</h2>
									</div>
								</div>
								<div id="tym-info-basic-flex">
									<div className="tym-info-basic-item-wrapper">
										<div className="tym-info-basic-item-div">
											<h3>A</h3>
										</div>
										<h4>Skupina</h4>
									</div>
									<div className="tym-info-basic-item-wrapper">
										<div className="tym-info-basic-item-div">
											<h3 id="tym-info-odd-second">
												MGO
											</h3>
										</div>
										<h4>Škola</h4>
									</div>
									<div className="tym-info-basic-item-wrapper">
										<div
											className="tym-info-basic-item-div"
											id="tym-info-the-odd-one"
										>
											<span>6.A</span>
											<span>2.C</span>
											<span>2.B</span>
										</div>
										<h4>Třídy hráčů</h4>
									</div>
									<div className="tym-info-basic-item-wrapper">
										<div className="tym-info-basic-item-div">
											<h3>12</h3>
										</div>
										<h4>Fanouošci týmu</h4>
									</div>
									<div className="tym-info-basic-item-wrapper">
										<div className="tym-info-basic-item-div">
											<h3>8</h3>
										</div>
										<h4>Odehrané zápasy</h4>
									</div>
								</div>
								<div id="tym-info-zap-sou-flex">
									<div id="tym-info-zapasy">
										<h3>Zápasy</h3>

										<h4>Odehrané</h4>
										<div>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="1"
												cas2="0"
											/>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="5"
												cas2="6"
											/>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="0"
												cas2="3"
											/>
										</div>

										<h4>Následující</h4>
										<div>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="9"
												cas2="00"
											/>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="9"
												cas2="00"
											/>
											<TymInfoZapas
												domaci="Antišunkofleci"
												hoste="Vygrachanci"
												cas1="9"
												cas2="00"
											/>
										</div>
									</div>
									<div id="tym-info-soupiska">
										<h3>Soupiska</h3>
										<div id="tym-info-soupiska-wrapper">
											<div className="tym-info-soupiska-item">
												<span>Vojta Olšr</span>
												<span>7. A</span>
											</div>
											<div className="tym-info-soupiska-item">
												<span>Adam Lehnert</span>
												<span>2. C</span>
											</div>
											<div className="tym-info-soupiska-item">
												<span>Jakub Hronek</span>
												<span>7. A</span>
											</div>
											<div className="tym-info-soupiska-item">
												<span>Ondřej Sembol</span>
												<span>7. A</span>
											</div>
											<div className="tym-info-soupiska-item">
												<span>Lukáš Procházka</span>
												<span>7. A</span>
											</div>
											<div className="tym-info-soupiska-item">
												<span>Tomáš Adamec</span>
												<span>7. A</span>
											</div>
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
