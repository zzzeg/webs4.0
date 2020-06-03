<template>
    <div class="list">
        <div class="contentTitle pdlr20">绑定项目</div>
            <el-form :inline="true" :model="formData" ref="formData" label-width="100px" class="demo-form-inline table_content">
               
                <div v-for="(item, index) in formData.businessPrograms" class="">
                    <el-form-item label="项目名称 ">
                        <el-select class="" v-model="item.programCode"  placeholder="请选择">
                            <el-option
                                v-for="item in data"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否检测 ">
                        <el-select class="" v-model="item.needAnalysis"  placeholder="请选择">
                            <el-option
                                v-for="item in optionStatus"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="warning" size="small" @click="delStep(index)" class="delStep">删 除</el-button>
                </div>

                <el-form-item label="　">
                    <el-button type="primary" @click="addItem"  class="addItem">添加项目</el-button>
                    <el-button type="success"  @click="subItem" class="subStep"> 提 交</el-button>
                    <el-button type="warning"  @click="cancleBtn" class="cancleBtn"> 取 消</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
import URL from '@/common/js/URL.js'
import axios from 'axios'

export default {
    created() {
        this.getBindProgram()
    },
    data() {
      const generateData = _ => {
        let that = this
        let dataList = []
        let data = [];
        axios.get(URL.api_name + 'cloud/project/programlist', {
            params: {
                name: '',
                pageSize: 10,
                pageNumber: 1
            }
        }).then(function(resp){
            if(resp.data.code === '100'){
                dataList = resp.data.data.list
                for(var i = 0; i < dataList.length; i++){
                    data.push({
                        key: dataList[i].code,
                        label: dataList[i].name
                    })
                }
                data = dataList
            }
        })
        for (let i = 0; i < data.length; i++) {
          data.push({
            key: data[i].code,
            label: data[i].label
            // disabled: i % 4 === 0
          });
        }
        return data;
        };
        return {
            data: generateData(),
            formData: {
                businessPrograms: [
                    {programCode: '', needAnalysis: '', businessCode: ''}
                ]
            },
            optionStatus: [
                {name: '是', code: 1},
                {name: '否', code: 0}
            ],
            name: '',
            pageSize: 10,
            pageNumber: 1,
            pager: this.$route.params.pager,
        };
    },
    methods: {
        getBindProgram() {
            let that = this
            axios.get(URL.api_name + 'cloud/project/getBindProgram', {
                params: {
                    businesCode: that.$route.params.id
                }
            }).then(function(resp){
                let programCodesLength = resp.data.data.programCodes
                if(resp.data.code === '100'){
                    // alert(programCodesLength)
                    that.formData.businessPrograms = resp.data.data.businessPrograms
                    // if(programCodesLength){
                    //     for(let i = 0; i < resp.data.data.programCodes.length; i++){
                    //         that.formData.businessPrograms.push({
                    //             programCode: resp.data.data.programCodes[i].programCode,
                    //             needAnalysis: resp.data.data.programCodes[i].needAnalysis
                    //         })
                    //         // console.log(that.data)
                    //     }
                    // }else {
                    //     return
                    // }
            }
            })
        },
        subItem() {
            let that = this
            console.log(that.formData)
            // return false
            for(let i = 0; i < that.formData.businessPrograms.length; i++){
                that.formData.businessPrograms[i].businessCode = that.$route.params.id
            }
            let paramsVal = {
                businesCode: that.$route.params.id,
                businessPrograms: that.formData.businessPrograms
            }
            axios.post(URL.api_name + 'cloud/project/bindProgram', paramsVal
            ).then(function(resp){
                if(resp.data.code === '100'){
                    that.$message({
                        type: 'success',
                        message: '绑定成功',
                        duration: 1000
                    })
                    setTimeout(function() {
                        that.$router.push({
                            path: '/maintainList/' + that.pager
                        })
                    }, 1000);
                }
            },function(error){
                that.$message({
                    type: 'error',
                    message: '绑定失败',
                    duration: 1000
                })
            })
        },
        cancleBtn() {
            this.$router.push({
                path: '/maintainList/' + this.pager
            })  
        },
        // 添加步骤
        addItem() {
            let that = this;
            that.formData.businessPrograms.push({
                programCode: '',
                needAnalysis: '',
                businessCode: ''
            })
        },     
        // 删除
        delStep(index) {
            let that = this;
            if(that.formData.businessPrograms.length < 2){
                this.$alert('至少保留一个选项', '提示', {
                    confirmButtonText: '确定',
                });
            }else{
               that.formData.businessPrograms.splice(index,1)
            }
        },   
        // 顶部返回
        getBack() {
            this.$router.push({
                path: '/maintainList/' + this.pager
            })
        }
    }

}
</script>

<style>
.transfer_content .subItem{margin:15px 0 0 0px;}
.transfer_content .el-transfer-panel{width:30%;}
.transfer_content  .el-transfer-panel__list{height: 400px}
.transfer_content  .el-transfer-panel__body{height: 400px}
</style>
