var express=require("express");
var ProfessionModel=require("../models/profession");
var router=express.Router();

router.get("/gzgl",function(req,res){
    //这里，我先不提供，删除和修改工种的功能，只是简单的显示数据库中有的工种
    ProfessionModel.find({},function(err,docs){
       if(err){
        console.log("ProfessionModel.find error");
        return;
       }
       res.render("gzgl",{docs:docs});
    });
});
router.get("/tjxgz",function(req,res){
      res.render("tjxgz");
});
router.post("/tjxgzAjax",function(req,res){
      ProfessionModel.findOne({basic_profession:req.body.basic_profession},function(err,doc){
        //如果没有查询到的话doc=null
        if(doc==null||doc==""){
            //可以插入
            res.json({flag:false});
        }else{
            res.json({flag:true});//true 表示这个工种已经存在
        }
      });
});
router.post("/tjxgz",function(req,res){
    var profession=new ProfessionModel({basic_profession:req.body.basic_profession,
        basic_salary:req.body.basic_salary});
    profession.save(function(err,doc){
        res.redirect("/gzgl");
    });
});
router.get("/cxgzxx",function(req,res){
    var doc="";
    var tip="";
    res.render("cxgzxx",{doc:doc,tip:tip});
});
router.post("/cxgzxx",function(req,res){
    ProfessionModel.findOne({basic_profession:req.body.basic_profession},function(err,doc){
        var tip="";
       if(doc==null){
          doc="";
          tip="没有此工种";
       }
       res.render("cxgzxx",{doc:doc,tip:tip});
    });
});
module.exports=router;