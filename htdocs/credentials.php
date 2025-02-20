<?PHP
/*
	Tämä tiedosto kuuluu samaan hakemistoon htdocs-hakemiston kanssa! Eli ei htdocsIIN vaan sen viereen!
	Pidämme mieluummin salasanoja sisältävät tiedostot jossain muualla 
	kuin htdocsin alla.
	Jos tietokantasi nimi ei ole "tictac",
	käyttäjän nimi ei ole "tictac" ja/tai
	käyttäjän salasana ei ole tuo alla oleva randomi rimpsu...
	...niin tänne haluat muutella ne omat versiosi!-)
*/

function getDbStringFromCredentials()
{
	return "mysql:host=127.0.0.1;dbname=tictac";
}

function getDbUserFromCredentials()
{
	return "tictac";
}

function getDbPwdFromCredentials()
{
	return "qW2Kl0p25";
}

?>