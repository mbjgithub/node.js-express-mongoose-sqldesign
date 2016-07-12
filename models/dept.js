var mongoose=require("mongoose");
var Dept_Schema=require("../schemas/dept");
var Dept_Model=mongoose.model("dept",Dept_Schema);
module.exports=Dept_Model;