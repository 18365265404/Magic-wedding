

/***************************轮播图**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelSwAndIxList,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("首页banner",data.data)
		
/**********************************轮播图******************************************/
		let bannerList=data.data.lunbotu
		let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		
					<div class="swiper-slide swiper-slide1" 
					style=" background: url(${QiNiu}${bannerList[i].imgName}); 
		    		background-position:center center ; background-size:100% 100%;position: relative; ">
			    		<p style="">${bannerList[i].title}</p>
			    	</div>
		    	`
		    }
		    $(".swiper-wrapper1").html(bannerStr)
		    swiperMove(bannerList)
/**********************************轮播图******************************************/	
		let wentuList=data.data.wentu.slice(0,3)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
				<li  onclick="(window.location.href='imageText_detail.html?id=${wentuList[i].id}?key=1')">
					<img class="img-animate" style="width:350px;height:218px"  src="${QiNiu+wentuList[i].imgName}"/>
					<p>${wentuList[i].title}</p>
				</li>
		    	`
		    }
		    $("#home-content").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});
	
	
/***************************婚礼婚品**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelWdgIesList,
	dataType:"json",
	data:{
		pageNum:"1",
		pageSize:"4",
		isSort:"1",
	},    //请求参数		
	success: function(data) {
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("婚礼婚品",data.data)

		let wentuList=data.data.list.slice(0,4)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
				<li onclick="(window.location.href='shop_detail.html?id=${wentuList[i].id}')">
					<img class="img-animate" src="${QiNiu+wentuList[i].imgName}"/>
					
				</li>
		    	`
		    }
		    $(".goods-list").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	
	
/*********************************展示字典**************************************/	

$.ajax({
	type:"post",    //请求方式
	url:myServer+initGetDictionaryList,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("字典",data.data)
		sessionStorage.setItem("diction_list",JSON.stringify(data.data))

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	
	
	
function swiperMove(){
	var swiper = new Swiper('.swiper-container1', {
	    spaceBetween: 30,
	    effect: 'fade',
	    pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    },
	    loop: true,//图片无限转动
		setWrapperSize :true,//自动轮播
		autoplay: {
	        delay: 30000,
	        stopOnLastSlide: false,
	        disableOnInteraction: false
	      },
	    loopAdditionalSlides: 100,
	});
	
	$('.swiper-slide').mouseenter(function(){ 
	   swiper.autoplay.start(); 
	})
	$('.swiper-slide').mouseleave(function(){ 
	   swiper.autoplay.start(); 
	})
}

