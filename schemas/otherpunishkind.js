var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Other_Pubnish_Kind_Schema=new Schema({
	op_kind:{
		type:String,
		required:true
	},
	op_salary:{
		type:Number,
		default:0,
		max:0          //惩罚的工资是负数
	}
});
module.exports=Other_Pubnish_Kind_Schema;