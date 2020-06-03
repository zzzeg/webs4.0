<template>
	<div class="base_msg blockContent">
		<div class="subItems">
			<div class="subname">
				<span>肿瘤风险解析</span>
			</div>

			<div class="inlineItem">
				<el-row :gutter="10">
					<el-col :span="20"><span class="color_bask">风险解析：</span>
						<div class="tableListItem" style="width:calc(100% - 6em); vertical-align:top;" v-if="!block1">{{ formData1.tumourDiseaseRisk }}&nbsp;</div>
						<el-input class="editFrom" style="width:calc(100% - 6em); vertical-align:top;" type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-if="block1" v-model="formData1.tumourDiseaseRisk" placeholder=""></el-input>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" v-if="!block1" size="mini" @click="block1 = !block1">编辑</el-button>
						<el-button type="primary" v-if="block1" size="mini" @click="saveChange()">保存</el-button>
					</el-col>
				</el-row>
			</div>

			<div class="inlineItem">
				<el-row :gutter="10">
					<el-col style="width:6em; margin-right: -8px;">
						<span class="color_bask">位点解析：</span>
					</el-col>
					<el-col style="width:calc(100% - 22em);" v-if="formData1.siteNotes && formData1.siteNotes.length > 0">
						<p v-for="(item, index) in formData1.siteNotes" :key="index" >
							<span style="display:inline-block; vertical-align:top; width:calc(100% - 4em)">
								<span style="display:inline-block; vertical-align:middle;">{{ '(' + (index + 1) + ')'+ '、'}}</span>
								<span v-if="!block2" style="display:inline-block; vertical-align:middle;">{{ item }}</span>
								<span v-if="block2" style="display:inline-block; vertical-align:middle; width:calc(100% - 3em)">
									<el-input class="editFrom" style="width:calc(100%); margin-top:0" type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="formData1.siteNotes[index]" placeholder=""></el-input>
								</span>
							</span>
							<a href="javascript:;" v-if="block2" @click="del(index)" class="editBtn"><i class="el-icon-delete" style="font-size: 24px;"></i></a>
						</p>
						
					</el-col>
					<el-col style="width:calc(100% - 22em);" v-else>
						暂无
					</el-col>
					<el-col style="width:10em;">
						<el-button type="success" v-if="block2" size="mini" @click="add">添加</el-button>
						<el-button type="primary" v-if="block2" size="mini" @click="saveChange">保存</el-button>
						<el-button type="primary" v-if="!block2" size="mini" @click="block2 = !block2">编辑</el-button>
					</el-col>
				</el-row>
			</div>

		</div>
	</div>
</template>
<script>
	import {formatDate} from '@/common/js/Utils.js'
	import moment from 'moment'
	export default {
		props: {
			formDatas: {
				type: Object
			}
		},
		created() {},
		data() {
			return {
				block1: false,
				block2: false,
				canEdit: true,
				formData: {},
				formData1: {},
        sampleTypeList : [{
          label: '新鲜组织',
          value: '新鲜组织'
        }, {
          label: '穿刺组织',
          value: '穿刺组织'
        }, {
          label: '石蜡块',        //
          value: '石蜡块'
        }, {
          label: '石蜡卷',
          value: '石蜡卷'
        }, {
          label: '石蜡白片',
          value: '石蜡白片'
        }, {
          label: '石蜡组织',
          value: '石蜡组织'
        }, {
          label: '血液',
          value: '血液'
        }, {
          label: '骨髓',
          value: '骨髓'
        }, {
          label: '淋巴',
          value: '淋巴'
        }, {
          label: '胸腔积液',
          value: '胸腔积液'
        }, {
          label: '腹腔积液',
          value: '腹腔积液'
        }],
			}
		},

		methods: {
			del(i) {
				let that = this
				that.formData1.siteNotes.splice(i, 1)
			},
			saveChange() {
				let that = this
				this.$emit('saveChange', that.formData1)
			},
			add() {
				let that = this
				that.formData1.siteNotes.push('')
			}
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				let that = this
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
				that.block1 = false
				that.block2 = false
			}
		},
		 filters: {
		  formatDate (time) {
		    let date = new Date(time)
		    return formatDate(date, 'yyyy-MM-dd')
		  },
		}
	}
</script>
