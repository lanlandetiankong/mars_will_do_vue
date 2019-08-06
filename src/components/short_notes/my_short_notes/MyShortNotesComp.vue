<template xmlns="http://www.w3.org/1999/html">
    <div style="height: 100%">
        <el-row>
            <el-col
                :span=5
            >
                <el-input
                    type="textarea"
                    autofocus
                    v-model="newShortNotesModel"
                    placeholder="输入备忘按Ctrl+Enter完成"
                    :clearable=true>
                </el-input>
            </el-col>
            <el-col
                :span=4
            >
               <el-card
                   :body-style="myShortNotesCompAddedDropDownStyle"
                   shadow="alaway"
               >
                   <div slot="header">
                       <el-tag type="info">2019-10-11 12:00:10</el-tag>
                       <el-dropdown
                           class="myShortNotesCompAddedDropDownCls"
                           :style="myShortNotesCompAddedDropDownStyle"
                           size="mini"
                       >
                           <span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                           <el-dropdown-menu slot="dropdown">
                               <el-dropdown-item>
                                   编辑
                               </el-dropdown-item>
                               <el-dropdown-item>
                                   删除
                               </el-dropdown-item>
                           </el-dropdown-menu>

                       </el-dropdown>
                   </div>
                   <div>
                       这是一段长文字 这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字这是一段长文字
                   </div>
               </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "MyShortNotesComp",
        data() {
            return {
                tasksActiveTabName:'myShortNotesTabName',
                newShortNotesModel:'',
                myShortNotesCompCommonHeight:300,
                myShortNotesCompAddedDropDownStyle:{
                    height:this.myShortNotesCompCommonHeight
                }
            }
        },
        methods:{

        }
    }
</script>
<style scoped lang="stylus">
    @import './_MyShortNotesComp.styl'
</style>
