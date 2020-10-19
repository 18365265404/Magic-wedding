/********************************************************策划布置**********************************************************/


let initPamas={
	isSort:"",


	typeVideo:"",

}

let dictionlist=sessionStorage.getItem("diction_list")
dictionlist=JSON.parse(dictionlist)
console.log("字典查询",dictionlist)
$("#sort1").css({"color":"red"})



for(let i=0;i<dictionlist.length;i++){
	dictionary(dictionlist[i].dicKey,dictionlist[i].list)
}


//字典值初始化
function dictionary(val,list){
//	alert()
	switch (val){

			

		case "VIDEO_CAMERA"://摄像视频
			let layoutStr=`<span onclick="showLayout('全部','')" style="margin-right:15px;cursor: pointer;">全部</span>`
			for(let i=0;i<list.length;i++){
				layoutStr+=`
					<li onclick="showLayout('${list[i].dicDescribe}',${list[i].dicValue})" >${list[i].dicDescribe}</li>
				`
			}
			$(".scheme-title-list1").html(layoutStr)
			
			break;

		default:
			break;
	}
}

//循环遍历字典值
function dictionValue(obj,list,allVal,types){
	let str=`<span onclick="showConditionAll('${allVal}')">全部</span>`
	for(let i=0;i<list.length;i++){
		str+=`
			<i onclick="showCondition(${list[i].dicValue},${types},'${list[i].dicDescribe}')">${list[i].dicDescribe}</i>
		`
	}
	$(obj).html(str)
}



showLayout()
function sort2(num){
	if(num=="1"){
		initPamas.isSort="1"
		$("#sort1").css({"color":"red"})
		$("#sort2").css({"color":"#666666"})
		
	}else{
		$("#sort1").css({"color":"#666666"})
		$("#sort2").css({"color":"red"})
		initPamas.isSort=""
	}
	showLayout()
}
function showLayout(tag,value,page){
	$("#visualType4").html(tag)
	//初始化数据ajax
	if(value!=undefined){
		
		initPamas.typeVideo=value
	}else{
		
	}
	
	console.log("所有参数",initPamas)

	
	
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelCmaVdoList,
	dataType:"json",
	data:{
		pageNum:page || 1,
		pageSize:"12",
		type:initPamas.typeVideo,
		isSort:initPamas.isSort,

	},    //请求参数		
	success: function(data) {
		
		
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("摄影视频",data.data)
		

		let wentuList=data.data.list
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<li onclick="showDialog('${QiNiu+wentuList[i].vdoName}')">
		    	<div  data-toggle="modal" data-target="#myModal">
					<video   style="width:100%"  src="${QiNiu+wentuList[i].vdoName}"></video>
					
					<p>来源于：${wentuList[i].title}</p>
				</div>
		    		
					
				</li>
				
		    	`
		    }
		    $(".scheme-img-list").html(wentuStr)
		    
		    
		    Echo.init({

				offset: 10,
			
				throttle: 80
			
			});
        //显示分页
        laypage({
            cont: 'biuuu_city', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: data.data.pages, //通过后台拿到的总页数
            curr: page || 1, //当前页
            skip: true, //是否开启跳页
    		skin: '#AF0000',
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    showLayout("","",obj.curr);
                }
            }
        });

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	

}

//点击出现弹窗显示大图
function showDialog(urls){
$(".modal-body").html(`<video id="video1"   style="width:100%" controls="controls"  src="${urls}"></video>`)
	
}
$("#button-video").click(function(){
	
	var myVideo = document.getElementById("video1");
	if(myVideo.paused){
		myVideo.play();
	}else{
		myVideo.pause();
	}
})




//点击特效
$("#scheme-title-list1 span").click(function(){
	
	$("#scheme-title-list1 li").css({"color":"#666666"})
	
})

$("#scheme-title-list1 li").click(function(){
	
	$("#scheme-title-list1 li").css({"color":"#666666"})
	$(this).css({"color":"red"})
})

$(".cheme-list-tabs1 span").click(function(){
	$(".cheme-list-tabs1 span").css({"color":"#666666"})
	$(this).css({"color":"red"})
})