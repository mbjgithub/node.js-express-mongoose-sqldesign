var mongoose=require("mongoose");
var Other_Punish_Schema=require("../schemas/otherpunish");
var Other_Punish_Model=mongoose.model("otherpunish",Other_Punish_Schema);
module.exports=Other_Punish_Model;