<template>
	<div class="list">
		<div class="contentTitle pdlr20">审核知识库</div>
		<div class="knowledge_tab"  style="display:inline-block; vertical-align:middle; margin-left:20px;">
			<span :class="{'active': status === 1}" @click="changeSelect(1)">待审核</span>
			<span :class="{'active': status === 0}" @click="changeSelect(0)">已入库</span>
			<span :class="{'active': status === 3}" @click="changeSelect(3)">已完成</span>
			<!-- <span :class="{'active': status === 99}" @click="changeSelect(99)">作废</span> -->
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="ID">
					<el-input v-model="formInline.id" size="medium" placeholder="请输入id号" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item label="基因">
					<el-input v-model="formInline.gene" size="medium" placeholder="请输入基因名" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item label="变异">
					<el-input v-model="formInline.mutaion" size="medium" placeholder="请输入变异名" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item label="疾病">
					<el-input v-model="formInline.diseaseName" size="medium" placeholder="请输入疾病名" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item label="药物">
					<el-input v-model="formInline.drugName" size="medium" placeholder="请输入药物名" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="search(status)">查询</el-button>
					<el-button type="success" size="medium" @click="add()">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
			<el-table :data="tableData"  style="width: 100%" stripe>
				<el-table-column width="20" ></el-table-column>
				<el-table-column label="ID" prop="summaryId" v-if="status === 1" width="160"></el-table-column>
				<el-table-column label="ID" prop="id" v-if="status === 0" width="160"></el-table-column>
				<el-table-column prop="gene" label="基因"></el-table-column>
				<el-table-column prop="variant" label="变异"></el-table-column>
				<el-table-column prop="drug" label="药物" width="340">
					<template slot-scope="scope">
						{{ scope.row.drugName }}({{ scope.row.drugEnName }})
					</template>
				</el-table-column>
				<el-table-column prop="diseaseEnName" label="疾病" width="370">
					<template slot-scope="scope">
						{{ scope.row.diseaseName }}({{ scope.row.diseaseEnName }})
					</template>
				</el-table-column>
				<el-table-column prop="createTime" :formatter="dateFormat" v-show="status === 1" label="修改时间" width="170"></el-table-column>
				<el-table-column prop="auditorName" v-show="status === 1" width="150" label="当前审核人"></el-table-column>
				<el-table-column label="操作" width="120">
					<template slot-scope="scope">
						<el-button type="text" :disabled="scope.row.auditFlag === 2" @click="goinfo(scope.row.id)">修改</el-button>
						<!-- <el-button type="text" size="mini" v-if="scope.row.status !== 100" @click="">作废</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount"
		 v-on:handleCurrentChange="(val)=>getListData(val, status)"></pager>
	</div>
</template>
<script>
	import URL from '@/common/js/URL.js'
	import Pager from '@/components/common/pager'
	import axios from 'axios'
	import moment from 'moment'
	export default {
		created() {
			let that = this
			let n = JSON.parse(localStorage.getItem('serach_items'))
			let s = JSON.parse(localStorage.getItem('serach_status'))
			that.status = s !== null ? s : that.status
			that.formInline = n ? n : that.formInline
			that.getListData(that.$route.params.pager, that.formInline.status)
		},
		data() {
			return {
				formInline: {
					id: '',
					gene: '',
					mutaion: '',
					diseaseName: '',
					drugName: '',
					status: 1
				},
				status: 1,
				dialogVisible: false,
				tableData: [],
				currentPage: 1,
				pageSize: 10,
				pageNum: 0,
				totalCount: 0,
				loading: false
			}
		},
		components: {
			Pager: Pager
		},
		methods: {
			search(status) {
				if (this.currentPage > 1) {
					this.currentPage = 1
				} else {
					this.formInline.status = status
					this.getListData(this.currentPage, status)
				}
			},
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage, that.status)
			},
			getListData(num, status) {
				// console.log(num)
				let that = this
				this.currentPage = parseInt(num)
				let url = ''
				url = status !== 0 ? 'cloud/project/getBacklogSummaryPage' : 'cloud/project/getSummaryPage'
				that.loading = true
				axios.get(URL.api_name + url, {
					params: {
						state: status,
						id: that.formInline.id,
						gene: that.formInline.gene,
						variant: that.formInline.mutaion,
						diseaseEnName: that.formInline.diseaseName,
						drugEnName: that.formInline.drugName,
						pageSize: that.pageSize,
						pageNumber: num
					}
				}).then(function(respose) {
					that.loading = false
					if (respose.data.code === '100') {
						let data = respose.data
						that.tableData = data.data.list
						that.totalCount = data.data.total
					} else {
						that.$message({
							type: 'error',
							message: '查询失败',
							duration: 1000
						})
					}
					localStorage.removeItem('serach_items')
					localStorage.removeItem('serach_status')
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
			add() {
				this.$router.push({
					path: '/ExamineKnowledgeNew' + '/' + this.currentPage+"/0"
				})
			},
			goinfo(code) {
				let that = this
				localStorage.setItem('serach_items', JSON.stringify(that.formInline))
				localStorage.setItem('serach_status', JSON.stringify(that.status))
				let n = that.status === 0 ? 0 : 1
				this.$router.push({
					path: '/ExamineKnowledgeInfo/' + code + '/' + this.currentPage + '/' + n
				})
			},
			goDetail(code) {
				// this.$router.push({
				//   path: '/ExamineDataDetial/' + code + '/' + this.currentPage
				// })
			},
			dateFormat(row, column) {
				let date = row[column.property]
				if (date == undefined || date == null) {
					return ''
				} else {
          return moment(date).format('YYYY-MM-DD HH:mm:ss')
        }
			},
			changeSelect(n) {
				let that = this
				that.status = n
				that.formInline.status = n
				that.getListData(1, n)
			}
		}
	}
</script>
<style lang="less" scoped>
	.knowledge_tab {
		height: 38px;
	}

	.knowledge_tab span {
		border: 1px solid #D5D8D9;
		margin: 0 0px -1px 0;
		display: inline-block;
		padding: 10px 17px;
		cursor: pointer;
		background: #eee;
		color: #4A4A4A;
		font-size: 16px;
		border-top: solid 1px #D5D8D9;
		margin-right: -6px;
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
