<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:block; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入搜索内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 查询城市 -->
        <div style="overflow:hidden;display:block;">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="float:right;margin-right:0.5%">

            <el-form-item class="formCity" label="条件分类：" prop="keyV" >
                <el-select
                v-model="formInline.keyV"
                @change="goSearch()"
                filterable
                allow-create
                
                placeholder="请选择类型">
                    <el-option
                    v-for="item in keyList"
                    :key="item.dicKey"
                    :label="item.dicKeyDescribe"
                    :value="item.dicKey">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        
        </div>
        

        <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
            <el-button  style=" margin-right:5%;margin-bottom:20px;opacity:0" type="primary" >批量删除</el-button>  
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
            prop="dicDescribe"
            label="条件名"
            show-overflow-tooltip>
            </el-table-column>
			
			<el-table-column
			prop="dicStatus"
			label="状态"
			show-overflow-tooltip>
			</el-table-column>
			
			<el-table-column
			prop="dicSort"
			label="排序"
			show-overflow-tooltip>
			</el-table-column>

<!--            <el-table-column
            prop="dateTime"
            label="更新时间"
            show-overflow-tooltip>
            </el-table-column> -->

            <el-table-column
            fixed="right"
            label="操作"
            width="300px"
           >
            <template slot-scope="scope">

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
            prop="dicDescribe"
            >
                <el-input type="text"  placeholder="请输入条件名" v-model.number="ruleForm.dicDescribe" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
			
<!-- 			<el-form-item
			prop="dicSort"
			>
			    <el-input oninput = "value=value.replace(/[^\d.]/g,'')" type="text"  placeholder="请输入排序" v-model.number="ruleForm.dicSort" autocomplete="off">
			     <template slot="prepend"><i class="el-icon-edit"></i></template>
			    </el-input>
			</el-form-item>

          <el-form-item   
            v-show="submitTag=='add' ? false : true"          
            prop="dicStatus"
            >
                <el-input oninput = "value=value.replace(/[^\d.]/g,'')" type="text"  placeholder="请输入条件状态" v-model.number="ruleForm.dicStatus" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item> -->

            <el-form-item label="状态" prop="dicStatus"
            v-show="submitTag=='add' ? false : true"
            >
                <el-radio-group v-model="ruleForm.dicStatus">
                    <el-radio :label="0">禁用</el-radio>
                    <el-radio :label="1">正常</el-radio>
                </el-radio-group>
            </el-form-item>
            

			<!-- <el-form-item label="状态:" prop="dicStatus"
			v-show="submitTag=='add' ? false : true"
			>
				<el-radio-group v-model="ruleForm.dicStatus" >
				  <el-radio label="0">禁用</el-radio>
				  <el-radio label="1">正常</el-radio>
				</el-radio-group>
			</el-form-item> -->

            </el-form>


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

            tableList:[],

            formInline:{
                keyV:""
            },
			
            ruleForm:{
                dicSort:"",
                dicDescribe:"",
                dicStatus:"1"
            },

            rules: {

                // dicSort: [
                //     { validator: validatenickPublic, trigger: 'blur' }
                // ],
                // dicDescribe:[
                //     { validator: validatenickPublic, trigger: 'blur' }
                // ],
                



            },

            dialogVisible:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            keyList:[],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
        }
    },
    methods:{




        // 新增一条的接口
        addServer(pamas){
            // if(){

            // }
            postRequest(url.dictionaryInsert, pamas).then(data=> {

                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                

                
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data.data)
                // this.initData(this.tableData)
                this.initData(this.tableData)
                this.content=""
            });  
        },

        // 更新一条的接口
        upServer(pamas){
            postRequest(url.dictionaryUpdate, pamas).then(data=> {
                if(!getErr(data.data.code,data.data.message)) {
                    return
                }
                this.dialogVisible=false
                console.log("上传到服务器成功返回",data.data)
                this.initData(this.tableData)

                this.content=""
                
            });  
        },
        // 新增
        
        addMost(){
            if(this.formInline.keyV==""){
                this.$message({
                    type: 'warning',
                    message: '请先选择类型'
                });
                return
            }
            this.content=""
            this.dialogVisible=true;

            this.submitTag="add"
            this.$nextTick(() => {
                
            });
            
        },
        //提交
        subPicForm(){
            console.log("参数",this.ruleForm)
            
            
            this.$refs["ruleForm"].validate((valid) => {
                
                if (valid) {
                    if(this.submitTag=="add"){
                        
                        this.addServer({
                            dicSort:this.ruleForm.dicSort,
                            dicDescribe:this.ruleForm.dicDescribe,
                            dicKey:this.formInline.keyV
                        })
                    }
                    if(this.submitTag=="change"){
                        
                        this.upServer({
                            dicSort:this.ruleForm.dicSort,
                            dicDescribe:this.ruleForm.dicDescribe,
                            dicStatus:this.ruleForm.dicStatus,
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
            // if(this.formInline.keyV==""){
            //     this.$message({
            //         type: 'warning',
            //         message: '请先选择类型'
            //     });
            //     return
            // }

            this.dialogVisible=true;
            this.submitTag="change"
            this.changeId=rows[index].id;
			this.ruleForm.dicStatus=rows[index].dicStatus;
            this.changeIndex=index;

            this.$nextTick(() => {
            this.ruleForm={
                dicSort : rows[index].dicSort,
                dicDescribe : rows[index].dicDescribe,
                dicStatus : rows[index].dicStatus,
                


            }
            this.content=rows[index].content
            });
            

            

        },



        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },

        goSearch(){


            this.initData(this.tableData)
            
        },


        initData(pamas){
            postRequest(url.dictionarySelectDictionaryList, pamas).then(data=> {

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
                "dicKey":this.formInline.keyV
                

            }
        },
    },

    created(){

        this.initData({
            pageSize:"10",
            pageNum:this.currentPage,
            "dicKey":""
        })
        this.initKeySelct()

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

