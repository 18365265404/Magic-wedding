

//服务器地址
//var myServer='http://192.168.1.98:8093/' //测试
var myServer='http://47.100.237.163:8093/' //正式
//var QiNiu='http://test.huashenghl.com/'//测试


var QiNiu=""//正式

var detailsSelImgTexDts = "details/selImgTexDts" //文图详情

var initGetDictionaryList = "init/getDictionaryList" //字典
var indexSelSwAndIxList = "index/selSwAndIxList" //查询轮播图
var initGetQiniuConfig = "init/getQiniuConfig" //动态七牛配置
var indexSelWdgIesList = "index/selWdgIesList" //婚礼婚品
var indexSelVslDpyList = "index/selVslDpyList" //视觉展示

var indexSelPngLotList = "index/selPngLotList" //策划布置
var indexSelWdgFwsList = "index/selWdgFwsList" //花艺
var indexSelWdgDinList = "index/selWdgDinList" //婚礼设计
var indexSelCmaVdoList = "index/selCmaVdoList" //摄像视频

var detailsSelWdgIesDts = "details/selWdgIesDts" //婚礼婚品详情
var selVslDpyDts = "details/selVslDpyDts" // 视觉展示详情
var selPngLotDts = "details/selPngLotDts" //策划布置详情
var selWdgFwsDts = "details/selWdgFwsDts" //婚礼花艺详情
var detailsSelWdgDinDts = "details/selWdgDinDts" //婚礼设计详情
















$.ajax({
type:"post",    //请求方式
url:myServer+initGetQiniuConfig,
dataType:"json",
data:{

}, 

success: function(data) {
	
	QiNiu=data.data.domain+"/"
	console.log("data",data)
},
error: function() {
	//请求出错处理
	}
});	