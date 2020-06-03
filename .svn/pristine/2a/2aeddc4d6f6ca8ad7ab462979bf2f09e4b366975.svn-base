<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因检测</el-breadcrumb-item>
        <el-breadcrumb-item>样本管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
        <el-form-item label="基因">
          <el-input v-model="formInline.gene" size="medium" placeholder="请输入基因名"></el-input>
        </el-form-item>
        <el-form-item label="变异">
          <el-input v-model="formInline.mutaion" size="medium" placeholder="请输入变异名"></el-input>
        </el-form-item>
        <el-form-item label="疾病">
          <el-input v-model="formInline.diseaseName" size="medium" placeholder="请输入疾病名"></el-input>
        </el-form-item>
        <el-form-item label="药物">
          <el-input v-model="formInline.drugName" size="medium" placeholder="请输入药物名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
        <!-- <el-form-item style="margin-bottom:18px; vertical-align: bottom;">
          <el-button type="warning" size="mini" @click="search(1)">进行中</el-button>
          <el-button type="success" size="mini" @click="search(3)">已完成</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="table-data">
      <el-table :data="tableData" v-loading="false" border style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="样本编号"></el-table-column>
        <el-table-column prop="applyName" label="受检人姓名"></el-table-column>
        <el-table-column prop="applyPhone" label="手机号"></el-table-column>
        <el-table-column prop="lastUpdateTime"  :formatter="dateFormat" label="最后编辑时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '进行中' : scope.row.status === 3 ? '已完成' : scope.row.status === 99 ? '已作废' : '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" v-if="scope.row.status === 1" @click="goinfo(scope.row.id)">审核</el-button> -->
            <el-button type="primary" size="mini" @click="goDetail(scope.row.orderId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val)=>getListData(val, formInline.status)"></pager>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import Pager from '@/components/common/pager'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    created () {
      this.getListData(this.pager)
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
    components: {
      Pager: Pager
    },
    methods: {
      search (status) {
        if (this.currentPage > 1) {
          this.currentPage = 1
        }
        this.formInline.status = status
        this.getListData(this.currentPage, status)
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage, that.formInline.status)
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
            code: '',
            orderDirection: 'asc',
            page: num,
            patientSearchKey: '',
            status: '',
            size: that.pageSize,
          }
        }).then(function (respose) {
          let data = respose.data
          that.tableData = data.list
          that.loading = false
          that.totalCount = data.totalElements
          // console.log(data.data.list[0].jsonValue)
          // for (let ss = 0; ss < data.data.list.length; ss++) {
          //   that.tableData[ss].jsonValue = JSON.parse(data.data.list[ss].jsonValue)
          // }
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
      },
      goDetail(id) {
        this.$router.push({
          path: '/sampleinfo/' + id + '/' + this.currentPage
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
