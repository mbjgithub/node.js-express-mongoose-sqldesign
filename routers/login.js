var express=require("express");
var UserModel=require("../models/user");
var router=express.Router();

// router.get("/home",function(req,res){
// 	var user="";
// 	if(req.session.username){
// 		UserModel.findOne({username:req.session.username},function(err,doc){
//             if(err){
//             	console.log("UserModel.findOne() error"+err.msg);
//             }else{
//                user=doc;
//                res.render("index",{
//                	doc:user
//                });
//             }
// 		});
// 	}else{
// 		res.render("index",{
// 			doc:user
// 		});
// 	}
// });

router.get("/",function(req,res){
     res.render("loginorregister",{flag:true});//flag==true means register page,or login page
     console.log(1);
});

router.post("/login",function(req,res){
     var username=req.body.username;
     var email=req.body.email;
     var password=req.body.password;
     var user=new UserModel({username:username,password:password,email:email});
     user.save(function(err){
     	console.log("save "+username+" success");
        res.render("loginorregister",{flag:false});
     });
});

router.post("/loginJudge",function(req,res){
     var username=req.body.username;
     var password=req.body.password;
     UserModel.findOne({username:username,password:password},function(err,doc){
         if(err){
         	console.log("query mongodb error");
         	return;
         }else{
         	if(doc){
         		req.session.username=username;
         		res.redirect("/yggl");
         	}else{
         		// res.render("/loginorregister",{loginMsg:false});I have a good idea to validate login,
         		// when user input his username,ajax validate whether the username is exit,if correct,then the
         		// same way to validate password,if incorrect then response some message to ajax.
         		// here,i do not give any tip msg
         		res.render("loginorregister",{flag:false});
         	}
         }
     });
});

module.exports=router;