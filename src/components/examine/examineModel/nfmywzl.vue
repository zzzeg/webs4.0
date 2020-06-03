<template>
  <div class="base_msg blockContent">
    <div class="subItems">
      <div class="subname">
        <span>内分泌药物总览</span>
      </div>
      <el-table class="tableList hasLine" :data="formData1" stripe>
        <el-table-column label="内分泌药物" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.drugName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总结论">
          <template slot-scope="scope">
            <span>{{ scope.row.conclusion }}</span>
          </template>
        </el-table-column>
     </el-table>
    </div>


  </div>
</template>
<script>
  export default {
    props: {
        formDatas:{
            type:Array
        }
    },
    created() {
    },
    data () {
      return {
        isEdit1: false,
        isEdit2: false,
        formData: [],
        formData1: [],
        cacheData: {},
            minMark: '1',
            checkNum: false,
            popData1: {
              headList: [],
              datas: {
                cancers: {},
                desc: '',
                drugControls: [],
                gene: '',
                listReportVariant: [],
                molecularNetworkImg: '',
                panels: [],
                pathwayInfos: [],
                termsImg: ''
              }
            },
          property: '',
          pvalue: '',
          row: {},
          keyVals: '',
        // pageSize: 10
      }
    },
    methods: {
      diseaseClick(row, pvalue, enValue) {
        //
        let that = this
        that.property = 'drug'
        that.pvalue = pvalue
        that.row = row
        that.keyVals = enValue
        that.toogleExpand(row)
        row.checkCell = ''
      },
      cellClick(row, column, cell, event) {
        // con
        console.log(row)
        console.log(column)
        // console.log(row)
        // console.log(row)
        // return false
        let that = this
        if(row.isEdit || row.isAdd) {// 编辑状态不给点击
          return false
        }
        if(column.property == 'variant' && row.reportVariant.variant == '野生型') {
          return false
        }
        that.property = column.property
        that.pvalue = row[column.property]
        that.row = row
        that.keyVals = row.reportVariant.code
        if(column.property == 'variant' || column.property == 'gene') {
          that.toogleExpand(row)
        }
        if(row.checkCell == '') {
          row.checkCell = column.property
        } else {
          row.checkCell = ''
        }
      },
      toogleExpand(row) {
        let $table = this.$refs.table
        this.formData1.map((item) => {
          if (row.code != item.code) {
            $table.toggleRowExpansion(item, false)
            item.checkCell = ''
          }
        })
        $table.toggleRowExpansion(row)
      },
      changeEdit(val, index) {
        let that = this
        // that.formData1.list[index].isEdit = val == 'true' ?  true : false
        that.$set(that.formData1.list[index], 'isEdit', true)
      },
      cancerChange(index) {
        let that = this
        // that.formData1.list[index].isEdit = false
        that.$set(that.formData1.list[index], 'isEdit', false)
        // 重新给formData赋值    取消的时候，重置内容
        let n = Object.assign({}, that.formDatas)
        that.formData1 = n
      },
      saveChange (vale, index) {
        let that = this
        // that.formData1.list[index].isEdit = false
        that.$set(that.formData1.list[index], 'isEdit', false)
        let n = Object.assign({}, that.formData1)
        that.formData = n
        that.$emit('saveChange', vale)
      },
      sWindow(type, keyVal) {
        // 查询的类型   基因、疾病、药物    keyVal 是查询参数
        console.log('keyVal is :' + keyVal)
        let that = this
        that.$emit('sWindow', type, keyVal)
      },
      changeTab(item, i) {
        // 改变选中的选项
        let that = this
        for (let ec in that.popData1.headList) {
          that.popData1.headList[ec].checkNum = false
        }
        // that.popData1.headList[i].checkNum = true
        that.$set(that.popData1.headList[i], 'checkNum', true)
        that.checkMark = item
        if (that.popData1.headList[i].data) {
          that.cacheData = that.popData1.headList[i].data
        }
      },
      closePanel(i) {
        // 关闭可关闭的当前选项卡
        let that = this
        that.cacheData = {}
        that.popData1.headList.splice(i, 1)
        let n = parseInt(i) - 1
        let items = that.popData1.headList[n].mark
        that.changeTab(items, n)
      },
      cmmk(i) {
        this.minMark = i
      },
      pushHead(type, scope) {
        let that = this
        let n = {
          canClose: true,
          mark: type,
          checkNum: false
        }
        if (type == 'disease') {
          n['label'] = scope.name
        } else if (type == 'drug') {
          n['label'] = scope.drugName ? scope.drugName : scope.drugEnName
        }
        let isneedinsert = true
        for (let i in that.popData1.headList) {
          if (that.popData1.headList[i].label == n.label) {
            isneedinsert = false
            that.changeTab(that.popData1.headList[i].mark, i)
            break
          }
        }
        if (isneedinsert) {
          n['data'] = scope
          that.popData1.headList.push(n)
          that.cacheData = n['data']
          let xx = that.popData1.headList.length - 1
          that.changeTab(type, xx)
        }
        // 临时内容
        console.log(that.cacheData)
        //跳转到当前选中的栏目
        that.checkMark = type
      },
    },
    watch: {
      formDatas: function(newVal,oldVal){
        let that = this
        this.formData = newVal
        this.formData1 = JSON.parse(JSON.stringify(this.formData))
        for (let i in that.formData1) {
          // that.formData1.list[i]['isEdit'] = false
          that.$set(that.formData1[i], 'isEdit', false)
          that.$set(that.formData1.list[i], 'checkCell', '')
        }
      }
    },
    computed: {

    },
    components: {
      
    }
  }
</script>
<style scope="scoped">
  .el-table__body-wrapper{
    overflow-x: auto!important;
  }
</style>
