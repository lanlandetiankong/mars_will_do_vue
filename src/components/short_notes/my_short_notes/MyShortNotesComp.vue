<template xmlns="http://www.w3.org/1999/html">
    <div style="height: 100%">
        <el-container>
            <el-header height="50px">
                <el-row :gutter="30"
                        type="flex" justify="end"
                >
                    <el-col :span=2
                    >
                        <el-button round
                                   type="success"
                                   icon="el-icon-check"
                                   @click="handleAddShortNotes"
                        >
                            提交
                        </el-button>
                    </el-col>
                    <el-col :span=8>
                        <el-input placeholder="根据便签内容查询" style="width: 100%"
                                  v-model="searchObj.value"
                        >
                        </el-input>
                    </el-col>
                    <el-col :span=2>
                        <el-button round
                                   icon="el-icon-search"
                                   type="primary"
                                   @click="handleGetMyShortNotes"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div>
                    <el-form ref="newShortNotesForm"
                             v-model="newForm">
                        <el-input clearable
                                  type="textarea"
                                  autofocus
                                  v-model="newForm.content"
                                  :autosize="{minRows:2,maxRows:4}"
                                  placeholder="在此处编辑新便签内容,结束时点击上方 ✔ 按钮进行提交保存！"
                        >
                        </el-input>
                    </el-form>
                </div>
                <br>
                <el-row :gutter=20>
                    <el-col
                        :span=5
                        v-for="item of shortNoteList"
                        :key="item.id"
                    >
                        <el-card
                            :body-style="myShortNotesCompAddedDropDownStyle"
                            shadow="alaway"
                        >
                            <div slot="header">
                                <el-tag type="warning" effect="dark">{{item.createDateStr}}
                                </el-tag>
                                <el-dropdown size="mini"
                                             class="myShortNotesCompAddedDropDownCls"
                                             :style="myShortNotesCompAddedDropDownStyle"
                                             @command="handleSettingCommand($event,item)"
                                >
                                   <span>
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="editShortNote">
                                            编辑
                                        </el-dropdown-item>
                                        <el-dropdown-item command="deleteShortNote">
                                            删除
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div>
                                {{item.content}}
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <template>
            <my-short-notes-edit-form-comp
                :editForm="editForm"
                :editDialog="editDialog"
                @edit-form-submit="handleUpdateFormSubmit"
                @edit-form-close="handleCloseUpdateDialog"
            >
            </my-short-notes-edit-form-comp>
        </template>
    </div>
</template>
<script>
    import {MyShortNotesCmopApi} from './_MyShortNotesComp'
    import MyShortNotesEditFormComp from '../form/edit/MyShortNotesEditFormComp'

    export default {
        name: "MyShortNotesComp",
        components: {
            MyShortNotesEditFormComp
        },
        data() {
            return {
                tasksActiveTabName: 'myShortNotesTabName',
                newShortNotesModel: '',
                myShortNotesCompCommonHeight: 300,
                myShortNotesCompAddedDropDownStyle: {
                    height: this.myShortNotesCompCommonHeight
                },
                searchObj: {
                    value: ''
                },
                defaultForm: {
                    content: ''
                },
                newForm: {
                    content: ''
                },
                editDialog: {
                    isVisibleSync: false,
                    defaultEditForm: {
                        id: '',
                        content: ''
                    },
                },
                editForm: {
                    id: '',
                    content: ''
                },
                shortNoteList: []
            }
        },
        methods: {
            handleAddShortNotes(e) {
                //新增便签
                var _this = this;
                var _newContent = _this.newForm.content;
                if (_newContent == "") {
                    _this.$handleShowSimpleNotify.handleShowWarningNotify("请先输入有效文字后再点击保存！", 3000);
                    return false;
                }
                MyShortNotesCmopApi.doAddMyShortNote(_this.newForm).then(res => {
                    _this.handleGetMyShortNotes();
                    _this.newForm = _this.defaultForm;
                    _this.$handleShowSimpleNotify.handleShowSuccessNotify(res.info, 3000);
                })
            },
            handleGetMyShortNotes() {
                var _this = this;
                MyShortNotesCmopApi.doGetMyShortNotes(_this.searchObj).then(res => {
                    _this.shortNoteList = res.resultList;
                })
            },
            handleSettingCommand(command, item) {
                var _this = this;
                if (typeof command == "undefined") {
                    _this.$handleShowSimpleNotify.handleShowWarningNotify("未为该下拉菜单设置Command!");
                    return false;
                }
                if ("editShortNote" == command) {
                    _this.handleEditShortNotes(command, item);
                } else if ("deleteShortNote" == command) {
                    _this.handleDeleteShortNotes(command, item);
                }
            },
            handleEditShortNotes(command, item) {
                var _this = this;
                _this.editDialog.isVisibleSync = true;
                MyShortNotesCmopApi.doGetMyShortNotesById(item).then(res => {
                    _this.editForm = res.bean;
                })
            },
            handleDeleteShortNotes(command, item) {
                var _this = this;
                MyShortNotesCmopApi.doDeleteMyShortNotes(item).then(res => {
                    _this.handleGetMyShortNotes();
                    _this.$handleShowSimpleNotify.handleShowSuccessNotify(res.info, 3000);
                });
            },
            handleUpdateFormSubmit(e) {
                var _this = this;
                _this.handleCloseUpdateDialog(e);
                _this.handleGetMyShortNotes();
            },
            handleCloseUpdateDialog(e) {
                var _this = this;
                this.editForm = _this.editDialog.defaultEditForm;
                this.editDialog.isVisibleSync = false;
            }
        },
        mounted() {
            var _this = this;
            _this.handleGetMyShortNotes();
        }
    }
</script>
<style scoped lang="stylus">
    @import './_MyShortNotesComp.styl'
</style>
