<?php
	$json = file_get_contents('php://input'); 
	$obj = json_decode($json);
	$id=uniqid();
	$taskId=substr($id,-4,4);
	echo $taskId;
?>