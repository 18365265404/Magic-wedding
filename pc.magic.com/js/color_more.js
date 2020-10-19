/***************************字典查询**********************************************/
//全局变量
let colorArr=[] //颜色值
let colorValArr=[] //颜色名字


let type_list=sessionStorage.getItem("type_list")
type_list=JSON.parse(type_list)
console.log("上级传递的type值对象",type_list)

//排序的颜色
if(type_list.isSort==1){
	$("#sort2").css({"color":"red"})
}
if(type_list.isSort==""){
	$("#sort1").css({"color":"red"})
}


let initPamas={
	isSort:type_list.isSort||"",
	isSort2:type_list.isSort2||"",
	isSort3:type_list.isSort3||"",
	isSort4:type_list.isSort4||"",
	caseType:type_list.caseType||"",
	weddingTheme:type_list.weddingTheme||"",
	weddingVenue:type_list.weddingVenue||"",
	weddingDepartment:type_list.weddingDepartment||"",
	typeLayout:type_list.typeLayout||"",
	typeFlower:type_list.typeFlower||"",
	typeDesign:type_list.typeDesign||"",
}

//初始化seesion



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
			dictionValue(".kind-list1",list,"1","1",type_list.caseType)
			break;
		
		case "WEDDING_THEME"://婚礼主题

			dictionValue(".kind-list2",list,"2","2",type_list.weddingTheme)
			break;
		
		case "WEDDING_VENUE"://婚礼地点
			dictionValue(".kind-list3",list,"3","3",type_list.weddingVenue)
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
function dictionValue(obj,list,allVal,types,chose){
	let str=`<span onclick="showConditionAll('${allVal}')">全部</span>`
	for(let i=0;i<list.length;i++){
		str+=`
			<i onclick="showCondition(${list[i].dicValue},${types},'${list[i].dicDescribe}')">${list[i].dicDescribe}</i>
		`
	}
	$(obj).html(str)
	
	for(let i=0;i<list.length;i++){
		if(list[i].dicValue===chose){
			
			$(obj).find("i").eq(i).css({"color":"red"})
		}
		
	}
}

/****************************************视觉展示**********************************************/


visual()
//初始化数据ajax
function visual(page){
	
	console.log("所有参数",initPamas)
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelVslDpyList,
	dataType:"json",
	data:{
		pageNum:page || 1,
		pageSize:"12",
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
		

		let wentuList=data.data.list
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
                    visual(obj.curr);
                }
            }
        });    

		

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

			visual()
			
			break;
		
		case "2":
			$("#visualType2").html("全部")
			initPamas.weddingTheme=""

			visual()
			
			break;
			
		case "3":
			$("#visualType3").html("全部")
			initPamas.weddingVenue=""
			visual()
			
			break;
			
		case "4":
			colorArr=[]
			colorValArr=[]
			initPamas.weddingDepartment=""
			visual()
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

			visual()
			$("#visualType1").html(name)
			break;
		
		case 2:
			initPamas.weddingTheme=val

			visual()
			$("#visualType2").html(name)
			
			break;
			
		case 3:
			initPamas.weddingVenue=val
			visual()
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
			visual()
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
}




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