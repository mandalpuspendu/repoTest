var taskModel=function(id,name,duration,status){
	this.taskId=ko.ko.observable(id);
	this.taskName=ko.observable(name);
	this.taskDuration=ko.observable(duration);
	this.taskStatus=ko.observable(status);
}