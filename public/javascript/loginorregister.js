$(document).ready(function(){
	console.log($("#registerForm").attr("data-flag"));
    if($("#registerForm").attr("data-flag")=="false"){
    	// $("#login").trigger("click");can trigger all the time,i do not konw why
    	login();
    }
	$("#login").on("click",login);
	$("#register").on("click",register);
	function login(){
		if($("#left").css("backgroundColor")=="rgb(15, 136, 235)"){
          $("#right").css("backgroundColor","#0F88EB");
          $("#left").css("backgroundColor","#fff");
          $("#register").css("color","#000");
          $("#login").css("color","#0F88EB");
          $("#registerForm").attr("action","/loginJudge")
          .find("input[name=username]").attr("placeholder","用户名或邮箱").end()
          .find("input[type=submit]").attr("value","登陆系统").end()
          .find("input[name=email]").remove();
      }
    }
    function register(){
    	if($("#right").css("backgroundColor")=="rgb(15, 136, 235)"){
		$("#right").css("backgroundColor","#fff");
		$("#left").css("backgroundColor","#0F88EB");
		$("#register").css("color","#0F88EB");
		$("#login").css("color","#000");
		$("#registerForm").attr("action","/login").find("input[name=username]").attr("placeholder","用户名")
		.after('<input type="text" name="email" placeholder="邮箱">').end()
		.find("input[type=submit]").attr("value","注册系统");
		}
    }
});