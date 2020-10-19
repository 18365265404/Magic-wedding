/********************************************************婚礼花艺**********************************************************/
let type_list=sessionStorage.getItem("type_list")
type_list=JSON.parse(type_list)
console.log("上级传递的type值对象",type_list)

//排序的颜色
if(type_list.isSort3==1){
	$("#sort2").css({"color":"red"})
}
if(type_list.isSort3==""){
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
			
			for(let i=0;i<list.length;i++){
				if(list[i].dicValue===type_list.typeFlower){
					
					$(".scheme-title-list2").find("li").eq(i).css({"color":"red"})
				}
				
			}
			
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


showFlower()
function sort3(num){
	
	if(num=="1"){
		initPamas.isSort3="1"
		$("#sort2").css({"color":"red"})
		$("#sort1").css({"color":"#666666"})
		
	}else{
		initPamas.isSort3=""
		$("#sort1").css({"color":"red"})
		$("#sort2").css({"color":"#666666"})
	}
	showFlower()
}
function showFlower(tag,value,page){
$("#visualType5").html(tag)
	//初始化数据ajax
	if(value!=undefined){
		
		initPamas.typeFlower=value
	}else{
		
	}
	
	console.log("所有参数",initPamas)
	
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelWdgFwsList,
	dataType:"json",
	data:{
		pageNum:page || 1,
		pageSize:"12",
		type:initPamas.typeFlower,
		isSort:initPamas.isSort3,

	},    //请求参数		
	success: function(data) {

		
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("婚礼花艺",data.data)
		

		let wentuList=data.data.list
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
		    	<li onclick="(window.location.href='flower_detail.html?id=${wentuList[i].id}')">
					<img class="lazy" src="../img/blank.gif" data-echo="${QiNiu+wentuList[i].imgName}">
					
					<p>来源于：${wentuList[i].title}</p>
				</li>
				
		    	`
		    }
		    $(".flower-list").html(wentuStr)
		    
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
                    showFlower("","",obj.curr);
                }
            }
        });    

		

	},
	error: function() {
		//请求出错处理
		}
	});	
	

}


//js点击效果
$("#scheme-title-list2 span").click(function(){
	$("#scheme-title-list2 li").css({"color":"#666666"})

})

$("#scheme-title-list2 li").click(function(){
	$("#scheme-title-list2 li").css({"color":"#666666"})
	$(this).css({"color":"red"})
})