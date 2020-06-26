import React, { Component } from "react";
import "./css/hrajici_tabulka.css";

class HrajiciTabulka extends Component {
	state = {};
	render() {
		return (
			<section id="hrajici-tabulka-sect">
				<div id="hrajici-tabulka-nadpis">
					<h3>Tabulka hrající skupiny</h3>
				</div>
				<div id="hrajici-tabulka-popis">
					<span>Jméno</span>
					<span>Z</span>
					<span>V</span>
					<span>R</span>
					<span>P</span>
					<span>G</span>
					<span>B</span>
				</div>
				<div id="hrajici-tabulka-tabulka">
					<div>
						<span>Učitelé</span>
						<span>3</span>
						<span>1</span>
						<span>0</span>
						<span>1</span>
						<span>5</span>
						<span>3</span>
					</div>
					<div>
						<span>Vygrachanci</span>
						<span>7</span>
						<span>4</span>
						<span>1</span>
						<span>0</span>
						<span>8</span>
						<span>5</span>
					</div>
					<div>
						<span>Antišunkofleci</span>
						<span>4</span>
						<span>0</span>
						<span>9</span>
						<span>5</span>
						<span>10</span>
						<span>0</span>
					</div>
					<div>
						<span>Boney M</span>
						<span>2</span>
						<span>2</span>
						<span>6</span>
						<span>4</span>
						<span>1</span>
						<span>5</span>
					</div>
				</div>
			</section>
		);
	}
}

export default HrajiciTabulka;
