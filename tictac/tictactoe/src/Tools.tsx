import { Page } from './TicTacToe'

export function confirmSession(j : any)
{

	if (j.success)
	{
        if(j.mid == 1) {
			alert("Kirjautuminen onnistui");
			Page("game");
			// User(m);
        }
        else if(j.mid == 2) {
            alert("Rekisteröityminen onnistui");
            Page("login");
        }
	}
	else 
	{
		if(j.mid == 0) {
			alert("Kirjautuminen epäonnistui");
			Page("login");
		}
		else if(j.mid == 3) {
			alert("Rekisteröityminen epäonnistui");
			Page("register");
		}
	}
}

function showError(e : any)
{
	alert("Uuupsii... ei tainnut nyt onnistua se palvelimen kanssa keskustelu pidemmälle... tai sitten on JSON jotain omituista... Katsohan konsolia.");
	console.log(e);
	Page("login");
}

export function getSession(event : any, m: string, p: string, c1 : any, c2 : any)
{
	let obu = { email : m, pass : p};
 	fetch(c1+c2, { method : "POST", mode : "cors", credentials : "include", 
                                             headers: {'Content-Type': 'text/plain'}, 
                                             body : JSON.stringify(obu) }).
	then( r => r.json() ).then( j => confirmSession(j) ).catch( e => showError(e));
}

export default getSession;