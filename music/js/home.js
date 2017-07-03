

var server = "http://musicapi.duapp.com/api.php";


function getPlayList(limit,callback){
	
	if(isCache()){
		
		console.log("访问缓存")
		// 将字符串转换为json对象
		var list=JSON.parse(localStorage.list);
		callback(list);
		
	}else{
		
		$.ajax({
			type:"get",
			url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
			async:true,
			success:function(data){
				
				console.log("访问网络");

				localStorage.cacheTime=new Date().getTime();
				

				var list=JSON.stringify(data.playlists);


				localStorage.list=list;
				
				callback(data.playlists)
			}
        });
	
	}
	
	// 判断缓存是否存在
	function isCache(){
		
		// 如果缓存不存在,返回false
		if(!localStorage.list){
		   return false;
		}
		
		// 判断缓存是否过期
		if(new Date().getTime()-localStorage.cacheTime>=10*60*1000){
			return false;
		}
		
		// 否则 返回true
		return true;
		
	}
	
	
 
}


getPlayList(9,function(data){
	
	  //console.log(data)
	  
	  var $songlist=$(".songlist");
	  
	  var template=$("#templateItem").html();
	  
	  for(var i=0;i<data.length;i++){
	   	 
	   	 var $template=$(template);
	   	 $template.find("a").attr("href","#detail?id="+data[i].id)
	  	 $template.find("div").html(data[i].playCount);
	  	 $template.find("img").attr("src",data[i].coverImgUrl);
	  	 $template.find("p").html(data[i].name);
	  	 $template.appendTo($songlist);
	  	 
	  }
	
});


