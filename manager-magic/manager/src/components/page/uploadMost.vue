<template>
    <div>
        <!-- <el-upload
            action="http://upload.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="uploadData"
            :on-success="handleGoodsImagesUploadSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt=""> -->


        <div style="padding-bottom:50px; border-bottom:1px solid #333333">
            <el-upload
                :data="uploadData"
                :limit="9"
                multiple
                class="upload-demo"
                ref="uploadDetail"
                action="http://upload.qiniup.com"
                list-type="picture"
                :on-success="updateDetailSuccess"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :on-preview="handlePreview"
                :before-upload="beforeUpload"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadDetail">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">图片的尺寸为：694px * 340px</div>
                </el-upload>
        </div>
        <!-- <el-upload
                ref="uploadDetail"
                name="file"
                :limit="8"
                multiple
                class="avatar-uploader"
                action=""
                :show-file-list="true"
                :file-list="fileList"
                :auto-upload="false"
                list-type="picture"
                :http-request="uploadFile"
                style="padding-bottom:20px;margin-left:3%;margin-right:4%">

                <div style="display:flex">
                    <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                    <p style="line-height:40px;margin-left:30px">(建议图片大小：800*450)</p>
                    
                </div>
                
               
                
            </el-upload>
            <el-button   style="margin-left:0;width:100%;margin-right:3%" slot="trigger" size="small" type="primary" @click="subHallDetail">提交</el-button> -->
    </div>


    
</template>

<script>
import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest,uploadFileRequest} from '../../utils/api';

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        uploadData:{
            token:""
        },
        uploadNum:0,
        imgListLength:'',
        fileList: [],
        
      };
    },
    methods: {
    handleChange(file, fileList) {
       this.imgListLength=fileList.length
       console.log("显示图的长度",this.imgListLength)
        // console.log("00000000000000000",file)
    //    console.log("9999999999999",fileList)
      },




        submitUploadDetail() {
            
            this.$refs.uploadDetail.submit();
           
        },

        updateDetailSuccess(response, file, fileList){
           console.log(1111111111111111,response)
            console.log(22222222222,file)
             console.log(33333333,fileList)
              this.uploadNum++
            if(this.uploadNum==this.imgListLength){
                let fileKeys=[]
                for(let i=0;i<fileList.length;i++){
                    fileKeys.push(fileList[i].response.key)
                }
                
                // alert("上传好了哦")
                console.log("要传给后端的key集合",fileKeys)
            }
        } ,









        beforeUpload(file) {
            // this.newFile=file
            // if(true){
            //     alert()
            // }
            // return true
        },

        // 点击上传
        subHallDetail(){
            this.formDate = new FormData()
            this.$refs.uploadDetail.submit();
            
            
            this.formDate.append('token', this.uploadData.token);
               
                        
            console.log("表单的内容",this.$refs.uploadDetail)

            uploadFileRequest('http://upload.qiniup.com',this.formDate).then(data=> {
                
                console.log("上传的成功返归",data)
               
                                  

                })   
        },

       
















             handlePreview(file) {
        console.log("file",file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      initData(pamas){
            postRequest('/test/get', pamas).then(data=> {


                console.log("初始化数据111111111",data.data.data)
                this.uploadData.token=data.data.data
                        
            });     
        },
        uploadFile(file){
            this.formDate.append('file', file.file);
        },
    },
    created(){
        this.initData()
        
    }
  }
</script>