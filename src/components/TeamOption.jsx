import React, { Component } from "react";

class TeamOption extends Component {
	state = {
		classL: this.props.colorL,
		classR: this.props.colorR,
		greenL: "",
		greenR: "",
	};

	changeColor = (team, pos) => {
		this.props.teamChoose(team, this, pos);

		/*if (team === this.props.left) {
			if (this.state.greenL === "") {
				this.setState({ greenL: "green" });
			} else {
				this.setState({ greenL: "" });
			}
		} else if (team === this.props.right) {
			if (this.state.greenR === "") {
				this.setState({ greenR: "green" });
			} else {
				this.setState({ greenR: "" });
			}
		}*/
	};

	render() {
		return (
			<div className="chos-team-team-wrapper">
				<div
					className={
						"chos-team-left-team " +
						this.state.classL +
						" " +
						this.state.greenL
					}
					onClick={() => this.changeColor(this.props.left, "left")}
				>
					<span>{this.props.left}</span>
					<div className="checkmark"></div>
				</div>
				<div
					className={
						"chos-team-right-team " +
						this.state.classR +
						" " +
						this.state.greenR
					}
					onClick={() => this.changeColor(this.props.right, "right")}
				>
					<span>{this.props.right}</span>
					<div className="checkmark"></div>
				</div>
			</div>
		);
	}
}

export default TeamOption;
