var express=require("express");
var mongoose=require("./mongoose");
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var session=require("express-session");
var index=require("./routers/index");
var attendance=require("./routers/attendance");
var extrawork=require("./routers/extrawork");
var otherpunish=require("./routers/otherpunish");
var profession=require("./routers/profession");
var dept=require("./routers/dept");
var gzgl=require("./routers/gzgl");
var login=require("./routers/login");
var initialDB=require("./routers/initialDB");

var app=express();
mongoose.connectMongoDB();
// app.set("view engine","ejs");
// app.set("views",__dirname+"/views");

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'));
app.locals._layoutFile = 'layout.ejs';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(session({
	secret:"miaomiao",
	resave:false,
	saveUninitialized:false,
	cookie:{httpOnly:true}
}));
app.use("/",index);
app.use("/",attendance);
app.use("/",extrawork);
app.use("/",otherpunish);
app.use("/",profession);
app.use("/",dept);
app.use("/",gzgl);
app.use("/",login);
app.use("/",initialDB);   //这个仅仅用于初始化数据库中表的数据，当初始化成功后可删除此行代码

app.listen(1337,"127.0.0.1",function(){
	console.log("server is running in 127.0.0.1:1337");
});