<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="3">
        <div class="center">
          <el-upload
            class="upGravatar"
            :action="imgUploadUrl"
            list-type="picture-card"
            :headers="uploadHeader"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            >
            <el-button size="small" type="primary">修改头像</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="table-data"
             v-loading="loading"
             element-loading-text="拼命加载中">
          <el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
            <el-form-item label="姓名：" prop="userName">
              <el-col :span="6">
                <el-input v-model="formData.userName" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <!--<el-col :span="9">
                <el-select v-model="formData.sex" disabled clearable placeholder="请选择">
                  <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
                </el-select>
              </el-col>-->
              <el-col :span="9">
                  <el-radio v-model="formData.sex" :label="1" disabled>男</el-radio>
                  <el-radio v-model="formData.sex" :label="2" disabled>女</el-radio>
              </el-col>
            </el-form-item>
            <el-form-item label="机构：" prop="orgName">
              <el-col :span="6">
                <el-input v-model="formData.orgName" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-col :span="6">
                <el-input v-model="formData.email" disabled></el-input>
              </el-col>
            </el-form-item>
            <!--
            <el-form-item label="密码：" prop="email">
              <el-col :span="6">
                <el-input v-model="formData.emailPassword" type="password"></el-input>
              </el-col>
            </el-form-item>
            -->
            <el-form-item label="地址：" prop="address">
              <el-col :span="6">
                <el-input type="textarea"  v-model="formData.address"></el-input>
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
        <!-- 分页 -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      this.getInfo()
    },
    data () {
      return {
        formData: {
          iconUrl: '',
          nickName: 'bainuo',
          orgName: '百诺国际',
          emailPassword: '',
          email: 'bainuo@bainuo.com',
          sex: '男',
          address: '深圳市南山区西丽镇源兴科技大厦'
        },
        imgUploadUrl: URL.api_name + 'cloud/upload_icon',
        isLoading: false,
        dialogImageUrl: '',
        userInfo: [],
        searchTypes: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }],
        dialogVisible: false,
        rules: {
          address: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { max: 50, message: '地址长度不能超过50个字符',trigger:'change'}
          ]
        },
        fileList: [{name: 'gravatar.jpg', url: ''}],
        loading: false
      }
    },
    methods: {
      getInfo () {
        let that = this
        axios.get(URL.api_name + 'cloud/user_info').then(res => {
          // console.log(res.data.code) 
          if (res.data.code === '100') {
            that.formData = res.data.data
            that.fileList = []
            that.fileList.push({
              name: '',
              url: res.data.data.iconUrl
            })
          }
        },function(error){
            that.$message({
              type: 'error',
              message: '获取信息失败',
              duration: 1000
            })
        })
      },
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            that.isLoading = true
            axios.post(URL.api_name + 'cloud/modify_user', that.formData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
                that.userInfo.iconUrl = that.formData.iconUrl
                localStorage.setItem('userInfo', JSON.stringify(that.userInfo))
                that.$message({
                  message: res.data.message + '',
                  type: 'success'
                  // onClose: function () {
                  //   // that.$router.push({
                  //   //   path: '/home'
                  //   // })
                  // }
                })
                // window.location.reload()
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
            // 上面是验证失败...
            console.log('error submit!!')
            return false
          }
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // uperror () {

      // },
      beforeUpload (file) {
        // if (this.fileList.length > 0) {
        //   this.fileList = []
        //   // this.$message({
        //   //   type: 'error',
        //   //   message: '最多上传一张图片',
        //   //   duration: 1000
        //   // })
        //   // return false
        // }
      },
      handleSuccess (response, file, fileList) {
        let that = this
        that.fileList = []
        if (response.code === '100') {
          that.formData.iconUrl = response.data.iconUrl
          that.fileList.push({
            name: '',
            url: response.data.iconUrl
          })
        } else if (response.code === '1005') {
          that.$router.push({
            path: '/'
          })
        } else {
          that.fileList = []
        }
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
.coupon-logo{
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    vertical-align: bottom;
  }
  .center{text-align:center;}

</style>
<style lang="less">
  .el-upload--picture-card{ width:auto; height:auto; line-height:1; border:none; display:block; opend:use_info.vue;}
    .el-upload-list__item-actions{ display:none; opacity: 0; opend:use_info.vue;}
.el-upload-list__item-status-label{ display:none; opacity: 0; opend:use_info.vue;}
  .upGravatar .el-upload-list--picture-card{ display:inline-block; width:148px; height:160px;}
</style>
