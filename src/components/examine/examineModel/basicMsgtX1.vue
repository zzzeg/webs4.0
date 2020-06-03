<template>
  <div class="base_msg blockContent">
    <div class="subItems">
      <div class="subtitle dtitleBg">
        <span>基本信息</span>
        <div class="saveico" v-if="block1 && canEdit" @click="block1 = !block1, saveChange(formData1)"><!-- 保存 --></div>
        <div class="cancel" v-if="block1 && canEdit" @click="block1 = !block1, cancerChange()"><!-- 取消 --></div>
        <div class="bjimg" v-if="!block1 && canEdit" @click="block1 = !block1,changeEdit()"><!-- 编辑 --></div>
      </div>
      <div class="inlineItem baskInfo">
        <el-row :gutter="10">
          <el-col :span="8"><span class="color_bask">受检者编号：</span>
            <!-- <el-col :span="4"> -->
            <div class="tableListItem" v-if="!block1">{{ formData.code }}&nbsp;</div>
            <el-input class="editFrom" v-if="block1" v-model="formData1.code" placeholder="受检者编号"></el-input>
          </el-col>
          <el-col :span="8"><span class="color_bask">姓名：</span>
            <div class="tableListItem" v-if="!block1">{{ formData.name }}&nbsp;</div>
            <el-input class="editFrom" v-if="block1" v-model="formData1.name" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="8"><span class="color_bask">性别：</span>
            <div class="tableListItem" v-if="!block1">
              {{ formData.gender === 1 ? '男' : formData.gender === 2 ? '女' : '' }}&nbsp;
            </div>
            <el-select class="editFrom" v-if="block1" clearable v-model="formData1.gender" placeholder="性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-col>

        </el-row>
        <el-row :gutter="10">
          <el-col :span="8"><span class="color_bask">年龄：</span>
            <div class="tableListItem" v-if="!block1">{{ formData.age }}&nbsp;</div>
            <el-input class="editFrom" v-if="block1" v-model="formData1.age" placeholder="年龄"></el-input>
          </el-col>

          <el-col :span="8"><span class="color_bask">住院号：</span>
            <div class="tableListItem" v-if="!block1">{{ formData.hospitalCode }}&nbsp;</div>
            <el-input class="editFrom" v-if="block1" v-model="formData1.hospitalCode" placeholder="住院号"></el-input>
          </el-col>

          <el-col :span="8"><span class="color_bask">送检科室：</span>
            <div class="tableListItem" v-if="!block1">{{ formData.inspectionHospitalDepartmentName }}&nbsp;</div>
            <el-input class="editFrom" v-if="block1" v-model="formData1.inspectionHospitalDepartmentName" placeholder="住院号"></el-input>
          </el-col>
        </el-row>
		<el-row>
		  <el-col :span="8"><span class="color_bask">送检日期：</span>
		  <div class="tableListItem" v-if="!block1">{{ formData.idCard }}&nbsp;</div>
		  <el-input class="editFrom" v-if="block1" v-model="formData1.idCard" placeholder="送检日期"></el-input>
		  </el-col>
		</el-row>
      </div>
    </div>
    <!-- 临床诊断 -->
    <div class="subItems">
      <div class="subtitle dtitleBg">
        <span>临床诊断</span>
        <div class="saveico" v-if="block3 && canEdit" @click="block3 = !block3, saveChange(formData1)"></div>
        <div class="cancel" v-if="block3 && canEdit" @click="block3 = !block3, cancerChange()"></div>
        <div class="bjimg" v-if="!block3 && canEdit" @click="block3 = !block3,changeEdit()"></div>
      </div>
      <div class="inlineItem">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="tableListItem" style="margin-left:0" v-if="!block3">{{ formData1.clinicalDiagnosis }}&nbsp;
            </div>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFrom" style="width:100%;"
                      v-if="block3" v-model="formData1.clinicalDiagnosis"
                      placeholder="临床诊断"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 病理诊断 -->
    <div class="subItems" v-if="productType != '21'">
      <div class="subtitle dtitleBg">
        <span>病理诊断</span>
        <div class="saveico" v-if="block4 && canEdit" @click="block4 = !block4, saveChange(formData1)"></div>
        <div class="cancel" v-if="block4 && canEdit" @click="block4 = !block4, cancerChange()"></div>
        <div class="bjimg" v-if="!block4 && canEdit" @click="block4 = !block4,changeEdit()"></div>
      </div>
      <div class="inlineItem">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="tableListItem" style="margin-left:0" v-if="!block4">{{ formData.pathologyDiagnosis }}&nbsp;
            </div>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFrom" style="width:100%;"
                      v-if="block4" v-model="formData1.pathologyDiagnosis"
                      placeholder="病理诊断"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 既往史 -->
    <div class="subItems" v-if="productType != '21'">
      <div class="subtitle dtitleBg">
        <span>既往史</span>
        <div class="saveico" v-if="block5 && canEdit" @click="block5 = !block5, saveChange(formData1)"></div>
        <div class="cancel" v-if="block5 && canEdit" @click="block5 = !block5, cancerChange()"></div>
        <div class="bjimg" v-if="!block5 && canEdit" @click="block5 = !block5,changeEdit()"></div>
      </div>
      <div class="inlineItem">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="tableListItem" style="margin-left:0" v-if="!block5">{{ formData.beforeMedicalHistory }}&nbsp;
            </div>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFrom" style="width:100%;"
                      v-if="block5" v-model="formData1.beforeMedicalHistory"
                      placeholder="既往史"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 现病史 -->
    <div class="subItems" v-if="productType != '21'">
      <div class="subtitle dtitleBg">
        <span>现病史</span>
        <div class="saveico" v-if="block6 && canEdit" @click="block6 = !block6, saveChange(formData1)"></div>
        <div class="cancel" v-if="block6 && canEdit" @click="block6 = !block6, cancerChange()"></div>
        <div class="bjimg" v-if="!block6 && canEdit" @click="block6 = !block6,changeEdit()"></div>
      </div>
      <div class="inlineItem">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="tableListItem" style="margin-left:0" v-if="!block6">{{ formData.recentMedicalHistory }}&nbsp;
            </div>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFrom" style="width:100%;"
                      v-if="block6" v-model="formData1.recentMedicalHistory" placeholder="现病史"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 家族史 -->
    <div class="subItems" v-if="productType != '21'">
      <div class="subtitle dtitleBg">
        <span>家族史</span>
        <div class="saveico" v-if="block7 && canEdit" @click="block7 = !block7, saveChange(formData1)"></div>
        <div class="cancel" v-if="block7 && canEdit" @click="block7 = !block7, cancerChange()"></div>
        <div class="bjimg" v-if="!block7 && canEdit" @click="block7 = !block7,changeEdit()"></div>
      </div>
      <div class="inlineItem">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="tableListItem" style="margin-left:0" v-if="!block7">{{ formData1.familyMedicalHistory }}&nbsp;
            </div>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFrom" style="width:100%;"
                      v-if="block7" v-model="formData1.familyMedicalHistory"
                      placeholder="家族史"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 用药史 -->
    <div class="subItems" v-if="productType != '21'">
      <div class="subtitle dtitleBg hismor">
        <span>用药史</span>
        <div class="saveico" v-if="block8 && canEdit" @click="block8 = !block8, saveChange(formData1)"></div>
        <div class="cancel" v-if="block8 && canEdit" @click="block8 = !block8, cancerChange()"></div>
        <div class="bjimg" v-if="!block8 && canEdit" @click="block8 = !block8,changeEdit()"></div>
      </div>
      <div class="hismedication">
        <el-row class="hismor">
          <el-col :span="18">药物名称</el-col>
          <el-col :span="2">用药时长</el-col>
          <el-col :span="2">疗效</el-col>
          <el-col :span="2" v-if="block8 && canEdit"><el-button type="text" @click="adddrug">添加</el-button></el-col>
        </el-row>

        <el-row style="color:#7F8493;" v-if="formData1.medicationHistoryList.length>0" v-for="(item, index) in formData1.medicationHistoryList" :key="index">
          <el-col :span="18">
            <div class="itemhis" v-if="!block8">
              <span v-for="(x, y) in item.medicationDrug" :key="y" class="dunhao">{{ formatDrugName(x) }}</span>
            </div>
            <el-select v-model="item.medicationDrug" v-if="block8" multiple filterable allow-create default-first-option>
              <el-option v-for="(itemer, eee) in drugTypeList" :key="eee" :label="itemer.drugName == '' ? itemer.drugEnName : itemer.drugName" :value="itemer.id" ></el-option>
            </el-select>

            <!-- <div class="textfa" v-if="!formList.isEdit" v-for="(drug, xxx) in formList.drugSet" :key="xxx">{{ drug | formatDrug }}</div>
                        <el-select class="selectdg" v-model="formList.drugSet" v-if="formList.isEdit" multiple filterable allow-create default-first-option>
                            <el-option v-for="(item, eee) in optionItem" :key="eee" :label="item.drugName == '' ? item.drugEnName : item.drugName" :value="item.id"></el-option>
                        </el-select> -->
          </el-col>

          <el-col :span="2" style="margin-left: -10px;margin-right: 8px;">
            <div class="itemhis" v-if="!block8">{{ item.durationOfMedication }}</div>
            <el-input class="edithis" v-model="item.durationOfMedication" v-if="block8"></el-input>
          </el-col>

          <el-col :span="2">
            <div class="itemhis" v-if="!block8">{{ item.efficacy }}</div>
            <el-input class="edithis" v-model="item.efficacy" v-if="block8"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="text" class="btn" v-if="block8" @click="deldrug(index)">删除</el-button>
          </el-col>
        </el-row>

        <el-row style="color:#7F8493;" v-if="formData1.medicationHistoryList.length<1">
          <el-col :span="18">
            <div class="itemhis" v-if="!block8">
              <span>N/A</span>
            </div>

          </el-col>

          <el-col :span="2" style="margin-left: -10px;margin-right: 8px;">
            <div class="itemhis" v-if="!block8"></div>
          </el-col>

          <el-col :span="2">
            <div class="itemhis" v-if="!block8"></div>
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import URL from '@/common/js/URL.js'
  import Pager from '@/components/common/pager'
  import moment from 'moment'
  export default {
    props: {
      formDatas: {
        type: Object
      }
    },
    created() {
      this.getDrugList() //查药物列表
    },
    data() {
      return {
        productType: this.$route.params.productType,
        code: this.$route.params.id, // projectCode
        formData: {},
        formData1: {},
        block1: false,
        block2: false,
        block3: false,
        block4: false,
        block5: false,
        block6: false,
        block7: false,
        block8: false,
        block9: false,
        canEdit: true,
        loading: false,
        xxxxx: ['阿比特龙'],
        drugData: [],
        radio: '1',
        drugTypeList: []
      }
    },
    methods: {
      changeEdit(val, editorName) {
        let that = this

        that[editorName] = val == 'true' ? true : false,
          that.canEdit = true
      },
      cancerChange(editorName) {
        let that = this
        that[editorName] = false
        // 重新给formData赋值    取消的时候，重置内容
        let n = Object.assign({}, that.formDatas)
        that.formData1 = n
      },
      saveChange(vale, editorName) {
        let that = this
        this[editorName] = false
        // let n = Object.assign({}, that.formData1)
        // this.formData = n
        this.$emit('saveChange', vale)
      },
      getDrugInfo(num) { // 查询用药史
        let that = this
        axios.get(URL.api_name + 'cloud/report/viewMedicationHistoryInfo', {
          params: {
            projectCode: that.code
          }
        }).then(function (respose) {
          if (respose.data.code === '100') {
            that.drugData = respose.data.data
          }
        }, function (error) {
          that.$message({
            type: 'error',
            message: '查询失败' + error,
            duration: 1000
          })
        })
      },
      getDrugList() { // 药物列表查询
        let that = this
        axios.get(URL.api_name + 'report/getDrugControlList', {
          params: {
            projectCode: that.code,
            pageSize: 9999,
            pageNumber: 1
          }
        }).then(function (respose) {
          if (respose.data.code === '100') {
            that.drugTypeList = respose.data.data.list
            for (let i = 0; i < that.drugTypeList.length; i++) {
              that.drugTypeList[i].id = that.drugTypeList[i].id + ''
              // let n = that.drugTypeList[i].drugName === "" ? '' : '-[' + that.drugTypeList[i].drugName + ']'
              // that.drugTypeList[i]['drugNameZ'] = that.drugTypeList[i].drugEnName + n
            }
          } else {
            that.$message({
              type: 'error',
              message: '药物查询失败' + respose.data.message,
              duration: '1000'
            })
          }
        }), function (error) {
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: '1000'
          })
        }
      },
      formatDrugName (val) {
        let that = this
        let n = ''
        for (let i in that.drugTypeList) {
          if (val == that.drugTypeList[i].id) {
            n = that.drugTypeList[i].drugName == '' ? that.drugTypeList[i].drugEnName : that.drugTypeList[i].drugName
            break
          }
        }
        return n
      }
    },
    watch: {
      formDatas: function (newVal, oldVal) {
        let that = this
        this.formData = newVal
        this.formData1 = JSON.parse(JSON.stringify(this.formData))
        // for (let i in that.formData1.medicationHistoryList) {
        // 	that.$set(that.formData1.medicationHistoryList[i], )
        // }
      }
    }
  }
</script>
