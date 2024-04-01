<?PHP

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
		jsonResponse(false, "No email or password typed", 3);
		return;
	}
	registerUser($jsonar, $dcdb);
}

function registerUser($jsonar, $dcdb)
{
	$selectuser = $dcdb->prepare("SELECT uid FROM user WHERE email=:email;");
	$selectuser->bindValue(":email", $jsonar["email"]);
	if ($selectuser->execute())
	{
		if ($selectuser->rowCount() == 0)
		{
			$insertuser = $dcdb->prepare("INSERT INTO user (email, hash) values (:email, :hash);");
 			$insertuser->bindValue(":email", $jsonar["email"]);
			$insertuser->bindValue(":hash", password_hash($jsonar["pass"], PASSWORD_BCRYPT));
			if ($insertuser->execute()) 
			{
				jsonResponse(true, "User created", 2);
			}
			else
			{
				$_SESSION["uid"] = "";
				//TEHTÄVÄ 3:
				jsonResponse(false, "User already exists", 3);
			}
		}
	} 
	else
	{
        	$_SESSION["uid"] = "";
			jsonResponse(false, "Nonexistent user or wrong password", 3);
		}
}
?>