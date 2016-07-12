var mongoose=require("mongoose");
var Attendance_Schema=require("../schemas/attendance");
var Attendance_Model=mongoose.model("attendance",Attendance_Schema);
module.exports=Attendance_Model;