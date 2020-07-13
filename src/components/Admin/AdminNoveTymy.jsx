import React, { Component } from "react";
import AdminNovyTym from "./AdminNovyTym";

class AdminNoveTymy extends Component {
	state = {};

	displayNoveTymy = () => {
		let res = [];

		if (!this.props.nove_tymy.length) {
			return "";
		}
		for (let i = 0; i < this.props.nove_tymy.length; i++) {
			res.push(
				<>
					<AdminNovyTym
						novy_tym={this.props.nove_tymy[i]}
						i={i}
						deleteTeam={this.props.deleteTeam}
						confirmTeam={this.props.confirmTeam}
					/>
				</>
			);
		}

		return res;
	};

	render() {
		return <>{this.displayNoveTymy()}</>;
	}
}

export default AdminNoveTymy;
