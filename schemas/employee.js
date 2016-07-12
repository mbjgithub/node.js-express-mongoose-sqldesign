var mongoose=require("mongoose");
var ProfessionModel=require("../models/profession");
var DeptModel=require("../models/dept");

var Schema=mongoose.Schema;
var EmployeeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    age:Number,
    basic_profession:{
        type:Schema.Types.ObjectId,
        ref:"profession"
        //参考的外键，profession是工种表的表名
    },
    dept_name:{
        type:Schema.Types.ObjectId,
        ref:"dept"
    }
});
module.exports=EmployeeSchema;