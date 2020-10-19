<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:none; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 查询城市 -->
        <div style="overflow:hidden;display:none;">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="float:right;margin-right:0.5%">

            <el-form-item class="formCity" label="城市选择：" prop="cityV" >
                <el-select
                v-model="formInline.cityV"
                @change="goSearch()"
                filterable
                allow-create
                
                placeholder="请选择文章标签">
                    <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.provinceName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        
        </div>
        

        <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
            <el-button  style=" margin-right:5%;margin-bottom:20px" type="primary"  @click="deletMost()">批量删除</el-button>  
            <el-button  style=" margin-right:2%;margin-bottom:20px" type="primary"  @click="addMost()">创建</el-button>  
        </div>

        <el-table
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
           >
            </el-table-column>
           <el-table-column
            type="index"
            >
            </el-table-column>

            <el-table-column
            style="position:relative"
            prop="bannerUrl"
            label="图片"
            width="110px"
            show-overflow-tooltip>
                <template    slot-scope="scope">            
                    <div title="点击放大显示" >
                        <img :src="qiniu.showUrl+scope.row.imgName"    style="width:60px; height:20px" />
                        <el-popover
                        placement="right"
                        trigger="click"
                        >
                            <img :src="qiniu.showUrl+scope.row.imgName"    style="max-height:400px" />
                            <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                        </el-popover>
                    </div>
                </template>  

            </el-table-column>
            
            <el-table-column
            prop="title"
            label="标题"
            show-overflow-tooltip>
            </el-table-column>
			
			<el-table-column
			prop="dateTime"
			label="更新时间"
			show-overflow-tooltip>
			</el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
            width="300px"
           >
            <template slot-scope="scope">



                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableList)"
                type="danger"
                size="small">
                删除
                </el-button>
                

                <el-button
                @click.native.prevent="changeRow(scope.$index, tableList)"
                type="success"
                size="small">
                更新
                </el-button>
                

            </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
          <div class="block" style="overflow:hidden;">

                <el-pagination
                style="float:right; margin-right:10%"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="navigatepageNums"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total"
                >
                </el-pagination>
            </div>


            <!-- 弹窗 -->
            <el-dialog
            title="上传"
            :visible.sync="dialogVisible"
            width="80%"
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">
				
				
			<el-upload
			    :data="qiniu"
			    :limit="1"
			    multiple
			    class="upload-demo"
			    ref="uploadimg"
			    action="http://upload.qiniup.com"
			    list-type="picture"
			    :on-success="updateDetailSuccess"
			    :file-list="upfileList"
			    :on-change="handleChange"
			    :auto-upload="false">
			    <el-button slot="trigger" size="small" type="primary" style="margin-bottom:10px">选取图片</el-button>
			
			</el-upload>

            <el-form-item             
            prop="title"
            >
                <el-input type="text"  placeholder="请输入标题" v-model.number="ruleForm.title" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            </el-form>

            <div style="overflow: hidden;">
                <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                style="min-height:200px ;"
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
                
                </quill-editor>
            </div>
			
			
            <div style="display:flex; margin-top:10px">
                <el-button style="margin-left:0;width:100%" slot="trigger" size="small" type="primary" @click="subPicForm">提交</el-button>
            </div>
        
        </el-dialog>  
    </div>
</template>

<script>

