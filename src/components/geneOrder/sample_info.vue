<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因检测</el-breadcrumb-item>
        <el-breadcrumb-item>样本详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
      <div class="sampleItems">
        <h4>订单信息</h4>
        <el-row :gutter="10">
          <el-col :span="8">订单号：{{ formData.xxx }}</el-col>
          <el-col :span="8">下单时间: {{ formData.xxx }}</el-col>
          <el-col :span="8">支付状态：{{ formData.xxx }}</el-col>
        </el-row>
      </div>

      <div class="sampleItems">
        <h4>送检信息</h4>
        <el-row :gutter="10">
          <el-col :span="8">送检单位：{{ formData.xxx }}</el-col>
          <el-col :span="8">送检科室: {{ formData.xxx }}</el-col>
          <el-col :span="8">送检医生: {{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">联系电话：{{ formData.xxx }}</el-col>
          <el-col :span="8">样本类型：{{ formData.xxx }}</el-col>
          <el-col :span="8">是否重新采样：{{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">收样日期：{{ formData.xxx }}</el-col>
          <el-col :span="8">样本数量：{{ formData.xxx }}</el-col>
          <el-col :span="8">样本单品：{{ formData.xxx }}</el-col>
        </el-row>
      </div>

      <div class="sampleItems">
        <h4>检测人信息</h4>
        <el-row :gutter="10">
          <el-col :span="8">姓名：{{ formData.xxx }}</el-col>
          <el-col :span="8">性别：: {{ formData.xxx }}</el-col>
          <el-col :span="8">年龄: {{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">籍贯：{{ formData.xxx }}</el-col>
          <el-col :span="8">电话：{{ formData.xxx }}</el-col>
          <el-col :span="8">身份证号：{{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">现住地址：{{ formData.xxx }}</el-col>
          <el-col :span="8">癌症类型：{{ formData.xxx }}</el-col>
          <el-col :span="8">TNM分期：{{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">个人疾病史：{{ formData.xxx }}</el-col>
          <el-col :span="8">个人癌症史：{{ formData.xxx }}</el-col>
          <el-col :span="8">家族癌症史：{{ formData.xxx }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">治疗方式：{{ formData.xxx }}</el-col>
          <el-col :span="8">个人用药史：{{ formData.xxx }}</el-col>
          <el-col :span="8">临床诊断：{{ formData.xxx }}</el-col>
        </el-row>
      </div>

      <div class="sampleItems">
        <h4>检测项目</h4>
        <el-row :gutter="10">
          <el-col :span="8">编号：{{ formData.xxx }}</el-col>
          <el-col :span="8">名称：: {{ formData.xxx }}</el-col>
          <el-col :span="8">类别: {{ formData.xxx }}</el-col>
        </el-row>
      </div>

      <div class="sampleItems">
        <h4>备注信息</h4>
        <el-row :gutter="10">
          <el-col :span="20">{{ formData.xxx }}</el-col>
        </el-row>
      </div>

      <div class="sampleItems" style="text-align:center;">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-button type="primary" size="small" @click="">创建解读项目</el-button>
            <el-button size="small" @click="">返回</el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      // 获取数据
      this.getData()
    },
    data () {
      return {
        formData: {
          drugDescription: '',
          drugEnName: '',
          drugName: '',
          drugTradeEnName: '',
          drugTradeName: '',
          drugType: '',
          healthInsurance: '',
          id: ''
        },
        pager: this.$route.params.pager,
        id: this.$route.params.id,
        rules: {
          drugName: [
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
        axios.get(URL.api_name + 'boss/sample/toEdit', {
          params: {
            orderId: that.id
          }
        }).then(function (respose) {
          // let n = JSON.parse(respose.data)
          // console.log('xxx')
          console.log(respose.data.slice(1,respose.data.length - 1))
          // if(respose.data.code === '100') {
          //   // that.formData = respose.data.data
          // }
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
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // axios.post(URL.api_name + 'report/updateDrugControl', that.formData).then((res) => {
            //   that.isLoading = false
            //   if (res.data.code === '100') {
            //     that.$message({
            //       message: res.data.message,
            //       type: 'success',
            //       duration: 1000,
            //       onClose: function () {
            //         that.$router.push({
            //           // path: '/druglist/' + that.pager
            //         })
            //       }
            //     })
            //   } else {
            //     that.$message({
            //       message: '提交错误',
            //       type: 'error',
            //       duration: 1000
            //     })
            //   }
            // })
        } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      back() {
        this.$router.push({
          path: '/samplelist/' + this.pager
        })
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
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    font-size:14px;
    color:#444;
    line-height:30px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }
  .sampleItems{margin:0 0 30px 0;}
  .sampleItems>h4{margin:10px 0; font-weight:bold; font-size:15px; color:#333;}
</style>
