var taskLib={};
taskLib.taskList=[];
taskLib.taskId='';
taskLib.newTaskTemplete="\
	<div class='well' id='{{taskId}}'>\
		<p class='text-right'><span class=\"glyphicon glyphicon-remove \" id='remove_{{taskId}}'></span></p>\
		<p> Task Name : {{taskName}}</p>\
		<p> Task Duration : {{taskDuration}}</p>\
		<p id='hello'> Task Status : {{taskStatus}}</p>\
		<p><button id='submit_{{taskId}}'>Submit</button></p>\
	</div>\
";
taskLib.processTaskTemplete="\
	<div class='well' id='{{taskId}}'>\
		<p class='text-right'><span class='glyphicon glyphicon-remove' id='remove_{{taskId}}'></span></p>\
		<p> Task Name : {{taskName}}</p>\
		<p> Task Duration : {{taskDuration}}</p>\
		<p> Task Status : {{taskStatus}}</p>\
		<p> <select id='option_{{taskId}}'>\
				<option value='Select Please'>Select Please</option>\
				<option value='Design'>Design</option>\
				<option value='Development'>Development</option>\
			</select>\
		</p>\
	</div>\
";

taskLib.addTaskList=function(taskObject){
	taskLib.taskList.push(taskObject);
}


/* It is create a new task templete when client submit task details */
taskLib.createNewTask=function(){
	
		var task={
			//id : taskId,
			name : document.getElementById('taskName').value,
			duration : document.getElementById('taskDuration').value,
			status : "new born"
		};
		$.ajax({
			url : 'taskAssignDb.php',
			type : "POST",
			data : JSON.stringify({taskCommand : "insert",taskName : task.name,taskDuration : task.duration,taskStatus: task.status}),
			success : function(data){
						task.id = data;
						taskLib.createTask(task);
						taskLib.addTaskList(task);
						/* It is fire a sumit action when task submited  */
						$("#taskContainner").on('click','#submit_'+task.id,function(event){
							//event.preventDefault();
							$.ajax({
								url : 'taskAssignDb.php',
								type : "POST",
								data : JSON.stringify({taskCommand : "update",taskId : task.id,taskStatus : 'processing'}),
								success : function(data2){
									taskLib.addTask(task.id);

									//console.table(taskLib.taskList);
									$('#processing').on('change','#option_'+task.id,function(event){
										
											//console.log(taskId);
											taskLib.trigerOnSelectedOption(task.id);
									});
									$('#processing').on('click','#remove_'+task.id,function(event){
										
											//console.log(taskId);
											taskLib.trigerOnRemoveOption(task.id);
									});

								},
								contentType : "application/json; charset=utf-8" 
							});
							
						});

						$("#taskContainner").on('click',"#remove_"+task.id,function(event){
							//event.preventDefault();
							taskLib.trigerOnRemoveOption(task.id);
							
						});

					},
			contentType : "application/json; charset=utf-8" 
		});

	
	//createTask(task);
	document.getElementById('taskName').value="";
	document.getElementById('taskDuration').value="";
}

taskLib.trigerOnSelectedOption=function(taskId){
	var e=document.getElementById("option_"+taskId);
	var selectedOption=e.options[e.selectedIndex].value;
	console.log(selectedOption);
	$.ajax({
		url : 'taskAssignDb.php',
		type : "POST",
		data : JSON.stringify({taskCommand : "update",taskId : taskId,taskStatus : selectedOption}),
		success : function(data4){
			taskLib.moveTask(taskId);
		}

	});
}
taskLib.trigerOnRemoveOption=function(taskId){
	$.ajax({
		url : 'taskAssignDb.php',
		type : "POST",
		data : JSON.stringify({taskCommand : 'remove', taskId : taskId}),
		success : function(data3){
			taskLib.removeTask(taskId);
		}
	});
}

$('#formSubmit').submit(function(event){
		event.preventDefault();	
		taskLib.createNewTask();
});


$(document).ready(function(event){
	$.ajax({
		url : 'taskAssignDb.php',
		type : "POST",
		data : JSON.stringify({taskCommand : 'display'}),
		success : function(data){
			console.log(data);
			for(var i in data)
				taskLib.createTaskFromDb(data[i]);
		},
		dataType : "json",
		contentType : "application/json; charset=utf-8"
	});
});	



/* This function is call when page load first time and load all task from the database */
taskLib.createTaskFromDb=function(taskObject){
	var task={
		id : taskObject.taskId,
		name : taskObject.taskName,
		duration : taskObject.taskDuration,
		status : taskObject.status
	}
	taskLib.addTaskList(task);
	taskLib.createTask(task);
}

 /* it is creating task templete in different place depending on task status  */
