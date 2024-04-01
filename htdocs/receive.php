<?PHP
/*
	Tätä tiedostoa käytettäessä meillä pitäisi jo olla sessio, jos ei ole,
	on vähän "tilanne päällä" :-).

	receive.php voisi myös raskaampaa JSONia käytettäessä olla se "ainoa endpoint", eli ainoa php-tiedosto,
	joka mitään tekee ja ainoa htdocissa oleva! Silloin JSON-tiedostot sisältäisivät komennon (login/logout/createuser/jne.)
	ja muut .php-tiedostot koostuisivat lähinnä funktioista, joille ohjataan aina tarpeen mukaan.
	Noinkin voi tehdä, mutta näin saatiin konfiguraatioon hiukan enemmän lihaa luiden ympärille :-).
	
	Miksi olisi hyvä? No, jos esim. jokin Apachen päivitys paljastaa kaikkien .php-tiedostojen tekstisisällön vahingossa? 
	Jos ne eivät ole htdocsin alla, niin eipä paljastakaan!

	Jonkinlainen "keskuskytkin" on pikku pakko virittää alustoilla, joissa ei ole sessiokeksiä, mutta PHP:ssahan meillä 
	on sellainen.
*/
session_start();
require "sessioncheck.php";

//Jos login.php ei ole tallettanut uidia sessiomuuttujaan, niin "se siitä sitten": käyttäjä lennätetään
//lähtöruutuun kulkematta edes vankilan kautta :-). Näin voi käydä myös, jos et saa CORSia (eli keksejä
//toimimaan koneessasi!!! Huomaa, että sessionUid-funktio sivuvaikuttaa, se palauttaa virheen, jos homma
//menee pieleen!
if (($uid = sessionUid()) != null)
{
	jsonResponse(true, "No ka, sisseehä sie oot näennä kirjauttunnunna parahaillakkii!", 1);
}
?>