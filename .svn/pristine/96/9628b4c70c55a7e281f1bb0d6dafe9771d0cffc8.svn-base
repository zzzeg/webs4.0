<template>
    <div class="list">
        <div class="contentTitle pdlr20">组织管理</div>
        <div class="search-wrapper">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="组织">
                    <el-input v-model="formInline.user" placeholder="组织名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addOrganize">添加组织</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 组织表格内容 -->
        <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
            <el-table-column prop="id" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width=""></el-table-column>
            <!-- <el-table-column prop="state" label="状态" width="90"></el-table-column> -->
            <el-table-column prop="" label="操作" width="100">
               <template slot-scope="scope">
                <el-button type="text"  @click="goEdit(scope.row.id,scope.row.roleName)">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getGroups"></pager>
    </div>
</template>

<script>
import URL from '@/common/js/URL.js'
import axios from 'axios'
import Pager from '@/components/common/pager'

export default {
    created(){
        this.getGroups(1)
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [
            {
                orgId: '',
                name: '',
                states: '',
                id: ''
            }
        ],
        currentPage: 1,
        pageSize: 10,
        pageNum: 0,
        loading: false,
        totalCount: 0,
      }
    },
    methods: {
        //  获取组织信息
        getGroups (num) {
            let that = this
            that.currentPage = parseInt(num)
            axios.get(URL.api_name + 'cloud/org_list', {
                params: {
                    pageSize: that.pageSize,
                    pageNumber: num
                }
            }).then(function (respose) {
                let data = respose.data.data
                that.tableData = data.list
                that.totalCount = data.total
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
        handelCurrent(val) {
            let that = this
            that.pageSize = val
            that.getGroups(that.currentPage)
          },
        getListData (num) {
            this.currentPage = num
            var that = this
            that.loading = true
            axios.get(URL.api_name + 'cloud/user_list', {
            params: {
                orgId: that.orgId,
                phone: that.formInline.phone,
                pageSize: that.pageSize,
                pageNumber: num,
                userName: that.formInline.name
            }
            }).then(function (respose) {
            let data = respose.data
            that.tableData = data.data.list
            that.loading = false
            that.totalCount = data.data.total
            }, 
            function (error) {
            console.log(error)
            that.loading = false
            that.$message({
                type: 'error',
                message: '查询失败',
                duration: 1000
            })
            })
        },
        search() {
            console.log('submit!');
        }, 
        goEdit(id,name) {
            // alert(id)
            this.$router.push({
                path: '/organizeEdi/' + id
            })
        },
        // 添加组织
        addOrganize(){
            this.$router.push({
                path: '/organizeAdd'
            })
        }
    },
    components: {
      Pager: Pager
    },
}
</script>

<style>
.search_bgc{background-color: #f2f2f2;padding: 15px 0 0px 5px;margin: -10px 0 10px 0}
</style>
