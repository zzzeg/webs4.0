<template>
	<div class="list">
		<div class="contentTitle pdlr20">注释信息</div>
		<div class="knowledge_tab" style="display:inline-block; vertical-align:middle; margin-left:20px;">
			<span :class="{'active': status == 1}" @click="changeSelect(1)">基因注释</span>
			<span :class="{'active': status == 2}" @click="changeSelect(2)">变异注释</span>
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="基因">
					<el-input v-model="formInline.gene" placeholder="请输入基因名" clearable></el-input>
				</el-form-item>
				<el-form-item label="癌种形态" v-if="status == '1'">
					<el-select clearable v-model="formInline.shapeType"  placeholder="请选择癌种形态">
						<el-option label="血液肿瘤" value="0"></el-option>
						<el-option label="实体瘤" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="变异" v-else-if="status == '2'">
					<el-input v-model="formInline.variant" placeholder="请输入变异名" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="search">查询</el-button>
					<el-button type="primary" size="medium" @click="goInfo('add', status, '0')">新建</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-data" v-loading="false" element-loading-text="拼命加载中">
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column prop="gene" label="基因" width="100"></el-table-column>
				<el-table-column prop="note" label="基因注释" v-if="status == 1" :key=Math.random()></el-table-column>
				<el-table-column prop="variant" label="变异" width="200" v-if="status == 2" :key=Math.random()></el-table-column>
				<el-table-column v-if="status == 2" prop="pathogenesis" label="疾病相关" width="150" :key=Math.random()></el-table-column>
				<el-table-column v-if="status == 2" prop="clinsig" label="临床意义" :key=Math.random()></el-table-column>
				<el-table-column v-if="status == 2" prop="siteNote" label="位点注释" :key=Math.random()></el-table-column>
				<el-table-column v-if="status == 1" prop="diseaseName" label="肿瘤类型" width="100">
					<template slot-scope="scope">
						{{ scope.row.shapeType == '0' ? '血液肿瘤' : '实体瘤' }}
					</template>
				</el-table-column>
		        <el-table-column v-if="status == 2" prop="diseaseName" label="肿瘤" width="100" :key=Math.random()>
		        </el-table-column>
				<el-table-column prop="literatureNote" label="参考文献"></el-table-column>
				<el-table-column label="操作" :width='150'>
					<template slot-scope="scope">
						<el-button type="text" @click="goInfo('edit', status, scope.row.code)">编辑</el-button>
            <el-button type="text" v-if="status == 2" @click="editStatus(scope.row.code,scope.row.status)">{{scope.row.status == 1 ? '作废': '启用'}}</el-button>
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
			let that = this
			that.status = this.$route.params.status == 'undefined' ? 1 : this.$route.params.status
			this.getListData(this.$route.params.pager, that.status)
		},
		data() {
			return {
				pager: this.$route.params.pager,
				statu: this.$route.params.status,
				formInline: {
					gene: '',
					shapeType: '',
					classes: '',
					code: '',
					diseaseName: '',
					siteNote: '',
					variant: ''
				},
				token: JSON.parse(localStorage.getItem('authtoken')),
				pdfloading: false,
				fileListe: [],
				status: 1,
				textares: '',
				cid: '',
				dialogVisible: false,
				tableData: [],
				currentPage: 1,
				pageSize: 10,
				pageNum: 0,
				totalCount: 0,
				loading: false,
				categoryList: []
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
			search() {
				let that = this
				if (this.currentPage > 1) {
					this.currentPage = 1
				} else {
					this.getListData(this.currentPage, that.status)
				}
			},
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage, that.status)
			},
			getListData(num, status) {
				console.log(num)
				this.currentPage = parseInt(num)
				var that = this
				let url = status == 1 ? 'cloud/knowledge/getGeneNotes' : 'cloud/knowledge/getVariantNotes'
				let paramss = {}
				if (status == 1) {
					paramss = {
						shapeType: that.formInline.shapeType
					}
				} else {
					paramss = {
						variant: that.formInline.variant
					}
				}
				paramss['gene'] = that.formInline.gene
				paramss['pageSize'] = that.pageSize
				paramss['pageNumber'] = num
				that.loading = true
				axios.get(URL.api_name + url, {
					params: paramss
				}).then(function(res) {
					// let data = respose.data
					if (res.data.code == '100') {
						that.tableData = res.data.data.list
						that.loading = false
						that.totalCount = res.data.data.total
					} else {
						that.$message({
							type: 'error',
							message: res.data.message,
							duration: 1000
						})
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
			goInfo(type, status, code) {
				let that = this
				that.$router.push({
					path: '/ExamineNotesInfo/' + type + '/' + status + '/' + code + '/' + that.currentPage
				})
			},
      editStatus(code,status){
        let that = this
        let paramData = {}
        paramData = {
          status: status ==1 ? 99 : 1,
          code: code
        }
        axios.post(URL.api_name+'cloud/knowledge/updateVariantNoteStatus',paramData).then((res) => {
          that.isLoading = false
          if (res.data.code === '100') {
            that.$message({
              message: res.data.message,
              type: 'success',
              duration: 1000,
              onClose: function () {
                that.getListData(that.currentPage,2)
              }
            })
          } else {
            that.$message({
              message: res.data.message,
              type: 'error',
              duration: 2000
            })
          }
        })
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
