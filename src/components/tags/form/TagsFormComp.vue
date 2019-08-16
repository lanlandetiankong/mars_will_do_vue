<template>
    <div>
        <el-dialog width="40%"
            :title="tagFormTitle"
            :visible.sync="isFormDialogVisible"
        >
            <el-form label-width="80px"
                     label-position="right"
                     v-model="tagFormModel"
            >
                <el-form-item prop="name" label="标签名">
                    <el-col :span=20>
                        <el-input
                            v-model="tagFormModel.name">
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item required
                              label="紧急级别">
                    <el-select filterable
                               placeholder="请选择"
                               v-model="tagFormModel.hurryLevel"
                    >
                        <el-option
                            v-for="item of hurryLevels"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="便签1">
                    <el-col :span=20>
                        <el-input
                            v-model="tagFormModel.firstNote">
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item prop="name" label="便签2">
                    <el-col :span=20>
                        <el-input
                            v-model="tagFormModel.secondNote">
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSubmitTagsForm"
                    >
                        确定
                    </el-button>
                    <el-button
                        @click="$emit('edit-form-close',$event)">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {TagsFormCompApi} from './_TagsFormCompApi.js'

    export default {
        name: "TagsFormComp",
        props: {
            tagFormModel: {
                name: '',
                hurryLevel: '',
                secondNote: '',
                firstNote: ''
            },
            isNewForm: Boolean,
            isFormDialogVisible: Boolean,

        },
        data() {
            return {
                newForm: {
                    name: ''
                },
                hurryLevels:[]
            }
        },
        methods: {
            handleSubmitTagsForm(e) {
                var _this = this;
                if (_this.isNewForm == true) {
                    TagsFormCompApi.doCreateTagsForm(_this.tagFormModel).then(res => {
                        _this.$handleShowSimpleNotify.handleShowSuccessNotify(res.info) ;
                    });
                } else {
                    TagsFormCompApi.doUpdateTagsForm(_this.tagFormModel).then(res => {
                        _this.$handleShowSimpleNotify.handleShowSuccessNotify(res.info) ;
                    });
                }
                this.$emit('edit-form-submit', e);
            },
            handleGetTagsHurryLevel() {
                //标签 的 紧急级别
                var _this = this ;
                TagsFormCompApi.doGetTagsHurryLevelBindParam().then(res =>  {
                    _this.hurryLevels = res.enumList ;
                })
            }
        },
        computed: {
            tagFormTitle() {
                if (this.isNewForm == true) {
                    return "新建标签";
                } else {
                    return "编辑标签"
                }
            }
        },
        mounted(){
            var _this = this ;
            _this.handleGetTagsHurryLevel() ;
        }
    }
</script>

<style scoped>
    @import './_TagsFormComp.styl';
</style>
