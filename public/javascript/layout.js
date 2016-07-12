$(document).ready(function(){
     $(".imgLi img").click(function(){
           var src=$(this).attr("src");
           if(src=="css/images/plus.gif"){
               $(this).attr("src","css/images/minus.gif");
               $(this).parent().next().css("display","block");
           }else{
               $(this).attr("src","css/images/plus.gif");
               $(this).parent().next().css("display","none");
           }
     });
});