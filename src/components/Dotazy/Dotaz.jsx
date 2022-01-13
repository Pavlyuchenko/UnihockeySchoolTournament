import React, { Component } from "react";


class Dotazy extends Component {
	state = {
        opened: false
    };
	render() {
		return (
			<>
				<article class="dotaz" onClick={() => {
					this.setState({opened: !this.state.opened})
				}}>
					<div>{this.props.q}</div>
					<p class="dotaz-answer" style={{ display: this.state.opened ? "block" : "none" }}>{this.props.a}</p>
				</article>
			</>
		);
	}
}

export default Dotazy;
