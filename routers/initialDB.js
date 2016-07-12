var express=require("express");
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
router.get("/initialDB",function(req,res){
	var dept1={dept_name:"技术部",dept_salary:"1000"};
	var dept2={dept_name:"产品部",dept_salary:"900"};
	var dept3={dept_name:"研发部",dept_salary:"1200"};
	var deptDocs=[dept1,dept2,dept3];
	var pro1={basic_profession:"web前端",basic_salary:500};
	var pro2={basic_profession:"web后端",basic_salary:700};
	var pro3={basic_profession:"web全栈",basic_salary:1000};
	var proDocs=[pro1,pro2,pro3];
	DeptModel.create(deptDocs,function(err,docs){
		if(err){
			console.log("DeptModel.create function exec failed");
			return;
		}
        ProfessionModel.create(proDocs,function(err,docs){
        	if(err){
			console.log("ProfessionModel.create function exec failed");
			return;
		}
		DeptModel.findOne({dept_name:"技术部"},function(err,doc){
             var dept_name=doc._id;
             ProfessionModel.findOne({basic_profession:"web前端"},function(err,doc){
             	var basic_profession=doc._id;
             	var employee=new EmployeeModel({name:"喵喵",age:18,basic_profession:basic_profession,dept_name:dept_name});
             	employee.save();
             	var ak1={ap_status:"出勤",ap_salary:0};
	            var ak2={ap_status:"缺勤",ap_salary:-100};
		        var ak3={ap_status:"迟到",ap_salary:-50};
		        var ak4={ap_status:"早退",ap_salary:-50};
		        var akDocs=[ak1,ak2,ak3,ak4];
		        AttendanceKindModel.create(docs,function(err,docs){
		         if(err){
			           console.log("AttendanceModel.create function exec failed");
			           return;
		             }
		            var op1={op_kind:"玩忽职守",op_salary:-100};
		            var op2={op_kind:"滥用职权",op_salary:-300};
    	            var docs=[op1,op2];
		            OtherPunishKindModel.create(docs,function(err,docs){
			            if(err){
				            console.log("OtherPunishKModel.create function exec failed");
				            return;
			            }
		                var ek1={ew_kind:"加点",ew_salary:100};
		                var ek2={ew_kind:"双休日加班",ew_salary:300};
		                var ek3={ew_kind:"节假日加班",ew_salary:600};
		                var docs=[ek1,ek2,ek3];
		                ExtraWorkKindModel.create(docs,function(err,docs){
			                if(err){
				                console.log("ExtraWorkKindModel.create function exec failed");
				                return;
			                }
			                res.end("mongodb数据库中表数据初始化成功");
		                });
		              });
	              });
             });
		  });
       });
	});
});

module.exports=router;
