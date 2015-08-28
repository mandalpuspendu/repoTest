<html>
<head>
<title> Employee Details Page </title>
</head>
<body>
	<div>
		<form id="empForm" onsubmit="insertEmployee(event)">
		<!--form id="empForm" action="test.php" method="post"-->
			<table>
				<tr > 
					<th colspan="2" align="center">Employee Details</th>
					
				</tr>
				<tr>
					<td>Full Name : </td>
					<td><input type="text" id="empName" placeholder="Enter Your Full Name"></td>
				</tr>
				<tr> 
					<td> Address : </td>
					<td><textarea rows="4" cols="40" id="empAddress" placeholder="Enter Address"></textarea></td>
				</tr>
				<tr>
					<td> Phone Number : </td>
					<td><input type="text" id="empPhone" placeholder="Enter Phone Number"></td>
				</tr>
				
				<tr>
					<td colspan="2" align="center"><input type="submit" id="empSubmit" value="Submit" ></td>
				</tr>
			</table>
		</form>
	</div>
	
	<script type="text/javascript" src="test3.js"></script>
</body>
</html>
