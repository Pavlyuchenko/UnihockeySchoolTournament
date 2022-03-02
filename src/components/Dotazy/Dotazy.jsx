import React, { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import Dotaz from "./Dotaz";
import "../css/dotazy.css"

class Dotazy extends Component {
	state = {
		dotazy: [
			{q: "Kdy a kde se turnaj koná? (DŮLEŽITÁ AKTUALIZACE)", a: "Celý turnaj se kvůli epidemiologické situaci odehraje v jeden den, a to v úterý, 1. 2. v hale Slezského gymnázia. I když je již známý rozpis zápasů, kontrolujte prosím pravidelně na této stránce, zda se nic nezměnilo. Někdy se zápasy můžou posunout v závislosti na tom, jak to bude vyhovovat učitelům."},
			/* {q: "Co to je Vánoční florbalový turnaj?", a: "Na Mendláku se již přes 8 let vždy před Vánoci (letos tedy až o pololetí) koná v rámci školy florbalový turnaj. Cílem této dvoudenní akce je především si trochu zasportovat, pobavit se, užít si skvělou atmosféru a v krajních případech se vyhnout vyučování. Je běžnou praxí, že si týmy vymýšlejí vtipné názvy týmů, originální dresy nebo taky vlastní pokřiky. Je jen na vás, čím publikum překvapíte právě vy. Třešničkou na dortu je tradiční účast týmu učitelů, na což se většinou těší nejvíce studentů."},
			{q: "VŮBEC neumím hrát florbal, můžu se i tak zúčastnit?", a: "Rozhodně ano! Není důležité vyhrát, ale zúčastnit se. V tomto turnaji to platí dvojnásob. Vůbec nikdo se vám nebude smát, pokud florbal neumíte hrát. Všichni si to chceme hlavně užít, utkat se se svými spolužáky a trochu se po svátcích hýbat ;)."},
			{q: "Můžou se turnaje účastnit i holky?", a: "Samozřejmě! V minulých ročnících dokonce holčičí týmy tvořily podstatnou část turnaje, takže není čeho se bát."},
			{q: "Kolik hráčů musí tým mít? Musíme být všichni ze stejné třídy?", a: "Tým musí mít minimálně 4 hráče, jelikož se hraje systémem 3+1. Maximum hráčů v jednom týmu je 10. Co se týče hráčů z různých tříd, neplatí žádná omezení. Jen se hráč nesmí objevit na soupisce více než jednoho týmu."}, */
			{q: "Jak se dozvím informace o tom, kdy můj tým hraje?", a: "Především sledujte tyto stránky, kde najdete nejaktuálnější rozpis zápasů. Krom toho ale můžete najít předběžný rozpis na Facebooku MGO INFO, ale počítejte se skutečností, že se může změnit (což už budeme aktualizovat pouze na těchto stránkách)."},
			{q: "Co když nemáme florbalky ani brankářskou výzbroj?", a: "Není se čeho bát, všechno potřebné vybavení bude připravené v případě nouze."},
			/* {q: "Proč musíme za účast platit?", a: "Částka 150 Kč za tým je spíše symbolická a my doufáme, že nikoho neodradí od účasti v turnaji. Vybrané peníze rozdělíme mezi rozhodčí, kteří se budou starat o hladký průběh turnaje, a za zbytek koupíme drobné ceny pro nejlepší týmy."}, */
			{q: "Komu a kdy mám zaplatit?", a: "Částku 150 Kč doneste do třídy 8.A. Zjistěte si na stránkách školy náš rozvrh, stavte se za námi a shánějte se po Kubovi Hronkovi. Čím dříve, tím lépe, každopádně deadline je před nástupem k prvnímu zápasu, jinak bohužel bude váš tým diskvalifikován."},
			{q: "Proč se to jmenuje 'Vánoční', když je leden/únor?", a: "Vánoční florbalový turnaj je každoročně konaná akce na půdě Mendelova gymnázia. Zatím se všechny její ročníky konaly před Vánoci, jenže letos se to bohužel nějak nestihlo, takže tento turnaj nahrazujeme alespoň o pololetí. Nechceme kazit tradici (o to už se v dostatečné míře postaral Covid), takže to prostě považujeme jako další ročník Vánočního turnaje."},
			{q: "Kdo za touto akcí stojí?", a: "Žáci 8.A."},
		]
	};
	render() {
		return (
			<>
				<Logo />
				<Navigation active={3} />

				<header id="chos-team-header">
					{this.state.dotazy.map(dotaz => {
						return <Dotaz key={dotaz.q} q={dotaz.q} a={dotaz.a} />
					})}
				</header>

				<div id="blank-space"></div>
			</>
		);
	}
}

export default Dotazy;
