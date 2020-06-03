<template>
  <div class="list">
		<div class="contentTitle pdlr20">批次号管理</div>
    <div class="rolelist_content">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="批次号">
          <el-input v-model="formInline.batchNumber" size="medium" placeholder="请输入批次号"></el-input>
        </el-form-item>

        <el-form-item label="室验室">
          <el-input v-model="formInline.labAbbr" size="medium" placeholder="请输入室验室"></el-input>
        </el-form-item>

        <el-form-item label="机器编号">
          <el-input v-model="formInline.modelNumber" size="medium" placeholder="请输入机器编号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <el-button type="success" size="medium" @click="addBatchNumber">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data" v-loading="false" element-loading-text="拼命加载中">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="batchNumber" label="批次号" width=""></el-table-column>
        <el-table-column prop="labAbbr" label="实验室缩写" width=""></el-table-column>
        <!-- <el-table-column prop="model" label="机器" width=""></el-table-column> -->
        <el-table-column prop="modelNumber" label="机器编号" width=""></el-table-column>
        <el-table-column prop="lowerMachineNumber" label="下机号" width=""></el-table-column>
        <el-table-column prop="status" label="状态" width="">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '有效' : '无效' }}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" :formatter="dateFormat" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="text"  @click="goEdit(scope.row.code)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status !== 1" @click="changeType(scope.row, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.status === 1" @click="changeType(scope.row, 0)">停用</el-button>
              <a target="_blank" :href="url + 'cloud/project/exportCountExcel?batchNumber=' + scope.row.batchNumber + '&token=' + token">
								<el-button type="text">导出</el-button>
							</a>
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
        token: localStorage.getItem('authtoken').slice(1,localStorage.getItem('authtoken').length - 1),
        url: URL.api_name,
        formInline: {
          batchNumber: '',
          labAbbr:'',
          modelNumber:''
        },
        tableData: [{
          batchNumber: '',
          labAbbr: '',
          code:null,
          createTime:null,
          model:'',
          modelNumber:"",
          lowerMachineNumber:"",
          pageNumber:null,
          pageSize:null
        }],
        currentPage: 1,
        pageSize: 10,
        pageNum: 0,
        totalCount: 0,
        loading: false
      }
    },
    components: {
      Pager: Pager
    },
    methods: {
      search () {
        let that = this;
        axios.get(URL.api_name + 'cloud/project/getBatchNumberPage', {
          params: {
              pageSize: 10,
              pageNumber: 1,
              batchNumber: that.formInline.batchNumber,
              labAbbr:that.formInline.labAbbr,
              modelNumber:that.formInline.modelNumber
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
      addBatchNumber () {
        this.$router.push({
          path: '/batchNumberAdd'
        })
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      getListData (num) {
        let that = this
        axios.get(URL.api_name + 'cloud/project/getBatchNumberPage', {
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
      goEdit(id) {
        this.$router.push({
          path: '/batchNumberEdit/' + id
        })
      },
      changeType (scope, status) {
        // axios.xx
        var that = this
        let msg = ''
        let stat = 0
        if (status === 1) {
          msg = '确定启用该编号数据吗？'
          stat = 1
        } else {
          msg = '确定停用该编号数据吗？'
          stat = 0
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(URL.api_name + 'cloud/project/effectiveBatchNumber', {
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
                message: '操作失败，请重新操作',
                duration: 1000
              })
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消'
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
</style>

