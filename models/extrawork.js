var mongoose=require("mongoose");
var Extra_Work_Schema=require("../schemas/extrawork");
var Extra_Work_Model=mongoose.model("extrawork",Extra_Work_Schema);
module.exports=Extra_Work_Model;