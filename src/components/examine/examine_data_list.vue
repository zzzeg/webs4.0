<template>
	<div class="list">
		<div class="contentTitle pdlr20">审核数据</div>
		<div class="knowledge_tab" style="display:inline-block; vertical-align:middle; margin-left:20px;">
			<span :class="{'active': formInline.status === 1}" @click="changeSelect(1)">待审核</span>
			<span :class="{'active': formInline.status === 2}" @click="changeSelect(2)">审核中</span>
			<span :class="{'active': formInline.status === 3}" @click="changeSelect(3)">已完成</span>
			<span :class="{'active': formInline.status === 99}" @click="changeSelect(99)">已作废</span>
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="ID">
					<el-input v-model="formInline.id" size="medium" placeholder="请输入ID号" style="width:180px"></el-input>
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
				<!-- <el-form-item label="pmid">
          <el-input v-model="formInline.pmid" size="medium" placeholder="请输入pmid"></el-input>
        </el-form-item> -->
				<el-form-item>
					<el-button size="medium" type="primary" @click="search(formInline.status)">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-data">
			<el-table :data="tableData" v-loading="loading" style="width: 100%" stripe>
				<!-- <el-table-column width="20" ></el-table-column> -->
				<el-table-column label="ID" prop="id" width="170" >
					<!-- <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template> -->
				</el-table-column>
				<el-table-column prop="summaryId" v-if="formInline.status === 3" label="知识库编号"></el-table-column>
				<el-table-column prop="gene" label="基因"></el-table-column>
				<el-table-column prop="mutation" label="变异"></el-table-column>
				<!-- <el-table-column prop="mutationType" label="变异类型"></el-table-column> -->
				<el-table-column prop="drug" label="药物" width="250">
					<template slot-scope="scope">
						{{ scope.row.drug + "(" + scope.row.drugCh + ")" }}
					</template>
				</el-table-column>
				<el-table-column prop="diseaseEn" label="疾病"></el-table-column>
				<el-table-column prop="pmid" label="pmid" width="320"></el-table-column>
				<el-table-column prop="pubDate" label="发表时间"></el-table-column>
				<el-table-column prop="auditorName" label="当前审核人" width="140"></el-table-column>
				<!-- <el-table-column prop="efficacy" label="疗效"></el-table-column> -->
				<!-- <el-table-column label="标注">标注有多少无效的</el-table-column> -->
				<el-table-column prop="status" label="状态" width="100">
					<template slot-scope="scope">
						{{ scope.row.status === 1 ? '待审核' : scope.row.status === 2 ? '进行中' : scope.row.status === 3 ? '已完成' : '已作废' }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template slot-scope="scope">
						<el-button type="text" v-if="scope.row.status === 1" @click="copy(scope.row.id)">复制</el-button>
						<el-button type="text" v-if="scope.row.status === 1 || scope.row.status === 99 || scope.row.status ===3" @click="goinfo(scope.row.id)">审核</el-button>
						<el-button type="text" v-if="scope.row.status === 3" @click="goDetail(scope.row.id)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :pageSize="pageSize" :total-count="totalCount"
		 v-on:handleCurrentChange="(val)=>getListData(val, formInline.status)"></pager>
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
			that.formInline = n ? n : that.formInline
			this.getListData(this.$route.params.pager, this.formInline.status)
		},
		data() {
			return {
				formInline: {
					id: '',
					gene: '',
					mutaion: '',
					diseaseName: '',
					drugName: '',
					status: 1,
					pmid: ''
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
				}
				this.formInline.status = status
				this.getListData(this.currentPage, status)
			},
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage, that.formInline.status)
			},
			getListData(num, status) {
				// console.log(num)
				let that = this
				this.currentPage = parseInt(num)
				if (status !== undefined) {
					that.formInline.status = status
				} else {
					that.formInline.status = ''
				}
				that.loading = true
				axios.get(URL.api_name + 'cloud/project/getSummaryAudits', {
					params: {
						id: that.formInline.id,
						gene: that.formInline.gene,
						mutaion: that.formInline.mutaion,
						disease: that.formInline.diseaseName,
						drug: that.formInline.drugName,
						status: that.formInline.status,
						pageSize: that.pageSize,
						pageNumber: num
						// pmid: that.formInline.pmid
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
			copy(id) {
				let that = this
				let n = {}
				n["id"] = id
				axios.post(URL.api_name + 'cloud/project/copyAudit', n).then(res => {
					if (res.data.code === '100') {
						that.$message({
							type: 'success',
							message: '复制成功',
							duration: 1500
						})
						that.getListData(that.currentPage, this.formInline.status)
					} else {
						that.$message({
							type: 'error',
							message: '复制失败' + res.data.message,
							duration: 1500
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			goinfo(code) {
				let that = this
				localStorage.setItem('serach_items', JSON.stringify(that.formInline))
				localStorage.setItem('serach_status', JSON.stringify(that.status))
				this.$router.push({
					path: '/ExamineDataInfo/' + code + '/' + this.currentPage
				})
			},
			goDetail(code) {
				let that = this
				localStorage.setItem('serach_items', JSON.stringify(that.formInline))
				localStorage.setItem('serach_status', JSON.stringify(that.status))
				this.$router.push({
					path: '/ExamineDataDetial/' + code + '/' + this.currentPage
				})
			},
			changeSelect(n) {
				let that = this
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
