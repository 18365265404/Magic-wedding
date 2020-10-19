//上级传递过来的参数
	let arrList=""
	
	var getHref = window.location.href;
	
	let getId=getHref.split("?")[1].split("=")[1];
	let keys=getHref.split("?")[2].split("=")[1];
	
	$.ajax({
	type:"post",    //请求方式
	url:myServer+detailsSelImgTexDts,
	dataType:"json",
	data:{
		imgTexId: keys=="1" ? getId : "",
		id: keys=="2" ? getId : "",

	},    //请求参数		
	success: function(data) {
		if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("文图详情",data.data)
		arrList=data.data
		initSelect(arrList.remenwenzhang.slice(0,6),".article-list1")
		initSelect(arrList.jingcaituijian.slice(0,6),".article-list2")
		initSelect(arrList.zuixinfabiao.slice(0,6),".article-list3")

		$(".article-title").html(data.data.wenzhang.title)
		$(".article-content").html(data.data.wenzhang.content)

		

	},
	error: function() {
		//请求出错处理
		}
	});	


function  initSelect(lists,obj){
	console.log(lists)
	let str1=""

	for(let i=0;i<lists.length;i++){
		str1+=`
			<li><a href="imageText_detail.html?id=${lists[i].id}?key=2"><span style="margin-right:12px;">●</span>${lists[i].title}</a></li>
		`
	}
	$(obj).html(str1)
}


function copyUrl(){
	$(".dialog-copy").css({"display":"block"})
	var Url2=document.getElementById("urlVal");
	Url2.innerHTML=this.location.href
	
	Url2.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	
}

