<template>
  <div class="page-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :pager-count="1"
      :page-sizes="[1, 5, 8, 10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
  import Pager from '@/components/common/pager'
  export default {
    props: ['currentPage', 'totalCount', 'pageSize'],
    data () {
      return {
        // pageSize: 10
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.$emit('handleCurrentChange', val)
      },
      handleSizeChange (val) {
        this.$emit('handleSizeChange', val)
      }
    },
    components: {
      Pager: Pager
    }
  }
</script>
<style lang="less">
</style>
