// var express=require("express");
// var EmployeeModel=require("../models/employee");
// var DeptModel=require("../models/dept");
// var ProfessionModel=require("../models/profession");

// var ExtraWorkKindModel=require("../models/extraworkkind");
// var ExtraWorkModel=require("../models/extrawork");

// var AttendanceKindModel=require(".../models/attendancekind");
// var AttendanceModel=require("../models/attendance");

// var OtherPunishKindModel=require("../models/otherpunishkind");
// var OtherPunishModel=require("../models/otherpunish");

// var router=express.Router();
// router.get("/",function(req,res){
// 	var dept1={dept_name:"技术部",dept_salary:"1000"};
// 	var dept2={dept_name:"产品部",dept_salary:"900"};
// 	var dept3={dept_name:"研发部",dept_salary:"1200"};
// 	var deptDocs=[dept1,dept2,dept3];
// 	var pro1={basic_profession:"web前端",basic_salary:500};
// 	var pro2={basic_profession:"web后端",basic_salary:700};
// 	var pro3={basic_profession:"web全栈",basic_salary:1000};
// 	var proDocs=[pro1,pro2,pro3];
// 	DeptModel.create(deptDocs,function(err,docs){
// 		if(err){
// 			console.log("DeptModel.create function exec failed");
// 			return;
// 		}
//         ProfessionModel.create(proDocs,function(err,docs){
//         	if(err){
// 			console.log("ProfessionModel.create function exec failed");
// 			return;
// 		}
// 		DeptModel.findOne({dept_name:"技术部"},function(err,doc){
//              var dept_name=doc._id;
//              ProfessionModel.findOne({basic_profession:"web前端"},function(err,doc){
//              	var basic_profession=doc._id;
//              	var employee=new EmployeeModel({name:"莫宝军",age:18,basic_profession:basic_profession,dept_name:dept_name});
//              	employee.save();
//              	res.render("index",{employee:employee});
//              });
             
// 		});
//        });
// 	});
// 	EmployeeModel.find({name:"莫宝军"})
// 	.populate(["basic_profession","dept_name"]).exec(function(err,docs){
// 		if(err){
// 			console.log("EmployeeModel.populate function exec failed");
// 			return;
// 		}
// 	    //console.log(docs[0].name+":"+docs[0].basic_profession.basic_profession+":"+docs[0].basic_profession.basic_salary);
// 	  res.render("index",{docs:docs}); 
// 	  //res.render("index",{docs:docs,layout:true});如果这里加了layout的话，会覆盖ejs-mate的layout函数，所以
// 	  //这里不能加layout
// 	});
// });
// router.get("/lrygxx",function(req,res){
//     res.render("lrygxx");
// });
// router.get("/cxygxx",function(req,res){
//     res.render("cxygxx");
// });
// module.exports=router;


var express=require("express");
var url=require("url");
var EmployeeModel=require("../models/employee");
var DeptModel=require("../models/dept");
var ProfessionModel=require("../models/profession");

var ExtraWorkKindModel=require("../models/extraworkkind");
var ExtraWorkModel=require("../models/extrawork");

var AttendanceKindModel=require("../models/attendancekind");
var AttendanceModel=require("../models/attendance");

var OtherPunishKindModel=require("../models/otherpunishkind");
var OtherPunishModel=require("../models/otherpunish");

