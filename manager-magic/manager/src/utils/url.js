// 接口汇总
//服务器地址
const server = 'http://47.100.237.163:8093/'; //正式地址
// const server = 'http://192.168.1.98:8093/'; //汪老师地址




// 七牛
// const qiniuH='http://picture.jiudianhunyan.com/'//正式地址
const qiniuH='http://test.huashenghl.com/'//测式地址


// 登录
const loginGoLogin = 'login/goLogin'; 
// 登出
const scLogout = 'sc/logout'; 

// 字典
const initGetDictionaryList = 'init/getDictionaryList'; 

// 七牛动态配置
const initGetQiniuConfig = 'init/getQiniuConfig'; 

// 轮播图
const slideshowInsert = 'slideshow/insert'; //增
const slideshowDelete = 'slideshow/delete'; //删
const slideshowUpdate = 'slideshow/update'; //改
const slideshowGetSlideshowList = 'slideshow/getSlideshowList'; //查询

// 首页文图
const imgTexInsert = 'imgTex/insert'; //增
const imgTexDelete = 'imgTex/delete'; //删
const imgTexUpdate = 'imgTex/update'; //改
const imgTexGetImgTexList = 'imgTex/getImgTexList'; //查询

// 更多文图
const imgTexDtsInsert = 'imgTexDts/insert'; //增
const imgTexDtsDelete = 'imgTexDts/delete'; //删
const imgTexDtsUpdate = 'imgTexDts/update'; //改
const imgTexDtsGetImgTexDtsList = 'imgTexDts/getImgTexDtsList'; //查询

// 搜索字段相关

const dictionaryGetDicKeyDescribe = 'dictionary/getDicKeyDescribe'; //查询字典分类下拉框
const dictionaryInsert = 'dictionary/insert'; //增
const dictionaryUpdate = 'dictionary/update'; //改
const dictionarySelectDictionaryList = 'dictionary/selectDictionaryList'; //查询

// 创建（单个）婚礼婚品
const wdgIesInsert = 'wdgIes/insert'; //增
const wdgIesDelete = 'wdgIes/delete'; //删
const wdgIesUpdate = 'wdgIes/update'; //改
const wdgIesGetWdgIesList = 'wdgIes/getWdgIesList'; //查询
                                
// 婚礼婚品详情
const wdgIesDtsInsert = 'wdgIesDts/insert'; //增
const wdgIesDtsDelete = 'wdgIesDts/delete'; //删
const wdgIesDtsUpdate = 'wdgIesDts/update'; //改
const wdgIesDtsGetWdgIesDtsList = 'wdgIesDts/getWdgIesDtsList'; //查询

// 创建视觉展示
const vslDpyInsert = 'vslDpy/insert'; //增
const vslDpyDelete = 'vslDpy/delete'; //删
const vslDpyUpdate = 'vslDpy/update'; //改
const vslDpyGetVslDpyList = 'vslDpy/getVslDpyList'; //查询
                                
// 创建视觉展示详情
const VslDpyDtsInsert = 'VslDpyDts/insert'; //增
const VslDpyDtsDelete = 'VslDpyDts/delete'; //删
const VslDpyDtsUpdate = 'VslDpyDts/update'; //改
const VslDpyDtsGetVslDpyDtsList = 'VslDpyDts/getVslDpyDtsList'; //查询

// 策划布置
const pngLotInsert = 'pngLot/insert'; //增
const pngLotDelete = 'pngLot/delete'; //删
const pngLotUpdate = 'pngLot/update'; //改
const pngLotGetPngLotList = 'pngLot/getPngLotList'; //查询
                                
// 策划布置详情
const pngLotDtsInsert = 'pngLotDts/insert'; //增
const pngLotDtsDelete = 'pngLotDts/delete'; //删
const pngLotDtsUpdate = 'pngLotDts/update'; //改
const pngLotDtsGetPngLotDtsList = 'pngLotDts/getPngLotDtsList'; //查询

// 婚礼花艺相关
const wdgFwsInsert = 'wdgFws/insert'; //增
const wdgFwsDelete = 'wdgFws/delete'; //删
const wdgFwsUpdate = 'wdgFws/update'; //改
const wdgFwsGetWdgFwsList = 'wdgFws/getWdgFwsList'; //查询
                                
// 婚礼花艺相关详情
const wdgFwsDtsInsert = 'wdgFwsDts/insert'; //增
const wdgFwsDtsDelete = 'wdgFwsDts/delete'; //删
const wdgFwsDtsUpdate = 'wdgFwsDts/update'; //改
const wdgFwsDtsGetWdgFwsDtsList = 'wdgFwsDts/getWdgFwsDtsList'; //查询


// 婚礼设计相关
const wdgDinInsert = 'wdgDin/insert'; //增
const wdgDinDelete = 'wdgDin/delete'; //删
const wdgDinUpdate = 'wdgDin/update'; //改
const wdgDinGetWdgDinList = 'wdgDin/getWdgDinList'; //查询
                                
