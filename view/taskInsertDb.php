<?php
	
	$taskName=$_POST['taskName'];
	$taskDuration=$_POST['taskDuration'];
	$id=uniqid();
	$taskId=substr($id,-4,4);
	//echo "$id\n";
	require('dataConnectionString.php');
	echo "$taskId";
	//echo "$taskName";
	//$conn=mysqli_connect("localhost","root","1234","employee");
	if(!$conn)
		die("Connection faild..");

	$sql="insert into task (taskId,taskName,taskDuration) values('$taskId','$taskName',$taskDuration)";
	$result=mysqli_query($conn,$sql);
	if(!$result)
		die("task data can't save into database.. please check insert query!");
	mysqli_close($conn);
	//echo "hello";
?>