import React, { Component } from "react";
import AdminPrijatyTym from "./AdminPrijatyTym";

class AdminPrijateTymy extends Component {
	state = {};

	displayPrijateTymy = () => {
		let result = [];

		if (!this.props.prijate_tymy.length) {
			return "";
		}

		for (let i = 0; i < this.props.prijate_tymy.length; i++) {
			let zaplaceno = {};
			let zaplacenoButton = {};

			if (this.props.prijate_tymy[i].zaplaceno) {
				zaplaceno = { background: "#4caf50", color: "#f1faee" };
				zaplacenoButton = { background: "#E63946" };
			} else {
				zaplaceno = {};
			}

			result.push(
				<>
					<AdminPrijatyTym
						i={i}
						zaplaceno={zaplaceno}
						prijaty_tym={this.props.prijate_tymy[i]}
						zaplacenoButton={zaplacenoButton}
						confirmZaplaceno={this.props.confirmZaplaceno}
					/>
				</>
			);
		}

		return result;
	};

	render() {
		return <>{this.displayPrijateTymy()}</>;
	}
}

export default AdminPrijateTymy;