import url from '../../utils/url';
import {getCookie,getErr} from '../../utils/utils';
import {postRequest,uploadFileRequest} from '../../utils/api';
import sessionStorage from '../../utils/sessionStorage'
export default {
    data(){

        var validatenickPublic = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('输入框不能为空'));
            }else{
                callback();
            }

        };
        return {
            submitTag:"add",


            upfileList:[],
            file:"",
            qiniu:{
                upUrl:'',
                token:'',
                showUrl:''
            },
            uploadNum:0,
            imgListLength:'',
            isChangeImg:false,

            tableList:[],

            formInline:{
                cityV:""
            },

            ruleForm:{
                title:"",

            },
            content:null,
            editorOption:{
            
                        placeholder: '编辑内容...'
            },

            rules: {

                title: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],

                



            },

            dialogVisible:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
        }
    },
    methods:{
        handleChange(file, fileList) {
            this.imgListLength=fileList.length
            console.log("显示图的长度",this.imgListLength)
            this.isChangeImg=true
        },


        // 上传图片成功
        updateDetailSuccess(response, file, fileList){

            this.uploadNum++
            if(this.uploadNum==this.imgListLength){
                let fileKeys=[]
                for(let i=0;i<fileList.length;i++){
                    fileKeys.push(fileList[i].response.key)
                }
                
                // alert("上传好了哦")
                console.log("要传给后端的key集合",fileKeys)
                if(this.submitTag=="add"){

                    
                    
                    this.addServer({
                        imgName:fileKeys[0],
                        title:this.ruleForm.title,
                        content:this.content,
                        type:0
                    })
                }
                if(this.submitTag=="change"){

                   
                    this.oldPamas.imgName=fileKeys[0]
                    this.oldPamas.title=this.ruleForm.title
                    this.oldPamas.content=this.content
                    console.log("`````````````````````````````",this.oldPamas)
                    
                    this.upServer(this.oldPamas)
                }
                
            }
        } ,

        // 新增一条的接口
        addServer(pamas){
            postRequest(url.imgTexInsert, pamas).then(data=> {
                // getErr(data.data.code,data.data.message)
                // return
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                
                this.uploadNum=0
                
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data.data)
                this.initData({
                    pageSize:"10",
                    pageNum:this.currentPage,
                })
                this.initQiniu()
                this.content=""
            });  
        },

        // 更新一条的接口
        upServer(pamas){
            postRequest(url.imgTexUpdate, pamas).then(data=> {
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.uploadNum=0
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data)
                this.initData({
                    pageSize:"10",
                    pageNum:this.currentPage,
                })
                this.content=""
                
            });  
        },
        // 新增酒店
        
        addMost(){
            this.content=""
            this.dialogVisible=true;
            this.upfileList=[]
            this.submitTag="add"
            this.$nextTick(() => {
                this.$refs.uploadimg.clearFiles()
            });
            
        },
        //提交
        subPicForm(){
            
            
            this.$refs["ruleForm"].validate((valid) => {
                
                if (valid) {
                    let imgSize=this.getImgSize(this.content)
                    if(parseInt(imgSize)>1000){
                        this.$message({
                            type: 'success',
                            message: '文件大于1Mb,可以适当小些哦'
                        });  
                        return
                    }
                    if(this.submitTag=="change" && !this.isChangeImg){
                        
                        this.oldPamas.oldImgName=""
                        this.oldPamas.title=this.ruleForm.title
                        this.oldPamas.content=this.content
                        
                        console.log("888888888888888888",this.oldPamas)
                        this.upServer(this.oldPamas)
                    }
                    this.$refs.uploadimg.submit();
                    
                    
                    
                }else {

                    return false;
            }
            });


        },


        //弹窗出现 修改
        changeRow(index, rows){
            this.isChangeImg=false
            this.dialogVisible=true;
            this.submitTag="change"
            this.changeId=rows[index].id;
            this.changeIndex=index;

            this.$nextTick(() => {
            this.ruleForm={
                title : rows[index].title,



            }
            this.content=rows[index].content
            }); 
            
            this.oldPamas={
                imgName:rows[index].imgName,
                title:rows[index].title,
                content:rows[index].content,
                
                oldImgName:rows[index].imgName,
                
                id:rows[index].id
            }
            this.upfileList=[{url:this.qiniu.showUrl+rows[index].imgName}]
            

        },  
        // 单删除
        deleteRow(index, rows) {

           
        console.log("deleteRow",rows[index].id,rows[index].bannerUrl)
        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                postRequest(url.imgTexDelete, {
                    ids:rows[index].id,
                    imgName:rows[index].imgName,
                }).then(data=> {

                    if(!getErr(data.data.code,data.data.message)) {
                        
                        return
                    }
                    console.log("删除后打印的数据",data)
                    this.dialogVisible=false
                    this.initData(this.tableData) //查询所有  
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });        
                                    
                });    
                       
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
   
        
        
        },

        // 批量删除
        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let arrId=[];
            let arrPictures=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                arrId.push(this.multipleSelection[i].id)
                arrPictures.push(this.multipleSelection[i].imgName)

            }




            if(arrId.length==0){
                this.$message({
                    type: 'success',
                    message: '请选择后删除'
                });
                return
            }

                this.$confirm('是否删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    postRequest(url.imgTexDelete, {
                        ids:arrId,
                        imgName:arrPictures,
                        }).then(data=> {
                        if(!getErr(data.data.code,data.data.message)) {
                            return
                        }
                        console.log("删除后打印的数据",data)
                        this.dialogVisible=false
                        this.initData(this.tableData) //查询所有    
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });        
                                
                    });    
                       
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                });
           

        }, 

        // 计算文件字节大小
        getImgSize(str) {
            //获取base64图片大小，返回KB数字
           
            
            var strLength = str.length;
            var fileLength = parseInt(strLength - (strLength / 8) * 2);

            // 由字节转换为KB
            var size = "";
            size = (fileLength / 1024).toFixed(2);
            
            
            
            return parseInt(size);

        },

        uploadFile(file){
            this.formDate.append('file', file.file);
        },

        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initCitySelct(this.tableData)
            
        },

        initQiniu(){
            postRequest(url.initGetQiniuConfig, {}).then(data=> {
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }

                // console.log("七牛初始化配置",data.data.data.uploadToken)
                this.qiniu={
                    showUrl:data.data.data.domain,
                    token:data.data.data.uploadToken,
                }
                        
            });     
        },

        initData(pamas){
            postRequest(url.imgTexGetImgTexList, pamas).then(data=> {
                console.log("初始化数据",data.data)
                if(!getErr(data.data.code,data.data.message)) {
                    
                    return
                    
                }
                
                let datas=data.data.data;
                this.tableList=datas.list
                this.total= datas.total        
                this.navigatepageNums=datas.navigatepageNums      
                this.currentPage=datas.pageNum 
                        
            });     
        },
        initCitySelct(){
            postRequest(url.cityGetCityListByOpen, {}).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("初始化城市select",data)
                this.cityList=data.data.data
                let allcityO={id:"",provinceName:"全部城市"}
                this.cityList.unshift(allcityO)
                console.log("初始化城市select2",this.cityList)        
            });     
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(event){//内容改变事件

        event.quill.deleteText(800, 4)
        },
        // 多选操作改变事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // f分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.initData({
                pageSize:"10",
                pageNum:val,
            })
        },
    },

    computed:{
        tableData(){
            return {
                "pageNum":this.currentPage,
                "pageSize":"10",
                // "userId":localStorage.getItem('ms_userId'),
                // "likeName":this.search,
                // "cityId":this.formInline.cityV
            }
        },
    },

    created(){

        this.initData({
            pageSize:"10",
            pageNum:this.currentPage,
        })
        this.initQiniu()
        console.log("字典数据",)
        
        let ms_dictionary=sessionStorage.getSessionStorage("ms_dictionary")
        for( let i=0;i<ms_dictionary.length;i++){
            if(ms_dictionary[i].dicKey=='GRAPHIC_TYPE'){
                this.dictionary=ms_dictionary[i].list
            }
        }
    },
}
</script>

<style scoped>
.demo-ruleForm{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.demo-ruleForm .el-form-item{
    width: 100%;

}
.demo-ruleForm .el-form-item:nth-child(2n){
    
}
</style>

