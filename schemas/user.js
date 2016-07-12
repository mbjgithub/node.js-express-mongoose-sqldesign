var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:{
    	type:String,
    	required:true
    },
    password:{
    	type:String,
    	required:true
    },
    email:{
    	type:String,
    	required:true
    },
    signupDate:{
    	type:Date,
    	default:Date.now()
    }
});
UserSchema.pre("save",function(next){
     //do something before save
     
     next();
});
//UserSchema.static. 
module.exports=UserSchema;