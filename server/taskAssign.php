<?php
	$json = file_get_contents('php://input'); 
	$obj = json_decode($json);
	echo $obj;
	/*$command=$obj->taskCommand;
	require('dbConnection.php');
	//echo "$command";
	switch($command){
		case "insert":
			$taskName=$obj->taskName;
			$taskDuration=$obj->taskDuration;
			$taskStatus=$obj->taskStatus;
			$id=uniqid();
			$taskId=substr($id,-4,4);
			//echo "$id\n";
			
			echo "$taskId";
			//echo "$taskName";
			//$conn=mysqli_connect("localhost","root","1234","employee");
			if(!$conn)
				die("Connection faild..");

			$sql="insert into task (taskId,taskName,taskDuration,status) values('$taskId','$taskName',$taskDuration,'$taskStatus')";
			$result=mysqli_query($conn,$sql);
			if(!$result)
				die("task data can't save into database.. please check insert query!");
			//mysqli_close($conn);
			break;
		case "update":
			$state=$obj->taskStatus;
			$taskId=$obj->taskId;
			//require('dataConnectionString.php');
			$sql="update task set status='$state' where taskId='$taskId'";
			$result=mysqli_query($conn,$sql);
			if(!$result)
				die("task state can't update.. please check update query!");
			
			break;
		case "remove":
			$taskId=$obj->taskId;
			//require('dataConnectionString.php');
			$sql="delete from task where taskId='$taskId'";
			$result=mysqli_query($conn,$sql);
			if(!$result)
				die("task can't delete.. please check delete query!");
			//mysqli_close($conn);
			break;
		case "display":
			$sql="select * from task";
			$result=mysqli_query($conn,$sql);
			$count=mysqli_num_rows($result);
			$arr=array();
			for($i=0;$i<$count;$i++){
				$rows=mysqli_fetch_array($result, MYSQL_ASSOC);//use MYSQL_ASSOC so you wouldn't have duplicate data
   				 $arr[] = $rows;
			}
			echo json_encode($arr);
	}	*/
	mysqli_close($conn);
?>