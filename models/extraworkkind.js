var mongoose=require("mongoose");
var Extra_Work_Kind_Schema=require("../schemas/extraworkkind");
var Extra_Work_Kind_Model=mongoose.model("extraworkkind",Extra_Work_Kind_Schema);
module.exports=Extra_Work_Kind_Model;