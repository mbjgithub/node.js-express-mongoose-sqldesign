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
//查询全部是非常耗时的操作，这里也不提供了
// router.get("/salary",function(req,res){ 
//     var obj=[];
//   EmployeeModel.find({}).populate(["basic_profession","dept_name"]).exec(function(err,docs){
//        for(var j=0;j<docs.length;j++){
//              var all={};
//          all.doc=docs[j];
//          ExtraWorkModel.find({ew_employee:all.doc._id}).populate("ew_kind")
//          .exec(function(err,ew){
//             all.ew=ew;
//             OtherPunishModel.find({op_employee:all.doc._id}).populate("op_kind")
//          .exec(function(err,op){
//             all.op=op;
//             AttendanceModel.find({att_employee:all.doc._id}).populate("att_status")
//          .exec(function(err,att){
//             all.att=att;
//             var ewWage=0;      //加班总工资
//             var ewStr="";
//             for(var i=0;i<all.ew.length;i++){
//                ewWage+=all.ew[i].ew_kind.ew_salary*all.ew[i].ew_times;
//                ewStr+=all.ew[i].ew_kind.ew_kind+":"+all.ew[i].ew_times+"次\n";
//             }
//             // all.ew.forEach(function(sig){
//             //     ewWage+=sig.ew_kind.ew_salary*sig.ew_times;
//             // });
//             var opWage=0;
//             var opStr="";
//              for(i=0;i<all.op.length;i++){
//                opWage+=all.op[i].op_kind.op_salary*all.op[i].op_times;
//                opStr+=all.op[i].op_kind.op_kind+":"+all.op[i].op_times+"次\n";
//             }
//             // all.op.forEach(function(sig){
//             //     opWage+=sig.op_kind.op_salary*sig.op_times;
//             // });
//             var attWage=0;
//             var attStr="";
//             for(i=0;i<all.att.length;i++){
//                attWage+=all.att[i].att_status.ap_salary*all.att[i].att_times;
//                attStr+=all.att[i].att_status.ap_status+":"+all.att[i].att_times+"次\n";
//             }
//             // all.att.forEach(function(sig){
//             //     attWage+=sig.att_status.ap_salary*sig.att_times;
//             // });
//             var totalWage=all.doc.basic_profession.basic_salary+all.doc.dept_name.dept_salary+ewWage+opWage+attWage;
//             all.totalWage=totalWage;
//             all.attStr=attStr;
//             all.ewStr=ewStr;
//             all.opStr=opStr;
//             obj.push(all);
//             if(j==docs.length-1){
//               res.render("salary",{obj:obj});
//             }
//            });
//           });
//          });
//       }
      
// });
// });
router.post("/salaryAjax",function(req,res){
     EmployeeModel.findOne({name:req.body.name},function(err,doc){
         if(doc==null||doc==""){
            res.json({flag:true});
         }else{
            res.json({flag:false});
         }
     });
});
router.get("/salarydetail",function(req,res){
     res.render("salarydetail",{tip:"",all:""});
});
router.post("/salarydetail",function(req,res){
   EmployeeModel.findOne({name:req.body.name}).populate(["basic_profession","dept_name"])
   .exec(function(err,doc){
         if(doc==""||doc==null){
           res.render("salarydetail",{tip:"此员工不存在",all:""});
           return;
         }
         query(doc,res);
   });
});
function query(doc,res){
         var all={};
         all.doc=doc;
         ExtraWorkModel.find({ew_employee:doc._id}).populate("ew_kind")
         .exec(function(err,ew){
            all.ew=ew;
            OtherPunishModel.find({op_employee:doc._id}).populate("op_kind")
         .exec(function(err,op){
            all.op=op;
            AttendanceModel.find({att_employee:doc._id}).populate("att_status")
         .exec(function(err,att){
            all.att=att;
            var ewWage=0;      //加班总工资
            var ewStr="";
            for(var i=0;i<all.ew.length;i++){
               ewWage+=all.ew[i].ew_kind.ew_salary*all.ew[i].ew_times;
               ewStr+=all.ew[i].ew_kind.ew_kind+":"+all.ew[i].ew_times+"次\n";
            }
            // all.ew.forEach(function(sig){
            //     ewWage+=sig.ew_kind.ew_salary*sig.ew_times;
            // });
            var opWage=0;
            var opStr="";
             for(i=0;i<all.op.length;i++){
               opWage+=all.op[i].op_kind.op_salary*all.op[i].op_times;
               opStr+=all.op[i].op_kind.op_kind+":"+all.op[i].op_times+"次\n";
            }
            // all.op.forEach(function(sig){
            //     opWage+=sig.op_kind.op_salary*sig.op_times;
            // });
            var attWage=0;
            var attStr="";
            for(i=0;i<all.att.length;i++){
               attWage+=all.att[i].att_status.ap_salary*all.att[i].att_times;
               attStr+=all.att[i].att_status.ap_status+":"+all.att[i].att_times+"次\n";
            }
            // all.att.forEach(function(sig){
            //     attWage+=sig.att_status.ap_salary*sig.att_times;
            // });
            var totalWage=all.doc.basic_profession.basic_salary+all.doc.dept_name.dept_salary+ewWage+opWage+attWage;
            all.totalWage=totalWage;
            all.attStr=attStr;
            all.ewStr=ewStr;
            all.opStr=opStr;
           res.render("salarydetail",{tip:"",all:all});
           });
          });
         });
}
module.exports=router;