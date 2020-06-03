<template>
	<div class="list">
		<div class="contentTitle pdlr20">个人中心</div>
		<div class="userInfo">
			<div class="center">
				<el-upload class="upGravatar" :action="imgUploadUrl" list-type="picture-card" :headers="uploadHeader" :file-list="fileList"
				 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload" :on-success="handleSuccess">
					<el-button size="small" type="text">修改头像</el-button>
				</el-upload>
			</div>
			<div class="uselist">
				<el-form ref="formData" :rules="rules" :model="formData" label-width="100px">
					<el-form-item label="姓名：" prop="orgName">
						<el-input type="text" v-model="formData.orgName" disabled ></el-input>
					</el-form-item>
					
					<el-form-item label="登录账号：" prop="userName">
						<el-input v-model="formData.userName" disabled ></el-input>
					</el-form-item>
					<br/>
					
					<el-form-item label="性别：" prop="sex">
						<el-input type="text" v-model="formData.sex == '1' ? '男' : '女'" disabled ></el-input>
					</el-form-item>
					
					
					<el-form-item label="登录密码：" prop="userPassword">
						<el-input type="password" v-model="userPassword" disabled ></el-input>
					</el-form-item>

					<el-form-item style="width: 50px;margin-left: -100px;">
						<el-button type="warning" size="medium" :loading="isLoading"  @click="dialogFormVisible = true">
							 {{ isLoading ? '正在修改' : '修改密码' }}
						</el-button>
					</el-form-item>
					
					<el-form-item style="width: 50px;margin-left: 5px;">
						<el-button type="primary" size="medium"  @click="modifyhead('formData')">保存</el-button>
					</el-form-item>
					
				<!-- 	<br />
					 <el-form-item label="邮箱：" prop="email">
					    <el-input v-model="formData.email" disabled></el-input>
					</el-form-item>
					
					 <el-form-item label="详细地址：" prop="address">
						 <el-input type="text" v-model="formData.address" disabled style="width: 320px;"></el-input>
					</el-form-item> -->
				
				</el-form>
			</div>
		</div>
		<!-- 模态框 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
			<el-form :model="formPassword" :rules="rules">
				<el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
					<el-input type="password" v-model="formPassword.oldPassword" autocomplete="off" placeholder="请输入当前密码"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
					<el-input type="password" v-model="formPassword.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="确认密码" prop="reNewPassword" :label-width="formLabelWidth">
					<el-input type="password" v-model="formPassword.reNewPassword" autocomplete="off" placeholder="请输入当前密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="success" @click="sub('formData')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import URL from '@/common/js/URL.js'
	import axios from 'axios'
	export default {
		created() {
			this.getInfo()
		},
		data() {
			return {
				formData: {
					iconUrl: '',
					orgName: '',
					userName: '',
					sex: '',
					email: '',
					address: ''
				},
				userPassword: '666666', //密码不返回先写死
				formPassword: {
					oldPassword: '',
					newPassword: '',
					reNewPassword: ''
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
				isLoading: false,
				token: this.$route.params.token,
				rules: {
					oldPassword: [{
						required: true,
						message: '原密码不能为空',
						trigger: 'blur'
					}],
					newPassword: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					}],
					reNewPassword: [{
							required: true,
							message: '确认密码不能为空',
							trigger: 'blur'
						},
						{
							required: true,
							min: 6,
							message: '密码长度不能低于6位',
							trigger: 'change'
						}
					]
				},
				imgUploadUrl: URL.api_name + 'cloud/upload_icon',
				isLoading: false,
				dialogImageUrl: '',
				userInfo: [],
				dialogVisible: false,
				fileList: [{
					name: 'gravatar.jpg',
					url: ''
				}],
				loading: false
			}
		},
		methods: {
			getInfo() {
				let that = this
				axios.get(URL.api_name + 'cloud/user_info').then(res => {
					if (res.data.code === '100') {
						that.formData = res.data.data
						that.fileList = []
						that.fileList.push({
							name: '',
							url: res.data.data.iconUrl
						})
					}
				}, function(error) {
					that.$message({
						type: 'error',
						message: '获取信息失败',
						duration: 1000
					})
				})
			},
			sub(formName) {
				let that = this
				that.dialogFormVisible = false
				that.$refs[formName].validate((valid) => {
					if (valid) {
						// 如果验证通过，即提交
						if (that.formPassword.newPassword !== that.formPassword.reNewPassword) {
							that.$message({
								message: '两次密码不一致',
								type: 'error'
							})
							return false
						}
						that.isLoading = true
						axios.post(URL.api_name + 'cloud/modify_password', that.formPassword).then((res) => {
							that.isLoading = false
							if (res.data.code === '100') {
								that.$message({
									message: res.data.message,
									type: 'success'
								})
								that.dialogFormVisible = false //成功打开模态框修改密码
							} else {
								that.$message({
									message: '提交失败,请重新输入',
									type: 'error',
									duration: 1000
								})
							}
						})
						// that.isLoading = false
					} else {
						// 上面是验证失败...
						console.log('error submit!!')
						return false
					}
				})
			},
			modifyhead (formName) {
			  let that = this
			  that.$refs[formName].validate((valid) => {
			    if (valid) {
			      // 如果验证通过，即提交
			      that.isLoading = true
			      axios.post(URL.api_name + 'cloud/modify_user', that.formData).then((res) => {
			        that.isLoading = false
			        if (res.data.code === '100') {
			          that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
			          that.userInfo.iconUrl = that.formData.iconUrl
			          localStorage.setItem('userInfo', JSON.stringify(that.userInfo))
			          that.$message({
			            message: res.data.message + '',
			            type: 'success'
			           
			          })
			        } else {
			          that.$message({
			            message: '提交失败',
			            type: 'error',
			            duration: 1000
			          })
			        }
			      })
			    } else {
			      // 上面是验证失败...
			      console.log('error submit!!')
			      return false
			    }
			  })
			},
			handleRemove(file, fileList) {
				console.log(file, fileList)
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			},
			beforeUpload(file) {
				// if (this.fileList.length > 0) {
				//   this.fileList = []
				//   // this.$message({
				//   //   type: 'error',
				//   //   message: '最多上传一张图片',
				//   //   duration: 1000
				//   // })
				//   // return false
				// }
			},
			handleSuccess(response, file, fileList) {
				let that = this
				that.fileList = []
				if (response.code === '100') {
					that.formData.iconUrl = response.data.iconUrl
					that.fileList.push({
						name: '',
						url: response.data.iconUrl
					})
				} else if (response.code === '1005') {
					that.$router.push({
						path: '/'
					})
				} else {
					that.fileList = []
				}
			}
		},
		computed: {
			uploadHeader() {
				return {
					token: JSON.parse(localStorage.getItem('authtoken'))
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.userInfo {
		height: 500px;
		margin: 40px 20px;
	}
	.center {
			width: 100px;
			float: left;
			margin: 19px;
		}
	.coupon-logo {
		display: inline-block;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		vertical-align: bottom;
	}

	.uselist {
		float: left;
	}

	/deep/.el-upload-list--picture-card .el-upload-list__item {
		width: 50%;
		height: 50%;
		border-radius: 50%;
		border: none;
	}

	.el-form {
		margin: 30px 0  30px 0;

		.el-form-item {
			float: left;
			margin-bottom: 10px;

			/deep/.el-form-item__label {
				color: #7F8493;
				height: 35px;
				line-height: 35px;
				font-size: 14px;
				margin-top: 3px;
			}

			/deep/.el-input__inner {
				outline: none;
				cursor: pointer;
				height: 35px;
				font-size: 14px;
			}

			/deep/.el-input.is-disabled .el-input__inner {
			  color: #7F8493;
					text-align: left;
					padding-left: 5px;
					margin-left: -8px;
					border-radius: 5px;
					background: none;
					border: none;
			}
		}
	}

	/deep/.el-dialog__wrapper {
		top: 100px;
	}

	/deep/.el-dialog {
		width: 30%;
		height:350px;

		/deep/.el-dialog__header {
			background: #008AFF;
			padding: 13px 20px 10px;
		}

		/deep/.el-dialog__body {
			padding: 20px;
			height: 178px;
		}

		/deep/.el-dialog__headerbtn .el-dialog__close {
			color: #fff;
		}

		/deep/.el-dialog__title {
			color: #fff;
			font-size: 16px;
		}

		/deep/.el-dialog__footer {
			text-align: center;
			padding: 0px 20px 30px 20px;
		}

		/deep/.el-button--success {
			width: 80px;
			height: 40px;
			line-height: 10px;
			background: #008AFF;
			border-color: #008AFF;
			border-radius: 2px;
		}

		/deep/.el-input__inner {
			width: 200px;
			background: #fff;
		}

		/deep/.el-form {
			margin-left: 60px;
			/deep/.el-form-item {
				margin-bottom: 15px;
			}
		}
	}
	.list /deep/.el-form-item.is-success .el-input__inner {
		border-color: #008aff !important;
	}

	.list /deep/.el-form-item .el-form-item__error {
		left: 18px !important;
	}
</style>
<style lang="less">
	.el-upload--picture-card {
		width: 87px;
		height: 30px;
		line-height: 1;
		border: none;
		display: block;
		margin-top: -80px;
		opend: use_info.vue;
	}

	.el-upload-list__item-actions {
		display: none;
		opacity: 0;
		opend: use_info.vue;
	}

	.el-upload-list__item-status-label {
		display: none;
		opacity: 0;
		opend: use_info.vue;
	}

	.upGravatar .el-upload-list--picture-card {
		display: inline-block;
		width: 148px;
		height: 160px;
	}
</style>
