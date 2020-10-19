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

            <el-form-item class="formCity" label="城市选择：" prop="caseType" >
                <el-select
                v-model="formInline.caseType"
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
            prop="caseType"
            label="案例类型"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="weddingTheme"
            label="婚礼主题"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="weddingVenue"
            label="婚礼地点"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="weddingDepartment"
            label="婚礼色系"
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

                <el-button
                @click.native.prevent="showDetail(scope.$index, tableList)"
                type="info"
                size="small">
                详情
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
            width="60%"
            
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>

            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">
				
				
			<el-upload
			    :data="qiniu"
			    :limit="1"
			    style="margin-left:3%;margin-right:4%;margin-bottom:10px"
			    class="upload-demo"
			    ref="uploadimg"
			    action="http://upload.qiniup.com"
			    list-type="picture"
			    :on-success="updateDetailSuccess"
			    :file-list="upfileList"
			    :on-change="handleChange"
			    :before-upload="beforeUpload"
			    :auto-upload="false">
			    <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
			
			</el-upload>


            <el-form-item             
            prop="title"
            >
                <el-input type="text"  placeholder="请输入标题" v-model.number="ruleForm.title" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="caseType"
            v-show="submitTag=='add' ? true : false"
            >

            <el-select
                
                v-model="ruleForm.caseType"
                style="width:100%"
                filterable
                allow-create
                
                placeholder="请选择案例类型">
                    <el-option
                    v-for="item in caseList"
                    :key="item.id"
                    :label="item.dicDescribe"
                    :value="item.dicValue">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item             
            prop="weddingTheme"
            v-show="submitTag=='add' ? true : false"
            >

            <el-select
                v-model="ruleForm.weddingTheme"
                style="width:100%"
                filterable
                allow-create
                
                placeholder="请选择婚礼主题">
                    <el-option
                    v-for="item in craphicList"
                    :key="item.id"
                    :label="item.dicDescribe"
                    :value="item.dicValue">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item             
            prop="weddingVenue"
            v-show="submitTag=='add' ? true : false"
            >

            <el-select
                v-model="ruleForm.weddingVenue"
                style="width:100%"
                filterable
                allow-create
                
                placeholder="请选择婚礼地点">
                    <el-option
                    v-for="item in planningList"
                    :key="item.id"
                    :label="item.dicDescribe"
                    :value="item.dicValue">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item             
            prop="weddingDepartment"
            v-show="submitTag=='add' ? true : false"
            >
            <el-select
                v-model="ruleForm.weddingDepartment"
                style="width:100%"
                filterable
                allow-create
                multiple 
                placeholder="请选择婚礼色系(该项可多选)">
                    <el-option
                    v-for="item in videoList"
                    :key="item.id"
                    :label="item.dicDescribe"
                    :value="item.dicValue">
                    </el-option>
                </el-select>

            </el-form-item>

            </el-form>

            <div style="display:flex;margin-left:3%">
                <el-button style="margin-left:0;width:100%;margin-right:4%" slot="trigger" size="small" type="primary" @click="subPicForm">提交</el-button>
            </div>
        
        </el-dialog>  


        <!-- 弹窗2 -->
            <el-dialog
            title="上传"
            :visible.sync="dialogVisible2"
            width="60%"

            center>

            <div style="text-align: center;">{{submitTag2=="add" ? '创建': "更新"}}</div>
            
            <el-button style="float:right;margin-right:3%" size="small" type="primary" v-show="submitTag2=='add' ? false: true" @click="switcher()">{{"切换到创建"}}</el-button>
            <el-upload
            style="margin-left:3%;margin-right:3%;margin-bottom:10px"
                :data="qiniu"
                :limit="6"
                multiple
                class="upload-demo"
                ref="uploadimg2"
                action="http://upload.qiniup.com"
                list-type="picture"
                :on-success="updateDetailSuccess2"
                :file-list="upfileList2"
                :on-change="handleChange2"
                :before-upload="beforeUpload"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" style="margin-bottom:10px" >选取图片</el-button>
                

            </el-upload>
            
            <div style="display:flex">
                <el-button style="margin-left:0;width:94%; margin-left:3%" slot="trigger" size="small" type="primary" @click="subDetailForm">提交</el-button>
            </div>

            <div style="width:94%; margin:20px auto">
                <el-button   style="margin-left:0;" slot="trigger" size="small" type="primary" @click="deletAll2()">
                    批量删除
                </el-button>

                
                <el-table

                    :data="tableList2"
                    tooltip-effect="dark"
                    style="margin-right:50px"
                    border
                    :header-cell-style="{background:'#EEF1F6'}"
                    size="small"
                    @selection-change="handleSelectionChange2">

                    <el-table-column
                    type="selection"

                    :key='Math.random()'
                    >
                    </el-table-column>
                    <el-table-column
                    type="index"
                    >
                    </el-table-column>


                    
                    <el-table-column
                    style="position:relative"
                    prop="pictureUrl"
                    label="图片"

                    show-overflow-tooltip>
                        <template    slot-scope="scope">            
                            <div title="点击放大显示"  >
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
                    prop="dateTime"
                    label="更新时间"
                    show-overflow-tooltip>
                    </el-table-column>





                    <el-table-column
                    fixed="right"
                    label="操作"

                    >
                    <template slot-scope="scope">



                        <el-button
                        @click.native.prevent="deleteDetailRow(scope.$index, tableList2)"
                        type="danger"
                        size="small">
                        删除
                        </el-button>
                        

                        <el-button
                        @click.native.prevent="changeDetail(scope.$index, tableList2)"
                        type="success"
                        size="small">
                        更新
                        </el-button>

                    </template>
                    </el-table-column>

                    </el-table>
            </div>
        
        </el-dialog>  
    </div>
