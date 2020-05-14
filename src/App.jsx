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

class App extends Component {
	state = {};
	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						component={() => (
							<Main
								changeTheme={this.changeTheme}
								colors={this.state}
							/>
						)}
					/>
					<Route exact path="/alt" component={Navigation} />
				</Switch>
			</Router>
		);
	}
}

export default App;
