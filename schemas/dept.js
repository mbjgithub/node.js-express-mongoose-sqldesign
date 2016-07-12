var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var DeptSchema=new Schema({
	dept_name:{//部门名称
		type:String,
		required:true
	},
	dept_salary:{//津贴部门
		type:Number,
		required:true
	},
	dept_leader:String  //部门领导
});
module.exports=DeptSchema;