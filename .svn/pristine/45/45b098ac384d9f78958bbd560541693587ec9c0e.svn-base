<template>
     <div class="list">
        <div class="contentTitle pdlr20">添加步骤</div>
        <!-- 主版内容 -->

        <div class="step">
            <el-form :inline="true" :model="formData" ref="formData" label-width="100px" class="demo-form-inline table_content">
                <el-form-item label="服务名">
                    <el-input v-model="formData.businessName" placeholder="请输入步骤名称"></el-input>
                </el-form-item>
                <el-form-item label="服务英文名">
                    <!-- <el-input v-model="formData.businessNameEn" placeholder="请选择英文名称"></el-input> -->
                    <!-- <el-select v-model="formData.businessNameEn"  placeholder="请选择英文名称">
                        <el-option
                            v-for="item in businessNameEnList"
                            :key="item.code"
                            :label="item.diseaseEnName"
                            :value="item.diseaseEnName">
                        </el-option> 
                    </el-select> -->
                    <el-autocomplete
                        class="inline-input"
                        v-model="formData.businessNameEn"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="true"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="疾病英文名">
                    <!-- <el-input v-model="formData.diseaseEnName" placeholder="请输入步骤名称"></el-input> -->
                    <!-- <el-select v-model="formData.diseaseEnName"  placeholder="请选择英文名称">
                        <el-option
                            v-for="item in businessNameEnList"
                            :key="item.code"
                            :label="item.diseaseEnName"
                            :value="item.diseaseEnName">
                        </el-option> 
                    </el-select> -->
                    <el-autocomplete
                        class="inline-input"
                        v-model="formData.diseaseEnName"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="true"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="产品列表">
                    <!-- <el-input v-model="formData.geneList" placeholder="请输入列表名"></el-input> -->
                    <el-select v-model="formData.productCode"  placeholder="请选择产品" style="width:201px">
                        <el-option
                            v-for="(item, index) in productCodeList"
                            :key="index"
                            :label="item.productName"
                            :value="item.code">
                        </el-option> 
                    </el-select>
                </el-form-item>

                <!-- <div>
                    <el-form-item label="服务类型">
                        <el-select v-model="formData.businessType"  placeholder="请选择服务类型" style="width:201px">
                            <el-option
                                v-for="item in businessTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option> 
                        </el-select>
                    </el-form-item>
                    <el-form-item label="疾病类型">
                        <el-select v-model="formData.diseaseType"  placeholder="请选择疾病类型" style="width:201px">
                            <el-option
                                v-for="item in diseaseTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option> 
                        </el-select>
                    </el-form-item>
                    <el-form-item label="mesh别名">
                        <el-input v-model="formData.meshAlias" placeholder="请输入别名"></el-input>
                    </el-form-item>
                </div>   -->

                <div>
                    <el-form-item label="服务描述">
                        <el-input type="textarea" class="setHeight" v-model="formData.description" placeholder="请输入内容" style="width:440%"></el-input>
                    </el-form-item>
                    <el-form-item label="报告颜色" class="sortInput" style="margin-left:645px;">
                        <!-- <el-input v-model="wordColor" placeholder="选择报告颜色"></el-input> -->
                        <el-select v-model="formData.wordColor" clearable placeholder="请选择"  style="width:201px">
                            <el-option label="金色" :value="1"></el-option>
                            <el-option label="蓝色" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>  
               
                <div v-for="(val, index1) in formData.steps" class="">
                    <el-form-item label="步骤名称">
                        <el-input v-model="val.stepName" placeholder="请输入步骤名称"></el-input>
                    </el-form-item>
                    <el-form-item label="block类型 ">
                        <el-select class="blockSelect" v-model="val.blockCodes" multiple placeholder="请选择" @focus="getOptionStep(index1)">
                            <el-option
                                v-for="item in optionStep"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="序号" class="sortInput" style="margin-left:300px">
                        <el-input v-model.number="val.sort" type="number" placeholder="数字越小排序越靠前"></el-input>
                    </el-form-item>
                    <el-button type="warning" size="small" @click="delStep(index1)" class="delStep">删 除</el-button>
                </div>

                <div  class="serverBlock">
                    <el-form-item label="服务block">
                        <el-select class="blockSelect" v-model="formData.businesBlockCodes" multiple placeholder="请选择" @focus="getOptionStep()">
                            <el-option
                                v-for="item in optionBusiness"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-button type="warning" size="small" @click="delBusinessBlock(index2)" class="delBusinessBlock">删 除</el-button> -->
                </div>

                <el-form-item label="信号图">
                    <div class="imgContent" v-for="(item, index) in formData.businesDiagramFiles" >
                        <el-button type="warning" size="small" @click="delItem(index)" class="delItem" style="right:-80px"> - 删 除</el-button>
                        <el-form-item :span=12 label="标题" style="margin-left:-20px;" >
                            <el-input :span=16 v-model="item.title" placeholder="请输入标题名称" style="width:100%"></el-input>
                        </el-form-item>
                        <el-upload
                            class="upload-demo"
                            :limit = "1"
                            :action="imgUploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="(file)=>handleRemove(file, index)"
                            :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList, index)"
                            :file-list="item.fileList"
                            :before-upload="(file)=>beforeUpload(file,index)"
                            :headers="uploadHeader"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb <span class="hint">(最多只能上传一张图片)</span></div>
                        </el-upload>
                    </div>
                </el-form-item>
                <br/>
                <el-form-item label="　">
                    <el-button type="primary" @click="addStep"  class="addStep">添加步骤</el-button>
                    <el-button type="primary" @click="addItem" size="" class="addItem">添加信号图</el-button>
                    <el-button type="success"  @click="subStep" class="subStep"> 提 交</el-button>
                    <el-button type="warning"  @click="cancleBtn" class="cancleBtn"> 取 消</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
