var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Attendance_Punish_Shcema=new Schema({
	ap_status:{       //出勤的ap.salary是0，缺勤，迟到，早退是要扣钱的，扣多少钱由下面的ap_salary决定
		type:String,
		required:true
	},
	ap_salary:{     
		type:Number,
		default:0,
		max:0        //出勤的不扣钱
	}
});
module.exports=Attendance_Punish_Shcema;