<?PHP
require "dbsession.php";

//Katsotaan, onko meillä sessio, eli onko kirjauduttu sisään. Jos on, palautetaan käyttäjän id.
function sessionUid()
{
	if (!array_key_exists("uid", $_SESSION))
	{
		jsonResponse(false, "No logged in session", 1);
		return null;
	}
	if ($_SESSION["uid"] == null)
	{
		jsonResponse(false, "No logged in session", 1);
		return null;
	}
	else
	{
		$uid = $_SESSION["uid"];
		return $uid;
	}
}
?>