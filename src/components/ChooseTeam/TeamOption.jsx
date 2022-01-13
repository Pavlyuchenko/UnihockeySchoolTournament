import React, { Component } from "react";

class TeamOption extends Component {
	state = {
		class: this.props.color,
		green: "",
	};

	changeColor = (team) => {
		this.props.teamChoose(team, this);
	};

	render() {
		return (
			<div
				className={"chos-team-team " + this.state.green}
				onClick={() => {return;this.changeColor(this.props.teamName)}}
				style={{
					backgroundColor:
						this.props.teamName === "Chci zůstat neutrální"
							? "#3e3e3e"
							: "e63946",
				}}
			>
				<span>{this.props.teamName}</span>
				<div className="checkmark"></div>
				<p className="firstName1">
					{this.props.jmenaHracu[0] && this.props.jmenaHracu[0]}
				</p>
				<p className="secondName1">
					{this.props.jmenaHracu[0] && this.props.jmenaHracu[1]}
				</p>
				<p className="thirdName1">
					{this.props.jmenaHracu[0] && this.props.jmenaHracu[2]}
				</p>
				<p className="fourthName1">
					{this.props.jmenaHracu[0] && this.props.jmenaHracu[3]}
				</p>
				<p className="trida">{this.props.trida}</p>
			</div>
		);
	}
}

export default TeamOption;
