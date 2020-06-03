<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 流程管理</el-breadcrumb-item>
        <el-breadcrumb-item>流程详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data"
         element-loading-text="拼命加载中">
      <el-form :model="formData" label-width="180px">
        <el-form-item label="名称：" prop="name">
          <el-col :span="9">
            {{ formData.name }}
          </el-col>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-col :span="9">
            {{ formData.description }}
          </el-col>
        </el-form-item>
        <el-form-item label="图标：">
          <el-col :span="9">
            <img :src="formData.iconUrl" width="80px" height="80px">
            <!--图标未加成2017_10_14_↑↑↑-->
          </el-col>
        </el-form-item>
        <el-form-item label="流程图：">
          <el-col :span="22">
            <a :href="formData.imageUrl" target="_blank"><img :src="formData.imageUrl" style="max-width: 100%"></a>
          </el-col>
        </el-form-item>
        <el-form-item label="信号通路图：">
          <el-col :span="9">
            <a :href="formData.diagramUrl" target="_blank"><img :src="formData.diagramUrl" style="max-width: 100%"></a>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" :loading="isLoading" @click="sub('formData')">
              {{ isLoading ? '正在提交' : '提交' }}
          </el-button> -->
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
      // this.getCategoryList()
    },
    data () {
      return {
        formData: {
          code: this.$route.params.id,
          description: '',
          imageUrl: '',
          diagramUrl: '',
          name: ''
        },
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getListData () {
        var that = this
        that.loading = true
        axios.get(URL.api_name + 'cloud/get_flow', {
          params: {
            code: this.$route.params.id
          }
        }).then(function (respose) {
          let data = respose.data
          that.formData = data.data
          that.loading = false
        }, function (error) {
          that.loading = false
          that.$message({
            type: 'error',
            message: '获取列表失败',
            duration: 1000
          })
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
