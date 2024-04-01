<?PHP
require "constants.php";
require PREFIX."credentials.php";

//Tällä meille yhteys kantaan. Jos ei toimi, tsekkaa credentials.php:n tiedot.
function getDbSes()
{
	try
	{
		return new PDO(getDbStringFromCredentials(), getDbUserFromCredentials(), getDbPwdFromCredentials(),
		array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			 PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8' ));
	}
	catch (PDOException $noDb)
	{
		$ret = [];
		$ret["success"] = false;
		$ret["message"] = "Database connection failure.";
		$ret["mid"] = 1;
		echo json_encode($ret);
		return false;
	}
	
}


?>