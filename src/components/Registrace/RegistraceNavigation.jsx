import React, { Component } from "react";
import {
	BrowserView,
	MobileView,
	/*isBrowser,
    isMobile,*/
} from "react-device-detect";
import { Link } from "react-router-dom";
import "../css/mobile_nav.css";
import "../css/pc-navigation.css";
import "../css/register-navigation.css";

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
							Registrace
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
							Dotazy
						</div>
					</Link>
				</MobileView>
				<BrowserView>
					<div id="pc-nav-reg">
						<Link to="/rozpis">
							<span id="reg-test">Registrace</span>
						</Link>
						<Link to="/pravidla">
							<span>Pravidla</span>
						</Link>
						<Link to="/dotazy">
							<span>Dotazy</span>
						</Link>
					</div>
				</BrowserView>
			</>
		);
	}
}

export default Navigation;
