<template>
  <div class="base_msg blockContent">
    <div class="subItems">
			<div class="subname">
				<span>靶向临床试验入组推荐</span>
			</div>
      <div class="search-wrapper">
        <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
          <el-form-item label="药物">
            <el-input size="medium" v-model="formInline.interventionName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="nctId号">
            <el-input size="medium" v-model="formInline.nctId" placeholder="nctId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="blockSearch(formInline)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="addBar" style="padding:0px 0 10px 0; text-align:right;">
        <el-button type="primary" size="medium" @click="dialogSearch(1)">+添加国内</el-button>
        <el-button type="primary" size="medium" @click="dialogSearch(0)">+添加国外</el-button>
        <el-button type="primary" size="medium" @click="updateClinical(1)">更新入组</el-button>
      </div>
      <p style="margin:20px 0 10px 0;font-size: 14px;">根据对受检者基因变异情况、疾病信息、地点及临床试验招募地点、治疗方案和临床试验阶段等信息，从clinicaltrials.gov和chinadrugtrials.org网站筛选出符合条件的正在招募中的临床试验，推荐如下。详细信息请查看ClinicalTrials等相关网站的具体介绍。</p>
      <div class="noContentsDiv" v-if="formData1.list.length == 0">
        暂无内容
      </div>
      <div class="table-cont" v-for="(recommended, index) in formData1.list" v-else :key="index">
        <table>
          <tr>
              <td width="150"></td>
              <td></td>
            </tr>
          <tr>
            <th colspan="2">
              <div class="delico" @click="pushListItem('del', recommended.code)"></div>
              {{ index + 1 }}、<a target="_blank" :href="recommended.url">{{ recommended.nctId }}</a>
            </th>
            <!-- <th align="right">
              <el-button type="danger" size="small" @click="pushListItem('del', recommended.code)">删除</el-button>
              <div class="delico" @click="pushListItem('del', recommended.code)"></div>
            </th> -->
          </tr>
          <tr>
            <td width="150">临床试验题目</td>
            <td>{{ recommended.title }}</td>
          </tr>
          <tr>
            <td>临床试验阶段</td>
            <td>{{ recommended.phase }}</td>
          </tr>
          <tr>
            <td>药物/治疗方案</td>
            <td>{{ recommended.interventionName }}</td>
          </tr>
          <tr>
            <td>疾病/适应症</td>
            <td>{{ recommended.indications }}</td>
          </tr>
          <tr v-for="(items, indexed) in recommended.tumorTralsContactList" :key="indexed">
            <td>招募地点{{ recommended.tumorTralsContactList.length > 0 ? indexed + 1 : '' }}</td>
            <td>{{items.recruitPlace}}<br/>{{items.contacInformation}}</td>
          </tr>
          <tr>
            <td>入组条件</td>
            <td>
              <div :style="'display:inline-block;height:' + (recommended.isOpen ? 'auto' : '8em') + '; width:100%; overflow:hidden;'" v-html="recommended.include"></div>
              <a href="javascript:;" style="text-align: center; display:block; padding-right:100px;" @click="recommended.isOpen = !recommended.isOpen">
              <i class="sanjiaoico" :style="'transform:rotate(' + (recommended.isOpen ? '180' : '0') + 'deg); margin-top:-' + (recommended.isOpen ? '5' : '0') + 'px'"></i>
              {{recommended.isOpen ? '收起全文' : '展开全文'}}
              </a>
            </td>
          </tr>
          <!-- <tr>
            <td>联系方式</td>
            <td><pre>{{ recommended.contact_information }}</pre></td>
          </tr> -->
        </table>
      </div>

    </div>
    


  </div>
</template>
<script>
  export default {
    props: {
        formDatas:{
            type:Object
        },
        formInline: {
          type: Object
        }
    },
    created() {
    },
    data () {
      return {
        isEdit1: false,
        isEdit2: false,
        formData: {},
        formData1: {
          list: []
        },
        restaurants: [],
        restaurantsList: [],
        // formInline: {
        //   code: '',
        //   drug: '',
        //   gene: '',
        //   mutation: '',
        //   sourceEvidence: '',
        //   langType: '',
        //   projectCode: '',
        //   clinicalSignificance: '',
        //   variantClassification: '',
        //   hgmdDmDp: '',
        //   checkItem: ''
        // }
        
        
        pageSize: 10
      }
    },
    methods: {
      showMsg(index, obj) {
        let that = this
        console.log(index)
        that.formData1.list.splice(index + 1, 0, obj)
        console.log(that.formData1.list)
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
      dialogSearch(val) {
        this.$emit('dialogSearch', val)
      },
      blockSearch(formInline) {
        // 查询
        let that = this
        that.$emit('search', formInline)
      },
      updateClinical(type) {
        let that = this
        // 免疫是2  靶向是1   当前页是靶向
        that.$emit('updateClinical', type)
      },
      inputSub(itemCode, keyName, keyValue) {
        // 修改
        let that = this
        that.$emit('saveChange', that.formDatas.code, itemCode, keyName, keyValue)
      },
      querySearch(queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      pushListItem(type, code) {
        // 删除
        let that = this
        that.$emit('pushListItem', type, code)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      }
    },
    watch: {
      formDatas: function(newVal,oldVal){
      	let that = this
        this.formData = newVal
        this.formData1 = JSON.parse(JSON.stringify(this.formData))
        for (let i in that.formData1.list) {
        	// that.formData1.list[i]['isEdit'] = false
        	that.$set(that.formData1.list[i], 'isOpen', false)
        }
      }
    },
    computed: {

    }
  }
</script>
