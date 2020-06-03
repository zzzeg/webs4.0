<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>邮件列表</el-breadcrumb-item>
        <el-breadcrumb-item>邮件详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data xxxx">
      <el-form :model="formData" ref="formData" label-width="10px">
        <el-form-item label="" prop="">
          <el-col :span="20">
            <h3 class="mail_title">百诺基因科技费用报销规定</h3>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-col :span="18">
            <h5 class="mail_title">肖小妹</h5>
            <p style=" line-height: 1;">发送给: james@bainuo.cn，zhangjinrong@bainuo.cn，fuboqing@bainuo.cn,gewehw@bainuo.cn，wangyayun@bainuo.cn，uiehrwuiherh@bainuo.cn...</p>
          </el-col>
          <el-col :span="2">
            <h5 class="mail_title">　　&nbsp;</h5>
            <p style=" line-height: 1;">2017-05-16 10:19</p>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-col :span="20">
            <h5 class="mail_title" style="font-weight:normal;">抄送给：james@bainuo.cn，zhangjinrong@bainuo.cn</h5>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-col :span="20">
            <div class="line-through">
              <div style='display:inline-block;'>
                <i class="word"></i>
                <span>百诺基因费用报销制度.d...</span>
                <span>(32kb)</span>
              </div>
              <div style='display:inline-block;'>
                <i class="word"></i>
                <span>百诺基因差旅费管理规定.docx</span>
                <span>(32kb)</span>
              </div>
            </div>
          </el-col>
          <el-form-item label="" prop="">
            <el-col :span="20">
              <p>Dear All：</p>
              <p>大家好，附件为公司日常经营费用报销差旅费管理制度，请大家详细阅读并严格执行，谢谢大家配合！</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>财务部　　肖小妹</p>
            </el-col>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    created () {
      // this.getListData(this.pager)
    },
    data () {
      return {
        formInline: {
          gene: '',
          mutaion: '',
          diseaseName: '',
          drugName: '',
          status: ''
        },
        pager: this.$route.params.pager,
        dialogVisible: false,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageNum: 0,
        totalCount: 0,
        loading: false
      }
    },
    methods: {
      search (status) {
        // if (this.currentPage > 1) {
        //   this.currentPage = 1
        // }
        // this.formInline.status = status
        // this.getListData(this.currentPage, status)
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage, that.formInline.status)
      },
      goSend() {
      	this.$router.push({
          path: '/email/new'
        })
      },
      getListData (num, status) {
        // console.log(num)
        let that = this
        this.currentPage = parseInt(num)
        if(status !== undefined) {
          that.formInline.status = status
        } else {
          that.formInline.status = ''
        }
        that.loading = true
        axios.get(URL.api_name + 'boss/sample/listData', {
          params: {
            code: ''
          }
        }).then(function (respose) {
          let data = respose.data
          that.tableData = data.list
        }, function (error) {
          // console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>
<style lang="less" scoped>
.xxxx .el-form-item{ margin-bottom:0px; }
.xxxx .el-form-item+.el-form-item{padding: 0 0 0 20px}
h3.mail_title { font-size:16px; font-weight: bold;  background: #efefef; padding:0 20px; }
h5.mail_title{ font-weight: bold; font-size:14px; }
h5.mail_title+p{color:#666;}
.line-through{ margin:20px 0; border-top:solid 1px #ddd; border-bottom:solid 1px #ddd; color:#888;}
.line-through div{margin-right:10px;}
.xxxx p {line-height: 20px;}
i.word{ display: inline-block; width: 16px; height:16px; vertical-align: middle; background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536732145752&di=b045112703281a07c5f4975edb5c3f2c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F76%2F22%2F22r58PICzuT_1024.png) no-repeat center; background-size:100%; }
</style>
