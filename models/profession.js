var mongoose=require("mongoose");
var Profession_Schema=require("../schemas/profession");
var Profession_Model=mongoose.model("profession",Profession_Schema);
module.exports=Profession_Model;