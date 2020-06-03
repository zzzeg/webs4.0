<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>解读报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="leftNav">
      <ul>
        <li v-for="(itemText, index) in navList" :key="index"><a @click="setObj(itemText, pageNum)" :class="{'active':itemText.isCheck === '0' , '':itemText.isCheck === '1'}" href="javascript:;">{{ itemText.blockName }}</a></li>
      </ul>
    </div>
    <div class="rightContent">
      
      <!--基本信息-->
      <div class="blockContent" v-if="reportData.blockKey === 'subjectInformation'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="">
          <!-- <h3>{{ reportData.blockName }}</h3> -->
        </div>
        <table>
          <tr>
            <td>姓　　名：<el-input type="text" @blur="inputSub(reportData.code, '0', 'user_name', reportData.jsonValue.user_name)" class="underline" v-model="reportData.jsonValue.user_name" placeholder="Name" style="width:calc(100% - 11em)"></el-input></td>
            <td>性　　别：
              <el-radio disabled class="radio" v-model="reportData.jsonValue.gender" :label='1'>男</el-radio>
              <el-radio disabled class="radio" v-model="reportData.jsonValue.gender" :label='2'>女</el-radio>
            </td>
          </tr>
          <tr>
            <td>出生日期：
            <span class="underline" style="display:inline-block;padding-left:10px;width:calc(100% - 14em);line-height:2; color:#bbb;">
              {{reportData.jsonValue.birthday | formatDate}}
            </span>
            <!-- <el-input type="text" @blur="inputSub(reportData.code, '0', 'birthday', reportData.jsonValue.birthday)" class="underline" v-model="reportData.jsonValue.birthday" placeholder="Date of Birth" style="width:calc(100% - 14em)"></el-input> -->
            </td>
            <td>种　　族：<el-select v-model="reportData.jsonValue.race" disabled style="width:calc(100% - 9.6em)">
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
            <td>籍　　贯：<el-input type="text" @blur="inputSub(reportData.code, '0', 'nation', reportData.jsonValue.nation)" class="underline" v-model="reportData.jsonValue.nation" placeholder="Nation" style="width:calc(100% - 11em)"></el-input></td>
            <td>电　　话：<el-input type="text" @blur="inputSub(reportData.code, '0', 'phone', reportData.jsonValue.phone)" class="underline" v-model="reportData.jsonValue.phone" placeholder="Phone" style="width:calc(100% - 11em)"></el-input></td>
          </tr>
          <tr>
            <td colspan="2">地　　址：<el-input type="textarea" @blur="inputSub(reportData.code, '0', 'address', reportData.jsonValue.address)" v-model="reportData.jsonValue.address" placeholder="Location" style="width:calc(100% - 9.7em); min-height:40px; vertical-align:text-top"></el-input></td>
          </tr>
        </table>
      </div>

      <!--疾病信息-->
      <div class="blockContent" v-if="reportData.blockKey === 'diseaseInformation'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="">
          <!-- <h3>{{reportData.blockName}}</h3> -->
          <table>
            <tr>
              <td>　临床诊断：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'clinical_diagnosis', reportData.jsonValue.clinical_diagnosis)" v-model="reportData.jsonValue.clinical_diagnosis" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
            <tr>
              <td>　病理诊断：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'pathology_diagnosis', reportData.jsonValue.pathology_diagnosis)" v-model="reportData.jsonValue.pathology_diagnosis" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input>
              </td>
            </tr>
            <tr>
              <td>　　现病史：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'recent_medical_history', reportData.jsonValue.recent_medical_history)" v-model="reportData.jsonValue.recent_medical_history" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
            <tr>
              <td>　　疾病史：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'previous_history', reportData.jsonValue.previous_history)" v-model="reportData.jsonValue.previous_history" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
            <tr>
              <td>　　家族史：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'family_medical_history', reportData.jsonValue.family_medical_history)" v-model="reportData.jsonValue.family_medical_history" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
            <tr>
              <td>　高危风险：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'disease_risk_factory', reportData.jsonValue.disease_risk_factory)" v-model="reportData.jsonValue.disease_risk_factory" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
            <tr>
              <td>既往治疗史：<el-input type="textarea" autosize @blur="inputSub(reportData.code, '0', 'before_medical_history', reportData.jsonValue.before_medical_history)" v-model="reportData.jsonValue.before_medical_history" placeholder="" style="width:calc(100% - 11em); vertical-align:text-top"></el-input></td>
            </tr>
          </table>
        </div>
      </div>
      
      <!--block_06 基因突变-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneMutation'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因突变</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <el-table-column label="基因" width="90">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11)" style="background:red;">
                    {{scope.row.gene}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'gene', scope.row.gene)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="基因" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column> -->
              <el-table-column label="突变">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 1)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'mutation', scope.row.mutation)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="突变">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
                </template>
              </el-table-column> -->
              <el-table-column label="参考序列 ">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 2)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'refSeq', scope.row.refSeq)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 3)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 4)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 4)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 4)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 4)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 9)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <div @contextmenu="showMenu(scope.$index * 11 + 10)" style="background:red;">
                    {{scope.row.mutation}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
      
      <!--block_07 基因融合-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneFusion'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因融合</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <el-table-column label="基因" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="融合">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'fusion', scope.row.fusion)" v-model="scope.row.fusion"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="融合类型 ">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'fusionType', scope.row.fusionType)" v-model="scope.row.fusionType"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!--block_08 基因（mRNA/蛋白）表达-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneExpression'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因（mRNA/蛋白）表达</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <el-table-column label="基因" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="mRNA/蛋白表达">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'expression', scope.row.expression)" v-model="scope.row.expression"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="表达水平">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'expressionLevel', scope.row.expressionLevel)" v-model="scope.row.expressionLevel"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
      
      <!--block_11 基因微卫星不稳定性和错配修复-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneInstability'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因微卫星不稳定性和错配修复</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <!-- <el-table-column label="基因" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column> -->
              <el-table-column label="MSI">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'msi', scope.row.msi)" v-model="scope.row.msi"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="MMR">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'mmr', scope.row.mmr)" v-model="scope.row.mmr"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!--临床入组推荐-->
      <!--RECOMMENDED CLINICAL TRIALS-->
      <div class="blockContent" v-if="reportData.blockKey === 'clinicalTrials'" v-loading="blockLoading">
        <div :class="{'tableItems':part07check === false, 'tableItems toggleHide':part07check === true}" style="margin-top:0;">
          <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
          <!-- <div class="table-title" style="background-color: #003366;">
            <h2>{{ reportData.blockName }}</h2>
            <div class="table-edit"><a href="javascript:;" @click="pushpart07">添加项目</a></div> -->
            <!-- <span class="itemsAdd" title="增加一条" v-show="part07check === true" @click="pushpart07">+添加</span> -->
          <!-- </div> -->
          <div class="table-btns" v-show="part07check === true">
            <!-- <a href="javascript:;" class="sub" @click="part07check = false">退出编辑</a> -->
            <!-- <a href="javascript:;" class="cancel" @click="part07check = false, cancel(reportData, 'block_16')">取消</a> -->
          </div>
          <div class="table-describe">
            <p>根据对受检者基因变异情况、疾病信息、地点及临床试验招募地点、治疗方案和临床试验阶段等信息，从clinicaltrials.gov和chinadrugtrials.org网站筛选出符合条件的正在招募中的临床试验，推荐如下。详细信息请查看ClinicalTrials等相关网站的具体介绍。</p>
            <div class="table-cont" v-for="(recommended, index) in reportData.list">
              <table>
                <tr>
                  <th width="200">{{ index + 1 }}、{{ recommended.clinical_id }}</th>
                  <th align="right"><el-button type="danger" size="small" @click="delListItem(reportData, 'block_16', index)">删除</el-button></th>
                </tr>
                <tr>
                  <td>临床试验题目</td>
                  <td>{{ recommended.clinical_name }}</td>
                </tr>
                <tr>
                  <td>临床试验阶段</td>
                  <td>{{ recommended.phase }}</td>
                </tr>
                <tr>
                  <td>药物/治疗方案</td>
                  <td>{{ recommended.intervention_name }}</td>
                </tr>
                <tr>
                  <td>疾病/适应症</td>
                  <td>{{ recommended.indications }}</td>
                </tr>
                <tr>
                  <td>招募地点</td>
                  <td>{{recommended.recruit_place}}</td>
                </tr>
                <tr>
                  <td>联系方式</td>
                  <td>{{ recommended.contact_information }}</td>
                </tr>
              </table>
            </div>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
        </div>
      </div>

      <!-- 肿瘤细胞免疫治疗临床试验入组推荐-->
      <!--RECOMMENDED CLINICAL TRIALS-->
      <div class="blockContent" v-if="reportData.blockKey === 'tumourTrials'" v-loading="blockLoading">
        <div :class="{'tableItems':part07check === false, 'tableItems toggleHide':part07check === true}" style="margin-top:0px;">
          <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
          <!-- <div class="table-title" style="background-color: #003366;">
            <h2>{{ reportData.blockName }}</h2> -->
            <!-- <div class="table-edit"><a href="javascript:;" @click="pushpart07">添加项目</a></div> -->
            <!-- <span class="itemsAdd" title="增加一条" v-show="part07check === true" @click="pushpart07">+添加</span> -->
          <!-- </div> -->
          <div class="table-describe">
            <p>根据受检者抗原表位、疾病信息、地点及临床试验招募地点等，从clinicaltrials.gov网站筛选出符合条件的正在招募中的细胞免疫治疗相关临床试验，推荐如下。详细信息请查看ClinicalTrials等相关网站的具体介绍。</p>
            <div class="table-cont" v-for="(recommended, index) in reportData.list">
              <table>
                <tr>
                  <th width="200">{{ index + 1 }}、{{ recommended.clinical_id }}</th>
                  <th align="right"><!-- <el-button type="danger" size="small" @click="delListItem(reportData, 'block_21', index)">删除</el-button> --></th>
                </tr>
                <tr>
                  <td>临床试验题目</td>
                  <td>{{ recommended.clinical_name }}</td>
                </tr>
                <tr>
                  <td>临床试验阶段</td>
                  <td>{{ recommended.phase }}</td>
                </tr>
                <tr>
                  <td>药物/治疗方案</td>
                  <td>{{ recommended.intervention_name }}</td>
                </tr>
                <tr>
                  <td>疾病/适应症</td>
                  <td>{{ recommended.indications }}</td>
                </tr>
                <tr>
                  <td>招募地点</td>
                  <td>{{recommended.recruit_place}}</td>
                </tr>
                <tr>
                  <td>联系方式</td>
                  <td>{{ recommended.contact_information }}</td>
                </tr>
              </table>
            </div>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
        </div>
      </div>
      
      <!--肿瘤负荷-->
      <div class="blockContent" v-if="reportData.blockKey === 'tumorLoad'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">肿瘤负荷</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检测项">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'checkItem', scope.row.checkItem)" v-model="scope.row.checkItem"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="突变负荷（个/Mb）">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'judgeStand', scope.row.judgeStand)" v-model="scope.row.judgeStand"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="判断标准">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'mutationalLoad', scope.row.mutationalLoad)" v-model="scope.row.mutationalLoad"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">Del</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 化疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'chemotherapySummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <table>
          <tr>
            <td><i class="icon-circle icon-size1 color-blue"></i> 本癌种</td>
            <td><i class="icon-circle-blank icon-size1 color-blue"></i> 其他癌种</td>
            <td><i class="icon-adjust icon-size1 color-blue"></i> 本癌种和其他癌种</td>
            <td><i class="icon-ban-circle icon-size1 color-red"></i> 禁忌</td>
            <td><i class="icon-remove icon-size1 color-gray"></i> 无循证医学证据</td>
            <!-- <td> (IV), (III), (II/III), (II), (I/II), (I)临床试验阶段</td> -->
          </tr>
        </table>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 化疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'chemotherapyDetails'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 免疫检查点抑制剂治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'checkpointSummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <table>
          <tr>
            <td><i class="icon-circle icon-size1 color-blue"></i> 本癌种</td>
            <td><i class="icon-circle-blank icon-size1 color-blue"></i> 其他癌种</td>
            <td><i class="icon-adjust icon-size1 color-blue"></i> 本癌种和其他癌种</td>
            <td><i class="icon-ban-circle icon-size1 color-red"></i> 禁忌</td>
            <td><i class="icon-remove icon-size1 color-gray"></i> 无循证医学证据</td>
            <!-- <td> (IV), (III), (II/III), (II), (I/II), (I)临床试验阶段</td> -->
          </tr>
        </table>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 免疫检查点抑制剂治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'checkpointDetails'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- CAR-T细胞免疫治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'cartSummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <!-- <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- CAR-T细胞免疫治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'cartDetails'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
      
      <!-- 其他治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'otherSummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 其他治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'otherDetails'" v-loading="blockLoading">
        <h3>{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- HLA基因-->
      <div class="blockContent" v-if="reportData.blockKey === 'hLAGene'" v-loading="blockLoading">
        <h4 style="margin-top:10px;">HLA基因</h4>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="HLA">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'hla', scope.row.hla)" v-model="scope.row.hla"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="　">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'hla1', scope.row.hla1)" v-model="scope.row.hla1"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="Allele 1">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'alleleOne', scope.row.alleleOne)" v-model="scope.row.alleleOne"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="Allele 2">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'alleleTwo', scope.row.alleleTwo)" v-model="scope.row.alleleTwo"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!--block_09 基因扩增-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneAmplification'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因扩增</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <el-table-column label="基因" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="融合">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'amplification', scope.row.amplification)" v-model="scope.row.amplification"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 放疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'radiotherapySummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 放疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'radiotherapyDetails'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 靶向治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'tagSummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 靶向治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'tagDetails'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="药物">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!--block_10 基因拷贝数变异-->
      <div class="blockContent" v-if="reportData.blockKey === 'copyNumberVariations'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">基因拷贝数变异</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的基因突变">
              <el-table-column label="　基因　" width="90">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="拷贝数">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'copy', scope.row.copy)" v-model="scope.row.copy"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="拷贝水平">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'copyLevel', scope.row.copyLevel)" v-model="scope.row.copyLevel"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!--block_15 预后相关解读信息-->
      <div class="blockContent" v-if="reportData.blockKey === 'prognostisInformation'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative;">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异" @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="对预后的影响">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'influenceOnPrognosis', scope.row.influenceOnPrognosis)" v-model="scope.row.influenceOnPrognosis"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO指南">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model="scope.row.nccnCsCo"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="FDA/CFDA">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model="scope.row.fdaCfda"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="其他指南共识">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model="scope.row.other"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床试验阶段">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model="scope.row.clinicalTrails"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床前试验阶段">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model="scope.row.preClinicalTrails"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="功能预测">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model="scope.row.functionPrediction"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 靶向治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'prognostisInformationDetail'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因变异">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="基因"  @blur="inputSub(reportData.code, scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                <el-input type="textarea" autosize placeholder="变异"  @blur="inputSub(reportData.code, scope.row.code, 'mutation', scope.row.mutation)" v-model="scope.row.mutation"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="对预后的影响">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'influenceOnPrognosis', scope.row.influenceOnPrognosis)" v-model="scope.row.influenceOnPrognosis" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
      
      <!-- 样本信息-->
      <div class="blockContent" v-if="reportData.blockKey === 'specimenInformation'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{reportData.blockName}}</h3>
        <ul class="inlineItem">
          <li style="width:49%">样本 ID：<el-input type="text" @blur="inputSub(reportData.code, '0', 'sample_id', reportData.jsonValue.sample_id)" class="underline" v-model="reportData.jsonValue.sample_id" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
          <li style="width:49%">样本类型：<el-input type="text" @blur="inputSub(reportData.code, '0', 'sample_type', reportData.jsonValue.sample_type)" class="underline" v-model="reportData.jsonValue.sample_type" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
          <li style="width:49%">样本属性：<el-input type="text" @blur="inputSub(reportData.code, '0', 'sample_attribute', reportData.jsonValue.sample_attribute)" class="underline" v-model="reportData.jsonValue.sample_attribute" placeholder="" style="width:calc(100% - 16em)"></el-input></li>
          <li style="width:49%">样本采集时间：
            <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(100% - 22em); line-height:2;">
              {{reportData.jsonValue.sample_collection_time | formatDate}}
            </span>
            <!-- <el-date-picker
              v-model="reportData.jsonValue.sample_testing_time"
              format="yyyy-MM-dd hh:mm:ss"
              :editable='false'
              type="date"
              class="underline"
              placeholder="选择日期"
              style="width:calc(100% - 20em)">
            </el-date-picker> -->
          </li>
          <li style="width:49%">样本检测时间：
            <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(100% - 22em);line-height:2;">
              {{reportData.jsonValue.sample_testing_time | formatDate}}
            </span>
            <!-- <el-date-picker
              v-model="reportData.jsonValue.sample_collection_time"
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

      <!-- 肿瘤疫苗治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'vaccinesSummary'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
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
            <el-table-column label="FDA/CFDA 批准的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
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
            <el-table-column label="其他指南/共识推荐的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
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
            <el-table-column label="临床研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
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
            <el-table-column label="临床前研究阶段的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
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
            <el-table-column label="功能预测的治疗方案">
              <template scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
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
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>

      <!-- 肿瘤疫苗治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'vaccinesDetails'" v-loading="blockLoading">
        <h3>{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'drug', scope.row.drug)" v-model="scope.row.drug" :class="{'color_blue':scope.row.isHealthInsurance === '是', ' ':scope.row.isHealthInsurance === '否'}"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template scope="scope">
                <el-input type="textarea" autosize placeholder="临床注释"  @blur="inputSub(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence)" v-model="scope.row.clinicalEvidence"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
      
      <!-- 检测平台信息及分析参考类目-->
      <div class="blockContent" v-if="reportData.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory'" v-loading="blockLoading">
        <div class="tableItems">
            <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blockName }}</h2>
            </div>
            <div class="table-cont">
              <table>
                <tr>
                  <td width="35%">检测信息</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'sequencing_information', reportData.list.sequencing_information)" v-model="reportData.jsonValue.sequencing_information"></el-input></td>
                </tr>
                <tr>
                  <td>测序平台</td>
                  <td>
                    <!-- <el-input type="text" @blur="inputSub('block_04', '0', 'sequencing_platform', reportData.jsonValue.sequencing_platform)" v-model="reportData.jsonValue.sequencing_platform"></el-input> -->
                    <el-select  v-model="reportData.jsonValue.sequencing_platform" style="width:100%" clearable placeholder="请选择" @change="inputSub('block_04', '0', 'sequencing_platform', reportData.jsonValue.sequencing_platform)">
                      <el-option v-for="item in reportData.jsonValue.sequencing_platform_init" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>检测基因数目</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'test_gene_num', reportData.jsonValue.test_gene_num)" v-model="reportData.jsonValue.test_gene_num" ></el-input></td>
                </tr>
                <tr>
                  <td>检测基因列表</td>
                  <td style="padding:5px 25px;">
                    <!-- <el-input type="textarea" autosize  @blur="inputSub('block_04', '0', 'genes', reportData.jsonValue.genes)" v-model="reportData.jsonValue.genes"></el-input> -->
                    <!-- <p style="word-break: break-all; font-size:12px;padding:5px 10px">{{ geneList }}</p> -->
                    <!-- <el-input type="textarea" autosize readonly v-model="geneList"></el-input> -->
                    <span style="font-size:12px;" :class="{'':i.checkOut === false, 'color-red':i.checkOut === true}" v-for="(i, index) in geneList">{{ i.value }}，</span>
                  </td>
                </tr>
                <tr>
                  <td>参考基因组</td>
                  <td><el-input type="text" @blur="inputSub('block_04', '0', 'ref', reportData.jsonValue.ref)" v-model="reportData.jsonValue.ref"></el-input></td>
                </tr>
                <tr>
                  <td>知识库版本</td>
                  <td><!-- <el-input type="text" @blur="inputSub('block_04', '0', 'analysis_version', reportData.jsonValue.analysis_version)" v-model="reportData.jsonValue.analysis_version"></el-input> -->
                    <el-select  v-model="reportData.jsonValue.analysis_version" style="width:100%" clearable placeholder="请选择" @change="inputSub('block_04', '0', 'analysis_version', reportData.jsonValue.analysis_version)">
                      <el-option v-for="item in reportData.jsonValue.analysis_version_init" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>分析流程版本</td>
                  <td>
                    <!-- <el-input type="text" @blur="inputSub('block_04', '0', 'analysis_version', reportData.jsonValue.analysis_version)" v-model="reportData.jsonValue.analysis_version"></el-input> -->
                    <el-input type="text" readonly value="Bainuo_ OncoAnalyzer_exon_ Version 0.5"></el-input>
                  </td>
                </tr>
              </table>
            </div>
            <p>* 检测基因列表中所列出的基因，红色标注的为阳性结果，黑色为阴性结果。</p>
          </div>
        </div>
      
      <!--REFERENCES--><!--block_22 参考文献-链接列表-->
      <div class="blockContent" v-if="reportData.blockKey === 'reference'" v-loading="blockLoading">
        <div :class="{'tableItems':part09check === false, 'tableItems toggleHide':part09check === true}">
          <div class="table-title" style="background-color: #003366;">
            <h2>{{ reportData.blockName }}</h2>
            <div class="table-edit"><a href="javascript:;" @click="part09check = true">编辑</a></div>
            <span class="itemsAdd" title="增加一条" v-show="part09check === true" v-loading='addLoading' @click="pushListItem('add')">+添加</span>
          </div>
          <div class="table-btns" v-show="part09check === true">
            <a href="javascript:;" class="sub" @click="part09check = false">退出编辑</a>
            <!-- <a href="javascript:;" class="cancel" @click="part09check = false, cancel(reportData, 'block_22')">取消</a> -->
          </div>
          <div class="table-cont" v-show="part09check === false">
            <div class="introduce">
                <p v-for="(itemr, indexer) in reportData.list">{{ indexer + 1 }}、<a :href="itemr.literature_url">{{itemr.literature_name}}</a></p>
            </div>
            <div class="introduce" v-if="reportData.list.length < 1">
              <p style="text-align:center; color:#999">没有数据</p>
            </div>
          </div>
          <div class="toggleHide"  v-show="part09check === true">
            <el-table class="needRemove" :data="reportData.list">
              <el-table-column type="index" label="序号" style="text-align:left" width="100"></el-table-column>
              <el-table-column label="标题">
                <template scope="scope">
                  <el-col :span="18"><el-input type="text" @blur="inputSub('block_22', scope.row.code, 'literature_name', scope.row.literature_name)" v-model="scope.row.literature_name"></el-input></el-col>
                </template>
              </el-table-column>
              <el-table-column label="链接地址">
                <template scope="scope">
                  <el-col :span="18"><el-input type="text" @blur="inputSub('block_22', scope.row.code, 'literature_url', scope.row.literature_url)" v-model="scope.row.literature_url"></el-input></el-col>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      
      <!--推荐治疗方案-->
      <div class="blockContent" v-if="reportData.blockKey === 'recommendedTreatment'" v-loading="blockLoading">
        <h3 style="margin-bottom:15px;">{{ reportData.blockName }}</h3>
        <div class="treatTop" style="margin-bottom:10px; text-indent:2em;">{{formData.start}}</div>
        <div class="treatContent" v-for="(listItem, index) in formData.drugs">
          <h4 style="line-height:1.6; margin-top:20px;">{{ index + 1 }}、{{listItem.description}}</h4>
          <div v-if="listItem.referenceList.length > 0" style="margin-bottom:10px;">
            <b style="margin-bottom: 10px;">临床注释：</b>
            <p style="margin:0 0 10px 2em;" v-for="(listee, indexer) in listItem.referenceList">{{ index + 1 }}.{{ indexer + 1 }}&nbsp;&nbsp;{{ listee.reference }}</p>
          </div>
          <div v-if="listItem.variantInfluences !== ''" style="margin-bottom:10px;">
            <b style="margin-bottom: 10px;">影响：</b>
            <p style="margin:0 0 10px 2em;">{{ listItem.variantInfluences}}</p>
          </div>
        </div>
        <div class="treatbottom">{{formData.end}}</div>
        <el-form :model="formData" :rules="rules" ref="formData" style="margin-top:50px;">
          <!-- <el-form-item>
            <el-col :span="24">
              <el-form-item prop="description">
               <el-input type="textarea" :rows="10" v-model="formData.description" placeholder="小结内容"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item> -->
          <el-form-item>
            <el-button type="success" :loading="isLoading" @click="setSummary()">
              {{ isLoading ? 'subLoading...' : '生成方案' }}
            </el-button>
            <el-button type="primary" :loading="isLoading" @click="subSummary('formData')">
              {{ isLoading ? 'subLoading...' : '提交' }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-table class="needRemove" :data="reportDataList.list">
          <el-table-column type="index" label="序号" style="text-align:left" width="100"></el-table-column>
          <el-table-column prop="description" label="小结内容">
          </el-table-column>
          <el-table-column  prop="createTime" :formatter="dateFormat" label="时间" width="200">
          </el-table-column>
        </el-table>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getSummaryList"></pager>
      </div>

      <!-- 建议增加的检测项目-->
      <div class="blockContent" v-if="reportData.blockKey === 'recommendItem'" v-loading="blockLoading">
        <h3 style="margin-bottom:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检测项目" width="360">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'itemName', scope.row.itemName)" v-model="scope.row.itemName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="临床意义">
              <template scope="scope">
                <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'meaning', scope.row.meaning)" v-model="scope.row.meaning"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--疾病信号通路图-->
      <div class="blockContent" v-if="reportData.blockKey === 'diseasePathway'" v-loading="blockLoading">
        <div :class="{'tableItems':part08check === false, 'tableItems toggleHide':part08check === true}">
          <div class="table-title" style="background-color: #003366;">
            <h2>{{ reportData.blockName }}</h2>
            <div class="table-edit"><a href="javascript:;" @click="part08check = true">编辑</a></div>
          </div>
          <br/>
          <h3>NSCLC: map05223</h3>
          <div class="table-btns" v-show="part08check === true">
            <a href="javascript:;" class="sub" @click="part08check = false">退出编辑</a>
            <!-- <a href="javascript:;" class="cancel" @click="part08check = false, cancel(reportData.blocks.block_18, 'block_18')">取消</a> -->
          </div>
          <div class="table-cont">
            <div class="introduce" v-show="part08check === false" v-for="itemr in reportData.list">
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
                      :data="upData"
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
      </div>

      <!--Disclaimer   block_23 免责声明-->
      <div class="blockContent" v-if="reportData.blockKey === 'disclaimer'" v-loading="blockLoading">
        <h3 style="margin-bottom:10px;">{{ reportData.blockName }}</h3>
        <div class="tableItems">
          <!-- <div class="table-title" style="background-color: #003366;">
            <h2>{{ reportData.blockName }}</h2>
          </div> -->
          <br/>
          <p style="line-height: 2; padding: 0 10px;">
            <el-input type="textarea" autosize  @blur="inputSub('block_23', '0', 'disclaimer', reportData.jsonValue.disclaimer)" v-model="reportData.jsonValue.disclaimer" placeholder="Disclaimer"></el-input>
          </p>
          
          <p style="text-align: right; line-height: 4; padding: 20px 40px 0 0">
            审核人签名: 
            <!-- <el-input type="text" @blur="inputSub('block_23', '0', 'user_name', reportData.jsonValue.user_name)" class="underline" v-model="reportData.jsonValue.user_name" placeholder="Signature of Auditor" style="width:calc(20% - 5em)"></el-input> -->
            <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(20% - 5em);line-height:2;">
              <!-- {{reportData.blocks.block_01.jsonValue.birthday | formatDate}} -->
            </span>
            日期：
            <span class="underline" style="display:inline-block; border-bottom:solid 1px #444;padding-left:10px;width:calc(20% - 5em);line-height:2;">
              <!-- {{reportData.blocks.block_01.jsonValue.birthday | formatDate}} -->
            </span>
            <!-- <el-input type="text" @blur="inputSub('block_23', '0', 'user_name', reportData.jsonValue.user_name)" class="underline" v-model="reportData.jsonValue.user_name" placeholder="Date" style="width:calc(20% - 5em)"></el-input> -->
          </p>
        </div>
      </div>

      <!--染色体变异-->
      <div class="blockContent" v-if="reportData.blockKey === 'chromosomeAbnormality'" v-loading="blockLoading">
        <h3 style="margin-top:10px;">{{reportData.blockName}}</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检出的染色体异常情况">
              <el-table-column label="染色体异常">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'chromosomeAbnormality', scope.row.chromosomeAbnormality)" v-model="scope.row.chromosomeAbnormality"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="检出情况">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'checkResult', scope.row.checkResult)" v-model="scope.row.checkResult"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)" v-model="scope.row.clinicalSignificance"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO 指南推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)" v-model.number="scope.row.nccnCscoCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA 批准的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)" v-model.number="scope.row.fdaCfadCount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="其他指南/共识推荐的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other_count', scope.row.other_count)" v-model.number="scope.row.other_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)" v-model.number="scope.row.clinicalTrails_count"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究阶段的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="功能预测的治疗方案">
                <template scope="scope">
                  <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => changeCheck(codeObj, val)"></pager>
      </div>
    

      <el-dialog title="内容编辑" :visible.sync="changeDialog">
        <el-form :model="vauleForm">
          <el-form-item>
            <el-input type="textarea" autosize v-model="vauleForm.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeDialog = false">取 消</el-button>
          <el-button type="primary" @click="inputSub(changeFrom.blockInstanceCode, changeFrom.fieldCode, changeFrom.fieldName, vauleForm.content)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import Pager from '@/components/common/pager'
  import moment from 'moment'
  import {formatDate} from '@/common/js/Utils.js'
  import VueContextMenu from 'vue-contextmenu'
  export default {
    created () {
      this.getNavList()
    },
    name: 'app',
    components: {
      Pager: Pager
    },
    data () {
      return {
        code: this.$route.params.id,
        language: 'CN',
        navList: [],
        formInline: {
          code: '',
          drug: '',
          gene: '',
          mutation: '',
          sourceEvidence: '',
          langType: '',
          projectCode: ''
        },
        imgUploadUrl: URL.api_name + 'report/block_instance/diagram_file/upload',
        updata: {
          blockInstanceCode: '',
          token: JSON.parse(localStorage.getItem('authtoken'))
        },
        formData: {
          description: ''
        },
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
        searchTypes: [{
          label: '本癌肿',
          value: 1
        },{
          label: '其他癌肿',
          value: 2
        },{
          label: '本癌肿和其他癌肿',
          value: 3
        },{
          label: '禁忌',
          value: 4
        },{
          label: '无循证医学证据',
          value: 5
        }],
        codeObj: {},
        part08check: false,
        part09check: false,
        geneList: [],
        fileList: [],
        part07check: false,
        blockLoading: true,
        pageSize: 8,
        pageNum: 1,
        totalCount: 0,
        reportData: {},
        reportDataList: {},
        changeDialog: false,
        vauleForm: {
          content: ''
        },
        // contextmenu data (菜单数据)
        transferIndex: null,
        contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
          menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
          axios: {
            x: null,
            y: null
          },
        // Menu options (菜单选项)
          menulists: [
            {
              fnHandler: 'editCont',
              icoName: 'fa fa-home fa-fw',
              btnName: '编辑'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '菜单一(暂无功能)'
            },
            {
              fnHandler: 'savedata', // Binding events(绑定事件)
              icoName: 'fa fa-home fa-fw', // icon (icon图标 )
              btnName: '菜单二(暂无功能)' // The name of the menu option (菜单名称)
            }
          ]
        },
        changeFrom: {
          blockInstanceCode: '',
          fieldCode: '',
          fieldName: '',
          fieldValue: ''
        }
        // over
      }
    },
    methods: {
      showMenu (index) {
        let that = this
        let sss = index
        that.transferIndex = sss
        event.preventDefault()
        // alert(index)
        // return false
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
      },
      savedata () {
        alert('暂无功能')
      },
      newdata () {
        alert('暂无功能')
      },
      editCont(code, filecode, filedName, filedValue) {
        // 编辑的菜单
        let that = this
        // alert(filedValue)
        // return false
        that.changeDialog = true
        that.vauleForm.content = filedValue
        // 把传来的值，赋给新的变量
        that.changeFrom.blockInstanceCode = code
        that.changeFrom.fieldCode = filecode
        that.changeFrom.fieldName = filedName
        that.changeFrom.fieldValue = that.vauleForm.content
      },
      getNavList () {
        // 获取导航列表
        var that = this
        // let url = './static/navList.json'
        let url = URL.api_name + 'report/examine_info'
        axios.get(url, {
          params: {
            // projectCode: 'def61b86b1b0445b86b57a6f1be9b4dd'
            langType: that.language,
            projectCode: that.code
          }
        }).then(function (res) {
          that.navList = res.data.data
          that.navList[0].isCheck = "0"
          that.changeCheck(that.navList[0], that.pageNum)
          // if (res.data.code === '100') {
          // }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      search () {
        // 模块内搜索
        let that = this
        if (that.pageNum > 1) {
          that.pageNum = 1
        } else {
          that.changeCheck(that.codeObj, that.pageNum)
        }
      },
      setObj (itemText, num) {
        let that = this
        // 每次点击初始化页码
        that.pageNum = 1
        that.codeObj = itemText
        that.changeCheck(that.codeObj, that.pageNum)
      },
      dateFormat (row, column) {
        let date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      changeCheck (itemText, num) {
        // 点击左侧模块导航，请求右侧详情
        // itemText参数为 blockInfo  整块内容
        // console.log(itemText)
        let that = this
        that.blockLoading = true
        that.pageNum = num
        that.totalCount = 0
        that.reportData = {}
        for (let i = 0; i < that.navList.length; i++) {
          that.navList[i].isCheck = "1"
        }
        if (itemText.isCheck === "1") {
          itemText.isCheck = "0"
        }
        axios.get(URL.api_name + 'report/examine_detail', {
          params: {
            code: itemText.code,
            pageNum: num,
            pageSize: that.pageSize
          }
        }).then((res) => {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            // 如果有jsonValue，则是单表格
            if (res.data.data.jsonValue) {
              that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            } else if (res.data.data.list) {
              that.totalCount = res.data.data.total
            }
            if (itemText.blockKey === 'subjectInformation') {
              // 重设"基本信息"里的 race 种族的显示文本内容
              for (let n = 0; n < that.races.length; n++) {
                if (that.reportData.jsonValue.race === that.races[n].value) {
                  that.reportData.jsonValue.race = that.races[n].label
                }
              }
            }
            // geneList
            if (itemText.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory') {
              that.geneList = []
              for (let s in that.reportData.jsonValue.genes) {
                // that.geneList = that.geneList + s + ',' 
                that.geneList.push({
                  value: s,
                  checkOut: that.reportData.jsonValue.genes[s]
                })
              }
            }
            // 小结
            if (itemText.blockKey === 'recommendedTreatment') {
              // alert('xxee')
              that.getSummaryList(that.pageNum)
            } 

            if (itemText.blockKey === 'diseasePathway') {
              // 图片
              that.fileList = []
              for (let imgL = 0; imgL < that.reportData.list.length; imgL++) {
                that.fileList.push({
                  url: that.reportData.list[imgL].pathway_path,
                  name: that.reportData.list[imgL].pathway_name
                })
              }
            }
            
            that.blockLoading = false
            // console.log(that.reportData.list)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      inputSub (code, filecode, filedName, filedValue) {
        // 单个修改提交
        let that = this
        // 关闭修改的dialog
        that.changeDialog = false
        if (filecode === '0') {
          filecode = ''
        }
        axios.post(URL.api_name + 'report/field_update', {
          projectCode: that.reportData.projectCode,
          blockInstanceCode: code,
          fieldCode: filecode,
          fieldName: filedName,
          fieldValue: filedValue
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            that.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000
            })
          } else {
            // console.log(error)
            that.$message({
              type: 'error',
              message: '提交失败：' + res.data.message,
              duration: 1000
            })
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '提交失败',
            duration: 1000
          })
        })
      },
      getSummaryList(num) {
        let that = this
        // alert('xxeeeeee')
        axios.get(URL.api_name + 'report/description_list', {
          params: {
            langType: that.language,
            projectCode: that.code,
            pageSize: 5,
            pageNumber: num
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportDataList = res.data.data
            that.totalCount = res.data.data.total
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      pushListItem(type, listCode) {
        // 添加删除操作
        let that = this
        let postParame = {}
        if (type === 'add') {
          postParame['info'] = {}
          for (let n in that.reportData.list[0]) {
            postParame.info[n] = ''
          }
          postParame['pageSize'] = that.pageSize
          postParame['blockKey'] = that.reportData.blockKey
          postParame['blockInstanceCode'] = that.reportData.code
          postParame['projectCode'] = that.reportData.projectCode
        } else if (type === 'del') {
          postParame['pageSize'] = that.pageSize
          postParame['fieldCode'] = listCode
          postParame['blockInstanceCode'] = that.reportData.code
          postParame['projectCode'] = that.reportData.projectCode
        }
        // return false
        // 提交添加操作
        axios.post(URL.api_name + 'report/field_update', postParame).then(function (res) {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            // 如果有jsonValue，则是单表格
            if (res.data.data.jsonValue) {
              that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            } else if (res.data.data.list) {
              that.totalCount = res.data.data.total
            }
            if (that.reportData.blockKey === 'subjectInformation') {
              // 重设"基本信息"里的 race 种族的显示文本内容
              for (let n = 0; n < that.races.length; n++) {
                if (that.reportData.jsonValue.race === that.races[n].value) {
                  that.reportData.jsonValue.race = that.races[n].label
                }
              }
            }
            // geneList
            if (that.reportData.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory') {
              that.geneList = []
              for (let s in that.reportData.jsonValue.genes) {
                // that.geneList = that.geneList + s + ',' 
                that.geneList.push({
                  value: s,
                  checkOut: that.reportData.jsonValue.genes[s]
                })
              }
            }
            // 小结
            if (that.reportData.blockKey === 'recommendedTreatment') {
              // alert('xxee')
              that.getSummaryList(that.pageNum)
            }
            
            that.blockLoading = false
            console.log(that.reportData)
            // that.reportData.blocks[part] = res.data.data
            // 取消加载状态
            // that.addLoading = false
            // console.log(that.reportData.block_09)
            // that.setBlocks06()
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '提交失败',
            duration: 1000
          })
        })
      },
      blockSearch (itemText) {
        // 点击搜索
        let that = this
        // that.formInline = {}
        // if (itemText.blockKey === 'cartSummary') {
        //   that.formInline.drug = '',
        //   that.formInline.gene = '',
        //   that.formInline.mutation = '',
        //   that.formInline.sourceEvidence = ''
        // } else if (itemText.blockKey === 'xxx') {
        //   // 第二个
        // }
        // 重新获取内容信息
        that.blockLoading = true
        that.pageNum = 1
        that.totalCount = 0
        that.reportData = {}
        for (let i = 0; i < that.navList.length; i++) {
          that.navList[i].isCheck = "1"
        }
        if (itemText.isCheck === "1") {
          itemText.isCheck = "0"
        }
        axios.get(URL.api_name + 'report/examine_detail', {
          params: {
            code: itemText.code,
            isSearch: '1',
            drug: that.formInline.drug,
            gene: that.formInline.gene,
            mutation: that.formInline.mutation,
            sourceEvidence: that.formInline.sourceEvidence,
            langType: that.formInline.langType,
            projectCode: that.formInline.projectCode,
            pageNum: 1,
            pageSize: that.pageSize
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            // 如果有jsonValue，则是单表格
            if (res.data.data.jsonValue) {
              that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            } else if (res.data.data.list) {
              that.totalCount = res.data.data.total
            }
            if (itemText.blockKey === 'subjectInformation') {
              // 重设"基本信息"里的 race 种族的显示文本内容
              for (let n = 0; n < that.races.length; n++) {
                if (that.reportData.jsonValue.race === that.races[n].value) {
                  that.reportData.jsonValue.race = that.races[n].label
                }
              }
            }
            // geneList
            if (itemText.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory') {
              that.geneList = []
              for (let s in that.reportData.jsonValue.genes) {
                // that.geneList = that.geneList + s + ',' 
                that.geneList.push({
                  value: s,
                  checkOut: that.reportData.jsonValue.genes[s]
                })
              }
            }
            // 小结
            if (itemText.blockKey === 'recommendedTreatment') {
              // alert('xxee')
              // that.formData = res.data.data
              that.getSummaryList(that.pageNum)
            }
            
            that.blockLoading = false
            // console.log(that.reportData.list)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败',
            duration: 1000
          })
        })
      },
      setSummary () {
        // 生成小结l
        let that = this
        axios.get(URL.api_name + 'report/make_recommended_treatment', {
          params: {
            projectCode: that.reportData.projectCode,
            langType: that.language
          }
        }).then(function (res) {
          // that.$message({
          //   type: 'success',
          //   message: '提交中...请等待或几分钟后刷新查看结果...',
          //   duration: 2000
          // })
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: '生成成功',
              duration: 1000
            })
            let drugs = ''
            for (let i = 0; i < res.data.data.drugs.length; i++) {
              drugs += res.data.data.drugs[i]
            }
            console.log(drugs)
            that.formData = res.data.data
            that.formData.description = res.data.data.start + drugs + res.data.data.end
            console.log(that.formData.description)
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '提交失败',
            duration: 1000
          })
        })
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
            message: '提交失败',
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
    }
  }
