
function getUrlParams(){
	
	var params={};
	
	var url=window.location.href;
	
	var arr=url.split("?");

    if(arr.length==2){
	    var p=arr[1]; 	
	}else{
	   console.log(params)
	   return params;	
	}

	var parr=p.split("&");
	
	
	for(var i=0;i<parr.length;i++){

		var kv=parr[i].split("=");
		      
		params[kv[0]]=kv[1];

	}
	
	return params;

	
}


// 获取模块名;
function getM(){
   
   var url=window.location.href;
   
   var arr=url.split("#");
   
   if(arr.length!=2){
	   return false;     
   }
   
   var p=arr[1];
   
   p=p.split("?");  
   
   return p[0]
   
}

// 加载模块函数
function router(m,container){
	
	container=container||$("#share");
	
	// 请求模块结构
	$.ajax({
	    url:"views/"+m+".html",
		success: function(data){
			container.html(data);
		}
	})
	
	// 请求js文件
	loadJs(m);
	
}

function loadJs(m){
   $.ajax({
	   url:"js/"+m+".js",
   })	
}


$(function(){
  

   
   router("tab");
   router("audio",$("#global"))
   

	
})
