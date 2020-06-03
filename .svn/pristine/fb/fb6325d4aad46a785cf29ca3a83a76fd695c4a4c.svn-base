<template>
  <div class="list">
    <div class="contentTitle pdlr20">角色管理</div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" size="medium" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <el-button type="success" size="medium" @click="addRole">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data"
         v-loading="false"
         element-loading-text="拼命加载中">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="122"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width=""></el-table-column>
        <el-table-column prop="createTime" sortable :formatter="dateFormat" label="创建时间" width=""></el-table-column>
        <el-table-column prop="updateTime" sortable :formatter="dateFormat" label="修改时间" width=""></el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text"  @click="goEdit(scope.row.code,scope.row.roleName)">编辑</el-button>
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
    },
    data () {
      return {
        formInline: {
          category: '',
          name: ''
        },
        tableData: [{
          roleName: '',
          roleType: '',
          code:null,
          createTime:null,
          createUserCode:null,
          businessNameEn:"",
          name:"",
          pageNumber:null,
          pageSize:null,
          type:1,
          updateTime:null,
          updateUserCode:null
        }],
        currentPage: 1,
        pageSize: 10,
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
        let that = this;
        alert(that.formInline.name)
        axios.get(URL.api_name + 'cloud/security/role_page', {
          params: {
              pageSize: 10,
              pageNumber: 1,
              businessName: that.formInline.name
          }
        }).then(function(resp){
          if (resp.data.data === '100') {
            that.tableData = resp.data.data.list
            that.totalCount = resp.data.data.total
          }
        }),function(error){
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: '1000'
          })
        }
      },
      addRole () {
        this.$router.push({
          path: '/roleAdd'
        })
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      getListData (num) {
        // console.log(num)
        let that = this
        axios.get(URL.api_name + 'cloud/security/role_page', {
          params: {
            pageSize : that.pageSize,
            pageNumber : num,
          }
        }).then(function(respose){
            // console.log(respose.data.data)
            that.tableData = respose.data.data.list
            that.totalCount = respose.data.data.total     
        }),function(error){
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: '1000'
          })
        }
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      goEdit(id,roleName) {
        // alert(index)
        this.$router.push({
          path: '/roleEdi/' + id
        })
      },
      goDel (id) {
        var that = this
        that.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(URL.api_name + 'cloud/project/deleteBusines', {
            params: {
                businesCode: id
            }
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
</style>