// 婚礼设计相关详情
const wdgDinDtsInsert = 'wdgDinDts/insert'; //增
const wdgDinDtsDelete = 'wdgDinDts/delete'; //删
const wdgDinDtsUpdate = 'wdgDinDts/update'; //改
const wdgDinDtsGetWdgDinDtsList = 'wdgDinDts/getWdgDinDtsList'; //查询

// 摄像视频相关
const cmaVdoInsert = 'cmaVdo/insert'; //增
const cmaVdoDelete = 'cmaVdo/delete'; //删
const cmaVdoUpdate = 'cmaVdo/update'; //改
const cmaVdoGetCmaVdoList = 'cmaVdo/getCmaVdoList'; //查询
                                


export default{

    server:server,

    
    qiniuH:qiniuH,

    loginGoLogin:loginGoLogin,

    initGetDictionaryList:initGetDictionaryList,

    initGetQiniuConfig:initGetQiniuConfig,

    slideshowInsert:slideshowInsert,
    slideshowDelete:slideshowDelete,
    slideshowUpdate:slideshowUpdate,
    slideshowGetSlideshowList:slideshowGetSlideshowList,

    imgTexInsert:imgTexInsert,
    imgTexDelete:imgTexDelete,
    imgTexUpdate:imgTexUpdate,
    imgTexGetImgTexList:imgTexGetImgTexList,
    
    imgTexDtsInsert:imgTexDtsInsert,
    imgTexDtsDelete:imgTexDtsDelete,
    imgTexDtsUpdate:imgTexDtsUpdate,
    imgTexDtsGetImgTexDtsList:imgTexDtsGetImgTexDtsList,

    dictionaryGetDicKeyDescribe:dictionaryGetDicKeyDescribe,
    dictionaryInsert:dictionaryInsert,
    dictionaryUpdate:dictionaryUpdate,
    dictionarySelectDictionaryList:dictionarySelectDictionaryList,

    wdgIesInsert:wdgIesInsert,
    wdgIesDelete:wdgIesDelete,
    wdgIesUpdate:wdgIesUpdate,
    wdgIesGetWdgIesList:wdgIesGetWdgIesList,

    wdgIesDtsInsert:wdgIesDtsInsert,
    wdgIesDtsDelete:wdgIesDtsDelete,
    wdgIesDtsUpdate:wdgIesDtsUpdate,
    wdgIesDtsGetWdgIesDtsList:wdgIesDtsGetWdgIesDtsList,

    vslDpyInsert:vslDpyInsert,
    vslDpyDelete:vslDpyDelete,
    vslDpyUpdate:vslDpyUpdate,
    vslDpyGetVslDpyList:vslDpyGetVslDpyList,
    

    VslDpyDtsInsert:VslDpyDtsInsert,
    VslDpyDtsDelete:VslDpyDtsDelete,
    VslDpyDtsUpdate:VslDpyDtsUpdate,
    VslDpyDtsGetVslDpyDtsList:VslDpyDtsGetVslDpyDtsList,



    pngLotInsert:pngLotInsert,
    pngLotDelete:pngLotDelete,
    pngLotUpdate:pngLotUpdate,
    pngLotGetPngLotList:pngLotGetPngLotList,

    pngLotDtsInsert:pngLotDtsInsert,
    pngLotDtsDelete:pngLotDtsDelete,
    pngLotDtsUpdate:pngLotDtsUpdate,
    pngLotDtsGetPngLotDtsList:pngLotDtsGetPngLotDtsList,


    wdgFwsInsert:wdgFwsInsert,
    wdgFwsDelete:wdgFwsDelete,
    wdgFwsUpdate:wdgFwsUpdate,
    wdgFwsGetWdgFwsList:wdgFwsGetWdgFwsList,

    wdgFwsDtsInsert:wdgFwsDtsInsert,
    wdgFwsDtsDelete:wdgFwsDtsDelete,
    wdgFwsDtsUpdate:wdgFwsDtsUpdate,
    wdgFwsDtsGetWdgFwsDtsList:wdgFwsDtsGetWdgFwsDtsList,

   

    wdgDinInsert:wdgDinInsert,
    wdgDinDelete:wdgDinDelete,
    wdgDinUpdate:wdgDinUpdate,
    wdgDinGetWdgDinList:wdgDinGetWdgDinList,

    
    wdgDinDtsInsert:wdgDinDtsInsert,
    wdgDinDtsDelete:wdgDinDtsDelete,
    wdgDinDtsUpdate:wdgDinDtsUpdate,
    wdgDinDtsGetWdgDinDtsList:wdgDinDtsGetWdgDinDtsList,

    cmaVdoInsert:cmaVdoInsert,
    cmaVdoDelete:cmaVdoDelete,
    cmaVdoUpdate:cmaVdoUpdate,
    cmaVdoGetCmaVdoList:cmaVdoGetCmaVdoList,

}
