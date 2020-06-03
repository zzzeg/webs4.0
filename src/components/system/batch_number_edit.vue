<template>
    <div class="list">
		<div class="contentTitle pdlr20">修改批次号</div>
            <div class="roleAdd_content">
                <el-form ref="form" :model="formData" label-width="100px">
                  <el-form-item label="实验室缩写">
                    <el-input class="roleInput" v-model="formData.labAbbr" name="roleName" placeholder="请输入实验室英文缩写"></el-input>
                  </el-form-item>
                  <el-form-item label="机型">
                    <el-input class="roleInput" v-model="formData.model" name="roleName" placeholder="请输入机型"></el-input>
                  </el-form-item>
                  <el-form-item label="机器编号">
                    <el-input class="roleInput" v-model="formData.modelNumber" name="roleName" placeholder="请输入机器编号"></el-input>
                  </el-form-item>
                  <el-form-item label="下机号">
                    <el-input class="roleInput" v-model="formData.lowerMachineNumber" name="roleName" placeholder="请输入下机号"></el-input>
                  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="onSubmit" style="margin:30px 10px 0px 0px;">保存</el-button>
                        <el-button size="medium" @click="onCancle">取消</el-button>
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
        formData: {
          labAbbr: '',
          model: '',
          modelNumber: '',
          lowerMachineNumber: '',
          code: ''
        }
      }
    },
    methods: {
      getBatchNumberData() {
        let that = this
          axios.get(URL.api_name + 'cloud/project/toUpdateBatchNumber', {
              params: {
                  code: that.$route.params.id
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
.roleAdd_content .el-input__inner{width:17%;}
</style>
