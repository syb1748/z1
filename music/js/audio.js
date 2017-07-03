var musicControler={
	
	server: "http://musicapi.duapp.com/api.php",
	
	play:function(music){
		
		var $state=$("#music_state");
		
		$state.html("歌曲正在加载中")
		
		$.ajax({
			type:"get",
			url:this.server+"?type=url&id="+music.id,
			async:true,
			success:function(data){
				
				$state.html("歌曲已经加载成功");
				var audio=$("#audio").get(0);//将jq对象转换为js对象
				audio.src=data.data[0].url;
				audio.play();
				$("#btn").addClass("play")
				$("#btn").click(function(){
					if($(this).hasClass("play")){
						audio.pause()
						$(this).removeClass().addClass("pause")
					}else{
						audio.play()
						$(this).removeClass().addClass("play")
					}
				})
				
			}
		});
		
		var $name=$("#music_name");
		$name.html(music.name);


		
	}
	
}

