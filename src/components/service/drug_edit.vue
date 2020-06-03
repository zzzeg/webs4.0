<template>
  <div class="list">
		<div class="contentTitle pdlr20">药物编辑</div>
    <div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
      <el-form :model="formData"  ref="formData" label-width="115px">
        <el-form-item label="药物英文名：" prop="drugEnName">
          <el-col :span="6">
            <el-input v-model="formData.drugEnName" placeholder="请输入药物英文名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="药物中文名：">
          <el-col :span="6">
            <el-input v-model="formData.drugName"  placeholder="请输入药物中文名"></el-input>
          </el-col>
          <el-col :span="4">
           <el-button type="primary" size="medium" :loading="isLoading" @click="cancerHeath(formData.drugName)" style="padding:9px;margin-left: 30px;">
              {{ isLoading ? '正在同步' : '同步医保' }}
          </el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="药物类型：" prop="drugType">
          <el-col :span="6">
            <el-select v-model="formData.drugType" placeholder="请选择药物类型">
              <el-option v-for="(item, index) in drugTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="癌肿：" v-if="formData.healthInsurance == '是'">
          <el-col :span="9">
            <el-select v-model="cancerCodes" multiple placeholder="请选择癌种类型">
              <el-option v-for="item in optionItem" :key="item.code" :label="item.name" :value="item.name"></el-option>
          </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="是否医保：" prop="healthInsurance">
          <el-col :span="9">
            <el-radio-group v-model="formData.healthInsurance">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>

        <el-form-item label="铂类药物：" prop="platinum">
          <el-col :span="9">
            <el-radio-group v-model="formData.platinum">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>

        <el-form-item label="医保适应症：" v-if="formData.healthInsurance == '是'">
          <el-col :span="12">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="formData.remark"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="国内上市情况：">
          <el-col :span="12">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="formData.inlandPublicSituation"></el-input>
          </el-col>
        </el-form-item>
       
        <el-form-item label="FDA获批情况：">
          <el-col :span="12">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="formData.inlandPublicSituation"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="药物描述：">
          <el-col :span="12">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="formData.drugDescription"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" :loading="isLoading" @click="sub('formData')" style="margin:30px 10px 0px 0px;">
              {{ isLoading ? '正在提交' : '提交' }}
          </el-button>
          <el-button size="medium" @click="back()">返回</el-button>
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
      // 获取数据
      this.getOptionStep()
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
          remark: '',
          platinum: 1,
          drugDescription: '',
          drugEnName: '',
          drugName: '',
          drugTradeEnName: '',
          drugTradeName: '',
          drugType: '',
          healthInsurance: '',
          cancerList: [],
          inlandPublicSituation: '',
          id: ''
        },
        drugTypeList: [{
          value: '靶向药物',
          label: '靶向药物'
        }, {
          value: '放疗药物',
          label: '放疗药物'
        }, {
          value: '化疗药物',
          label: '化疗药物'
        }, {
          value: '免疫检查点抑制剂',
          label: '免疫检查点抑制剂'
        }, {
          value: '细胞治疗',
          label: '细胞治疗'
        }, {
          value: '肿瘤疫苗',
          label: '肿瘤疫苗'
        }, {
          value: '内分泌治疗药物',
          label: '内分泌治疗药物'
        }, {
          value: '其他',
          label: '其他'
        }],
        optionItem: [],
        cancerCodes: [],
        cancerList: [],
        pager: this.$route.params.pager,
        id: this.$route.params.id,
        rules: {
          drugEnName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          drugType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          healthInsurance: [{ required: true, message: '请选择是否医保', trigger: 'change' }]
        },
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getData() {
        let that = this
        axios.get(URL.api_name + 'report/toUpdateDrugControl', {
          params: {
            id: that.id
          }
        }).then(function (respose) {
          if(respose.data.code === '100') {
            that.formData = respose.data.data
            that.cancerCodes = []
            for (let i = 0; i < respose.data.data.cancerList.length; i++) {
              for(let n = 0; n < that.optionItem.length; n++) {
                if (respose.data.data.cancerList[i].diseaseEnName === that.optionItem[n].diseaseEnName)
                that.cancerCodes.push(that.optionItem[n].name)
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
      cancerHeath(name) {
        let that = this
        that.isLoading = true
        axios.get(URL.api_name + 'report/getYaoZhData', {
          params: {
            drugName: name
          }
        }).then(function(res){
              that.isLoading = false
              if(res.data.code === "100"){
                that.$message({
                  type: 'success',
                  message: '同步成功',
                  duration: 1000
                })
                that.formData.remark = res.data.data.remark
                that.formData.healthInsurance = res.data.data.healthInsurance
                // that.optionItem = res.data.data
              } else {
                that.$message({
                  type: 'error',
                  message: '同步失败',
                  duration: 1000
                })
              }
          })
      },
      getOptionStep() {
          let that = this
          axios.get(URL.api_name + 'cloud/cancerList').then(function(resp){
              if(resp.data.code === "100"){
                  that.optionItem = resp.data.data
                  that.getData()
              }
          })
      },
      sub (formName) {
        let that = this
        that.formData.cancerList = []
        for (let n = 0; n < that.optionItem.length; n++) {
          for(let i = 0; i < that.cancerCodes.length; i++) {
            if(that.cancerCodes[i] === that.optionItem[n].name) {
              that.formData.cancerList.push({
                name: that.cancerCodes[i],
                diseaseEnName: that.optionItem[n].diseaseEnName
              })
            }
          }
        }
        that.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(URL.api_name + 'report/updateDrugControl', that.formData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.$message({
                  message: res.data.message,
                  type: 'success',
                  duration: 1000,
                  onClose: function () {
                    that.$router.push({
                      path: '/druglist/' + that.pager
                    })
                  }
                })
              } else {
                that.$message({
                  message: '提交错误：' + res.data.message,
                  type: 'error',
                  duration: 2000
                })
              }
            })
        } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      back() {
        this.$router.push({
          path: '/druglist/' + this.pager
        })
      },
      goBack() {//返回按钮
        this.$router.go(-1);
      },

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
  .backBtn{float: right;margin-top: -21px;}
  /deep/.el-form{margin-left: 20px;}
  /deep/.el-input__inner{height: 36px;width: 400px;}
	/deep/.el-radio__label {margin-right: 30px;}
</style>
