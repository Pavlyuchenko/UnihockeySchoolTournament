import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	/*Link,
	Redirect,*/
} from "react-router-dom";
import Main from "./components/Main/Main";
import ChooseTeam from "./components/ChooseTeam/ChooseTeam";
import Rozpis from "./components/Rozpis/Rozpis";
import Tabulky from "./components/Tabulky/Tabulky";
import Pravidla from "./components/Pravidla/Pravidla";
import Dotazy from "./components/Dotazy/Dotazy";
import PavoukTest from "./components/Pavouk/PavoukTest";
import Registrace from "./components/Registrace/Registrace";
import Admin from "./components/Admin/Admin";
import AdminGroup from "./components/AdminGroup/AdminGroup";
import Casovac from "./components/Casovac";
import TymInfo from "./components/TymInfo/TymInfo";

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
			fetch("https://vfbapi.pythonanywhere.com/statistika", requestOptions);
		}

		localStorage.setItem("navstiveno", JSON.stringify(true));
	}

	state = {};
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/rozpis" component={Rozpis} />
					<Route exact path="/pavouk" component={PavoukTest} />
					<Route exact path="/pravidla" component={Pravidla} />
					<Route exact path="/dotazy" component={Dotazy} />
					<Route exact path="/tabulky" component={Tabulky} />
					<Route exact path="/casovac/a" component={() => { return <Casovac hriste="a" />}} />
					<Route exact path="/casovac/b" component={() => { return <Casovac hriste="b" />}} />

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
							return <TymInfo nazev={props.match.params.nazev} />;
						}}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
