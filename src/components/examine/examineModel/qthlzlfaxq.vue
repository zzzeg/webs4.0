<template>
	<div class="base_msg">
		<div class="subtable dtitleBg">化疗治疗方案详情</div>
		<div class="detailsreat">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="基因">
					<el-input v-model="formInline.gene" placeholder="请输入基因" clearable></el-input>
				</el-form-item>
				<el-form-item label="变异">
					<el-input v-model="formInline.variant" placeholder="请输入变异" clearable></el-input>
				</el-form-item>
				<el-form-item label="药物">
					<el-input v-model="formInline.drugSearchName" placeholder="请输入药物" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="blockSearch(formInline)">查询</el-button>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button type="primary" size="medium" @click="getListData('1')">添加</el-button>
					<el-button type="primary" size="medium" @click="opentoggle('open')">全部展开</el-button>
					<el-button type="primary" size="medium" @click="opentoggle('close')">全部收起</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="noContentsDiv" v-if="formData1.length == 0">
			暂无内容
		</div>
		<draggable v-else handle=".handle" :options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
              v-model="formData1"
              @change="change"
              @start="start"
              @end="end"
              :move="move">
			<div class="details_cont" v-for="(formList, index) in formData1" :key="index" >
				<div class="details_title handle">
					<div class="sleft">
						<div @click="formList.isOpen = !formList.isOpen" style="margin-right:5px;"><i class="el-icon-caret-right" :style="'font-size:18px;transform:rotate(' + (formList.isOpen ? '90' : '0') + 'deg)'"></i></div>
						<div class="indexs">{{index + 1}} 、</div>
							<div class="textfa" v-if="!formList.isEdit">{{formList.schemeType == '1' ? '治疗方案' : '潜在位点临床用药'}}</div>
							<el-select v-if="formList.isEdit" v-model="formList.schemeType" placeholder="治疗方案" clearable>
								<el-option v-for="(item, index) in schemeType" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>

							<div class="dunhao" v-if="!formList.isEdit" v-for="(drug, xxx) in formList.drugSet" :key="xxx">{{ drug | formatDrug }}</div>
							<el-select class="selectdg" v-model="formList.drugSet" v-if="formList.isEdit" multiple filterable allow-create default-first-option>
								<el-option v-for="(item, eee) in optionItem" :key="eee" :label="item.drugName == '' ? item.drugEnName : item.drugName" :value="item.id"></el-option>
							</el-select>
						</div>
						<div class="btn" style="margin:5px 10px 0 0">
							<div class="saveico" v-if="formList.isEdit" @click.stop="saveChange(formList, index)"><!-- 保存 --></div>
							<div class="cancel" v-if="formList.isEdit" @click.stop="cancerChange(index)"><!-- 取消 --></div>
							<div class="delico" v-if="!formList.isEdit" @click.stop="pushListItem('del', formList.code)"><!-- 删除 --></div>
							<div class="bjimg" v-if="!formList.isEdit" @click.stop="formList.isEdit = true,formList.isOpen = true"><!-- 编辑 --></div>
						</div>
				</div>
				<div class="details_content" v-show="formList.isOpen">
					<div class="content_textarea" v-for="(noteList, i) in formList.reportTherapyVariantCancerClinicalNoteList" :key="i">
						<div class="content_input">
							<el-row>
								<el-col :span="20">临床注释{{i + 1}}：</el-col>
								<el-col :span="2" style="float: right;text-align: right;" class="deletbtn">
									<el-button  icon="el-icon-delete" circle v-if="formList.isEdit" size="small" @click="pushListItem('del',code)"></el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">检测项：</el-col>
								<el-col :span="2">
									<div class="tableListItem" style="color:#4A4A4A;">{{noteList.reportVariant ? noteList.reportVariant.gene : ''}}</div>
								</el-col>

								<el-col :span="2">RS_ID：</el-col>
								<el-col :span="2">
									<div class="tableListItem" style="color:#4A4A4A;">{{noteList.reportVariant ? noteList.reportVariant.rsId : ''}}</div>
								</el-col>

								<el-col :span="2">基因型：</el-col>
								<el-col :span="2">
									<div class="tableListItem" style="color:#4A4A4A;">{{noteList.reportVariant ? noteList.reportVariant.geneType : ''}}</div>
								</el-col>

								<el-col :span="2">影响类型：</el-col>
								<el-col :span="3">
                  					<div class="tableListItem" style="color:#4A4A4A;">{{noteList.clinicalAnnType}}</div>
								</el-col>

								<el-col :span="2">证据等级：</el-col>
								<el-col :span="3">
                  					<div class="tableListItem" style="color:#4A4A4A;">{{noteList.pharmgkbEvdLevel}}</div>
								</el-col>
							</el-row>
						</div>

						<div class="content_list" v-for="(detailList, q) in noteList.reportClinicalNoteDetailList" :key="q">
						<el-row>
							<el-col :span="2">证据来源：</el-col>
							<el-col :span="4">
								<div class="tableListItem" v-if="!formList.isEdit">{{detailList.clinicalNoteType == 0 ? 'NCCN' : detailList.clinicalNoteType == 1 ? 'CSCO' : detailList.clinicalNoteType == 2 ? 'FDA' : detailList.clinicalNoteType == 3 ? 'CFDA' : detailList.clinicalNoteType == 4 ? 'ASCO' : detailList.clinicalNoteType == 5 ? 'ESMO' : detailList.clinicalNoteType == 6 ? 'ACMG' : detailList.clinicalNoteType == 7 ? 'EMA' : detailList.clinicalNoteType == 8 ? 'PMDA' : detailList.clinicalNoteType == 9 ? 'HCSC' : detailList.clinicalNoteType == 10 ? '临床研究' : detailList.clinicalNoteType == 11 ? '临床研究' : detailList.clinicalNoteType == 12 ? '临床研究' : detailList.clinicalNoteType == 13 ? '临床研究' : detailList.clinicalNoteType == 14 ? 'PHARMGKB' : '无'}}</div>
								<el-select class="editFrom" v-if="formList.isEdit"  v-model="detailList.clinicalNoteType" placeholder="请选择" >
									<el-option v-for="(item, index) in clinicalNoteType" :key="index" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-col>
						</el-row>

            <el-row v-if="detailList.clinicalNoteType!= 14">
							<el-col :span="2">结论内容：</el-col>
							<el-col :span="22">
								<div class="tableListItem" v-if="!formList.isEdit">{{detailList.clinicalNote}}</div>
								<el-input type="textarea" v-model="detailList.clinicalNote" :autosize="{ minRows: 2, maxRows: 2}" v-if="formList.isEdit" placeholder="临床注释" ></el-input>
							</el-col>
						</el-row>

						<!--<el-row>-->
							<!--<el-col :span="2">研究数据：</el-col>-->
							<!--<el-col :span="22">-->
								<!--<div class="tableListItem" v-if="!formList.isEdit">{{detailList.studyData}}</div>-->
								<!--<el-input type="textarea" v-model="detailList.studyData" :autosize="{ minRows: 2, maxRows: 2}" v-if="formList.isEdit" placeholder="研究数据"></el-input>-->
							<!--</el-col>-->
						<!--</el-row>-->

							<el-row>
								<el-col :span="2">参考文献：</el-col>
								<el-col :span="21">&nbsp;</el-col>
								<el-col :span="1">
									<div style="font-size: 24px;color: #7F8493;">
										<!-- <i class="el-icon-circle-plus-outline" v-if="formList.isEdit" @click="pushListItem('add')"></i> -->
										<el-button type="success"   v-if="formList.isEdit" size="mini" style="width: 0;" @click="addckwx(index, i, q)">+</el-button>
									</div>
								</el-col>
							</el-row>
							<el-row v-for="(ureList, indexee) in detailList.reportClinicalNoteLiberatureList" :key="indexee">
								<el-col :span="2" style="text-align: center;">{{indexee + 1}}、 </el-col>
								<el-col :span="12">
									<div class="tableListItem" v-if="!formList.isEdit">{{ ureList.title}}</div>
									<el-input type="textarea" v-model="ureList.title" :autosize="{ minRows: 2, maxRows: 2}" v-if="formList.isEdit"
									 placeholder="参考文献"></el-input>
								</el-col>

								<el-col :span="9">
									<div class="tableListItem" v-if="!formList.isEdit">{{ ureList.url }}</div>
									<el-input type="textarea" v-model="ureList.url" :autosize="{ minRows: 2, maxRows: 2}" v-if="formList.isEdit" placeholder="参考连接"></el-input>
								</el-col>
								<el-col :span="1" style="">
									<el-button type="danger" size="mini" style="width: 0;" v-if="formList.isEdit" @click="removeTodo(index, i, q, indexee)">-</el-button>
								</el-col>
							</el-row>

						</div>

					</div>
					<div style="text-align:center;font-size: 24px;color: #7F8493;">
						<i class="el-icon-circle-plus-outline" v-if="formList.isEdit" @click="pushListItem('add')"></i>
					</div>
				</div>
			</div>
		</draggable>
		<!-- 模态框 -->
    <el-dialog :visible.sync="dialogTableVisible" width="80%">
			<div class="searchInput">
				<el-form :inline="true" :model="formInline2" class="demo-form-inline">
					<el-form-item label="基因">
						<el-input v-model="formInline2.gene" placeholder="请输入基因" clearable></el-input>
					</el-form-item>
					<el-form-item label="变异">
						<el-input v-model="formInline2.variant" placeholder="请输入变异" clearable></el-input>
					</el-form-item>
					<el-form-item label="药物">
						<el-input v-model="formInline2.drugSearchName" placeholder="请输入药物" clearable></el-input>
					</el-form-item>
          <el-form-item label="RS号">
            <el-input v-model="formInline2.rsId" placeholder="请输入RS号" clearable></el-input>
          </el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" @click="getListData('1')">查询</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
			  <el-table :data="tableData" style="width: 100%" stripe>
			    <el-table-column property="drugName" label="疗法"></el-table-column>
			    <el-table-column property="gene" label="基因"></el-table-column>
			    <el-table-column property="variant" label="变异"></el-table-column>
			    <el-table-column property="cancerName" label="癌种"></el-table-column>
          <el-table-column property="rsId" label="RS号"></el-table-column>
			    <el-table-column property="clinicalAnnType" label="疗效"></el-table-column>
          <el-table-column property="pharmgkbEvdLevel" label="证据等级"></el-table-column>
			    <el-table-column property="clinicalNote" label="临床注释"></el-table-column>
			    <el-table-column label="选择" width="100" align="center">
						<template slot-scope="scope">
							<el-checkbox v-model="scope.row.checkedNames"></el-checkbox>
						</template>
				 </el-table-column>
		  	</el-table>
			</div>
			<!-- 分页 -->
			<pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount"
			v-on:handleCurrentChange="getListData"></pager>
			<div style="text-align:center">
				<el-button size="medium" @click="cancerChange()">取消</el-button>
				<span style="margin-right:10px;"></span>
				<el-button type="primary" size="medium" @click="addBatch()">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	let vm = {}
	import { formatDate } from '@/common/js/Utils.js'
	import axios from 'axios'
	import URL from '@/common/js/URL.js'
	import Pager from '@/components/common/pager'
	import moment from 'moment'
	import draggable from 'vuedraggable'
	export default {
		props: {
			formDatas: {
				type: Array
			},
			formInline: {
				type: Array
			}
		},
		created () {
	      this.getDrugList() // 获取药物名
	    },
		data() {
			vm = this
			return {
				code: this.$route.params.id, // projectCode
				isEdit: false,
				formData: [],
				formData1: [],
				tableData:[],
				loading:false,
				dialogTableVisible: false,
				currentPage: 1,
				pageSize: 10,
				pageNumber: 1,
				totalCount: 0,
				formInline2: {//查询条件
					gene: '',
					variant: '',
					drugSearchName: '',
          rsId:'',
					variantType:''
				},
				//药名
				drugSet: [],
				optionItem:[],
				schemeType: [{ //治疗方案
					value: 1,
					label: '治疗方案'
				},
				{
					value: 2,
					label: '潜在位点临床用药'
				}],
				clinicalNoteType:[{//证据来源
					value: 0,
					label: 'NCCN'
				},
				{
					value: 1,
					label: 'CSCO'
				},
				{
					value: 2,
					label: 'FDA'
				},
				{
					value: 3,
					label: 'CFDA'
				},{
					value: 4,
					label: 'ASCO'
				},
				{
					value: 5,
					label: 'ESMO'
				},
				{
					value: 6,
					label: 'ACMG'
				},
				{
					value: 7,
					label: 'EMA'
				},
				{
					value: 8,
					label: 'PMDA'
				},
				{
					value: 9,
					label: 'HCSC'
				},
				{
					value: 10,
					label: 'PMID'
				},
				{
					value: 11,
					label: 'PRECLINICAL'
				},
				{
					value: 12,
					label: 'PRECLINICAL_CANCER'
				},
				{
					value: 13,
					label: 'FUNCTIONAL_PREDICTION'
				},
				{
					value: 14,
					label: 'PHARMGKB'
				}],
				drugReactionType:[{//响应
					value: 0,
					label: '敏感 '
				},
				{
					value: 1,
					label: '耐药 '
				},
				{
					value: 2,
					label: '继发性耐药 '
				},
				{
					value: 3,
					label: '可能耐药 '
				},
				{
					value: 4,
					label: '可能敏感'
				},
				{
					value: 5,
					label: '敏感减弱'
				},
				{
					value: 6,
					label: '敏感增强'
				},
				{
					value: 7,
					label: '耐药减弱'
				}],
			}
		},
		methods: {
			goshit(obj) {
				let that = this
				alert(obj)
			},
			changeEdit(val, editorName) {// 编辑
				let that = this
				that[editorName] = val == 'true' ? true : false
				// that.$set(that.formData1[index], 'isEdit', true)
			},
			cancerChange(index) { // 取消
				let that = this
				that.dialogTableVisible = false
				that.$set(that.formData1[index], 'isEdit', false)
				// console.log('1' + that.formData1[index].isOpen)
				let n = JSON.parse(JSON.stringify(that.formDatas))
				that.formData1 = []
				that.formData1 = n
				// console.log('2' + that.formData1[index].isOpen)
				that.$set(that.formData1[index], 'isOpen', true)
				// console.log('3' + that.formData1[index].isOpen)
			},
			saveChange (vale, index) {// 保存
			  let that = this
			  let n = {}
			  // n['reportTherapyDetailForm'] = {}
			  n['drugSet'] = vale.drugSet
			  n['schemeType'] = vale.schemeType
			  n['code'] = vale.therapyCode
			  n['reportClinicalNoteDetail'] = []

			  for (let i = 0; i < vale.reportTherapyVariantCancerClinicalNoteList.length; i++) {
				  	for(let j = 0; j < vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList.length; j++){
				  		n.reportClinicalNoteDetail.push({
				  			cancerCode: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].cancerCode,
				  			clinicalNote: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].clinicalNote,
				  			clinicalNoteType: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].clinicalNoteType,
				  			code: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].code,
				  			drugReactionType: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].drugReactionType,
				  			operationType: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].operationType,
				  			projectCode: that.code,
				  			reportClinicalNoteLiberatureList: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].reportClinicalNoteLiberatureList,
				  			studyData: vale.reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[j].studyData
				  		})
				  	}
			  	}
				that.$emit('saveChange', n)
		    },

			pushListItem(type, code) {// 添加，删除 的操作
				let that = this
				that.$emit('pushListItem', type, code)
			},
			blockSearch(formInline) {// 查询
				let that = this
				that.$emit('search', formInline)
			},
			handelCurrent(val) {//分页
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage)
			},
			getListData(num) {//添加列表
				let that = this
				that.dialogTableVisible = true
				that.loading = true
				this.currentPage = parseInt(num)
				axios.get(URL.api_name + 'cloud/knowledge/getTherapyList', {
					params: {
						projectCode:that.code,
						pageSize: that.pageSize,
						pageNumber: that.pageNumber,
						drugName:that.formInline2.drugSearchName,
						gene:that.formInline2.gene,
						variant:that.formInline2.variant,
            rsId:that.formInline2.rsId,
						drugType: 'chemo',
						recommendType: 1
						// variantType:that.formInline.variantType
					}
				}).then(function(respose) {
					that.loading = false
					if (respose.data.code === '100') {
						that.tableData = []
						that.tableData = respose.data.data.list
						for(let i in that.tableData) {
							that.$set(that.tableData[i], 'checkedNames', false)
							// that.tableData[i].checkedNames = false
						}
						that.totalCount = respose.data.data.total
					}
				}, function(error) {
					console.log(error)
					that.loading = false
					that.$message({
						type: 'error',
						message: '查询失败',
						duration: 1000
					})
				})
			},
			addBatch() {//勾选后提交
				let that = this
				let url = 'report/therapy/recommendTherapyAdd'
				let project = {
					therapyEfficacyList: [],
					projectCode: that.code,
					recommendType: 1
				}
				for (let i in that.tableData) {
					if(that.tableData[i].checkedNames) {
						project.therapyEfficacyList.push({
							code: that.tableData[i].code,
							variantCode:that.tableData[i].variantCode,
						})
					}
				}
				axios.post(URL.api_name + url, project).then(function(res) {
					if (res.data.code === '100') {
						that.loading = false
						that.$message({
							type: 'success',
							message: '提交成功',
							duration: 1000,
							onClose: function() {
//								that.dialogTableVisible = false
//								that.blockSearch(formInline)
							}
						})
            that.dialogTableVisible = false
            that.blockSearch(that.formInline)
					} else {
						that.$message({
							type: 'error',
							message: '提交失败：' + res.data.message,
							duration: 2000
						})
					}
					that.loading = false
				}, function(error) {
					console.log(error)
					that.$message({
						type: 'error',
						message: '发送失败',
						duration: 1000
					})
				})
			},
			opentoggle(statue) {//全部展开 隐藏
				let that = this
				let n = statue == 'open' ? true : false
				for(let i in that.formData1) {
					that.$set(that.formData1[i], 'isOpen', n)
					that.$set(that.formData1[i], 'isEdit', false)
				}
			},
			getDrugList(num) { // 查询药物列表内容
		        let that = this
		        if(num !== undefined) {
		          that.drugFrom.pageNumber = num
		        }
		        axios.get(URL.api_name + 'report/getDrugControlList', {
		          params: {
		            projectCode: that.code,
		            drugEnName: '',
		            pageNumber: 1,
		            pageSize: 10000
		          }
		        }).then(function (res) {
		          if (res.data.code === '100') {
		          	that.optionItem = []
		            that.optionItem = res.data.data.list
		            // console.log(that.optionItem)
		            that.loading = false
		          }
		        }, function (error) {
		          that.$message({
		            type: 'error',
		            message: '查询失败' + error,
		            duration: 1000
		          })
		        })
		    },
		    getDrugList(num) { // 查询药物列表内容
				let that = this
				if (num !== undefined) {
					that.drugFrom.pageNumber = num
				}
				axios.get(URL.api_name + 'report/getDrugControlList', {
					params: {
						projectCode: that.code,
						drugEnName: '',
						pageNumber: 1,
						pageSize: 10000
					}
				}).then(function(res) {
					if (res.data.code === '100') {
						that.optionItem = []
						that.optionItem = res.data.data.list
						// console.log(that.optionItem)
						that.loading = false
					}
				}, function(error) {
					that.$message({
						type: 'error',
						message: '查询失败' + error,
						duration: 1000
					})
				})
			},
			removeTodo(index, i, q, indexee) { //删一个参与文献数组元素
				let that = this
				that.formData1[index].reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[q].reportClinicalNoteLiberatureList.splice(indexee, 1)
			},
		    change: function (evt) {
		      console.log('isChange')
		    },
		    //start ,end ,add,update, sort, remove 得到的都差不多
		    start: function (evt) {
		      console.log('is Start')
		    },
		    end: function (evt) {
		      console.log('is End')
		      evt.item //可以知道拖动的本身
		      evt.to    // 可以知道拖动的目标列表
		      evt.from  // 可以知道之前的列表
		      evt.oldIndex  // 可以知道拖动前的位置
		      evt.newIndex  // 可以知道拖动后的位置
		    },
		    move: function (evt, originalEvent) {
		      console.log('is moving')
		      // console.log(originalEvent) //鼠标位置
		    },
		    keepSort: function () {
		    	// 保存排序
		    	let that = this
		    	let url = 'report/therapy/sort'
		    	let n = {}
		    	n['projectCode'] = that.code
		    	n['therapyEfficacyList'] = that.formData1
		    	axios.post(URL.api_name + url, n).then(function(res) {
		          if(res.data.code == '100') {
		            // 成功 重新查询
		            that.$message({
		              type: 'success',
		              message: res.data.message,
		              duration: 1000
		            })
		          } else {
		            // 失败,重新查询
		            that.$message({
		              type: 'error',
		              message: res.data.message,
		              duration: 1000
		            })
		          }
		        }).catch(function(res){
		          // 接口报错了
		        })
		    },
		    addckwx (index, i, q) {
		    	// 添加参考文献
		    	let that = this
		    	let n = {
		    		code:"",
					projectCode:"",
					reportClinicalNoteCode:"",
					title:"",
					url:""
		    	}
		    	that.formData1[index].reportTherapyVariantCancerClinicalNoteList[i].reportClinicalNoteDetailList[q].reportClinicalNoteLiberatureList.push(n)
		    }
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				let that = this
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
				for(let i in that.formData1) {
					that.$set(that.formData[i], 'isEdit', false)
					that.$set(that.formData[i], 'isOpen', false)
					that.$set(that.formData1[i], 'isEdit', false)
					that.$set(that.formData1[i], 'isOpen', false)
				}
			}
		},
		filters: {
	      formatDrug (drugId) {
	        let n = ''
         	for (let q in vm.optionItem) {
        		if (drugId == vm.optionItem[q].id) {
        			n = vm.optionItem[q].drugName == '' ? vm.optionItem[q].drugEnName : vm.optionItem[q].drugName
        			break
        		}
        	}
	        return n
	      }
	    },
		components: {
			Pager: Pager,draggable
		}
	}
</script>
