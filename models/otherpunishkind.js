var mongoose=require("mongoose");
var Other_Punish_Kind_Schema=require("../schemas/otherpunishkind");
var Other_Punish_Kind_Model=mongoose.model("otherpunishkind",Other_Punish_Kind_Schema);
module.exports=Other_Punish_Kind_Model;