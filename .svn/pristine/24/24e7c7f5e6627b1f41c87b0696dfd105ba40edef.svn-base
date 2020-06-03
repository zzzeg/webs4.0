<template>
	<div class="list">
		<div class="contentTitle pdlr20">审核报告</div>
		<div class="knowledge_tab" style="display:inline-block; vertical-align:middle; margin-left:20px;">
			<span :class="{'active': status === 3}" @click="changeSelect(3)">待审</span>
			<span :class="{'active': status === 96}" @click="changeSelect(96)">审核中</span>
			<span :class="{'active': status === 4}" @click="changeSelect(4)">已完成</span>
			<span :class="{'active': status === 0}" @click="changeSelect(0)">全部</span>
		</div>
		<div class="search-wrapper" style="display:inline-block; vertical-align:middle;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="报告名称">
					<el-input v-model="formInline.flowName" placeholder="请输入报告名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="受检人">
					<el-input v-model="formInline.sickName" size="medium" placeholder="请输入受检人姓名" clearable></el-input>
				</el-form-item>
				<el-form-item label="报告时间">
					<el-date-picker v-model="formInline.startTime" type="date" :editable='false' @change="beginTimeRules" placeholder="选择日期时间">
					</el-date-picker>
					<div class="Zvertical">至</div>
					<el-date-picker v-model="formInline.endTime" type="date" :editable='false' @change="endTimeRules" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="search">查询</el-button>
					<!-- <el-button type="primary" size="medium" @click="goSend()">发送邮件</el-button> -->
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
				<el-table-column prop="projectCode" label="报告编号"></el-table-column>
				<el-table-column prop="projectName" label="检测项目"></el-table-column>
				<!-- <el-table-column prop="sex" label="性别" width="100"></el-table-column> -->
				<el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column label="受检人">
					<template slot-scope="scope">
						{{ scope.row.sickName}}
					</template>
				</el-table-column>
				<el-table-column prop="createDate" :formatter="dateFormat" label="创建时间"></el-table-column>
				<el-table-column prop="status" label="状态" width="150">
					<template slot-scope="scope">
						{{ scope.row.status === 3 ? '待审核' : scope.row.status === 4 ? '已完成' : '审核中' }}
					</template>
				</el-table-column>
				<el-table-column :label="status == 3 || status == 4 ? '创建人' : '当前审核人'" width="150">
					<template slot-scope="scope">
						{{ (status == 3 || status == 4) ? scope.row.createUserName : scope.row.currentAduitName }}
					</template>
				</el-table-column>
				<!-- <el-table-column prop="currentAduitName" v-if="status == 96" label="当前审核人" width="160"></el-table-column> -->
				<el-table-column label="操作" :width='status != 4 ? 290 : 500'>
					<template slot-scope="scope">
						<el-button type="text" v-if="status === 3 || status==0" @click="examineSh('cn', scope.row.projectCode, currentPage, scope.row.code, scope.row.sourceOrderNo, scope.row.productType, scope.row.shapeType)">审核</el-button>
						<!-- <el-button type="text" v-if="scope.row.status === 3" @click="examineSh('en', scope.row.projectCode, currentPage, scope.row.code, scope.row.sourceOrderNo)">审核英文报告</el-button> -->
						<!-- <el-button type="text" v-if="scope.row.pdfUrl || scope.row.pdfUrl == ''" @click="">上传</el-button>  (!scope.row.reportFileCode || scope.row.reportFileCode == '') && -->
						<a href="javascript:;" class="reportsStyle" v-if="status === 3 || status==0"
						 style="width:56px; display:inline-block;">
							<el-upload class="upload-demo" :headers="uploadHeader" :action="upurl" :data="{projectCode: scope.row.projectCode}"
							 :on-success="handlePDFSuccess" :on-error="handlePDFerror" :before-upload="(file)=>beforePDFUpload(file)"
							 :file-list="fileListe">
								<el-button type="text" :loading="pdfloading">{{ pdfloading ? '上传中...' : '上传' }}</el-button>
							</el-upload>
						</a>
						<a v-if="scope.row.reportFileCode && scope.row.reportFileCode !== ''" :href="url + 'report/file/download?code=' + scope.row.reportFileCode + '&token=' + token">
							<el-button type="text" @click="">下载</el-button>
						</a>

						<!-- <el-button type="text" v-if="scope.row.status !== 3" @click="examine('cn', scope.row.projectCode, currentPage)">查看中文报告</el-button> -->
						<!-- <el-button type="text" v-if="scope.row.status !== 3"  @click="examine('en', scope.row.projectCode, currentPage)">查看英文报告</el-button> -->
						<el-button type="text" @click="reExamine(scope.row.projectCode)" v-if="status === 4 && roleCode === '6'">重新审核</el-button>
						<el-button type="text" v-if="scope.row.status === 3" @click="goend(scope.row.projectCode)">异常结束</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="输入审核信息" :visible.sync="dialogVisible">
			<el-row>
				<el-input v-model="textares" :rows="4" type="textarea"></el-input>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="textares = '', dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="subGroup">确 定</el-button>
			</span>
		</el-dialog>
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
			this.getListData(this.$route.params.pager, 3)
		},
		data() {
			return {
				roleCode: JSON.parse(localStorage.getItem('userInfo')).roleCode,
				pager: this.$route.params.pager,
				formInline: {
					sickName: '',
					flowName: '',
					endTime: '',
					startTime: ''
				},
				url: URL.api_name,
				upurl: URL.api_name + 'report/uploadReportFile',
				token: JSON.parse(localStorage.getItem('authtoken')),
				updatae: {
					projectCode: '',
					// langType: this.$route.params.language
				},
				pdfloading: false,
				fileListe: [],
				status: 3,
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
				if (this.currentPage > 1) {
					this.currentPage = 1
				} else {
					this.getListData(this.currentPage)
				}
			},
			handelCurrent(val) {
				let that = this
				that.pageSize = val
				that.getListData(that.currentPage, that.status)
			},
			handlePDFSuccess(res, file) {
				let that = this
				that.$message({
					type: 'success',
					message: '上传成功',
					duration: 2000
				})
				that.fileListe = []
				that.fileListe.push({
					name: res.data.fileName + '.' + res.data.fileSuf,
					url: res.data.fileDownUrl
				})
				that.pdfloading = false
				that.getListData(that.currentPage, that.status)
				// this.imageUrl = URL.createObjectURL(file.raw)
			},
			handlePDFerror(err, file, fileList) {
				// PDF上传失败
				that.$message({
					type: 'error',
					message: '上传失败',
					duration: 2000
				})
				that.pdfloading = false
			},
			beforePDFUpload(file, code) {
				// alert(file.type)
				// return false
				let that = this
				// that.updatae.projectcode = code
				this.pdfloading = true
				const isPDF = file.type === 'application/pdf'
				if (!isPDF) {
					this.$message.error('上传文件只能是 PDF 格式!')
					this.pdfloading = false
				}
				return isPDF
			},
			getListData(num, status) {
				console.log(num)
				this.currentPage = parseInt(num)
				var that = this
				that.loading = true
				axios.get(URL.api_name + 'cloud/audit_project', {
					params: {
						status: that.status,
						startTime: that.formInline.startTime,
						endTime: that.formInline.endTime,
						projectName: that.formInline.flowName,
						pageSize: that.pageSize,
						pageNumber: num,
						sickName: that.formInline.sickName
						// name: that.formInline.name
						// storeId: JSON.parse(localStorage.getItem('store')).k
					}
				}).then(function(respose) {
					// let data = respose.data
					that.tableData = respose.data.data.list
					that.loading = false
					that.totalCount = respose.data.data.total
					// for (let n = 0; n < data.data.list.length; n++) {
					//   that.tableData[n].jsonValue = JSON.parse(data.data.list[n].jsonValue)
					// }
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
			goSend() {
				this.$router.push({
					path: '/email/new'
				})
			},
			goend(projectcode) {
				// 异常结束
				let that = this
				that.$confirm('确定结束吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios.get(URL.api_name + 'report/exp_examination', {
						params: {
							projectCode: projectcode
						}
					}).then(res => {
						if (res.data.code === '100') {
							that.$message({
								type: 'success',
								message: '操作成功',
								duration: 1000
							})
							that.getListData(that.currentPage)
						}
					}).catch(err => {
						that.$message({
							type: 'error',
							message: '操作失败',
							duration: 1000
						})
						console.log(err)
					})
				}).catch(() => {})
			},
			beginTimeRules(val) {
				let date1 = moment(val)
				let date2 = moment(this.formInline.signupEnd)
				this.formInline.startTime = val
				// console.log(date2)
				if (date2 !== 'NaN' && date1.diff(date2) > 0) {
					this.$message({
						message: '开始时间不能大于结束时间',
						type: 'error'
					})
					this.formInline.startTime = ''
				}
				this.formInline.startTime = moment(val).format('YYYY-MM-DD')
			},
			endTimeRules(val) {
				let date1 = moment(this.formInline.startTime)
				let date2 = moment(val)
				this.formInline.signupEnd = val
				// console.log(date2)
				if (date1 !== 'NaN' && date1.diff(date2) >= 0) {
					this.$message({
						message: '结束时间不能小于开始时间',
						type: 'error'
					})
					this.formInline.signupEnd = ''
				}
				this.formInline.endTime = moment(val).format('YYYY-MM-DD')
			},
			dateFormat(row, column) {
				let date = row[column.property]
				if (date === undefined) {
					return ''
				}
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			examineSh(language, id, pager, pcode, sourceOrderNo, productType, shapeType) {
				let that = this
				// that.dialogVisiblele = true
				if (sourceOrderNo == '') {
					sourceOrderNo = '6e6f206f7264657269642c206d6f74686572206675636b6572'
				}
				that.cid = id
				if (language === 'en') {
					that.$router.push({
						path: '/examineAdd/en/' + id + '/' + pager + '/' + pcode + '/' + sourceOrderNo + '/' + productType + '/' + shapeType
					})
				} else if (language === 'cn') {
					that.$router.push({
						path: '/examineAdd/cn/' + id + '/' + pager + '/' + pcode + '/' + sourceOrderNo + '/' + productType + '/' + shapeType
					})
				}
			},
			examine(language, code, pager) {
				let that = this
				// that.dialogVisible = true
				that.cid = code
				this.$router.push({
					path: '/examineDetial/' + language + '/' + code + '/' + pager + '/examineAlready'
				})
			},
			subGroup() {
				// that.cid
				let that = this
				if (that.textares === '') {
					that.$message({
						message: '提交失败，请输入审核信息',
						type: 'error'
					})
					return false
				}
				that.dialogVisible = false
				that.$message({
					message: '提交成功',
					type: 'success'
				})
			},
			reExamine(code) {
				var that = this
				that.$confirm('确定重审吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios.get(URL.api_name + 'report/re_examination', {
						params: {
							projectCode: code
						}
					}).then(res => {
						if (res.data.code === '100') {
							that.$message({
								type: 'success',
								message: '提交成功',
								duration: 1000
							})
							that.getListData(that.currentPage)
						}
					}).catch(err => {
						that.$message({
							type: 'error',
							message: '提交失败',
							duration: 1000
						})
						console.log(err)
					})
				}).catch(() => {})
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
