import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	/*Link,
	Redirect,*/
} from "react-router-dom";
import Main from "./components/Main";
import ChooseTeam from "./components/ChooseTeam";
import Rozpis from "./components/Rozpis";
import Tabulky from "./components/Tabulky";
import Pravidla from "./components/Pravidla";
import Dotazy from "./components/Dotazy";
import Pavouk from "./components/Pavouk";
import Registrace from "./components/Registrace";
import Admin from "./components/Admin";

class App extends Component {
	checkFavoriteTeam = () => {
		const favTeam = JSON.parse(localStorage.getItem("favTeam"));

		if (favTeam && favTeam !== "") {
			return true;
		} else {
			return false;
		}
	};

	checkRegistrovan = () => {
		const registrovan = JSON.parse(localStorage.getItem("registrovan"));

		if (registrovan && registrovan !== "") {
			return true;
		} else {
			return false;
		}
	};

	componentDidMount() {
		const navstiveno = JSON.parse(localStorage.getItem("navstiveno"));

		if (!(navstiveno && navstiveno !== "")) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					navstevnik: true,
				}),
			};
			fetch("http://127.0.0.1:5000/statistika", requestOptions);
		}

		localStorage.setItem("navstiveno", JSON.stringify(true));
	}

	state = {};
	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						component={() =>
							this.checkFavoriteTeam() ? (
								<Main
									changeTheme={this.changeTheme}
									colors={this.state}
								/>
							) : (
								<ChooseTeam />
							)
						}
					/>
					<Route exact path="/rozpis" component={Rozpis} />
					<Route exact path="/pavouk" component={Pavouk} />
					<Route exact path="/pravidla" component={Pravidla} />
					<Route exact path="/dotazy" component={Dotazy} />
					<Route exact path="/tabulky" component={Tabulky} />

					<Route
						exact
						path="/registrace"
						component={
							() => <Registrace />
							/* 
							
							*** Schováno na později ***

							this.checkRegistrovan() ? (
								<Main
									changeTheme={this.changeTheme}
									colors={this.state}
								/>
							) : (
								<Registrace />
							)*/
						}
					/>
					<Route exact path="/admin" component={Admin} />
				</Switch>
			</Router>
		);
	}
}

export default App;
