var express=require("express");
var url=require("url");
var ExtraWorkKindModel=require("../models/extraworkkind");
var ExtraWorkModel=require("../models/extrawork");
var EmployeeModel=require("../models/employee");
var router=express.Router();
router.get("/jbgl",function(req,res){
	// var ek1={ew_kind:"加点",ew_salary:100};
	// var ek2={ew_kind:"双休日加班",ew_salary:300};
	// var ek3={ew_kind:"节假日加班",ew_salary:600};

	// var ek1={ew_kind:"578248d83a3bc5a418f2a3be",ew_employee:"5781fe43453bc3b41257c33b",ew_times:3};//加班3次
 //    var ek2={ew_kind:"578248d83a3bc5a418f2a3bf",ew_employee:"5781fe43453bc3b41257c33b",ew_times:2};//双休日加班2次
 //    var ek3={ew_kind:"578248d83a3bc5a418f2a3c0",ew_employee:"5781fe43453bc3b41257c33b",ew_times:1};//节假日加班1次
	// var docs=[ek1,ek2,ek3];
	// ExtraWorkKindModel.create(docs,function(err,docs){
	// 	if(err){
	// 		console.log("ExtraWorkKindModel.create function exec failed");
	// 		return;
	// 	}
	// 	res.end("success");
	// });
	ExtraWorkModel.find({}).populate(["ew_kind","ew_employee"]).exec(function(err,docs){
		res.render("jbgl",{docs:docs});
	});
});
router.get("/extraworkModify",function(req,res){
  ExtraWorkKindModel.find({},function(err,ewks){
        var part=url.parse(req.url,true).query;
        res.render("extraworkModify",{name:part.name,kind:part.kind,times:part.times,salary:part.salary,_id:part._id,ewks:ewks});//加班种类是一个select
  });
});
router.post("/extraworkModify",function(req,res){
   ExtraWorkKindModel.findOne({ew_kind:req.body.ew_kind},function(err,doc){
        ExtraWorkModel.update({_id:req.body._id},{$set:{ew_kind:doc._id,ew_times:req.body.ew_times}},function(err,doc){
              res.redirect("/jbgl");
        });
   });
});
router.post("/extraworkDelete",function(req,res){
      var query=url.parse(req.url,true).query;
      ExtraWorkModel.findOneAndRemove({_id:query.name},function(err,doc){
      	    if(err){
      	    	res.json({flag:false});
      	    	return;
      	    }
            if(doc!=null){
            	res.json({flag:true});
            }
      });
});
router.post("/ewSelectAjax",function(req,res){
      ExtraWorkKindModel.findOne({ew_kind:req.body.ew_kind},function(err,doc){
              res.json({salary:doc.ew_salary});
      });
});
router.get("/lrjbxx",function(req,res){
	var lrjbxxTip="";
	ExtraWorkKindModel.find({},function(err,docs){
		if(req.session.flag){
            lrjbxxTip="没有此员工";
		}
        res.render("lrjbxx",{extraworkkind:docs,lrjbxxTip:lrjbxxTip});
	});
});
router.post("/lrjbxx",function(req,res){
    EmployeeModel.findOne({name:req.body.name},function(err,doc){
    	if(doc==null){
    		req.session.flag=true;//表示要给客户端提示，提示员工不存在
    	    res.redirect("/lrjbxx");//这种方式就是传统的吃力不讨好的数据验证方式:验证需要重新刷新页面
    	}else{
    		var employee_id=doc._id;
    		ExtraWorkKindModel.findOne({ew_kind:req.body.ew_kind},function(err,doc){
    			var ew_id=doc._id;
    			var ew=new ExtraWorkModel({ew_employee:employee_id,
    				ew_kind:ew_id,ew_times:req.body.ew_times});
    			ew.save(function(){
    				res.redirect("/jbgl"); //返回到加班管理
    			});
    		});
    	}
    });
});

router.get("/cxjbxx",function(req,res){
     res.render("cxjbxx",{docs:"",tip:""});
});
router.post("/cxjbxx",function(req,res){
       if(req.session.employee_id){
       	  ExtraWorkModel.find({ew_employee:req.session.employee_id}).populate(["ew_employee","ew_kind"])
       	  .exec(function(err,docs){
       	  	 judge(docs,res);
       	  });
       }else{
       	  EmployeeModel.findOne({name:req.body.name},function(err,doc){
             if(doc==null){
             	//这种情况是没有触发ajax，而是直接点击的浏览器的提示
             	res.render("cxjbxx",{docs:"",tip:"不存在此员工"});
             }else{
             	ExtraWorkModel.find({ew_employee:doc._id}).populate(["ew_employee","ew_kind"])
       	          .exec(function(err,docs){
       	          	judge(docs,res);
       	        });
             }
       	  });
       }
});
function judge(docs,res){
   if(docs==null||docs==""){
                     res.render("cxjbxx",{docs:"",tip:"存在此员工,但是没有录入该员工的任何加班信息"});
       	  	      }else{
       	  	      	res.render("cxjbxx",{docs:docs,tip:""});
       	  	      }
}
router.post("/cxjbxxAjax",function(req,res){
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