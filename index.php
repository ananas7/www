<?php
	session_start();
	function template($name, $repl) {
		$text = file_get_contents($name . ".htm");
		$what = $bywhat = array();
		foreach ($repl as $key => $val) {
			$what[] = '{#' . $key . '#}';
			$bywhat[] = $val;
		}
		return str_replace($what, $bywhat, $text);
	}
	function register(){
		if (array_key_exists('p1', $_POST)) {
			$x = $_POST['login'];
			$y = $_POST['password'];
			mysql_query("INSERT INTO `users`(`name`, `password`) VALUES ('$x', '$y')");
			echo template("main", array("LOGIN" => $x));
		}
		echo mysql_error();
	}
	mysql_connect("localhost","root","");
	mysql_select_db("ananas");
	mysql_set_charset('utf8');
	if (isset($_POST['p2'])) {
		
		$_SESSION['log_or_exit'] = "log";
	}
	if(isset($_POST['login'])){
		$res = mysql_fetch_array(mysql_query("SELECT * FROM users WHERE name='{$_POST['login']}' AND password='{$_POST['password']}'"));
		if ($res) {
			$_SESSION['login'] = $res['name'];
			$_SESSION['log_or_exit'] = "exit";
		}
		else {
			$_SESSION['log_or_exit'] = "log";
		}
	}
	if(isset($_POST['send']) && ($_SESSION['log_or_exit'] == "exit") && ($_POST['message'] != "")){
		$message = $_POST['message'];
		$time = date('Y-m-d H:i:s');
		$name = $_SESSION['login'];
		header('Location: http://ananas.ru');
		$q = "INSERT INTO `message_chat` (`time`, `message`, `name`) VALUES ('$time', '$message', '$name')";
		$result = mysql_query($q) or die(mysql_error());
	}
	function show_main(){
		$main = file_get_contents("main.htm");
		$hid = rand();
		$_SESSION['hidden'] = $hid;
		if($_SESSION['log_or_exit'] == "log")
			$main = str_replace("{#FORMA#}",file_get_contents("login.htm"), $main);
		else
			$main = str_replace("{#FORMA#}",str_replace("{#NAME#}", $_SESSION['login'], file_get_contents("exit.htm")), $main);
		$main = str_replace("{#hidden#}", $hid, $main);
		echo mysql_error();
		echo $main;
	}
	show_main();
?>