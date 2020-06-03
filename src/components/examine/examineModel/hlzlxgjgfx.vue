<template>
	<div class="base_msg blockContent">
		<div class="subItems">
			<div class="subtable dtitleBg" style="margin: 15px 0px 10px 0px;">
				<span>化疗治疗相关结果分析</span>
			</div>
			<el-table :data="formDataN" style="width: 100%" border stripe>
				<el-table-column prop="geneVariant" label="检测项目" width="180"></el-table-column>
				<!-- <el-table-column prop="gene" label="基因" width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.gene }}</span>
						<el-input v-if="scope.row.isEdit" v-model="scope.row.gene" placeholder=""></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="variant" label="变异" width="100">
					<template slot-scope="scope">
						<span>{{ scope.row.variant }}</span>
						<el-input v-if="scope.row.isEdit" v-model="scope.row.variant" placeholder=""></el-input>
					</template>
				</el-table-column> -->
				<el-table-column prop="testResult" label="结果" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.testResult }}</span>
						<!-- <el-input v-if="scope.row.isEdit" v-model="scope.row.testResult" placeholder=""></el-input> -->
					</template>
				</el-table-column>
				<el-table-column prop="tips" label="提示">
          <template slot-scope="scope">
            <span>{{ scope.row.tips+ scope.row.tipsReal}}</span>
          </template>
        </el-table-column>
				<!-- <el-table-column label="操作" width="80">
	      		<template slot-scope="scope">
	            	<a href="javascript:;" v-if="!scope.row.isEdit" @click="changeEdit('true', scope.$index)" class="editBtn"><i class="el-icon-edit-outline"></i></a>
	            	<a href="javascript:;" v-if="scope.row.isEdit" @click="cancerChange(scope.$index)" class="editBtn"><i class="el-icon-circle-close-outline"></i></a>
	            	<a href="javascript:;" v-if="scope.row.isEdit" @click="saveChange(formData1, scope.$index)" class="editBtn"><i class="el-icon-circle-check-outline"></i></a>
                <a href="javascript:;" v-if="scope.row.isEdit" @click="delItems(formData1, scope.$index)" class="editBtn"><i class="el-icon-delete"></i></a>
	        	</template>
	      </el-table-column> -->
			</el-table>
		</div>
		<p>&nbsp;</p>
		<p style="font-size:14px;color:#555;">说明：检测报告中基因表达水平检测，检测数据显示的百分比为您该基因表达水平在同类癌种人群中所处 的位置，可划分为低、中偏低、中、中偏高、高五个表达水平。有些基因表达水平越低，患者经对应药 物治疗后疗效好的可能性越大；而有些基因表达水平越高，患者经对应药物治疗后疗效好的可能性越 大。</p>
	</div>
</template>
<script>
	export default {
		props: {
			formDatas: {
				type: Object
			}
		},
		created() {},
		data() {
			return {
				isEdit1: false,
				isEdit2: false,
				formData: [],
				formData1: [],
        formDataN: []
			}
		},
		methods: {
			changeEdit(val, index) {
				let that = this
				that.$set(that.formData1.list[index], 'isEdit', true)
			},
			cancerChange(index) {
				let that = this
				that.$set(that.formData1.list[index], 'isEdit', false)
				// 重新给formData赋值    取消的时候，重置内容
				let n = Object.assign({}, that.formDatas)
				that.formData1 = n
			},
			saveChange(vale, index) {
				let that = this
				that.$set(that.formData1.list[index], 'isEdit', false)
				let n = Object.assign({}, that.formData1)
				that.formData = n
				that.$emit('saveChange', vale)
			},
			delItems(vale, index) {
				// 删除一行
			}
		},
		watch: {
			formDatas: function(newVal, oldVal) {
				let that = this
				this.formData = newVal
				this.formData1 = JSON.parse(JSON.stringify(this.formData))
        that.formDataN=[]
				for (let i in that.formData1) {
					that.$set(that.formData1[i], 'isEdit', false)
          if(that.formData1[i].gene != 'HER2/NEU' && that.formData1[i].gene != 'PTEN' && that.formData1[i].variant != '') {
            that.formDataN.push(that.formData1[i])
          }
				}
			}
		},
		computed: {

		}
	}
</script>
