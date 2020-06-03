<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>解读报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabCard">
      <a @click="tabShow = 0" :class="{'active':tabShow === 0 , 'no':tabShow === 1}">Analysis result</a>
      <a @click="tabShow = 1" :class="{'active':tabShow === 1 , 'no':tabShow === 0}">Therapeutic summary</a>
    </div>
    <div class="clearT" style="overflow:hidden">
      <div class="table-message" v-if="tabShow === 1">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
          <el-form-item label="Summary：" >
            <el-col :span="12">
              <el-form-item prop="description">
               <el-input type="textarea" v-model="formData.description" :rows="8" placeholder="Summary contents"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="　">
            <el-button type="primary" :loading="isLoading" @click="subSummary('formData')">
              {{ isLoading ? 'subLoading...' : 'Sub' }}
            </el-button>
          </el-form-item>
        </el-form>
        
        <!-- <div class="table-data"
         v-loading="false"
         element-loading-text="拼命加载中" style="margin:40px 20px 0 0; padding-top:40px; border-top:solid 1px #ddd">
          <el-table empty-text="No evidence available" :data="tableData" border style="">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="description" label="历史记录">
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="sumCurrent" :pageSize="sumPagesize" :total-count="sumtotal" v-on:handleCurrentChange="getsummary_msg"></pager> -->
      </div>
      <!--报告-->
      <div class="table-data reportsStyle" element-loading-text="拼命加载中" style="" v-if="tabShow === 0">
        <!--report_begin-->
        <div class="reportAll" style="margin:0 auto; width:960px; width:80%;">
          <div class="headers">
            <span style="display: inline-block; width: 70%;">{{reportData.name}}</span>
            <div style="display: inline-block; width: 29%;">
              <p>Bainuo Gene Clound</p>
              <p>201 Room, East Seat,Yuanxing Science and Technology Building, No.1 Songpingshan Road, Beihuan Av., Nanshan District, Shenzhen, China</p>
              <p>Ph: +86-755 33372933 | Fax: +86-755 33372933</p><a href="mailto:contact@bainuo.cn" style="text-decoration: underline;">contact@bainuo.cn</a>　<a href="www.bainuo.cn" style="text-decoration: underline;">www.bainuo.cn</a> </p>
            </div>
          </div>
          <div class="tip">
            <span style="display: inline-block; width: 50%;">
              Subject ID：
              <!-- <el-input type="text" class="underline" v-model="reportData.projectCode" placeholder="Subject ID" readonly style="width:calc(100% - 20em)"></el-input> -->
              <span style="display: inline-block; width: 45%;">
                {{reportData.projectCode}}
              </span>
            </span>
            <span style="display: inline-block; width: 45%; text-align: right">
              Date of Report：{{reportData.createTime | formatDate}}
              <!-- <el-input type="text" class="underline" v-model="reportData.createTime" placeholder="Subject ID" readonly style="width:calc(100% - 20em)"></el-input> -->
              <!-- <el-date-picker
                v-model="reportData.createTime"
                format="dd/MM/yyyy"
                :editable='false'
                type="date"
                class="underline"
                placeholder="选择日期"
                style="width:calc(100% - 20em)">
              </el-date-picker> -->
              <!-- (dd/mm/yyyy) -->
            </span>
          </div>

          <!--report_lists-->  
          <div class="cont-items">
            <div class="table-title" style="background-color: #003366;">
              <h2>INFORMATION</h2>
            </div>
            <div class="part50">
              <h3>{{ reportData.blocks.block_01.blockName }}</h3>
              <table>
                <tr>
                  <td>Name：<el-input type="text" @blur="inputSub('block_01', '0', 'user_name', reportData.blocks.block_01.infos.user_name)" class="underline" v-model="reportData.blocks.block_01.infos.user_name" placeholder="Name" style="width:calc(100% - 11em)"></el-input></td>
                </tr>
                <tr>
                  <td>Gender：
                    <el-radio disabled class="radio" v-model="reportData.blocks.block_01.infos.gender" :label='1'>男</el-radio>
                    <el-radio disabled class="radio" v-model="reportData.blocks.block_01.infos.gender" :label='2'>女</el-radio>
                  </td>
                </tr>
                <tr>
                  <td>Date of Birth：
                  <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(100% - 15em);line-height:2; color:#bbb;">
                    {{reportData.blocks.block_01.infos.birthday | formatDate}}
                  </span>
                  <!-- <el-input type="text" @blur="inputSub('block_01', '0', 'birthday', reportData.blocks.block_01.infos.birthday)" class="underline" v-model="reportData.blocks.block_01.infos.birthday" placeholder="Date of Birth" style="width:calc(100% - 14em)"></el-input> -->
                  </td>
                </tr>
                <tr>
                  <td>Race：
                    <el-select v-model="reportData.blocks.block_01.infos.race" disabled style="width:calc(100% - 10em)">
                      <el-option
                      v-for="item in races"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>Nation：<el-input type="text" @blur="inputSub('block_01', '0', 'user_name', reportData.blocks.block_01.infos.user_name)" class="underline" v-model="reportData.blocks.block_01.infos.user_name" placeholder="Nation" style="width:calc(100% - 11em)"></el-input></td>
                </tr>
                <tr>
                  <td>Phone：<el-input type="text" @blur="inputSub('block_01', '0', 'user_name', reportData.blocks.block_01.infos.user_name)" class="underline" v-model="reportData.blocks.block_01.infos.user_name" placeholder="Phone" style="width:calc(100% - 11em)"></el-input></td>
                </tr>
                <tr>
                  <td>Location：<el-input type="text" @blur="inputSub('block_01', '0', 'user_name', reportData.blocks.block_01.infos.address)" class="underline" v-model="reportData.blocks.block_01.infos.address" placeholder="Location" style="width:calc(100% - 12em)"></el-input></td>
                </tr>
              </table>
            </div>
            <div class="part50">
              <h3>{{reportData.blocks.block_02.blockName}}</h3>
              <table>
                <tr>
                  <td>Clinical Diagnosis：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'clinical_diagnosis', reportData.blocks.block_02.infos.clinical_diagnosis)" class="underline" v-model="reportData.blocks.block_02.infos.clinical_diagnosis" placeholder="" style="width:calc(100% - 13em); vertical-align:top"></el-input></td>
                </tr>
                <tr>
                  <td>Pathology Diagnosis：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'pathology_diagnosis', reportData.blocks.block_02.infos.pathology_diagnosis)" class="underline" v-model="reportData.blocks.block_02.infos.pathology_diagnosis" placeholder="" style="width:calc(100% - 14.5em); vertical-align:top"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>History of present disease：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'recent_medical_history', reportData.blocks.block_02.infos.recent_medical_history)" class="underline" v-model="reportData.blocks.block_02.infos.recent_medical_history" placeholder="" style="width:calc(100% - 12.5em); vertical-align:top"></el-input></td>
                </tr>
                <tr>
                  <td>Previous History：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'previous_history', reportData.blocks.block_02.infos.previous_history)" class="underline" v-model="reportData.blocks.block_02.infos.previous_history" placeholder="" style="width:calc(100% - 17em); vertical-align:top"></el-input></td>
                </tr>
                <tr>
                  <td>Family History：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'family_medical_history', reportData.blocks.block_02.infos.family_medical_history)" class="underline" v-model="reportData.blocks.block_02.infos.family_medical_history" placeholder="" style="width:calc(100% - 11.2em); vertical-align:top"></el-input></td>
                </tr>
                <tr>
                  <td>Risk Factors：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'disease_risk_factory', reportData.blocks.block_02.infos.disease_risk_factory)" class="underline" v-model="reportData.blocks.block_02.infos.disease_risk_factory" placeholder="" style="width:calc(100% - 10em); vertical-align:top"></el-input></td>
                </tr>
                <tr>
                  <td>Previous History of drug：<el-input type="textarea" autosize @blur="inputSub('block_02', '0', 'before_medical_history', reportData.blocks.block_02.infos.before_medical_history)" class="underline" v-model="reportData.blocks.block_02.infos.before_medical_history" placeholder="" style="width:calc(100% - 16em)"></el-input></td>
                </tr>
              </table>
            </div>
            <div>
              <h3>{{reportData.blocks.block_03.blockName}}</h3>
              <ul class="inlineItem">
                <li style="width:33%">Specimen ID：<el-input type="text" @blur="inputSub('block_03', '0', 'sample_id', reportData.blocks.block_03.infos.sample_id)" class="underline" v-model="reportData.blocks.block_03.infos.sample_id" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
                <li style="width:33%">Specimen Type：<el-input type="text" @blur="inputSub('block_03', '0', 'sample_type', reportData.blocks.block_03.infos.sample_type)" class="underline" v-model="reportData.blocks.block_03.infos.sample_type" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
                <li style="width:33%">Specimen Attribute：<el-input type="text" @blur="inputSub('block_03', '0', 'sample_attribute', reportData.blocks.block_03.infos.sample_attribute)" class="underline" v-model="reportData.blocks.block_03.infos.sample_attribute" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
                <li style="width:49%">Date Specimen Received：
                  <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(100% - 22em); line-height:2;">
                    {{reportData.blocks.block_03.infos.sample_collection_time | formatDate}}
                  </span>
                  <!-- <el-date-picker
                    v-model="reportData.blocks.block_03.infos.sample_collection_time"
                    format="yyyy-MM-dd hh:mm:ss"
                    :editable='false'
                    type="date"
                    class="underline"
                    placeholder="选择日期"
                    style="width:calc(100% - 20em)">
                  </el-date-picker> -->
                </li>
                <li style="width:49%">Date Reported：
                  <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(100% - 22em);line-height:2;">
                    {{reportData.blocks.block_03.infos.sample_testing_time | formatDate}}
                  </span>
                  <!-- <el-date-picker
                    v-model="reportData.blocks.block_03.infos.sample_testing_time"
                    format="yyyy-MM-dd hh:mm:ss"
                    :editable='false'
                    type="date"
                    class="underline"
                    placeholder="选择日期"
                    style="width:calc(100% - 20em)">
                  </el-date-picker> -->
                </li>
              </ul>
            </div>
          </div>
          
          <!--TEST PLATFORM INFORMATION AND ANALYSIS REFERENECE CATEGORY-->
          <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_04.blockName }}</h2>
            </div>
            <div class="table-cont">
              <table>
                <tr>
                  <td width="35%">Detection information</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'sequencing_information', reportData.blocks.block_04.infos.sequencing_information)" v-model="reportData.blocks.block_04.infos.sequencing_information"></el-input></td>
                </tr>
                <tr>
                  <td>Sequencing platform</td>
                  <td>
                    <!-- <el-input type="text" @blur="inputSub('block_04', '0', 'sequencing_platform', reportData.blocks.block_04.infos.sequencing_platform)" v-model="reportData.blocks.block_04.infos.sequencing_platform"></el-input> -->
                    <el-select  v-model="reportData.blocks.block_04.infos.sequencing_platform" style="width:100%" clearable placeholder="select please" @change="inputSub('block_04', '0', 'sequencing_platform', reportData.blocks.block_04.infos.sequencing_platform)">
                      <el-option v-for="item in reportData.blocks.block_04.infos.sequencing_platform_init" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>Number of detected genes</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'test_gene_num', reportData.blocks.block_04.infos.test_gene_num)" v-model="reportData.blocks.block_04.infos.test_gene_num" ></el-input></td>
                </tr>
                <tr>
                  <td>Gene list</td>
                  <td style="padding:5px 25px;">
                    <!-- <el-input type="textarea" autosize  @blur="inputSub('block_04', '0', 'genes', reportData.blocks.block_04.infos.genes)" v-model="reportData.blocks.block_04.infos.genes"></el-input> -->
                    <!-- <p style="word-break: break-all; font-size:12px;padding:5px 10px">{{ geneList }}</p> -->
                    <!-- <el-input type="textarea" autosize readonly v-model="geneList"></el-input> -->
                    <span style="font-size:12px;" :class="{'':i.checkOut === false, 'color-red':i.checkOut === true}" v-for="(i, index) in geneList">{{ i.value }}，</span>
                  </td>
                </tr>
                <tr>
                  <td>Reference genome</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'ref', reportData.blocks.block_04.infos.ref)" v-model="reportData.blocks.block_04.infos.ref"></el-input></td>
                </tr>
                <tr>
                  <td>Knowledge Base</td>
                  <td>
                    <!-- <el-input type="text" @blur="inputSub('block_04', '0', 'analysis_version', reportData.blocks.block_04.infos.analysis_version)" v-model="reportData.blocks.block_04.infos.analysis_version"></el-input> -->
                    <el-select  v-model="reportData.blocks.block_04.infos.analysis_version" style="width:100%" clearable placeholder="请选择" @change="inputSub('block_04', '0', 'analysis_version', reportData.blocks.block_04.infos.analysis_version)">
                      <el-option v-for="item in reportData.blocks.block_04.infos.analysis_version_init" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>Analyze Process</td>
                  <td>
                  <!-- <el-input type="text" @blur="inputSub('block_04', '0', 'analysis_version', reportData.blocks.block_04.infos.analysis_version)" v-model="reportData.blocks.block_04.infos.analysis_version"></el-input> -->
                  <el-input type="text" readonly value="Bainuo_ OncoAnalyzer_exon_ Version 0.5"></el-input>
                  </td>
                </tr>
              </table>
            </div>
            <p>* The positive result is red and the negative result is black for all of the gene in the list.</p>
          </div>

          <!--TEST RESULTS-->
          <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_06.blockName }}</h2>
            </div>
            
            <p style="margin:20px 0 10px 0;">*The figures in table of different types of variation are the statistical numbers of the corresponding drugs in different source of evidence-based medical(EBM) evidences.</p>
            <!--block_06 基因突变-->
            <h4 style="margin-top:10px;">Mutations</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_06', 'none')">+Add</a></div>
              <el-table empty-text="No evidence available" :data="reportData.blocks.block_06.infos" class="table-center">
                <el-table-column label="Tested mutations" width="90">
                  <el-table-column label="Gene">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_06', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Mutation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_06', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="RefSeq">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_06', scope.row.code, 'refSeq', scope.row.refSeq)" v-model="scope.row.refSeq"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="ClinicalSignificance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_06', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_06', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="option" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_06, 'block_06', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>


            <!--block_07 基因融合-->
            <h4 style="margin-top:10px;">Gene Fusion</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_07', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_07.infos" class="table-center">
                <el-table-column label="Status of Tested Gene Fusion">
                  <el-table-column label="gene" width="90">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_07', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Fusion">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_07', scope.row.code, 'fusion', scope.row.fusion)" v-model="scope.row.fusion"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Fusion Type">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_07', scope.row.code, 'fusionType', scope.row.fusionType)" v-model="scope.row.fusionType"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Significance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_07', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_07', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_07, 'block_07', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
    
            
            <!--block_08 基因（mRNA/蛋白）表达-->
            <h4 style="margin-top:10px;">Genes (mRNA/Protein) Expression</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_08', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_08.infos" class="table-center">
                <el-table-column label="Status of Tested Gene Fusion">
                  <el-table-column label="gene" width="90">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_08', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="mRNA/蛋白表达">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_08', scope.row.code, 'expression', scope.row.expression)" v-model="scope.row.expression"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="表达水平">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_08', scope.row.code, 'expressionLevel', scope.row.expressionLevel)" v-model="scope.row.expressionLevel"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Significance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_08', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_08', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_08, 'block_08', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>


            <!--block_09 基因扩增-->
            <h4 style="margin-top:10px;">Gene Amplification</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_09', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_09.infos" class="table-center">
                <el-table-column label="Status of Tested Gene Fusion">
                  <el-table-column label="gene" width="90">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_09', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Fusion">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_09', scope.row.code, 'amplification', scope.row.amplification)" v-model="scope.row.amplification"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Significance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_09', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_09', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_09, 'block_09', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>


            <!--block_10 基因拷贝数变异-->
            <h4 style="margin-top:10px;">Copy Number Variations (CNV)</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_10', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_10.infos" class="table-center">
                <el-table-column label="Status of Tested Gene Fusion">
                  <el-table-column label="gene" width="90">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_10', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Number of CNV">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_10', scope.row.code, 'copy', scope.row.copy)" v-model="scope.row.copy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Level of CNV">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_10', scope.row.code, 'copyLevel', scope.row.copyLevel)" v-model="scope.row.copyLevel"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Significance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_10', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_10', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_10, 'block_10', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            

            <!--block_11 基因微卫星不稳定性和错配修复-->
            <h4 style="margin-top:10px;">Gene Microsatellite Instability(MSI) and Mismatch Repair(MMR)</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_11', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_11.infos" class="table-center">
                <el-table-column label="Status of Tested Gene Fusion">
                  <!-- <el-table-column label="gene" width="90">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column> -->
                  <el-table-column label="MSI">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'msi', scope.row.msi)" v-model="scope.row.msi"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="MMR">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'mmr', scope.row.mmr)" v-model="scope.row.mmr"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Significance">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="The number of drugs">
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="number" @blur="inputSub('block_11', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_11, 'block_11', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>

            <!--block_24 肿瘤负荷-->
            <h4 style="margin-top:10px;">Tumor burden</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_24', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_24.infos" class="table-center">
                <el-table-column label="Test terms">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_24', scope.row.code, 'checkItem', scope.row.checkItem)" v-model="scope.row.checkItem"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="Tumor burden（/Mb）">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_24', scope.row.code, 'judgeStand', scope.row.judgeStand)" v-model="scope.row.judgeStand"></el-input>
                  </template>
                </el-table-column>
                <el-table-columnlabel="Judgement standard">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_24', scope.row.code, 'mutationalLoad', scope.row.mutationalLoad)" v-model="scope.row.mutationalLoad"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_24, 'block_24', scope.$index)">Del</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!--block_25 HLA基因-->
            <h4 style="margin-top:10px;">HLAGene</h4>
            <div class="table-cont" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_25', 'none')">+Add</a></div>
              <el-table :data="reportData.blocks.block_25.infos" class="table-center">
                <el-table-column label="HLA">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_25', scope.row.code, 'hla', scope.row.hla)" v-model="scope.row.hla"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="　">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_25', scope.row.code, 'hla1', scope.row.hla1)" v-model="scope.row.hla1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="Allele 1">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_25', scope.row.code, 'alleleOne', scope.row.alleleOne)" v-model="scope.row.alleleOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="Allele 2">
                  <template slot-scope="scope">
                    <el-input type="textarea" autosize  @blur="inputSub('block_25', scope.row.code, 'alleleTwo', scope.row.alleleTwo)" v-model="scope.row.alleleTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="option" width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_25, 'block_25', scope.$index)">Del</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>


            <h5 style="padding: 10px 0;">
              <span style="width:50%; display: inline-block;">Laboratory director: Yan Ding, MD, Ph.D.</span>
              <span style="width:48%; text-align:right; display: inline-block;">CLIA number: 05D1067108</span>
            </h5>
            <p>
              <small style="color:#666;">
                Bainuo Gene Tests are intended for clinical use. They were developed and their performance characteristics determined by the Bainuo Gene, which is certified under the Clinical Laboratory Improvement Amendments of 1988 (CLIA) to perform high complexity testing. The tests have not been cleared or approved by the United States Food and Drug Administration or China Food and Drug Administration; however, such clearance or approval is not currently required. ©2017 Bainuo Gene. All rights reserved. The trademarks mentioned herein are the property of Bainuo Gene and/or its affiliate(s).
              </small>
            </p>
          </div>

          
          <!--summeary of clinical-->
          <!--小结就是-->
          <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>SUMMEARY OF CLINICAL INTERPRETATION RESULTS</h2>
            </div>
            <br>
            <!-- <p>* Note: The variations detected in this report are limited to genetic mutations. Given the limits of the type of variations that can be detected, it is recommended to add some genetic testing to genes in any other variant types which are not covered by panels but the genes related drugs recommended by FDA, CFDA, NCCN guidelines, CSCO guidelines, and so on. For more details, please refer to "LIST OF GENES RECOMMENDED TO ADD SOME GENETIC TESTING".</p> -->
            <div class="table-describe">
              <!-- <h3>Recommended treatment options: </h3>
              <p>According to the genetic test results of this sample, combined with clinicopathological diagnosis, the patient may be effective in the treatment of Crizotinib. EGFR E746_A750del mutation has been detected,…</p> -->
              <!--小结不显示-->
              <!-- <p>{{ reportData.blocks.block_11.infos.summary_msg }}</p> -->
              <p>* Note: 1)The variations detected in this report are limited to genetic mutations. Given the limits of the type of variations that can be detected, it is recommended to add some genetic testing to genes in any other variant types which are not covered by panels but the genes related drugs recommended by FDA, CFDA, NCCN guidelines, CSCO guidelines, and so on. For more details, please refer to "LIST OF GENES RECOMMENDED TO ADD SOME GENETIC TESTING". 2)Most advanced phase is shown and multiple clinical trials may be available. See Open clinical trials section in the pages to follow. 3)In addition, the name of the drug in blue indicates that the drug is included in the "The National Health Insurance Directory (2017 Version)".4)All the drugs or therapies in the table shown in brackets "()" are the corresponding product names of drugs or therapies.</p>

              <!--block_13 药物治疗方案汇总-->
              <h3>Drug therapies summary</h3>
              <h4>1）{{ reportData.blocks.block_13.blockName }}</h4>
              <table>
                <tr>
                  <td><i class="icon-circle icon-size1 color-blue"></i> In this cancer type</td>
                  <td><i class="icon-circle-blank icon-size1 color-blue"></i> In other cancer type</td>
                  <td><i class="icon-adjust icon-size1 color-blue"></i> In this cancer type and other cancer types</td>
                  <td><i class="icon-ban-circle icon-size1 color-red"></i> Contraindicated</td>
                  <td><i class="icon-remove icon-size1 color-gray"></i> No evidence available</td>
                </tr>
              </table>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_13', 'none')">+Add</a></div>
                <el-table empty-text="No evidence available" class="table-center" :data="reportData.blocks.block_13.infos">
                  <el-table-column label="Gene Variation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene" @blur="inputSub('block_13', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation" @blur="inputSub('block_13', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Drug /Therapy">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_13', scope.row.code, 'drugTherapy', scope.row.drugTherapy)" v-model="scope.row.drugTherapy" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.nccnCsCo === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.nccnCsCo === 2, 'icon-adjust icon-size1 color-blue':scope.row.nccnCsCo === 3, 'icon-ban-circle icon-size1 color-red':scope.row.nccnCsCo === 4, 'icon-remove icon-size1 color-gray':scope.row.nccnCsCo === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.other === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.other === 2, 'icon-adjust icon-size1 color-blue':scope.row.other === 3, 'icon-ban-circle icon-size1 color-red':scope.row.other === 4, 'icon-remove icon-size1 color-gray':scope.row.other === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.clinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.clinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.clinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.clinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.clinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.preClinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.preClinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.preClinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.preClinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.preClinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_13', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_13', scope.row.code, 'other', '444')" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.functionPrediction === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.functionPrediction === 2, 'icon-adjust icon-size1 color-blue':scope.row.functionPrediction === 3, 'icon-ban-circle icon-size1 color-red':scope.row.functionPrediction === 4, 'icon-remove icon-size1 color-gray':scope.row.functionPrediction === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="option" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_13, 'block_13', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <p>* Most advanced phase is shown and multiple clinical trials may be available. See Open clinical trials section in the pages to follow. In addition, the name of the drug in blue indicates that the drug is included in the "The National Health Insurance Directory (2017 Version)".</p>
    
              <!--block_14 药物治疗方案详情-->
              <h4>2）{{reportData.blocks.block_14.blockName}}</h4>
              <div class="table-cont no-center" style="position:relative;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 1)">+Add</a></div>
                <table>
                  <tr>
                    <th width="140px">Gene Variation</th>
                    <th width="200px">Drug /Therapy</th>
                    <th>Clinical Evidence</th>
                    <th width="60">option</th>
                  </tr>
                </table>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060201">
                  <el-table-column label="Targeted therapy" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 1)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, 1)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, 1)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 1)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, 1)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="table-cont no-center" style="position:relative;margin-bottom: -2px;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 2)">+Add</a></div>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060202">
                  <el-table-column label="Chemotherapy" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 2)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, 2)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, 2)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 2)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, 2)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              
              <!-- <div class="table-cont no-center" style="position:relative;margin-bottom: -2px;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 3)">+Add</a></div>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060203">
                  <el-table-column label="Targeting immunotherapy" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 3)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, 3)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, 3)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 3)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, 3)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->
              
              <div class="table-cont no-center" style="position:relative;margin-bottom: -2px;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 4)">+Add</a></div>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060204">
                  <el-table-column label="Radiotherapy" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 4)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, 4)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, 4)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 4)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, 4)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- <div class="table-cont no-center" style="position:relative;margin-bottom: -2px;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 5)">+Add</a></div>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060205">
                  <el-table-column label="Cellular immunotherapy" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 5)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, scope.row.type)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, scope.row.type)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 6)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, scope.row.type)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->

              <div class="table-cont no-center" style="position:relative;margin-bottom: -2px;">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_14', 'none', 6)">+Add</a></div>
                <el-table class="table-center" :empty-text="emptyText" :data="block_060206">
                  <el-table-column label="Other" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="gene"  @blur="inputSubBlock0602('block_14', scope.row.code, 'gene', scope.row.gene, 6)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSubBlock0602('block_14', scope.row.code, 'mutation', scope.row.mutation, 6)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="190">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'drugTherapy', scope.row.drugTherapy, 6)" v-model="scope.row.drugTherapy"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSubBlock0602('block_14', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 6)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="　" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItemBlock0602(reportData.blocks.block_14, 'block_14', scope.row.code, 6)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <p>*Others: These therapies refer to the combination of different therapies or  not belong to the above categories of therapies.</p>
              
              <!-- block_26 免疫检查点抑制剂治疗方案汇总-->
              <h3>Immunotherapies summary</h3>
              <h4>1）{{ reportData.blocks.block_26.blockName }}</h4>
              <table>
                <tr>
                  <td><i class="icon-circle icon-size1 color-blue"></i>In this cancer type</td>
                  <td><i class="icon-circle-blank icon-size1 color-blue"></i>In other cancer types</td>
                  <td><i class="icon-adjust icon-size1 color-blue"></i>In this cancer type and other cancer types</td>
                  <td><i class="icon-ban-circle icon-size1 color-red"></i>Contraindicated</td>
                  <td><i class="icon-remove icon-size1 color-gray"></i>No  evidence available</td>
                  <!-- <td> (IV), (III), (II/III), (II), (I/II), (I)临床试验阶段</td> -->
                </tr>
              </table>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_26', 'none')">+Add</a></div>
                <el-table class="table-center" :data="reportData.blocks.block_26.infos">
                  <el-table-column label="Gene Variation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="Gene"  @blur="inputSub('block_26', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="Variation"  @blur="inputSub('block_26', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Drug">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_26', scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.nccnCsCo === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.nccnCsCo === 2, 'icon-adjust icon-size1 color-blue':scope.row.nccnCsCo === 3, 'icon-ban-circle icon-size1 color-red':scope.row.nccnCsCo === 4, 'icon-remove icon-size1 color-gray':scope.row.nccnCsCo === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.other === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.other === 2, 'icon-adjust icon-size1 color-blue':scope.row.other === 3, 'icon-ban-circle icon-size1 color-red':scope.row.other === 4, 'icon-remove icon-size1 color-gray':scope.row.other === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.clinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.clinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.clinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.clinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.clinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.preClinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.preClinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.preClinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.preClinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.preClinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_26', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_26', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.functionPrediction === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.functionPrediction === 2, 'icon-adjust icon-size1 color-blue':scope.row.functionPrediction === 3, 'icon-ban-circle icon-size1 color-red':scope.row.functionPrediction === 4, 'icon-remove icon-size1 color-gray':scope.row.functionPrediction === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_26, 'block_26', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!--block_27 CAR-T细胞免疫治疗方案汇总-->
              <h4>2）{{ reportData.blocks.block_27.blockName }}</h4>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_27', 'none')">+Add</a></div>
                <el-table class="table-center" :data="reportData.blocks.block_27.infos">
                  <!-- <el-table-column label="Gene Variation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="Gene"  @blur="inputSub('block_27', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="Variation"  @blur="inputSub('block_27', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column> -->
                  <el-table-column label="Immunotherapy">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_27', scope.row.code, 'drugTherapy', scope.row.drugTherapy)" v-model="scope.row.drugTherapy" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.nccnCsCo === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.nccnCsCo === 2, 'icon-adjust icon-size1 color-blue':scope.row.nccnCsCo === 3, 'icon-ban-circle icon-size1 color-red':scope.row.nccnCsCo === 4, 'icon-remove icon-size1 color-gray':scope.row.nccnCsCo === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.other === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.other === 2, 'icon-adjust icon-size1 color-blue':scope.row.other === 3, 'icon-ban-circle icon-size1 color-red':scope.row.other === 4, 'icon-remove icon-size1 color-gray':scope.row.other === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.clinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.clinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.clinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.clinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.clinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.preClinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.preClinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.preClinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.preClinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.preClinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_27', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_27', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.functionPrediction === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.functionPrediction === 2, 'icon-adjust icon-size1 color-blue':scope.row.functionPrediction === 3, 'icon-ban-circle icon-size1 color-red':scope.row.functionPrediction === 4, 'icon-remove icon-size1 color-gray':scope.row.functionPrediction === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_27, 'block_27', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              
              
              <!--block_28 肿瘤疫苗治疗方案汇总-->
              <h4>3）{{ reportData.blocks.block_28.blockName }}</h4>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_28', 'none')">+Add</a></div>
                <el-table class="table-center" :data="reportData.blocks.block_28.infos">
                  <!-- <el-table-column label="Gene Variation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="Gene"  @blur="inputSub('block_28', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                      <el-input type="textarea" autosize placeholder="Variation"  @blur="inputSub('block_28', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column> -->
                  <el-table-column label="Immunotherapy">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_28', scope.row.code, 'drugTherapy', scope.row.drugTherapy)" v-model="scope.row.drugTherapy" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="NCCN/CSCO Guideline">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.nccnCsCo === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.nccnCsCo === 2, 'icon-adjust icon-size1 color-blue':scope.row.nccnCsCo === 3, 'icon-ban-circle icon-size1 color-red':scope.row.nccnCsCo === 4, 'icon-remove icon-size1 color-gray':scope.row.nccnCsCo === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.other === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.other === 2, 'icon-adjust icon-size1 color-blue':scope.row.other === 3, 'icon-ban-circle icon-size1 color-red':scope.row.other === 4, 'icon-remove icon-size1 color-gray':scope.row.other === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.clinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.clinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.clinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.clinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.clinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.preClinicalTrails === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.preClinicalTrails === 2, 'icon-adjust icon-size1 color-blue':scope.row.preClinicalTrails === 3, 'icon-ban-circle icon-size1 color-red':scope.row.preClinicalTrails === 4, 'icon-remove icon-size1 color-gray':scope.row.preClinicalTrails === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <!-- <el-input type="number" @blur="inputSub('block_28', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                      <el-dropdown @command="(command) => handleCommand(command, 'block_28', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
                        <span class="el-dropdown-link">
                          <i :class="{'icon-circle icon-size1 color-blue':scope.row.functionPrediction === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.functionPrediction === 2, 'icon-adjust icon-size1 color-blue':scope.row.functionPrediction === 3, 'icon-ban-circle icon-size1 color-red':scope.row.functionPrediction === 4, 'icon-remove icon-size1 color-gray':scope.row.functionPrediction === 5}"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                          <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                          <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_28, 'block_28', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!--block_29 免疫治疗方案详情-->
              <h3>{{ reportData.blocks.block_29.blockName }}</h3>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_29', 'none')">+Add</a></div>
                <el-table class="table-center" :data="reportData.blocks.block_29.infos">
                  <el-table-column label="Immunotherapy">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_29', scope.row.code, 'drugTherapy', scope.row.drugTherapy)" v-model="scope.row.drugTherapy" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Evidence">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="Clinical Evidence"  @blur="inputSub('block_29', scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_29, 'block_29', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!--block_15 预后相关解读信息-->
              <h3>{{ reportData.blocks.block_15.blockName }}</h3>
              <div class="table-cont no-center" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('block_15', 'none')">+Add</a></div>
                <el-table empty-text="No evidence available" :empty-text="emptyText" class="table-center" :data="reportData.blocks.block_15.infos">
                  <el-table-column label="Gene Variation">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Influence on prognosis">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize placeholder="influenceOnPrognosis" @blur="inputSub('block_15', scope.row.code, 'influenceOnPrognosis', scope.row.influenceOnPrognosis)" v-model="scope.row.influenceOnPrognosis"></el-input>
                      <el-input type="textarea" autosize placeholder="mutation"  @blur="inputSub('block_15', scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="NCCN/CSCOGuideline">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model="scope.row.nccnCsCo"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="FDA/CFDA Information">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model="scope.row.fdaCfda"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Other Guidelins or Consensus">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'other', scope.row.other)" v-model="scope.row.other"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model="scope.row.clinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Pre-Clinical Trails">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model="scope.row.preClinicalTrails"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Function prediction">
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize  @blur="inputSub('block_15', scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model="scope.row.functionPrediction"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_15, 'block_15', scope.$index)">Del</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>

          <!--block_16 临床入组了-->
          <div :class="{'tableItems':part07check === false, 'tableItems toggleHide':part07check === true}">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_16.blockName }}</h2>
              <div class="table-edit"><a href="javascript:;" @click="pushpart07">添加项目</a></div>
              <!-- <span class="itemsAdd" title="增加一条" v-show="part07check === true" @click="pushpart07">+添加</span> -->
            </div>
            <div class="table-btns" v-show="part07check === true">
              <!-- <a href="javascript:;" class="sub" @click="part07check = false">退出编辑</a> -->
              <!-- <a href="javascript:;" class="cancel" @click="part07check = false, cancel(reportData.blocks.block_16, 'block_16')">取消</a> -->
            </div>
            <div class="table-describe">
              <p>According to the analysis of gene mutations in this subject, disease and some other information, such as recruitment site, therapy and phase of clinical trial, screen the candidate clinical trials being recruited from clinicaltrials.gov and chinadrugtrials.org. Information of recommended clinical trials is followed.</p>
              <div class="table-cont" v-for="(recommended, index) in reportData.blocks.block_16.infos">
                <table>
                  <tr>
                    <th>{{ index + 1 }}、{{ recommended.clinical_id }}</th>
                    <th align="right"><el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_16, 'block_16', index)">Del</el-button></th>
                  </tr>
                  <tr>
                    <td>Clinical trial title</td>
                    <td>{{ recommended.clinical_name }}</td>
                  </tr>
                  <tr>
                    <td>Clinical trial phase</td>
                    <td>{{ recommended.phase }}</td>
                  </tr>
                  <tr>
                    <td>Drug /Therapy</td>
                    <td>{{ recommended.intervention_name }}</td>
                  </tr>
                  <tr>
                    <td>Disease/Condition</td>
                    <td>{{ recommended.indications }}</td>
                  </tr>
                  <tr>
                    <td>Recruitment site</td>
                    <td>{{ recommended.recruit_place }}</td>
                  </tr>
                  <tr>
                    <td>Contact Information</td>
                    <td>{{ recommended.contact_information }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!--block_21 临床入组了-->
          <!--RECOMMENDED CLINICAL TRIALS-->
          <div :class="{'tableItems':part07check === false, 'tableItems toggleHide':part07check === true}">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_21.blockName }}</h2>
              <!-- <div class="table-edit"><a href="javascript:;" @click="pushpart07">添加项目</a></div> -->
              <!-- <span class="itemsAdd" title="增加一条" v-show="part07check === true" @click="pushpart07">+添加</span> -->
            </div>
            <div class="table-describe">
              <p>According to the analysis of patients’ personal epitopes, disease and some other information, such as recruitment site, therapy and phase of clinical trial, screen the candidate clinical trials of tumor cellular immunotherapy being recruited from clinicaltrials.gov. Information of recommended clinical trials is followed.</p>
              <div class="table-cont" v-for="(recommended, index) in reportData.blocks.block_21.infos">
                <table>
                  <tr>
                    <th width="200">{{ index + 1 }}、{{ recommended.clinical_id }}</th>
                    <th align="right"><!-- <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_21, 'block_21', index)">Del</el-button> --></th>
                  </tr>
                  <tr>
                    <td>Clinical trial title</td>
                    <td>{{ recommended.clinical_name }}</td>
                  </tr>
                  <tr>
                    <td>Clinical trial phase</td>
                    <td>{{ recommended.phase }}</td>
                  </tr>
                  <tr>
                    <td>Medication /Therapy</td>
                    <td>{{ recommended.intervention_name }}</td>
                  </tr>
                  <tr>
                    <td>Disease/Condition</td>
                    <td>{{ recommended.indications }}</td>
                  </tr>
                  <tr>
                    <td>Recruitment site</td>
                    <td>{{recommended.recruit_place}}</td>
                  </tr>
                  <tr>
                    <td>Contact Information</td>
                    <td>{{ recommended.contact_information }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          
          <!--block_17 建议增加检测的基因-->
          <div class="tableItems" v-if="reportData.blocks.block_17">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_17.blockName }}</h2>
            </div>
            <br/>
            <!-- <p style="line-height: 2; padding: 0 10px;">
              <el-input type="textarea" autosize  @blur="inputSub('block_17', '0', 'suggestGenes', reportData.blocks.block_17.infos.suggestGenes)" class="underline" v-model="reportData.blocks.block_17.infos.suggestGenes" placeholder="Disclaimer"></el-input>
            </p> -->
            <div class="table-cont" v-if="reportData.name === 'Non-small Cell Lung Cancer(NSCLC) Gene Test Report'">
              <table>
                <tr>
                  <th width="30%" style="font-weight:bold; font-size:16px;">检测项目</th>
                  <th style="font-weight:bold; font-size:16px;">临床意义</th>
                </tr>
                <tr>
                  <td style="font-weight:bold;">肺癌套餐+ALK-EML4/ROS1 融合基因</td>
                  <td>除套餐外，检测ALK，ROS1， RET基因融合，为患者选择ALK激酶抑制剂克唑替尼、色瑞替尼， Alectinib等 治疗非小细胞肺癌提供依据。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">肺癌套餐+ALK-EML4/ROS1 融合基因+cMET(免疫组化)</td>
                  <td>除套餐和ALK/ROS1融合基因外，检测c-MET扩增和14外显子跳读，2015年美国NCCN指南建议，克唑替尼用于MET扩增的非小细胞肺癌。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">肺癌ALK-EML4/ROS1 融合基因</td>
                  <td>检测ALK，ROS1， RET基因融合，为患者选择ALK激酶抑制剂克唑替尼、色瑞替尼， Alectinib等 治疗非小细胞肺癌提供依据。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">肺癌cMET(免疫组化)</td>
                  <td>检测c-MET扩增和14外显子跳读，2015年美国NCCN指南建议，克唑替尼用于MET扩增的非小细胞肺癌。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">EGFR/KRAS/BRAF</td>
                  <td>检测EGFR基因突变信息，预测EGFR-TKI的治疗疗效。FDA 批准 EGFR 抑 制 剂 吉 非 替 尼 、 厄 洛 替 尼 、 埃 克 替 尼 、 阿 法 替 尼 (HER2/EGFR双抑制剂)、AZD9291用于治疗EGFR突变的非小细胞肺癌。KRAS突变可能导致非 小细胞肺癌对EGFR靶向药物敏感性降低。 2015年美国NCCN指南建议，BRAF 抑制 剂威罗菲尼和达拉菲尼可以用于BRAF V600E突变的非小细胞肺癌。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">PD-1免疫组化</td>
                  <td>指导PD-1/PD-L1免疫抑制剂（Keytruda, Tecentriq, or Opvoid） 用药。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">肺癌套餐（ctDNA)</td>
                  <td>利用液体活检技术，检测外周血中游离肿瘤DNA的肺癌关键驱动基因变异，为晚期无法获取病理组织标本的患者提供无创检测和全面精准靶向药物治疗指导。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">EGFR/KRAS/BRAF （ctDNA)</td>
                  <td>利用液体活检技术，检测外周血中游离肿瘤DNA的关键驱动基因变异，指导TKI和RAF抑制剂临床用药。</td>
                </tr>
              </table>
            </div>
            <div class="table-cont" v-if="reportData.name === 'Colorectal Cancer(CRC) Gene Test Report'">
              <table>
                <tr>
                  <th width="30%" style="font-weight:bold; font-size:16px;">检测项目</th>
                  <th>临床意义</th>
                </tr>
                <tr>
                  <td style="font-weight:bold;">结直肠癌套餐+VEGF基因表达/VEGFR-2基因表达</td>
                  <td>除上述全面基因突变检测外，针对VEGF和VEGFR2基因表达情况，预测贝伐单抗的疗效。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">结直肠癌套餐+VEGF基因表达/VEGFR-2基因表达+EGFR基因表达</td>
                  <td>除上述全面基因突变检测外，针对EGFR基因表达情况，预测西妥昔单抗的疗效。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">结直肠癌VEGF基因表达/VEGFR-2基因表达</td>
                  <td>针对VEGF和VEGFR2基因表达情况，预测贝伐单抗的疗效。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">结直肠癌EGFR基因表达</td>
                  <td>针对EGFR基因表达情况，预测西妥昔单抗的疗效。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">KRAS/BRAF/MSI</td>
                  <td>检测KRAS/BRAF/MSI单点突变，预测西妥昔单抗及PD-1/PD-L1的疗效。</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">结直肠癌套餐（ctDNA）</td>
                  <td>
                      利用液体活检技术，检测外周血中游离肿瘤DNA的结直肠癌关键驱动基因变异，为晚期无法获取病理组织标本的患者提供无创检测和全面精准靶向药物治疗指导。
                  </td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">KRAS/BRAF/MSI（ctDNA）</td>
                  <td>
                      利用液体活检技术，检测外周血中游离肿瘤DNA的结直肠癌关键驱动基因变异，为无法获取组织标本的患者提供结直肠癌靶向药物西妥昔单抗及PD-1/PD-L1治疗指导。
                  </td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">CTC</td>
                  <td>
                      利用液体活检技术，检测外周血中肿瘤癌细胞计数，为临床肿瘤靶向药物或化疗药物治疗效果进行评估和监测。
                  </td>
                </tr>
              </table>
            </div>
          </div>
          
          <!--DISEASE PATHWAY 疾病信号通路图-->
          <div :class="{'tableItems':part08check === false, 'tableItems toggleHide':part08check === true}">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_18.blockName }}</h2>
              <div class="table-edit"><a href="javascript:;" @click="part08check = true">编辑</a></div>
            </div>
            <br/>
            <h3>NSCLC: map05223</h3>
            <div class="table-btns" v-show="part08check === true">
              <a href="javascript:;" class="sub" @click="part08check = false">退出编辑</a>
              <!-- <a href="javascript:;" class="cancel" @click="part08check = false, cancel(reportData.blocks.block_18, 'block_18')">取消</a> -->
            </div>
            <div class="table-cont">
              <div class="introduce" v-show="part08check === false" v-for="itemr in reportData.blocks.block_18.infos">
                <!-- <img src="http://yanfa.test.bainuo.cn:8888/flowImages/20171025/4b3aaf58addd48528aec1fa2615de0bd.png" alt=""> -->
                <img :src="itemr.pathway_path">
              </div>
              <div class="introduce toggleItem" v-show="part08check === true">
                <el-form>
                  <el-form-item label="选择图片上传：">
                    <el-col :span="9">
                      <el-upload
                        :action="imgUploadUrl"
                        list-type="picture"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :on-success="handleSuccess"
                        :headers="uploadHeader"
                        :file-list="fileList"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2Mb</div>
                      </el-upload>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>

          <!--建议增加检测的基因-->
          <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_12.blockName }}</h2>
            </div>
            <br/>
            <p style="line-height: 2; padding: 0 10px;">
              <el-input type="textarea" autosize  @blur="inputSub('block_12', '0', 'suggestGenes', reportData.blocks.block_12.infos.suggestGenes)" v-model="reportData.blocks.block_12.infos.suggestGenes" placeholder="Disclaimer"></el-input>
            </p>
          </div>

          <!--REFERENCES--><!--block_22 链接列表-->
          <div :class="{'tableItems':part09check === false, 'tableItems toggleHide':part09check === true}">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_22.blockName }}</h2>
              <div class="table-edit"><a href="javascript:;" @click="part09check = true">编辑</a></div>
              <span class="itemsAdd" title="增加一条" v-show="part09check === true" v-loading='addLoading' @click="pushListItem('block_22', 'none')">+添加</span>
            </div>
            <div class="table-btns" v-if="part09check === true">
              <a href="javascript:;" class="sub" @click="part09check = false">退出编辑</a>
              <!-- <a href="javascript:;" class="cancel" @click="part09check = false, cancel(reportData.blocks.block_22, 'block_22')">取消</a> -->
            </div>
            <div class="table-cont" v-if="part09check === false">
              <div class="introduce">
                <p v-for="(itemr, indexer) in reportData.blocks.block_22.infos">{{ indexer + 1 }}、<a :href="itemr.literature_url">{{itemr.literature_name}}</a></p>
              </div>
              <div class="introduce" v-if="reportData.blocks.block_22.infos.length < 1">
                <p style="text-align:center; color:#999">No evidence available</p>
              </div>
            </div>
            <div class="toggleHide"  v-if="part09check === true">
              <el-table empty-text="No evidence available" class="needRemove" :data="reportData.blocks.block_22.infos">
                <el-table-column type="index" label="序号" style="text-align:left" width="100"></el-table-column>
                <el-table-column label="标题">
                  <template slot-scope="scope">
                    <el-col :span="18"><el-input type="text" @blur="inputSub('block_22', scope.row.code, 'literature_name', scope.row.literature_name)" v-model="scope.row.literature_name"></el-input></el-col>
                  </template>
                </el-table-column>
                <el-table-column label="链接地址">
                  <template slot-scope="scope">
                    <el-col :span="18"><el-input type="text" @blur="inputSub('block_22', scope.row.code, 'literature_url', scope.row.literature_url)" v-model="scope.row.literature_url"></el-input></el-col>
                  </template>
                </el-table-column>
                <el-table-column label="option" width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="delListItem(reportData.blocks.block_22, 'block_22', scope.$index)">Del</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          

          <!--Disclaimer block_23 免责声明-->
          <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blocks.block_23.blockName }}</h2>
            </div>
            <br/>
            <p style="line-height: 2; padding: 0 10px;">
              <el-input type="textarea" autosize  @blur="inputSub('block_23', '0', 'disclaimer', reportData.blocks.block_23.infos.disclaimer)" class="underline" v-model="reportData.blocks.block_23.infos.disclaimer" placeholder="Disclaimer"></el-input>
            </p>
            
            <p style="text-align: right; line-height: 4; padding: 20px 40px 0 0">
              Signature of Auditor: 
              <!-- <el-input type="text" @blur="inputSub('block_23', '0', 'user_name', reportData.blocks.block_23.infos.user_name)" class="underline" v-model="reportData.blocks.block_23.infos.user_name" placeholder="Signature of Auditor" style="width:calc(20% - 5em)"></el-input> -->
              <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(20% - 5em);line-height:2;">
                <!-- {{reportData.blocks.block_01.infos.birthday | formatDate}} -->
              </span>
              Date：
              <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(20% - 5em);line-height:2;">
                <!-- {{reportData.blocks.block_01.infos.birthday | formatDate}} -->
              </span>
              <!-- <el-input type="text" @blur="inputSub('block_23', '0', 'user_name', reportData.blocks.block_23.infos.user_name)" class="underline" v-model="reportData.blocks.block_10.infos.user_name" placeholder="Date" style="width:calc(20% - 5em)"></el-input> -->
            </p>
          </div>

          <!--report_lists_end-->
        </div>
      </div>

      <!--临床入组选择框-->
      <el-dialog title="临床入组选择" :visible.sync="part07showDialog" size="large">
        <div class="search-wrapper">
          <el-form :inline="true" :model="searchWrapper" class="demo-form-inline" style="position:relative">
            <el-form-item label="疾病：">
              <el-input v-model="searchWrapper.condition" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input v-model="searchWrapper.drug" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="招募国家地区：">
              <el-input v-model="searchWrapper.recruitCountry" placeholder=""></el-input>
            </el-form-item>
            <div class="xx" v-show="searchShow === true">
              <el-form-item label="ages range">
                <el-select  v-model="searchWrapper.ageRange" style="width:100%" clearable placeholder="请选择">
                  <el-option v-for="item in ageList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试验分期：">
                <el-select  v-model="searchWrapper.phase" style="width:100%" clearable placeholder="请选择">
                  <el-option v-for="item in phaseList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人群：">
                <el-input v-model="searchWrapper.population" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="赞助商：">
                <el-input v-model="searchWrapper.sponsor" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="实验国家地区：">
                <el-input v-model="searchWrapper.trialCountry" placeholder=""></el-input>
              </el-form-item>
            </div>
            <div class="leftMore">
              <span class="el-tag el-tag--danger" @click="searchShow = true" v-if="searchShow === false">Senior Search</span>
              <span class="el-tag el-tag--danger" @click="searchShow = false" v-if="searchShow === true">Simple Search</span>
            </div>
            <div>
              <el-form-item>
                <el-button type="primary" :loading="listLoading" @click="getPrat07Item(1)">{{ listLoading ? 'Searching...' : 'Search' }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="part07Data">
          <el-table empty-text="No evidence available" :data="part07Data" v-loading="listLoading" border style="width: 100%">
            <el-table-column label="研究课题" width="400">
              <template slot-scope="scope">
                <a :href="'https://clinicaltrials.gov/ct2/show/' + scope.row.nctId">{{ scope.row.briefTitle }}</a>
              </template>
            </el-table-column>
            <el-table-column label="地址">
              <template slot-scope="scope">
                {{ scope.row.country }}{{ scope.row.state }}{{ scope.row.city }}
              </template>
            </el-table-column>
            <el-table-column label="邮件" prop="email">
            </el-table-column>
            <el-table-column label="招募机构" prop="facilityName">
            </el-table-column>
            <el-table-column label="联系人" prop="peopleName">
            </el-table-column>
            <el-table-column label="option" width="100">
              <template slot-scope="scope">
                <el-button type="success" size="small"  v-loading='addLoading' @click="pushListItem('block_07', scope.row, scope.$index)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="currentPage" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getPrat07Item"></pager>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import Pager from '@/components/common/pager'
  import axios from 'axios'
  import '@/common/css/font-bootstrap.css'
  import {formatDate} from '@/common/js/Utils.js'

  export default {
    created () {
      this.getReportData()
      // 获取小结列表
      // this.getsummary_msg(this.sumCurrent)
    },
    data () {
      return {
        htmlUrlF: '',
        pdfUrlF: '',
        tabShow: 0,
        tableData: [],
        code: this.$route.params.id,
        language: 'en',
        // language: this.$route.params.language,
        // code: 'ca0f292ecacd4202bdc4b02e41bec761',
        currentPage: 1,
        pageSize: 15,
        pageNum: 1,
        totalCount: 0,
        sumCurrent: 1,
        sumPagesize: 5,
        sumPageNum: 1,
        sumtotal: 0,
        loading: false,
        isLoading: false,
        isEdit: false,
        rules: {
          name: [
            { required: true, message: '请输入小结内容', trigger: 'blur' }
          ]
        },
        part07check: false,
        part07showDialog: false,
        part08check: false,
        part09check: false,
        imgUploadUrl: URL.api_name + 'cloud/upload_flow_image',
        fileList: [],
        gender: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }],
        races: [{
          label: '东亚',
          value: 1
        }, {
          label: '欧洲',
          value: 2
        }, {
          label: '非洲',
          value: 3
        }, {
          label: '北美',
          value: 4
        }, {
          label: '南亚',
          value: 5
        }],
        formData: {
          description: ''
        },
        listLoading: true,
        addLoading: false,
        searchShow: false,
        searchWrapper: {
          ageRange: '',
          condition: '',
          drug: '',
          nctId: '',
          phase: '',
          population: '',
          recruitCountry: '',
          sponsor: '',
          trialCountry: ''
        },
        ageList: [{
          label: '小于等于17岁',
          value: '1'
        }, {
          label: '18-65岁',
          value: '2'
        }, {
          label: '65岁以上',
          value: '3'
        }],
        phaseList: [{
          label: 'N/A',
          value: 'N/A'
        }, {
          label: '早期I期',
          value: 'Early Phase 1'
        }, {
          label: 'I期',
          value: 'Phase 1'
        }, {
          label: 'II期',
          value: 'Phase 2'
        }, {
          label: 'II/III期',
          value: 'phase 2/Phase 3'
        }, {
          label: 'III期',
          value: 'phase 3'
        }, {
          label: 'IV期',
          value: 'phase 4'
        }],
        emptyText: 'No evidence available',
        part07Data: [],
        showprty07: false,
        copyData: {},
        reportData: {},
        geneList: [],
        block_060201: [],
        block_060202: [],
        block_060203: [],
        block_060204: [],
        block_060205: [],
        block_060206: []
      }
    },
    methods: {
      getReportData () {
        let that = this
        that.loading = true
        // let url = './static/block_en.json'
        let url = URL.api_name + 'report/en_report_detail'
        axios.get(url, {
          params: {
            projectCode: that.code
          }
        }).then(function (respose) {
          if (respose.data.code === '100') {
            that.reportData = respose.data.data
            // console.log(that.reportData)
            // 查找所有图片
            for (let i = 0; i < that.reportData.blocks.block_08.infos.length; i++) {
              that.fileList.push({
                code: that.reportData.blocks.block_08.infos[i].code,
                name: that.reportData.blocks.block_08.infos[i].pathway_name,
                url: that.reportData.blocks.block_08.infos[i].pathway_path
              })
            }
            // geneList
            that.geneList = []
            for (let s in that.reportData.blocks.block_04.infos.genes) {
              // that.geneList = that.geneList + s + ',' 
              that.geneList.push({
                value: s,
                checkOut: that.reportData.blocks.block_04.infos.genes[s]
              })
            }
            // 重设race 种族的显示内容
            for (let n = 0; n < that.races.length; n++) {
              if (that.reportData.blocks.block_01.infos.race === that.races[n].value) {
                that.reportData.blocks.block_01.infos.race = that.races[n].label
              }
            }
            that.setBlocks06()
          }
        }, function (error) {
          console.log(error)
          that.loading = false
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      setBlocks06 () {
        // 0602组合list
        let that = this
        let block06 = []
        block06 = that.reportData.blocks.block_14.infos
        that.block_060201 = []
        that.block_060202 = []
        that.block_060203 = []
        that.block_060204 = []
        that.block_060205 = []
        that.block_060206 = []
        for (let q = 0; q < block06.length; q++) {
          // 1:靶向2:化疗3:免疫靶向4:放疗5:细胞免疫6:其它
          if (block06[q].type === 1) {
            that.block_060201.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } else if (block06[q].type === 2) {
            that.block_060202.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } else if (block06[q].type === 3) {
            that.block_060203.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } else if (block06[q].type === 4) {
            that.block_060204.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } else if (block06[q].type === 5) {
            that.block_060205.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } else if (block06[q].type === 6) {
            that.block_060206.push({
              clinicalEvidence: block06[q].clinicalEvidence,
              code: block06[q].code,
              drugTherapy: block06[q].drugTherapy,
              gene: block06[q].gene,
              mutation: block06[q].mutation,
              type: block06[q].type
            })
          } 
        }
      },
      getsummary_msg () {
        // 获取小结
        let that = this
        axios.get(URL.api_name + 'report/description_list', {
          params: {
            pageNumber: that.sumPageNum,
            pageSize: that.sumPagesize,
            projectCode: that.code
          }
        }).then(function (res) {
          // console.log('x2')
          if (res.data.code === '100') {
            // alert('x')
            that.tableData = res.data.data.list
            that.sumtotal = res.data.data.total
          }
        }, function (error) {
          that.$message({
            type: 'error',
            message: 'sub error' + error,
            duration: 1000
          })
        })
      },
      getPrat07Item (num) {
        // 临床入组 查询
        let that = this
        that.listLoading = true
        axios.get(URL.api_name + 'report/get_clinical_info', {
          params: {
            projectCode: that.code,
            ageRange: that.searchWrapper.ageRange,
            condition: that.searchWrapper.condition,
            drug: that.searchWrapper.drug,
            nctId: that.searchWrapper.nctId,
            phase: that.searchWrapper.phase,
            population: that.searchWrapper.population,
            recruitCountry: that.searchWrapper.recruitCountry,
            sponsor: that.searchWrapper.sponsor,
            trialCountry: that.searchWrapper.trialCountry,
            // nctId: 'NCT02297698',
            pageNumber: num,
            pageSize: that.pageSize
          }
        }).then(function (res) {
          // console.log(res.data.data)
          if (res.data.code === '100') {
            that.part07Data = res.data.data.list
            that.totalCount = res.data.data.total
            that.listLoading = false
          }
        }, function (error) {
          // console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败' + error,
            duration: 1000
          })
        })
      },
      beforeUpload (file) {
        // if (this.fileList.length > 0) {
        //   this.$message({
        //     type: 'error',
        //     message: '最多上传一张图片',
        //     duration: 1000
        //   })
        //   return false
        // }
      },
      handleSuccess (response, file, fileList) {
        let that = this
        that.fileList.push({
          name: response.data.fileName,
          url: response.data.flowImageUrl
        })
        that.reportData.blocks.block_18.infos.push({
          fileName: response.data.fileName,
          pathway_path: response.data.flowImageUrl
        })
        // 上传成功马上传到服务器
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: 'block_18',
          info: {
            fileName: response.data.fileName,
            pathway_path: response.data.flowImageUrl
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.blocks.block_18 = res.data.data
            that.fileList = []
            for (let n = 0; n < res.data.data.infos.length; n++) {
              that.fileList.push({
                code: res.data.data.infos[n].code,
                name: res.data.data.infos[n].pathway_name,
                url: res.data.data.infos[n].pathway_path
              })
            }
            // 取消加载状态
            // that.addLoading = false
            // console.log(that.reportData.block_09)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
      },
      handleRemove (file, fileList) {
        // console.log(this.fileList)
        // console.log(fileList)
        console.log(file)
        let that = this
        // that.fileList = []
        // for (let n = 0; n < fileList.length; n++) {
        //   that.fileList.push({
        //     code: fileList[n].code,
        //     name: fileList[n].name,
        //     url: fileList[n].url
        //   })
        // }
        // 删除提交到服务器
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: 'block_18',
          fieldCode: file.code
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.blocks.block_18 = res.data.data
            // console.log('+++')
            // console.log(res.data.data)
            that.fileList = []
            for (let n = 0; n < res.data.data.infos.length; n++) {
              that.fileList.push({
                code: res.data.data.infos[n].code,
                name: res.data.data.infos[n].pathway_name,
                url: res.data.data.infos[n].pathway_path
              })
            }
            // console.log(that.fileList)
            // that.fileList = fileList
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
        // this.fileList = fileList
        // that.reportData.blocks.block_18.infos = []
        // for (let i = 0; i < that.fileList.length; i++) {
        //   that.reportData.blocks.block_18.infos.push({
        //     fileName: that.fileList[i].name,
        //     pathway_path: that.fileList[i].url
        //   })
        // }
        // console.log(file, fileList);
      },
      delListItem (part, partName, index) {
        // 删除单条
        // 也提交到服务器
        let that = this
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: partName,
          fieldCode: part.infos[index].code
        }).then(function (res) {
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: 'delete success',
              duration: 1000
            })
            // splice用法  索引, 删几个
            part.infos.splice(index, 1)
            that.reportData.blocks[partName] = res.data.data
          }
        }, function (error) {
          // console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error' + error,
            duration: 1000
          })
        })
      },
      delListItemBlock0602 (part, partName, code, type) {
        // 删除单条
        // 也提交到服务器
        let that = this
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: partName,
          fieldCode: code,
          type: type
        }).then(function (res) {
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: 'delete success',
              duration: 1000
            })
            for (let i = 0; i < that.reportData.blocks.block_14.infos.length; i++) {
              if (that.reportData.blocks.block_14.infos[i].code === code) {
                // alert(i)
                that.reportData.blocks.block_14.infos.splice(i, 1)
                that.setBlocks06()
                that.reportData.blocks.block_14 = res.data.data
                return false
              }
            }
          }
        }, function (error) {
          // console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error' + error,
            duration: 1000
          })
        })
      },
      pushpart07 () {
        let that = this
        that.part07showDialog = true
        that.getPrat07Item(that.currentPage)
      },
      // cancel (part, partName) {
      //   // 取消提交
      //   let that = this
      //   that.isEdit = false
      //   axios.get(URL.api_name + 'report/en_block_detail', {
      //     params: {
      //       projectCode: that.reportData.projectCode,
      //       blockCode: partName
      //     }
      //   }).then(function (res) {
      //     // console.log('x2')
      //     if (res.data.code === '100') {
      //       part.infos = res.data.data.infos
      //     }
      //   }, function (error) {
      //     // console.log(error)
      //     that.$message({
      //       type: 'error',
      //       message: 'sub error',
      //       duration: 1000
      //     })
      //   })
      // },
      inputSub (blockCode, filecode, filedName, filedValue) {
        // 单个提交
        let that = this
        if (filecode === '0') {
          filecode = ''
        }
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: blockCode,
          fieldCode: filecode,
          fieldName: filedName,
          fieldValue: filedValue
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.blocks[blockCode] = res.data.data
            // that.$message({
            //   type: 'success',
            //   message: res.data.message,
            //   duration: 1000
            // })
          } else {
            // console.log(error)
            that.$message({
              type: 'error',
              message: 'sub error：' + res.data.message,
              duration: 1000
            })
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
      },
      inputSubBlock0602 (blockCode, filecode, filedName, filedValue, block06type) {
        // 单个提交
        let that = this
        if (filecode === '0') {
          filecode = ''
        }
        axios.post(URL.api_name + 'report/en_field_update', {
          projectCode: that.reportData.projectCode,
          blockCode: blockCode,
          fieldCode: filecode,
          fieldName: filedName,
          fieldValue: filedValue,
          type: block06type
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.blocks[blockCode] = res.data.data
            // that.$message({
            //   type: 'success',
            //   message: res.data.message,
            //   duration: 1000
            // })
          } else {
            // console.log(error)
            that.$message({
              type: 'error',
              message: 'sub error：' + res.data.message,
              duration: 1000
            })
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
      },
      pushListItem (part, scope, index) {
        // 添加一条
        let that = this
        // 进去加载状态，防止多次提交
        // that.addLoading = true
        let infos = []
        // 根据不同的模块标识，Push进不同的key和value
        if (part === 'block_06') {
          infos.push({
            clinicalSignificance: '',
            clinicalTrails: '',
            clinicalTrails_count: '',
            code: '',
            fdaCfadCount: '',
            fdaCfda: '',
            functionPrediction: '',
            gene: '',
            mutation: '',
            nccnCsco: '',
            nccnCscoCount: '',
            other: '',
            other_count: '',
            preClinicalTrails: '',
            refSeq: ''
          })
        } else if (part === 'block_07') {
          infos.push({
            clinicalSignificance: '',
            clinicalTrails_count: '',
            code: '',
            fdaCfadCount: '',
            functionPrediction: '',
            fusion: '',
            fusionType: '',
            gene: '',
            nccnCscoCount: '',
            other_count: '',
            preClinicalTrails: ''
          })
        } else if (part === 'block_08') {
          infos.push({
            clinicalSignificance: '',
            clinicalTrails_count: '',
            code: '',
            expression: '',
            expressionLevel: '',
            fdaCfadCount: '',
            functionPrediction: '',
            gene: '',
            nccnCscoCount: '',
            other_count: '',
            preClinicalTrails: ''
          })
        } else if (part === 'block_09') {
          infos.push({
            amplification: '',
            clinicalSignificance: '',
            clinicalTrails: '',
            clinicalTrails_count: '',
            code: '',
            fdaCfadCount: '',
            functionPrediction: '',
            gene: '',
            nccnCscoCount: '',
            other_count: '',
            preClinicalTrails: ''
          })
        } else if (part === 'block_10') {
          infos.push({
            clinicalSignificance: '',
            clinicalTrails: '',
            clinicalTrails_count: '',
            code: '',
            copy: '',
            copyLevel: '',
            fdaCfadCount: '',
            fdaCfda: '',
            functionPrediction: '',
            gene: '',
            nccnCsco: '',
            nccnCscoCount: '',
            other: '',
            other_count: '',
            preClinicalTrails: ''
          })
        } else if (part === 'block_11') {
          infos.push({
            clinicalSignificance: '',
            clinicalTrails: '',
            clinicalTrails_count: '',
            code: '',
            fdaCfadCount: '',
            fdaCfda: '',
            functionPrediction: '',
            mmr: '',
            msi: '',
            nccnCsco: '',
            nccnCscoCount: '',
            other: '',
            other_count: '',
            preClinicalTrails: ''
          })
        } else if (part === 'block_13') {
          infos.push({
            code: '',
            gene: '',
            mutation: '',
            drugTherapy: '-',
            clinicalSignificance: '',
            other: 5,
            clinicalTrails: 5,
            preClinicalTrails: 5,
            functionPrediction: 5,
            nccnCsCo: 5,
            fdaCfda: 5
          })
        } else if (part === 'block_0602') {
          infos.push({
            code: '',
            gene: '',
            mutation: '',
            drugTherapy: '-',
            clinicalEvidence: '',
            type: index
          })
        } else if (part === 'block_07') {
          // 显示临床入组选择框
          let sn = []
          sn = scope.drugs
          let sns = ''
          for (let qq = 0; qq < sn.length; qq++) {
            sns = sns + sn[qq].drug + ' '
          }
          infos.push({
            clinical_id: scope.nctId,
            clinical_name: scope.briefTitle,
            intervention_name: sns,
            phase: scope.phase,
            indications: scope.condition,
            recruit_place: scope.country + scope.city,
            contact_information: scope.phone
          })
          // splice用法  索引, 删几个
          // that.part07Data.splice(index, 1)
        } else if (part === 'block_22') {
          infos.push({
            literature_name: '',
            literature_url: ''
          })
        } else if (part === 'block_24') {
          infos.push({
            checkItem: '',
            code: '',
            judgeStand: '',
            mutationalLoad: ''
          })
        } else if (part === 'block_25') {
          infos.push({
            code: '',
            hla: '',
            hla1: '',
            alleleOne: '',
            alleleTwo: ''
          })
        } else if (part === 'block_26') {
          infos.push({
            clinicalTrails: 5,
            code: '',
            drug: '',
            fdaCfad: 5,
            functionPrediction: 5,
            mutation: '',
            nccnCsco: 5,
            other: 5,
            preClinicalTrails: 5
          })
        } else if (part === 'block_27') {
          infos.push({
            clinicalTrails: 5,
            code: '',
            drugTherapy: '',
            fdaCfad: 5,
            functionPrediction: 5,
            nccnCsco: 5,
            other: 5,
            preClinicalTrails: 5
          })
        } else if (part === 'block_28') {
          infos.push({
            clinicalTrails: 5,
            code: '',
            drugTherapy: '',
            fdaCfad: 5,
            functionPrediction: 5,
            nccnCsco: 5,
            other: 5,
            preClinicalTrails: 5
          })
        } else if (part === 'block_29') {
          infos.push({
            clinicalEvidence: '',
            code: '',
            drugTherapy: ''
          })
        } else if (part === 'block_15') {
          infos.push({
            clinicalTrails: 5,
            code: '',
            fdaCfad: 5,
            functionPrediction: 5,
            gene: '',
            influenceOnPrognosis: '',
            mutation: '',
            nccnCsco: 5,
            other: 5,
            preClinicalTrails: 5
          })
        }
        // 封装一个临时的要提交的添加操作的数据对象
        let postParame = {}
        postParame['projectCode'] = that.reportData.projectCode
        postParame['blockCode'] = part
        postParame['info'] = infos[0]
        // 提交添加操作
        axios.post(URL.api_name + 'report/en_field_update', postParame).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.blocks[part] = res.data.data
            // 取消加载状态
            // that.addLoading = false
            // console.log(that.reportData.block_09)
            that.setBlocks06()
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
      },
      handleCommand (command, name, code, data, lastdata) {
        // xxxx
        console.log(command)
        console.log(name)
        console.log(code)
        console.log(data)
        console.log(lastdata)
        let that = this
        that.inputSub(name, code, data, command)
      },
      subSummary (formData) {
        // 提交小结
        // 上传成功马上传到服务器
        let that = this
        axios.post(URL.api_name + 'report/description_add', {
          projectCode: that.reportData.projectCode,
          description: that.formData.description,
          langType: that.language
        }).then(function (res) {
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            that.$router.push({
              path: '/examineNone/'
            })
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: 'sub error',
            duration: 1000
          })
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    components: {
      Pager: Pager
    },
    computed: {
      uploadHeader () {
        return {
          token: JSON.parse(localStorage.getItem('authtoken'))
        }
      }
    }
  }
</script>
<style scoped>
a{    color: #337ab7;    text-decoration: none;}
table{ border-collapse: collapse; table-layout: fixed; width:100%;}
th,td{ padding: 9px 10px; text-align: left;}
.checkOutPdf{ position: fixed; top:70px; right:36px;}
.tabCard { margin:0 0 30px 0; background:#eef1f6;}
.tabCard a{color:#48576a; display:inline-block; vertical-align: top; margin:0 0px 0 0px; padding:15px 30px; cursor: pointer}
.tabCard a.active{border-color:#ddd; background:#d1dbe5}
.headers{ overflow: hidden; padding: 20px 0 30px 0; }
.headers > span { font-size:40px; color:#444; vertical-align: top }
.tip {border-bottom: solid 1px #ccc; padding: 0 0 20px 0; margin:0 0 40px 0;}
.part50{ width: 49%; display: inline-block; vertical-align: top; box-sizing: content-box; margin-bottom: 20px;}
h1{ overflow: hidden; text-align: center; padding: 40px 0 10px 0; font-weight: normal; display: block; border-bottom:solid 1px #969696; margin-bottom:30px; font-size:20px; height:30px; }
h3 {color:rgb(72, 61, 139); font-size:20px; padding: 0 0 10px 0; font-weight: bold}
h4 { color:rgb(72,61,139); padding: 0 0 10px 0; font-size:16px; font-weight: bold}
h5 { color:rgb(72,61,139); font-weight: bold}
.tableItems { width: 100%; margin:40px auto 40px auto;}
.tableItems > h2 { padding: 10px 0 20px 0; font-size:30px; font-weight: normal; border-bottom:solid 3px #A0C1E2; margin:0 0 20px 0; }
.tableItems.toggleHide{ margin:0 auto 80px auto; }
.table-title {padding: 10px 15px;border-bottom: 1px solid transparent;
    border-bottom-color: transparent;border-top-left-radius: 3px;border-top-right-radius: 3px;}
.table-title h2 {font-size: 24px; color: #FFFFFF; font-weight: normal; }
.table-cont { border:solid 1px #ccc; margin-bottom:20px;}
.table-cont table { width: 100%;}
.table-cont table tr:hover {background: #e1e1e1; cursor: pointer;}
.table-cont table tr td,.table-cont table tr th {text-align:left; padding: 3px 15px; border-left:solid 1px #eee; border-bottom:solid 1px #eee; font-size:14px; }
.table-cont table tr th {    line-height: 2; padding: 8px 15px;}
.table-cont table tr td { line-height: 1.5; position: relative; vertical-align: top }
.table-cont table tr td input{ width:100%; }
.table-cont .introduce{ padding: 15px 20px; line-height: 1.5; text-indent: 2em;}
.table-cont .introduce img {max-width: 96%; }
.text_list{ margin-bottom: 20px; }
.table-cont .table_list {border:solid 1px #ddd; border-left:solid 3px #ddd; margin:0px 20px 20px 20px}
.table-cont .table_list table {border-top:solid 1px #eee;}
.table-cont .table_list table tr th{ font-size:24px; padding-top:20px; padding-bottom:10px;  font-weight: normal;}
.table-cont .table_list table tr td{}
.table-footer{ border:solid 1px #ddd; border-top:none; padding: 10px 15px; }
.table-footer span{ display: inline-block; width: 15%; line-height: 3 }
.dl_tip{ color:#666; margin-bottom:10px; }
.dl_tip dt{ font-size:16px;line-height: 1.5;}
.dl_tip dd{line-height: 1.5;}
.dl_tip dd b{display: inline-block; width: 90px; font-weight: bold}
.fl{float: left;}
.fr { float: right; }
.tableItems{ position: relative; }
.table-edit{ position: absolute; top:13px; right:20px; }
.table-edit a{ color:#fff; font-size:16px; font-weight: bold; text-decoration: none }
.table_add{ position: absolute; top:6px; right:-80px; }
.table_add a{ color:#fff;  text-decoration: none }
.itemsAdd{ position: absolute; top:5px; right:-80px; cursor: pointer; background: #d1dbe5; height:40px; width:auto; line-height: 40px; text-align: center; font-size:14px; padding:0 20px; border-radius: 5px; color:#48576a;}
.toggleHide .itemsAdd { display: block; }
.table-btns { position: absolute; bottom:-60px; height:60px; line-height: 60px; border:solid 1px #ddd;  width:calc(100% - 1px); margin:-1px 0 0 0px;text-align: right; padding-right:10px; box-sizing: border-box; background: #eee;}
.table-btns a{ display: inline-block; font-size:14px; padding:10px 15px; text-align: center; color:#fff; border-radius: 4px; line-height: 1;  margin:5px 10px 5px 0; text-decoration: none;}
.table-btns a.sub{ background: rgb(247, 186, 42); border:solid 1px rgb(247, 186, 42); }
.table-btns a.cancel{ background: #fff; color:#444; border:solid 1px #ddd; }
.table-edit{ display: none;}
.tableItems:hover .table-edit{display: block}
.tableItems.toggleHide:hover .table-edit{display: none}
.tableItems p {    padding: 0 0 20px 0;}
.leftMore{ position: absolute; top:5px; right:20px; }
.el-tag{ cursor: pointer }
.icon-size1 {font-size:16px;}
    .table-describe table{  table-layout:automatic; }
    .color-gray{ color:#ccc; }
    .color-blue{ color:#003366; }
    .color-red{ color:red; }
    .iStyle { font-style: italic; font-weight: bold; }
    .inlineItem li{ display: inline-block; line-height: 3; }
    .list-decimal { padding: 20px 0; }
    .list-decimal li{ list-style: decimal outside; margin: 0 0 0 35px; padding: 5px 0 10px 10px}
    input[type="text"],textarea{ outline: none; border:none; width: 100%; resize:none; background: none; padding:0 5px;  }
    input[type="text"].underline{ border-bottom:solid 1px #444;}
    .innerDiv { position: relative; }
    .innerDiv ul { position: absolute; top:20px; left:-3px; }
    .table-cont table.table-center th,.table-cont table.table-center td{ padding: 8px 7px; text-align: center; font-size:12px; font-weight: bold;}
    .el-dropdown-menu {    width: 42px;    overflow: hidden;    min-width: 20px;}
</style>
<style>
.reportsStyle { font:normal 14px  "微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif; color:#000;}
.reportsStyle input.el-input__inner,.reportsStyle textarea{ border:none; border-radius: 0; height:auto; resize: none }
.reportsStyle .underline input{ border-bottom:solid 1px #444; }
.table-center table.el-table__header th{ padding: 8px 7px; text-align: center; font-size:12px; font-weight: bold;  border-bottom:solid 1px #ccc; background: none;}
.table-center table.el-table__header th>.cell { line-height: 2; background: none }
.cont-items .part50 .el-input.is-disabled .el-input__inner{background: none;border-bottom:solid 1px #444; cursor: auto}
.cont-items .part50 .el-select .el-input .el-input__icon { display: none; }
.reportsStyle .el-table .cell{ padding:0 10px; }
.color_blue .el-textarea__inner { color:blue; }
.underline textarea{ border-bottom:solid 1px #444; }
.underline textarea.el-textarea__inner{padding:0px 5px;}
</style>
