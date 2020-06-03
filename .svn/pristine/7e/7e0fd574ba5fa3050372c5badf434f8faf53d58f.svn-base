<template>
  <div class="list">
    <div class="contentTitle pdlr20">其他实验列表</div>
    <div class="knowledge_tab" style="display:inline-block; vertical-align:middle;">
      <span :class="{'active': status === 3}" @click="changeSelect(3)">待审</span><span :class="{'active': status === 4}" @click="changeSelect(4)">已完成</span>
    </div>
    <div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" size="medium" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="受检人">
          <el-input v-model="formInline.sickName" size="medium" placeholder="请输入受检人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
          <!-- <el-button type="success" size="medium" @click="addItem">添加</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" sortable label="项目名" width="240">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" sortable>
        </el-table-column>
        <el-table-column label="受检人" width="140">
          <template slot-scope="scope">
            {{ scope.row.sickName }}
          </template>
        </el-table-column>
        <el-table-column label="订单号" width="140">
          <template slot-scope="scope">
            {{ scope.row.sourceOrderNo }}
          </template>
        </el-table-column>
        <el-table-column label="性别" width="80">
          <template slot-scope="scope">
            {{ scope.row.jsonValue.gender === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            {{ scope.row.jsonValue.address }}
          </template>
        </el-table-column>
        <el-table-column prop="race" label="国家" width="100">
          <template slot-scope="scope">
            {{ scope.row.jsonValue.race === 1  ? '中国' : scope.row.jsonValue.race === 2 ? '美国' : scope.row.jsonValue.race === 3 ? '日本' : scope.row.jsonValue.race === 4 ? '韩国' : scope.row.jsonValue.race === 5 ? '马来西亚' : '' }}
          </template>
        </el-table-column>
          <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" width="180" sortable>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="160" sortable>
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '草稿' : scope.row.status === 2 ? '运行中...' : scope.row.status === 3 ? '未审核' : scope.row.status === 4 ? '中英文报告都完成' : scope.row.status === 6 ? '分析流程异常' : scope.row.status === 96 ? '审核中' : '已删除' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" size="mini"   @click="showFileListDialog(scope.row.code)">查看</el-button>
            <el-button type="text" size="mini"  v-if="scope.row.status === 3"  @click="finishProject(scope.row.code)">结束</el-button>
            <el-upload
              v-if="scope.row.status === 3"
              style="display:inline-block;"
              :action="uploadUrl"
              :data="updata"
              :file-list="file[scope.$index].fileList"
              :headers="uploadHeader"
              :show-file-list="false"
              :before-upload="(file)=>beforeupload(file, scope.row.code, scope.row.code)"
              :on-success="(response, file, fileList)=>handelSuccess(response, file, fileList, scope.$index)">
              <el-button size="mini" type="text">报告文件</el-button>
            </el-upload>
            <el-upload
              v-if="scope.row.status === 3"
              style="display:inline-block;"
              :action="uploadUrl"
              :data="updataTwo"
              :file-list="file[scope.$index].fileList"
              :headers="uploadHeader"
              :show-file-list="false"
              :before-upload="(file)=>beforeupload(file, scope.row.code, scope.row.code)"
              :on-success="(response, file, fileList)=>handelSuccess(response, file, fileList, scope.$index)">
              <el-button size="mini" type="text">第三方报告</el-button>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getListData"></pager>


    <el-dialog title="附件下载" :visible.sync="fileSelect" width="60%">
      <div class="clinicalTrialsData">
        <el-table :data="fileFromLists" v-loading="listLoading" border style="width: 100%">
          <el-table-column label="文件名称" prop="fileName">
            <template slot-scope="scope">
              {{ scope.row.fileName + '.' + scope.row.fileSuf }}
            </template>
          </el-table-column>
          <el-table-column label="时间" width="180" :formatter="dateFormat" prop="createTime">
          </el-table-column>
          <el-table-column label="时间" width="180" :formatter="dateFormat" prop="type">
            <template slot-scope="scope">
              {{ scope.row.type === 1 ? '百诺' : '外部' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <a target="_blank" :href="url + 'lab/experiment/downloadFile?code=' + scope.row.code + '&token=' + token"><el-button size="mini" type="primary">下载</el-button></a>
              <el-button type="danger" size="mini" v-if="status == '1'" @click="goDel(scope.row.code)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>



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
      // this.getCategoryList()
    },
    data () {
      return {
        uploadUrl: URL.api_name + 'report/uploadReportFile',
        token: JSON.parse(localStorage.getItem('authtoken')),
        url: URL.api_name,
        formInline: {
          sickName: '',
          name: ''
        },
        updata: {
          projectCode: '',
          reportFileType: 1
        },
        updataTwo:{
          projectCode: '',
          reportFileType: 2
        },
        fileList: [],
        file: [{
          fileList: [{
            name: '',
            url: ''
          }]
        }],
        tableData: [],
        status: 3,

        fileSelect: false,
        fileFromLists:[],

        currentPage: 1,
        pageSize: 10,
        pageNum: 0,
        totalCount: 0,
        btnloading: false,
        addLoading: false,
        listLoading: false,
        loading: false,
        categoryList: []
      }
    },
    components: {
      Pager: Pager
    },
    methods: {
      handelSuccess(response, file, fileList, index) {
        // 成功
        let that = this
        that.$message({
          type: 'success',
          message: '上传成功',
          duration: 2000
        })
        that.getListData()
      },
      beforeupload(file, expcode, code) {
        let that = this
        that.updata.projectCode = expcode
        that.updataTwo.projectCode = expcode
      },
      handelCurrent(val) {
        let that = this
        that.pageSize = val
        that.getListData(that.currentPage)
      },
      search () {
        let that = this
        axios.get(URL.api_name + 'cloud/examineOutgoingList', {
          params: {
            pageSize : 10,
            pageNumber : 1,
            status: that.status,
            projectName: that.formInline.name,
            sickName: that.formInline.sickName
          }
        }).then(function(respose){
            let data = respose.data
            that.tableData = data.data.list
            // JSON字符串转换JSON对象
            for (let i = 0; i < data.data.list.length; i++) {
              if (that.tableData[i].jsonValue) {
                that.tableData[i].jsonValue = JSON.parse(data.data.list[i].jsonValue)
              }
            }
            that.totalCount = data.data.total
        }),function(error){
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: '1000'
          })
        }
      },
      getListData (num) {
        // console.log(typeof(num))
        // this.$route.params.pager = num
        this.currentPage = parseInt(num)
        let that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/examineOutgoingList', {
          params: {
            startTime: '',
            endTime: '',
            flowName: that.formInline.name,
            orgName: that.formInline.category,
            pageSize: that.pageSize,
            status: that.status,
            pageNumber: num
          }
        }).then(function (respose) {
          let data = respose.data
          that.tableData = data.data.list
          // JSON字符串转换JSON对象
          for (let i = 0; i < data.data.list.length; i++) {
            if (that.tableData[i].jsonValue) {
              that.tableData[i].jsonValue = JSON.parse(data.data.list[i].jsonValue)
            }
          }
          that.loading = false
          that.totalCount = data.data.total
          // 重置上传列表
          if(respose.data.code === '100' && respose.data.data.list.length > 0) {
            that.file = []
            for(let n = 0; n < that.pageSize; n++) {
              that.file.push({fileList: [{
                name: '',
                url: ''
              }]})
            }
          }
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      changeSelect(n) {
        let that = this
        that.status = n
        that.getListData(1, n)
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      showFileListDialog(projectCode) {
        // 显示小结——结论——药物查询窗口
        // index是当前索引的列
        let that = this
        that.fileSelect = true
        that.gerFileList(projectCode)
      },
      gerFileList(projectCode) {
        // 查询药物列表内容
        let that = this

        axios.get(URL.api_name + 'report/file/list', {
          params: {
            projectCode: projectCode,
          }
        }).then(function (res) {
          // console.log(res.data.data)
          if (res.data.code === '100') {
            that.fileFromLists = res.data.data
            that.listLoading = false
          }
        }, function (error) {
          // console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败' + error,
            duration: 1000
          })
        })
      },
      finishProject(code){
        let that = this
        let url = 'cloud/finish_project'
        axios.post(URL.api_name + url, {code:code}).then(res => {
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: res.data.message,
              duration: 2000,
              onClose: function() {
              }
            })
            this.getListData(this.$route.params.pager)
          } else {
            that.$message({
              type: 'error',
              message: res.data.message,
              duration: 2000,
            })
          }
          that.loading = false
        }).catch(err => {
          that.$message({
            type: 'error',
            message: '操作失败',
            duration: 1000
          })
          console.log(err)
        })
      }
    },
    computed: {
      uploadHeader () {
        return {
          token: JSON.parse(localStorage.getItem('authtoken'))
        }
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
  .knowledge_tab{margin-top:-10px;}
  .knowledge_tab span{border:1px solid #e6ebf5;margin:0 0px -1px 0; display:inline-block; padding:12px 24px; cursor:pointer;}
  .knowledge_tab span:first-child{margin:0 -1px -1px 0;}
  .knowledge_tab span:hover, .knowledge_tab span.active{ background:#288DF5; color:#fff; border:solid 1px #288DF5;}
</style>

