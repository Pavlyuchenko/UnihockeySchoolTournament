import React, { Component } from "react";

class AdminGChosenTeam extends Component {
	state = {};

	sendData = (e, tym) => {
		if (e.key === "Enter") {
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: tym.id,
					body: tym.body,
					zapasy: tym.zapasy,
					vyhry: tym.vyhry,
					remizy: tym.remizy,
					prohry: tym.prohry,
					obdrzene_goly: tym.obdrzene_goly,
					vstrelene_goly: tym.vstrelene_goly,
					skupina: tym.skupina,
				}),
			};
			fetch(
				"http://127.0.0.1:5000/update_tym_statistiky",
				requestOptions
			).then(() => this.props.loadZapasyAndTymy());
		}
	};

	chosenTeam = () => {
		let tym = this.props.tymy.filter(
			(team) => team.id === this.props.chosenId
		);

		let nazev = "";
		let hraciArr = [];
		let zapasy = [];
		let zapasyArr = [];
		let tymStatistiky = [];
		if (tym.length > 0) {
			nazev = tym[0].nazev;

			for (let hrac of tym[0].hraci) {
				hraciArr.push(
					<div
						key={hrac.jmeno + hrac}
						className="adming-tym-detail-hraci"
					>
						<span>{hrac.jmeno}</span>
						<span>{hrac.trida}</span>
					</div>
				);
			}

			zapasy = this.props.zapasy.filter(
				(zapas) => zapas.domaci === nazev || zapas.hoste === nazev
			);

			for (let zapas of zapasy) {
				zapasyArr.push(
					<div
						className="adming-tym-detail-zapas"
						key={zapas + zapas.skore1 + zapas.domaci + zapas.hoste}
					>
						<span>{zapas.domaci}</span>
						<span>{zapas.cas}</span>
						<span>{zapas.hoste}</span>
					</div>
				);
			}

			tym = tym[0];

			tymStatistiky.push(
				<React.Fragment key={"Stat" + tym.skupina + tym.nazev}>
					<div>
						<label htmlFor="">Sk</label>
						<input
							type="text"
							value={tym.skupina}
							onChange={(e) =>
								this.props.updateTymStatistiky(
									e,
									tym,
									"skupina"
								)
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">Body</label>
						<input
							type="text"
							value={tym.body}
							onChange={(e) =>
								this.props.updateTymStatistiky(e, tym, "body")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">Záp</label>
						<input
							type="text"
							value={tym.zapasy}
							onChange={(e) =>
								this.props.updateTymStatistiky(e, tym, "zapasy")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">V</label>
						<input
							type="text"
							value={tym.vyhry}
							onChange={(e) =>
								this.props.updateTymStatistiky(e, tym, "vyhry")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">R</label>
						<input
							type="text"
							value={tym.remizy}
							onChange={(e) =>
								this.props.updateTymStatistiky(e, tym, "remizy")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">P</label>
						<input
							type="text"
							value={tym.prohry}
							onChange={(e) =>
								this.props.updateTymStatistiky(e, tym, "prohry")
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>

					<div>
						<label htmlFor="">VG</label>
						<input
							type="text"
							value={tym.vstrelene_goly}
							onChange={(e) =>
								this.props.updateTymStatistiky(
									e,
									tym,
									"vstrelene_goly"
								)
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
					<div>
						<label htmlFor="">OG</label>
						<input
							type="text"
							value={tym.obdrzene_goly}
							onChange={(e) =>
								this.props.updateTymStatistiky(
									e,
									tym,
									"obdrzene_goly"
								)
							}
							onKeyDown={(e) => {
								this.sendData(e, tym);
							}}
						/>
					</div>
				</React.Fragment>
			);
		}

		return (
			<section id="adming-tym-detail">
				<h3>{nazev}</h3>
				<div id="adming-tym-detail-flex">
					<div style={{ width: "48%" }}>
						<h4>Následující zápasy</h4>
						{zapasyArr}
					</div>
					<div style={{ width: "48%" }}>
						<h4 style={{ textAlign: "right" }}>Soupiska</h4>
						{hraciArr}
					</div>
				</div>

				<div id="adming-tym-info">{tymStatistiky}</div>
			</section>
		);
	};

	render() {
		return <>{this.chosenTeam()}</>;
	}
}

export default AdminGChosenTeam;
