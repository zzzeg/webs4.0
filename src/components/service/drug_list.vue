<template>
  <div class="list">
		<div class="contentTitle pdlr20">药物列表</div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="药物名称">
          <el-autocomplete class="inline-input" v-model="formInline.drug_name" :fetch-suggestions="querySearch" placeholder="请输入名称" :trigger-on-focus="true" @select="handleSelect" ></el-autocomplete>
        </el-form-item>
        <el-form-item label="药物类型">
          <el-input v-model="formInline.drug_type" placeholder="请输入药物类型"></el-input>
        </el-form-item>
        <!-- <el-form-item label="癌种">
          <el-input v-model="formInline.diseaseEnName" placeholder="请输入癌种"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" size="medium" @click="getListData(1)">查询</el-button>
          <el-button type="success" size="medium" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data" v-loading="false" element-loading-text="拼命加载中">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="drugName" label="中文名" width=""></el-table-column>
        <el-table-column prop="drugEnName" label="英文名称" width=""></el-table-column>
        <!-- <el-table-column prop="drugTradeName" label="商品中文名" width=""></el-table-column>
        <el-table-column prop="drugTradeEnName" label="商品英文名" width=""></el-table-column> -->
        <el-table-column prop="drugType" label="药物类型" width=""></el-table-column>
        <el-table-column prop="status" label="药物状态" width="150">
            <template slot-scope="scope">
            {{ scope.row.status === 1 ? '启用' : '作废' }}
          </template>
        </el-table-column>
        <el-table-column prop="healthInsurance" label="是否医保" width="100px"></el-table-column>
        <el-table-column label="癌肿" width="280">
            <template slot-scope="scope">
              <span class="dunhao" v-for="(i, index) in scope.row.cancerList" :key="index">{{ i.diseaseEnName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text"  @click="goEdit(scope.row.id, currentPage)">编辑</el-button>
            <el-button type="text"  @click="goDel(scope.row.id)">作废</el-button>
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
      // this.getProcessList()
      this.getListData(this.$route.params.pager)
    },
    data () {
      return {
        formInline: {
          drug_type: '',
          drug_name: '',
          diseaseEnName:''
        },
        tableData: [{
          businessName:"",
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
        categoryList: [],
        searchNameList: [],
      }
    },
    components: {
      Pager: Pager
    },
    methods: {
      add () {
        this.$router.push({
          path: '/drugadd/' + this.currentPage
        })
      },
      getProcessList () {
        // 1、进图先获取可用流程列表
        var that = this
        axios.get(URL.api_name + 'cloud/project/business_list').then(function (res) {
          if (res.data.code === '100') {
            let checkItems = res.data.data
            if(checkItems.length > 0){
              for(let i = 0;i < checkItems.length;i++){
                // that.businessNameList.push({
                //   value: checkItems[i].businessName,
                //   code: checkItems[i].code
                // })
                that.searchNameList.push({
                  value: checkItems[i].businessName
                })
              }
            }
            // console.log(checkItems)
            // console.log(that.businessNameList)
          }
        }, function (error) {
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
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
        if (num !== undefined) {
          that.currentPage = parseInt(num)
        }
        // alert(that.currentPage)
        axios.get(URL.api_name + 'report/getDrugControlList', {
          params: {
            status: that.formInline.status,
            pageSize : that.pageSize,
            pageNumber : num,
            drugEnName: that.formInline.drug_name,
            drugType: that.formInline.drug_type,
            // diseaseEnName: that.formInline.diseaseEnName
          }
        }).then(function(respose){
            if ( respose.data.code === '100' ) {
              // that.searchNameList = []
              that.tableData = respose.data.data.list
              that.totalCount = respose.data.data.total
              //  搜索联想功能
              that.searchNameList = []
              if(that.tableData.length > 1){
                for(let i = 0; i < that.tableData.length - 1;i++) {
                  that.searchNameList.push({
                    value: that.tableData[i].drugName
                  })
                }
              }else{
                that.searchNameList = []
              }
              // console.log(that.searchNameList)
            } else {
              that.$message({
                type: 'error',
                message: '查询失败' + respose.data.message,
                duration: '1000'
              })
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
      goEdit(id, pager) {
        // alert(index)
        this.$router.push({
          path: '/drugedit/' + id + '/' + pager
        })
      },
      // goEdit (scope, id, typeid) {
      //   localStorage.setItem('keyer', JSON.stringify(scope.jsonValue))
      //   this.$router.push({
      //     path: '/ServiceEdit/' + id + '/' + typeid
      //   })
      // },
      goDel (id) {
        var that = this
        that.$confirm('确定作废吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(URL.api_name + 'report/updateDrugControlCancel', {id: id}).then(res => {
            if (res.data.code === '100') {
              that.$message({
                type: 'success',
                message: '操作成功',
                duration: 1000
              })
              that.getListData(that.currentPage)
            }
          }).catch(err => {
            that.$message({
              type: 'error',
              message: '操作失败',
              duration: 1000
            })
            console.log(err)
          })
        }).catch(() => {})
      },
      //  添加联想功能
      querySearch(queryString, cb) {
          var searchNameList  = this.searchNameList
          var results = queryString ? searchNameList .filter(this.createFilter(queryString)) : searchNameList
          // 调用 callback 返回建议列表的数据
          cb(results)
      },
      createFilter(queryString) {
          return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          }
      },
      handleSelect(item) {
          console.log(item)
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
  /deep/.el-input__inner{
    height: 36px;
  }
</style>

