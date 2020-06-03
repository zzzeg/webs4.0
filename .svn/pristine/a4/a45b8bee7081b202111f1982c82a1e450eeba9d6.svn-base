<template>
  <div class="base_msg blockContent">
    <div class="subItems">
      <div class="subname">
        <span>胚系变异检测结果总览</span>
      </div>
      <div v-if="formData.blockCode == '06'" class="addBar" style="padding:0px 0 10px 0; text-align:right;">
        <!-- <el-button type="primary" @click="pushListItem('add')">添加</el-button> -->
        <!-- <el-button type="primary" @click="">发送邮件</el-button> -->
      </div>
      <div class="">
        <el-table class="tableList hasLine" :data="formData1.list" border stripe style="width: 100%">
            <el-table-column prop="gene" label="基因" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.gene }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="相关疾病">
              <template slot-scope="scope">
                <span>{{ scope.row.hgmdCancer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="位点">
              <template slot-scope="scope">
                <span>{{ scope.row.variant }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="碱基变化">
              <template slot-scope="scope">
                <span>{{ scope.row.cdnaChange }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="氨基酸变化">
              <template slot-scope="scope">
                <span>{{ scope.row.proteinChange }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="突变类型">
              <template slot-scope="scope">
                <span>{{ scope.row.variantType }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="variantTypes" label="基因型">
              <template slot-scope="scope">
                <span>{{ scope.row.geneType }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="detectionResult" label="疾病风险" >
              <template slot-scope="scope">
                <span>{{ scope.row.clinsig }}</span>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <p></p>
      <p><b>*注：</b></p>
      <p>疾病风险是指该突变与致病性的关系，依据为clinvar 数据库和美国医学遗传学与基因组学学会（ACMG）的指南。有以下几种：</p>
      <p>✓ 致病突变，表示该突变会导致疾病。致病机理明确。有确凿的临床证据。</p>
      <p>✓ 疑似致病，表示有研究报道，但还未有确凿的临床证明。或是新的突变，但会对蛋白功能产生严重影响。</p>
      <p>✓ 良性：该突变不会导致疾病，不增加患病风险。有明确的证据。</p>
      <p>✓ 疑似良性：研究报道该突变与疾病无关。但还未有明确的证据。或该突变对蛋白质的功能无影响。</p>
      <p>✓ 意义不明：该突变与疾病的关系，目前尚不明确。</p>

    </div>


  </div>
</template>
<script>
  import popdialog from '@/components/examine/examineModel/popModel/popdialog'
  export default {
    props: {
        formDatas: {
            type: Array
        },
        popData: {
          type: Object
        },
        checkMark: {
          type: String
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
        restaurants: [],
        restaurantsList: [],
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
      }
    },
    methods: {
      blockSearch(formInline) {
        // 查询
        let that = this
        that.$emit('search', formInline)
      },
      sWindow(type, keyVal) {
        // 查询的类型   基因、疾病、药物    keyVal 是查询参数
        console.log('keyVal is :' + keyVal)
        let that = this
        that.$emit('sWindow', type, keyVal)
      }
    },
    watch: {
      formDatas: function(newVal,oldVal){
        let that = this
        this.formData = newVal
        this.formData1 = JSON.parse(JSON.stringify(this.formData))
        for (let i in that.formData1) {
          that.$set(that.formData1[i], 'checkCell', '')
        }
      }
    },
    computed: {

    },
    components: {
      popdialog
    }
  }
</script>
