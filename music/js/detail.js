
// 获取专辑对应的歌曲列表
function getPlayList(id,callback){
	
	$.ajax({
	
		type:"get",
		//url:"data/playlist.json",
		url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
		async:true,
		success:function(data){
			//console.log(data);
			callback(data.playlist)
		}
	
    });
	
}

// 获取专辑的id号码
var params=getUrlParams();

console.log("专辑id号码为:"+params.id);

getPlayList(params.id,function(data){
	
	var $musicList=$("#musicList");
	
	var li=$("#listItem").html();
	
	for(var i=0;i<data.tracks.length;i++){
		
		var music=data.tracks[i];
		var $li=$(li);
		$li.find(".music").html(music.name);
		$li.find(".artist").html(music.ar[0].name);
		if(isCollected(music.id)){
			$li.find("span").removeClass().addClass("yes")
		}else{
			$li.find("span").removeClass().addClass("no")
		}
		$li.appendTo($musicList);
		
		//this.music=music;
		
		$li.data("music",music).click(function(){
			
			musicControler.play($(this).data("music"));
			
		})
		$li.find("span").data("music",music).click(function(e){
			e.stopPropagation();
			//console.log($(this).data("music").id)
			var music=$(this).data("music")
			if(localStorage.collection){
				var list=JSON.parse(localStorage.collection)
			}else{
				localStorage.collection={};
				var list=localStorage.collection;
				list[music.id]={"name":music.name,"arist":music.ar[0].name,isCollected:true}
			}
			localStorage.collection=JSON.stringify(list)
			$(this).removeClass().addClass("yes")
		})
	}
	

	
})
function isCollected(id){
	if(localStorage.collection){
		var list=JSON.parse(localStorage.collection)
	}else{
		return false
	}

	if(list[id]&&list[id].isCollected){
		return true
	}else{
		return false
	}
}

