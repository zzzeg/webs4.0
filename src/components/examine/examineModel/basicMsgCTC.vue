<template>
	<div class="base_msg blockContent">
		<div class="subItems">
			<div class="subtitle dtitleBg">
				<span>基本信息</span>
				<div class="saveico" v-if="block1 && canEdit" @click="block1 = !block1, saveChange(formData1)"><!-- 保存 --></div>
				<div class="cancel" v-if="block1 && canEdit" @click="block1 = !block1, cancerChange()"><!-- 取消 --></div>
				<div class="bjimg" v-if="!block1 && canEdit" @click="block1 = !block1,changeEdit()"><!-- 编辑 --></div>
			</div>
			<div class="inlineItem">
				<el-row :gutter="10">
					<el-col :span="8"><span class="color_bask">受检者编号：</span>
						<div class="tableListItem" v-if="!block1">{{ formData.code }}&nbsp;</div>
						<el-input class="editFrom" v-if="block1" v-model="formData1.code" placeholder="受检者编号"></el-input>
					</el-col>

					<el-col :span="8"><span class="color_bask">姓名：</span>
						<div class="tableListItem" v-if="!block1">{{ formData.name }}&nbsp;</div>
						<el-input class="editFrom" v-if="block1" v-model="formData1.name" placeholder="姓名"></el-input>
					</el-col>

					<el-col :span="8"><span class="color_bask">性别：</span>
						<div class="tableListItem" v-if="!block1">{{ formData.gender === 1 ? '男' : formData.gender === 2 ? '女' : ' ' }}&nbsp;</div>
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

					<el-col :span="8"><span class="color_bask">病区/床号：</span>
						<div class="tableListItem" v-if="!block1">{{ formData.bedNumber }}&nbsp;</div>
						<el-input class="editFrom" v-if="block1" v-model="formData1.bedNumber" placeholder="住院号"></el-input>
					</el-col>
				</el-row>

        <el-row :gutter="10">
          <el-col :span="8"><span class="color_bask">模板：</span>
            <div class="tableListItem" v-if="!block1">{{formData.laboratory==1?'百诺':formData.laboratory==2?'大连':formData.laboratory==1?'中山医':'' }}&nbsp;</div>
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
						<div class="tableListItem" style="margin-left:0" v-if="!block3">{{ formData.clinicalDiagnosis }}&nbsp;</div>
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="editFroms" v-if="block3" v-model="formData1.clinicalDiagnosis"
						 placeholder="临床诊断"></el-input>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 化疗药物使用情况 -->
		<div class="subItems">
			<div class="radios">
				<span style="font-size: 14px;">化疗药物使用情况：</span>
				 <el-radio-group v-model.number="formData.chemoDrugsUserSituation">
					<el-radio :label="1">化疗前评估</el-radio>
					<el-radio :label="2">化疗后评估</el-radio>
					<el-radio :label="3">其他</el-radio>
				</el-radio-group>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		props: {
			formDatas: {
				type: Object
			}
		},
		created() {},
		data() {
			return {
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
				radio: '1',
				 options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: []
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
// 				let n = Object.assign({}, that.formData1)
// 				this.formData = n
				this.$emit('saveChange', vale)
			}
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
			}
		}
	}
</script>
