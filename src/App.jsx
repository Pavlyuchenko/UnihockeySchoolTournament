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
import Admin from "./components/Admin/Admin";
import AdminGroup from "./components/AdminGroup/AdminGroup";
import Casovac from "./components/Casovac";
import TymInfo from "./components/TymInfo";

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
					<Route exact path="/casovac" component={Casovac} />

					<Route
						exact
						path="/registrace"
						component={() => <Registrace />}
					/>
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/adming" component={AdminGroup} />

					<Route
						exact
						path="/tym/:nazev"
						render={(props) => {
							console.log(props.match.params.nazev);

							return <TymInfo nazev={props.match.params.nazev} />;
						}}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
