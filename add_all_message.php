<?php
	mysql_connect("localhost","root","");
	mysql_select_db("ananas");
	mysql_set_charset('utf8');
	$number_div = 0;
	if (!preg_match('/^[0-9]{1,9}$/', $number_div) || ($_SESSION['hidden'] != $_POST['hidden'])) { 
		die;
	}
	$sel_result = mysql_query("
		SELECT `time`, `name`, `message`
		FROM `message_chat`
		LIMIT " . $number_div . ', 1000000'
	);
	$message_code = array();
	while($sel_row = mysql_fetch_assoc($sel_result)) {
		$message_code[]=$sel_row;
	}
	echo json_encode($message_code);
?>