import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import  Game  from './Game';
import  Login  from './Login';
import Register  from './Register';
import TopBar from './TopBar';


/*
   HARJOITUS ISO: Tee tähän tiedostoon JSX-koodia ja logiikkaa siten, että saat tästä näkymän, joka
                  sisältää tilanteen mukaan omassa lokerossaan (ruudun alaosa tms. "mesta") joko:
                  -sisäänkirjautumisen
                  -pelin
                  -aulan (vastustajan valinta)
                  -rekisteröitymisen/tunnuksen luonnin
		  Ja JATKUVASTI näkyvillä ylä-/sivupalkin, josta pelaaja tietää, "missä menen"!

   
   Tämän tiedoston komponentin (TicTacToe, eli "pääkomponentti") tulisi siis näkyä koko ajan esimerkiksi
   "ylä-/sivupalkkina", joka näyttää käyttäjän sähköpostiosoitteen ja "kirjaudu ulos"-nappulan. Loppuosa
   ruudun sisällöstä määräytyy asiayhteyden mukaisesti.
   Kunhan "statusalue" löytyy ja sen vieressä sivun sisältö vaihtuu kirjautumistatuksen mukaisesti, ei ole
   väliä, miltä ulkoasua tarkalleen näyttää: voit hioa sitä huolella tai tehdä perusversion, miten vain.


   Malliksi sinulle on jo eriytetty omaan tiedostoonsa pelilauta, eli Game.

   Malliksi myös kirjautuminen (ja uloskirjautuminenkin) "toimii"... omalla hiukan pipillä logiikallaan, 
   jonka ymmärtää vasta kun sen lukee koodista - siinä on nyt kaikki puurot ja vellit iloisesti sekaisin :-).
   Sinänsä mallikoodin mukainen peruslogiikka on ihan tuotantokelposta kamaa, _kunhan_ tuotantopalvelimella on 
   TLS (eli HTTPS). Tuo TLS on siis ehdoton _vaatimus_ tämän käytölle tuotannossa: salasana menee 
   lukukelpoisena palvelimelle, jossa siitä tehdään hash-koodi (lue .php-lähdekoodi ja tutkaile, mitä 
   tietokantaan ilmestyy, niin näet).
   On vaikeaa, muttei mahdotonta saada hash-koodista tietoon salasana, mutta hash-koodin käyttö kuitenkin 
   suojaa tietomurtojen varalta kohtuullisesti (antaa peliaikaa varoittaa käyttäjiä, että nyt salasanat 
   vaihtoon!)
   
  HARJOITUS 2:
   Eriytä Login omaan tiedostoonsa ja sen jälkeen tee siitä nätti katsella ja loogisempi käyttää. Tämä
   edellyttänee myös muutoksia PHP-puolelle. Käytä muutoksissa kokemusta ja tervettä järkeä: Salasanan ei
   varmaan tulisi näkyä ruudulla? Rekisteröinnin ei ehkä pitäisi tapahtua siten, että jos ei käyttäjää
   ole, se luodaan (n+1 väärin kirjoitettua käyttäjänimeä kannassa?), vaan rekisteröinnillä tulisi joko 
   olla oma sivu tai muutoin selkeä erillinen näkymä?
   Ja eikös rekisteröitäessä yleensä kysytä salasanaa kahdesti typojen varalle? Onko olemassa sähköpostia,
   jossa ei ole @-merkkiä?!
   Nuo nyt ainakin aluksi, niistä jo tuleekin ihan kivasti logiikkaa uuteen Login.tsx-tiedostoosi :-).
   Muutakin logiikkaa voit lisätä ja kaikki sellainen logiikka on potentiaalisesti hyödynnettävissä omissa 
   projekteissa!

*/


let viewSetter : Dispatch<SetStateAction<any>>;
// let userSetter : Dispatch<SetStateAction<any>>;



function logout()
{
	//HARJOITUS 3: Tämähän ei riitä. Palvelimen päähän pitää ottaa yhteys ja pyytää nollaamaan uid sessiossa,
	//	       muutoin voi käydä niin, että seuraava käyttäjä pystyy jatkamaan pelejä, ellei selainta nollailla
	//             välissä. Tietysti ensialkuun pitäisi olla se logoutnappi, joka tämän aktivoi, tekemässäsi palkissa :-).

	viewSetter("login");
}

export function Page(props : string) {

   viewSetter(props);

}

// export function User(props : string) {

//    userSetter(props);

// }

function TicTacToe(props : any)
{
	let config = props.config;
	let ret;
	let [view, setView] = React.useState(props.view);
   // let [user, setUser] = React.useState(props.user);
	viewSetter = setView;
   // userSetter = setUser;
	if (view === "game") ret = <Game key={view} sizex={3} sizey={3} config={config}/>;
   else if (view === "register") ret = <Register key={view} config={config}/>;
	else ret = <Login key={view} config={config}/>;
	return ret;
}

export default TicTacToe;