</script>
<style scoped>
.leftNav{ width:250px; background:none; min-height:200px; max-height: calc(100% - 255px); overflow: auto; padding:20px 0; position: fixed; top:130px; left:270px;}
.leftNav li a{display:block; font-size:13px; text-decoration:none; color:#444; line-height:2; padding:0 10px 0 30px; position:relative;}
.leftNav li a:before{ display:block; position: absolute; top:5px; left:8px; width:14px; height:14px; content:''; border:solid 1px #ccc; border-radius:50%;}
.leftNav li a.active:before{ background:#31b0d5;}
.leftNav li a:after{display:block; position: absolute; top:22px; left:16px; width:1px; height:7px; content:''; border-left:solid 1px #ccc;}
.rightContent{ margin-left:260px; background:#fff; height:700px; overflow: auto;border:solid 1px #ddd; padding:20px 100px 0px 40px;}


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
h3 {color:rgb(72, 61, 139); font-size:20px; padding: 10px 0 10px 0; font-weight: bold}
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
.reportsStyle input.el-input__inner,.reportsStyle textarea{ border:none; border-radius: 0; height:auto; resize: none; background:none; }
.reportsStyle .underline input{ border-bottom:solid 1px #444; }
.table-center table.el-table__header th{ padding: 8px 7px; text-align: center; font-size:12px; font-weight: bold;  border-bottom:solid 1px #ccc; background: none;}
.table-center table.el-table__header th>.cell { line-height: 2; background: none }
.cont-items .part50 .el-input.is-disabled .el-input__inner{background: none;border-bottom:solid 1px #444; cursor: auto}
.cont-items .part50 .el-select .el-input .el-input__icon { display: none; }
.reportsStyle .el-table .cell{ padding:0 10px; }
.color_blue .el-textarea__inner { color:blue; }
.underline textarea{ border-bottom:solid 1px #444; }
.underline textarea.el-textarea__inner{padding:0px 5px;}
.blockContent table textarea,.blockContent table input{ border:none; background: none; }
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
.leftNav::-webkit-scrollbar{
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
.leftNav::-webkit-scrollbar-track{
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
    border-radius: 10px;
    background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.leftNav::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
    background-color: #ddd;
}

.blockContent .vue-contextmenu-listWrapper{border: 1px solid rgba(0, 0, 0, 0.2); box-shadow: 2px 2px 2px #ccc; background: #fff; padding:10px 0;}
.blockContent .vue-contextmenu-listWrapper .context-menu-list{ width:auto; }
.blockContent .vue-contextmenu-listWrapper .context-menu-list button {padding: 0 20px; font-size: 14px; font-family: '微软雅黑'; background: #fff;}
.blockContent .vue-contextmenu-listWrapper .context-menu-list button:hover{color: #ffffff;
    text-decoration: none;
    background-color: #0088cc;
    background-color: #0081c2;
    background-image: -moz-linear-gradient(top, #0088cc, #0077b3);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));
    background-image: -webkit-linear-gradient(top, #0088cc, #0077b3);
    background-image: -o-linear-gradient(top, #0088cc, #0077b3);
    background-image: linear-gradient(to bottom, #0088cc, #0077b3);
    background-repeat: repeat-x;
    filter: progid: dximagetransform.microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0); }
</style>
