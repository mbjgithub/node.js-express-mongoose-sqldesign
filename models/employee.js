var mongoose=require("mongoose");
var Employee_Schema=require("../schemas/employee");
var Employee_Model=mongoose.model("employee",Employee_Schema);
module.exports=Employee_Model;