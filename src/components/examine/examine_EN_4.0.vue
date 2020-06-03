<template>
  <div class="list" style="position:relative; height:100%">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>解读报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="leftNav">
     <!--  <ul>
        <li v-for="(itemText, index) in navList" :key="index"><a @click="showhistory = false, selectNav(itemText, pageNum)" :class="{'active':itemText.isCheck == '0' , '':itemText.isCheck == '1'}" href="javascript:;">{{ itemText.blockName }}</a></li>
      </ul> -->

      <el-collapse v-model="navActive" class="examine_navList">
        <el-collapse-item :title="i.blockName" v-for="(i,index) in navList" v-if="i.businessBlockVos.length > 0" :key="index" :name="index">
          <a :class="n.isCheck == '0' ? 'nav_items check' : 'nav_items'" href="javascript:;" @click="selectNav(n, 1)" v-for="(n, num) in i.businessBlockVos" :key="num">{{n.blockName}}</a>
        </el-collapse-item>
        <p href="javscript:;" v-else><a :class="i.isCheck == '0' ? 'nav_items check' : 'nav_items'" href="javascript:;" @click="selectNav(i, 1)">{{i.blockName}}</a></p>
      </el-collapse>
    </div>
    <div class="rightContent" v-loading="blockLoading" style="position:relative; z-index:1; height:calc(100% - 40px);">

      <basicMsgt4 :formDatas="reportData" @saveChange="saveChange" v-if="navItemSession.blockCode == '01'"></basicMsgt4>

      <basicMsgCTC :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == 'x4'"></basicMsgCTC>
      
      <sampleMsg :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '03'"></sampleMsg>

      <sampleMsgCTC :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == 'x6'"></sampleMsgCTC>

      <jcjgzlCTC :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == 'x7'"></jcjgzlCTC>

      <jcjgzl :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '61'"></jcjgzl>

      <yhqkfx :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '58'"></yhqkfx>

      <hlxyfx :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '59'"></hlxyfx>

      <fffxpgjgfx :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '9991'"></fffxpgjgfx>

      <bxzlxgjgfx :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '9992'"></bxzlxgjgfx>

      <hlzlxgjgfx :formDatas="reportData" @saveChange="saveChange" v-else-if="navItemSession.blockCode == '9993'"></hlzlxgjgfx>

    </div>
    
    <el-dialog title="附件列表" :visible.sync="wordList" width="50%">
      <el-table :data="wordlistdata">
        <el-table-column label="word名称" prop="wordDownName">
        </el-table-column>
        <!-- <el-table-column label="审核人" prop="name">
        </el-table-column> -->
        <el-table-column label="时间" width="180" :formatter="dateFormat" prop="lastModifyTime">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <a target="_blank" :href="url + 'report/downloadFile?code=' + scope.row.code + '&token=' + token"><el-button size="small" type="primary">下载</el-button></a>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="pdflistdata">
        <el-table-column label="pdf名称">
          <template slot-scope="scope">
            {{ scope.row.fileName + '.' + scope.row.fileSuf }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="审核人" prop="name">
        </el-table-column> -->
        <el-table-column label="时间" width="180" :formatter="dateFormat" prop="createTime">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <a target="_blank" :href="url + 'report/file/download?code=' + scope.row.code + '&token=' + token"><el-button size="small" type="primary">下载</el-button></a>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


    <a style="position: absolute; top:-15px; right:540px; text-decoration:none;"><el-button size="small" type="primary" :disabled="buttonloading" @click="wordList = true, getWordList()">附件下载</el-button></a>

    <el-button type="warning" size="small" :loading="buttonloading" @click="creatWord" style="position:absolute; top:-15px; right:440px;">生成word</el-button>

    <el-button type="danger" size="small" @click="overReport"  :disabled="buttonloading" style="position:absolute; top:-15px; right:20px;">完结</el-button>
  </div>
</template>

<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import Pager from '@/components/common/pager'
  import '@/common/css/Zstyle.css'
  import basicMsgt4 from '@/components/examine/examineModel/basicMsgt4'
  import sampleMsg from '@/components/examine/examineModel/sampleMsg'
  import jcjgzl from '@/components/examine/examineModel/jcjgzl'
  import yhqkfx from '@/components/examine/examineModel/yhqkfx'
  import hlxyfx from '@/components/examine/examineModel/hlxyfx'
  import fffxpgjgfx from '@/components/examine/examineModel/fffxpgjgfx'
  import bxzlxgjgfx from '@/components/examine/examineModel/bxzlxgjgfx'
  import hlzlxgjgfx from '@/components/examine/examineModel/hlzlxgjgfx'
  import basicMsgCTC from '@/components/examine/examineModel/basicMsgCTC'
  import sampleMsgCTC from '@/components/examine/examineModel/sampleMsgCTC'
  import jcjgzlCTC from '@/components/examine/examineModel/jcjgzlCTC'

  export default{
    created() {
      this.getNavList()
    },
    name: 'app',
    data() {
      return {
        code: this.$route.params.id,
        // restaurants 是autocomplate的备选项列表
        restaurants: [],
        pager: this.$route.params.pager,
        // projectRecordCode
        pcode: this.$route.params.pcode,
        sourceOrderNo: this.$route.params.sourceOrderNo,
        productType: this.$route.params.productType,
        url: URL.api_name,
        token: JSON.parse(localStorage.getItem('authtoken')),
        language: 'EN',
        navActive: 0,
        navList: [],
        blockLoading: false,
        navItemSession: {}, // 当前点击的nav item 信息
        pageNum: 1,         // 页码
        pageSize: 10,
        totalCount: 1,
        reportData: {
          "blockCode":"01",
          "blockKey":"subjectInformation",
          "blockName":"基本信息",
          "code":"15438087588260429",
          "createTime":1543808759000,
          "describe":"",
          jsonValue:'{"age":"46 岁","clinicalDiagnosis":"左乳中央区浸润性导管癌 I期pT1cN0M0 (PR+，ER+，HER2-)","examinerCode":"15438087008446009","gender":2,"hospitalCode":"1","id":"15438087588260428","laboratory":"1","userName":"张贤"}',
          "langType":"CN",
          "lastModifyTime":1543808761000,
          "projectCode":"15438087008446009",
          "sort":10
        },
        formInline: { // 查询条件
          code: '',
          drug: '',
          gene: '',
          mutation: '',
          sourceEvidence: '',
          langType: '',
          projectCode: '',
          clinicalSignificance: '',
          variantClassification: '',
          hgmdDmDp: '',
          checkItem: ''
        },
        wordList: false,
        wordlistdata: [],
      }
    },
    methods: {
      // all of function
      getNavList () {
        // 获取导航列表
        let that = this
        let url = URL.api_name + 'report/examine_info'
        axios.get(url, {
          params: {
            langType: that.language,
            projectCode: that.code
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.navList = res.data.data
            that.$set(that.navList[0].businessBlockVos[0], 'isCheck', '0')
            that.navChange(that.navList[0].businessBlockVos[0], that.pageNum)
            // 增加默认第一选项的code，用于修改后的跳转当前页的itemText
            that.navItemSession = that.navList[0].businessBlockVos[0]
            if(that.productType == '21') {
              let n = [{
                blockCode: "9991",
                blockEnName: "Chemotherapy effect analysis",
                blockKey: "testResultSummary",
                blockName: "复发风险评估结果分析",
                businessBlockVos: [],
                businessCode: "",
                code: "",
                eventCode: "",
                isDuplicate: "",
                makeSort: 530,
                parentCode: "10",
                sort: 530,
                sortBlock: "",
                status: 0,
                stringParents: []
              },{
                blockCode: "9992",
                blockEnName: "Chemotherapy effect analysis",
                blockKey: "testResultSummary",
                blockName: "靶向治疗相关结果分析",
                businessBlockVos: [],
                businessCode: "",
                code: "",
                eventCode: "",
                isDuplicate: "",
                makeSort: 530,
                parentCode: "10",
                sort: 530,
                sortBlock: "",
                status: 0,
                stringParents: []
              },{
                blockCode: "9993",
                blockEnName: "Chemotherapy effect analysis",
                blockKey: "testResultSummary",
                blockName: "化疗治疗相关结果分析",
                businessBlockVos: [],
                businessCode: "",
                code: "",
                eventCode: "",
                isDuplicate: "",
                makeSort: 530,
                parentCode: "10",
                sort: 530,
                sortBlock: "",
                status: 0,
                stringParents: []
              }]
              that.navList.push.apply(that.navList, n)
            }
          } else {
            that.$message({
              type: 'error',
              message: '列表查询失败',
              duration: 1000
            })
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      // 点击左侧导航栏目切换内容
      selectNav(navItems, pageNum) {
        let that = this
        that.pageSize = 10
        that.navItemSession = navItems
        // 点击触发赋值，触发查询
        that.navChange(that.navItemSession, pageNum)
      },
      navChange(itemText, num, sort, sortType) {
        // 点击左侧模块导航，请求右侧详情|| 点击分页
        // itemText参数为 blockInfo  整块内容
        // num 为当前页
        // sort 为当前排序的字段keyName
        // sortType 为当前排序的类型  asc、desc、''
        let that = this
        that.blockLoading = true
        that.pageNum = num
        that.totalCount = 0
        that.reportData = {}
        // 初始化查询的基因列表
        that.restaurants = []
        // 给所有的模块导航添加一个选中状态
        for (let i = 0; i < that.navList.length; i++) {
          that.navList[i].isCheck = '1'
          for (let q = 0; q < that.navList[i].businessBlockVos.length; q++) {
            that.navList[i].businessBlockVos[q].isCheck = "1"
          }
        }
        if (itemText.isCheck === "1") {
          itemText.isCheck = "0"
        }
        // 重置查询条件内容
        for (let key in that.formInline) {
          that.formInline[key] = ''
        }
        that.blockSearch(itemText, num, sort, sortType)
      },
      // 模块查询请求
      blockSearch (itemText, num, sort, sortType) {
        // 模块搜索
        let that = this
        that.blockLoading = true
        num = num === undefined ? 1 : num
        that.pageNum = num
        if (sort === '' || sort === null || sort === undefined) {
          sort = ''
        }
        if (sortType === '' || sortType === null || sortType === undefined) {
          sortType = ''
        }
        // 有查询的模块，isser为1，没有查询的模块为空
        let isser = ''
        if (itemText.blockCode === '06' || itemText.blockCode === '07' || itemText.blockCode === '43' || itemText.blockKey === 'tagSummary' || itemText.blockCode === '27' || itemText.blockCode === '28' || itemText.blockCode === '29' || itemText.blockCode === '30' || itemText.blockCode === '31' || itemText.blockCode === '32' || itemText.blockCode === '38' || itemText.blockCode === '39' || itemText.blockCode === '51' || itemText.blockCode === '16' || itemText.blockCode === '21' || itemText.blockCode === '15220308168960783' || itemText.blockCode === '15302351683171404' || itemText.blockCode === '55' || itemText.blockCode === '56' || itemText.blockCode === '57') {
          isser = '1'
        }
        axios.get(URL.api_name + 'report/examine_detail', {
          params: {
            // 麻瓜程序员偷懒，tnd不给输出内容，让我去摘别的模块的内容，写死3块，blockCode 999开头，摘blockCode为61的检测结果总览的第一条数据内容
            blockCode: itemText.blockCode.substring(0, 3) == '999' ? '61' : itemText.blockCode,
            blockKey: itemText.blockKey,
            code: itemText.code,
            isSearch: isser,
            drug: that.formInline.drug,
            gene: that.formInline.gene,
            mutation: that.formInline.mutation,
            transcriptExon: that.formInline.transcriptExon,
            sourceEvidence: that.formInline.sourceEvidence,
            clinicalSignificance: that.formInline.clinicalSignificance,
            langType: that.language,
            projectCode: that.code,
            checkItem: that.formInline.checkItem,
            sort: itemText.sort,
            sortType: itemText.sortType,
            pageNum: num,
            pageSize: that.pageSize
          }
        }).then((res) => {
          if (res.data.code === '100') {
            that.reportData = {}
            that.blockLoading = false
            that.reportData = JSON.parse(JSON.stringify(res.data.data))
            // that.totalCount = res.data.data.total
            // 如果有jsonValue，则是单表格
            if (res.data.data.jsonValue) {
              that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            } else if (res.data.data.list) {
              that.totalCount = res.data.data.total
            }
            // geneList
            if (itemText.blockCode === '04') {
              that.geneList = []
              for (let s in that.reportData.jsonValue.genes) {
                // that.geneList = that.geneList + s + ','
                that.geneList.push({
                  value: s,
                  checkOut: that.reportData.jsonValue.genes[s]
                })
              }
              for (let n = 0; n < that.sequencingPlatforms.length; n++) {
                if (that.reportData.jsonValue.sequencing_platform === that.sequencingPlatforms[n].value) {
                  that.reportData.jsonValue.sequencing_platform = that.sequencingPlatforms[n].label
                }
              }
              for (let n = 0; n < that.analysisVersions.length; n++) {
                if (that.reportData.jsonValue.analysis_version === that.analysisVersions[n].value) {
                  that.reportData.jsonValue.analysis_version = that.analysisVersions[n].label
                }
              }
            }
            if(itemText.blockKey=='specimenInformation'){
               for (let n = 0; n < that.sampleAttributes.length; n++) {
                if (that.reportData.jsonValue.sample_attribute === that.sampleAttributes[n].value) {
                  that.reportData.jsonValue.sample_attribute = that.sampleAttributes[n].label
                }
              }
            }
            // 小结
            if (itemText.blockCode === '41') {
              for (let n = 0; n < that.reportData.jsonValue.summarys.length; n++) {
                that.reportData.jsonValue.summarys[n].arrays = []
                for (let sss = 0; sss < that.reportData.jsonValue.summarys[n].drugList.length; sss++) {
                  that.reportData.jsonValue.summarys[n].arrays.push(that.reportData.jsonValue.summarys[n].drugList[sss].drugEnName + '(' + that.reportData.jsonValue.summarys[n].drugList[sss].drugName + ')')
                }
              }
            }


            if (itemText.blockCode === '18') {
              // 图片
              that.fileList = []
              for (let imgL = 0; imgL < that.reportData.list.length; imgL++) {
                that.fileList.push({
                  code: res.data.data.list[imgL].code,
                  url: that.reportData.list[imgL].pathway_path,
                  name: that.reportData.list[imgL].pathway_name
                })
              }
              that.updata.blockInstanceCode = that.reportData.code
            }
            // 查询__基因 备选 列表
            if (that.reportData.geneList) {
              for (let iee = 0; iee < that.reportData.geneList.length; iee++) {
                that.restaurants.push({
                  value: that.reportData.geneList[iee]
                })
              }
            } else {
              that.restaurants = []
              // alert('没的')
            }

            // return false
            // console.log(that.reportData.list)
          } else {
            // 报错了
            that.blockLoading = false
          }
          // that.$set(that.reportData,)
        }).catch((error) => {
          console.log(error)
        })
      },
      // 切换页码
      handelCurrent(codeObj, val, ssort, ssortType) {
        // 改变每页显示条数pagesize
        let that = this
        that.pageSize = val
        that.blockSearch(codeObj, that.pageNum, ssort, ssortType)
      },
      saveChange(dataCode, itemCode, keyName, keyValue) {
        let that = this
        that.inputSub(dataCode,itemCode,keyName,keyValue)
      },
      inputSub (code, filecode, filedName, filedValue) {
        // 单个修改提交
        let that = this
        if (filecode === '0') {
          filecode = ''
        }
        that.addLoading = true
        axios.post(URL.api_name + 'report/field_update', {
          blockCode: that.reportData.blockCode,
          blockKey: that.reportData.blockKey,
          projectCode: that.reportData.projectCode,
          blockInstanceCode: code,
          pageSize: that.pageSize,
          fieldCode: filecode,
          fieldName: filedName,
          fieldValue: filedValue
        }).then(function (res) {
          if (res.data.code === '100') {
            that.addLoading = false
            // 写了这条会重新渲染表格，导致错位
            // that.reportData = res.data.data
            if (res.data.data.jsonValue) {
              that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            } else if (res.data.data.list) {
              that.totalCount = res.data.data.total
            }
            if (that.reportData.blockCode === '01') {
              // 重设"基本信息"里的 race 种族的显示文本内容
              for (let n = 0; n < that.races.length; n++) {
                if (that.reportData.jsonValue.race === that.races[n].value) {
                  that.reportData.jsonValue.race = that.races[n].label
                }
              }
            }
            // geneList
            if (that.reportData.blockCode === '04') {
              that.geneList = []
              for (let s in that.reportData.jsonValue.genes) {
                // that.geneList = that.geneList + s + ','
                that.geneList.push({
                  value: s,
                  checkOut: that.reportData.jsonValue.genes[s]
                })
              }
            }
            // 小结
            if (that.reportData.blockCode === '41') {
              for (let n = 0; n < that.reportData.jsonValue.summarys.length; n++) {
                that.reportData.jsonValue.summarys[n].arrays = []
                for (let sss = 0; sss < that.reportData.jsonValue.summarys[n].drugList.length; sss++) {
                  that.reportData.jsonValue.summarys[n].arrays.push(that.reportData.jsonValue.summarys[n].drugList[sss].drugName)
                }
              }
            }
            // 修改完，回到当前页
            // console.log('xe')
            that.blockSearch(that.navItemSession, that.pageNum, that.reportData.sort, that.reportData.sortType)
            // 修改完毕提示成功信息
            that.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000
            })
          } else {
            // console.log(error)
            that.$message({
              type: 'error',
              message: '修改失败：' + res.data.message,
              duration: 1000
            })
            that.addLoading = false
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '提交失败',
            duration: 1000
          })
        })
        that.addLoading = false
      },
      getWordList() {
        let that = this
        // 查询word列表
        axios.get(URL.api_name + 'report/getWordList', {
          params: {
            projectCode: that.code,
            langType: that.language
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.wordlistdata = res.data.data
            // console.log(that.wordlistdata)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
        // pdf List
        axios.get(URL.api_name + 'report/file/list', {
          params: {
            projectCode: that.code,
            langType: that.language
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.pdflistdata = res.data.data
            // console.log(that.pdflistdata)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      downWord() {
        // 下载word
        var that = this
        axios.get(URL.api_name + 'report/report_info', {
          params: {
            projectCode: that.code,
            langType: that.language
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            let tokenVal = JSON.parse(localStorage.getItem('authtoken'))
            // that.htmlUrlF = URL.api_name + 'report/view/' + that.language + '/' + that.code + '.html'+'?token=' + tokenVal
            // that.pdfUrlF =  URL.api_name + 'report/view/' + that.language + '/' + that.code + '.pdf'+'?token=' + tokenVal
            if (res.data.data.wordUrl !== null) {
              that.wordUrlF = URL.api_name + 'report/downloadFile?langType=' + res.data.data.langType + '&projectCode=' + res.data.data.projectCode + '&token=' + tokenVal
            }
            // if (res.data.data.wordUrl !== null || res.data.data.wordUrl !== '') {
            //   that.wordUrlF = res.data.data.wordUrl
            // }
            console.log(that.wordUrlF)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      creatWord() {
        // 生成word
        let that = this
        let n = {}
        that.buttonloading = true
        n['langType'] = that.language
        n['projectCode'] = that.reportData.projectCode
        axios.post(URL.api_name + 'report/generateWord', n).then(function (res) {
          that.buttonloading = false
          if (res.data.code === '100') {
            // 显示返回数据
            that.$message({
              type: 'success',
              message: '生成成功',
              duration: 2000
            })
            // that.downWord()
          } else {
            that.$message({
              type: 'error',
              message: '生成失败：' + res.data.message,
              duration: 2000
            })
          }
        })
      },
      overReport() {
        // 完结
        let that = this
        let n = {}
        n['code'] = that.code
        n['projectRecordCode'] = that.pcode
        axios.post(URL.api_name + 'report/subReportFinish', n).then(function (res) {
          if (res.data.code === '100') {
            // 显示返回数据
            that.$message({
              type: 'success',
              message: '提交成功',
              duration: 2000,
              onClose: function () {
                that.$router.push({
                  path: '/examineAlready/' + that.pager
                })
              }
            })
          } else {
            that.$message({
              type: 'error',
              message: '提交失败：' + res.data.message,
              duration: 2000,
              onClose: function () {
              }
            })
          }
        })
      }
    },
    components: {
      Pager: Pager,
      basicMsgt4,sampleMsg,jcjgzl,yhqkfx,hlxyfx,fffxpgjgfx,bxzlxgjgfx,hlzlxgjgfx,basicMsgCTC,sampleMsgCTC,jcjgzlCTC
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