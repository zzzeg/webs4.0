<template>
	<div class="base_msg blockContent">
		<div class="subItems">
			<div class="subname" style="margin: 10px 0px -10px 0px;">
				<span>无相关药物结果总览</span>
			</div>
			<div class="search-query">
				<el-form :inline="true" :model="formInlines">
					<el-form-item label="基因">
						<el-autocomplete class="inline-input" v-model="formInlines.gene" :fetch-suggestions="querySearch" placeholder="请输入基因名"
						 :trigger-on-focus="false" clearable style="width:120px;"></el-autocomplete>
					</el-form-item>
					<el-form-item label="突变位点">
						<el-input size="medium" v-model="formInlines.variant" placeholder="请输入突变位点" clearable style="width:160px;"></el-input>
					</el-form-item>
					<el-form-item label="外显子">
						<el-input size="medium" v-model="formInlines.transcriptExon" placeholder="请输入外显子" clearable style="width:120px;"></el-input>
					</el-form-item>
					<el-form-item label="临床意义">
						<el-input size="medium" v-model="formInlines.clinsig" placeholder="请输入临床意义" clearable style="width:160px;"></el-input>
					</el-form-item>
					<el-form-item label="变异类型">
						<el-select size="medium" v-model="formInline.variantClassification" placeholder="请选择变异类型" style="width:160px;">
							<el-option :label="items.label" :value="items.value" v-for="(items, i) in mutationTypesList" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" @click="blockSearch(formInlines)">查询</el-button>
						<!-- <el-button type="primary" @click="pushListItem('add')">添加</el-button> -->
						<el-button type="primary" size="medium" @click="">发送邮件</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="">
				<el-table class="tableList hasLine" ref="table" :data="formData1.list" stripe border style="width: 100%" @sort-change="sortChange" @cell-click="cellClick">
					<el-table-column prop="gene" label="基因" width="120" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.gene }}<span class="bluesj"></span><span v-if="scope.row.checkCell == 'gene'" class="allBg"></span></span>
						</template>
					</el-table-column>
					<el-table-column prop="variant" label="突变位点" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.variant}}<span :class="scope.row.hasValidata == '1' ? 'yellosj' :'bluesj'"></span><span v-if="scope.row.checkCell == 'variant'" class="allBg"></span></span>
						</template>
					</el-table-column>

					<el-table-column prop="gdnaChange" label="基因组定位">
					</el-table-column>
					<el-table-column prop="geneType" label="基因型" width="100">
					</el-table-column>
					<el-table-column prop="rsId" label="RS_ID" width="100">
						<template slot-scope="scope">
							<a :href="'https://www.snpedia.com/index.php/' + scope.row.rsId" target="_blank">{{ scope.row.rsId }}</a>
						</template>
					</el-table-column>
					<!--<el-table-column prop="hgmdDmDp" label="DM/DP">-->
					<!--</el-table-column>-->
					<el-table-column prop="allelicDepth" label="突变频率" width="100">
					</el-table-column>
					<el-table-column prop="transcriptExon" label="外显子" width="120" sortable="custom">
					</el-table-column>
					<el-table-column prop="clinsig" label="临床意义" width="120">
						<template slot-scope="scope">
							<span v-if="!scope.row.isEdit">{{ scope.row.clinsig }}</span>
							<el-select v-else clearable v-model="scope.row.clinsig" placeholder="">
								<el-option label="致病" value="致病"></el-option>
								<el-option label="可能致病" value="可能致病"></el-option>
								<el-option label="风险因素" value="风险因素"></el-option>
								<el-option label="良性" value="良性"></el-option>
								<el-option label="可能良性" value="可能良性"></el-option>
								<el-option label="意义未明确" value="意义未明确"></el-option>
								<el-option label="结论存在争议" value="结论存在争议"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="variantClassification" label="变异类型" width="120">
						<template slot-scope="scope">
							{{translateKeyWord(scope.row.variantClassification)}}
						</template>
					</el-table-column>
					<el-table-column prop="clinicalSignificancePrediction" label="临床意义预测" width="120">
					</el-table-column>
					<!-- <el-table-column prop="describe" label="突变描述" width="120"> -->
					</el-table-column>
					<!--<el-table-column prop="cosmicId" label="COSMIC" width="120">-->
					<!--</el-table-column>-->
					<!-- <el-table-column prop="nature" label="定性" width="120"> -->
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<!-- <a href="javascript:;" v-if="scope.row.isEdit" @click="cancerChange(scope.$index)" class="editBtn"><i class="el-icon-circle-close-outline"></i></a> -->
							<!-- <a href="javascript:;" v-if="!scope.row.isEdit" @click="changeEdit('true', scope.$index)" class="editBtn"><i class="el-icon-edit-outline"></i></a> -->
							<a href="javascript:;" v-if="!scope.row.isEdit" @click="pushListItem('del', scope.row.code)" class="editBtn"><i
								 class="el-icon-delete"></i></a>
							<!-- <a href="javascript:;" v-if="scope.row.isEdit" @click="saveChange(scope.row.clinsig, scope.row.code)" class="editBtn"><i class="el-icon-circle-check-outline"></i></a> -->
						</template>
					</el-table-column>
					<el-table-column type="expand" width="1">
				       <template slot-scope="props">
				         <popdialog :text="pvalue" :scope="row" :windowType="property" :popData="popData1" :formDatas="formData1"
							 :minMark="minMark" :checkMark="checkMark" :cacheData="cacheData" @cmmk="cmmk" @sWindow="sWindow(property, row.code)" @pushHead="pushHead"
							 @changeTab="changeTab" @closePanel="closePanel" @blockSearch="blockSearch(formInlines)"></popdialog>
				       </template>
				    </el-table-column>
				</el-table>
			</div>
		</div>
		<!-- <div class="notes">
			<p><span style="color: red;">* </span>注：</p>
			<p>1、红色代表明确，蓝色代表不明确</p>
			<p>2、MutationTasterPred/SiftPred/Polyphen2HdivPred/Polyphen2HVARPred/FATHMM_pred</p>
		</div> -->
	</div>
