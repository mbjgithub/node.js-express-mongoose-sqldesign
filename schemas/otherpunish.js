var mongoose=require("mongoose");
var Other_Punish_Kind_Model=require("../models/otherpunishkind");
var EmployeeModel=require("../models/employee");
var Schema=mongoose.Schema;
var Other_Punish_Schema=new Schema({
	op_employee:{
		type:Schema.Types.ObjectId,
        ref:"employee"
	},
	op_kind:{
		type:Schema.Types.ObjectId,
		ref:"otherpunishkind"
	},
	op_times:{
		type:Number,
		default:0,
		min:0
	}
});
module.exports=Other_Punish_Schema;