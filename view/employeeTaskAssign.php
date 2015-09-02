<html>
	<head>
		<title>Employee Task Assignment </title>
		
		<link rel="stylesheet" href="test3.css">
		<meta name="viewport" content="width=device-width, initial-scale=1">
  		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

	</head>
	<body>
		
		<div class='container'>
			<div class='jumbotron'>
				<h1> Task Assignment test Project </h1>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div>
						<form onsubmit="taskInsert(event)">
							Task Name:
							<input type="text" id="taskName" placeholder="Enter Task Name"><br/>
							Task Duration:
							<input type="text" id="taskDuration" placeholder="Enter Duration"><br/>
							<input type="submit" id="taskSubmit" value="Task Submit" >
						</form>
					</div>
					<div id="taskContainner">
			
					</div>
				</div>
				<div class="col-sm-6">
					<div class="row">
						<div class="col-sm-4" id="processing"><h3>Processing</h3></div>
						<div class="col-sm-4" id="development"><h3>Development</h3></div>
						<div class="col-sm-4" id="design"><h3>Design</h3></div>
					</div>
				<div>
			</div>
		</div>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="test3.js"></script>
		
	</body>
</html>
