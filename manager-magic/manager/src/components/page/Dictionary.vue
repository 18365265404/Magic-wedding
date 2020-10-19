<template>
    <div class="userMessage  content">

        
        <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            >

           <el-table-column
            type="index"
            >
            </el-table-column>

           


            <el-table-column
            prop="dicKey"
            label="DictionaryKey"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="list"
            label="DictionaryDescribe"
            show-overflow-tooltip>
            <template    slot-scope="scope">            
                <ul style="display:flex; flex-wrap:wrap">
                    <li v-for="(item) in scope.row.list" :key="item.id" style="margin-right:10px">
                        {{item.dicDescribe}}
                    </li>
                </ul>    
            </template>  
    
            </el-table-column>




        </el-table>
<!-- 分页 -->
          <div class="block" style="overflow:hidden">

                <el-pagination
                style="float:right; margin-right:10%"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="navigatepageNums"
                :page-size="100"
                layout="total, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>





        
    </div>
</template>
<script>

import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest} from '../../utils/api';
export default {
    data(){



    

        return{
           
            currentPage: 1,
            navigatepageNums:[],
            tableList:[]
        }
    },
    methods:{
// f分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            
        },

        initData(){
            postRequest(url.initGetDictionaryList, {}).then(data=> {
                this.tableList=data.data.data
                console.log("查询所有",data)

                   
            });
        },
 
    },
    computed:{
        
    },
    created(){
        this.initData()
        
    }

    
}
</script>

<style scoped>
.check-content{
    width: 90%;
    margin-left: 5%;

}
.checkul{
    margin-top: 20px;
    display: flex;
    justify-content: space-between
}
</style>
