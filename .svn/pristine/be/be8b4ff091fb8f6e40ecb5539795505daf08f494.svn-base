<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 审核数据</el-breadcrumb-item>
        <el-breadcrumb-item>数据列表</el-breadcrumb-item>
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
          <el-button type="success" @click="add()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="knowledge_tab">
      <span :class="{'active': formInline.status === 1}" @click="changeSelect(1)">待办</span><span :class="{'active': formInline.status === 3}" @click="changeSelect(3)">修正</span>
    </div>
    <div class="table-data">
      <el-table :data="tableData" v-loading="false" border style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="gene" label="基因"></el-table-column>
        <el-table-column prop="mutation" label="变异"></el-table-column>
        <el-table-column prop="drug" label="药物"></el-table-column>
        <el-table-column prop="diseaseEn" label="疾病"></el-table-column>
        <el-table-column prop="" label="时间"></el-table-column>
        <el-table-column prop="auditorName" width="140" label="当前审核人"></el-table-column>
        <!-- <el-table-column prop="status" width="120" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '进行中' : scope.row.status === 3 ? '已完成' : scope.row.status === 99 ? '已作废' : '未知' }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.status === 1" @click="goinfo(scope.row.id)">修改</el-button>
            <el-button type="danger" size="mini" v-if="scope.row.status !== 100" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <pager :current-page="currentPage" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val)=>getListData(val, formInline.status)"></pager>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import Pager from '@/components/common/pager'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    created () {
      this.getListData(this.$route.params.pager, this.formInline.status)
    },
    data () {
      return {
        formInline: {
          gene: '',
          mutaion: '',
          diseaseName: '',
          drugName: '',
          status: 1
        },
        status: 1,
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
        } else {
          this.formInline.status = status
          this.getListData(this.currentPage, status)
        }
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
        // this.$jsonp('http://192.168.33.231:8089/sample/list?size=10').then(json => {
        // 　　// 返回数据 json， 返回的数据就是json格式
        //     alert(json)
        // }).catch(err => {
        // 　　console.log(err)
        // })
        // that.$http.get("http://192.168.33.231:8089/sample/list?size=10").then(function (resp){  
        //     console.log('eee')
        // })
        axios.get(URL.api_name + 'sample/list?size=10&page=2').then(function (respose) {
            console.log('xe')
            // console.log(respose.data.list)
            // console.log('ee')
          // let data = respose.data
          // that.tableData = data.data.list
          // that.loading = false
          // that.totalCount = data.data.total
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
      add() {
        this.$router.push({
          path: '/ExamineKnowledgeNew' + '/' + this.currentPage
        })
      },
      goinfo(code) {
        this.$router.push({
          path: '/ExamineKnowledgeInfo/' + code + '/' + this.currentPage
        })
      },
      goDetail(code) {
        // this.$router.push({
        //   path: '/ExamineDataDetial/' + code + '/' + this.currentPage
        // })
      },
      changeSelect(n) {
        let that = this
        that.status = n
        that.getListData(1, n)
      }
    }
  }
</script>
<style lang="less" scoped>
.knowledge_tab{margin-top:-10px;}
.knowledge_tab span{border:1px solid #e6ebf5;margin:0 0px -1px 0; display:inline-block; padding:12px 24px; cursor:pointer;}
.knowledge_tab span:first-child{margin:0 -1px -1px 0;}
.knowledge_tab span:hover, .knowledge_tab span.active{ background:rgb(245,247,250);}
</style>
