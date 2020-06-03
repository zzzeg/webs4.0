<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 报告列表</el-breadcrumb-item>
        <el-breadcrumb-item>未审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
        <el-form-item label="报告名称：">
          <el-input v-model="formInline.flowName" placeholder="请输入报告名称"></el-input>
        </el-form-item>
        <el-form-item label="受检人">
          <el-input v-model="formInline.sickName" size="medium" placeholder="请输入受检人姓名"></el-input>
        </el-form-item>
        <el-form-item label="报告时间">
          <el-date-picker
            v-model="formInline.startTime"
            type="date"
            :editable='false'
            @change="beginTimeRules"
            placeholder="选择日期时间">
          </el-date-picker>
          <div class="Zvertical">至</div>
          <el-date-picker
            v-model="formInline.endTime"
            type="date"
            :editable='false'
            @change="endTimeRules"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data"
         v-loading="false"
         element-loading-text="拼命加载中">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="名称" sortable>
        </el-table-column>
        <!-- <el-table-column prop="sex" label="性别" width="100">
        </el-table-column> -->
        <el-table-column label="受检人">
          <template slot-scope="scope">
            {{ scope.row.jsonValue.user_name}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" width="180" sortable>
        </el-table-column>
        <!-- <el-table-column prop="itemType" label="分析记录数" width="160">
        </el-table-column> -->
        <el-table-column prop="status" label="状态" width="160" sortable>
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '草稿' : scope.row.status === 2 ? '运行中...' : scope.row.status === 3 ? '未审核' : scope.row.status === 4 ? '中英文报告都完成' : scope.row.status === 6 ? '分析流程异常' : scope.row.status === 7 ? '中文报告审核完成' : scope.row.status === 8 ? '英文报告审核完成' : scope.row.status === 9 ? '中文复核完成' : scope.row.status === 10 ? '英文复核完成' : scope.row.status === 11 ? '中英文初审完成': '已删除' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.status === 8 || scope.row.status === 10 || scope.row.status === 11 || scope.row.status === 3" @click="examine('cn', scope.row.code, currentPage)">审核中文报告</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.status === 7 || scope.row.status ===  9 || scope.row.status === 11 || scope.row.status === 3" @click="examine('en', scope.row.code, currentPage)">审核英文报告</el-button>
            <!-- <el-button type="danger" size="small" @click="sub(scope.row.code)">提交</el-button> -->
            <!-- <el-button type="info" size="small" @click="goReportInfo(scope.row.code)">修改</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog
      title="输入审核信息"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-row>
        <el-input v-model="textares" :rows="4" type="textarea"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="textares = '', dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pager :current-page="currentPage" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getListData"></pager>
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
          sickName: '',
          flowName: '',
          endTime: '',
          startTime: ''
        },
        textares: '',
        cid: '',
        dialogVisible: false,
        tableData: [],
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
        if (this.currentPage > 1) {
          this.currentPage = 1
        } else {
          this.getListData(this.currentPage)
        }
      },
      getListData (num) {
        // console.log(num)
        this.currentPage = parseInt(num)
        let that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/unaudit_project', {
          params: {
            startTime: that.formInline.startTime,
            endTime: that.formInline.endTime,
            projectName: that.formInline.flowName,
            sickName: that.formInline.sickName,
            pageSize: that.pageSize,
            pageNumber: num
            // name: that.formInline.name
            // storeId: JSON.parse(localStorage.getItem('store')).k
          }
        }).then(function (respose) {
          let data = respose.data
          that.tableData = data.data.list
          that.loading = false
          that.totalCount = data.data.total
          // console.log(data.data.list[0].jsonValue)
          for (let ss = 0; ss < data.data.list.length; ss++) {
            that.tableData[ss].jsonValue = JSON.parse(data.data.list[ss].jsonValue)
          }
          // console.log(that.tableData[0].jsonValue)
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
      beginTimeRules (val) {
        let date1 = moment(val)
        let date2 = moment(this.formInline.signupEnd)
        this.formInline.startTime = val
        console.log(val)
        if (this.formInline.signupEnd !== undefined && date1.diff(date2) > 0) {
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'error'
          })
          this.formInline.startTime = ''
        }
        this.formInline.startTime = moment(val).format('YYYY-MM-DD')
      },
      endTimeRules (val) {
        let date1 = moment(this.formInline.startTime)
        let date2 = moment(val)
        this.formInline.signupEnd = val
        // console.log(date2)
        if (this.formInline.startTime !== undefined && date1.diff(date2) >= 0) {
          this.$message({
            message: '结束时间不能小于开始时间',
            type: 'error'
          })
          this.formInline.signupEnd = ''
        }
        this.formInline.endTime = moment(val).format('YYYY-MM-DD')
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      examine (language, id, pager) {
        let that = this
        // that.dialogVisiblele = true  
        that.cid = id
        if (language === 'en') {
          that.$router.push({
            path: '/examineAdd/en/' + id + '/' + pager
          })
        } else if (language === 'cn') {
          that.$router.push({
            path: '/examineAdd/cn/' + id + '/' + pager
          })
        }
      },
      subGroup () {
        // that.cid
        let that = this
        if (that.textares === '') {
          that.$message({
            message: '提交失败，请输入审核信息',
            type: 'error'
          })
          return false
        }
        that.dialogVisible = false
        that.$message({
          message: '提交成功',
          type: 'success'
        })
      },
      sub1 (id) {
        var that = this
        that.$confirm('确定提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(URL.api_name + 'backofficeapi/coupon/mark/delete.do', {
            params: {
              id: id
            }
          }).then(res => {
            if (res.data.status === 'success') {
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
  .Zvertical{ display:inline-block; line-height: 36px; height:36px;}
.el-input{ vertical-align: middle;}
</style>