import URL from '@/common/js/URL.js'
import axios from 'axios'

export default {
    created() {
        this.getBusinessNameEn()
        // 获取首页的产品列表
        this.getProductList()
    },
    data() {
      return {
        productCodeList: [],
        formData: {
            wordColor: 1,
            productCode: '',
            businessName: '',
            businessNameEn: '',
            diseaseEnName: '',
            description: '',
            geneList: '',
            businessType: '',
            diseaseType: '',
            meshAlias: '',
            businesBlockCodes:[],
            steps: [{
                stepName: '',
                blockCodes: [],
                sort: ''
            }],
            businesDiagramFiles: [{
                title: '',
                fileName: '',
                filePath: '',
                code: '',
                contentType: '',
                fileUrl: '',
                fileSize: '',
                fileSuf: '',
                fileList: []
            }],
        },
        businessNameEnList: [],
        businessTypeList: [{label: '全景', value: 1},{label: '全外', value: 2},{label: 'panel', value: 3}],
        diseaseTypeList: [{label: '液体瘤', value: 1},{label: '实体瘤', value: 2}],
        optionStep: [],
        optionBusiness: [],
        imgUploadUrl: URL.api_name + 'cloud/project/addProgramFile',

      }
    },
    methods: {
        getBusinessNameEn() {
            let that = this
            axios.get(URL.api_name + 'cloud/cancerList').then(function(resp){
                if(resp.data.code === "100"){
                    // that.businessNameEnList = resp.data.data
                    for(let i = 0; i < resp.data.data.length - 1; i++){
                        that.businessNameEnList.push({
                            value: resp.data.data[i].diseaseEnName
                        })
                    }
                    // console.log(that.businessNameEnList)
                }
            })
        },
        getOptionStep(index) {
            let that = this
            axios.get(URL.api_name + 'cloud/project/getAllBlocks').then(function(resp){
                // console.log(resp.data.data)
                if(resp.data.code === "100"){
                    that.optionStep = resp.data.data
                    that.optionBusiness = resp.data.data
                }
            })
        },
        getOptionBusiness() {
            let that = this
            axios.get(URL.api_name + 'cloud/project/getAllBlocks').then(function(resp){
                // console.log(resp.data.data)
                if(resp.data.code === "100"){
                    that.optionStep = resp.data.data
                }
            })
        },
        // 添加步骤
        addStep() {
            let that = this;
            that.formData.steps.push({
                stepName: '',
                blockCodes: [],
            })
        },
        // 删除步骤
        delStep(index) {
            let that = this;
            if(that.formData.steps.length < 2){
                this.$alert('至少保留一个选项', '提示', {
                    confirmButtonText: '确定',
                });
            }else{
               that.formData.steps.splice(index,1)
            }
        },
        // // 添加服务
        // addBusinessBlock() {
        //     let that = this;
        //     that.formData.businesBlockCodes.push({
        //         blockCode: ''
        //     })
        // },
        // // 删除服务
        // delBusinessBlock(index) {
        //     let that = this;
        //     that.formData.businesBlockCodes.splice(index,1)
        // },
        // 提交
        subStep() {
            let that = this;
            // 提交前将fileName值 修改为 title值进行提交
            for(let i = 0; i < that.formData.businesDiagramFiles.length; i++) {
                that.formData.businesDiagramFiles[i].fileName = that.formData.businesDiagramFiles[i].title
            }
            // console.log(that.formData)
            // return false
            axios.post(URL.api_name + 'cloud/project/saveBusiness', that.formData).then(function(resp){
                that.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: '1000'
                })
                setTimeout(function(){
                        that.$router.push({
                        path: '/maintainList/1'
                    })
                },1000)
            })
        },
        // 添加图片 && 删除图片
        addItem() {
            let that = this;
            that.formData.businesDiagramFiles.push({
                title: '',
                fileName: '',
                filePath: '',
                code: '',
                contentType: '',
                fileUrl: '',
                fileSize: '',
                fileSuf: '',
                fileList: []
            })
        },
        delItem(index) {
            let that = this;
            that.formData.businesDiagramFiles.splice(index,1)
        },
        // 图片上传
        handleSuccess(resp, file, fileList, index) {
            let that = this
            // alert(index)
            if(resp.code === '100'){
                // 上传图片更新成功，修改图片默认的fileName值为title值
                let titleVal = that.formData.businesDiagramFiles[index].title
                that.formData.businesDiagramFiles[index].fileName = titleVal
                // that.formData.businesDiagramFiles[index].fileName = resp.data.fileName
                that.formData.businesDiagramFiles[index].filePath = resp.data.filePath
                that.formData.businesDiagramFiles[index].code = resp.data.code
                that.formData.businesDiagramFiles[index].contentType = resp.data.contentType
                that.formData.businesDiagramFiles[index].fileUrl = resp.data.fileDownUrl
                that.formData.businesDiagramFiles[index].fileSize = resp.data.fileSize
                that.formData.businesDiagramFiles[index].fileSuf = resp.data.fileSuf
            }
            // console.log(that.formData)
        },
        handleRemove(file, index) {
            let that = this
            that.formData.businesDiagramFiles[index].fileName = '';
            console.log (file);
        },
        handlePreview(file) {
            console.log(file);
        },
        beforeUpload (file,index) {
            if (this.formData.businesDiagramFiles[index].fileName) {
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
                path: '/maintainList/1'
            })
        },
        // 顶部返回
        getBack() {
            this.$router.push({
                path: '/maintainList/1'
            })
        },
        //  添加联想功能
        querySearch(queryString, cb) {
            var businessNameEnList  = this.businessNameEnList;
            var results = queryString ? businessNameEnList .filter(this.createFilter(queryString)) : businessNameEnList ;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (businessNameEnList) => {
                 return (businessNameEnList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        getProductList() {
            var that = this
            axios.get(URL.api_name + 'cloud/project/product_list', {
              params: {
                productName: ''
              }
            }).then(function (res) {
              that.productCodeList = res.data.data
            }, function (error) {
              that.$message({
                type: 'error',
                message: '查询失败',
                duration: 1000
              })
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
/*  */
.nav_title{margin-bottom: 25px}
/* .table_content{border: 1px solid #ccc;width: 40%;padding-bottom: 20px;} */
/* .addBlock{margin-right: -100px;float: right} */
.step_content .step .blockSelect{width:238%}
.step_content .step .serverBlock .blockSelect{width:384%}
.step_content .setHeight .el-textarea__inner{ height:120px;}
/* .step_content .step .serverBlock .sortInput{margin-left: 250px} */
/* .step_content .step .delStep{margin-left: 290px} */
.transfer{margin: 30px 60px;height: 300px;}


/* 删除按钮 */
.step_content .delItem{position: absolute;cursor: pointer}
/* 图片 */
.step_content  .imgContent{border: 1px solid #ccc;border-radius: 5px;width:790px;padding: 20px;margin-bottom: 15px;position: relative;}
.step_content  .el-upload-list--picture .el-upload-list__item{width:500px;}
.step_content  .hint {color: red;}
</style>
