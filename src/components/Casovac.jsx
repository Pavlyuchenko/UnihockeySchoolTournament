import React, { Component } from "react";
import "./css/casovac.css";

class Casovac extends Component {
	state = {
		casFont: 31.5,
		scoreFont: 25,
		nastaveno: false,
		domaciSkore: 0,
		hosteSkore: 0,
		minuty: 0,
		sekundy: -1,
		desetiny: -1,
		pauseTimer: true,
		zapas: "",
		showNastaveni: false,
	};

	sendSkore = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				skoreDomaci: this.state.domaciSkore,
				skoreHoste: this.state.hosteSkore,
			}),
		};
		fetch("http://127.0.0.1:5000/update_skore", requestOptions);
	};

	sendCasovac = () => {
		if (this.state.pauseTimer) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					minuty: this.state.minuty,
					sekundy: this.state.sekundy,
				}),
			};
			fetch("http://127.0.0.1:5000/update_casovac", requestOptions);
		} else {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					minuty: this.state.minuty,
					sekundy: this.state.sekundy,
				}),
			};
			fetch("http://127.0.0.1:5000/pause_casovac", requestOptions);
		}
		this.setState({ pauseTimer: !this.state.pauseTimer });
	};

	componentDidMount() {
		let minuty = JSON.parse(localStorage.getItem("minuty"));
		let sekundy = JSON.parse(localStorage.getItem("sekundy"));
		let desetiny = JSON.parse(localStorage.getItem("desetiny"));
		let domaciSkore = JSON.parse(localStorage.getItem("domaciSkore"));
		let hosteSkore = JSON.parse(localStorage.getItem("hosteSkore"));

		if (!minuty && !sekundy && !desetiny) {
			minuty = 0;
			sekundy = 0;
			desetiny = 0;
		}
		if (!domaciSkore && !hosteSkore) {
			domaciSkore = 0;
			hosteSkore = 0;
		}

		this.updateTime(minuty, sekundy);
		this.setState(
			{
				minuty: minuty,
				sekundy: sekundy,
				desetiny: desetiny,
				domaciSkore: domaciSkore,
				hosteSkore: hosteSkore,
			},
			function () {
				this.interval = setInterval(this.updateTime, 1000);
			}
		);

		let casFont = JSON.parse(localStorage.getItem("casFont"));
		let scoreFont = JSON.parse(localStorage.getItem("scoreFont"));

		if (casFont && scoreFont) {
			this.setState({
				casFont: casFont,
				scoreFont: scoreFont,
				nastaveno: true,
			});
		}

		document.addEventListener("keydown", (event) => {
			if (event.code === "KeyQ") {
				this.setState({ domaciSkore: this.state.domaciSkore + 1 });
				this.sendSkore();
			} else if (event.code === "KeyW") {
				this.setState({ hosteSkore: this.state.hosteSkore + 1 });
				this.sendSkore();
			} else if (event.code === "KeyA" && this.state.domaciSkore > 0) {
				this.setState({ domaciSkore: this.state.domaciSkore - 1 });
				this.sendSkore();
			} else if (event.code === "KeyS" && this.state.hosteSkore > 0) {
				this.setState({ hosteSkore: this.state.hosteSkore - 1 });
				this.sendSkore();
			} else if (event.code === "Space") {
				this.sendCasovac();
				event.preventDefault();
				event.stopPropagation();
			}

			localStorage.setItem(
				"domaciSkore",
				JSON.stringify(this.state.domaciSkore)
			);
			localStorage.setItem(
				"hosteSkore",
				JSON.stringify(this.state.hosteSkore)
			);
		});

		fetch("http://127.0.0.1:5000/get_curr_zapas")
			.then((response) => response.json())
			.then((result) => {
				this.setState({ zapas: result.zapas });
			});
	}

	componentWillUnmount() {
		clearInterval(this.interval);

		document.removeEventListener("click", this.updateTime, false);
	}

	/*updateTime = () => {
		if (!this.state.pauseTimer) {
			if (this.state.desetiny === 9) {
				this.setState({ sekundy: this.state.sekundy + 1, desetiny: 0 });
			} else {
				this.setState({ desetiny: this.state.desetiny + 1 });
			}
			if (this.state.sekundy === 60) {
				this.setState({ minuty: this.state.minuty + 1, sekundy: 0 });
			}
			localStorage.setItem("minuty", JSON.stringify(this.state.minuty));
			localStorage.setItem("sekundy", JSON.stringify(this.state.sekundy));
			localStorage.setItem(
				"desetiny",
				JSON.stringify(this.state.desetiny)
			);
		}
	};*/
	
	updateTime = () => {
		let sek = this.state.sekundy;
		let min = this.state.minuty;

		if (min >= 12) {
			this.setState({
				pauseTimer: true,
				konecZapasu: true,
			});
		}

		if (!this.state.pauseTimer) {
			if (sek >= 59) {
				min++;
				sek = 0;
			} else {
				sek++;
			}

			this.setState({ minuty: min, sekundy: sek }, function () {
				localStorage.setItem(
					"minuty",
					JSON.stringify(this.state.minuty)
				);
				localStorage.setItem(
					"sekundy",
					JSON.stringify(this.state.sekundy)
				);
				localStorage.setItem(
					"desetiny",
					JSON.stringify(this.state.desetiny)
				);
			});
		}
	};

	dalsiZapas = () => {
		localStorage.setItem("domaciSkore", JSON.stringify(0));
		localStorage.setItem("hosteSkore", JSON.stringify(0));

		this.setState({
			minuty: 0,
			sekundy: 0,
			domaciSkore: 0,
			hosteSkore: 0,
			konecZapasu: false,
		});

		localStorage.setItem("minuty", JSON.stringify(0));
		localStorage.setItem("sekundy", JSON.stringify(0));
		localStorage.setItem("desetiny", JSON.stringify(0));

		fetch("http://127.0.0.1:5000/dalsi_zapas")
			.then((response) => response.json())
			.then((result) => {
				this.setState({ zapas: result.zapas });
			});
	};

	render() {
		return (
			<>
				<div id="casovac-cas-cont">
					<span
						className="casovac-cas"
						style={{
							fontSize: this.state.casFont + "vw",
							lineHeight: this.state.casFont * 0.8 + "vw",
						}}
						onContextMenu={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont - 1,
								});
							}
						}}
						onClick={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont + 1,
								});
							} else {
								this.setState({
									pauseTimer: !this.state.pauseTimer,
								});
								this.sendCasovac();
							}
						}}
						id="left"
					>
						{this.state.minuty < 10
							? "0" + this.state.minuty
							: this.state.minuty}
					</span>
					<span
						className="casovac-cas"
						id="center"
						style={{
							fontSize: this.state.casFont + "vw",
							lineHeight: this.state.casFont * 0.8 + "vw",
							color: this.state.pauseTimer
								? "#e63946"
								: "#f1faee",
						}}
						onContextMenu={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont - 1,
								});
							}
						}}
						onClick={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont + 1,
								});
							} else {
								this.setState({
									pauseTimer: !this.state.pauseTimer,
								});
								this.sendCasovac();
							}
						}}
					>
						:
					</span>
					<span
						className="casovac-cas"
						id="right"
						style={{
							fontSize: this.state.casFont + "vw",
							lineHeight: this.state.casFont * 0.8 + "vw",
						}}
						onContextMenu={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont - 1,
								});
							}
						}}
						onClick={(e) => {
							e.preventDefault();
							if (!this.state.nastaveno) {
								this.setState({
									casFont: this.state.casFont + 1,
								});
							} else {
								this.setState({
									pauseTimer: !this.state.pauseTimer,
								});
								this.sendCasovac();
							}
						}}
					>
						{this.state.sekundy < 10
							? "0" + this.state.sekundy
							: this.state.sekundy}
					</span>
					<span
						className="casovac-cas"
						style={{
							fontSize: this.state.casFont + "vw",
							lineHeight: this.state.casFont * 0.8 + "vw",
							visibility: "hidden",
						}}
					>
						_
					</span>
				</div>
				<div id="casovac-skore-flex">
					<div className="casovac-skore-flex-items">
						<div className="casovac-skore-jmeno">
							<span>{this.state.zapas.domaci}</span>
						</div>
						<div className="casovac-skore-skore">
							<span
								style={{
									fontSize: this.state.scoreFont + "vw",
									lineHeight:
										this.state.scoreFont * 0.8 + "vw",
								}}
								onContextMenu={(e) => {
									e.preventDefault();
									if (
										this.state.nastaveno &&
										this.state.domaciSkore > 0
									) {
										this.setState(
											{
												domaciSkore:
													this.state.domaciSkore - 1,
											},
											function () {
												this.sendSkore();
											}
										);
									} else if (!this.state.nastaveno) {
										this.setState({
											scoreFont: this.state.scoreFont - 1,
										});
									}
								}}
								onClick={(e) => {
									e.preventDefault();
									if (this.state.nastaveno) {
										this.setState(
											{
												domaciSkore:
													this.state.domaciSkore + 1,
											},
											function () {
												this.sendSkore();
											}
										);
									} else {
										this.setState({
											scoreFont: this.state.scoreFont + 1,
										});
									}
								}}
							>
								{this.state.domaciSkore}
							</span>
						</div>
					</div>
					<div className="casovac-skore-flex-items">
						<div className="casovac-skore-jmeno">
							<span>{this.state.zapas.hoste}</span>
						</div>
						<div className="casovac-skore-skore">
							<span
								style={{
									fontSize: this.state.scoreFont + "vw",
									lineHeight:
										this.state.scoreFont * 0.8 + "vw",
								}}
								onContextMenu={(e) => {
									e.preventDefault();

									if (
										this.state.nastaveno &&
										this.state.hosteSkore > 0
									) {
										this.setState(
											{
												hosteSkore:
													this.state.hosteSkore - 1,
											},
											function () {
												this.sendSkore();
											}
										);
									} else if (!this.state.nastaveno) {
										this.setState({
											scoreFont: this.state.scoreFont - 1,
										});
									}
								}}
								onClick={(e) => {
									e.preventDefault();
									if (this.state.nastaveno) {
										this.setState(
											{
												hosteSkore:
													this.state.hosteSkore + 1,
											},
											function () {
												this.sendSkore();
											}
										);
									} else {
										this.setState({
											scoreFont: this.state.scoreFont + 1,
										});
									}
								}}
							>
								{this.state.hosteSkore}
							</span>
						</div>
					</div>
					<div id="casovac-tresty">
						<div>
							<h3>Tresty</h3>
						</div>
						<div>0:48</div>
						<div>4:58</div>
					</div>
					<div></div>
				</div>
				<button
					onClick={this.dalsiZapas}
					id="casovac-dalsi-zapas"
					style={{
						display: this.state.konecZapasu ? "inline" : "none",
					}}
				>
					Další zápas
				</button>
				<button
					onClick={() => {
						this.setState({ nastaveno: true });

						localStorage.setItem(
							"casFont",
							JSON.stringify(this.state.casFont)
						);
						localStorage.setItem(
							"scoreFont",
							JSON.stringify(this.state.scoreFont)
						);
					}}
					style={{ display: this.state.nastaveno ? "none" : "block" }}
				>
					Nastaveno
				</button>
				<button
					id="casovac-nastaveni"
					onClick={() =>
						this.setState({
							showNastaveni: !this.state.showNastaveni,
						})
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="39"
						height="39"
						viewBox="0 0 39 39"
						fill="none"
					>
						<path d="M2.26659 9.02942L0 14.7596C5.78853 18.6492 2.41189 22.6314 0 24.1363C0 24.1363 2.26659 29.9023 2.44095 29.8665C9.20586 28.4774 9.67661 33.6867 9.06638 36.465C9.06638 36.465 14.6457 39.2432 14.82 38.9828C18.7256 33.1484 22.7241 36.5518 24.2351 38.9828C24.2351 38.9828 30.1293 36.7254 30.076 36.465C28.6811 29.6582 33.9117 29.2298 36.7014 29.8665C36.7014 29.8665 39.3167 24.3705 38.968 24.1363C32.9702 20.1078 36.4689 16.2645 38.968 14.8464C38.968 14.8464 37.1373 9.02942 36.527 9.02942C29.7417 9.02942 29.2914 5.23822 29.8144 2.431L24.1479 0C20.2424 5.48711 16.302 2.28629 14.82 0L9.06638 2.431C10.4612 9.44616 5.11437 9.75293 2.26659 9.02942Z" />
						<circle cx="19.5" cy="19.5" r="6.5" fill="#102D38" />
					</svg>
				</button>
				<div
					id="casovac-nastaveni-fixed"
					style={{
						display: this.state.showNastaveni ? "inline" : "none",
					}}
				>
					<div id="casovac-nastaveni-nadpis-holder">
						<h3>Nastavení</h3>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="27"
							height="27"
							viewBox="0 0 27 27"
							fill="none"
							onClick={() =>
								this.setState({
									showNastaveni: !this.state.showNastaveni,
								})
							}
							id="casovac-nastaveni-krizek"
						>
							<path
								d="M3 3C7.23413 7.23413 10.6928 10.6928 13.5 13.5M13.5 13.5C21.5658 21.5658 24.2527 24.2527 24.5 24.5L13.5 13.5ZM13.5 13.5L3 24L24 3"
								strokeWidth="6"
							/>
						</svg>
					</div>
					<h5>Časovač</h5>
					<div id="casovac-nastaveni-cas">
						<input type="text" value="06" />
						<span>:</span>
						<input type="text" value="45" />
					</div>

					<h5>Skóre</h5>
					<div id="casovac-nastaveni-cas">
						<input type="text" value="1" />
						<span>:</span>
						<input type="text" value="4" />
					</div>

					<h5>Tresty</h5>
					<input type="text" />
					<input type="text" />
				</div>
			</>
		);
	}
}

export default Casovac;
