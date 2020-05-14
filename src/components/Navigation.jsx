import React, { Component } from "react";
import {
	BrowserView,
	MobileView,
	/*isBrowser,
    isMobile,*/
} from "react-device-detect";
import { Link } from "react-router-dom";
import "./css/mobile_nav.css";

class Navigation extends Component {
	state = {
		class: "container",
		visible: "",
	};

	changeClass = () => {
		if (this.state.class === "container") {
			this.setState({ class: "container change", visible: "visible" });
		} else {
			this.setState({ class: "container", visible: "non" });
		}
	};

	render() {
		return (
			<>
				<MobileView viewClassName="mobile-nav">
					<Link to="/dotazy">
						<div
							id="nav-dotazy"
							className={"nav-links " + this.state.visible}
						>
							Dotazy
						</div>
					</Link>
					<Link to="/pravidla">
						<div
							id="nav-pravidla"
							className={"nav-links " + this.state.visible}
						>
							Pravidla
						</div>
					</Link>
					<Link to="/rozpis">
						<div
							id="nav-rozpis"
							className={"nav-links " + this.state.visible}
						>
							Rozpis
						</div>
					</Link>
					<Link to="/pavouk">
						<div
							id="nav-pavouk"
							className={"nav-links " + this.state.visible}
						>
							Pavouk
						</div>
					</Link>
					<Link to="/tabulky">
						<div
							id="nav-tabulky"
							className={"nav-links " + this.state.visible}
						>
							Tabulky
						</div>
					</Link>
					<span id="mobile-nav-circle"></span>
					<div
						className={this.state.class}
						onClick={this.changeClass}
					>
						<div className="bar1"></div>
						<div className="bar2"></div>
						<div className="bar3"></div>
					</div>
				</MobileView>
				<BrowserView>
					<h1> This is rendered only in browser </h1>
				</BrowserView>
			</>
		);
	}
}

export default Navigation;
