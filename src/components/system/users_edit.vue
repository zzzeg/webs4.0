<template>
  <div class="list">
    <div class="contentTitle pdlr20">信息修改</div>
    <div class="table-data"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px">
        <el-form-item label="姓名：" prop="userName">
          <el-col :span="6">
            <el-input disabled v-model="formData.userName"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="性别：">
          <el-col :span="9">
            <el-radio v-model="formData.sex" :label="1" >男</el-radio>
            <el-radio v-model="formData.sex" :label="2" >女</el-radio>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="组织：">
          <el-col :span="9">
            <span style="margin-right:15px;">{{ orgName }}</span>
            <el-button size="small" type="primary" @click="selectOrg()">选择组织</el-button>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="角色：">
          <el-col :span="8">
            <el-checkbox-group 
              v-model="roleCheckActive"
              :max="1">
              <el-checkbox v-for="city in roleCheckList" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <p style="color:#999;">*至少要选择一个角色</p>
          </el-col>
        </el-form-item> -->
        <el-form-item label="癌种 ">
          <el-select v-model="secUserDiseaseList" multiple class="inputItem" placeholder="请选择癌种类型" @focus="">
            <el-option
              v-for="item in optionItem"
              :key="item.code"
              :label="item.name"
              :value="item.diseaseEnName">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="头像：">
          <el-col :span="9">
            <el-upload
              :action="imgUploadUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :headers="uploadHeader"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2Mb</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-col :span="6">
            <el-input v-model="formData.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-col :span="6">
            <el-input v-model="formData.address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码：" prop="userPassword" required>
          <el-col :span="6">
            <el-input type="password"  v-model="formData.userPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePassword" required>
          <el-col :span="6">
            <el-input type="password" v-model="formData.rePassword"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="sub('formData')">
              {{ isLoading ? '正在提交' : '提交' }}
          </el-button>
          <el-button @click="$router.go('-1')">返回</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="组织列表"
        :visible.sync="dialogVisible"
        size="tiny">
        <ul class="tree--list">
          <li :class="{'active':item.isCheck === 1}" v-for="(item, index) in groupData" v-on:click="checkGroup(item)">{{ item.name }}</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="subGroup">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      this.getOptionStep()
      // this.getGroups()
      this.getRoleList()
      // 获取数据
      this.getData()
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formData.checkPass !== '') {
            this.$refs.formData.validateField('rePassword');
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formData.userPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formData: {
          userName: '',
          orgId: 1,
          email: '',
          secUserDiseaseList: [],
          address: '',
          iconUrl: '',
          userPassword: '',
          rePassword: '',
          sex: 1
        },
        username: this.$route.params.user,
        secUserDiseaseList: [],
        optionItem: [],
        roleList: [],
        roleCheckList: [],
        roleCheckActive: [],
        orgName: '没组织',
        imgUploadUrl: URL.api_name + 'cloud/upload_icon',
        dialogImageUrl: '',
        fileList: [],
        groupData: [],
        dialogVisible: false,
        sexs: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }],
        rules: {
          userName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          orgId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          userPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getData() {
        let that = this
        axios.get(URL.api_name + 'cloud/getUserInfo', {
          params: {
            userName: that.username
          }
        }).then(function (respose) {
          if(respose.data.code === '100') {
            that.secUserDiseaseList = []
            that.formData.userName = that.username
            if(respose.data.data.secUserDiseaseList.length > 1) {
              for (let i = 0; i < respose.data.data.secUserDiseaseList.length; i++) {
                that.secUserDiseaseList.push(respose.data.data.secUserDiseaseList[i].diseaseEnName)
              }
            }
          }
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      getOptionStep() {
        let that = this
        axios.get(URL.api_name + 'cloud/cancerList').then(function(resp) {
          if(resp.data.code === "100"){
              that.optionItem = resp.data.data
          }
        })
      },
      sub (formName) {
        let that = this
        // console.log(that.secUserDiseaseList)
        // 把癌种的一维数组，转换为list 提交
        that.formData.secUserDiseaseList = []
        for (let i = 0; i < that.secUserDiseaseList.length; i++) {
          that.formData.secUserDiseaseList.push({
            diseaseEnName: that.secUserDiseaseList[i]
          })
        }
        // console.log(that.formData.secUserDiseaseList)
        // return false
        // 把一维数组转换为list post提交
        that.formData.menuRoleList = []
        for (let n = 0; n < that.roleList.length; n++) {
          for (let i = 0; i < that.roleCheckActive.length; i++) {
            if (that.roleCheckActive[i] === that.roleList[n].roleName) {
              that.formData.roleId = that.roleList[n].code
            }
          }
        }
        let n = {}
        n["secUserDiseaseList"] = that.formData.secUserDiseaseList
        n['userName'] = that.username
        axios.post(URL.api_name + 'cloud/modify_userInfo', n).then((res) => {
          that.isLoading = false
          if (res.data.code === '100') {
            that.$message({
              message: res.data.message,
              type: 'success',
              onClose: function () {
              }
            })
            that.$router.push({
              path: '/userManage'
            })
          } else {
            that.$message({
              message: '提交错误',
              type: 'error',
              duration: 1000
            })
          }
        })
            // that.isLoading = false
      },
      getGroups () {
        // 获取分组列表
        let that = this
        axios.get(URL.api_name + 'cloud/org_list').then(function (respose) {
          let data = respose.data
          // that.groupData = data.data
          for (let i = 0; i < data.data.length; i++) {
            that.groupData.push({
              des: data.data[i].des,
              name: data.data[i].name,
              orgId: data.data[i].orgId,
              isCheck: 0
            })
          }
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      selectOrg () {
        // 选择组织
        let that = this
        for (let i = 0; i < that.groupData.length; i++) {
          that.groupData[i].isCheck = 0
        }
        that.dialogVisible = true
      },
      checkGroup (item) {
        // 分组查询
        let that = this
        for (let i = 0; i < that.groupData.length; i++) {
          that.groupData[i].isCheck = 0
        }
        item.isCheck = 1
        that.orgId = item.orgId
        // that.getListData (that.currentPage)
      },
      getRoleList() {
        // 角色集合
        var that = this
        axios.get(URL.api_name + 'cloud/security/role_list').then(function (res) {
          if (res.data.code === '100') {
            that.roleList = res.data.data
            for (let i = 0; i < that.roleList.length; i++) {
              that.roleCheckList.push(that.roleList[i].roleName)
            }
            that.roleCheckActive.push(that.roleList[0].roleName)
          }
          console.log(that.roleCheckList)
          console.log(that.roleCheckActive)
        }, function (error) {
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      subGroup () {
        // 点击确定的时候，把组织传过去
        let that = this
        for (let i = 0; i < that.groupData.length; i++) {
          if (that.groupData[i].isCheck === 1) {
            that.formData.orgId = that.groupData[i].orgId
            that.orgName = that.groupData[i].name
            // return false
          }
        }
        that.dialogVisible = false
      },
      beforeUpload (file) {
        if (this.fileList.length > 0) {
          this.$message({
            type: 'error',
            message: '最多上传一张头像',
            duration: 1000
          })
          return false
        }
      },
      handleSuccess (response, file, fileList) {
        this.fileList = fileList
        if (response.code === '100') {
          this.formData.iconUrl = response.data.iconUrl
        } else {
          this.fileList = []
        }
      },
      handleRemove (file, fileList) {
        // console.log(file, fileList)
        this.fileList = fileList
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
.tree--list{ line-height:40px; text-indent: 20px; border:1px solid rgb(209, 219, 229); max-height: 300px; background:#fafafa}
  .tree--list li{font-size: 14px; cursor: pointer; padding: 0 10px; line-height:40px;}
  .tree--list li:hover,.tree--list li.active{ background:#ccc;}
</style>
