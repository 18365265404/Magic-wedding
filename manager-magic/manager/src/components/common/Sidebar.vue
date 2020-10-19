<template>
    <div class="sidebar" >
        <el-menu style="overflow:hidden" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9"  active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <!-- <template v-if="item.subdirectoryList"> -->
                    <el-submenu :index="item.resourceUrl" :key="item.resourceUrl">
                       <template slot="title">
                           
                            <span>{{ item.resourceName }}</span>
                       </template>
                        <template v-for="subItem in item.subdirectoryList">
                            <el-submenu v-if="subItem.subdirectoryList" :index="subItem.resourceSort" :key="subItem.resourceSort">
                                <template slot="resourceName">{{ subItem.resourceName }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.resourceSort">
                                    {{ threeItem.resourceName }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.resourceUrl" :key="subItem.resourceUrl">
                               {{ subItem.resourceName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                <!-- </template> -->
                <!-- <template v-else>
                    <el-menu-item :index="item.resourceUrl" :key="item.resourceUrl">
                        <i :class="item.icon"></i><span slot="resourceName">{{ item.resourceName }}</span>
                    </el-menu-item>
                </template> -->
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import sessionStorage from '../../utils/sessionStorage'
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        id: "1",
                        pid: "1",
                        resourceName: "系统中心",
                        resourceSort: "1",
                        resourceUrl: "systemCenter1",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部字典",
                            resourceSort: "1",
                            resourceUrl: "dictionary"
                           }
                        ]
                    },
                    {
                        id: "2",
                        pid: "2",
                        resourceName: "轮播图",
                        resourceSort: "2",
                        resourceUrl: "systemCenter2",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部轮播图",
                            resourceSort: "1",
                            resourceUrl: "banner"
                           }
                        ]
                    },
                    {
                        id: "3",
                        pid: "3",
                        resourceName: "文图",
                        resourceSort: "3",
                        resourceUrl: "systemCenter3",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "首页文图",
                            resourceSort: "1",
                            resourceUrl: "imageText1"
                           },
                           {
                            id: "2",
                            pid: "2",
                            resourceName: "更多文图",
                            resourceSort: "2",
                            resourceUrl: "imageText2"
                           }
                        ]
                    },
                    {
                        id: "4",
                        pid: "4",
                        resourceName: "查询条件",
                        resourceSort: "4",
                        resourceUrl: "systemCenter4",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "条件管理",
                            resourceSort: "1",
                            resourceUrl: "classify"
                           }
                        ]
                    },
                    {
                        id: "5",
                        pid: "5",
                        resourceName: "婚礼婚品",
                        resourceSort: "5",
                        resourceUrl: "systemCenter5",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部婚礼婚品",
                            resourceSort: "1",
                            resourceUrl: "weddingShop"
                           }
                        ]
                    },
                    {
                        id: "6",
                        pid: "6",
                        resourceName: "视觉展示",
                        resourceSort: "6",
                        resourceUrl: "systemCenter6",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部视觉展示",
                            resourceSort: "1",
                            resourceUrl: "visual"
                           }
                        ]
                    },
                    {
                        id: "7",
                        pid: "7",
                        resourceName: "策划布置",
                        resourceSort: "7",
                        resourceUrl: "systemCenter7",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部策划布置",
                            resourceSort: "1",
                            resourceUrl: "scheme"
                           }
                        ]
                    },
                    {
                        id: "8",
                        pid: "8",
                        resourceName: "婚礼花艺",
                        resourceSort: "8",
                        resourceUrl: "systemCenter8",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部婚礼花艺",
                            resourceSort: "1",
                            resourceUrl: "flower"
                           }
                        ]
                    },
                    {
                        id: "9",
                        pid: "9",
                        resourceName: "婚礼设计",
                        resourceSort: "9",
                        resourceUrl: "systemCenter9",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部婚礼设计",
                            resourceSort: "1",
                            resourceUrl: "design"
                           }
                        ]
                    },
                    {
                        id: "10",
                        pid: "10",
                        resourceName: "摄像视频",
                        resourceSort: "10",
                        resourceUrl: "systemCenter10",
                        subdirectoryList:[
                           {
                            id: "1",
                            pid: "1",
                            resourceName: "全部摄像视频",
                            resourceSort: "1",
                            resourceUrl: "video"
                           }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
        },
        created(){
                
            // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
            // this.items=sessionStorage.getSessionStorage("ms_siderBar")
            // console.log("0000000000000000",sessionStorage.getSessionStorage("ms_siderBar"))
            
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 50px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 165px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
