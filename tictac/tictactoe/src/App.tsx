import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { CircularProgress } from '@mui/material';
import TicTacToe from './TicTacToe';

/*
	Tämä tiedosto toimii "auton avaimena": Laittaa pyörivän rinkulan ruudulle, pyytää palvelimelta asetukset
	ja asetusten saavuttua käynnistää itse sovelluksen.
	Katso, miten rinkula on tehty, tuo on yksi tapa (monista) sen toteuttamiseen. Odottelurinkulaa tarvitaan
	aika monessa sovelluksessa.
	...tosin nyt käy varmaan niin, että rinkula ei nopeuden vuoksi näy silmänräpäystäkään... voit tietysti testata
	sitä kommentoimalla pois fetch-komennon :-).
*/

let config : any;

function showError(e : any)
{
	brancher("error"); 
	console.log(e);
}

function configureApp(c : any)
{
	config = c;
	brancher("tictactoe");
}


function App() {
	if (config == null)
	{
		config = {};
		fetch("/config.json", { method : "GET", mode : "cors", credentials : "include" }).
			then( r => r.json() ).then( j => configureApp(j) ).catch( e => showError(e));
	}
	return (<Spinner state="init"/>);
}


let brancher : Dispatch<SetStateAction<any>>;

function Spinner( props : any )
{
	let [ branch, setBranch ] = React.useState(props.state);
	brancher = setBranch;
	let ret : JSX.Element;
	switch (branch)
	{
		case "init": ret = <CircularProgress key="spin" />; break;
		case "tictactoe": ret = <TicTacToe key="done" config={config} view="login"/>; break;
		default: ret = <div key="err">Ei saatu konffista ny... kato konsolia...</div>;
	}
	return ret;
}



export default App;
