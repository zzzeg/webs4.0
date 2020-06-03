<template>
  <div class="base_msg blockContent">
			<div class="subtitle dtitleBg">
				<span>检测内容</span>
				<!-- <div class="saveico" v-if="isEdit1 && canEdit" @click="isEdit1 = !isEdit1, saveChange(formData1)"></div> -->
				<!-- <div class="cancel" v-if="isEdit1 && canEdit" @click="isEdit1 = !isEdit1, cancerChange()"></div> -->
				<!-- <div class="bjimg" v-if="!isEdit1 && canEdit" @click="isEdit1 = !isEdit1,changeEdit()"></div> -->

			</div>
      <div class="inlineItem">
        <el-row>
          <el-col :span="7"><span class="color_bask">检测项目：</span>
           <div class="tableListItem"  v-if="!isEdit1">{{ formData.productName }}&nbsp;</div>
            <el-input class="editFrom" v-if="isEdit1" v-model="formData1.productName" placeholder=""></el-input>
          </el-col>
					
					<el-col :span="7"><span class="color_bask">测序平台：</span>
					  <div class="tableListItem"  v-if="!isEdit1">{{ formData.sequencingPlatform }}&nbsp;</div>
					  <el-input class="editFrom" v-if="isEdit1" v-model="formData1.sequencingPlatform" placeholder="" style="margin-left:-51px;"></el-input>
					</el-col>
					
					<el-col :span="7"><span class="color_bask">检测日期：</span>
					  <div class="tableListItem" v-if="!isEdit1">{{ formData.detectionDate}}&nbsp;</div>
					  <el-input class="editFrom" v-if="isEdit1" v-model="formData1.detectionDate" placeholder=""></el-input>
					</el-col>
        </el-row>
        <el-row>
					<el-col :span="7"><span class="color_bask">检测基因数：</span>
					  <div class="tableListItem" v-if="!isEdit1">{{ formData.productGeneNum }}&nbsp;</div>
					  <el-input class="editFrom" v-if="isEdit1" v-model="formData1.productGeneNum" placeholder=""></el-input>
					</el-col>
				
					<el-col :span="7"><span class="color_bask">检出基因数：</span>
					  <div class="tableListItem" v-if="!isEdit1">{{ formData.detectionGeneNum }}&nbsp;</div>
					  <el-input class="editFrom" v-if="isEdit1" v-model="formData1.detectionGeneNum" placeholder=""></el-input>
					</el-col>

          <el-col :span="7"><span class="color_bask">参考基因组：</span>
            <div class="tableListItem" v-if="!isEdit1">{{ formData.ref }}&nbsp;</div>
            <el-input class="editFrom" v-if="isEdit1" v-model="formData1.ref" placeholder=""></el-input>
          </el-col>
        </el-row>
				
				<el-row>
					<el-col :span="7"><span class="color_bask">知识库版本：</span>
					 <div class="tableListItem" v-if="!isEdit1">{{ formData.knowledgeVersion}}&nbsp;</div>
						<el-input class="editFrom" v-if="isEdit1" v-model="formData1.knowledgeVersion" placeholder=""></el-input>
					</el-col>
					
					<el-col :span="7"><span class="color_bask">分析流程版本：</span>
					 <div class="tableListItem" v-if="!isEdit1">{{ formData.analysisVersion }}&nbsp;</div>
						<el-input class="editFrom" v-if="isEdit1" v-model="formData1.analysisVersion" placeholder="" style="margin-left:-50px;"></el-input>
					</el-col>
					
				</el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
        formDatas:{
            type:Object
        }
    },
    created() {
    },
    data () {
      return {
        isEdit1: false,
        isEdit2: false,
        block3: false,
        canEdit: true,
        formData: {},
        formData1: {}
      }
    },
    methods: {
      changeEdit(val, editorName) {
        let that = this
        that[editorName] = val == 'true' ?  true : false
      },
      cancerChange(editorName) {
        let that = this
        that[editorName] = false
        // 重新给formData赋值    取消的时候，重置内容
        let n = Object.assign({}, that.formDatas)
        that.formData1 = n
      },
      saveChange (vale, editorName) {
      	let that = this
      	this[editorName] = false
      	let n = Object.assign({}, that.formData1)
      	this.formData = n
        this.$emit('saveChange', vale)
      }
    },
    watch: {
      formDatas: function(newVal,oldVal){
        this.formData = newVal
        this.formData1 = JSON.parse(JSON.stringify(this.formData))
      }
    }
  }
</script>
