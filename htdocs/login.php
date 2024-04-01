<?PHP
/*
	Tässä tiedostossa on kaksi tehtävää, etsi hakusanaa "TEHTÄVÄ"


	TEHTÄVÄ 1:

	Kuten huomaat alla olevaa koodia lukemalla, nyt pitää tehdä tietokanta,
	jossa on taulu nimeltä "user" ja siinä kentät:
	 uid (eli numeerinen tunniste käyttäjille, laita auto-increment tälle)
	 hash (eli salasanan tarkistussumma, tekstiä)
	 email (eli käyttäjän "sähköpostiosoite", mutta nykyisellään siinä voisi lukea vaikka "hurlumhei")

	Lisää tehdään myöhemmin kun tarvitaan.
	Luo käyttäjä ja tietokanta samalla nimellä (tictac).
	credentials.php:ssa on se tietokannan salasana, jonka arvoin omalle tictac-kannalleni, kopsi sieltä, tai keksi
	parempi ja muuta se sinne.
	
	TIETOTURVA-ASIAA tosielämän varalle:
	Muista, että uid, jos se vaikka liikkuisikin palvelimelta selaimelle ei saisi sitten ainakaan enää liikkua 
	takaisin sieltä (miksi liikkuisi? otetaan käytännöksi näissä JSON-himmailuissa, että palvelin on mahdollisimman 
	musta laatikko!): 
	Käyttäjän identiteetti on muodostunut salasanantarkistushetkellä ja se pidetään jemmassa PHP-sessiossa, jonka kaikki 
	tiedot asuvat _vain_ palvelimella.
	Mitä vähemmän selain tietää palvelinpään id:istä ja rakenteista, sen parempi! (Mieti, miksi!?)
	Tulet miettimään sitä myös jatkossa, kun parin muun id:n kanssa tehdään sama homma: saattaisi tuntua helpommalta vain
	lähettää id Reactiin ja sitten lukea se sieltä takaisin... mutta ei, sen sijaan sitä sullotaan sessioon palvelimen
	päässä, eikä React tiedä koko id:nolemassaolosta mitään.


	TEHTÄVÄ 2:
		Muokkaa tätä tiedostoa tarvitsemillasi tavoilla voidaksesi toteuttaa *.tsx-tiedostojen tehtävät!
		Voit (=kannattaa?) myös eriyttää uuden tunnuksen luomisen ja ulos kirjautumisen (session uid = "") täältä.
		Lue myös receive.php:n kommentti, jossa todetaan, että ihan toisenkin suunnan voi ottaa ja sulloa kaiken
		samaan tiedostoon (_kunhan_ sitten on paljon funktioita sisältäviä, atomisia, pieniä .php-tiedostoja sellaisen
		"keskuskytkimen" tukena!).


*/
session_start();
require "dbsession.php";
require "jsonhelpers.php";
$dcdb = getDbSes();
if ($dcdb)
{
	$reqbody = file_get_contents('php://input');
	$jsonar = json_decode($reqbody, TRUE);
	if (trim($jsonar["pass"]) == "" || trim($jsonar["email"]) == "")
	{
		$_SESSION["uid"] = "";
		/*
			TEHTÄVÄ 3: tämän kaltainen koodinpätkä alkaa esiintyä turhan monessa kohtaa,
				   korjaa tilanne tekemällä uusi .php-tiedosto, jossa on
				   funktio: jsonResponse(flag, message, mid)
				   (mid on muuten messageId ja kun kehitys kehittyy ja edistys edistyy,
				   voi olla, että haluat konfiguraatiossa mäpätä mid-luvut teksteihin,
				   nyt sitä ei käytetä oikein kunnolla... mutta network logista on
				   mukavampaa lukea TEKSTIÄ etenkin kun JSON ei kommentteja tue :-( )

				   Tämä uusi funktio, jonka teet sekä luo että tulostaa JSON-vastauksen!
				   Laita funktio tiedostoon "jsonhelpers.php" ja ota
				   käyttöön vähän siellä sun täällä, niin näet, miten koodin pituus
				   vähenee silmissä!
		*/
		jsonResponse(false, "Nonexistent user or wrong password", 0);
		return;
	}
	loginUser($jsonar, $dcdb);
}





function loginUser($jsonar, $dcdb)
{
	$selectuser = $dcdb->prepare("SELECT uid, hash FROM user WHERE email=:email;");
	$selectuser->bindValue(":email", $jsonar["email"]);
	$pwd = $jsonar["pass"];
	if ($selectuser->execute())
	{
		if ($selectuser->rowCount() == 0)
		{
			$_SESSION["uid"] = "";
			//TEHTÄVÄ 3:
			jsonResponse(false, "Wrong email or password", 0);
		}
		else
		{
  			$row = $selectuser->fetch();
			$hash = $row["hash"];
			$uid = $row["uid"];
			$selectuser->closeCursor();
			if (password_verify($jsonar["pass"], $hash))
			{
				$_SESSION["uid"] = $uid;
				//TEHTÄVÄ 3:
				jsonResponse(true, "User exists and has a uid.", 1);
			}
			else
			{
				$_SESSION["uid"] = "";
				//TEHTÄVÄ 3 iskee jälleen:
				jsonResponse(false, "Nonexistent user or wrong password", 0);
			}
		}
	}
	else
	{
		//Ai miten niin huono virheilmoitus? Ei ole huono, me emme paljasta virheitä
		//loppukäyttäjille enempää kuin on pakko. Jos haluat logittaa oikeita syitä, ne
		//on aihetta laitella palvelimen logeihin!
		//Huomatkaa, että tämä on täysin päinvastainen toimintatapa kuin OMISTAMALLASI
		//LAITTEELLA tulisi olla, eli jos käyttöjärjestelmä tekee näin, niin se on sitten
		//aika kehno käyttis. Mutta julkisessa verkossa pyörivässä palvelussa pidämme
		//liinat näyttämön edessä visusti kiinni ja sieltä vain passataan lappuja salin
		//puolelle.
		//Ainiijuu, se tehtävä :-). No, TEHTÄVÄ 3 voisi olla tässäkin kova ratkaisu?
		jsonResponse(false, "Nonexistent user or wrong password", 0);
	}
}
?>