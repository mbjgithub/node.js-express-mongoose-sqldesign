var mongoose=require("mongoose");
var Extra_Work_Kind_Model=require("../models/extraworkkind");
var Schema=mongoose.Schema;
var Extra_Work_Schema=new Schema({
	ew_kind:{                         //加班的种类，值参考加班种类表
		type:Schema.Types.ObjectId,
        ref:"extraworkkind"
	}, 
	ew_employee:{                //加班的员工
		type:Schema.Types.ObjectId,
		ref:"employee"
	},
	ew_times:{                 //加班的次数
		type:Number,
		default:0,
		min:0
	}
});
module.exports=Extra_Work_Schema;