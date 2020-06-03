<template>
  <div class="list">
    <div class="contentTitle pdlr20">资源管理</div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input size="medium" v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <el-button type="success" size="medium" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column label="名称" prop="name" sortable>
        </el-table-column>
        <el-table-column label="图标" prop="icon" width="180">
        </el-table-column>
        <el-table-column prop="href" label="地址">
        </el-table-column>
        <el-table-column prop="parentCode" label="父菜单code" width="200">
        </el-table-column>
        <el-table-column prop="createTime" :formatter="dateFormat" label="更新时间" width="280" sortable>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="script(scope.row.code)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getListData"></pager>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import Pager from '@/components/common/pager'
  import moment from 'moment'
  export default {
    created () {
      this.getListData(this.currentPage)
    },
    data () {
      return {
        fileList: [],
        formInline: {
          name: '',
        },
        tableData: [],
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
        isLoading: false,
        loading: false
      }
    },
    methods: {
      search () {
        if (this.currentPage > 1) {
          this.currentPage = 1
        } else {
          this.getListData(this.currentPage)
        }
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      script(code) {
        this.$router.push({
          path: '/resourceupdate/' + code
        })
      },
      add () {
        this.$router.push({
          path: '/resourceadd'
        })
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      getListData (num) {
        var that = this
        axios.get(URL.api_name + 'cloud/security/menu_page', {
          params: {
            name: that.formInline.name,
            pageSize: that.pageSize,
            pageNumber: num
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.tableData = res.data.data.list
            that.totalCount = res.data.data.total
          }
        }, function (error) {
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      }
    },
    components: {
      Pager: Pager
    }
  }
</script>
<style lang="less" scoped>
</style>
