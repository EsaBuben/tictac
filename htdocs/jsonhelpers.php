<?PHP
function jsonResponse($flag, $message, $mid)
{
	$ret = [];
	$ret["success"] = $flag;
	$ret["message"] = $message;
	$ret["mid"] = $mid;
	echo json_encode($ret);
}
?>