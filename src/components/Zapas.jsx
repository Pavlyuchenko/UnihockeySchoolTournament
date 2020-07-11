import React, { Component } from "react";
import { Link } from "react-router-dom";

class Zapas extends Component {
	state = {};
	render() {
		return (
			<div className="nasl-zap-zap-wrapper">
				<div className="nasl-zap-zap-domaci">
					<Link
						to={"/tym/" + this.props.domaci}
						style={{ textDecoration: "underline" }}
					>
						{this.props.domaci}
					</Link>
				</div>
				<div className="nasl-zap-zap-hoste">
					<Link
						to={"/tym/" + this.props.hoste}
						style={{
							color: "#e63946",
							textDecoration: "underline",
						}}
					>
						{this.props.hoste}
					</Link>
				</div>
			</div>
		);
	}
}

export default Zapas;
