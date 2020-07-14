import React, { Component } from "react";

class AdminGTabulka extends Component {
	state = {};
	render() {
		return (
			<section id="adming-tymy">
				<h3>Seznam týmů</h3>
				<table>
					<thead>
						<tr>
							<th>Název</th>
							<th align="right">Sk</th>
							<th align="right">B</th>
							<th align="right">V</th>
							<th align="right">R</th>
							<th align="right">P</th>
							<th align="right">Z</th>
						</tr>
					</thead>
					<tbody>{this.props.addTableRow()}</tbody>
				</table>
			</section>
		);
	}
}

export default AdminGTabulka;
