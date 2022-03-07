import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import RozpisZapas from "../Rozpis/RozpisZapas";
import RozpisNewZapas from "../Rozpis/RozpisNewZapas";
import { isMobile } from "react-device-detect";
import "../css/pavouk.css";

class Pavouk extends Component {
	componentDidMount() {
		fetch("http://127.0.0.1:5000/pavouk")
			.then((response) => response.json())
			.then((result) => {
                this.setState({
                    zapasy: result.zapasy,
                })
			})
	}

	state = {
        zapasy: []
    };
	render() {
		return (
			<>
				<Logo />
				<Navigation />
				<header id="rozp-wrapper">
                    <div id="rozpis-nadpis">
                        <h1>Čtvrtfinále</h1>
                        <p onClick={() => {
                            alert("Horní zápas ve dvojici se hraje na hřišti A, dolní na hřišti B.")
                        }} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
                    </div>

                    <div id="rozpis-zapasy" style={{ textDecoration: "none" }}>
                        {isMobile ?
                            <>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[0]?.domaci}
                                    cas={this.state.zapasy[0]?.cas}
                                    hoste={this.state.zapasy[0]?.hoste}
                                    key={this.state.zapasy[0]?.domaci + " vsA " + this.state.zapasy[0]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[1]?.domaci}
                                    cas={this.state.zapasy[1]?.cas}
                                    hoste={this.state.zapasy[1]?.hoste}
                                    key={this.state.zapasy[1]?.domaci + " vsB " + this.state.zapasy[1]?.hoste}
                                />
                                <div style={{ height: "10px" }}></div>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[2]?.domaci}
                                    cas={this.state.zapasy[2]?.cas}
                                    hoste={this.state.zapasy[2]?.hoste}
                                    key={this.state.zapasy[2]?.domaci + " vsA sadg" + this.state.zapasy[2]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[3]?.domaci}
                                    cas={this.state.zapasy[3]?.cas}
                                    hoste={this.state.zapasy[3]?.hoste}
                                    key={this.state.zapasy[3]?.domaci + " vsBgwqe " + this.state.zapasy[3]?.hoste}
                                />
                                <div style={{ height: "2px" }}></div>
                            </>
                        :
                            <>
                                <RozpisZapas
                                    domaci={this.state.zapasy[0]?.domaci}
                                    cas={this.state.zapasy[0]?.cas}
                                    hoste={this.state.zapasy[0]?.hoste}
                                    key={this.state.zapasy[0]?.domaci + " vsA " + this.state.zapasy[0]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisZapas
                                    domaci={this.state.zapasy[1]?.domaci}
                                    cas={this.state.zapasy[1]?.cas}
                                    hoste={this.state.zapasy[1]?.hoste}
                                    key={this.state.zapasy[1]?.domaci + " vsB " + this.state.zapasy[1]?.hoste}
                                />
                                <div style={{ height: "2px" }}></div>
                                <RozpisZapas
                                    domaci={this.state.zapasy[2]?.domaci}
                                    cas={this.state.zapasy[2]?.cas}
                                    hoste={this.state.zapasy[2]?.hoste}
                                    key={this.state.zapasy[2]?.domaci + " vsA sadg" + this.state.zapasy[2]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisZapas
                                    domaci={this.state.zapasy[3]?.domaci}
                                    cas={this.state.zapasy[3]?.cas}
                                    hoste={this.state.zapasy[3]?.hoste}
                                    key={this.state.zapasy[3]?.domaci + " vsBgwqe " + this.state.zapasy[3]?.hoste}
                                />
                                <div style={{ height: "2px" }}></div>
                            </>
                        }
                    </div>
                        
                    <div style={{height: "30px"}}></div>

                    <div id="rozpis-nadpis">
                        <h1>Semifinále</h1>
                        <p onClick={() => {
                            alert("Horní zápas ve dvojici se hraje na hřišti A, dolní na hřišti B.")
                        }} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
                    </div>

                    <div id="rozpis-zapasy" style={{ textDecoration: "none" }}>
                        {isMobile ?
                            <>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[4]?.domaci}
                                    cas={this.state.zapasy[4]?.cas}
                                    hoste={this.state.zapasy[4]?.hoste}
                                    key={this.state.zapasy[4]?.domaci + " vsA " + this.state.zapasy[4]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[5]?.domaci}
                                    cas={this.state.zapasy[5]?.cas}
                                    hoste={this.state.zapasy[5]?.hoste}
                                    key={this.state.zapasy[5]?.domaci + " vsB " + this.state.zapasy[5]?.hoste}
                                />
                                <div style={{ height: "2px" }}></div>
                            </>
                        :
                            <>
                                <RozpisZapas
                                    domaci={this.state.zapasy[4]?.domaci}
                                    cas={this.state.zapasy[4]?.cas}
                                    hoste={this.state.zapasy[4]?.hoste}
                                    key={this.state.zapasy[4]?.domaci + " vsA " + this.state.zapasy[4]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                                <RozpisZapas
                                    domaci={this.state.zapasy[5]?.domaci}
                                    cas={this.state.zapasy[5]?.cas}
                                    hoste={this.state.zapasy[5]?.hoste}
                                    key={this.state.zapasy[5]?.domaci + " vsB " + this.state.zapasy[5]?.hoste}
                                />
                                <div style={{ height: "2px" }}></div>
                            </>
                        }
                    </div>

                    <div style={{height: "30px"}}></div>

                    <div id="rozpis-nadpis">
                        <h1>O 3. místo</h1>
                        <p onClick={() => {
                            alert("Horní zápas ve dvojici se hraje na hřišti A, dolní na hřišti B.")
                        }} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
                    </div>

                    <div id="rozpis-zapasy" style={{ textDecoration: "none" }}>
                        {isMobile ?
                            <>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[6]?.domaci}
                                    cas={this.state.zapasy[6]?.cas}
                                    hoste={this.state.zapasy[6]?.hoste}
                                    key={this.state.zapasy[6]?.domaci + " vsA " + this.state.zapasy[6]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                            </>
                        :
                            <>
                                <RozpisZapas
                                    domaci={this.state.zapasy[6]?.domaci}
                                    cas={this.state.zapasy[6]?.cas}
                                    hoste={this.state.zapasy[6]?.hoste}
                                    key={this.state.zapasy[6]?.domaci + " vsA " + this.state.zapasy[6]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                            </>
                        }
                    </div>

                    <div style={{height: "30px"}}></div>

                    <div id="rozpis-nadpis">
                        <h1>Finále</h1>
                        <p onClick={() => {
                            alert("Horní zápas ve dvojici se hraje na hřišti A, dolní na hřišti B.")
                        }} style={{ position: "absolute", top: "-32px", right: "15px", fontSize: "34px", fontWeight: "500", cursor: "pointer" }}>?</p>
                    </div>

                    <div id="rozpis-zapasy" style={{ textDecoration: "none" }}>
                        {isMobile ?
                            <>
                                <RozpisNewZapas
                                    domaci={this.state.zapasy[7]?.domaci}
                                    cas={this.state.zapasy[7]?.cas}
                                    hoste={this.state.zapasy[7]?.hoste}
                                    key={this.state.zapasy[7]?.domaci + " vsA " + this.state.zapasy[7]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                            </>
                        :
                            <>
                                <RozpisZapas
                                    domaci={this.state.zapasy[7]?.domaci}
                                    cas={this.state.zapasy[7]?.cas}
                                    hoste={this.state.zapasy[7]?.hoste}
                                    key={this.state.zapasy[7]?.domaci + " vsA " + this.state.zapasy[7]?.hoste}
                                />
                                <div style={{ marginTop: "-7px" }}></div>
                            </>
                        }
                    </div>
				</header>
			</>
		);
	}
}

export default Pavouk;