</template>

<script>

import url from '../../utils/url';
import {getCookie,getErr} from '../../utils/utils';
import sessionStorage from '../../utils/sessionStorage'
import {postRequest,uploadFileRequest} from '../../utils/api';
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
            ruleForm:{
                title:"",
                caseType:"",
                weddingTheme:"",
                weddingVenue:"",
                weddingDepartment:""

            },
            rules: {

                title: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                caseType: [
                    { required: true, message: '请选择案例类型', trigger: 'change' }
                ],
                weddingTheme: [
                    { required: true, message: '请选择婚礼主题', trigger: 'change' }
                ],
                weddingVenue: [
                    { required: true, message: '请选择婚礼地点', trigger: 'change' }
                ],
                weddingDepartment: [
                    { required: true, message: '请选择婚礼色系', trigger: 'change' }
                ],

            },
            caseList:[],
            craphicList:[],
            planningList:[],
            videoList:[],

            submitTag:"add",
            submitTag2:"add",


            upfileList:[],
            upfileList2:[],
            file:"",
            qiniu:{
                upUrl:'',
                token:'',
                showUrl:''
            },
            uploadNum:0,
            imgListLength:'',
            isChangeImg:false,

            uploadNum2:0,
            imgListLength2:'',
            isChangeImg2:false,

            tableList:[],
            tableList2:[],

            formInline:{

            },

            dialogVisible:false,
            dialogVisible2:false,
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

        switcher (){
            this.submitTag2="add"
            this.upfileList2=[]
        },
        // 详情上传图片成功
        updateDetailSuccess2(response, file, fileList){
            
            this.uploadNum2++
            if(this.uploadNum2==this.imgListLength2){
                let wdgIesDtsList=[]
                // let obj={"imgName":"","wdgIesId":""}
                // for(let i=0;i<fileList.length;i++){
                //     wdgIesDtsList.push(obj)
                // }

                
                let fileKeys=[]
                
                for(let i=0;i<fileList.length;i++){
                    fileKeys.push(fileList[i].response.key)
                    
                    let obj={"imgName":"","vslDpyId":this.table2pmas.vslDpyId}
                    obj.imgName=fileList[i].response.key
                    wdgIesDtsList.push(obj)
                }

                console.log("要传给后端的key集合",wdgIesDtsList)
                

                if(this.submitTag2=="add"){

                    this.addServer2({
                        vslDpyDtsList:JSON.stringify(wdgIesDtsList),
                    })
                }
                if(this.submitTag2=="change"){

                    this.detailsUpPamas.imgName=fileKeys[0]

                    console.log("`````````````````````````````",this.detailsUpPamas)
                    
                    this.upServer2(this.detailsUpPamas)
                }
                
            }
        } ,

        // 新增一条的接口
        addServer2(pamas){
            
            console.log("要查询详情的参数",this.table2pmas)
            
            postRequest(url.VslDpyDtsInsert, pamas).then(data=> {
                this.uploadNum2=0
                this.submitTag2="add"
                this.dialogVisible=false
                
                console.log("上传到服务器成功返回22222",data)
                this.upfileList2=[]
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.initData2(this.table2pmas)

                
            });  
        },

        // 更新一条的接口
        upServer2(pamas){
            postRequest(url.VslDpyDtsUpdate, pamas).then(data=> {
                this.uploadNum2=0
                this.submitTag2="add"
                console.log("上传到服务器成功返回",this.table2pmas)
                this.initData2(this.table2pmas)
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.upfileList2=[]
                
            });  
        },


        // 上传详情图片提交
        subDetailForm(){
            
            this.$refs.uploadimg2.submit();
        },
        // 上传图片之前
        beforeUpload(file){
        let dates= new Date()

         return  this.qiniu.key=file.uid
           
      
        },

        // 详情图片上传改变
        handleChange2(file, fileList) {
            this.imgListLength2=fileList.length
            console.log("显示图的长度",this.imgListLength2)
            this.isChangeImg2=true
        },
        // 详情图片修改
        changeDetail(index, rows){
            this.submitTag2='change'

        
            this.upfileList2=[{url:this.qiniu.showUrl+rows[index].imgName}]
            
            this.detailsUpPamas={
                imgName:rows[index].imgName,
                id:rows[index].id,
                oldImgName:rows[index].imgName
            }
        },

        // 显示详情弹窗
        showDetail(index, rows){
            
            this.dialogVisible2=true;
            this.table2pmas={
                vslDpyId:rows[index].id,
                "pageNum":this.currentPage,
                "pageSize":"999",
            }
            this.initData2(this.table2pmas)

        },
        // 详情单删除
        deleteDetailRow(index, rows) {

           
        console.log("deleteRow",rows[index].id,rows[index].imgName)
        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                postRequest(url.VslDpyDtsDelete, {
                    ids:rows[index].id,
                    imgName:rows[index].imgName,
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    if(!getErr(data.data.code,data.data.message)) {
                        return
                    }
                    this.initData2(this.table2pmas)//查询所有  
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

        //详情 批量删除
        deletAll2(){
            console.log("查看表单内的选中的条数",this.multipleSelection2)
            let arrId=[];
            let arrPictures=[];
            for(let i=0;i<this.multipleSelection2.length;i++){
                arrId.push(this.multipleSelection2[i].id)
                arrPictures.push(this.multipleSelection2[i].imgName)

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
                    postRequest(url.VslDpyDtsDelete, {
                        ids:arrId,
                        imgName:arrPictures,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                        if(!getErr(data.data.code,data.data.message)) {
                            return
                        }
                        this.initData2(this.table2pmas)//查询所有     
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

        // 多选操作改变事件
        handleSelectionChange2(val) {
            this.multipleSelection2 = val;
        },

        /**************************************************以上为详情******************************************************************************/ 




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
                let wedDTTtr=''
                for(let i=0;i<this.ruleForm.weddingDepartment.length;i++){
                    wedDTTtr+=this.ruleForm.weddingDepartment[i]+","
                }
                wedDTTtr = wedDTTtr.substr(0, wedDTTtr.length - 1);
                console.log("wedDTTtr",wedDTTtr)

                console.log("要传给后端的key集合",fileKeys)
                if(this.submitTag=="add"){
                    this.addServer({
                        imgName:fileKeys[0],
                        title:this.ruleForm.title,
                        caseType:this.ruleForm.caseType,
                        weddingTheme:this.ruleForm.weddingTheme,
                        weddingVenue:this.ruleForm.weddingVenue,
                        weddingDepartment:wedDTTtr
                    })
                }
                if(this.submitTag=="change"){
                    this.oldPamas.imgName=fileKeys[0]
                    this.oldPamas.title=this.ruleForm.title
                    console.log("this.oldPamas",this.oldPamas)
                    
                    this.upServer(this.oldPamas)
                }
                
            }
        } ,

        // 新增一条的接口
        addServer(pamas){
            postRequest(url.vslDpyInsert, pamas).then(data=> {
                this.uploadNum=0
                
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data)
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.initData({
                    pageSize:"10",
                    pageNum:this.currentPage,
                })
                this.initQiniu()
                
            });  
        },

        // 更新一条的接口
        upServer(pamas){
            postRequest(url.vslDpyUpdate, pamas).then(data=> {
                this.uploadNum=0
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data)
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.initData({
                    pageSize:"10",
                    pageNum:this.currentPage,
                })
                
            });  
        },
        // 新增酒店
        
        addMost(){
            
            this.dialogVisible=true;
            this.upfileList=[]
            this.submitTag="add"
            this.$nextTick(() => {
                this.$refs.uploadimg.clearFiles()
                this.$refs['ruleForm'].resetFields();
            });
            
            
        },
        //提交
        subPicForm(){
            



            this.$refs["ruleForm"].validate((valid) => {
                
                if (valid) {
                    
                    if(this.submitTag=="change" && !this.isChangeImg){
            
                        this.oldPamas.oldImgName=""
                        this.oldPamas.title=this.ruleForm.title
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
                caseType : rows[index].caseType,
                weddingTheme : rows[index].weddingTheme,
                weddingVenue : rows[index].weddingVenue,
                weddingDepartment : rows[index].weddingDepartment,


            }
            });
            
            this.oldPamas={
                imgName:rows[index].imgName,
                title:this.ruleForm.title,
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

                postRequest(url.vslDpyDelete, {
                    ids:rows[index].id,
                    imgName:rows[index].imgName,
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.dialogVisible=false
                    if(!getErr(data.data.code,data.data.message)) {
                        return
                    }
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
                    postRequest(url.vslDpyDelete, {
                        ids:arrId,
                        imgName:arrPictures,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.dialogVisible=false
                        if(!getErr(data.data.code,data.data.message)) {
                            return
                        }
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

        uploadFile(file){
            this.formDate.append('file', file.file);
        },

        // 点击弹窗的叉号
        closeDialog(){

        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initData(this.tableData)
            
        },

        initQiniu(){
            postRequest(url.initGetQiniuConfig, {}).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("七牛初始化配置",data)
                this.qiniu={
                    showUrl:data.data.data.domain,
                    token:data.data.data.uploadToken,
                }
                        
            });     
        },

        initData(pamas){
            postRequest(url.vslDpyGetVslDpyList, pamas).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("初始化数据1111",data.data.data)
                let datas=data.data.data;
                this.tableList=datas.list
                this.total= datas.total        
                // this.navigatepageNums=datas.navigatepageNums      
                this.currentPage=datas.pageNum 
                        
            });     
        },

        initData2(pamas){
            postRequest(url.VslDpyDtsGetVslDpyDtsList, pamas).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("初始化数据2222222",data.data.data)
                let datas=data.data.data;
                this.tableList2=datas.list

                        
            });     
        },

        initKeySelct(){
            postRequest(url.dictionaryGetDicKeyDescribe, {}).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                console.log("初始化字典select",data)
                this.keyList=data.data.data
                // let allcityO={id:"",provinceName:"全部城市"}
                // this.keyList.unshift(allcityO)
                // console.log("初始化城市select2",this.keyList)        
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
        initDiction(){
            let dictionList= sessionStorage.getSessionStorage("ms_dictionary")
            console.log("dictionList",dictionList)
            for(let i=0;i<dictionList.length;i++){
                switch (dictionList[i].dicKey) {
                    case "CASE_TYPE":   //婚礼类型
                        this.caseList=dictionList[i].list

                        break;
                    case "WEDDING_THEME"://婚礼主题
                        this.craphicList=dictionList[i].list
                        
                        break;
                    case "WEDDING_VENUE"://婚礼地点
                        this.planningList=dictionList[i].list
                        
                        break;
                    case "WEDDIND_COLOR"://婚礼色系
                        this.videoList=dictionList[i].list
                        
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
                "searchContent":this.search,
                "caseType":"",
                "weddingTheme":"",
                "weddingVenue":"",
                "weddingDepartment":"",
                
            }
        },
    },

    created(){

        this.initData({
            pageSize:"10",
            pageNum:this.currentPage,
        })
        this.initQiniu()
        this.initDiction()
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
    width: 93%;
    margin-left: 3%
}
.demo-ruleForm .el-form-item:nth-child(2n){
    
}
</style>

