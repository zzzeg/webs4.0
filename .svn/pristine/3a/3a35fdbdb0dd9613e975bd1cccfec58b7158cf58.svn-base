<template>
  <div class="list">
    <div class="contentTitle pdlr20">流程管理</div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
        <el-form-item label="名称">
          <el-input size="medium" v-model="formInline.name" placeholder="请输入流程名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="medium" v-model="formInline.status" clearable placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <el-button type="success" size="medium" @click="addProcess">添加流程</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data" 
         v-loading="false"
         element-loading-text="拼命加载中">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column label="图标" width="80">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.icons"> -->
            <img :src="scope.row.iconUrl" width="60px" height="60px" class="imgs">
          </template>
        </el-table-column>
        <el-table-column label="流程名称" prop="name" sortable>
          <template slot-scope="scope">
            <a class="colorBlue" title="查看流程详情" @click="goDetial(scope.row.code)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sex" label="性别" width="100">
        </el-table-column> -->
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createTime" :formatter="dateFormat" label="更新时间" width="180" sortable>
        </el-table-column>
        <!-- <el-table-column prop="itemType" label="分析记录数" width="160">
        </el-table-column> -->
        <el-table-column 
          prop="status" 
          label="状态" 
          width="100" sortable>
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '草稿' : scope.row.status === 2 ? '启用' : scope.row.status === 3 ? '禁用' : '删除'  }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1 || scope.row.status === 3" @click="changeType(scope.row, 1)">启用</el-button>
            <el-button type="danger" v-if="scope.row.status === 2" @click="changeType(scope.row, 0)">停用</el-button>
            <el-button type="success" v-if="scope.row.status !== 2" @click="goEdit(scope.row.code)">编辑</el-button>
            <el-button type="success" v-if="scope.row.status === 1 || scope.row.status === 3 " @click="script(scope.row.code)">更改脚本</el-button>
            <el-button type="danger" v-if="scope.row.status !== 2" @click="deletede(scope.row.code)">删除</el-button>
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
  import Pager from '@/components/common/pager'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    created () {
      this.getListData(this.currentPage)
      // this.getCategoryList()
    },
    data () {
      return {
        formInline: {
          status: '',
          name: ''
        },
        searchTypes: [{
          value: 1,
          label: '草稿'
        }, {
          value: 2,
          label: '启用'
        }, {
          value: 3,
          label: '禁用'
        }],
        tableData: [],
        currentPage: 1,
        pageSize: 5,
        pageNum: 0,
        totalCount: 0,
        loading: false,
        categoryList: []
      }
    },
    components: {
      Pager: Pager
    },
    methods: {
      search () {
        if (this.currentPage > 1) {
          this.currentPage = 1
        } else {
          this.getListData(this.currentPage)
        }
      },
      addProcess () {
        this.$router.push({
          path: '/processAdd'
        })
      },
      goDetial (id) {
        this.$router.push({
          path: '/processDetial/' + id
        })
      },
      changeType (scope, status) {
        // axios.xx
        var that = this
        let msg = ''
        let stat = 0
        if (status === 1) {
          msg = '确定启用该流程吗？'
          stat = 2
        } else {
          msg = '确定禁用该流程吗？'
          stat = 3
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(URL.api_name + 'cloud/change_flow_state', {
            code: scope.code,
            status: stat
          }).then((res) => {
            if (res.data.code === '100') {
              this.$message({
                type: 'success',
                message: res.data.message,
                duration: 1000
              })
              that.getListData(that.currentPage)
            } else {
              that.$message({
                type: 'error',
                message: '请求错误',
                duration: 1000,
              })
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      goEdit (id) {
        this.$router.push({
          path: '/processEdit/' + id
        })
      },
      deletede (id) {
        // console.log('x1')
        var that = this
        that.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(URL.api_name + 'cloud/delete_flow', {
            code: id
          }).then(res => {
            if (res.data.code === '100') {
              that.$message({
                type: 'success',
                message: '删除成功',
                duration: 1000
              })
              that.getListData(that.currentPage)
            }
          }).catch(err => {
            that.$message({
              type: 'error',
              message: '删除失败',
              duration: 1000
            })
            console.log(err)
          })
        }).catch(() => {})
      },
      script (id) {
        this.$router.push({
          path: '/processScriptUpdate/' + id
        })
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      getListData (num) {
        // console.log(num)
        this.currentPage = num
        var that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/flow_list', {
          params: {
            name: that.formInline.name,
            status: that.formInline.status,
            pageSize: this.pageSize,
            pageNumber: num
          }
        }).then(function (respose) {
          let data = respose.data
          that.loading = false
          that.totalCount = data.data.total
          that.tableData = data.data.list
          // console.log(that.tableData)
        }, function (error) {
          // console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败' + error,
            duration: 1000
          })
        })
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
  .imgs{ border-radius:50%; width:40px; height:40px; margin:10px 0 0 0}
  .colorBlue{ color:#20a0ff; cursor: pointer}
</style>
