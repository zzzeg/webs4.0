<template>
     <div class="list">
        <div class="contentTitle pdlr20">服务项目</div>
        <!-- 主版内容 -->

        <div class="items_content">
            <el-form ref="form" :model="formData" label-width="80px">
                <el-form-item label="项目名称">
                    <el-input v-model="formData.name" placeholder="请输入项目名称" style="width:217px"></el-input>
                </el-form-item>
                <el-form-item label="癌种 ">
                    <el-select v-model="formData.cancerCodes" multiple class="inputItem" placeholder="请选择癌种类型" @focus="">
                        <el-option
                            v-for="item in optionItem"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size='mini' @click="addCancerCodes"> + </el-button>
                </el-form-item>

                <!-- 添加癌种类型 -->
                <div class="cancerCodesVal" v-if="cancersFlag === true">
                    <el-form-item label="新增癌种" v-for="(val, index) in formData1.cancers" :key="index">
                        <el-input v-model="val.name" placeholder="中文名" style="width:217px"></el-input>
                        <el-input v-model="val.diseaseEnName" placeholder="英文名" style="width:217px"></el-input>
                        <el-button type="danger" size='mini' @click="delCancerCodes(index)"> - </el-button>
                    </el-form-item>
                    <el-button type="success" size='mini' @click="subCancerCodes"> 提交 </el-button>
                    <el-button type="danger" size='mini' @click="canCancerCodes"> 取消 </el-button>
                </div>

                <el-form-item label="测序类型">
                    <el-input v-model="formData.sequencingType" placeholder="请输入测序类型" style="width:217px"></el-input>
                </el-form-item>
                <el-form-item label="上传标题">
                    <el-input v-model="formData.uploadTitle" placeholder="请输入上传文件名称" style="width:217px"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input type="textarea" class="setHeight" v-model="formData.description" style="width:43%;" placeholder="请输入项目描述" ></el-input>
                </el-form-item>
                <el-form-item label="上传描述">
                    <el-input type="textarea" class="setHeight" v-model="formData.uploadDescription" style="width:43%;" placeholder="请输入上传描述" ></el-input>
                </el-form-item>
               
               
                <!-- <el-button type="primary" @click="addItem"  class="addItem">添 加</el-button> -->
                <el-button type="success"  @click="subItem" class="subItem"> 提 交</el-button>
                <el-button  @click="cancleBtn" class="subItem"> 取 消</el-button>
            </el-form>
        </div>


    </div>
</template>

<script>
import URL from '@/common/js/URL.js'
import axios from 'axios'

export default {
    created() {
        this.getOptionStep();
    },
    data() {
      return {
        formData: {
            name: '',
            cancerCodes: [],
            description: '',
            uploadTitle: '',
            programDiagramFiles: [{
                title: '',
                fileName: '',
                filePath: '',
                fileUrl: ''
            }],
        },
        formData1: {
            cancers: []
        },
        cancersFlag: false,
        optionItem: [],
        imgUploadUrl: URL.api_name + 'cloud/project/addProgramFile',
        fileList: []
      }
    },
    methods: {
        // 获取项目列表数据
        getOptionStep() {
            let that = this
            axios.get(URL.api_name + 'cloud/cancerList').then(function(resp){
                if(resp.data.code === "100"){
                    that.optionItem = resp.data.data
                }
            })
        },
        addItem() {
            let that = this;
            that.formData.programDiagramFiles.push({
                title: '',
                fileName: '',
                filePath: '',
                fileUrl: ''
            })
        },
        //  添加癌种类型
        addCancerCodes() {
            let that = this;
            that.cancersFlag = true;
            that.formData1.cancers.push({
                code: '',
                name: '',
                diseaseEnName: ''
            })
            // console.log(that.formData1.cancers)
        },
        //  删除癌种
        delCancerCodes(index) {
            let that = this;
            that.formData1.cancers.splice(index, 1)
        },
        subCancerCodes() {
            let that = this;
            // console.log(that.formData1)
            axios.post(URL.api_name + '/cloud/insertCancerList', that.formData1).then(function(resp){
                if(resp.data.code === '100'){
                    that.$message({
                        type: 'success',
                        message: '提交成功',
                        duration: 1000
                    })
                    setTimeout(function(){
                        that.cancersFlag = false;
                        that.formData1.cancers = []
                        that.getOptionStep()
                    },1000)
                }
            })
           
        },
        canCancerCodes() {
            this.cancersFlag = false;
            this.formData1.cancers = []
        },
        delItem(index) {
            let that = this;
            that.formData.programDiagramFiles.splice(index,1)
        },
        subItem() {
            let that = this;
            console.log(that.formData)

            
            // return false
            axios.post(URL.api_name + 'cloud/project/saveorupdateprogram', that.formData).then(function(resp){
                if(resp.data.code === '100'){
                    that.$message({
                        type: 'success',
                        message: '提交成功',
                        duration: 1000
                    })
                    setTimeout(function(){
                        that.$router.push({
                             path: '/maintainItemsList/1'
                        })
                    },1000)
                }
            })
            
        },
        getBack() {
            this.$router.push({
                path: 'maintainItemsList/1'
            })
        },
        // 图片上传
        handleSuccess(resp, file, fileList, index) {
            let that = this
            // alert(index)
            if(resp.code === '100'){
                // that.formData.programDiagramFiles[index].fileName = resp.data.fileName
                // that.formData.programDiagramFiles[index].filePath = resp.data.filePath
                // that.formData.programDiagramFiles[index].fileUrl = resp.data.fileDownUrl
                let titleVal = that.formData.programDiagramFiles[index].title
                that.formData.programDiagramFiles[index] = resp.data
                that.formData.programDiagramFiles[index].fileName = titleVal
                // console.log(that.formData.programDiagramFiles[index])
            }
        },
        handleRemove(file, fileList) {
            console.log (file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        beforeUpload (file,index) {
            if (this.formData.programDiagramFiles[index].fileName) {
                this.$message({
                    type: 'error',
                    message: '最多上传一张图片',
                    duration: 1000
                 })
            return false
            }
        },
        cancleBtn() {
            this.$router.push({
                path: '/maintainItemsList/1'
            })
        }
    },
    computed: {
      uploadHeader () {
        return {
          token: JSON.parse(localStorage.getItem('authtoken'))
        }
      }
    }


}
</script>


<style>
a{text-decoration: none;}
/* 添加block按钮 */
.items_content{padding-bottom: 50px}
/* 删除按钮 */
.items_content .delItem{position: absolute;cursor: pointer}
/*  */
/* 癌种类型边框 */
.items_content .cancerCodesVal{border: 1px solid #ccc;padding: 10px;margin-bottom:20px;
    border-radius: 5px;
    width: 35%;}
.nav_title{margin-bottom: 25px}
.transfer{margin: 30px 60px;height: 300px;}
.items_content  .el-input__inner{width:100%;}
.items_content .imgContent .el-input__inner{width:48%;}
.items_content .addItem{margin-left: 78px}
.items_content .setHeight .el-textarea__inner{ height:120px;}
/* 图片 */
.items_content  .imgContent{border: 1px solid #ccc;border-radius: 5px;width:40.2%;padding: 20px;margin-bottom: 15px;position: relative;}
.items_content  .el-upload-list--picture .el-upload-list__item{width:500px;}
.items_content .hint {color: red;}
</style>
