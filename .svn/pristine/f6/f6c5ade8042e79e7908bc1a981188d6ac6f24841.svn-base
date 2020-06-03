<template>
	<div class="base_msg ctc_table">
		<div class="subtable dtitleBg">
			<span>检测结果总览</span>
			<div class="saveico" v-if="block1 && canEdit" @click="block1 = !block1, saveChange(formData1)"></div>
			<div class="cancel" v-if="block1 && canEdit" @click="block1 = !block1, cancerChange()"></div>
			<div class="bjimg" v-if="!block1 && canEdit" @click="block1 = !block1,changeEdit()"></div>
		</div>
		<table>
			<tr>
				<th>检测方法</th>
				<th>标本质量</th>
				<th>免疫荧光染色质量</th>
				<th>显微视野窗扫描及摄影（个）</th>
				<th>质控品批次</th>
				<th>质控结果</th>
			</tr>
			<tr>
				<td>Cellsearch系统</td>
				<td>通过</td>
				<td>通过</td>
				<td>175</td>
				<td>F205B</td>
				<td>通过</td>
			</tr>
		</table>
		<p><strong>结果</strong>：循环肿瘤细胞数
			<span v-if="!block1" style="color:red;">{{ formData.cellNumber }}</span>
			<span>
				<el-input style="width:4rem;height:20px; color:red;" v-if="block1" type="text" v-model="formData1.cellNumber"></el-input>
			</span> 个/7.5ml外周血。
		</p>
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
				block1: false,
				canEdit: true,
				formData: {},
				formData1: {}
			}
		},
		methods: {
			changeEdit(val, item) {
				let that = this
				// that.formData1.list[index].isEdit = val == 'true' ?  true : false
				that[item] = true
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
			inputSub(itemCode, keyName, keyValue) {
				let that = this
				that.isEdit1 = false
				that.$emit('saveChange', that.formDatas.code, itemCode, keyName, keyValue)
			}
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				let that = this
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
			}
		},
		computed: {

		}
	}
</script>
