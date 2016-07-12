//connect to mongodb using mongoose rather than mongodb
var mongoose=require("mongoose");
function connectMongoDB(){
   mongoose.connect("mongodb://127.0.0.1:27017/SQLDESIGN");
   var connect=mongoose.connection;
   connect.on("error",function(err){
    console.log("connect to mongoDB error");
   });
   connect.on("open",function(){
    console.log("connect to mongoDB success");
   });
}
exports.connectMongoDB=connectMongoDB;