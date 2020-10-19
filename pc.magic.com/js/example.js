/***************************字典查询**********************************************/
//全局变量
let colorArr=[] //颜色值
let colorValArr=[] //颜色名字



let initPamas={
	isSort:"",
	isSort2:"",
	isSort3:"",
	isSort4:"",
	caseType:"",
	weddingTheme:"",
	weddingVenue:"",
	weddingDepartment:"",
	typeLayout:"",
	typeFlower:"",
	typeDesign:"",
}
//初始化seesion的数据

sessionStorage.setItem("type_list",JSON.stringify(initPamas))
let dictionlist=sessionStorage.getItem("diction_list")
dictionlist=JSON.parse(dictionlist)
console.log("字典查询",dictionlist)




for(let i=0;i<dictionlist.length;i++){
	dictionary(dictionlist[i].dicKey,dictionlist[i].list)
}


//字典值初始化
function dictionary(val,list){
//	alert()
	switch (val){
		case "CASE_TYPE"://婚礼类型
			
//			let caseStr=`<span onclick="showCondition('1')">全部</span>`
			dictionValue(".kind-list1",list,"1","1")
			break;
		
		case "WEDDING_THEME"://婚礼主题

			dictionValue(".kind-list2",list,"2","2")
			break;
		
		case "WEDDING_VENUE"://婚礼地点
			dictionValue(".kind-list3",list,"3","3")
			break;
			
		case "WEDDIND_COLOR"://婚礼色系
			let colorStr=`<span onclick="showConditionAll('4')">全部</span>`
			for(let i=0;i<list.length;i++){
				colorStr+=`
					<i  onclick="showCondition(${list[i].dicValue},4 ,'${list[i].dicDescribe}')" style="background: ${list[i].dicDescribe};"></i>
				`
			}
			$(".kind-list4").html(colorStr)
			
			break;
			
		case "PLANNING_LAYOUT"://策划布置
			
//			alert()
			let layoutStr=`<span onclick="showLayout('全部','')" style="margin-right:15px;cursor: pointer;">全部</span>`
			for(let i=0;i<list.length;i++){
				layoutStr+=`
					<li onclick="showLayout('${list[i].dicDescribe}',${list[i].dicValue})" >${list[i].dicDescribe}</li>
				`
			}
			$(".scheme-title-list1").html(layoutStr)
			
			break;	
			
		case "WEDDING_FlOWER"://婚礼花艺
		
			let flowerStr=`<span onclick="showFlower('全部','')" style="margin-right:15px;cursor: pointer;">全部</span>`
			for(let i=0;i<list.length;i++){
				flowerStr+=`
					<li onclick="showFlower('${list[i].dicDescribe}',${list[i].dicValue})" >${list[i].dicDescribe}</li>
				`
			}
			$(".scheme-title-list2").html(flowerStr)
			break;
			
		case "WEDDING_DESIGN"://婚礼设计
		
			let designStr=`<span onclick="showDesign('all','')" style="margin-right:15px;cursor: pointer;">全部</span>`
			for(let i=0;i<list.length;i++){
				designStr+=`
					<li onclick="showDesign('single',${list[i].dicValue})" >${list[i].dicDescribe}</li>
				`
			}
			$(".scheme-title-list3").html(designStr)
			break;
			
		case "WEDDING_CAMERA"://摄像视频
			break;
		
		case "GRAPHIC_TYPE"://文图类型
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

/****************************************视觉展示**********************************************/



visual()
//初始化数据ajax
function visual(){
	
	console.log("所有参数",initPamas)
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelVslDpyList,
	dataType:"json",
	data:{
		pageNum:"1",
		pageSize:"3",
		isSort:initPamas.isSort,
		caseType:""||initPamas.caseType,
		weddingTheme:""||initPamas.weddingTheme,
		weddingVenue:""||initPamas.weddingVenue,
		weddingDepartment:""||initPamas.weddingDepartment
	},    //请求参数		
	success: function(data) {
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("视觉展示",data.data)
		

		let wentuList=data.data.list.slice(0,3)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<li onclick="(window.location.href='color_detail.html?id=${wentuList[i].id}')">
				
					<div class="img-box">
						<img src="${QiNiu+wentuList[i].imgName}"/>
					</div>
					
					<p>${wentuList[i].title}</p>
				</li>
		    	`
		    }
		    $(".condition-content").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	
}






//点击全部
function showConditionAll(tag){

	if(tag=="1" || tag=="2" || tag=="3" || tag=="4" ){
		$(".kind-list"+tag).find("i").css({
		"color":"#666666"
		})
	}
	
		switch (tag){
		case "1":
			$("#visualType1").html("全部")
			initPamas.caseType=""

			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			break;
		
		case "2":
			$("#visualType2").html("全部")
			initPamas.weddingTheme=""

			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			break;
			
		case "3":
			$("#visualType3").html("全部")
			initPamas.weddingVenue=""
			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			break;
			
		case "4":
			colorArr=[]
			colorValArr=[]
			initPamas.weddingDepartment=""
			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			$(".get-color-list").html("全部")
			break;	
		default:
			break;
	}
}	

function initChoose(colorList){
	let colorStr=""
	for(let i=0;i<colorList.length;i++){
		colorStr+=`
				<li style="background:${colorList[i]}"></li>
		`
	}
	$(".get-color-list").html(colorStr)
}
//点击单个
function showCondition(val,types,name){

	
	switch (types){
		case 1:

			initPamas.caseType=val

			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			$("#visualType1").html(name)
			break;
		
		case 2:
			initPamas.weddingTheme=val

			visual(initPamas)
			
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			$("#visualType2").html(name)
			
			break;
			
		case 3:
			initPamas.weddingVenue=val
			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			$("#visualType3").html(name)
			break;
			
		case 4:
			colorArr.push(val)
			colorValArr.push(name)
			
			colorArr=unique(colorArr)
			colorValArr=unique(colorValArr)
			let colorStr=''
            for(let i=0;i<colorArr.length;i++){
                colorStr+=colorArr[i]+","
            }
            colorStr = colorStr.substr(0, colorStr.length - 1);
            
			console.log("去重数据",colorStr)
			
			initPamas.weddingDepartment=colorStr
			visual(initPamas)
			sessionStorage.setItem("type_list",JSON.stringify(initPamas))
			//遍历颜色
			initChoose(colorValArr)
			break;	
		default:
			break;
	}
}

		function unique(arr){
			var x = new Set(arr);
			return [...x];
		}
		
$(".condition-title-l i").click(function(){
	$(".condition-title-l i").css({"color":"#666666"})
	$(this).css({"color":"red"})
	
})

function sort(num){
	if(num=="1"){
		initPamas.isSort="1"
	}else{
		initPamas.isSort=""
	}
	visual()
	sessionStorage.setItem("type_list",JSON.stringify(initPamas))
}

/********************************************************策划布置**********************************************************/
//
showLayout()
function sort2(num){
	if(num=="1"){
		initPamas.isSort2="1"
		
	}else{
		initPamas.isSort2=""
	}
	showLayout()
}
function showLayout(tag,value){
	
	$("#visualType4").html(tag)
	//初始化数据ajax
	if(value!=undefined){
		
		initPamas.typeLayout=value
	}else{
		
	}
	
	console.log("所有参数",initPamas)
	sessionStorage.setItem("type_list",JSON.stringify(initPamas))
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelPngLotList,
	dataType:"json",
	data:{
		pageNum:"1",
		pageSize:"3",
		type:initPamas.typeLayout,
		isSort:initPamas.isSort2,

	},    //请求参数		
	success: function(data) {
		console.log("视觉展示",data.data)
		
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("策划布置",data.data)
		

		let wentuList=data.data.list.slice(0,3)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<li onclick="(window.location.href='scheme_detail.html?id=${wentuList[i].id}')">
					<img class="img-animate2" src="${QiNiu+wentuList[i].imgName}"/>
					
					<p>来源于：${wentuList[i].title}</p>
				</li>
				
		    	`
		    }
		    $(".scheme-img-list").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	

}


/********************************************************婚礼花艺**********************************************************/
//
showFlower()
function sort3(num){
	
	if(num=="1"){
		initPamas.isSort3="1"
		
	}else{
		initPamas.isSort3=""
	}
	showFlower()
}
function showFlower(tag,value){

$("#visualType5").html(tag)
	//初始化数据ajax
	if(value!=undefined){
		
		initPamas.typeFlower=value
	}else{
		
	}
	
	console.log("所有参数",initPamas.isSort3)
	sessionStorage.setItem("type_list",JSON.stringify(initPamas))
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelWdgFwsList,
	dataType:"json",
	data:{
		pageNum:"1",
		pageSize:"3",
		type:initPamas.typeFlower,
		isSort:initPamas.isSort3,

	},    //请求参数		
	success: function(data) {

		
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("婚礼花艺",data.data)
		

		let wentuList=data.data.list.slice(0,3)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<li onclick="(window.location.href='flower_detail.html?id=${wentuList[i].id}')">
					<img class="img-animate2" src="${QiNiu+wentuList[i].imgName}"/>
					
					<p>来源于：${wentuList[i].title}</p>
				</li>
				
		    	`
		    }
		    $(".flower-list").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	

}


/********************************************************婚礼设计**********************************************************/
//
showDesign()
//function sort3(num){
//	if(num=="1"){
//		initPamas.isSort3="1"
//		
//	}else{
//		initPamas.isSort3=""
//	}
//	showDesign()
//}
function showDesign(tag,value){
	
	//初始化数据ajax
	if(value!=undefined){
		
		initPamas.typeDesign=value
	}else{
		
	}
	
	console.log("所有参数",initPamas)
	sessionStorage.setItem("type_list",JSON.stringify(initPamas))
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelWdgDinList,
	dataType:"json",
	data:{
		pageNum:"1",
		pageSize:"1",
		type:initPamas.typeDesign,
		isSort:"",

	},    //请求参数		
	success: function(data) {

		
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("婚礼设计",data.data)
		

		let wentuList=data.data.list.slice(0,3)
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`

					<img onclick="(window.location.href='design_detail.html?id=${wentuList[i].id}')" class="img-animate2" src="${QiNiu+wentuList[i].imgName}"/>

		    	`
		    }
		    $(".design").html(wentuStr)

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	

}


//点击特效
//js效果设置
$(".kind-list1").find("i").click(function(){
	$(".kind-list1").find("i").css({
		"color":"#666666"
	})
	$(".kind-list1").find("i").eq(0).css({
		"color":"#666666"
	})
	$(this).css({
		"color":"red"
	})
})
$(".kind-list2").find("i").click(function(){
	$(".kind-list2").find("i").css({
		"color":"#666666"
	})
	$(this).css({
		"color":"red"
	})
})
$(".kind-list3").find("i").click(function(){
	$(".kind-list3").find("i").css({
		"color":"#666666"
	})
	$(this).css({
		"color":"red"
	})
})
$(".kind-list4").find("i").click(function(){
	$(".kind-list4").find("i").css({
		"color":"#666666"
	})
	$(this).css({
		"color":"red"
	})
})
//点击全部
$("#scheme-title-list1 span").click(function(){
	
	$("#scheme-title-list1 li").css({"color":"#666666"})
	
})

$("#scheme-title-list2 span").click(function(){
	$("#scheme-title-list2 li").css({"color":"#666666"})

})

$("#scheme-title-list3 span").click(function(){
	$("#scheme-title-list3 li").css({"color":"#666666"})

})

//点击单个

$("#scheme-title-list1 li").click(function(){
	
	$("#scheme-title-list1 li").css({"color":"#666666"})
	$(this).css({"color":"red"})
})

$("#scheme-title-list2 li").click(function(){
	$("#scheme-title-list2 li").css({"color":"#666666"})
	$(this).css({"color":"red"})
})

$("#scheme-title-list3 li").click(function(){
	$("#scheme-title-list3 li").css({"color":"#666666"})
	$(this).css({"color":"red"})
})

$(".cheme-list-tabs1 span").click(function(){
	$(".cheme-list-tabs1 span").css({"color":"#666666"})
	$(this).css({"color":"red"})
})
$(".cheme-list-tabs2 span").click(function(){
	$(".cheme-list-tabs2 span").css({"color":"#666666"})
	$(this).css({"color":"red"})
})


$(".cheme-list-tabs1 span").click(function(){
	$(".cheme-list-tabs1 span").css({"color":"#666666"})
	$(this).css({"color":"red"})
})