var express=require("express");
var url=require("url");
var OtherPunishKindModel=require("../models/otherpunishkind");
var OtherPunishModel=require("../models/otherpunish");
var EmployeeModel=require("../models/employee");
var router=express.Router();
router.get("/cfgl",function(req,res){
	// var op1={op_kind:"玩忽职守",op_salary:-100};
	// var op2={op_kind:"滥用职权",op_salary:-300};
 //    var docs=[op1,op2];
 //       var o1={op_employee:"5781fe43453bc3b41257c33b",op_kind:"57824c0932d5218c18ea01bb",op_times:1};//玩忽职守1次
 //       var o2={op_employee:"5781fe43453bc3b41257c33b",op_kind:"57824c0932d5218c18ea01bc",op_times:2};//滥用职权2次
 //       var docs=[o1,o2];
	// OtherPunishKModel.create(docs,function(err,docs){
	// 	if(err){
	// 		console.log("OtherPunishKModel.create function exec failed");
	// 		return;
	// 	}
	// 	res.end("success");
	// });
	OtherPunishModel.find({}).populate(["op_employee","op_kind"]).exec(function(err,docs){
		res.render("cfgl",{docs:docs});
	});
});
router.post("/otherpunishDelete",function(req,res){
      var query=url.parse(req.url,true).query;
      OtherPunishModel.findOneAndRemove({_id:query.name},function(err,doc){
      	    if(err){
      	    	res.json({flag:false});
      	    	return;
      	    }
            if(doc!=null){
            	res.json({flag:true});
            }
      });
});

router.get("/otherpunishModify",function(req,res){
  OtherPunishKindModel.find({},function(err,ops){
        var part=url.parse(req.url,true).query;
        res.render("otherpunishModify",{name:part.name,times:part.times,salary:part.salary,_id:part._id,kind:part.kind,ops:ops});//加班种类是一个select
  });
});
router.post("/otherpunishModify",function(req,res){
   OtherPunishKindModel.findOne({op_kind:req.body.op_kind},function(err,doc){
        OtherPunishModel.update({_id:req.body._id},{$set:{op_kind:doc._id,op_times:req.body.op_times}},function(err,doc){
              res.redirect("/cfgl");
        });
   });
});
router.post("/opSelectAjax",function(req,res){
      OtherPunishKindModel.findOne({op_kind:req.body.op_kind},function(err,doc){
              res.json({salary:doc.op_salary});
      });
});

router.get("/lrcfxx",function(req,res){
	var lrcfxxTip="";
	OtherPunishKindModel.find({},function(err,docs){
		if(req.session.flag){
            lrcfxxTip="没有此员工";
		}
        res.render("lrcfxx",{otherpunishkind:docs,lrcfxxTip:lrcfxxTip});
	});
});
router.post("/lrcfxx",function(req,res){
    EmployeeModel.findOne({name:req.body.name},function(err,doc){
    	if(doc==null){
    		req.session.flag=true;//表示要给客户端提示，提示员工不存在
    	    res.redirect("/lrcfxx");//这种方式就是传统的吃力不讨好的数据验证方式:验证需要重新刷新页面
    	}else{
    		var employee_id=doc._id;
    		OtherPunishKindModel.findOne({op_kind:req.body.op_kind},function(err,doc){
    			var op_id=doc._id;
    			var op=new OtherPunishModel({op_employee:employee_id,
    				op_kind:op_id,op_times:req.body.op_times});
    			op.save(function(){
    				res.redirect("/cfgl"); //返回到加班管理
    			});
    		});
    	}
    });
});

router.get("/cxcfxx",function(req,res){
     res.render("cxcfxx",{docs:"",tip:""});
});
router.post("/cxcfxx",function(req,res){
       if(req.session.employee_id){
       	  OtherPunishModel.find({op_employee:req.session.employee_id}).populate(["op_employee","op_kind"])
       	  .exec(function(err,docs){
       	  	judge(docs,res);
       	  });
       }else{
       	  EmployeeModel.findOne({name:req.body.name},function(err,doc){
             if(doc==null){
             	//这种情况是没有触发ajax，而是直接点击的浏览器的提示
             	res.render("cxcfxx",{docs:"",tip:"不存在此员工"});
             }else{
             	OtherPunishModel.find({op_employee:doc._id}).populate(["op_employee","op_kind"])
       	          .exec(function(err,docs){
       	  	      judge(docs,res);
       	        });
             }
       	  });
       }
});
function judge(docs,res){
	if(docs==null||docs==""){
       	  	      	//这种情况是存在该员工，但是没有录入该员工的任何考勤信息
                    res.render("cxcfxx",{docs:"",tip:"存在此员工,但是没有录入该员工的任何处罚信息"});
       	  	      }else{
       	  	      	res.render("cxcfxx",{docs:docs,tip:""});
       	  	      }
}
router.post("/cxcfxxAjax",function(req,res){
	console.log(100);
	//根据输入的员工姓名来查询加班情况
	EmployeeModel.findOne({name:req.body.name},function(err,doc){
       if(doc==null){
       	  //说明没有找到输入的员工
       	  res.json({flag:true});
       }else{
       	  req.session.employee_id=doc._id;//顺便保存一下查询到的员工信息
       	  res.json({flag:false});
       }
	});
});
module.exports=router;