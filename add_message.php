<?php
	session_start();
	mysql_connect("localhost","root","");
	mysql_select_db("ananas");
	mysql_set_charset('utf8');
	
	if(($_SESSION['log_or_exit'] == "exit") && ($_POST['msgtext'] != "")){
		$mes = array(
			"message" => $_POST['msgtext'],
			"time" => date('Y-m-d H:i:s'),
			"name" => $_SESSION['login'],
		);
		$q = "INSERT INTO `message_chat` (`time`, `message`, `name`) VALUES ('" . mysql_real_escape_string($mes['time']) . "', '" 
		. mysql_real_escape_string($mes['message']) . "', '"
		. mysql_real_escape_string($mes['name']) . "')";
		$result = mysql_query($q) or die(mysql_error());
		echo json_encode($mes);
	}
?>