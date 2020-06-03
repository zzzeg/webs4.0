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
              <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="上传脚本：">
          <el-col :span="9">
            <el-upload
              :action="uploadAction"
              list-type="picture"
              :data="otherData"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="uploadHeader"
              :file-list="fileList"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传脚本文件，且不超过100Mb</div>
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
    created () {
      this.getListData()
    },
    data () {
      return {
        formData: {
          flowCode: this.$route.params.id,
          language: 'python',
          scriptInfo: []
          // name+scriptUrl
        },
        otherData: {
          flowCode: this.$route.params.id
        },
        uploadAction: URL.api_name + 'cloud/upload_script',
        fileList: [],
        searchTypes: [{
          value: '1',
          label: 'python'
        }, {
          value: '2',
          label: 'R'
        }, {
          value: '3',
          label: 'shell'
        }, {
          value: '4',
          label: 'perl'
        }],
        rules: {
          language: [
            { required: true, message: '请选择脚本类型', trigger: 'change' }
          ]
        },
        isLoading: false
      }
    },
    methods: {
      getListData () {
        var that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/get_scripts', {
          params: {
            flowCode: this.$route.params.id
          }
        }).then(function (respose) {
          let data = respose.data
          // that.formData = data.data
          that.fileList = []
          for (let i = 0; i < data.data.length; i++) {
            that.fileList.push({
              name: data.data[i].name,
              url: data.data[i].scriptUrl
            })
          }
          that.loading = false
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '获取失败',
            duration: 1000
          })
        })
      },
      sub (formName) {
        let that = this
        // alert(JSON.parse(localStorage.getItem('authtoken')))
        if (that.formData.scriptInfo.length < 1) {
          that.$message({
            message: '请至少上传一个脚本文件',
            type: 'error'
          })
          return false
        }
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            axios.post(URL.api_name + 'cloud/modify_script', that.formData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.$message({
                  message: res.data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: function () {
                  }
                })
                that.$router.push({
                  path: '/process'
                })
              } else {
                that.$message({
                  message: '提交错误',
                  type: 'error'
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
        let that = this
        console.log(response)
        that.formData.scriptInfo.push({
          name: response.data.fileName,
          scriptUrl: response.data.scriptUrl
        })
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt100M = file.size / 1024 / 1024 < 100
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt100M) {
          this.$message.error('上传文件大小不能超过 100MB!')
        }
        // return isJPG && isLt100M
        return isLt100M
      },
      handleRemove (file, fileList) {
        let that = this
        that.formData.scriptInfo = []
        for (let i = 0; i < fileList.length; i++) {
          that.formData.scriptInfo.push({
            name: fileList[i].response.data.fileName,
            scriptUrl: fileList[i].response.data.scriptUrl
          })
        }
        console.log(that.formData.scriptInfo)
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
