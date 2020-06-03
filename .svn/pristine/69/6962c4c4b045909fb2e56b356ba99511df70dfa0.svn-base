<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 流程管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加脚本</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data"
         element-loading-text="拼命加载中">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px">
        <el-form-item label="脚本类型：" prop="language">
          <el-col :span="9">
            <el-select v-model="formData.language" clearable placeholder="请选择">
              <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="上传脚本：">
          <el-col :span="9">
            <el-upload
              :action="uploadAction"
              list-type="picture"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="uploadHeader"
              :file-list="fileList"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传脚本文件，且不超过xxMb</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="sub('formData')">
              {{ isLoading ? '正在提交' : '提交' }}
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
          flowCode: '',
          language: '',
          scriptInfo: []
          // name+scriptUrl
        },
        uploadAction: URL.api_name + 'cloud/upload_script',
        fileList: [],
        searchTypes: [{
          value: '1',
          label: 'python'
        }, {
          value: '2',
          label: 'javascript'
        }, {
          value: '3',
          label: 'java'
        }, {
          value: '4',
          label: 'other'
        }],
        rules: {
          language: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        isLoading: false
      }
    },
    methods: {
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            axios.post(URL.api_name + 'cloud/modify_script', that.formData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.$message({
                  message: res.data.message,
                  type: 'success',
                  onClose: function () {
                  }
                })
                that.$router.push({
                  path: '/process'
                })
              } else {
                that.$message({
                  message: '提交错误',
                  type: 'error',
                  druation: 1000
                })
              }
            })
            // that.isLoading = false
          } else {
            // 验证失败...
            console.log('error submit!!')
            return false
          }
        })
      },
      handleSuccess (response, file, fileList) {
        // this.fileList = fileList
        // if (response.status === 'success') {
        //   this.formData.imageUrl = response.data.pictureUrl
        // } else {
        //   this.fileList = []
        // }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
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
<style lang="less" scoped>
</style>