taskLib.createTask=function(task){
		//var task=taskLib.getTaskById(taskId);
		console.log(task); 
		if(task.status=='new born'){
			//var taskHtml=$.extend(true,{},taskLib.newTaskTemplete);
			var taskHtml=taskLib.newTaskTemplete;
			var displayTask=taskHtml.replace(/{{taskId}}/g,task.id).replace('{{taskName}}',task.name).replace('{{taskDuration}}',task.duration).replace('{{taskStatus}}',task.status);
			console.log(displayTask); 
			document.getElementById('taskContainner').innerHTML+=displayTask;
		}
		else{
			var taskHtml=taskLib.processTaskTemplete;
			console.log(taskHtml);
			//console.log(taskLib.taskProcessingTemplete);
			var displayTask=taskHtml.replace("{{taskName}}",task.name).replace('{{taskDuration}}',task.duration).replace(/{{taskId}}/g,task.id).replace('{{taskStatus}}',task.status);
			
			switch(task.status){
		
				case "Design" :
					$('#design').on('change','#option_'+task.id,function(event){taskLib.trigerOnSelectedOption(task.id)});
					$('#design').on('click','#remove_'+task.id,function(event){
												
							//console.log(taskId);
							taskLib.trigerOnRemoveOption(task.id);
					});
					document.getElementById('design').innerHTML+=displayTask;

					break;
				case "Development" :
					$('#development').on('change','#option_'+task.id,function(event){taskLib.trigerOnSelectedOption(task.id)});
					$('#development').on('click','#remove_'+task.id,function(event){
										
					//console.log(taskId);
						taskLib.trigerOnRemoveOption(task.id);
					});
					document.getElementById('development').innerHTML+=displayTask;
					break;
				case "processing":
					$('#processing').on('change','#option_'+task.id,function(event){taskLib.trigerOnSelectedOption(task.id)});
					$('#processing').on('click','#remove_'+task.id,function(event){
												
							//console.log(taskId);
							taskLib.trigerOnRemoveOption(task.id);
					});
					document.getElementById('processing').innerHTML+=displayTask;
			}

		}
}

/* It is remove a task object from contain page */
taskLib.removeTask=function(taskId){
	var task=taskLib.getTaskById(taskId);
	console.log(task);
	//this.taskRemove(taskId);
	task.parentNode.removeChild(task);

}

/* It is for creating a task templete when task accepted for processing*/
taskLib.addTask=function(taskId){
	var taskHtml=taskLib.processTaskTemplete;
	console.log(taskId);
	var i;
	var task=taskLib.getTaskById(taskId);
	for(i=0;i<taskLib.taskList.length;i++){
		if(taskLib.taskList[i].id==taskId)
		{
			taskLib.taskList[i].status="processing";
			
			var temp=taskHtml.replace("{{taskName}}",taskLib.taskList[i].name).replace('{{taskDuration}}',taskLib.taskList[i].duration).replace(/{{taskId}}/g,taskLib.taskList[i].id).replace('{{taskStatus}}',taskLib.taskList[i].status);
			document.getElementById('taskContainner').removeChild(task);
			document.getElementById(taskLib.taskList[i].status).innerHTML+=temp;
			//taskLib.taskUpdate(taskId,taskLib.taskList[i].status);
			console.log(temp);
		}
	}
	

}

/* It is return a task object depend on taskId */
taskLib.getTaskById=function(taskId){
	return document.getElementById(taskId);
}

taskLib.moveTask=function(taskId){
	//console.log(taskId);
	var task=this.getTaskById(taskId);
	var selectedOption="";
	//console.log(this);
	var i;
	var e=document.getElementById('option_'+taskId);
	selectedOption=e.options[e.selectedIndex].value;
	//this.taskUpdate(taskId,selectedOption);
	console.log(selectedOption);
	for(i=0;i<taskLib.taskList.length;i++){
		if(taskLib.taskList[i].id==taskId)
			taskLib.taskList[i].status=selectedOption;
	}
	//$('#taskState').val('selected');
	switch(selectedOption){
		
		case "Design" :
			$('#design').on('change','#option_'+taskId,function(event){taskLib.trigerOnSelectedOption(taskId)});
			$('#design').on('click','#remove_'+task.id,function(event){
				
					//console.log(taskId);
					taskLib.trigerOnRemoveOption(task.id);
			});
			document.getElementById('design').appendChild(task);

			break;
		case "Development" :
			$('#development').on('change','#option_'+taskId,function(event){taskLib.trigerOnSelectedOption(taskId)});
			$('#design').on('click','#remove_'+task.id,function(event){
										
					//console.log(taskId);
					taskLib.trigerOnRemoveOption(task.id);
			});
			document.getElementById('development').appendChild(task);
			break;

	}
	
}

/*$('#formSubmit').submit(function(event){
	event.preventDefault();
	$.post("taskAssignDb.php",JSON.stringify({
		taskCommand : "insert",
		taskName : document.getElementById('taskName').value,
		taskDuration : document.getElementById('taskDuration').value,
		taskState : 'new born'
	}),
	function(data,Status){
		console.log(data);
	});
});*/