</template>
<script>
	import popdialog from '@/components/examine/examineModel/popModel/popdialog'
	export default {
		props: {
			formDatas: {
				type: Object
			},
			formInline: {
				type: Object
			},
			popData: {
				type: Object
			},
			checkMark: {
	          type: String
	        },
		},
		created() {},
		data() {
			return {
				isEdit1: false,
				isEdit2: false,
				code: this.$route.params.id,
				formData: {},
				formData1: {},
				restaurants: [],
				restaurantsList: [],
				minMark: '1',
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
				cacheData: {},
				anlist: [{
					f: '深圳南山人民医院',
					d: '肿瘤科',
					e: '张三'
				}],
				mutationTypesList: [{
					label: '所有变异',
					value: ''
				}, {
					label: '缺失移码',
					value: 'Frame_Shift_Del'
				}, {
					label: '插入移码',
					value: 'Frame_Shift_Ins'
				}, {
					label: '无义',
					value: 'Nonsense_Mutation'
				}, {
					label: '错义',
					value: 'Missense_Mutation'
				}, {
					label: '剪切点',
					value: 'Splice_Site'
				}, {
					label: '框内缺失',
					value: 'In_Frame_Del'
				}, {
					label: '框内插入',
					value: 'In_Frame_Ins'
				}, {
					label: '同义',
					value: 'Silent'
				}, {
					label: '翻译起始位点',
					value: 'Translation_Start_Site'
				}, {
					label: '非终止突变',
					value: 'Nonstop_Mutation'
				}, {
					label: "3'UTR",
					value: "3'UTR"
				}, {
					label: "3'Flank",
					value: "3'Flank"
				}, {
					label: "5'UTR",
					value: "5'UTR"
				}, {
					label: "5'Flank",
					value: "5'Flank"
				}, {
					label: 'IGR',
					value: 'IGR'
				}, {
					label: '内含子区',
					value: 'Intron'
				}, {
					label: 'RNA',
					value: 'RNA'
				}, {
					label: '靶向区域',
					value: 'Targeted Region'
				}, {
					label: '框内新发起始突变',
					value: 'De_novo_Start_InFrame'
				}, {
					label: '框外新发起始突变',
					value: 'De_novo_Start_OutOfFrame'
				}, {
					label: '剪接区',
					value: 'Splice_Region'
				}, {
					label: '未知',
					value: 'Unknown'
				}],
				checkNum: false,
				formInlines: {
					gene: '',
					mutation: '',
					transcriptExon: '',
					clinsig: '',
					variantClassification: '',
					hgmdDmDp: ''
				}
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
				// pageSize: 10
			}
		},
		methods: {
			cellClick(row, column, cell, event) {
				// con
				let that = this
				if(row.isEdit || row.isAdd) {// 编辑状态不给点击
		          return false
		        }
				that.property = column.property
				that.pvalue = row[column.property]
				that.row = row
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
			  this.formData1.list.map((item) => {
			    if (row.code != item.code) {
			      $table.toggleRowExpansion(item, false)
			      item.checkCell = ''
			    }
			  })
			  $table.toggleRowExpansion(row)
			},
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
			saveChange(vale, code) {
				let that = this
				let n = {}
				n['clinsig'] = vale
				n['code'] = code
				n['projectCode'] = that.code
				that.$emit('saveChange', n)
			},
			sWindow(type, keyVal) {
				// 查询的类型   基因、疾病、药物    keyVal 是查询参数
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
			blockSearch(formInlines) { // 查询
				let that = this
				that.$emit('search', formInlines)
			},
			inputSub(itemCode, keyName, keyValue) {
				// 修改
				let that = this
				that.$emit('saveChange', that.formDatas.code, itemCode, keyName, keyValue)
			},
			pushListItem(type, code) {
				// 添加，删除 的操作
				let that = this
				that.$emit('pushListItem', type, code)
			},
			querySearch(queryString, cb) {
				let restaurants = this.restaurants
				let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
				// 调用 callback 返回建议列表的数据
				cb(results)
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
				}
			},
			sortChange(column, prop, order) {
				let that = this
				that.formInline["sort"] = column.prop == null ? '' : column.prop
				if (that.formInline["sortType"] == '') {
					that.formInline.sortType = 'asc'
				} else if (that.formInline.sortType === 'asc') {
					that.formInline.sortType = 'desc'
				} else if (that.formInline.sortType == 'desc') {
					that.formInline.sortType = ''
				}
				// return false
				that.$emit('search', that.formInline)
			},
			translateKeyWord(keyWord) {
				// 无变异、基因突变、过滤的基因突变 翻译
				switch (keyWord) {
					case 'Frame_Shift_Del':
						return '缺失移码'
						break
					case 'Frame_Shift_Ins':
						return '插入移码'
						break
					case 'In_Frame_Del':
						return '框内缺失'
						break
					case 'Frame_Shift_Ins':
						return '框内插入'
						break
					case 'Missense_Mutation':
						return '错义'
						break
					case 'Nonsense_Mutation':
						return '无义'
						break
					case 'Silent':
						return '同义'
						break
					case 'Splice_Site':
						return '剪切点'
						break
					case 'Translation_Start_Site':
						return '翻译起始位点'
						break
					case 'Nonstop_Mutation':
						return '非终止突变'
						break
					case 'Intron':
						return '内含子区'
						break
					case 'Targeted Region':
						return '靶向区域'
						break
					case 'De_novo_Start_InFrame':
						return '框内新发起始突变'
						break
					case 'De_novo_Start_OutOfFrame':
						return '框外新发起始突变'
						break
					case 'Splice_Region':
						return '剪接区'
						break
					case 'Unknown':
						return '未知'
						break
				}
			}
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				let that = this
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
				for (let i in that.formData1.list) {
					// that.formData1.list[i]['isEdit'] = false
					that.$set(that.formData1.list[i], 'isEdit', false)
					that.$set(that.formData1.list[i], 'checkCell', '')
				}
			},
			popData: {
				handler: function(newVal, oldVal) {
					let that = this
					// 重设基本选择位置
					that.popData1 = newVal
				},
				deep: true,
				// immediate: true
			}
		},
		components: {
			popdialog
		},
		computed: {
		}
	}
</script>
<style scope="scoped">
	.el-table__body-wrapper{
		overflow-x: auto!important;
	}
</style>