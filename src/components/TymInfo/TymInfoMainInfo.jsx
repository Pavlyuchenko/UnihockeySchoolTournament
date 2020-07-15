import React, { Component } from "react";

class TymInfoMainInfo extends Component {
	state = {};
	render() {
		return (
			<>
				<div id="tym-info-badge">
					<div id="tym-info-line"></div>
					<div id="tym-info-nadpis-div">
						<h2 id="tym-info-nadpis">{this.props.tym.nazev}</h2>
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
							<h3 id="tym-info-odd-second">MGO</h3>
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
			</>
		);
	}
}

export default TymInfoMainInfo;
