<?php
	mysql_set_charset('utf8');
	$dir = "W:\My downloads";
	if ($handle = opendir($dir)) {
		echo "Desriptor cataloga: $handle\n";
		echo "Zapici:\n";
		while (false !== ($entry = readdir($handle))) {
			echo "$entry;\n";
		}
		closedir($handle);
	}
?>