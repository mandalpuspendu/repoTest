<?php	
	
	$name=$_POST['empName'];
	$address=$_POST['empAddress'];
	$phoneNumber=$_POST['empPhone'];
	//echo "$name";
	require('dataConnectionString.php');
	//$conn=mysqli_connect("localhost","root","1234","employee");
	if(!$conn)
		die("connection Error");
	$sql="insert into employeedetails (name,address,phoneNo) values('$name','$address','$phoneNumber')";
	$result=mysqli_query($conn,$sql);
	if(!$result)
		die("Data Can't Insert:".mysql_error());
		
	mysqli_close($conn);
?>