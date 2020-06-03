<template>
  <div class="list">
    qweqweqweqweq
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import moment from 'moment'
  import {formatDate} from '@/common/js/Utils.js'

  export default {
    name: 'hello',
    created () {
      localStorage.setItem('showfor', JSON.stringify('h5'))
    },
    data () {
      return {
        isFrirst: true,
        currentPage: 1,
        pageSize: 6,
        msg: '服务项目',
        msg2: '最近解读服务',
        tableData: [],
        tableData2: [],
        description: []
      }
    },
    methods: {
      getListData (num) {
        // console.log(num)
        this.currentPage = num
        var that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/project/getBusines', {
          params: {
            status: 2,
            pageSize: that.pageSize,
            pageNumber: num,
            businessType: '',
            diseaseType: '',
            name: ''
            // name: that.formInline.name
            // storeId: JSON.parse(localStorage.getItem('store')).k
          }
        }).then(function (respose) {
          let data = respose.data
          that.tableData = data.data.list
          // that.tableData[0].description = that.description
          // console.log(that.tableData)
          that.loading = false
          that.totalCount = data.data.total
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      }
    }
  }
</script>
<style scoped>
</style>
