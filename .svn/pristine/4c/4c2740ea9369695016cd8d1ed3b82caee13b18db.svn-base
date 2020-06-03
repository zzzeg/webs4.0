<template>
  <div class="list">
    <div class="contentTitle pdlr20">项目列表</div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <!-- <el-input v-model="formInline.name" size="medium" placeholder="请输入名称"></el-input> -->
            <el-autocomplete
              class="inline-input"
              v-model="formInline.name"
              :fetch-suggestions="querySearch"
              placeholder="请输入名称"
              :trigger-on-focus="true"
              @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <el-button type="success" size="medium" @click="addBlock">添加项目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data"
         v-loading="false"
         element-loading-text="拼命加载中">
      <el-table :data="tableData" stripe style="width: 100%" @sort-change="sortItem">
        <el-table-column label="序号" width="100">
            <template slot-scope="scope">
              {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="" sortable="custom"></el-table-column>
        <el-table-column prop="description"  label="项目描述" width=""></el-table-column>
        <el-table-column prop="createUserCode"  label="创建者" width="150"></el-table-column>
        <el-table-column prop="createTime" sortable :formatter="dateFormat" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="lastModifyTime" :formatter="dateFormat" sortable label="修改时间" width="200"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row.code, currentPage)">修改</el-button>
            <el-button type="text" @click="goDel(scope.row.code)">删除</el-button>
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
      this.getListData(this.$route.params.pager)
    },
    data () {
      return {
        formInline: {
          category: '',
          name: ''
        },
        tableData: [{
          description:null,
          code:null,
          createTime:null,
          createUserCode:null,
          name:null,
          pageNumber:null,
          pageSize:null,
          type:null,
          lastModifyTime:null,
          updateUserCode:null
        }],
        currentPage: 1,
        pageSize: 10,
        pageNum: 0,
        totalCount: 0,
        loading: false,
        categoryList: [],
        searchNameList: [],
      }
    },
    components: {
      Pager: Pager
    },
    methods: {
      search () {
          let that = this
          axios.get(URL.api_name + 'cloud/project/programlist', {
            params: {
                pageSize : 10,
                pageNumber : 1,
                name: that.formInline.name
            }
          }).then(function(respose){
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
      addBlock () {
        this.$router.push({
          path: '/maintainItems'
        })
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      getListData (num) {
        let that = this;
        that.currentPage = parseInt(num);
        axios.get(URL.api_name + 'cloud/project/programlist', {
          params: {
            pageSize : that.pageSize,
            pageNumber : num,
          }
        }).then(function(respose){
            that.tableData = respose.data.data.list
            that.totalCount = respose.data.data.total
            //  搜索联想功能
            if(that.tableData.length > 1){
              for(let i = 0; i < that.tableData.length - 1;i++) {
                that.searchNameList.push({
                  value: that.tableData[i].name
                })
              }
            }else{
              that.searchNameList = []
            }
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
        if (date === null) {
          return date = ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      goRun (id) {
        this.$router.push({
          path: '/serviceToReportItem/' + id
        })
      },
      goBind() {
          this.$router.push({
            path: '/maintainBind'
          })
      },
      goEdit(id, pager) {
        // alert(index)
        this.$router.push({
          path: '/maintainItemsEdi/' + id + '/' + pager
        })
      },
      // goEdit (scope, id, typeid) {
      //   localStorage.setItem('keyer', JSON.stringify(scope.jsonValue))
      //   this.$router.push({
      //     path: '/ServiceEdit/' + id + '/' + typeid
      //   })
      // },
      goReportInfo (language, id) {
        this.$router.push({
          path: '/reportInfo/' + language + '/' + id
        })
      },
      goDel (id) {
        var that = this
        that.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(URL.api_name + 'cloud/project/deleteProgram', {
            params: {
              programCode: id
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
      },
      // 排序
      sortItem(e) {
          console.log(e)
      },
      
      //  添加联想功能
      querySearch(queryString, cb) {
          var searchNameList  = this.searchNameList;
          var results = queryString ? searchNameList .filter(this.createFilter(queryString)) : searchNameList ;
          // 调用 callback 返回建议列表的数据
          cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
      },
      handleSelect(item) {
          console.log(item);
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