var router=express.Router();
router.get("/yggl",function(req,res){
     EmployeeModel.find({}).populate(["dept_name","basic_profession"]).exec(function(err,docs){
     	if(err){
     		console.log("EmployeeModel.find({}).populate function exec error");
     		return;
     	}
     	res.render("index",{docs:docs});//查询employee的基本信息
     });
});
router.get("/lrygxx",function(req,res){
	var dept;
	var profession;
       DeptModel.find({},null,{sort:{dept_name:1}},function(err,docs){
            if(err){
     		console.log("EmployeeModel.find({}).populate function exec error");
     		return;
     	  }
         dept=docs;
         ProfessionModel.find({},null,{sort:{basic_profession:1}},function(err,docs){
            if(err){
     		console.log("EmployeeModel.find({}).populate function exec error");
     		return;
     	  }
     	  profession=docs;
     	  var lrygxxTip="";
     	  if(req.session.lrygxxTip){
              lrygxxTip=req.session.lrygxxTip;
     	  }
     	  res.render("lrygxx",{dept:dept,profession:profession,lrygxxTip:lrygxxTip});
         });
       });
});
router.post("/lrygxx",function(req,res){
	EmployeeModel.findOne({name:req.body.name},function(err,doc){
       if(doc==""||doc==null){
         //可以录入
         DeptModel.findOne({dept_name:req.body.dept_name},function(err,doc){
             var dept_name_id=doc._id;
             ProfessionModel.findOne({basic_profession:req.body.basic_profession},function(err,doc){
             	var basic_profession_id=doc._id;
             	var employee=new EmployeeModel({name:req.body.name,age:req.body.age,
             		basic_profession:basic_profession=doc._id,dept_name:dept_name_id});
             	employee.save(function(){
             		res.redirect("/yggl");
             	});
             });
         });
       }else{
       	//说明数据库的employee表中有该员工
       	req.session.lrygxxTip="数据库中存在该员工";
       	res.redirect("/lrygxx");
       }
	});
});
router.get("/cxygxx",function(req,res){
	 search(req,res);
});
router.post("/cxygxx",function(req,res){
	 search(req,res);
});
router.get("/employeeModify",function(req,res){
     var part=url.parse(req.url,true).query;
     EmployeeModel.findOne({_id:part.name}).populate(["dept_name","basic_profession"])
     .exec(function(err,doc){
         DeptModel.find({},function(err,depts){
            ProfessionModel.find({},function(err,professions){
                 res.render("employeeModify",{doc:doc,depts:depts,professions:professions});
            });
         });
     });
});
router.post("/employeeModify",function(req,res){
    DeptModel.findOne({dept_name:req.body.dept_name},function(err,dept){
               var dept_name_id=dept._id;
               ProfessionModel.findOne({basic_profession:req.body.basic_profession},function(err,profession){
                var profession_id=profession._id;
                EmployeeModel.update({_id:req.body._id},{$set:{name:req.body.name,age:req.body.age
                         ,basic_profession:profession_id,dept_name:dept_name_id}},function(err,doc){
                            res.redirect("/yggl");
                         });
               });
    });
});
router.post("/employeeDelete",function(req,res){
	var queryStr=url.parse(req.url,true).query;
	EmployeeModel.findOneAndRemove({name:queryStr.name},function(err,doc){
         if(err){
         	res.write('{"flag":false}');
         }else{
         	var em_id=doc._id;
         	OtherPunishModel.remove({op_employee:em_id},function(err,doc){
         		AttendanceModel.remove({att_employee:em_id},function(err,doc){
         			ExtraWorkModel.remove({ew_employee:em_id},function(err,doc){
         				//这样才把所有和req.body.name关联的employee都删除掉了,
                        //还有一个问题，就是前面的EmployeeModel.remove执行成功了，但是后面的代码出错了
                        //但是数据库中已经没有该employee了，那么加班，考勤，处罚这三个表就引用了一个
                        //不存在的employee了,有什么回滚操作不?
         				res.json({flag:true});
         			});
         		});
         	});
         }
	});
});
function search(req,res){
	var tip="";
if(req.body.name==""||req.body.name==null){
        	res.render("cxygxx",{query:"",tip:tip});
        }else{
        	EmployeeModel.findOne({name:req.body.name}).populate(["basic_profession","dept_name"])
        	.exec(function(err,doc){
        		if(doc==""||doc==null){
        			doc="";
        			tip="没有此员工";
        		}
               res.render("cxygxx",{query:doc,tip:tip});//完全可以使用ajax请求数据
        	});
        }
}
module.exports=router;
