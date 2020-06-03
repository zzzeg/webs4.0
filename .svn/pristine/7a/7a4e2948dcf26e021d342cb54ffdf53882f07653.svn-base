<template>
  <!--该页暂时没用-->
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>查看报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data" melement-loading-text="拼命加载中" style="height:700px;">
      <iframe ref="iframe" :src="htmlUrlF" style="width:100%; height:100%" @load="loaded"></iframe>
    </div>
    <div class="checkOutPdf">
      <a style="color:#fff; background: #13ce66; border: solid 1px #13ce66; padding: 7px 9px;font-size:12px; border-radius: 4px; position: absolute; right:17px; top:-60px; text-decoration:none;" target="_blank" :href="pdfUrlF">下载PDF</a>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      // this.htmlUrlF = 'report/genereport?projectCode=' + this.$route.params.id
      // this.pdfUrlF = 'report/genereport?projectCode=' + this.$route.params.id + '&rf=pdf'
      this.getProcessList()
    },
    data () {
      return {
        htmlUrlF: '',
        pdfUrlF: '',
        code: this.$route.params.id,
        language: this.$route.params.language,
        formData: {}
      }
    },
    methods: {
      getProcessList () {
        // 获取
        var that = this
        axios.get(URL.api_name + 'report/report_info', {
          params: {
            projectCode: that.code,
            langType: that.language
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.htmlUrlF = URL.api_name + res.data.data.htmlUrl
            that.pdfUrlF =  URL.api_name + res.data.data.pdfUrl
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      loaded () {
        const vm = this.$refs.iframe.contentWindow.vm
        console.log(vm)
      }
    }
  }
</script>
<style lang="less" scoped>
.checkOutPdf{ position: fixed; top:130px; right:18px; width:100px}
</style>
