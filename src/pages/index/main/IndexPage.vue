<template>
    <div class="IndexPageRoot">
        <el-container class="IndexPageBaseContainer" style="height: 100%;">
            <el-aside width="80px">
                <el-container style="height: 100%;background-color: #353d40">
                    <el-header :style="asideHeaderStyle">
                        <div>
                            <img src="/src/assets/img/user/640.jpg">
                        </div>
                        <div>
                            <span></span>
                            我的代办
                        </div>
                    </el-header>
                    <el-main>
                        <el-menu :background-color="menuConfig.background_color" :style="asideMenuStyle"  @select="handleIndexMenuSelect" >
                            <el-menu-item
                                    class="VerticalMenuItem"
                                    :style="asideMenuItemStyle"
                                    index="tasks"
                            >
                                任务
                            </el-menu-item>
                            <el-menu-item
                                    class="VerticalMenuItem"
                                    :style="asideMenuItemStyle"
                                    index="short_note"
                            >
                                便签
                            </el-menu-item>
                            <el-menu-item
                                    class="VerticalMenuItem"
                                    :style="asideMenuItemStyle"
                                    index="project"
                            >
                                项目
                            </el-menu-item>
                            <el-menu-item
                                    class="VerticalMenuItem"
                                    :style="asideMenuItemStyle"
                                    index="locations"
                            >
                                地点
                            </el-menu-item>
                            <el-menu-item
                                class="VerticalMenuItem"
                                :style="asideMenuItemStyle"
                                index="tags"
                            >
                                标签
                            </el-menu-item>
                        </el-menu>
                    </el-main>
                    <el-footer style="margin-bottom: 0px;height: 100px;">
                        <div @click="handleIndexFootToolsOfSearchClick($event)">
                            <i class="mars-icons mars-icon-search asideFootIcon"></i>
                        </div>
                        <!--<div>
                            <i class="mars-icons mars-icon-email asideFootIcon" style="font-size: 25px"></i>
                        </div>-->
                        <div>
                            <el-dropdown
                                trigger="click"
                                @command="handleSettingDropDownCommand">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-s-operation asideFootIcon" ></i>
                                </span>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="accountSetting">
                                        账号设置
                                    </el-dropdown-item>
                                    <el-dropdown-item command="useingHelp">
                                        使用帮助
                                    </el-dropdown-item>
                                    <el-dropdown-item command="loginOut">
                                        退出登录
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-footer>
                </el-container>
            </el-aside>
            <el-main>
                <component :is="currentIndexChooseComponentName"></component>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    //api
    import {IndexPageApi} from '~Pages/index/main/IndexPageApi'

    //components
    import BaseProjectComp from '~Components/projects/main/BaseProjectsComp'
    import BaseShortNotesComp from '~Components/short_notes/main/BaseShortNotesComp'
    import BaseTasksComp from '~Components/tasks/main/BaseTasksComp'
    import BaseLocationsComp from '~Components/locations/main/BaseLocationsComp'
    import BaseTagsComp from '~Components/tags/main/BaseTagsComp'
    import BaseTasksSearchComp from '~Components/tasks/tasks_search/main/BaseTasksSearchComp'
    export default {
        name: "IndexPage",
        components:{
            BaseProjectComp,
            BaseShortNotesComp,
            BaseTasksComp,
            BaseLocationsComp,
            BaseTagsComp,
            BaseTasksSearchComp
        },
        data() {
            return {
                currentIndexChooseComponentName:'BaseShortNotesComp',
                asideHeaderStyle:{
                    backgroundColor:'#353d40',
                },
                asideMenuStyle:{
                    padding:'0px 0px',
                    borderRight:'0px'
                },
                asideMenuItemStyle:{
                    padding:'0px 0px'
                },
                menuConfig:{
                    background_color:'#353d40'
                },
                menuAndComponentTransList:[
                    {
                        menuId:'tasks',
                        componentName:'BaseTasksComp'
                    },
                    {
                        menuId:'short_note',
                        componentName:'BaseShortNotesComp'
                    },
                    {
                        menuId:'project',
                        componentName:'BaseProjectComp'
                    },
                    {
                        menuId:'locations',
                        componentName:'BaseLocationsComp'
                    },
                    {
                        menuId:'tags',
                        componentName:'BaseTagsComp'
                    }

                ]
            }
        },
        methods: {
            handleCheckIsUserLogin(){

            },
            handleIndexMenuSelect(index,indexPath) {
                console.log(index + " --> " + indexPath) ;
                this.menuAndComponentTransList.forEach((item) => {
                    if(index == item.menuId ){
                        this.currentIndexChooseComponentName = item.componentName;
                    }
                })
            },
            handleIndexFootToolsOfSearchClick(e) {
                //搜索按钮：切换到 tasks search 页面
                this.currentIndexChooseComponentName = "BaseTasksSearchComp";
            },
            handleSettingDropDownCommand(command) {
                this.dealSettingCommandOfLoginOut(command) ;
            },
            dealSettingCommandOfLoginOut(command){
                var _this = this ;
                _this.$commonEleNotice.msgBox.handleShowSimpleWarningConfirm("是否确认退出登录？").then(res => {
                    _this.$store.commit("LOGIN_ACCOUNT_OUT");
                    _this.$router.push("/");
                }).catch(err => {
                    console.log("取消[退出登录]操作！");
                })

            }
        },
        mounted() {

        },
        watch: {

        }
    }
</script>
<style scoped lang="stylus">
    @import './_IndexPage.styl'
</style>
