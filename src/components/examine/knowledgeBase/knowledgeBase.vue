<template>
	<div class="list">
		<div class="contentTitle pdlr20">知识库</div>
		<div class="knowledge_tab" style="display:inline-block; vertical-align:middle; margin-left:20px;">
      <span :class="{'active': status == ''}" @click="changeSelect('')">全部</span>
			<span :class="{'active': status == 'HEALTH_RISK'}" @click="changeSelect('HEALTH_RISK')">健康风险</span>
			<span :class="{'active': status == 'PECULIARITY_GENE'}" @click="changeSelect('PECULIARITY_GENE')">特质基因</span>
			<span :class="{'active': status == 'SAFETY_DRUG'}" @click="changeSelect('SAFETY_DRUG')">安全用药</span>
			<span :class="{'active': status == 'SINGLE_GENE_INHERITANCE'}" @click="changeSelect('SINGLE_GENE_INHERITANCE')">单基因遗传病</span>
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="项目名称">
					<el-input v-model="formInline.flowName" placeholder="请输入报告名称" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="getListData(1, status)">查询</el-button>
					<el-button type="default" size="medium" @click="formInline.flowName = ''">清空</el-button>
          <el-button type="success" size="medium" @click="goinfo">新增检测项目</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-data" v-loading="false" element-loading-text="拼命加载中">
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column label="序号" width="100" align="center">
					<template slot-scope="scope">
						{{ (currentPage - 1) * pageSize + scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column prop="code" width="140" label="报告编号"></el-table-column>
				<el-table-column prop="name" label="检测项目"></el-table-column>
				<el-table-column prop="nameEn" label="English name"></el-table-column>
        <el-table-column prop="v" label="项目版本" width="120"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" @click="goinfo('edit', scope.row.id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pager :current-page="currentPage" v-on:handleSizeChange="handelCurrent" :total-count="totalCount"
		 v-on:handleCurrentChange="(val) => getListData(val, status)"></pager>
	</div>
</template>
<script>
	import URL from '@/common/js/URL.js'
	import Pager from '@/components/common/pager'
	import axios from 'axios'
	import moment from 'moment'
	export default {
		created() {
			this.getListData(this.$route.params.pager ? this.$route.params.pager : 1, '')
		},
		data() {
			return {
				pager: this.$route.params.pager,
				formInline: {
					flowName: ''
				},
				token: JSON.parse(localStorage.getItem('authtoken')),
				fileListe: [],
				status: '',
				textares: '',
				cid: '',
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
		computed: {
			uploadHeader() {
				return {
					token: JSON.parse(localStorage.getItem('authtoken'))
				}
			}
		},
		methods: {
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage, that.status)
			},
			getListData(num, status) {
				console.log(num)
				this.currentPage = parseInt(num)
				var that = this
				that.loading = true
				axios.get(URL.api_name + 'cloud/healthGeneProject/getPageByType', {
					params: {
						type: status,
						searchKey: that.formInline.flowName,
						pageSize: that.pageSize,
						pageNumber: that.currentPage
						// name: that.formInline.name
						// storeId: JSON.parse(localStorage.getItem('store')).k
					}
				}).then(function(res) {
					// let data = res.data
					that.tableData = res.data.data.list
					that.loading = false
					that.totalCount = res.data.data.total
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
			goinfo(type, id) {
				this.$router.push({
					path: '/knowledgeBaseInfo/' + type + '/' + id
				})
			},
			dateFormat(row, column) {
				let date = row[column.property]
				if (date === undefined) {
					return ''
				}
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			changeSelect(n) {
				let that = this
				that.status = n
				that.getListData(1, n)
			}
		}
	}
</script>
<style lang="less" scoped>
	.Zvertical {
		display: inline-block;
		line-height: 36px;
		height: 36px;
	}

	.el-input {
		vertical-align: middle;
	}

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
<style>
	.reportsStyle .el-upload-list {
		display: none !important;
	}
</style>
