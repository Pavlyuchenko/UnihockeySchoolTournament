import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";

class Pravidla extends Component {
	state = {};
	render() {
		return (
			<>
				<Logo />
				<Navigation active={2} />
				
				<header id="chos-team-header" style={{ color: "#fff" }}>
					<h1>Pravidla</h1>
					<br />
					Turnaj se dělí na dvě fáze - skupinovou a vyřazovací.
					<br />
					<br />
					<h2>Skupinová fáze</h2>
					Ve skupinové fáze jsou týmy rozděleny do pěti skupin podle náhodného losu 
					(jen týmy učitelů jsme vědomě rozdělili, aby se v žádné skupině nenacházely dva týmy učitelů).
					Všechny skupinové zápasy se odehrají v hale Slezského gymnázia v úterý, 8. 3. 2022 mezi 7:30 a 
					10:30, přičemž každý zápas trvá 2x6 minut hrubého času. K dispozici budou dvě hřiště A a B, na obou se bude
					hrát současně. Všech 5 skupin bude hrát zároveň, takže prosíme všechny týmy, aby při této fázi zůstávaly
					na hale. Dále je nutné sledovat tyto stránky s aktuálním rozpisem, je totiž možné, že budeme muset některé
					zápasy přesouvat z různých důvodů (např. učitelům se to někdy nebude hodit). V případě nepřítomnosti bude 
					zápas kontumován.<br />
					Postup do vyřazovací fáze si zajistí týmy na prvních místech a tři nejlepší druhé týmy.
					<br />
					<br />
					<h2>Vyřazovací fáze</h2>
					Ve vyřazovací fázi se proti sobě utká nejlepší první tým se třetím nejhorším druhým týmem, druhý nejlepší prvních
					tým s druhým nejhorším druhým týmem a tak dále. V této fázi je délka zápasu změněna na 2x8 minut a čas se bude při
					přerušení zastavovat.
				</header>
			</>
		);
	}
}

export default Pravidla;
