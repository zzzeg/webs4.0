<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data"
         element-loading-text="拼命加载中">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px">
        <el-form-item label="原密码：" prop="oldPassword">
          <el-col :span="6">
            <el-input type="password" v-model="formData.oldPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-col :span="6">
            <el-input type="password" v-model="formData.newPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="重复新密码：" prop="reNewPassword">
          <el-col :span="6">
            <el-input type="password" v-model="formData.reNewPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="sub('formData')">
              {{ isLoading ? '正在修改' : '修改' }}
          </el-button>
          <el-button @click="$router.go('-1')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    data () {
      return {
        formData: {
          newPassword: '',
          oldPassword: '',
          reNewPassword: ''
          // userName: JSON.parse(localStorage.getItem('userinfo')).userName
        },
        // dialogVisible: false,
        isLoading: false,
        rules: {
          oldPassword: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          reNewPassword: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { required: true,min: 6, message: '密码长度不能低于6位', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            if (that.formData.newPassword !== that.formData.reNewPassword) {
              that.$message({
                message: '两次密码不一致',
                type: 'error'
              })
              return false
            }
            that.isLoading = true
            axios.post(URL.api_name + 'cloud/modify_password', that.formData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.$message({
                  message: res.data.message,
                  type: 'success'
                })
              } else {
                that.$message({
                  message: '提交失败,请重新输入',
                  type: 'error',
                  duration: 1000
                })
              }
            })
            // that.isLoading = false
          } else {
            // 上面是验证失败...
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
