var nextTaskId="";
var taskList= [];
var taskTemplete="<div class='well' id='{{taskId}}'>";
	taskTemplete+="<p> Task Name : {{taskName}}</p>";
	taskTemplete+="<p> Task Duration : {{taskDuration}}</p>";
	taskTemplete+="<p> Task Status : {{taskStatus}}</p>";
	taskTemplete+="<p><input type='button' value='Submit' id='taskSubmit' onclick=\"addTask(\'{{taskId}}\')\"><input type='button' value='Cancel' id='taskCancel'></p>";
	taskTemplete+="</div>"; 
var taskProcessingTemplete="<div class='well' id='{{taskId}}'>";
	taskProcessingTemplete+='<p> Task Name : {{taskName}}</p>';
	taskProcessingTemplete+='<p> Task Duration : {{taskDuration}}</p>';
	taskProcessingTemplete+='<p> Task Status : {{taskStatus}}</p>';
	taskProcessingTemplete+="<p><select id='options_{{taskId}}' onchange=\"moveTask(\'{{taskId}}\')\">";
	taskProcessingTemplete+="<option value='select' >Select Option</option>";
	taskProcessingTemplete+="<option value='Design'>Design</option>";
	taskProcessingTemplete+="<option value='Development'>Development</option></select>";
	taskProcessingTemplete+="<input type='button' value='Cancel' id='taskCancel'></p>";
	taskProcessingTemplete+="</div>"; 
var createTask=function(){
		var task ={
			id : nextTaskId,
			name : document.getElementById('taskName').value,
			duration : document.getElementById('taskDuration').value,
			status : "New Born"
		};
		taskList.push(task);
		var taskHtml=clone(taskTemplete);
		var displayTask=taskHtml.replace(/{{taskId}}/g,task.id).replace('{{taskName}}',task.name).replace('{{taskDuration}}',task.duration).replace('{{taskStatus}}',task.status);
		console.log(displayTask);
//document.getElementById('test').innerHTML="I am Here";
		document.getElementById('taskContainner').innerHTML+=displayTask;
		var i;
		for(i=0;i<taskList.length;i++){
			console.log(taskList[i]);
		}

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
							createTask();
						//console.log(xmlhttp.responseText);
					}
				}
				xmlhttp.open("POST","taskInsertDb.php",true);
				xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				xmlhttp.send("taskName="+document.getElementById('taskName').value+"&taskDuration="+document.getElementById('taskDuration').value);
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