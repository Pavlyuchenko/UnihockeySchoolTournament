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
				className={
					"chos-team-team " +
					this.state.class +
					" " +
					this.state.green
				}
				onClick={() => this.changeColor(this.props.teamName)}
			>
				<span>{this.props.teamName}</span>
				<div className="checkmark"></div>
			</div>
		);
	}
}

export default TeamOption;
