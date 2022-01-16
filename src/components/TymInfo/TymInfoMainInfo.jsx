import React, { Component } from "react";

class TymInfoMainInfo extends Component {
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
							<h3>{this.props.tym.skupina}</h3>
						</div>
						<h4>Skupina</h4>
					</div>
					<div className="tym-info-basic-item-wrapper">
						<div
							className="tym-info-basic-item-div"
							id="tym-info-the-odd-one"
						>
							{this.props.tridy?.map((trida, i) => {
								return <span key={trida + i}>{trida}</span>
							})}
						</div>
						<h4>Třídy hráčů</h4>
					</div>
					<div className="tym-info-basic-item-wrapper">
						<div className="tym-info-basic-item-div">
							<h3>{this.props.tym?.zapasy}</h3>
						</div>
						<h4>Odehrané zápasy</h4>
					</div>
					<div className="tym-info-basic-item-wrapper">
						<div className="tym-info-basic-item-div">
							<h3>{this.props.tym?.vyhry}</h3>
						</div>
						<h4>Výhry</h4>
					</div>
				</div>
			</>
		);
	}
}

export default TymInfoMainInfo;
