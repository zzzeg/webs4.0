<template>
    <div class="list">
		<div class="contentTitle pdlr20">{{ type == 'edit' ? '修改' : '添加' }}健康风险检测项目</div>
            <div class="roleAdd_content">
                <el-form ref="form" :model="formData" label-width="140px">
                  <el-form-item label="检测项名称">
                    <el-input class="roleInput" v-model="formData.productName" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="系统分类">
                    <el-input class="roleInput" v-model="formData.model" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="基因位点">
                    <el-input class="roleInput" v-model="formData.modelNumber" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="参考文献">
                    <el-input class="roleInput" v-model="formData.lowerMachineNumber" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="项目描述:">
                    <el-input class="roleInput" v-model="formData.description" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="影响因素：">
                    <el-input class="roleInput" v-model="formData.factors" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="饮食建议：">
                    <el-input class="roleInput" v-model="formData.dietaryAdvice" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="生活建议：">
                    <el-input class="roleInput" v-model="formData. lifeAdvice" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="体检建议：">
                    <el-input class="roleInput" v-model="formData.examAdvice" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="科室：">
                    <el-input class="roleInput" v-model="formData.department" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="发病时间：">
                    <el-input class="roleInput" v-model="formData.diseaseTime" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="流行程度：">
                    <el-input class="roleInput" v-model="formData.prevalence" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="高危人群：">
                    <el-input class="roleInput" v-model="formData.riskGroup" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="早期症状：">
                    <el-input class="roleInput" v-model="formData.earlySymptom" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="治疗方法：">
                    <el-input class="roleInput" v-model="formData.treatment" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="中国人患病风险率：">
                    <el-input class="roleInput" v-model="formData.riskRate" name="roleName" placeholder=""></el-input>
                  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="onSubmit" style="margin:30px 10px 0px 0px;">提交</el-button>
                        <el-button v-if="type=='add'" size="medium" @click="onCancle">重置</el-button>
                        <el-button v-else size="medium" @click="onCancle">取消</el-button>
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
          this.getBatchNumberData()
      },
    data() {
      return {
        id: this.$route.params.id,
        type: this.$route.params.type,
        formData: {
          productEnName: '',
          productEnName: '',
          type: '',
          description: '',
          factors: '',
          dietaryAdvice: '',
          lifeAdvice: '',
          examAdvice: '',
          department: '',
          diseaseTime: '',
          prevalence: '',
          riskGroup: '',
          earlySymptom: '',
          treatment: '',
          riskRate: ''
        }
      }
    },
    methods: {
      getBatchNumberData() {
        let that = this
          axios.get(URL.api_name + 'cloud/project/toUpdateBatchNumber', {
              params: {
                  code: that.id
              }
          }).then(function(resp){
              if(resp.data.code === '100'){
                  that.formData = resp.data.data
              }
          })
        },
      onSubmit() {
        let that = this
        axios.post(URL.api_name + 'cloud/project/updateBatchNumber', that.formData).then(function(resp){
            if(resp.data.code === '100'){
                that.$message({
                    type: 'success',
                    message: '修改成功',
                    duration: '1000'
                })
                that.$router.push({
                    path: '/batchNumberList'
                })
            }
        }),function(error){
            that.$message({
                type: 'error',
                message: '修改失败',
                duration: '1000'
            })
        }
      },
      onCancle() {
          this.$router.push({
              path: "/batchNumberList"
          })
      }
    }
  }
</script>

<style>
.roleAdd_content .el-input__inner{width:67%;}
</style>
