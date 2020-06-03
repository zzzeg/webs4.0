<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 流程管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改流程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data"
         element-loading-text="拼命加载中">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px">
        <el-form-item label="名称：" prop="name">
          <el-col :span="9">
            <el-input v-model="formData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-col :span="9">
            <el-input type="textarea" :rows="4" v-model="formData.description"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="选择上传的图标：">
          <el-col :span="9">
            <el-upload
              :action="imgUploadUrl"
              list-type="picture"
              :on-remove="handleRemove3"
              :before-upload="beforeUpload3"
              :on-success="handleSuccess3"
              :headers="uploadHeader"
              :file-list="fileList3"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2Mb</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="选择上传的流程图：">
          <el-col :span="9">
            <el-upload
              :action="imgUploadUrl"
              list-type="picture"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :headers="uploadHeader"
              :file-list="fileList"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过xxMb</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="选择上传信号通路图：">
          <el-col :span="9">
            <el-upload
              :action="imgUploadUrl"
              list-type="picture"
              :on-remove="handleRemove2"
              :before-upload="beforeUpload2"
              :on-success="handleSuccess2"
              :headers="uploadHeader"
              :file-list="fileList2"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2Mb</div>
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
      // this.getCategoryList()
    },
    data () {
      return {
        formData: {
          code: this.$route.params.id,
          description: '',
          imageUrl: '',
          diagramUrl: '',
          iconUrl: '',
          name: ''
        },
        imgUploadUrl: URL.api_name + 'cloud/upload_flow_image',
        // fileList: [{name: "list.jpg",url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504937818545&di=122fd6449431a7fd86eafb51a9f2bc3f&imgtype=0&src=http%3A%2F%2Ffile.popoho.com%2Fwzfzl%2F20160706%2Fq0rafysiogkco140510110S8-25.jpg'}],
        fileList: [],
        fileList2: [],
        fileList3: [],
        rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getListData () {
        var that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/get_flow', {
          params: {
            code: this.$route.params.id
          }
        }).then(function (respose) {
          let data = respose.data
          that.formData = data.data
          that.fileList = []
          if (data.data.imageUrl && data.data.imageUrl !== '') {
            that.fileList.push({
              name: '',
              url: data.data.imageUrl
            })
          }
          that.fileList2 = []
          if (data.data.diagramUrl && data.data.diagramUrl !== '') {
            that.fileList2.push({
              name: '',
              url: data.data.diagramUrl
            })
          }
          that.fileList3 = []
          if (data.data.iconUrl && data.data.iconUrl !== '') {
            that.fileList3.push({
              name: '',
              url: data.data.iconUrl
            })
          }
          that.loading = false
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '获取列表失败',
            duration: 1000
          })
        })
      },
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            axios.post(URL.api_name + 'cloud/modify_flow', that.formData).then((res) => {
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
                  message: '提交失败',
                  type: 'error',
                  duration: 1000
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
      beforeUpload (file) {
        if (this.fileList.length > 0) {
          this.$message({
            type: 'error',
            message: '最多上传一张图片',
            duration: 1000
          })
          return false
        }
      },
      handleSuccess (response, file, fileList) {
        this.fileList = fileList
        if (response.code === '100') {
          this.formData.imageUrl = response.data.flowImageUrl
        } else {
          this.fileList = []
        }
      },
      handleRemove (file, fileList) {
        // console.log(file, fileList)
        this.fileList = fileList
      },
      beforeUpload2 (file) {
        if (this.fileList2.length > 0) {
          this.$message({
            type: 'error',
            message: '最多上传一张图片',
            duration: 1000
          })
          return false
        }
      },
      handleSuccess2 (response, file, fileList) {
        this.fileList2 = fileList
        console.log(response)
        if (response.code === '100') {
          this.formData.diagramUrl = response.data.flowImageUrl
        } else {
          this.fileList2 = []
        }
        // that.formData.flowImageUrl =
      },
      handleRemove2 (file, fileList) {
        this.fileList2 = fileList
        console.log(file, fileList)
      },
      beforeUpload3 (file) {
        if (this.fileList3.length > 0) {
          this.$message({
            type: 'error',
            message: '最多上传一张图片',
            duration: 1000
          })
          return false
        }
      },
      handleSuccess3 (response, file, fileList) {
        this.fileList3 = fileList
        console.log(response)
        if (response.code === '100') {
          this.formData.iconUrl = response.data.flowImageUrl
        } else {
          this.fileList3 = []
        }
      },
      handleRemove3 (file, fileList) {
        this.fileList3 = fileList
        console.log(file, fileList)
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
