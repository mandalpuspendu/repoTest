/*var taskModel=function(id,name,duration,status){
	var self=this;
	self.taskId=ko.observable(id);
	self.taskName=ko.observable(name);
	self.taskDuration=ko.observable(duration);
	self.taskStatus=ko.observable(status);
	self.setId=function(data){
		self.taskId=data;
	};
}*/
var taskController=function(){
	//this.taskId=ko.observable("");
	var self=this;
	self.taskName=ko.observable();
	self.taskDuration=ko.observable();
	//self.taskList=ko.observableArray([]); 
	self.taskStatus=ko.observable("new born");
	self.createTask=function(){
		console.log(this,self);

		//var task=new taskModel("null",self.taskName,self.taskDuration,self.taskStatus);
		console.log(this.taskName);

		/*if(this.taskValidation()){
			$.ajax({
				url : '../server/taskAssign.php',
				type : "POST",
				data : JSON.stringify({taskCommand:"insert",task}),
				contentType: "application/json;charset=utf-8",
				success: function(data){
					/*task.setId(data);
					self.taskList.push(task);
					console.log(data);
				}
			});
		}*/
	};

	this.taskValidation=function(){
		if(this.taskName!=""&& this.taskDuration!=""&& Number(this.taskDuration) + 0==this.taskDuration)
			return true;
		else
			return false;
	};

}
ko.applyBindings(new taskController());