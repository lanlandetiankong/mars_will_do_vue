<template>
    <div class="projectArchiveListCompRootCls">
        <el-row
            :gutter=1
        >
            <el-col
                :span=8
            >
                <div class="projectArchiveListCompContainerCls">
                    <el-container>
                        <el-header height="25px">
                            <span>测试任务1</span>
                            <el-dropdown
                                style="float: right;margin-top: -8px"
                            >
                                <el-button
                                    icon="mars-icons mars-icon-down"
                                    size="mini"
                                    type="primary"

                                >
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  @click.native="handleArchiveItemEditClick($event,'sdksds')">编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                    <el-dropdown-item>归档</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </el-header>
                        <el-main class="projectArchiveListCompContainerMainCls">
                                <el-tag>总任务：99</el-tag>
                                <el-tag>已完成：100</el-tag>
                                <el-tag>进度数：100%</el-tag>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
            <el-col
                :span=8
            >
                <div class="projectArchiveListCompContainerCls">
                    <el-container>
                        <el-header height="25px">
                            <span>测试任务1</span>
                            <el-dropdown
                                style="float: right;margin-top: -8px"
                            >
                                <el-button
                                    icon="mars-icons mars-icon-down"
                                    size="mini"
                                    type="primary"

                                >
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  @click.native="handleArchiveItemEditClick($event,'sdksds')">编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                    <el-dropdown-item>归档</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </el-header>
                        <el-main class="projectArchiveListCompContainerMainCls">
                            <el-tag>总任务：99</el-tag>
                            <el-tag>已完成：100</el-tag>
                            <el-tag>进度数：100%</el-tag>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
            <el-col
                :span=8
            >
                <div class="projectArchiveListCompContainerCls">
                    <el-container>
                        <el-header height="25px">
                            <span>测试任务1</span>
                            <el-dropdown
                                style="float: right;margin-top: -8px"
                            >
                                <el-button
                                    icon="mars-icons mars-icon-down"
                                    size="mini"
                                    type="primary"

                                >
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  @click.native="handleArchiveItemEditClick($event,'sdksds')">编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                    <el-dropdown-item>归档</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </el-header>
                        <el-main class="projectArchiveListCompContainerMainCls">
                            <el-tag>总任务：99</el-tag>
                            <el-tag>已完成：100</el-tag>
                            <el-tag>进度数：100%</el-tag>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
            <el-col
                :span=8
            >
                <div class="projectArchiveListCompContainerCls">
                    <el-container>
                        <el-header height="25px">
                            <span>测试任务1</span>
                            <el-dropdown
                                style="float: right;margin-top: -8px"
                            >
                                <el-button
                                    icon="mars-icons mars-icon-down"
                                    size="mini"
                                    type="primary"

                                >
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  @click.native="handleArchiveItemEditClick($event,'sdksds')">编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                    <el-dropdown-item>归档</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </el-header>
                        <el-main class="projectArchiveListCompContainerMainCls">
                            <el-tag>总任务：99</el-tag>
                            <el-tag>已完成：100</el-tag>
                            <el-tag>进度数：100%</el-tag>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "ProjectArchiveListComp",
        data() {
            return {

            }
        },
        methods:{
            handleArchiveItemEditClick(e,param) {
                console.log(e) ;
                console.log(param) ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_ProjectsArchiveListComp.styl'
</style>
