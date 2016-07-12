var express=require("express");
var url=require("url");
var AttendanceKindModel=require("../models/attendancekind");
var AttendanceModel=require("../models/attendance");
var EmployeeModel=require("../models/employee");
var router=express.Router();
router.get("/kqgl",function(req,res){
	// var ak1={ap_status:"出勤",ap_salary:0};
	// var ak2={ap_status:"缺勤",ap_salary:-100};
	// var ak3={ap_status:"迟到",ap_salary:-50};
	// var ak4={ap_status:"早退",ap_salary:-50};
	// var akDocs=[ak1,ak2,ak3,ak4];
	// var a1={att_employee:"5781fe43453bc3b41257c33b",att_status:"5782422bb08c02d41ffa89ee",att_times:12};出勤12次
	// var a2={att_employee:"5781fe43453bc3b41257c33b",att_status:"578243fad3f25ef81fc7d201",att_times:2};缺勤2次
	// var a3={att_employee:"5781fe43453bc3b41257c33b",att_status:"578243fad3f25ef81fc7d202",att_times:3};迟到3次
	// var a4={att_employee:"5781fe43453bc3b41257c33b",att_status:"578243fad3f25ef81fc7d203",att_times:4};早退4次
	// var docs=[a1,a2,a3,a4];
	// AttendanceModel.create(docs,function(err,docs){
	// 	if(err){
	// 		console.log("AttendanceModel.create function exec failed");
	// 		return;
	// 	}
	// 	res.end("success");
	// });
	AttendanceModel.find({}).populate(["att_status","att_employee"]).exec(function(err,docs){
		res.render("kqgl",{docs:docs});
	});
});
router.post("/attendanceDelete",function(req,res){
      var query=url.parse(req.url,true).query;
      AttendanceModel.findOneAndRemove({_id:query.name},function(err,doc){
      	    if(err){
      	    	res.json({flag:false});
      	    	return;
      	    }
            if(doc!=null){
            	res.json({flag:true});
            }
      });
});

router.get("/attendanceModify",function(req,res){
  AttendanceKindModel.find({},function(err,aps){
        var part=url.parse(req.url,true).query;
        res.render("attendanceModify",{name:part.name,times:part.times,salary:part.salary,_id:part._id,status:part.status,aps:aps});//加班种类是一个select
  });
});
router.post("/attendanceModify",function(req,res){
   AttendanceKindModel.findOne({ap_status:req.body.ap_status},function(err,doc){
        AttendanceModel.update({_id:req.body._id},{$set:{att_status:doc._id,att_times:req.body.att_times}},function(err,doc){
              res.redirect("/kqgl");
        });
   });
});
router.post("/attSelectAjax",function(req,res){
      AttendanceKindModel.findOne({ap_status:req.body.ap_status},function(err,doc){
              res.json({salary:doc.ap_salary});
      });
});

router.get("/lrkqxx",function(req,res){
	var lrkqxxTip="";
	AttendanceKindModel.find({},function(err,docs){
		if(req.session.flag){
            lrjbxxTip="没有此员工";
		}
        res.render("lrkqxx",{attendancekind:docs,lrkqxxTip:lrkqxxTip});
	});
});
router.post("/lrkqxx",function(req,res){
    EmployeeModel.findOne({name:req.body.name},function(err,doc){
    	if(doc==null){
    		req.session.flag=true;//表示要给客户端提示，提示员工不存在
    	    res.redirect("/lrkqxx");//这种方式就是传统的吃力不讨好的数据验证方式:验证需要重新刷新页面
    	}else{
    		var employee_id=doc._id;
    		AttendanceKindModel.findOne({ap_status:req.body.ap_status},function(err,doc){
    			var ap_id=doc._id;
    			var ap=new AttendanceModel({att_employee:employee_id,
    				att_status:ap_id,att_times:req.body.att_times});
    			ap.save(function(){
    				res.redirect("/kqgl"); //返回到加班管理
    			});
    		});
    	}
    });
});

router.get("/cxkqxx",function(req,res){
     res.render("cxkqxx",{docs:"",tip:""});
});
router.post("/cxkqxx",function(req,res){
       if(req.session.employee_id){
       	  AttendanceModel.find({att_employee:req.session.employee_id}).populate(["att_employee","att_status"])
       	  .exec(function(err,docs){
       	  	judge(docs,res);
       	  });
       }else{
       	  EmployeeModel.findOne({name:req.body.name},function(err,doc){
             if(doc==null){
             	//这种情况是没有触发ajax，而是直接点击的浏览器的提示
             	res.render("cxkqxx",{docs:"",tip:"不存在此员工"});
             }else{
             	AttendanceModel.find({att_employee:doc._id}).populate(["att_employee","att_status"])
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
                    res.render("cxkqxx",{docs:"",tip:"存在此员工,但是没有录入该员工的任何考勤信息"});
       	  	      }else{
       	  	      	res.render("cxkqxx",{docs:docs,tip:""});
       	  	      }
}
router.post("/cxkqxxAjax",function(req,res){
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