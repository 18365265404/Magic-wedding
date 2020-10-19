demo();
function demo(curr){
	$.ajax({
	type:"post",    //请求方式
	url:myServer+indexSelWdgIesList,
	dataType:"json",
	data:{
		pageNum: curr || 1,
		pageSize:"12",
		isSort:"1",
	}, 

    success: function(data) {
    	if(data.code!="1"){
			window.location.href='error.html'
		}
		console.log("婚礼婚品",data.data)

		let wentuList=data.data.list
		let wentuStr=""
		    for(let i=0;i<wentuList.length;i++){
		    	wentuStr+=`
				<li onclick="(window.location.href='shop_detail.html?id=${wentuList[i].id}')">
					
					<img class="img-animate" src="../img/blank.gif" data-echo="${QiNiu+wentuList[i].imgName}">
				</li>
		    	`
		    }
		$(".goods-list").html(wentuStr)
		$("body,html").animate({/*scrollTop對象一般都是body和html*/
            "scrollTop":0
        },300)

        //显示分页
        laypage({
            cont: 'biuuu_city', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: data.data.pages, //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skip: true, //是否开启跳页
    		skin: '#AF0000',
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    demo(obj.curr);
                }
            }
        });
        
        Echo.init({

			offset: 10,
		
			throttle: 80
		
		});
    },
	error: function() {
		//请求出错处理
		}
	});	
    
};