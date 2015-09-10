<?php
	$host="localhost";
	$user="root";
	$password="1234";
	$dbName="employee";
	$conn=mysqli_connect($host,$user,$password,$dbName);
	if(!$conn)
		die("Could Not Connect:".mysql_error());
?>