import React, { Component } from "react";

class AdminNovyTym extends Component {
	state = {};
	render() {
		return (
			<div
				key={"novy_tym" + this.props.i}
				className="admin-nove-tymy-div"
			>
				<span className="admin-nove-tymy-nazev">
					{this.props.novy_tym.nazev}
				</span>
				<div className="admin-nove-tymy-buttons">
					<button
						onClick={() =>
							this.props.confirmTeam(
								this.props.i,
								this.props.novy_tym.id
							)
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="21"
							viewBox="0 0 25 21"
							fill="none"
						>
							<path
								d="M2 8.37931L8.44318 17L23 2"
								stroke="#F1FAEE"
								strokeWidth="4"
							/>
						</svg>
					</button>
					<button
						onClick={() =>
							this.props.deleteTeam(
								this.props.i,
								this.props.novy_tym.id
							)
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M10 10L18 2M10 10L2 18M10 10L18 18M10 10L2 2"
								stroke="#F1FAEE"
								strokeWidth="4"
							/>
						</svg>
					</button>
				</div>
			</div>
		);
	}
}

export default AdminNovyTym;
