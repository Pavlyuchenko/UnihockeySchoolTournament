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
					<Link to="/registrace">
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
					<Link to="/dotazy">
						<div
							id="nav-pavouk"
							className={"nav-links " + this.state.visible}
						>
							Dotazy
						</div>
					</Link>
					<Link to="/">
						<div
							id="nav-tabulky"
							className={"nav-links " + this.state.visible}
						>
							Týmy
						</div>
					</Link>
					<span
						id="mobile-nav-circle"
						onClick={this.changeClass}
					></span>
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
					<div id="pc-nav-reg">
						<Link to="/registrace">
							<span id={this.props.active === 1 && "reg-test"}>Registrace</span>
						</Link>
						<Link to="/pravidla">
							<span id={this.props.active === 2 && "reg-test"}>Pravidla</span>
						</Link>
						<Link to="/dotazy">
							<span id={this.props.active === 3 && "reg-test"}>Dotazy</span>
						</Link>
						<Link to="/">
							<span id={this.props.active === 4 && "reg-test"}>Týmy</span>
						</Link>
					</div>
				</BrowserView>
			</>
		);
	}
}

export default Navigation;
