<template>
	<div class="list">
		<div class="contentTitle pdlr20">订单列表</div>
		<div class="knowledge_tab" style="display:inline-block; vertical-align:middle; margin-left:20px;">
			<span :class="{'active': formInline.status == 0}" @click="changeSelect(0)">未完成</span>
			<span :class="{'active': formInline.status == 1}" @click="changeSelect(1)">已完成</span>
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="订单号">
					<el-input clearable v-model="formInline.orderId" placeholder="请输入订单号" style="width:190px"></el-input>
				</el-form-item>
				<el-form-item label="受检人">
					<el-input clearable v-model="formInline.name" placeholder="请输入受检人" style="width:190px"></el-input>
				</el-form-item>
				<el-form-item label="套餐名称">
					<el-select filterable remote :loading="loading" clearable :remote-method="remoteMethod" v-model="formInline.productSearchKey" style="width:190px"
					 placeholder="请输入检验项目">
						<el-option v-for="(item, index) in productSearList" :key="index" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付状态">
					<el-select v-model="formInline.payStatus" clearable placeholder="请选择支付状态" style="width:190px">
						<el-option v-for="item in payStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="formInline.status" clearable placeholder="请选择状态" style="width:190px">
						<el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="getListData(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column label="序号" width="100" align="center">
					<template slot-scope="scope">
						{{ (currentPage - 1) * pageSize + scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="订单号" width="200">
					<template slot-scope="scope">
						<a href="javscript:;" style="color:#20a0ff" @click="godetial(scope.row.id)">{{ scope.row.id}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="testOrg" label="医院" width="200"></el-table-column>
				<el-table-column prop="panelCode" label="受检人" width="120">
					<template slot-scope="scope">
						{{ scope.row.applyInfoJson.applyName }}
					</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="性别" width="80">
					<template slot-scope="scope">
						{{ scope.row.applyInfoJson.applySex == 'man' ? '男' : '女' }}
					</template>
				</el-table-column>
				<el-table-column prop="collectRemark" label="年龄" width="80">
					<template slot-scope="scope">
						{{ scope.row.applyInfoJson.applyAge }}
					</template>
				</el-table-column>
				<el-table-column prop="collectRemark" label="套餐名称" width="200">
					<template slot-scope="scope">
						<span class="dunhao" v-for="(item, i) in scope.row.productSnapshot" :key="i">{{ item.productName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="条形码" prop="xx">
					<template slot-scope="scope">
						<span class="dunhao" v-for="(item, i) in scope.row.sampleVos" :key="i">{{ item.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="快递公司" prop="xx">
					<template slot-scope="scope">
						<span class="dunhao" v-for="(item, i) in scope.row.sampleVos" :key="i">{{item.express==='sfexpress'?"顺丰快递":item.express==='ems'?"EMS":item.express==='coldCloud'?"中集冷云":""}}</span>
					</template>
				</el-table-column>
				<el-table-column label="物流编号" prop="xx">
					<template slot-scope="scope">
						<span class="dunhao" v-for="(item, i) in scope.row.sampleVos" :key="i">{{ item.expressCode}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建日期" :formatter="dateFormat" width="160">
				</el-table-column>
				<el-table-column prop="payStatus" label="支付状态" width="110">
					<template slot-scope="scope">
						{{ scope.row.payStatus == 'PENDING' ? '待支付' : scope.row.payStatus == 'DOING' ? '审核中' : scope.row.payStatus == 'FINISH' ? '已支付' : scope.row.payStatus === 'EFUND' ? '已退款' : scope.row.payStatus === 'NONE' ? '无' : '状态错误' }}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" width="110">
					<template slot-scope="scope">
						{{ scope.row.status == 'GENERATED' ? '订单已生成' :scope.row.status == 'SAMPLING' ? '采样中' : scope.row.status == 'DELIVERING' ? '配送中' : scope.row.status == 'COLLECTED' ? '已收样' : scope.row.status === 'EXTRACTED' ? '提取完成' : scope.row.status === 'INSPECTING' ? '检测完成': scope.row.status === 'INSPECTED' ? '检测完成': scope.row.status === 'ANALYSISED' ? '分析完成': scope.row.status === 'UNSCRAMBLED' ? '解读完成' : scope.row.status === 'FINISHED' ? '已完成' : scope.row.status === 'CANCELED' ? '已取消' : '状态错误' }}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getListData"></pager>
	</div>
</template>
<script>
	import axios from 'axios'
	import URL from '@/common/js/URL.js'
	import Pager from '@/components/common/pager'
	import moment from 'moment'
	export default {
		created() {
			this.getListData(this.$route.params.pager)//列表数据
			this.getDrugList()//检验项目
		},
		data() {
			return {
				formInline: {
					orderId: '',
					name: '',
					beginTime: '',
					endTime: '',
					productSearchKey: [],
					status: [],
					payStatus: []
				},
				payStatusList: [{
						value: "PENDING",
						label: '待支付'
					},
					{
						value: "DOING",
						label: '审核中'
					},
					{
						value: "FINISH",
						label: '已支付'
					},
					{
						value: "REFUND",
						label: '已退款'
					},
					{
						value: "NONE",
						label: '无'
					}
				],
				statusList: [{
						value: "GENERATED",
						label: '订单已生成'
					},
					{
						value: "PAY_UNPASS",
						label: '支付审核不通过'
					},
					{
						value: "PAYED",
						label: '订单已支付且审核通过(待派送)'
					},
					{
						value: "DELIVERING",
						label: '派送中(待收样)'
					},
					{
						value: "COLLECTED",
						label: '已收样(样本提取中)'
					},
					{
						value: "EXTRACTED",
						label: '提取完成(检测中)'
					},
					{
						value: "BUILD",
						label: '建库完成'
					},
					{
						value: "UP_MACHINE",
						label: '上机完成'
					},
					{
						value: "DOWN_MACHINE",
						label: '下机完成'
					},
					{
						value: "OUT_SEND",
						label: '实验检测中'
					},
					{
						value: "INSPECTED",
						label: '实验检测完成(生信分析中)'
					},
					{
						value: "ANALYSISED",
						label: '生信分析完成(报告解读中)'
					},
					{
						value: "UNSCRAMBLED",
						label: '报告解读完成'
					},
					{
						value: "FINISHED",
						label: '订单已完成'
					},
					{
						value: "CANCELED",
						label: '已取消'
					}
				],
				loading: false,
				productSearList: [],
				drlist: [],
				drstate: [],
				tableData: [],
				currentPage: 1,
				pageSize: 10,
				pageNumber: 1,
				totalCount: 0,
			}
		},
		mounted() {
			setTimeout(() => {
				this.drlist = this.drstate.map(item => {
					return {
						value: item.name,
						label: item.name
					};
				})
			}, 2000)
		},
		methods: {
			remoteMethod(query) {
				let that = this
				if (query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.productSearList = []
						this.productSearList = this.drlist.filter(item => {
							return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
						})
					}, 200);
				} else {
					this.productSearList = [];
				}
			},
			getDrugList() {
				let that = this
				axios.get(URL.api_name + '/cloud/project/productList', {
						params: {
							pageNumber: 1,
							pageSize: 999,
							productName: '',
						}
					}).then(function(respose) {
						if (respose.data.code === '100') {
							that.drstate = JSON.parse(respose.data.data).list
						} else {
							that.$message({
								type: 'error',
								message: '检验项目查询失败' + respose.data.message,
								duration: 1000
							})
						}
					}),
					function(error) {
						that.$message({
							type: 'error',
							message: '查询失败',
							duration: 1000
						})
					}
			},
			getListData(num) {
				let that = this
				that.loading = true
				this.currentPage = parseInt(num)
				axios.get(URL.api_name + 'cloud/project/orderPage', {
					params: {
						//isCheck:0,
						sourceOrderNo: that.formInline.orderId,
						sickName: that.formInline.name,
						payStatus: that.formInline.payStatus,
						productSearchKey: that.formInline.productSearchKey,
						orderStaus: that.formInline.status,
						// createTime: moment(that.formInline.beginTime).format('YYYY-MM-DD'),
						pageSize: that.currentPage,
						pageNumber: that.pageSize
					}
				}).then(function(respose) {
					that.loading = false
					if (respose.data.code === '100') {
						let n = JSON.parse(respose.data.data)
						that.tableData = n.data.list
						for (let i = 0; i < that.tableData.length; i++) {
							that.tableData[i].applyInfoJson = JSON.parse(that.tableData[i].applyInfoJson)
							that.tableData[i].productSnapshot = JSON.parse(that.tableData[i].productSnapshot)

						}
						that.totalCount = n.data.totalElements
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
			dateFormat(row, column) {
				let date = row[column.property]
				if (date === undefined) {
					return ''
				}
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage)
			},
			changeSelect(n) {
				let that = this
				that.status = parseInt(n)
				that.formInline.status = parseInt(n)
				that.getListData(1, n)
			},
			godetial(id) {
				this.$router.push({
					path: '/order_details/' + id
				})
			},
			goNext() {
				this.$router.push({
					path: '/order_edit/'
				})
			}
		},
		components: {
			Pager: Pager
		}
	}
</script>
<style scope="scoped">
	.tabCard {
		margin-top: -10px;
	}

	.tabCard span {
		border: 1px solid #e6ebf5;
		margin: 0 0px -1px 0;
		display: inline-block;
		padding: 10px 24px;
		cursor: pointer;
	}

	.tabCard span:first-child {
		margin: 0 0px -1px 0;
		border-top-left-radius: 3px;
	}

	.tabCard span:last-child {
		border-top-right-radius: 3px;
	}
	.knowledge_tab {
    height: 38px;
	}

	.knowledge_tab span {
		border: 1px solid #e6ebf5;
		margin: 0 0px -1px 0;
		display: inline-block;
		padding: 10px 17px;
		cursor: pointer;
		background: #eee;
		color: #4A4A4A;
		font-size: 16px;
		border-top: solid 2px #eee;
	}

	.knowledge_tab span:first-child {
		margin: 0 -5px -1px 0;
	}

	.knowledge_tab span:hover,
	.knowledge_tab span.active {
		background: #fff;
		color: #008AFF;
		border-top: solid 2px #288DF5;
	}
</style>
