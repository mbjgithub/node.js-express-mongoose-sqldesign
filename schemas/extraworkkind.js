var mongoose=require("mongoose");

var Schema=mongoose.Schema;
var Extra_Work_Kind_Schema=new Schema({
	ew_kind:{                         //加班的种类，值参考加班种类表
		type:String,
		required:true
	}, 
	ew_salary:{                //加班的工资
		type:Number,
		default:0,
		min:0        
	}
});
module.exports=Extra_Work_Kind_Schema;