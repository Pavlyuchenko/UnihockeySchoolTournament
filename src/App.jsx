import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	/*Link,
	Redirect,*/
} from "react-router-dom";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import ChooseTeam from "./components/ChooseTeam";

class App extends Component {
	checkFavoriteTeam = () => {
		const favTeam = JSON.parse(localStorage.getItem("favTeam"));

		if (favTeam && favTeam !== "") {
			return true;
		} else {
			return false;
		}
	};

	state = {};
	render() {
		return (
			<Router>
				<Switch>
					{}
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
					<Route exact path="/alt" component={Navigation} />
				</Switch>
			</Router>
		);
	}
}

export default App;
