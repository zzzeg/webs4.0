<template>
  <div class="list">
		<div class="contentTitle pdlr20">重点变异信息</div>
    <div class="rolelist_content">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.patientName" size="medium" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="患者来源">
          <el-input v-model="formInline.hospital" size="medium" placeholder="患者来源"></el-input>
        </el-form-item>

        <el-form-item label="诊断">
          <el-input v-model="formInline.clinicalDiagnosis" size="medium" placeholder="诊断"></el-input>
        </el-form-item>

        <el-form-item label="panel">
          <el-input v-model="formInline.panel" size="medium" placeholder="panel"></el-input>
        </el-form-item>

        <el-form-item label="样本类型">
          <el-input v-model="formInline.sampleType" size="medium" placeholder="样本类型"></el-input>
        </el-form-item>

        <el-form-item label="基因">
          <el-input v-model="formInline.gene" size="medium" placeholder="基因"></el-input>
        </el-form-item>

        <el-form-item label="变异">
          <el-input v-model="formInline.variant" size="medium" placeholder="变异"></el-input>
        </el-form-item>

        <el-form-item label="变异来源类型">
          <el-select v-model="formInline.variantSource"  placeholder="请选择变异来源类型">
            <el-option label="请选择" :value="0"></el-option>
          	<el-option label="靶向总览" :value="1"></el-option>
          	<el-option label="免疫总览" :value="2"></el-option>
            <el-option label="与疾病相关" :value="5"></el-option>
            <el-option label="可能与疾病相关" :value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="PD-L1">
          <el-input v-model="formInline.pdL1" size="medium" placeholder="PD-L1"></el-input>
        </el-form-item>

        <el-form-item label="TMB">
          <el-input v-model="formInline.tmb" size="medium" placeholder="TMB"></el-input>
        </el-form-item>

        <el-form-item label="致病性">
          <el-input v-model="formInline.clinsig" size="medium" placeholder="致病性"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" size="medium" @click="getListData(formInline.pageNum)">查询</el-button>
          <!-- <el-button type="success" size="medium" @click="addBatchNumber">添加</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data" v-loading="false" element-loading-text="拼命加载中">
      <el-table :data="tableData" style="width: 100%" stripe>
        <!-- <el-table-column type="index" label="序号" width="100" align="center"></el-table-column> -->
        <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60">
          <template slot-scope="scope">
            {{ scope.row.sex === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="60"></el-table-column>
        <el-table-column prop="hospital" label="患者来源"></el-table-column>
        <el-table-column prop="clinicalDiagnosis" label="诊断"></el-table-column>
        <el-table-column prop="panel" label="pannel" width="80"></el-table-column>
        <el-table-column prop="sampleType" label="样本类型">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.sampleType" :key="index" class="dunhao">{{ item }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gene" label="基因"></el-table-column>
        <el-table-column prop="variant" label="变异"></el-table-column>
        <el-table-column prop="allelicDepth" label="丰度" width="80"></el-table-column>
        <el-table-column prop="transcriptExon" label="外显子" width="80"></el-table-column>
        <el-table-column prop="pdL1" label="PD-L1"></el-table-column>
        <el-table-column prop="tmb" label="TMB">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.tmb" :key="index" class="dunhao">{{ item.degree }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="msi" label="MSI">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.msi" :key="index" class="dunhao">
              <div class="p" v-for="(qqq, qi) in item.results[0]" :key="qi">{{qi + ':' + qqq }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mmr" label="MMR">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.mmr" :key="index" class="dunhao">
              <div class="p" v-for="(qqq, qi) in item.results[0]" :key="qi">{{qi + ':' + qqq }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="clinsig" label="致病性"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <!-- <el-table-column prop="createDate" :formatter="dateFormat" label="创建时间" width=""></el-table-column> -->
        <!-- <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="text"  @click="goEdit(scope.row.code)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status !== 1" @click="changeType(scope.row, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.status === 1" @click="changeType(scope.row, 0)">停用</el-button>
              <a target="_blank" :href="url + 'cloud/project/exportCountExcel?batchNumber=' + scope.row.batchNumber + '&token=' + token">
								<el-button type="text">导出</el-button>
							</a>
            </template>
        </el-table-column> -->
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
      this.getListData(this.formInline.pageNum)
    },
    data () {
      return {
        token: localStorage.getItem('authtoken').slice(1,localStorage.getItem('authtoken').length - 1),
        url: URL.api_name,
        formInline: {
          clinicalDiagnosis: '',
          clinsig:'',
          gene:'',
          hospital: '',
          pageNum: 1,
          pageSize: 10,
          panel: '',
          patientName: '',
          pdL1: '',
          sampleType: '',
          tmb: '',
          variant: '',
          variantSource: 0
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
          that.tableData.map(item => {
            item.sampleType = JSON.parse(item.sampleType)
          })
          console.log(that.tableData)
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
        that.getListData(that.formInline.pageNum)
      },
      getListData (num) {
        let that = this
        that.formInline.pageNum = num
        axios.get(URL.api_name + 'cloud/important_variants', {
          params: that.formInline
        }).then(function(respose){
            // console.log(respose.data.data)
            that.tableData = respose.data.data.list
            that.tableData.map(item => {
              if(item.tmb != '') {
                item.tmb = JSON.parse(item.tmb)
              } else {
                item.tmb = []
              }
              if(item.sampleType != '') {
                item.sampleType = JSON.parse(item.sampleType)
              }
              if(item.msi != '') {
                item.msi = JSON.parse(item.msi)
              } else {
                item.msi = []
              }
              if(item.mmr != '') {
                item.mmr = JSON.parse(item.mmr)
              } else {
                item.mmr = []
              }
            })
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
