<template>
	<div class="lists">
		<div class="contentTitle pdlr20">创建项目</div>
		<el-steps :active="activeCheck" finish-status="success" align-center>
			<el-step @click.native="activeCheck = canNext !== false ? 0 : index" style="cursor: pointer" :title="stepse.stepName"
			 v-for="(stepse, index) in itemList" :key="index"></el-step>
		</el-steps>
		<div class="table-data" v-loading="loading" element-loading-text="拼命加载中">
			<el-form :model="formData" :rules="rules" ref="formData" label-width="240px">
				<el-form-item label="检测项目：" v-if="activeCheck == 0">
					<el-col :span="20">
						<!--<el-select v-model="formData.code" clearable placeholder="请选择" :disabled="selectOnly" @change="selectChange"
						 style="width:100%;">
							<el-option :label="item.businessName" :value="item.code" v-for="item in checkItems" :key="formData.businessCode"></el-option>
						</el-select>-->
            <el-input type="text" v-model="formData.businessName" disabled  style="width:100%;"></el-input>
					</el-col>
				</el-form-item>
				<div class="squerItmes" v-for="(squerItmes, index) in itemList" v-if="index === activeCheck" :key="index" style="position:relative;">
					<div class="position_absolute" style="top: -60px;left: 30%;" v-if="squerItmes.stepName === '检测结果上传'">
						<!-- <el-upload :action="import_file_actionUrl" :before-upload="(file)=>import_before(file)" :on-success="(response, file, fileList)=>import_success(response, file, fileList)"
							 :show-file-list="false" :headers="uploadHeader" :file-list="import_fileList">
								<el-button size="small" type="primary" :disabled="uploading">一键导入</el-button>
							</el-upload> -->
					</div>
					<el-form-item v-for="(itemer, itemerKey) in squerItmes.blockFields" :label="itemer.label + '：'"
					 v-show="itemer.type !== 'hidden'" :key="itemerKey">
						<!-- 姓名 -->
						<el-col :span="20" v-if="itemer.element === 'input' && itemer.type === 'text' && itemer.name != 'sourceOrderNo'">
							<el-input type="text" v-model="formData.dynamicInfo[itemer.name]" style="width:100%;"></el-input>
						</el-col>
						<!-- 年龄 -->
						<el-col :span="20" v-if="itemer.element === 'input' && itemer.type === 'text' && itemer.name == 'sourceOrderNo'"
						 style="position:relative; z-index:1;">
							<!-- 订单号 -->
							<el-col :span="24" style="padding-left: 0px;">
								<el-input type="text" v-model="formData.dynamicInfo[itemer.name]" style="width:100%;"></el-input>
							</el-col>
							<!-- <el-col :span="20">
				                <el-button type="primary" size="small" @click="showreportList(1)" style="margin-left:2em">查看报告</el-button>
				            </el-col> -->
							<el-col :span="24" style="margin: 1em 0 -1em 0;">
								<el-upload class="noup" :action="imageUploadUrl" list-type="picture-card" :file-list="fileListe" :on-preview="handlePictureCardPreview"
								 :headers="uploadHeader">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-col>
						</el-col>

						<el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'number'">
							<el-input type="number" v-model.number="formData.dynamicInfo[itemer.name]"></el-input>
						</el-col>
						<el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'hidden'">
							<el-input type="text" v-model="formData.dynamicInfo[itemer.name]"></el-input>
						</el-col>
						<el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'autocomplete'">
							<el-autocomplete clearable class="inline-input" v-model="formData.dynamicInfo[itemer.name]" :fetch-suggestions="(queryString, cb)=> autocompleteList(queryString, cb, itemer.name)"
							 placeholder="请选择" :trigger-on-focus="true" @select="(item)=>autocompleteSelect(item, itemer.name)">
								<template slot-scope="{ item }">
									<div class="name">{{ item.businessName }}</div>
								</template>
							</el-autocomplete>
						</el-col>
						<el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'file'">
							<el-upload :data="updata" :action="imgUploadUrl" :on-remove="handleRemove" :before-upload="beforeUpload"
							 :on-success="handleSuccess" :headers="uploadHeader" :file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传不超过500Mb的文件</div>
							</el-upload>
						</el-col>
						<!-- 收样日期 -->
						<el-col :span="20" v-if="itemer.element === 'input' && itemer.type === 'date'">
							<el-input type="text" v-model="formData.dynamicInfo[itemer.name]" placeholder="" style="width:100%"></el-input>
						</el-col>
						<!-- 样本类型 -->
						<el-col :span="20" v-if="itemer.element === 'select' && itemer.name === 'sampleType'">
							<el-select v-model="formData.dynamicInfo[itemer.name]" clearable placeholder="请选择" style="width:100%;"
							 multiple>
								<el-option :label="item.label" :value="item.label" v-for="(item, index) in itemer.initValueJsonObject" :key="index"></el-option>
							</el-select>
						</el-col>
						<!-- 批次号 -->
						<el-col :span="20" v-if="itemer.element === 'select' && itemer.name === 'batchNumber'">
							<el-select v-model="formData.dynamicInfo[itemer.name]" @change="(val)=>isValueNull(val)" placeholder="选择批次号批次号才可下一步"
							 clearable style="width:100%;">
								<el-option :label="item.batchNumber" :value="item.batchNumber" v-for="(item, index) in picihaoList" :key="index"></el-option>
							</el-select>
						</el-col>
						<!-- 国籍/模板 -->
						<el-col :span="20" v-if="itemer.element === 'select' && itemer.name !== 'sampleType' && itemer.name !== 'batchNumber'">
							<el-select v-model="formData.dynamicInfo[itemer.name]" @change="seleisNull(formData.dynamicInfo[itemer.name])"
							 clearable placeholder="请选择" style="width:100%;">
								<el-option :label="item.label" :value="item.value" v-for="(item, index) in itemer.initValueJsonObject" :key="index"></el-option>
							</el-select>
						</el-col>
						<!-- radio -->
						<el-col :span="20" v-if="itemer.element === 'radio'">
							<el-radio v-model="formData.dynamicInfo[itemer.name]" style="margin-right:50px;" :label="e.value" v-for="(e, eindex) in itemer.initValueJsonObject"
							 :key="eindex">{{ e.label }}</el-radio>
							<!-- <el-radio v-model="formData.dynamicInfo[itemer.name]" :label="1">男</el-radio>
								<el-radio v-model="formData.dynamicInfo[itemer.name]" :label="2">女</el-radio> -->
						</el-col>
						<!-- 文本框 -->
						<el-col :span="20" v-if="itemer.element === 'textarea' || itemer.name === 'address'">
							<el-input type="textarea" :rows="2" v-model="formData.dynamicInfo[itemer.name]"></el-input>
						</el-col>


						<!-- 表格 -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name !== 'quality_control_result' && itemer.name !== 'gene_msi' && itemer.name !== 'gene_mmr' && itemer.name !== 'gene_mutation' && itemer.name !== 'gene_copy' && itemer.name !== 'gene_expression' && itemer.name !== 'gene_amplification' && itemer.name !== 'gene_tumor_burden' && itemer.name !== 'gene_fusion' && itemer.name !== 'dna_quality_Inspection' && itemer.name !== 'rna_quality_Inspection' && itemer.name !== 'medication_history'"
						 style="position:relative;">
							<!-- <h2 class="squerItmes">{{ itemer.label }}</h2> -->
							<el-button type="success" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)" v-if="itemer.element === 'dna_quality_Inspection' && itemer.name !== 'rna_quality_Inspection'">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="keys">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder=""></el-input>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60" v-if="itemer.element === 'dna_quality_Inspection' && itemer.name !== 'rna_quality_Inspection'">
									<template slot-scope="scope">
										<el-button type="danger" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">-</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

						<!--dna/rna质检-->
						<el-col :span="20" v-if="itemer.name === 'dna_quality_Inspection' || itemer.name === 'rna_quality_Inspection'"
						 style="position:relative">
							<h2 class="squerItmes_h2">{{ itemer.label }}</h2>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder=""></el-input>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

						<!-- 微卫星不稳定（MSI）和错配修复（MMR） -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_msi'" style="position:relative;">
							<h2 class="squerItmes_h2">{{ itemer.label }}</h2>
							<table class="like_elTable">
								<tr>
									<th colspan="3">检测项</th>
									<th colspan="1">检测结果</th>
								</tr>
								<tr v-for="(items, key, index) in  formData.dynamicInfo.gene_msi[0].results[0]" :key="key">
									<td rowspan="9" v-if="index === 0">MSI</td>
									<td> {{ key }} </td>
									<td>
										<el-select v-model="formData.dynamicInfo.gene_msi[0].results[0][key]" clearable placeholder="请选择" @change="geneMsiChange">
											<el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
										</el-select>
									</td>
									<td rowspan="9" v-if="index === 0">
										<el-input type="text" v-model="formData.dynamicInfo.gene_msi[0].msi" disabled style="border:none"></el-input>
									</td>
								</tr>
								<!-- <tr v-for="(items, key, index) in  formData.dynamicInfo.gene_msi[0].results[1]" :key="key">
									<td rowspan="9" v-if="index === 0">MMR</td>
									<td> {{ key }} </td>
									<td>
										<el-select v-model="formData.dynamicInfo.gene_msi[0].results[1][key]" clearable placeholder="请选择" @change="geneMmrChange">
											<el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
										</el-select>
									</td>
									<td rowspan="9" v-if="index === 0">
										<el-input type="text" v-model="formData.dynamicInfo.gene_msi[0].mmr" disabled style="border:none"></el-input>
									</td>
								</tr> -->
							</table>
						</el-col>

						<!-- 微卫星不稳定（MSI）和错配修复（MMR） -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_mmr'" style="position:relative;">
							<h2 class="squerItmes_h2">{{ itemer.label }}</h2>
							<table class="like_elTable">
								<tr>
									<th colspan="3">检测项</th>
									<th colspan="1">检测结果</th>
								</tr>
								<!-- <tr v-for="(items, key, index) in  formData.dynamicInfo.gene_mmr[0].results[0]" :key="key">
									<td rowspan="9" v-if="index === 0">MSI</td>
									<td> {{ key }} </td>
									<td>
										<el-select v-model="formData.dynamicInfo.gene_mmr[0].results[0][key]" clearable placeholder="请选择" @change="geneMsiChange">
											<el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
										</el-select>
									</td>
									<td rowspan="9" v-if="index === 0">
										<el-input type="text" v-model="formData.dynamicInfo.gene_mmr[0].msi" disabled style="border:none"></el-input>
									</td>
								</tr> -->
								<tr v-for="(items, key, index) in  formData.dynamicInfo.gene_mmr[0].results[0]" :key="key">
									<td rowspan="9" v-if="index === 0">MMR</td>
									<td> {{ key }} </td>
									<td>
										<el-select v-model="formData.dynamicInfo.gene_mmr[0].results[0][key]" clearable placeholder="请选择" @change="geneMmrChange">
											<el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
										</el-select>
									</td>
									<td rowspan="9" v-if="index === 0">
										<el-input type="text" v-model="formData.dynamicInfo.gene_mmr[0].mmr" disabled style="border:none"></el-input>
									</td>
								</tr>
							</table>
						</el-col>

						<!-- 肿瘤突变负荷检出情况 -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_tumor_burden'" style=" position:relative;">
							<h5 class="squerItmes_h2">{{ itemer.label }}</h5>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" border>
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" @change="changeTubian(scope.$index)" v-if="index === 1"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-else-if="index === 2">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in gene_tumor_burden_Selection"
											 :key="indexeeee"></el-option>
										</el-select>
										<el-input type="text" v-model="scope.row[keys]" placeholder="" :disabled="index === 0" v-else></el-input>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>
						<!-- 基因表达检出情况 -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_expression'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-if="index === 0"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 1">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in gene_expression_Selection0"
											 :key="indexeeee"></el-option>
										</el-select>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 2">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in gene_expression_Selection"
											 :key="indexeeee"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

						<!--检测平台与样本质控结果-->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'quality_control_result'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="warning" size="mini" class="position_absolute" style="right:60px" @click="showDialog(itemer.name, 'fusion', itemer.label)">批量导入<i
								 class="el-icon-download"></i></el-button>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<!-- <div class="position_absolute" style="top:-4px;right: 80px;">
				                <el-upload
				                  :action="import_Excel_url1"
				                  :before-upload="(file)=>import_before(file)"
				                  :on-success="(response, file, fileList)=>import_Excel_success(response, file, fileList, 'quality_control_result')"
				                  :on-error="(err, file, fileList)=>uperror(err, file, fileList)"
				                  :show-file-list="false"
				                  :headers="uploadHeader"
				                  :file-list="import_Excel_fileList1">
				                  <el-button size="small" type="warning" :disabled="uploading">导入excel</el-button>
				                </el-upload>
				             </div> -->
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder=""></el-input>
										<!-- <el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 1">
				                        <el-option :label="'融合' + item.label" :value="'融合' + item.value" v-for="(item, indexeeee) in yinyang" :key="indexeeee"></el-option>
				                      </el-select> -->
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>
						<!-- 拷贝数变异检出情况 -->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_copy'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="warning" size="mini" class="position_absolute" style="right:60px" @click="showDialog('copy', itemer.name, 'copy')">批量导入<i
								 class="el-icon-download"></i></el-button>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-if="index !== 2"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 2">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in gene_copy_Selection" :key="indexeeee"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>
						<!--基因融合检出情况-->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_fusion'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="warning" size="mini" class="position_absolute" style="right:60px" @click="showDialog('fusion', itemer.name, 'fusion', itemer.label)">批量导入<i
								 class="el-icon-download"></i></el-button>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index"> <template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-if="index !== 1"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 1">
											<el-option :label="'融合' + item.label" :value="'融合' + item.value" v-for="(item, indexeeee) in yinyang" :key="indexeeee"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

						<!--基因突变-->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_mutation'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<!-- <el-button type="warning" size="mini" class="position_absolute" style="right:80px" @click="showDialog(itemer.name, 'fusion', itemer.label)">批量导入<i class="el-icon-download"></i></el-button> -->
							<!-- <div class="position_absolute" style="top:-4px;right: 80px;">
				                <el-upload
				                  :action="import_Excel_url"
				                  :before-upload="(file)=>import_before(file)"
				                  :on-success="(response, file, fileList)=>import_Excel_success(response, file, fileList, 'gene_mutation')"
				                  :on-error="(err, file, fileList)=>uperror(err, file, fileList)"
				                  :show-file-list="false"
				                  :headers="uploadHeader"
				                  :file-list="import_Excel_fileList">
				                  <el-button size="small" type="warning" :disabled="uploading">导入excel</el-button>
				                </el-upload>
				            </div> -->

							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-if="index != 3"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index == 3">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in yinyang" :key="indexeeee"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>
						<!--基因扩增-->
						<el-col :span="20" v-if="itemer.element === 'list' && itemer.name === 'gene_amplification'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<el-button type="warning" size="mini" class="position_absolute" style="right:60px" @click="showDialog('amplification', itemer.name, 'copy', itemer.label)">批量导入<i
								 class="el-icon-download"></i></el-button>
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-if="index !== 1"></el-input>
										<el-select v-model="scope.row[keys]" clearable placeholder="请选择" style="width: 100%;" v-if="index === 1">
											<el-option :label="item.label" :value="item.value" v-for="(item, indexeeee) in gene_amplification_Selection"
											 :key="indexeeee"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

						<!--用药史-->
						<el-col :span="20" v-if="itemer.element == 'list' && itemer.name == 'medication_history'" style="position:relative;">
							<h4 class="squerItmes_h2">{{ '　' }}</h4>
							<!-- <el-button type="warning" size="mini" class="position_absolute" style="right:60px" @click="showDialog('amplification', itemer.name, 'copy', itemer.label)">批量导入<i class="el-icon-download"></i></el-button> -->
							<el-button type="primary" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
							<el-table :data="formData.dynamicInfo[itemer.name]" class="itemBorder" style="width: 100%">
								<el-table-column v-for="(colums, keys, index) in itemer.initValueJsonObject[0]" :prop="keys" :label="itemer.itemJsonValue[index].name"
								 :key="index">
									<template slot-scope="scope">
										<el-select filterable remote multiple clearable v-if="index === 0" v-model="scope.row[keys]" :loading="selectLoading"
										 @visible-change="(val) => visibleChange(val)" placeholder="请选择" style="width:100%;">
											<el-option v-for="(item, indexee) in drugTypeList" :key="indexee" :label="(item.drugName == '' ? item.drugEnName : item.drugName)"
											 :value="item.id">
											</el-option>
										</el-select>
										<el-input type="text" v-model="scope.row[keys]" placeholder="" v-else></el-input>
									</template>
								</el-table-column>
								<el-table-column label="　" width="60">
									<template slot-scope="scope">
										<el-button type="text" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-col>

					</el-form-item>

					<el-form-item v-for="(itemere, kkk) in squerItmes.programVos" :label="itemere.uploadTitle + '：'" v-if="squerItmes.programVos !== null"
					 :key="kkk">
						<el-col :span="20">
							<el-upload :data="updata" :action="imgUploadUrl" :on-remove="(file, fileList)=>handleRemove(file, fileList, itemere.code)"
							 :before-upload="(file)=>beforeUpload(file, itemere.code)" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList, itemere.code)"
							 :headers="uploadHeader" :file-list="fileList">
								<el-button size="small" type="warning">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">{{itemere.uploadDescription}}</div>
							</el-upload>

							<el-col :span="20" style="width:100%;margin-left:-240px;margin-top: 20px;" v-if="activeCheck > 0">
								<el-form-item label="深度：">
									<el-input clearable v-model="itemere.dp" style="width:100%;"></el-input>
								</el-form-item>

								<el-form-item label="质量：" style="margin-top: 20px;">
									<el-input clearable v-model="itemere.qual" style="width:100%;"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
					</el-form-item>
				</div>
				<div style="margin-left: 0px;">
					<el-form-item>
						<span style="display:inline-block; width:140px;"></span>
						<el-button size="medium" type="primary" @click="stepPrev" v-if="activeCheck > 0">上一步</el-button>
						<el-button size="medium" type="primary" :loading="isLoading" @click="sub('formData')" v-if="activeCheck === itemList.length - 1">
							{{ isLoading ? '正在提交' : '提交' }}
						</el-button>
						<el-button size="medium" type="primary" @click="stepNext" style="margin-left:10px;" v-if="activeCheck < itemList.length - 1">下一步</el-button>
						<!-- <el-button size="medium" @click="stepNext" :disabled="!canNext" v-if="activeCheck < itemList.length - 1">下一步</el-button> -->
					</el-form-item>
				</div>

			</el-form>
		</div>
		<!-- </div> -->

		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 0px 0 20px 0px; max-height:360px; overflow:auto;">
				<el-checkbox-group v-model="checkGroup" size="mini" @change="handleCheckedCitiesChange">
					<el-checkbox class="setWidth" v-for="(item, index) in geneArray" :label="item" :key="index" border>{{ item }}</el-checkbox>
				</el-checkbox-group>
			</div>
			<div v-if="modeName === 'fusion' || modeName === 'amplification'">
				<template>
					<el-radio v-model="plvalue" label="阴性">批量阴性</el-radio>
					<el-radio v-model="plvalue" label="阳性">批量阳性</el-radio>
				</template>
			</div>
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left:10px;">全选</el-checkbox>
			<el-button type='info' size="medium" @click="dialogVisible = false,checkGroup = []">取消</el-button>
			<el-button type="primary" size="medium" @click="objDataAddArray(inputName)">导入</el-button>
		</el-dialog>

		<!--查询订单弹窗-->
		<el-dialog title="订单查询" :visible.sync="getSelectOrderDialog" width="80%">
			<div class="search-wrapper">
				<el-form :inline="true" :model="getSelectFrom" class="demo-form-inline" style="position:relative">
					<el-form-item label="订单编号：">
						<el-input v-model="getSelectFrom.orderNo" placeholder="请输入样本编号"></el-input>
					</el-form-item>
					<el-form-item label="受检人：">
						<el-input v-model="getSelectFrom.name" placeholder="请输入受检人名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :loading="getSelectFrom.loading" @click="showreportList(1)">
							{{ getSelectFrom.loading ? '正在查询' : '查询' }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="clinicalTrialsData">
				<el-table :data="orderData.data.list" v-loading="loading" class="itemBorder" style="width: 100%">
					<el-table-column label="订单号" prop="id" width="200">
					</el-table-column>
					<el-table-column label="受检人" prop="applyName">
						<template slot-scope="scope">
							{{ JSON.parse(scope.row.applyInfoJson).applyName }}
						</template>
					</el-table-column>
					<el-table-column label="性别" prop="xx">
						<template slot-scope="scope">
							{{ JSON.parse(scope.row.applyInfoJson).applySex === 'man' ? '男' : '女' }}
						</template>
					</el-table-column>
					<el-table-column label="检测项目" prop="xx">
						<template slot-scope="scope">
							<!-- {{ JSON.parse(scope.row.productJson) }} -->
							<span class="dunhao" v-for="(item, i) in JSON.parse(scope.row.productJson)" :key="i">{{ item.name}}</span>
						</template>
					</el-table-column>
					<el-table-column label="日期" :formatter="dateFormat" prop="createTime">
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button type="success" size="small" v-loading='addLoading' @click="checkListItem(scope.row)">选择</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<pager class="mmpPager" :current-page="getSelectFrom.currentPage" :pageSize="getSelectFrom.pageSize" :total-count="getSelectFrom.total"
			 v-on:handleCurrentChange="(val)=>showreportList(val)"></pager>
		</el-dialog>


		<el-dialog :visible.sync="ImgVisible" width="80%" class="xeeeee">
			<img style="max-width:100%; display:block; margin:0 auto;" :width="imgW" :src="dialogImageUrl" :class="{'imgs rotate0': rotateNum == 0,'imgs rotate1': rotateNum == 1,'imgs rotate2': rotateNum == 2,'imgs rotate3': rotateNum == 3}"
			 ref="img" alt="">
			<br />
			<div style="text-align:center;">
				<div class="qunimade">
					<span @click="addWidth()">+</span>
					<span>{{ imgW }}</span>
					<span @click="removeWidth()">-</span>
				</div>
				<small style="color:#999;  margin: 0 20px 0 -20px; font-size:12px;">(100%最大，30%最小)</small>
				<div class="qunimade">
					<i class="xz" @click="leftRotate"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536750824863&di=17fb61027234ae4f944c68315041e7da&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F48%2F37%2F7357442316d0691.jpg"
						 alt="左旋转"></i>
					<i class="xz" @click="rightRotate"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536750824863&di=17fb61027234ae4f944c68315041e7da&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F48%2F37%2F7357442316d0691.jpg"
						 alt="右旋转"></i>
				</div>
			</div>
		</el-dialog>

		<div class="pdf active" v-if="pcode == '19' && isshowPdf" v-drag style="top:180px; position: absolute; right:60px; width:50%; height:calc(100% - 260px); overflow:auto; z-index:9999; border:solid 1px #ddd; background:#fff;">
			<p class="arrow" style="text-align:center; font-size:14px; margin-top:20px">
		    <!--上一页-->
		    <span @click="changePdfPage(0)" style="cursor:pointer" :class="{color_gray: pdfCurrent==1}">上一页</span>
		    {{pdfCurrent}} / {{pageCount}}
		    <!--下一页-->
		    <span @click="changePdfPage(1)" style="cursor:pointer" :class="{color_gray: pdfCurrent==pageCount}">下一页</span>
		    </p>
			<!-- <pdf ref="pdf" v-for="i in numPages" :key="i" :page="i" :src="pdfUrl">
			</pdf> -->
			<pdf
		      :src="pdfUrl"
		      :page="pdfCurrent"
		      @num-pages="pageCount=$event"
		      @page-loaded="pdfCurrent=$event"
		      @loaded="loadPdfHandler">
		    </pdf>
			<p class="arrow" style="text-align:center; font-size:14px; margin-bottom:20px">
		    <!--上一页-->
		    <span @click="changePdfPage(0)" style="cursor:pointer" :class="{color_gray: pdfCurrent==1}">上一页</span>
		    {{pdfCurrent}} / {{pageCount}}
		    <!--下一页-->
		    <span @click="changePdfPage(1)" style="cursor:pointer" :class="{color_gray: pdfCurrent==pageCount}">下一页</span>
		    </p>
		</div>
	</div>
</template>
<script>
	import URL from '@/common/js/URL.js'
	import pdf from 'vue-pdf'
	import Vue from 'vue'
	import Pager from '@/components/common/pager'
	import axios from 'axios'
	import moment from 'moment'
	Vue.directive('drag', {
		bind(el, binding) {
			el.onmousedown = function(e) {
				console.log('haha')

				var keyx = e.pageX - el.offsetLeft;
				var keyy = e.pageY - el.offsetTop;

				document.onmousemove = function(e) {
					console.log('haha2')
					el.style.left = e.pageX - keyx + 'px';
					el.style.top = e.pageY - keyy + 'px';
				}

				document.onmouseup = function() {
					document.onmousemove = document.onmousedown = null;
				}

				e.preventDefault;
			}
		}
	})
	export default {
		name: 'Pdf',
		created() {
			this.getProcessList()
			this.getbatchNumberList()
			this.getDrugList()
			this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
			// console.log(this.formData.code)
		},
		data() {
			return {
				pageCount: 0,
				pdfCurrent: 0,
				fileType: 'pdf',
				pdfUrl: "http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
				pcode: this.$route.params.productCode,
				isshowPdf: false,
				import_file_actionUrl: URL.api_name + 'cloud/uploadGeneMutation',
				import_fileList: [],
				imgUploadUrl: URL.api_name + (this.$route.params.productCode == '19' || this.$route.params.productCode == '444' ? 'cloud/readPdfInfo' : 'cloud/upload_project'),//this.$route.params.productCode == '41' ||
				import_Excel_url: URL.api_name + 'report/geneMutationResultUpload',
				import_Excel_fileList: [],
				import_Excel_url1: URL.api_name + 'report/detectionPlatformUpload',
				import_Excel_fileList1: [],
				pager: this.$route.params.pager,
				fileList: [],
				productCode: this.$route.params.productCode,
				formData: {
					productCode: this.$route.params.productCode,
					code: this.$route.params.id,
					projectCode: this.$route.params.pcode,
					businessName: '',
					businessCode: this.$route.params.id,
					flowCode: '',
					dynamicInfo: {
						gender: 1,
					}
				},
				fileListe: [],
				plvalue: '',
				modeName: '',
				modeNames: '',
				steps: 0,
				isChecked: false,
				selectOnly: false,
				selectLoading: false,
				activeCheck: 0,
				updata: {
					flowCode: ''
				},
				gene_tumor_burden_Selection: [{
					label: '高负荷',
					value: '高负荷'
				}, {
					label: '中等负荷',
					value: '中等负荷'
				}, {
					label: '低负荷',
					value: '低负荷'
				}],
				gene_amplification_Selection: [{
					label: '扩增阳性',
					value: '扩增阳性'
				}, {
					label: '扩增阴性',
					value: '扩增阴性'
				}],
				gene_copy_Selection: [{
					label: '拷贝数正常',
					value: '拷贝数正常'
				}, {
					label: '高拷贝',
					value: '高拷贝'
				}, {
					label: '拷贝数增加',
					value: '拷贝数增加'
				}, {
					label: '拷贝数缺失',
					value: '拷贝数缺失'
				}],
				gene_expression_Selection: [{
					value: '正常表达',
					label: '正常表达'
				}, {
					value: '表达阴性',
					label: '表达阴性'
				}, {
					value: '低表达',
					label: '低表达'
				}, {
					value: '高表达',
					label: '高表达'
				}],
				gene_expression_Selection0: [{
					value: 'mRNA表达',
					label: 'mRNA表达'
				}, {
					value: '蛋白表达',
					label: '蛋白表达'
				}],
				eeeee: 0,
				yinyang: [{
					value: '阴性',
					label: '阴性'
				}, {
					value: '阳性',
					label: '阳性'
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				checkAll: false,
				isIndeterminate: true,
				geneArray: [],
				picihaoList: [],
				checkGroup: [],
				inputName: '',
				rules: {
					flowCode: [{
						required: true,
						message: '请选择检测项目',
						trigger: 'change'
					}]
				},
				uploading: false,
				fileUrl: [],
				picihaoList: [],
				checkItems: [],
				itemList: [],
				totalCount: 0,
				isLoading: false,
				loading: false,
				cacheData: {
					cache: ''
				},
				canNext: false,
				getSelectFrom: {
					orderNo: '',
					name: '',
					currentPage: 1,
					pageSize: 10,
					total: 0
				},
				imageUploadUrl: '',
				getSelectOrderDialog: false,
				orderData: {
					data: {
						list: []
					},
				},
				rotateNum: 0,
				imgW: "30%",
				addLoading: false,
				ImgVisible: false,
				drugTypeList: [],
			}
		},
		methods: {
			goBack() { //返回按钮
				this.$router.go(-1);
			},
			getbatchNumberList() {
				// 获取批次号列表
				var that = this
				axios.get(URL.api_name + 'cloud/project/getBatchNumberList').then(function(res) {
					if (res.data.code === '100') {
						that.picihaoList = res.data.data
					}
				}, function(error) {
					that.$message({
						type: 'error',
						message: '批次号列表查询失败',
						duration: 1000
					})
				})
			},
			seleisNull(val) {
				console.log(val)
			},
			getProcessList() {
				// 1、进图先获取可用流程列表
				var that = this
				axios.get(URL.api_name + 'cloud/project/getBusinessDetail', {
          params: {
            code: that.formData.code
          }
				}).then(function(res) {
					if (res.data.code === '100') {
						that.checkItems = res.data.data
						// 赋值完成后，执行查询
            that.formData.businessCode = res.data.data.code
            that.formData.businessName = res.data.data.businessName
            console.log(res.data.data)
						that.selectChange()
					}
				}, function(error) {
					that.$message({
						type: 'error',
						message: '查询失败',
						duration: 1000
					})
				})
			},
			selectChange() {
				// 2、选择后获取动态表单列表
				let that = this
				// that.steps = 0
				this.activeCheck = 0
				that.selectOnly = true
				// let url = "./static/report.json"
				let url = URL.api_name + 'cloud/project/getBusinesInfo'
				axios.get(url, {
					params: {
						code: that.formData.code
					}
				}).then(function(res) {
					// console.log('x1OK')
					if (res.data.code === '100') {
						that.itemList = res.data.data
						that.formData.dynamicInfoDto = {}

						// 遍历所有步骤
						for (let i = 0; i < that.itemList.length; i++) {
							// 遍历步骤下的条目
							if (that.itemList[i].blockFields != '[]') {
								for (let n = 0; n < that.itemList[i].blockFields.length; n++) {
									// 判断如果是自动补全系列
									if (that.itemList[i].blockFields[n].type === 'autocomplete') {
										let cacheName = that.itemList[i].blockFields[n].name
										that.cacheData[cacheName] = []
										that.cacheData[cacheName] = that.itemList[i].blockFields[n].businessList
									}
									let keyName = that.itemList[i].blockFields[n].name
									if (that.itemList[i].blockFields[n].element === 'list') {
										that.formData.dynamicInfoDto[keyName] = that.itemList[i].blockFields[n].initValueJsonObject
										that.formData.dynamicInfo[keyName] = that.itemList[i].blockFields[n].initValueJsonObject
									} else if (that.itemList[i].blockFields[n].element === 'select') {
										// 如果
										that.formData.dynamicInfoDto[keyName] = ''
									} else {
										that.formData.dynamicInfoDto[keyName] = ''
									}
								}
							}
							// 遍历步骤下的上传文件组件
							// console.log()
							if (that.itemList[i].programVos !== null) {
								for (let s = 0; s < that.itemList[i].programVos.length; s++) {
									// upfile组
									let n = that.itemList[i].programVos[s].code
									that.formData[n] = []
									that.itemList[i].programVos[s].qual = '30'
									that.itemList[i].programVos[s].dp = '100'
								}
							}
						}
						that.updata.flowCode = that.formData.flowCode
						that.formData.dynamicInfo = that.formData.dynamicInfoDto
						// console.log(that.formData)

						console.log(that.formData.dynamicInfo)
						// that.getFromValue()
					}
				}, function(error) {
					console.log(error)
					that.$message({
						type: 'error',
						message: '查询失败',
						duration: 1000
					})
				})
			},
			formatTime(value, name) {
				this.formData.dynamicInfo[name] = value
			},
			sub(formName) {
				let that = this
				// 遍历对象进行判断表格
				// for( var i in that.formData.dynamicInfoDto) {
				//   console.log( i + ":::" + that.formData.dynamicInfoDto[i])
				// }
				if (that.pcode == '19') {
					that.formData.dynamicInfoDto = that.formData.dynamicInfo
				}
				let n = that.itemList.length - 1
				if (that.itemList[n].programVos && that.itemList[n].programVos != '[]') {
					that.formData.dynamicInfo.programInfos = []
					that.formData.dynamicInfoDto.programInfos = []
					for (let i = 0; i < that.itemList[n].programVos.length; i++) {
						console.log(that.itemList[n].programVos.length)
						that.formData.dynamicInfo["programInfos"].push({
							programCode: that.itemList[n].programVos[i].code,
							qual: that.itemList[n].programVos[i].qual,
							dp: that.itemList[n].programVos[i].dp
						})
					}
				}
				// 要求infoDto跟随info
				that.formData.dynamicInfoDto = that.formData.dynamicInfo
				that.$refs[formName].validate((valid) => {
					if (valid) {
						// 如果验证通过，即提交
						// 						console.log('sub')
						// 						console.log(that.formData.dynamicInfoDto)
						axios.post(URL.api_name + 'cloud/add_project', that.formData).then((res) => {
							that.isLoading = false

							if (res.data.code === '100') {
								that.$message({
									message: res.data.message,
									type: 'success',
									onClose: function() {}
								})
								console.log(that.pager + 'wewww')
								that.$router.push({
									path: '/service/' + that.pager
								})
							} else {
								that.$message({
									message: res.data.message,
									type: 'error'
								})
							}
						})
						// that.isLoading = false
					} else {
						// 验证失败...
						console.log('error submit!!')
						return false
					}
				})

			},
			beforeUpload(file, code) {
				let that = this
				if (that.formData[code].length > 0) {
					that.$message({
						type: 'error',
						message: '最多上传一个vcf文件',
						duration: 1000
					})
					return false
				}
				// this.isLoading = true
			},
			getFromValue() {
				// 3、获得默认值
				let that = this
				axios.get(URL.api_name + 'cloud/get_dynamic', {
					params: {
						// code: '643bbba3118b4f78a6ef74fd4155e51f'
						projectCode: that.$route.params.productCode
					}
				}).then(function(res) {
					if (res.data.code === '100') {
						// let datas = JSON.parse(res.data.data.data)
						that.formData.dynamicInfo = res.data.data.data
						if (that.formData.dynamicInfo.batchNumber !== '') {
							// 批次号解除
							that.canNext = true
						}
						that.fileUrl = res.data.data.programFiles
						for (let n = 0; n < res.data.data.programFiles.length; n++) {
							that.fileList.push({
								name: res.data.data.programFiles[n].fileName,
								url: res.data.data.programFiles[n].fileUrl,
							})
							// 默认先一遍赋值
							let codeMin = res.data.data.programFiles[n].programCode
							that.formData[codeMin].push({

								file_name: res.data.data.programFiles[n].fileName,
								file_path: res.data.data.programFiles[n].filePath,
								file_url: res.data.data.programFiles[n].fileUrl,
								file_size: res.data.data.programFiles[n].fileSize,
								program_code: res.data.data.programFiles[n].programCode,

							})
						}
						let n = that.itemList.length - 1
						let chache = []
						// 						for (let num = 0; num < that.formData.dynamicInfo.programInfos.length; num++) {
						// 						  that.itemList[n].programVos[num].dp = that.formData.dynamicInfo.programInfos[num].dp,
						// 						  that.itemList[n].programVos[num].qual = that.formData.dynamicInfo.programInfos[num].qual,
						// 						  that.itemList[n].programVos[num].programCode = that.formData.dynamicInfo.programInfos[num].programCode
						// 						}
						for (let num = 0; num < that.formData.dynamicInfo.length; num++) {
							that.itemList[n].programVos[num].dp = that.formData.dynamicInfo[num].dp,
								that.itemList[n].programVos[num].qual = that.formData.dynamicInfo[num].qual,
								that.itemList[n].programVos[num].programCode = that.formData.dynamicInfo[num].programCode
						}
					}
					// console.log(that.itemList)
				}, function(error) {
					// alert(1)
					console.log(error)
					that.$message({
						type: 'error',
						message: '查询失败11',
						duration: 1000
					})
				})
			},

			handleSuccess(response, file, fileList, code) {
				let that = this
				this.fileList = fileList
				let jsonData = response.data
				if (response.code === '100') {
					if (that.$route.params.productCode == '19' || this.$route.params.productCode == '444') {
						console.log(JSON.parse(response.data))
						that.formData.dynamicInfo = JSON.parse(response.data)
						that.formData.dynamicInfoDto = JSON.parse(response.data)
						that.isshowPdf = true
						// console.log()
						that.pdfUrl = URL.api_name + 'cloud/project/viewProgramDiagramFile?fileUrl=' + that.formData.dynamicInfo.fileDownUrl +
							'&token=' + that.uploadHeader.token
						// that.pdfUrl = 'http://192.168.13.64:9999/cloud/project/viewProgramDiagramFile?fileUrl=http://192.168.13.64:39090/file/download/gene_cloud/15570215589227095.pdf&token=15570215477741923'
						console.log(that.pdfUrl)
					} else {
						that.formData[code].push({
							file_name: response.data.fileName,
							file_path: response.data.filePath,
							file_size: response.data.fileSize,
							file_url: response.data.fileDownUrl,
							program_code: code,
						})
					}
				} else {
					this.fileList = []
				}
				that.isLoading = false
			},
			stepNext() {
				this.activeCheck++
			},
			stepPrev() {
				this.activeCheck--
			},
			handleRemovee(file, fileList) {
				// 删除
				//         console.log(file.code);
				// //        if(file.code=== undefined){
				// //            return;
				// //        }
				//         if (file.code != '') {
				//           this.goDelFile(file.code)
				//         }
			},
			getDrugList() {
				let that = this
				axios.get(URL.api_name + 'report/getDrugControlList', {
						params: {
							projectCode: that.id,
							pageSize: 9999,
							pageNumber: 1
						}
					}).then(function(respose) {
						if (respose.data.code === '100') {
							that.drugTypeList = respose.data.data.list
							for (let i = 0; i < that.drugTypeList.length; i++) {
								that.drugTypeList[i].id = that.drugTypeList[i].id + ''
								// let n = that.drugTypeList[i].drugName === "" ? '' : '-[' + that.drugTypeList[i].drugName + ']'
								// that.drugTypeList[i]['drugNameZ'] = that.drugTypeList[i].drugEnName + n
							}
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
			handleBefore(file) {
				// 上传之前不需要上传，就没这个
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.ImgVisible = true;
				this.rotateNum = 0,
					this.imgW = "30%"
			},
			handleRemove(file, fileList, code) {
				this.fileList = fileList
				let that = this
				if (this.fileList.length > 0) {} else {
					that.formData[code] = []
				}
			},
			objDataRemove(partName, index) {
				let that = this
				// 删除一格
				// part.infos.splice(index, 1)
				// alert(partName + '-=-' + index)
				if (that.formData.dynamicInfo[partName].length > 1) {
					that.formData.dynamicInfo[partName].splice(index, 1)
				} else {
					that.$message({
						type: 'error',
						message: '只剩一条啦，再删没有啦',
						duration: 1000
					})
				}
			},
			objDataAdd(partName) {
				let that = this
				let xx = {}
				for (let n in that.formData.dynamicInfoDto[partName][0]) {
					xx[n] = ''
					// xx.push(that.formData.dynamicInfoDto[partName][n]: '')
				}
				that.formData.dynamicInfo[partName].push(xx)
			},
			geneMsiChange() {
				let that = this
				// 根据阳性、阴性的个数，判断Msi的值
				let flag = 0
				let obj = that.formData.dynamicInfo.gene_msi[0]
				// console.log(that.formData.dynamicInfo.gene_msi[0].results[0])
				for (var key in obj.results[0]) {
					if (obj.results[0][key] === '阳性') {
						flag++
					}
				}
				if (flag >= 2) {
					that.formData.dynamicInfo.gene_msi[0].msi = 'MSI-H'
				} else if (flag == 1) {
					that.formData.dynamicInfo.gene_msi[0].msi = 'MSI-L'
				} else {
					that.formData.dynamicInfo.gene_msi[0].msi = 'MSS'
				}
				flag = 0
			},
			geneMmrChange() {
				let that = this
				// 根据阳性、阴性的个数，判断Mmr的值
				let flag = 0
				let obj = that.formData.dynamicInfo.gene_mmr[0]
				// console.log(that.formData.dynamicInfo.gene_msi[0].results[1])
				for (var key in obj.results[0]) {
					if (obj.results[0][key] === '阳性') {
						flag++
					}
				}
				if (flag >= 1) {
					that.formData.dynamicInfo.gene_mmr[0].mmr = 'dMMR'
				} else {
					that.formData.dynamicInfo.gene_mmr[0].mmr = 'pMMR'
				}
				flag = 0
			},
			showDialog(name, partName, modeName, label) {
				let that = this
				// 批量赋值(基因扩增和融合)
				if (label !== undefined) {
					that.modeNames = label.substring(2, 4)
				}
				// pvalue： 初始化 "批量阴性" "批量阳性""
				that.plvalue = ''
				that.modeName = modeName
				that.inputName = partName
				that.dialogVisible = true
				axios.get(URL.api_name + 'cloud/project/importGene', {
					params: {
						type: modeName,
						productCode: that.productCode
					}
				}).then((res) => {
					if (res.data.code === '100') {
						that.geneArray = res.data.data
						that.checkGroup = res.data.data
						that.isIndeterminate = false
						that.checkAll = true
					} else {
						that.$message({
							message: res.data.message,
							type: 'error'
						})
					}
				})
			},
			handleCheckAllChange(val) {
				let that = this
				this.checkGroup = val ? that.geneArray : []
				this.isIndeterminate = false
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length
				let that = this
				that.checkAll = (checkedCount === that.geneArray.length)
				that.isIndeterminate = (checkedCount > 0 && checkedCount < that.geneArray.length)
			},
			visibleChange(val, keyName) {
				let that = this
				if (val) {
					// 打开
					if (that.isSelectFirst == true) {
						that.selectLoading = true
						that.isSelectFirst = false
						that.getDrugList()
					}
				}
			},
			objDataAddArray(partName) {
				let that = this
				// 如果添加的数量为0，无反应
				if (that.checkGroup.length < 1) {
					return false
				}
				// 导入内容
				for (let i = 0; i < that.checkGroup.length; i++) {
					let xx = {}
					for (let n in that.formData.dynamicInfoDto[partName][0]) {
						xx[n] = n === 'gene' ? that.checkGroup[i] : ''
						if (partName === 'gene_copy') {
							xx['variantType'] = '拷贝数正常'
						}
					}
					if (partName !== 'gene_copy') {
						// 基因拷贝数变异，没有批量，所以不填
						xx[that.modeName] = that.plvalue === '' ? '' : that.modeNames + that.plvalue
					}
					that.formData.dynamicInfoDto[partName].push(xx)
				}
				// console.log(that.formData.dynamicInfoDto[partName])
				that.dialogVisible = false
				// 检查当前被添加的表里有没有空行，有就删除掉空行
				// for (let s = 0; s < that.formData.dynamicInfoDto[partName].length; s++) {
				//   let isNull = 0
				//   let allObj = 0
				//   for (let n in that.formData.dynamicInfoDto[partName][s]) {
				//     allObj++
				//     that.formData.dynamicInfoDto[partName][s][n] === '' ? isNull++ : isNull
				//   }
				//   // console.log(isNull)
				//   // console.log(allObj)
				//   if (isNull === allObj) {
				//     that.formData.dynamicInfoDto[partName].splice(s, 1)
				//     that.formData.dynamicInfo[partName].splice(s, 1)
				//   }
				// }
			},
			dateFormat(row, column) {
				let date = row[column.property]
				if (date === undefined) {
					return ''
				}
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			showreportList(num) {
				// 查看报告列表
				let that = this
				if (num !== undefined) {
					that.getSelectFrom.currentPage = num
				}
				that.getSelectOrderDialog = true
				axios.get(URL.api_name + 'cloud/project/orderPage', {
					params: {
						pageSize: that.getSelectFrom.currentPage,
						pageNumber: that.getSelectFrom.pageSize,
						orderNo: that.getSelectFrom.orderNo,
						userName: that.getSelectFrom.name
					}
				}).then(function(respose) {
					if (respose.data.code === '100' && JSON.parse(respose.data.data).data) {
						that.orderData = JSON.parse(respose.data.data)
						if (JSON.parse(respose.data.data).data) {
							that.getSelectFrom.total = that.orderData.data.totalElements
						}
						// console.log(that.orderData.data.totalElements)
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
			autocompleteList(queryString, cb, objName, tagName) {
				let that = this
				// businessName
				var businessNameList = that.cacheData[objName]
				var results = queryString ? businessNameList.filter(this.autocompleteFilter(queryString)) : businessNameList
				cb(results)
			},
			autocompleteFilter(queryString) {
				return (restaurant) => {
					return (restaurant.businessName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
				}
			},
			autocompleteSelect(item, obj) {
				console.log(item)
				let that = this
				that.formData.dynamicInfo[obj] = item.businessName
			},
			import_before(file) {
				let that = this
				// alert('before_success')
				that.uploading = true
				// that.import_fileList = []
			},
			import_success(response, file, fileList) {
				// 导入成功，拿返回的数据去填充
				let that = this
				// alert('impirt_success')
				// console.log(response)
				that.uploading = false
				for (let q in response.data) {
					console.log(q)
					if (response.data[q].length > 0) {
						that.formData.dynamicInfoDto[q] = response.data[q]
						response.data[q] = []
						for (let w in response.data[q]) {
							that.formData.dynamicInfoDto[q][w] = response.data[q][w]
						}
					}
				}
			},
			import_Excel_success(response, file, fileList, item) {
				// 导入成功，拿返回的数据去填充
				let that = this
				that.uploading = false
				for (let q in response.data) {
					if (response.data.length > 0) {
						that.formData.dynamicInfo[item] = JSON.parse(JSON.stringify(response.data))
					}
				}
			},
			changeTubian(index) {
				// 自动改变肿瘤负荷模块的值
				let that = this
				let n = ''
				let num = parseInt(that.formData.dynamicInfoDto.gene_tumor_burden[index].mutationalLoad)
				if (num >= 20) {
					n = '高负荷'
				} else if (num <= 5) {
					n = '低负荷'
				} else if (num >= 6 && num <= 19) {
					n = '中等负荷'
				}
				that.formData.dynamicInfoDto.gene_tumor_burden[index].degree = n
			},
			uperror(err, file, fileList) {
				let that = this
				that.$message({
					type: 'error',
					message: '上传失败',
					duration: 1000
				})
				that.uploading = false
			},
			isValueNull(val) {
				let that = this
				// if (val === '') {
				// 	// 不选不给下一步 md
				// 	that.canNext = false
				// } else {
				// 	that.canNext = true
				// }
			},
			leftRotate() {
				// 最大为3
				let that = this
				if (that.rotateNum == 0) {
					that.rotateNum = 3
				} else {
					that.rotateNum = that.rotateNum - 1
				}
			},
			rightRotate() {
				// 最大为3
				let that = this
				if (that.rotateNum == 3) {
					that.rotateNum = 0
				} else {
					that.rotateNum += 1
				}
			},
			addWidth() {
				//
				let that = this
				let w = parseInt(that.imgW.split('%')[0])
				if (w != 100) {
					that.imgW = w + 10 + '%'
				}
			},
			removeWidth() {
				//
				let that = this
				let w = parseInt(that.imgW.split('%')[0])
				if (w != 30) {
					that.imgW = w - 10 + '%'
				}
			},
			checkListItem(item) {
				// 点击订单查询里的选择
				let that = this
				// console.log(item)
				// return false
				if (item.attachmentsPath != "") {
					// 判断是否有图片
					let url = JSON.parse(item.attachmentsPath)
					if (url.length > 0) {
						that.fileListe = []
						for (let i = 0; i < url.length; i++) {
							that.fileListe.push({
								url: URL.api_name + 'cloud/project/downloadOrderFile?fileDownUrl=' + url[i].filePath + '&token=' + that.uploadHeader
									.token,
								name: ''
							})
						}
					}
				}

				that.formData.dynamicInfo['sourceOrderNo'] = item.id
				that.formData.dynamicInfoDto['sourceOrderNo'] = item.id
				that.formData.dynamicInfoDto['userName'] = JSON.parse(item.applyInfoJson).applyName
				that.formData.dynamicInfoDto['gender'] = JSON.parse(item.applyInfoJson).applySex == 'man' ? 1 : 2
				that.formData.dynamicInfoDto['age'] = JSON.parse(item.applyInfoJson).applyAgeapplyAge
				that.formData.dynamicInfoDto['phone'] = JSON.parse(item.applyInfoJson).applyPhone

				// 再赋值一遍，免得出篓子
				that.formData.dynamicInfo['sourceOrderNo'] = item.id
				that.formData.dynamicInfo['sourceOrderNo'] = item.id
				that.formData.dynamicInfo['userName'] = JSON.parse(item.applyInfoJson).applyName
				that.formData.dynamicInfo['gender'] = JSON.parse(item.applyInfoJson).applySex == 'man' ? 1 : 2
				that.formData.dynamicInfo['age'] = JSON.parse(item.applyInfoJson).applyAge
				that.formData.dynamicInfo['phone'] = JSON.parse(item.applyInfoJson).applyPhone
				that.getSelectOrderDialog = false
			},
			changePdfPage (val) {
		        // console.log(val)
		        if (val === 0 && this.pdfCurrent > 1) {
		          this.pdfCurrent--
		          // console.log(this.pdfCurrent)
		        }
		        if (val === 1 && this.pdfCurrent < this.pageCount) {
		          this.pdfCurrent++
		          // console.log(this.pdfCurrent)
		        }
		      },
		     // pdf加载时
		     loadPdfHandler (e) {
		        this.pdfCurrent = 1 // 加载的时候先加载第一页
		     }
		},
		computed: {
			uploadHeader() {
				return {
					token: JSON.parse(localStorage.getItem('authtoken'))
				}
			}
		},
		components: {
			Pager: Pager,
			pdf
		}
	}
</script>
<style lang="less" scoped>
	.el-table--border th {
		padding: 2px
	}

	.position_absolute {
		position: absolute;
		top: 0px;
		right: 0px;
	}

	.squerItmes .squerItmes_h2 {
		font-size: 15px;
		color: #444;
		text-align: left;
	}

	.like_elTable {
		border-top: 1px solid #e6ebf5;
		border-left: 1px solid #e6ebf5;
		width: 100%;
		color: #878d99;
	}

	.like_elTable tr td,
	.like_elTable tr th {
		border-bottom: 1px solid #e6ebf5;
		border-right: 1px solid #e6ebf5;
		padding: 0 10px;
	}

	.el-checkbox {
		margin-right: 20px;
	}

	.setWidth {
		width: 120px;
		margin-left: 10px;
		margin-bottom: 10px;
	}

	.backBtn {
		float: right;
		margin-top: -21px;

	}

	.details_left {
		width: 35%;
		display: inline-block;
		vertical-align: top;
		margin-right: 40px;

		// border: 1px solid #eee;
		.title_h4 {
			border-left: 3px solid #3A7BFF;
			padding-left: 10px;
			color: #4A4A4A;
			font-size: 12px;
		}

		.imgs {
			width: 100%;
			margin-top: 20px;
			border: 1px solid #eee;
		}
	}

	.project_right {
		width: 63%;
		height:100%;
		overflow: auto;
		background:#fff;
		display: inline-block;
		.title_h4 {
			border-left: 3px solid #3A7BFF;
			padding-left: 10px;
			color: #4A4A4A;
			font-size: 14px;
		}

		.el-steps {
			width: 90%;
			margin: 20px 0px 40px 0px;

			.el-step__title {
				font-size: 15px;
			}
		}
		.table-data .el-col{
			padding-left: 0px;
		}
		.el-col-20 {
			width: 89%;
		}

		.table-data {
			margin: 0 auto;
			padding-bottom: 40px;
			border: 1px solid #eee;
		}

	}

	.el-input__inner {
		height: 36px !important;
		line-height: 35px;
	}

	.el-upload__tip {
		display: initial;
		margin-left: 10px;
	}

	.itemere_text {
		border: 1px solid;
		padding-left: 10px;
	}

	.el-upload-list__item:first-child {
		margin-top: 10px;
		width: 220px;
		text-align: left;
	}

	.lists {
		background-color: #fff;
		height: 100%;
		overflow: auto;
	}

	.el-table__body-wrapper {
		border: 1px solid #eee !important;

	}

	.el-form {
		margin: 20px 0 0 0 !important;
	}

	.el-form-item__content {
		// margin-left: 60px !important;
	}

	.el-select .el-input .el-select__caret {
		font-size: 14px !important;
	}

	.squerItmes {
		font-weight: 400;
		color: #5a5e66;
	}
</style>
<style>
	.squerItmes .el-form-item th {
		padding: 0px;
		background-color: #D0E6FF;
	}

	.xeeeee .el-dialog {
		margin-top: 5vh !important;
	}

	.noup .el-upload.el-upload--picture-card {
		display: none;
	}
</style>
