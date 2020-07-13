import React, { Component } from "react";

class AdminStatistika extends Component {
	state = {};
	render() {
		return (
			<div id="admin-tymy-statistika">
				<div id="admin-reg-tymy">
					<h2>Registrované týmy</h2>
					<h1>{this.props.registrovane_tymy_count}</h1>
				</div>
				<div id="admin-reg-navstevnici">
					<h2>Návštěvníci</h2>
					<h1>{this.props.navstiveno}</h1>
				</div>
			</div>
		);
	}
}

export default AdminStatistika;
