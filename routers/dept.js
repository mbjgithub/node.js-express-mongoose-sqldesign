var express=require("express");
var DeptModel=require("../models/dept");
var router=express.Router();

router.get("/bmgl",function(req,res){
    //这里，我先不提供，删除和修改工种的功能，只是简单的显示数据库中有的工种
    DeptModel.find({},function(err,docs){
       if(err){
        console.log("DeptModel.find error");
        return;
       }
       res.render("bmgl",{docs:docs});
    });
});
router.get("/tjxbm",function(req,res){
      res.render("tjxbm");
});
router.post("/tjxbmAjax",function(req,res){
      DeptModel.findOne({dept_name:req.body.dept_name},function(err,doc){
        //如果没有查询到的话doc=null
        if(doc==null||doc==""){
            //可以插入
            res.json({flag:false});
        }else{
            res.json({flag:true});//true 表示这个部门已经存在
        }
      });
});
router.post("/tjxbm",function(req,res){
    var dept=new DeptModel({dept_name:req.body.dept_name,
        dept_salary:req.body.dept_salary,dept_leader:req.body.dept_leader});
    dept.save(function(err,doc){
        res.redirect("/bmgl");
    });
});
router.get("/cxbmxx",function(req,res){
    var doc="";
    var tip="";
    res.render("cxbmxx",{doc:doc,tip:tip});
});
router.post("/cxbmxx",function(req,res){
    DeptModel.findOne({dept_name:req.body.dept_name},function(err,doc){
        var tip="";
       if(doc==null){
          doc="";
          tip="没有此部门";
       }
       res.render("cxbmxx",{doc:doc,tip:tip});
    });
});
module.exports=router;