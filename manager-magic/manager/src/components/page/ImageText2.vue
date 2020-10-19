<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:block; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入搜索内容"   v-model="search" class="input-with-select">
                
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
			prop="title"
			label="标题"
			show-overflow-tooltip>
			</el-table-column>
			
			<el-table-column
			prop="type"
			label="类型"
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

            <el-form-item
            prop="weddingTheme"
            v-show="submitTag=='add' ? true : false"
            >
            
            <el-select
                v-model="ruleForm.weddingTheme"
                style="width:100%"
                filterable
                allow-create
                
                placeholder="请选择即将创建的文图所属类型">
                    <el-option
                    v-for="item in craphicList"
                    :key="item.id"
                    :label="item.dicDescribe"
                    :value="item.dicValue">
                    </el-option>
                </el-select>
            
            </el-form-item>

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
                @focus="onEditorFocus($event)"
                >
                
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

            uploadNum:0,
            imgListLength:'',
            isChangeImg:false,

            tableList:[],

            formInline:{
                cityV:""
            },

            ruleForm:{
                title:"",
                weddingTheme:"",

            },
            content:null,
            editorOption:{
            
                        placeholder: '编辑内容...'
            },

            rules: {

                title: [
                    { validator: validatenickPublic, trigger: 'blur' }
                    
                ],
                weddingTheme: [
                    { required: true, message: '请选择即将创建的文图所属类型', trigger: 'change' }
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
            craphicList:[],
        }
    },
    methods:{




        // 新增一条的接口
        addServer(pamas){
            postRequest(url.imgTexDtsInsert, pamas).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                

                
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data.data)
                this.initData(this.tableData)

                this.content=""
            });  
        },

        // 更新一条的接口
        upServer(pamas){
            postRequest(url.imgTexDtsUpdate, pamas).then(data=> {
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data.data)
                this.initData(this.tableData)

                this.content=""
                
            });  
        },
        // 新增酒店
        
        addMost(){
            this.content=""
            this.dialogVisible=true;

            this.submitTag="add"
            this.$nextTick(() => {
                
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

                    if(this.submitTag=="add"){
                        this.addServer({
                            title:this.ruleForm.title,
                            content:this.content,
                            type:this.ruleForm.weddingTheme,
                        })
                    }
                    if(this.submitTag=="change"){
                        this.upServer({
                            title:this.ruleForm.title,
                            content:this.content,
                            type:this.ruleForm.weddingTheme,
                            id:this.changeId
                        })
                    }

                }else {

                    return false;
            }
            });


        },


        //弹窗出现 修改
        changeRow(index, rows){

            this.dialogVisible=true;
            this.submitTag="change"
            this.changeId=rows[index].id;
            this.changeIndex=index;

            this.$nextTick(() => {
            this.ruleForm={
                title : rows[index].title,
                weddingTheme:rows[index].type,


            }
            this.content=rows[index].content
            });
            

            

        },
        // 单删除
        deleteRow(index, rows) {

           
        console.log("deleteRow",rows[index].id,rows[index].bannerUrl)
        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                postRequest(url.imgTexDtsDelete, {
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
                    postRequest(url.imgTexDtsDelete, {
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
        onEditorFocus(){//获得焦点事件
        },

        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },

        goSearch(){


            this.initData(this.tableData)
            
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
            postRequest(url.imgTexDtsGetImgTexDtsList, pamas).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("初始化数据",data.data.data)
                let datas=data.data.data;
                this.tableList=datas.list
                this.total= datas.total        
                this.navigatepageNums=datas.navigatepageNums      
                this.currentPage=datas.pageNum 
                        
            });     
        },

        initDiction(){
            let dictionList= sessionStorage.getSessionStorage("ms_dictionary")
            console.log("dictionList",dictionList)
            for(let i=0;i<dictionList.length;i++){
                switch (dictionList[i].dicKey) {

                    case "GRAPHIC_TYPE":
                        this.craphicList=dictionList[i].list
                        
                        break;

                    default:
                        break;
                }
            }
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
            this.tableData.pageNum=val
            this.initData(this.tableData)
        },
    },

    computed:{
        tableData(){
            return {
                "pageNum":this.currentPage,
                "pageSize":"10",
                "searchContent":this.search,

            }
        },
    },

    created(){
        this.initDiction()
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

