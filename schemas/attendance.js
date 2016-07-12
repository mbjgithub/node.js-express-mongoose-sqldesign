var mongoose=require("mongoose");
var EmployeeModel=require("../models/employee");
var Attendance_Kind_Shcema=require("../models/attendancekind");
var Schema=mongoose.Schema;
var AttendanceSchema=new Schema({
	att_employee:{   //参与考勤的员工
		type:Schema.Types.ObjectId,
		ref:"employee"
	},
	att_status:{   //出勤，缺勤，迟到，早退
		type:Schema.Types.ObjectId,
		ref:"attendancekind"
	},
    att_times:{   //出勤多少次，等
    	type:Number,
        default:0,
        min:0
    }
});
module.exports=AttendanceSchema;