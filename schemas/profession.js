var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var ProfessionSchema=new Schema({
	basic_profession:{//基本工种
		type:String,
		required:true
	},
	basic_salary:{//基本工种对应的工资
		type:Number,
		required:true
	}
});
module.exports=ProfessionSchema;