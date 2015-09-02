var nextTaskId="";
var taskList= [];
var taskTemplete="\
	<div class='well' id='{{taskId}}'>\
		<p ><span class=\"glyphicon glyphicon-remove\" id='removeButton' onclick=\"removeTask('{{taskId}}')\"></span></p> \
		<p> Task Name : {{taskName}}</p>\
		<p> Task Duration : {{taskDuration}}</p>\
		<p> Task Status : {{taskStatus}}</p>\
		<p><input type='button' value='Submit' id='taskSubmit' onclick=\"addTask(\'{{taskId}}\')\"><input type='button' value='Cancel' id='taskCancel'></p>\
	</div>"; 
var taskProcessingTemplete="\
	<div class='well' id='{{taskId}}'>\
		<p ><span class=\"glyphicon glyphicon-remove\" id='removeButton' onclick=\"removeTask('{{taskId}}')\"></span></p> \
		<p> Task Name : {{taskName}}</p>\
		<p> Task Duration : {{taskDuration}}</p>\
		<p> Task Status : {{taskStatus}}</p>\
		<p><select id='options_{{taskId}}' onchange=\"moveTask(\'{{taskId}}\')\">\
			<option value='select' >Select Option</option>\
			<option value='Design'>Design</option>\
			<option value='Development'>Development</option></select>\
		<input type='button' value='Cancel' id='taskCancel'></p>\
	</div>"; 


$(document).ready(function(){
	var xmlhttp;
			if(window.XMLHttpRequest)
				xmlhttp=new XMLHttpRequest();
			else
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					var result=JSON.parse(xmlhttp.responseText);

					for(var r in result)
						createTaskFromDb(result[r]);
				}
			}
			xmlhttp.open("POST","taskInsertDb.php",true);
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xmlhttp.send("command="+"display");
			
});

var addTaskList=function(taskObject){
	taskList.push(taskObject);
}

var createNewTask=function(){
	var task={
		id : nextTaskId,
		name : document.getElementById('taskName').value,
		duration : document.getElementById('taskDuration').value,
		status : "new born"
	};
	addTaskList(task);
	createTask(task);
	document.getElementById('taskName').value="";
	document.getElementById('taskDuration').value="";
}

var createTaskFromDb=function(taskObject){
	var task={
		id : taskObject.taskId,
		name : taskObject.taskName,
		duration : taskObject.taskDuration,
		status : taskObject.status
	}
	addTaskList(task);
	//if(task.status=='New Born')
		createTask(task);
	//else
		//addTask(task.id);
}
var createTask=function(task){
		
		console.log(task); 
		if(task.status=='new born'){
			var taskHtml=clone(taskTemplete);
			var displayTask=taskHtml.replace(/{{taskId}}/g,task.id).replace('{{taskName}}',task.name).replace('{{taskDuration}}',task.duration).replace('{{taskStatus}}',task.status);
			document.getElementById('taskContainner').innerHTML+=displayTask;
		}
		else{
			var taskHtml=clone(taskProcessingTemplete);
			var displayTask=taskHtml.replace("{{taskName}}",task.name).replace('{{taskDuration}}',task.duration).replace(/{{taskId}}/g,task.id).replace('{{taskStatus}}',task.status);
			switch(task.status){
		
				case "Design" :
					document.getElementById('design').innerHTML+=displayTask;

					break;
				case "Development" :
					document.getElementById('development').innerHTML+=displayTask;
					break;
				case "processing":
					document.getElementById('processing').innerHTML+=displayTask;
			}

		}
		





}

var removeTask=function(taskId){
	var task=getTaskById(taskId);
	taskRemove(taskId);
	task.parentNode.removeChild(task);

}

var addTask=function(taskId){
	var taskHtml=clone(taskProcessingTemplete);
	console.log(taskId);
	var i;
	var task=getTaskById(taskId);
	for(i=0;i<taskList.length;i++){
		if(taskList[i].id==taskId)
		{
			taskList[i].status="processing";
			
			var temp=taskHtml.replace("{{taskName}}",taskList[i].name).replace('{{taskDuration}}',taskList[i].duration).replace(/{{taskId}}/g,taskList[i].id).replace('{{taskStatus}}',taskList[i].status);
			document.getElementById('taskContainner').removeChild(task);
			document.getElementById(taskList[i].status).innerHTML+=temp;
			taskUpdate(taskId,taskList[i].status);
			console.log(temp);
		}
	}
}



var getTaskById=function(taskId){
	return document.getElementById(taskId);
}

var moveTask=function(taskId){
	//console.log(taskId);
	var task=getTaskById(taskId);
	var selectedOption="";
	//console.log(this);
	var i;

	
	var e=document.getElementById('options_'+taskId);
	selectedOption=e.options[e.selectedIndex].value;
	taskUpdate(taskId,selectedOption);
	console.log(selectedOption);
	//console.log(obj.options[e.selectedIndex].value);
	//console.log(selectedOption,e);
	for(i=0;i<taskList.length;i++){
		if(taskList[i].id==taskId)
			taskList[i].status=selectedOption;
	}
	//$('#taskState').val('selected');
	switch(selectedOption){
		
		case "Design" :
			document.getElementById('design').appendChild(task);

			break;
		case "Development" :
			document.getElementById('development').appendChild(task);
			break;

	}
	
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


var taskInsert=function(e){
				e.preventDefault();
	
	/* data send employeeTaskAssign.php to taskIsertDb.php using Ajax  */
				var xmlhttp;
				if(window.XMLHttpRequest)
					xmlhttp=new XMLHttpRequest();
				else
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						
						nextTaskId=xmlhttp.responseText;
						if(nextTaskId!=null)
							createNewTask();
						//console.log(xmlhttp.responseText);
					}
				}
				xmlhttp.open("POST","taskInsertDb.php",true);
				xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				xmlhttp.send("command="+"insert"+"&taskName="+document.getElementById('taskName').value+"&taskDuration="+document.getElementById('taskDuration').value+"&taskStatus="+"new born");
				//document.getElementById('taskName').value="";
				//document.getElementById('taskDuration').value="";
}

var insertEmployee=function(e){
			e.preventDefault();
			//console.log(emp);
			

	/*  data send employeeDetailsPage.php to test.php page using Ajax */
			var xmlhttp;
			if(window.XMLHttpRequest)
				xmlhttp=new XMLHttpRequest();
			else
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.open("POST","test.php",true);
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xmlhttp.send("empName="+document.getElementById('empName').value+"&empAddress="+document.getElementById('empAddress').value+"&empPhone="+document.getElementById('empPhone').value);
			document.getElementById('empName').value="";
			document.getElementById('empAddress').value="";
			document.getElementById('empPhone').value="";
}

var taskUpdate=function(taskId,status){
	//e.preventDefault();
	var xmlhttp;
	if(window.XMLHttpRequest)
		xmlhttp=new XMLHttpRequest();
	else
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.open("POST","taskInsertDb.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("command="+"update"+"&taskId="+taskId+"&taskStatus="+status);
}

var taskRemove=function(taskId){
	if(window.XMLHttpRequest)
		xmlhttp=new XMLHttpRequest();
	else
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.open("POST","taskInsertDb.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("command="+"remove"+"&taskId="+taskId);

}