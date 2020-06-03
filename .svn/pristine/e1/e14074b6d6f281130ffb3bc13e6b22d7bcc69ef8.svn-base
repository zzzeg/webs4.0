<template>
	<div class="list">
		<div class="contentTitle pdlr20">审核PharmGKB / 添加</div>
		<div class="head_examine">
			<div class="knowledge_tab" style="display:inline-block; vertical-align:middle;float: left;">
				<span @click.stop="changeTabId(1)" :class="{'active':showTab === 1}">实体</span>
				<span @click.stop="changeTabId(2)" :class="{'active':showTab === 2}">野生型</span>
				<span @click.stop="changeTabId(3)" :class="{'active':showTab === 3}">杂合突变</span>
				<span @click.stop="changeTabId(4)" :class="{'active':showTab === 4}">纯合突变</span>
			</div>
		</div>
		<!-- 实体 -->
		<div class="examinedatainfo" v-show="showTab === 1">
			<table>
				<tr>
					<th class="texts">名称</th>
					<th>审核</th>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>RS号</td>
					<td>
						<el-input v-model.trim="data2.location"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>基因</td>
					<td>
						<el-input v-model.trim="data2.gene"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>疾病名(英文)</td>
					<td>
						<el-autocomplete clearable class="inline-input" v-model="data2.relatedDiseases" :fetch-suggestions="querySearch"
						 placeholder="请输入名称" :trigger-on-focus="true" @select="handleSelect" style="width: 100%;">
						</el-autocomplete>
					</td>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>药物</td>
					<td>
						<el-select filterable remote multiple clearable :loading="loading" :remote-method="remoteMethod" @change="(val)=>handleSelectDrug('en', val)"
						 v-model="data2.drugs" placeholder="请选择">
							<el-option v-for="(item, index) in drugTypeList" :key="index" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">证据等级</td>
					<td>
						<el-select clearable v-model="data2.evidenceLevel" placeholder="请选择">
							<el-option v-for="item in zhengjudengji" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">PMID</td>
					<td>
						<el-input v-model.trim="data2.pmids"></el-input>
					</td>
				</tr>

				<tr>
					<td class="texts">临床注释类型</td>
					<td>
						<el-select clearable v-model="data2.clinicalAnnType" placeholder="请选择">
							<el-option v-for="item in zhushileixing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">种族</td>
					<td>
						<el-input v-model.trim="data2.race"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts">参考文献</td>
					<td class="area">
						<el-input type="textarea" placeholder="PMID$10548071|||" autosize v-model.trim="data2.pmidRef"></el-input>
					</td>
				</tr>
			</table>
		</div>
		<!-- 野生型 -->
		<div class="examinedatainfo" v-show="showTab === 2">
			<table>
				<tr>
					<th class="texts">名称</th>
					<th>当前值</th>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>基因型</td>
					<td>
						<el-input v-model.trim="data2.datumList[0].geneType"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts">药物反应</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].drugReaction" placeholder="请选择">
							<el-option v-for="item in yaowufanying" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].toxicity" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].toxicityRisk" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">代谢</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].metabolism" placeholder="请选择">
							<el-option v-for="item in daixie" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">吸收</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].absorption" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>

				<tr>
					<td class="texts">疗效</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].efficacy" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">预后</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].prognosis" placeholder="请选择">
							<el-option v-for="item in yuhou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">剂量</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].dosage" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].sideEffect" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].sideEffectRisk" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">患病风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[0].riskOfDisease" placeholder="请选择">
							<el-option v-for="item in huanbingfengxian" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">论据</td>
					<td class="area">
						<el-input type="textarea" autosize v-model.trim="data2.datumList[0].datum"></el-input>
					</td>
				</tr>
			</table>
		</div>
		<!-- 杂合突变 -->
		<div class="examinedatainfo" v-show="showTab === 3">
			<table>
				<tr>
					<th class="texts">名称</th>
					<th>当前值</th>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>基因型</td>
					<td>
						<el-input v-model.trim="data2.datumList[1].geneType"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts">药物反应</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].drugReaction" placeholder="请选择">
							<el-option v-for="item in yaowufanying" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].toxicity" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].toxicityRisk" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">代谢</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].metabolism" placeholder="请选择">
							<el-option v-for="item in daixie" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">吸收</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].absorption" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>

				<tr>
					<td class="texts">疗效</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].efficacy" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">预后</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].prognosis" placeholder="请选择">
							<el-option v-for="item in yuhou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">剂量</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].dosage" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].sideEffect" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].sideEffectRisk" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">患病风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[1].riskOfDisease" placeholder="请选择">
							<el-option v-for="item in huanbingfengxian" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">论据</td>
					<td class="area">
						<el-input type="textarea" autosize v-model.trim="data2.datumList[1].datum"></el-input>
					</td>
				</tr>
			</table>
		</div>
		<!-- 纯合突变 -->
		<div class="examinedatainfo" v-show="showTab === 4">
			<table>
				<tr>
					<th class="texts">名称</th>
					<th>当前值</th>
				</tr>
				<tr>
					<td class="texts"><span style="color:red;">*</span>基因型</td>
					<td>
						<el-input v-model.trim="data2.datumList[2].geneType"></el-input>
					</td>
				</tr>
				<tr>
					<td class="texts">药物反应</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].drugReaction" placeholder="请选择">
							<el-option v-for="item in yaowufanying" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].toxicity" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">毒性风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].toxicityRisk" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">代谢</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].metabolism" placeholder="请选择">
							<el-option v-for="item in daixie" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">吸收</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].absorption" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">疗效</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].efficacy" placeholder="请选择">
							<el-option v-for="item in xishou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">预后</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].prognosis" placeholder="请选择">
							<el-option v-for="item in yuhou" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">剂量</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].dosage" placeholder="请选择">
							<el-option v-for="item in duxing" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].sideEffect" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">副作用风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].sideEffectRisk" placeholder="请选择">
							<el-option v-for="item in fuzuoyong" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">患病风险</td>
					<td>
						<el-select clearable v-model="data2.datumList[2].riskOfDisease" placeholder="请选择">
							<el-option v-for="item in huanbingfengxian" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="texts">论据</td>
					<td class="area">
						<el-input type="textarea" autosize v-model.trim="data2.datumList[2].datum"></el-input>
					</td>
				</tr>
			</table>
		</div>

		<div class="footer_btn" style="text-align: center;padding: 30px 0 50px 0;">
			<span style="display:inline-block;">
				<el-select clearable v-model="value" placeholder="请选择下一审核人">
					<el-option v-for="(items, index) in userlist" :value="items.code" :label="items.nickName" :key="index"></el-option>
				</el-select>
			</span>
			<el-button type="primary" size="medium" :disabled="data1.auditFlag === 2" @click="showDialogFun('sub')">提交</el-button>
			<el-button type="primary" size="medium" @click="save(1)">保存</el-button>
			<!-- <el-button type="success" size="medium" v-if="data1.auditFlag === 1" @click="subEnd()">同步</el-button> -->
			<!-- <el-button type="danger" size="medium" v-if="data1.state === 1" @click="showDialogFun('cancel')">作废</el-button>
			<el-button type="danger" size="medium" v-if="data1.state === 99" @click="showDialogFun('active')">激活</el-button> -->
			<el-button type="info" size="medium" @click="cancel">取消</el-button>
		</div>

		<el-dialog title="备注" :visible.sync="dialogTableVisible">
			<el-input v-model="description" type="textarea" :autosize="{ minRows: 3, maxRows: 8}"></el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false, description= ''">取 消</el-button>
				<el-button type="primary" @click="submit(dialogType)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import URL from '@/common/js/URL.js'
	import Pager from '@/components/common/pager'
	import axios from 'axios'
	import moment from 'moment'
	export default {
		created() {
			this.getUserList()
			// 获取疾病列表
			this.getcancerList()
			// 获取药物列表
			this.getDrugList()
		},
		data() {
			return {
				pstatus: this.$route.params.status,
				dialogVisible: false,
				drugSelect: false,
				drugFrom: {
					drugEnName: '',
					pageNumber: 1,
					pageSize: 10,
					total: 1,
					currentPage: 1,
					index: 0
				},
				addLoading: false,
				listLoading: false,
				drugFromLists: [],
				tableData: [],
				auditFlag: 0,
				businessStatus: 1,
				dialogType: '',
				id: this.$route.params.id,
				pager: this.$route.params.pager,
				data1: {},
				data2: {
					"code": "",
					"clinicalAnnMetadataId": "",
					"accessionId": "",
					"location": "",
					"gene": "",
					"relatedDiseases": "",
					"drug": "",
					"annTextCh": "",
					"clinicalAnnType": "",
					"pmids": "",
					"evidenceLevel": "",
					"race": "",
					"status": 1,
					"pmidRef": "",
					"createTime": null,
					"createUserCode": "",
					"auditor": "",
					"auditLevel": null,
					"toVoidReason": null,
					"remark": null,
					"version": "",
					"businessStatus": null,
					"updateTime": null,
					"updateUserCode": "",
					"ordinaryCode": "",
					"pageNumber": null,
					"pageSize": null,
					"drugs": [],
					"stringList": null,
					"annTextChs": [],
					"varAnnsChs": [],
					"datumList": [{
						absorption: '',
						code: "",
						datum: "",
						dosage: '',
						drugEffect: "",
						drugReaction: "",
						efficacy: '',
						geneType: "",
						metabolism: '',
						pharmgkbAnnotationCode: "",
						prognosis: '',
						sideEffect: '',
						sideEffectRisk: '',
						toxicity: '',
						toxicityRisk: '',
						type: 1
					}, {
						absorption: '',
						code: "",
						datum: "",
						dosage: '',
						drugEffect: "",
						drugReaction: "",
						efficacy: '',
						geneType: "",
						metabolism: '',
						pharmgkbAnnotationCode: "",
						prognosis: '',
						sideEffect: '',
						sideEffectRisk: '',
						toxicity: '',
						toxicityRisk: '',
						type: 2
					}, {
						absorption: '',
						code: "",
						datum: "",
						dosage: '',
						drugEffect: "",
						drugReaction: "",
						efficacy: '',
						geneType: "",
						metabolism: '',
						pharmgkbAnnotationCode: "",
						prognosis: '',
						sideEffect: '',
						sideEffectRisk: '',
						toxicity: '',
						toxicityRisk: '',
						type: 3
					}],
					"auditorName": "",
					"auditFlag": 1,
					"userCode": null,
					"desc": null
				},
				data3: {},
				dataN: {
					iserrors_gene: false
				},
				xx: [],
				currentPage: 1,
				pageSize: 1,
				pageNum: 0,
				currentListPage: 1,
				totalListCount: 1,
				totalCount: 50,
				value1: '',
				value: '',
				showTab: 1,
				isconflict: false,
				duxing: [{
					value: '增加',
					label: '增加'
				}, {
					value: '降低',
					label: '降低'
				}, {
					value: '相当',
					label: '相当'
				}],
				yaowufanying: [{
					value: '耐药',
					label: '耐药'
				}, {
					value: '耐药增强',
					label: '耐药增强'
				}, {
					value: '耐药减弱',
					label: '耐药减弱'
				}, {
					value: '敏感',
					label: '敏感'
				}, {
					value: '敏感减弱',
					label: '敏感减弱'
				}, {
					value: '敏感增强',
					label: '敏感增强'
				}, {
					value: '减弱',
					label: '减弱'
				}, {
					value: '增强',
					label: '增强'
				}, {
					value: '相当',
					label: '相当'
				}],
				daixie: [{
					value: '增强',
					label: '增强'
				}, {
					value: '减弱',
					label: '减弱'
				}, {
					value: '相当',
					label: '相当'
				}],
				xishou: [{
					value: '增加',
					label: '增加'
				}, {
					value: '降低',
					label: '降低'
				}, {
					value: '相当',
					label: '相当'
				}],
				yuhou: [{
					value: '好',
					label: '好'
				}, {
					value: '差',
					label: '差'
				}, {
					value: '相当',
					label: '相当'
				}],
				fuzuoyong: [{
					value: '增高',
					label: '增高'
				}, {
					value: '降低',
					label: '降低'
				}, {
					value: '相当',
					label: '相当'
				}],
				drugTypeList: [],
				drstate: [],
				drlist: [],
				zhengjudengji: [{
					value: '1A',
					label: '1A'
				}, {
					value: '1B',
					label: '1B'
				}, {
					value: '2A',
					label: '2A'
				}, {
					value: '2B',
					label: '2B'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}],
				huanbingfengxian: [{
					value: '增强',
					label: '增强'
				}, {
					value: '降低',
					label: '降低'
				}],
				zhushileixing: [{
					value: 'Dosage',
					label: 'Dosage'
				}, {
					value: 'Efficacy',
					label: 'Efficacy'
				}, {
					value: 'Metabolism/PK',
					label: 'Metabolism/PK'
				}, {
					value: 'Other',
					label: 'Other'
				}, {
					value: 'Toxicity/ADR',
					label: 'Toxicity/ADR'
				}],
				dialogTableVisible: false,
				description: '',
				diseaseList: [],
				diseaseListEn: [],
				druglist: [],
				druglistEn: [],
				userlist: [{
					code: '',
					nickName: ''
				}],
				isSub: false,
				iserrors: false,
				loading: false
			}
		},
		components: {
			Pager: Pager
		},
		methods: {
			showDialogFun(type) {
				let that = this
				that.dialogTableVisible = true
				that.dialogType = type
			},
			submit(type) {
				let that = this
				that.data2.description = that.description
				if (type === 'sub') {
					that.isSub = true
					that.subNext(that.value)
				}
				//  else if (type === 'end') {
				//   that.endsub()
				// } else if (type === 'cancel') {
				//   that.nulltify()
				// } else if (type === 'active') {
				//   that.businessStatus = 1
				//   that.save()
				// }
			},
			getUserList() {
				// 获取用户列表  ————  用在提交下一个审核员
				let that = this
				axios.get(URL.api_name + 'cloud/get_auditlist').then(function(respose) {
					that.userlist = respose.data.data
				}, function(error) {
					// console.log(error)
					that.loading = false
					that.$message({
						type: 'error',
						message: '查询失败',
						duration: 1000
					})
				})
			},
			nulltify() {
				// 作废这条信息
				let that = this
				axios.get(URL.api_name + 'cloud/project/cancelSummary', {
					params: {
						id: that.id,
						description: that.description
					}
				}).then(res => {
					if (res.data.code === '100') {
						that.$message({
							type: 'success',
							message: res.data.message,
							duration: 2000,
							onClose: function() {
								// that.$router.push({
								//  path: '/ExamineKnowledgeList/' + that.pager
								// })
							}
						})
						that.dialogTableVisible = false
					}
				}).catch(err => {
					that.$message({
						type: 'error',
						message: '操作失败',
						duration: 1000
					})
					console.log(err)
				})
			},
			getcancerList() {
				// 获取疾病列表 data2内的"疾病"选项 备选项
				let that = this
				axios.get(URL.api_name + 'cloud/cancerList').then(res => {
					if (res.data.code === '100') {
						that.diseaseList = res.data.data
						for (let i = 0; i < that.diseaseList.length; i++) {
							that.diseaseListEn.push({
								value: that.diseaseList[i].diseaseEnName
							})
						}
					}
				}).catch(err => {
					that.$message({
						type: 'error',
						message: '获取失败',
						duration: 1000
					})
					console.log(err)
				})
			},
			subNext(val) {
				let that = this
				// console.log(val)
				let name = ''
				for (let i = 0; i < that.userlist.length; i++) {
					if (val === that.userlist[i].code) {
						name = that.userlist[i].nickName
						// return false
					}
				}
				// 判断是否是提交，是提交的话，再判断是否有下一审核人
				if (that.isSub === true) {
					if (name === '') {
						that.$message({
							type: 'error',
							message: '未选择下一审核人',
							duration: 2500
						})
						return false
					}
				}
				// 判断 疾病和基因是否为空
				if (that.data2.relatedDiseases === '' || that.data2.gene === '') {
					that.$message({
						type: 'error',
						message: '基因和疾病不能为空',
						duration: 2500
					})
					return false
				}
				that.subNextsh('sub')
				// if(val === '') {
				//   // 狗蛋程序员偷懒，保存和提交用一个接口，保存不跳转，提交要跳转页面
				//   that.subNextsh('save')
				// } else {
				//   that.subNextsh('sub')
				// }
			},
			subNextsh(type) {
				let that = this
				that.data2.userCode = that.value
				// add(1, "新增申请"),
				// update(2, "变更申请")
				// disable(3, "作废申请")
				that.data2['applyType'] = 2
				axios.post(URL.api_name + 'cloud/project/ordinaryPharmGKBAudit', that.data2).then(res => {
					if (res.data.code === '100') {
						that.dialogTableVisible = false
						that.$message({
							type: 'success',
							message: '提交成功',
							duration: 2500,
							onClose: function() {
								// 如果是提交，才跳转，不然是保存，不给跳转
								that.$router.push({
									path: '/ExaminephramGkbList/' + that.$route.params.pager
								})
								// 如果是提交，才跳转，不然是保存，不给跳转
								// if (type === 'sub') {
								//   that.$router.push({
								//     path: '/ExamineKnowledgeList/' + that.$route.params.pager
								//   })
								// } else {
								//   // 保存把页面信息刷新一遍
								//   that.getListData(that.currentPage)
								// }
							}
						})
						// that.getListData(that.currentPage)
					} else {
						that.$message({
							type: 'error',
							message: '提交失败' + res.data.message,
							duration: 2500
						})
					}
				}).catch(err => {
					that.$message({
						type: 'error',
						message: '提交失败',
						duration: 1000
					})
					console.log(err)
				})
			},
			save(val) {
				let that = this
				// that.$confirm('确定保存吗？', '提示', {
				//   confirmButtonText: '确定',
				//   cancelButtonText: '取消',
				//   type: 'warning'
				// }).then(() => {
				// return false
				that.data2['applyType'] = val
				axios.post(URL.api_name + 'cloud/project/insertPharmGKBAudit', that.data2).then(res => {
					if (res.data.code === '100') {
						that.$message({
							type: 'success',
							message: '保存成功',
							duration: 2500,
							onClose: function() {}
						})
					} else {
						that.$message({
							type: 'error',
							message: '保存失败' + res.data.message,
							duration: 1500
						})
					}
				}).catch(err => {
					that.$message({
						type: 'error',
						message: '保存失败',
						duration: 1000
					})
					console.log(err)
				})
				// })
			},
			subEnd() {
				let that = this
				that.$confirm('确认完结提交吗？', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.endsub()
				}).catch(err => {
					console.log(err)
				})
			},
			endsub() {
				// 完结
				let that = this
				if (that.data2.relatedDiseases === '' || that.data2.gene === '') {
					that.$message({
						type: 'error',
						message: '基因和疾病不能为空',
						duration: 2500
					})
					return false
				}
				axios.post(URL.api_name + 'cloud/project/syncSummary', that.data2).then(res => {
					if (res.data.code === '100') {
						that.$message({
							type: 'success',
							message: '提交成功',
							duration: 1000,
							onClose: function() {
								that.$router.push({
									path: '/ExaminephramGkbList/' + that.pager
								})
							}
						})
						// that.getListData(that.currentPage)
					} else {
						that.$message({
							type: 'error',
							message: '提交失败：' + res.data.message,
							duration: 1000
						})
					}
				}).catch(err => {
					that.$message({
						type: 'error',
						message: '提交失败',
						duration: 1000
					})
					console.log(err)
				})
			},
			cancel() {
				// 取消
				let that = this
				that.$router.push({
					path: '/ExaminephramGkbList/' + that.$route.params.pager
				})
			},
			querySearch(queryString, cb) {
				var diseaseListEn = this.diseaseListEn
				var results = queryString ? diseaseListEn.filter(this.createFilter(queryString)) : diseaseListEn
				// 调用 callback 返回建议列表的数据
				cb(results)
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
				}
			},
			handleSelect(language, val) {
				// 选择完疾病英文名，自动把中文也选上
				let that = this
				if (language === 'en') {
					for (let i = 0; i < that.diseaseList.length; i++) {
						if (that.data2.relatedDiseases === that.diseaseList[i].diseaseEnName) {
							that.data2.diseaseName = that.diseaseList[i].name
							// return false
						}
					}
				} else if (language === 'cn') {
					for (let i = 0; i < that.diseaseList.length; i++) {
						if (that.data2.diseaseName === that.diseaseList[i].name) {
							that.data2.relatedDiseases = that.diseaseList[i].diseaseEnName
							// return false
						}
					}
				}

			},
			changeTabId(id) {
				this.showTab = id
			},
			getDrugList() {
				let that = this
				axios.get(URL.api_name + 'report/getDrugControlList', {
						params: {
							pageSize: 9999,
							pageNumber: 1
						}
					}).then(function(respose) {
						if (respose.data.code === '100') {
							// that.drugTypeList = []
							// that.drugTypeList = respose.data.data.list
							// for(let i = 0 ; i < that.drugTypeList.length; i++) {
							//   let n = that.drugTypeList[i].drugName === "" ? '' : '-[' + that.drugTypeList[i].drugName + ']'
							//   that.drugTypeList[i]['drugNameZ'] = that.drugTypeList[i].drugEnName + n
							// }
							that.drstate = respose.data.data.list
						} else {
							that.$message({
								type: 'error',
								message: '药物查询失败' + respose.data.message,
								duration: '1000'
							})
						}
					}),
					function(error) {
						that.$message({
							type: 'error',
							message: '查询失败',
							duration: '1000'
						})
					}
			},
			remoteMethod(query) {
				let that = this
				if (query !== '') {
					that.loading = true
					setTimeout(() => {
						that.loading = false
						that.drugTypeList = []
						that.drugTypeList = that.drlist.filter(item => {
							return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
						})
					}, 200)
				} else {
					that.drugTypeList = []
				}
			},
			handleSelectDrug(language, val) {
				let that = this
				// 截图药物英文名
				val = val[0].split('-[')[0]
				// 对比药物英文名，然后赋值药物类型
				for (let i = 0; i < that.drugTypeList.length; i++) {
					if (val === that.drugTypeList[i].drugEnName) {
						that.data2.drugType = that.drugTypeList[i].drugType
					}
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.drlist = this.drstate.map(item => {
					let n = item.drugName === "" ? '' : '-[' + item.drugName + ']'
					return {
						value: item.drugEnName + n,
						label: item.drugEnName + n
					}
				})
			}, 2000)
		}
	}
</script>
<style scoped>
	.lists {
		background: #fff;
	}

	.el-button--info {
		background: #CECFD0 !important;
		border: 1px solid #CECFD0 !important;
		color: #Fff;
	}
	.knowledge_tab span{
		margin: 0 0px 1px -5px!important;
	}
</style>