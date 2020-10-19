//上级传递过来的参数
	var getHref = window.location.href;
	let getId=getHref.split("?")[1].split("=")[1];

	$.ajax({
	type:"post",    //请求方式
	url:myServer+detailsSelWdgDinDts,
	dataType:"json",
	data:{
		pageNum: 1,
		pageSize:"99",
		wdgDinId:getId

	},    //请求参数		
	success: function(data) {

		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("策划布局详情",data.data)
		let wentuList=data.data.list
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<img class="lazy" src="../img/blank.gif" data-echo="${QiNiu+wentuList[i].imgName}">
				
		    	`
		    }
		$(".scheme-img-list").html(wentuStr)
		

		$(".content").html(wentuStr)
		Echo.init({

			offset: 10,
		
			throttle: 80
		
		});
		

	},
	error: function() {
		//请求出错处理
		}
	});	