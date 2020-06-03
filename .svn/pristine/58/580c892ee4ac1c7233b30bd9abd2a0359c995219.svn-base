<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 项目列表</el-breadcrumb-item>
        <el-breadcrumb-item>选择分析内容</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
      <el-form :model="formData" class="demo">
        <el-form-item>
          <el-checkbox-group 
            v-model="checkedCities"
            class="serviceTree">
            <el-checkbox v-for="item in dataList" :disabled="item.status === 1" :label="item.id" :key="item.id">{{ item.label }}<span class="smaller">{{ item.description }}</span></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="　">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button type="primary" @click="sure">提交</el-button>
          <el-button @click="$router.go('-1')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      this.getListData()
    },
    data () {
      return {
        code: this.$route.params.id,
        formData: {},
        treeData: [],
        checkedCities: [],
        cantSelect: [],
        selectAll: [],
        customizeBlocks: [],
        dataList: [],
        defaultProps: {
          label: 'label'
        },
        checkAll: false,
        isIndeterminate: true,
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getListData () {
        var that = this
        axios.get(URL.api_name + 'report/product_report', {
          params: {
            projectCode: that.$route.params.id
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.treeData = res.data.data
          }
          for (let i = 0; i < that.treeData.length; i++) {
            that.dataList.push({
              id: that.treeData[i].code,
              label: that.treeData[i].name,
              status: that.treeData[i].status,
              description: that.treeData[i].description
            })
            that.customizeBlocks.push(that.treeData[i].code)
            if (that.treeData[i].status === 2) {
              // 可以改变选择的部分
              that.selectAll.push(that.treeData[i].code)
            } else if (that.treeData[i].status === 1) {
              // 不可改变选择的部分
              that.cantSelect.push(that.treeData[i].code)
            }
          }
          that.checkedCities = that.customizeBlocks
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      handleCheckAllChange (event) {
        // 全选/取消全选
        let that = this
        this.checkedCities = event.target.checked ? that.customizeBlocks : that.cantSelect
        this.isIndeterminate = false
      },
      cancelCheck () {
        this.$refs.tree.setCheckedKeys([])
        this.selected = false
      },
      sure () {
        // 把选中的遍历添加到提交数据队列
        let that = this
        if (that.checkedCities.length < 1) {
          that.$message({
            message: '请至少选择一条分析内容',
            type: 'error'
          })
          return false
        }
        axios.post(URL.api_name + 'cloud/add_flow_ins', {
          customizeBlocks: that.checkedCities,
          projectCode: that.code
        }).then((res) => {
          if (res.data.code === '100') {
            that.$message({
              message: res.data.message,
              type: 'success',
              onClose: function () {
              }
            })
            that.$router.push({
              path: '/service'
            })
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
.smaller {color: #aaa;
    font-size: 12px;
    margin-left: 15px;}
</style>
<style lang="less">
.el-checkbox-group.serviceTree {border:solid 1px #ccc; padding:15px 10px;}
.el-checkbox-group.serviceTree .el-checkbox{ display:block; margin-left:15px}
.el-tree.serviceTree > .el-tree-node:first-child .el-tree-node__expand-icon.is-leaf {margin-left:-43px;}
</style>
