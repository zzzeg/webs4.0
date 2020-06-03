<template>
 <div class="list">
	 <div class="contentTitle pdlr20">订单详情</div>
    <div class="order_content">
			<el-row><el-col :span="24"><div class="content_text">基本信息</div></el-col></el-row>
			<el-row>
			<el-col :span="6">
				<div class="tdtitle">订&nbsp;&nbsp;单&nbsp;号：</div>
				<div class="tdtext">{{data.id}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">下单时间：</div>
				<div class="tdtext">{{data.createTime | formatDate}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">订单金额：</div>
				<div class="tdtext">￥{{data.payAmount}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">支付状态：</div>
				<div class="tdtext">{{data.payStatus == 'PENDING' ? '待支付' : data.payStatus == 'DOING' ? '审核中' : data.payStatus == 'FINISH' ? '已支付' : data.payStatus === 'EFUND' ? '已退款' : data.payStatus === 'NONE' ? '无' : '状态错误'}}</div></td>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="6">
				<div class="tdtitle">支付金额：</div>
				<div class="tdtext">￥{{JSON.parse(data.payRecordJson)[0].money}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">支付方式：</div>
				<div class="tdtext">{{data.payWay == 'TRANSFER' ? '银行转账' : data.payWay == 'WEINXIN' ? '微信支付' : '暂未支付'}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">支付时间：</div>
				<div class="tdtext">{{JSON.parse(data.payRecordJson)[0].payTime | formatDate}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">支付流水号：</div>
				<div class="tdtext">{{JSON.parse(data.payRecordJson)[0].tradeNo}}</div>
			</el-col>
		</el-row>
		
		<el-row><el-col :span="24"><div class="content_text">受检人信息</div></el-col></el-row>
		<el-row>
			<el-col :span="6">
				<div class="tdtitle">受&nbsp;&nbsp;检&nbsp;人：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).applyName}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).applySex == 'man' ? '男' : '女'}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).applyAge}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯：</div>
				<div class="tdtext">&nbsp;{{JSON.parse(data.applyInfoJson).applyNativePlace}}</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="6">
				<div class="tdtitle">联系电话：</div>
				<div class="tdtext">{{data.testPhone}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">身份证号：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).applyCardNo}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">现住地址：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).province + JSON.parse(data.applyInfoJson).city + JSON.parse(data.applyInfoJson).area}}</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<div class="tdtitle">样本类型：</div>
				<div class="tdtext">{{data.sampleInfos}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
				<div class="tdtext">{{JSON.parse(data.productJson)[0].code}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">套餐名称：</div>
				<div class="tdtext">{{JSON.parse(data.productJson)[0].code}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">检测项目：</div>
				<div class="tdtext">{{JSON.parse(data.productSnapshot)[0].category}}</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<div class="tdtitle">送检科室：</div>
				<div class="tdtext">{{data.testDepartment}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">送检医生：</div>
				<div class="tdtext">{{data.testDoctor}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</div>
				<div class="tdtext">{{JSON.parse(data.applyInfoJson).applyPhone}}</div>
			</el-col>
			<el-col :span="6">
				<div class="tdtitle">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</div>
				<div class="tdtext">{{data.testOrg}}</div>
			</el-col>
		</el-row>
		
		<el-row><el-col :span="24"><div class="content_text">其他</div></el-col></el-row>
		<el-row>
			<el-col :span="24">
				<div class="tdtitle">附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</div>
				<div class="upload_img" v-for="(item, index) in JSON.parse(data.attachmentsPath)" :key="index">
				  <img :src="url + 'cloud/project/downloadOrderFile?fileDownUrl=' + item.filePath + '&token='+ token" alt="">
				</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="tdtitle">小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结：</div>
				<div class="information">{{data.summaryInfo}}</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="tdtitle">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</div>
				<div class="information">{{data.remark}}</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="tdtitle">订单动态：</div>
				<div class="information">{{data.bizWorkList[0].createTime | formatDate}}</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="tdtitle">运营人员：</div>
				<div class="information">{{data.bizWorkList[0].createBy}}</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="tdtion">疗后随访信息：</div>
				<div class="information">{{data.bizWorkList[0].description}}</div>
			</el-col>
		</el-row>
  </div>
 </div> 
</template>
<script>
  import axios from 'axios'
  import URL from '@/common/js/URL.js'
  import {formatDate} from '@/common/js/Utils.js'
  export default {
    created () {
      this.getListData(1)
    },
    data() {
      return {
        id: this.$route.params.id,
        data:{
          applyInfoJson: '{"address":"","applyAge":25,"applyCardNo":"440921111111111111","applyName":"潘先生","applyNativePlace":"汉族","applyPhone":"15902024983","applySex":"female","area":"惠东县","areaCode":"441323","city":"惠州市","cityCode":"441300","province":"广东省","provinceCode":"440000"}',
          productJson: '[{"code":"a009","name":"结直肠癌套餐（血液样本）"}]',
          productSnapshot: '[{"category":"肿瘤组织检测","lab":"大连实验室","productCode":"a009","productName":"结直肠癌套餐（血液样本）","providerId":"188577926664355848","providerName":"外送试验室","relatedProductPrice":55500}]',
          payRecordJson: '[{"tradeNo":"支付流水号1111","money":3333300,"payTime":"2018-10-24"}]',
          attachmentsPath: '[{"activated":true,"createBy":"111","createTime":1540375871000,"fileName":"","filePath":"http://192.168.13.64:39090/file/download/gene_order/15403758275521711.jpg","id":"239692188165799939","lastUpdateBy":"111","lastUpdateTime":1540375871000,"orderId":"239692188102885385","version":1}]',
          bizWorkList:[{"activated":true,"avatar":"","bizConsultVo":null,"bizDradviceVo":null, "bizFileList":[],"bizId":"239692188102885385", "bizMedicalRecordVo":null, "createBy":"运营人员", "createTime":"2018-10-24","description":"订单已生成", "doctorVo":null, "drId":"","fuvInstanceVo":null,"fuvPlanVo":null,"id":"239692188169994242","lastUpdateBy":"29517187626565641", "lastUpdateTime":"2018-10-24","mdtVo":null, "naireFeedBackVo":null,"patientId":"","patientName":"","recordType":0,"stateText":"已完成","status":3,"statusEnum":"GENERATED","title":"","type":11,"version":0}],
          payAmount: 0
        },
        token: JSON.parse(localStorage.getItem('authtoken')),
        url: URL.api_name,
      }
    },
    methods: {
      getListData() {
      // 获取初始数据 data的内容
      let that = this
      axios.get(URL.api_name + 'cloud/project/getOrderDetail', {
          params: {
            sourceOrderNo: that.id
          }
        }).then(function (respose) {
          that.data = JSON.parse(respose.data.data).data//传换json格式
          if(that.data.payRecordJson == '[]') {
            that.data.payRecordJson = '[{"tradeNo":"0","money":0,"payTime":"0"}]'
          }
          console.log(that.data.payRecordJson)
        }, function (error) {
          // console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      goBack() {//返回按钮
      this.$router.go(-1);
      },
     
    },
     filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      },
    }
  }
</script>
<style scope="scoped" >
	  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
		padding-left: 20px;
		padding-right: 20px;
		color: #7F8493;
		font-size:14px;
		
  }
	.order_content{
		margin-top: 20px;
	}
	.content_text{
		text-align: left;
	  height: 40px;
	  line-height: 40px;
		color: #4A4A4A;
		font-weight:500;
		font-size: 16px;
	  border-bottom: 1px solid #eee;
	}
	.tdtitle{
		float: left;
		width: 100px;
	}
	.tdtext{
		float: left;
		width: 250px;
	}
	.tdtion{
		float: left;
		width: 120px;
	}
	.upload_img{
			width: 100px;
			height: 100px;           
			font-size: 12px;
			display: inline-block;
			border-radius:5px; 
			margin-right:15px;
			border:1px dashed #ccc;
			
	}
	.upload_img img{
		width:100%; 
		height:100%;
	}
	.contentspan {
    font-size: 18px;
    color: #4a4a4a;
    font-weight: bold;
    margin: 15px 0;
	}
	.contentspan:before {
	  content: "";
	  display: inline-block;
	  width: 4px;
	  height: 18px;
	  background: #008AFF;
	  border-radius: 2px;
	  vertical-align: middle;
	  margin-right: 10px;
	}
</style>