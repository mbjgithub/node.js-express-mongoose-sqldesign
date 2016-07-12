var mongoose=require("mongoose");
var Attendance_Kind_Schema=require("../schemas/attendancekind");
var Attendance_Kind_Model=mongoose.model("attendancekind",Attendance_Kind_Schema);
module.exports=Attendance_Kind_Model;