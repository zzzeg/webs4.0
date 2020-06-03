<template>
  <div class="list" style="position:relative">
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
    <div class="rightContent" v-loading="blockLoading">
      
      <!--基本信息--><!--不给修改-->
      <div class="blockContent" v-if="reportData.blockKey === 'subjectInformation'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <table class="inlineItem">
          <tr>
            <td width="50px">姓名：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.user_name }}&nbsp;</div></td>
            <td width="50px">性别：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.gender === 1 ? '男' : reportData.jsonValue.gender === 2 ? '女' : '错误' }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.age}}&nbsp;</div></td>
            <td>国籍：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.race }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>籍贯：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.nation }}&nbsp;</div></td>
            <td>电话：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.phone }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>地址：</td>
            <td colspan="3"><div class="tableListItem" style="width: 96%;">{{ reportData.jsonValue.address }}&nbsp;</div></td>
          </tr>
        </table>
      </div>

      <!--疾病信息--><!--不给修改-->
      <div class="blockContent" v-if="reportData.blockKey === 'diseaseInformation'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <table class="inlineItem">
          <tr>
            <td width="96px">临&nbsp;床&nbsp;诊&nbsp;断：&nbsp;</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.clinical_diagnosis }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>病&nbsp;理&nbsp;诊&nbsp;断：&nbsp;</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.pathology_diagnosis }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>现&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;&nbsp;&nbsp;史：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.recent_medical_history }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>疾&nbsp;&nbsp;&nbsp;&nbsp;病&nbsp;&nbsp;&nbsp;史：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.previous_history }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>家&nbsp;&nbsp;&nbsp;&nbsp;族&nbsp;&nbsp;&nbsp;史：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.family_medical_history }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>高&nbsp;危&nbsp;风&nbsp;险：&nbsp;</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.disease_risk_factory }}&nbsp;</div></td>
          </tr>
          <tr>
            <td>既往治疗史：</td>
            <td><div class="tableListItem">{{ reportData.jsonValue.before_medical_history }}&nbsp;</div></td>
          </tr>
        </table>
      </div>
      
      <!--block_06 基因突变-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneMutation'" element-loading-text="拼命加载中">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <!-- <el-input size="medium" v-model="formInline.gene" placeholder="请输入名称"></el-input> -->
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center" @sort-change="sortChange">
            <el-table-column label="基因突变检出情况">
              <el-table-column label="基因" prop="gene" width="90" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12)">
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
              <el-table-column label="突变" prop="mutation" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 1)">
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
              <el-table-column label="基因组定位 " prop="refSeq" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 2)">
                    {{scope.row.refSeq}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'refSeq', scope.row.refSeq)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="基因型" prop="geneType" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 3)">
                    {{scope.row.geneType}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'geneType', scope.row.geneType)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="丰度" prop="allelicDepth" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 4)">
                    {{scope.row.allelicDepth}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'allelicDepth', scope.row.allelicDepth)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 5)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO" width="120" prop="nccnCscoCount" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 6)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA" width="120" prop="fdaCfadCount" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 +7)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他" width="120" prop="other_count" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 8)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究" width="120" prop="clinicalTrails_count" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 9)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究" width="120" prop="preClinicalTrails" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 10)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测" width="120" prop="functionPrediction" sortable="custom">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 12 + 11)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      
      <!--block_07 基因融合-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneFusion'">
        <h3 style="margin-top:12px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="基因融合检出情况">
              <el-table-column label="基因" width="90">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9)">
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
              <el-table-column label="融合">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 1)">
                    {{scope.row.fusion}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fusion', scope.row.fusion)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-model="scope.row.fusion" @change="inputSub(reportData.code, scope.row.code, 'fusion', scope.row.fusion)" placeholder="请选择">
                    <el-option label="融合阴性" value="融合阴性"></el-option>
                    <el-option label="融合阳性" value="融合阳性"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="融合类型 ">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 1)">
                    {{scope.row.fusionType}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fusionType', scope.row.fusionType)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 2)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 3)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 4)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 5)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 6)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 7)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 8)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!--block_08 基因（mRNA/蛋白）表达-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneExpression'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="基因表达检出情况">
              <el-table-column label="基因" width="90">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8)">
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
              <el-table-column label="mRNA/蛋白表达">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 1)">
                    {{scope.row.expression}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'expression', scope.row.expression)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-model="scope.row.expression" @change="inputSub(reportData.code, scope.row.code, 'expression', scope.row.expression)" placeholder="请选择">
                    <el-option label="mRNA表达" value="mRNA表达"></el-option>
                    <el-option label="蛋白表达" value="蛋白表达"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="表达水平">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 2)">
                    {{scope.row.expressionLevel}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'expressionLevel', scope.row.expressionLevel)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-model="scope.row.expressionLevel" @change="inputSub(reportData.code, scope.row.code, 'expressionLevel', scope.row.expressionLevel)" placeholder="请选择">
                    <el-option label="正常表达" value="正常表达"></el-option>
                    <el-option label="表达阴性" value="表达阴性"></el-option>
                    <el-option label="低表达" value="低表达"></el-option>
                    <el-option label="高表达" value="高表达"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 1)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 2)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 3)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 4)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 5)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 6)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 7)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      
      <!--block_11 基因微卫星不稳定性和错配修复-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneInstability'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont" style="position:relative">
          <!-- <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div> -->
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="微卫星不稳定和基因错配修复检出情况">
              <!-- <el-table-column label="基因" width="90">
                <template slot-scope="scope">
                  <el-input type="textarea" autosize  @blur="inputSub('block_11', scope.row.code, 'gene', scope.row.gene)" v-model="scope.row.gene"></el-input>
                </template>
              </el-table-column> -->
              <el-table-column label="MSI/MMR">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8)">
                    {{scope.row.msi}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'msi', scope.row.msi)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="检出情况">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 1)">
                    {{scope.row.mmr}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'mmr', scope.row.mmr)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-if="(scope.row.msi.substring(0,3)) === 'MSI'" v-model="scope.row.mmr" @change="inputSub(reportData.code, scope.row.code, 'mmr', scope.row.mmr)" placeholder="请选择">
                    <el-option label="MSI-L" value="MSI-L"></el-option>
                    <el-option label="MSI-H" value="MSI-H"></el-option>
                    <el-option label="MSS" value="MSS"></el-option>
                  </el-select>
                  <el-select size="medium" v-if="(scope.row.msi.substring(0,3)) === 'MMR'" v-model="scope.row.mmr" @change="inputSub(reportData.code, scope.row.code, 'mmr', scope.row.mmr)" placeholder="请选择">
                    <el-option label="dMMR" value="dMMR"></el-option>
                    <el-option label="pMMR" value="pMMR"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 1)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 2)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 3)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 4)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 5)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 6)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 7)">
                    {{scope.row.functionPrediction}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!--临床入组推荐-->
      <!--RECOMMENDED CLINICAL TRIALS-->
      <div class="blockContent" v-if="reportData.blockKey === 'clinicalTrials'">
        <div class="tableItems" style="margin-top:0;">
          <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
          <div class="table-cont">
            <div class="table_add" style="top:6px;"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="clinicalTrialsAdd">+添加</a></div>
          </div>
          <div class="table-describe">
            <!-- <p>{{ reportData.describe }}</p> -->
            <p><el-input type="textarea" autosize  @blur="changeClinicalDescribe(reportData.code, reportData.describe)" v-model="reportData.describe"></el-input></p> 
            <div class="table-cont" v-for="(recommended, index) in reportData.list">
              <table>
                <tr>
                  <th width="200">{{ (pageNum - 1) * pageSize + index + 1 }}、<a target="_blank" :href="recommended.url">{{ recommended.clinical_id }}</a></th>
                  <th align="right">
                    <el-button type="danger" size="small" @click="pushListItem('del', recommended.code)">删除</el-button>
                  </th>
                </tr>
                <tr>
                  <td>入组条件</td>
                  <td><div style="display:inline-block;max-height:320px; width:100%; overflow:auto;" v-html="recommended.include"></div></td>
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
                  <td><pre>{{ recommended.contact_information }}</pre></td>
                </tr>
              </table>
            </div>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
        </div>
      </div>

      <!-- 肿瘤细胞免疫治疗临床试验入组推荐-->
      <!--RECOMMENDED CLINICAL TRIALS-->
      <div class="blockContent" v-if="reportData.blockKey === 'tumourTrials'">
        <div class="tableItems" style="margin-top:0px;">
          <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
          <div class="table-cont">
            <div class="table_add" style="top:6px;"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="clinicalTrialsAdd">+添加</a></div>
          </div>
          <div class="table-describe">
            <p><el-input type="textarea" autosize  @blur="changeClinicalDescribe(reportData.code, reportData.describe)" v-model="reportData.describe"></el-input></p> 
            <div class="table-cont" v-for="(recommended, index) in reportData.list">
              <table>
                <tr>
                  <th width="200">{{ (pageNum - 1) * pageSize + index + 1 }}、<a target="_blank" :href="recommended.url">{{ recommended.clinical_id }}</a></th>
                  <th align="right">
                    <el-button type="danger" size="small" @click="pushListItem('del', recommended.code)">删除</el-button>
                  </th>
                </tr>
                <tr>
                  <td>入组条件</td>
                  <td><div style="display:inline-block;max-height:320px; width:100%; overflow:auto;" v-html="recommended.include"></div></td>
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
                  <td><pre>{{ recommended.contact_information }}</pre></td>
                </tr>
              </table>
            </div>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
        </div>
      </div>
      
      <!-- 肿瘤细胞免疫治疗临床试验入组推荐-->
      <!--RECOMMENDED CLINICAL TRIALS-->
      <div class="blockContent" v-if="reportData.blockKey === 'chemotherapyClinicalTrials'">
        <div class="tableItems" style="margin-top:0px;">
          <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
          <div class="table-cont">
            <div class="table_add" style="top:6px;"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="clinicalTrialsAdd">+添加</a></div>
          </div>
          <div class="table-describe">
            <p><el-input type="textarea" autosize  @blur="changeClinicalDescribe(reportData.code, reportData.describe)" v-model="reportData.describe"></el-input></p> 
            <div class="table-cont" v-for="(recommended, index) in reportData.list">
              <table>
                <tr>
                  <th width="200">{{ index + 1 }}、<a target="_blank" :href="recommended.url">{{ recommended.clinical_id }}</a></th>
                  <th align="right">
                    <el-button type="danger" size="small" @click="pushListItem('del', recommended.code)">删除</el-button>
                  </th>
                </tr>
                <tr>
                  <td>入组条件</td>
                  <td><div style="display:inline-block;max-height:320px; width:100%; overflow:auto;" v-html="recommended.include"></div></td>
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
                  <td><pre>{{ recommended.contact_information }}</pre></td>
                </tr>
              </table>
            </div>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
        </div>
      </div>

      <!--肿瘤负荷-->
      <div class="blockContent" v-if="reportData.blockKey === 'tumorLoad'">
        <h3 style="margin-top:10px;">肿瘤负荷</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检测项">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
                  {{scope.row.checkItem}}
                  <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @savedata="savedata()" @newdata="newdata()" @editCont="editCont(reportData.code, scope.row.code, 'checkItem', scope.row.checkItem)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="突变负荷（个/Mb）">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
                  {{scope.row.mutationalLoad}}
                  <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @savedata="savedata()" @newdata="newdata()" @editCont="editCont(reportData.code, scope.row.code, 'mutationalLoad', scope.row.mutationalLoad)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="总数（个）">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.totalCount}}
                  <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @savedata="savedata()" @newdata="newdata()" @editCont="editCont(reportData.code, scope.row.code, 'totalCount', scope.row.totalCount)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="程度">
              <template slot-scope="scope">
                <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 5 + 3)">
                  {{scope.row.degree}}
                  <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @savedata="savedata()" @newdata="newdata()" @editCont="editCont(reportData.code, scope.row.code, 'degree', scope.row.degree)">
                  </vue-context-menu>
                </div> -->
                <el-select size="medium" v-model="scope.row.degree" @change="inputSub(reportData.code, scope.row.code, 'degree', scope.row.degree)" placeholder="请选择">
                  <el-option label="高负荷" value="高负荷"></el-option>
                  <el-option label="中等负荷" value="中等负荷"></el-option>
                  <el-option label="低负荷" value="低负荷"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="判断标准">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  {{scope.row.judgeStand}}
                  <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @savedata="savedata()" @newdata="newdata()" @editCont="editCont(reportData.code, scope.row.code, 'judgeStand', scope.row.judgeStand)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 化疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'chemotherapySummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="药物" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug, 'radio', scope.row.isHealthInsurance)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 化疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'chemotherapyDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" width="100" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
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
            <el-table-column label="变异" width="120" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="治疗方案" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 免疫检查点抑制剂治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'checkpointSummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="药物" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug, 'radio', scope.row.isHealthInsurance)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" width="120" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" width="120" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" width="120" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" width="120" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" width="120" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" width="120" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 免疫检查点抑制剂治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'checkpointDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因" width="220" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
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
            <el-table-column label="变异" width="100" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="治疗方案" width="180">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- CAR-T细胞免疫治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'cartSummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <br/>
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="治疗方案" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" width="120" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" width="120" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
                  <span class="el-dropdown-link">
                    <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" width="100">
                    <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                    <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column label="其他" width="120" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" width="120" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" width="120" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" width="120" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- CAR-T细胞免疫治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'cartDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案" width="260">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2 + 1)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      
      <!-- 其他治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'otherSummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="药物" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug, 'radio', scope.row.isHealthInsurance)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" width="120" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" width="120" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" width="120" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" width="120" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" width="120" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" width="120" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 其他治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'otherDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" width="100" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
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
            <el-table-column label="变异" width="120" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="药物" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- HLA基因-->
      <div class="blockContent" v-if="reportData.blockKey === 'hLAGene'">
        <h3 style="margin-top:10px;">HLA基因</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="HLA">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
                  {{scope.row.hla}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'hla', scope.row.hla)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="　">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
                  {{scope.row.hla1}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'hla1', scope.row.hla1)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Allele 1">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.alleleOne}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'alleleOne', scope.row.alleleOne)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Allele 2">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  {{scope.row.alleleTwo}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'alleleTwo', scope.row.alleleTwo)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!--block_09 基因扩增-->
      <div class="blockContent" v-if="reportData.blockKey === 'geneAmplification'">
        <h3 style="margin-top:10px;">基因扩增</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="基因扩增检出情况">
              <el-table-column label="基因" width="90">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8)">
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
              <el-table-column label="基因扩增">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 1)">
                    {{scope.row.amplification}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'amplification', scope.row.amplification)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-model="scope.row.amplification" @change="inputSub(reportData.code, scope.row.code, 'amplification', scope.row.amplification)" placeholder="请选择">
                    <el-option label="扩增阴性" value="扩增阴性"></el-option>
                    <el-option label="扩增阳性" value="扩增阳性"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 1)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 2)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 3)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 4)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 5)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 6)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 8 + 7)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 放疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'radiotherapySummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="药物" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug, 'radio', scope.row.isHealthInsurance)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 放疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'radiotherapyDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
            <el-table-column label="基因" width="100">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="药物" width="120">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 靶向治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'tagSummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
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
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="药物" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div :class="{'contextMenu color_blue':scope.row.isHealthInsurance === '是', 'contextMenu':scope.row.isHealthInsurance === '否'}" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug, 'radio', scope.row.isHealthInsurance)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 靶向治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'tagDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="search-wrapper">
          <el-form :inline="true" :model="formInline" class="demo-form-inline query-form">
            <el-form-item label="基因：">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.gene"
                :fetch-suggestions="querySearch"
                placeholder="请输入名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="变异：">
              <el-input size="medium" v-model="formInline.mutation" placeholder="请输入变异名称"></el-input>
            </el-form-item>
            <el-form-item label="药物：">
              <el-input size="medium" v-model="formInline.drug" placeholder="请输入名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="证据来源：">
              <el-select size="medium" v-model="formInline.sourceEvidence" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in searchTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" size="medium" @click="blockSearch(reportData)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" width="100" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
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
            <el-table-column label="变异" width="120" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="药物" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!--block_10 基因拷贝数变异-->
      <div class="blockContent tableOverflow" v-if="reportData.blockKey === 'copyNumberVariations'">
        <h3 style="margin-top:10px;">基因拷贝数变异</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="基因拷贝数变异检出情况">
              <el-table-column fixed label="　基因　" width="90">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16)">
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
              <el-table-column label="拷贝数" width="90">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 1)">
                    {{scope.row.copy}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'copy', scope.row.copy)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="CNV" width="120">
                <template slot-scope="scope">
                  <!-- <div class="contextMenu" @contextmenu="showMenu(scope.$index * 17 + 2)">
                    {{scope.row.copyLevel}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'copyLevel', scope.row.copyLevel)">
                    </vue-context-menu>
                  </div> -->
                  <el-select size="medium" v-model="scope.row.copyLevel" @change="inputSub(reportData.code, scope.row.code, 'copyLevel', scope.row.copyLevel)" placeholder="请选择">
                    <el-option label="高拷贝" value="高拷贝"></el-option>
                    <el-option label="拷贝数增加" value="拷贝数增加"></el-option>
                    <el-option label="拷贝数缺失" value="拷贝数缺失"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 2)">
                    {{scope.row.clinicalSignificance}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalSignificance', scope.row.clinicalSignificance)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="染色体号">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 3)">
                    {{scope.row.chromosome}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'chromosome', scope.row.chromosome)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="开始位置" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 4)">
                    {{scope.row.startPosition}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'startPosition', scope.row.startPosition)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="结束位置" width="120">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 5)">
                    {{scope.row.endPosition}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'endPosition', scope.row.endPosition)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="长度">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 6)">
                    {{scope.row.length}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'length', scope.row.length)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="变异类型">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 7)">
                    {{scope.row.variantType}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'variantType', scope.row.variantType)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="转录本">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 8)">
                    {{scope.row.refseqMrnaId}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'refseqMrnaId', scope.row.refseqMrnaId)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="外显子">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 9)">
                    {{scope.row.exom}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'exom', scope.row.exom)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="参考药物数量">
              <el-table-column label="NCCN/CSCO">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 10)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 11)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 12)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 13)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 14)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 16 + 15)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!--block_15 预后相关解读信息-->
      <div class="blockContent" v-if="reportData.blockKey === 'prognostisInformation'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <br/>
        <table class="tipList">
          <tr>
            <td><i class="icon-circle icon-size1 color-blue"></i> 本癌种</td>
            <td><i class="icon-circle-blank icon-size1 color-blue"></i> 其他癌种</td>
            <td><i class="icon-adjust icon-size1 color-blue"></i> 本癌种和其他癌种</td>
            <td><i class="icon-ban-circle icon-size1 color-red"></i> 禁忌</td>
            <td><i class="icon-remove icon-size1 color-gray"></i> 无循证医学证据</td>
            <!-- <td> (IV), (III), (II/III), (II), (I/II), (I)临床试验阶段</td> -->
          </tr>
        </table>
        <div class="table-cont no-center" style="position:relative;">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加</a></div>
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="基因" prop="gene" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3)">
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
            <el-table-column label="变异" prop="mutation" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 1)">
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
            <el-table-column label="对预后的影响">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 3 + 2)">
                  {{scope.row.influenceOnPrognosis}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'influenceOnPrognosis', scope.row.influenceOnPrognosis)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
                  <span class="el-dropdown-link">
                    <i :class="{'icon-circle icon-size1 color-blue':scope.row.fdaCfda === 1, 'icon-circle-blank icon-size1 color-blue':scope.row.fdaCfda === 2, 'icon-adjust icon-size1 color-blue':scope.row.fdaCfda === 3, 'icon-ban-circle icon-size1 color-red':scope.row.fdaCfda === 4, 'icon-remove icon-size1 color-gray':scope.row.fdaCfda === 5}"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" width="100">
                    <el-dropdown-item :command="1"><i class="icon-circle icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="2"><i class="icon-circle-blank icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="3"><i class="icon-adjust icon-size1 color-blue"></i></el-dropdown-item>
                    <el-dropdown-item :command="4"><i class="icon-ban-circle icon-size1 color-red"></i></el-dropdown-item>
                    <el-dropdown-item :command="5"><i class="icon-remove icon-size1 color-gray"></i></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column label="其他" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" width="120">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 预后相关解读详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'prognostisInformationDetail'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="基因" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4)">
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
            <el-table-column label="变异" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 1)">
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
            <el-table-column label="对预后的影响" width="120">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 2)">
                  {{scope.row.influenceOnPrognosis}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'influenceOnPrognosis', scope.row.influenceOnPrognosis)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 4 + 3)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      
      <!-- 样本信息--><!--不给修改-->
      <div class="blockContent" v-if="reportData.blockKey === 'specimenInformation'">
        <h3 style="margin-top:10px;">{{reportData.blockName}}</h3>
        <!-- <ul class="inlineItem">
          <li style="width:49%">样本 ID：{{reportData.jsonValue.sample_id}}</li>
          <li style="width:49%">样本类型：{{reportData.jsonValue.sample_type}}</li>
          <li style="width:49%">样本属性：{{reportData.jsonValue.sample_attribute}}</li>
          <li style="width:49%">取样位置：{{reportData.jsonValue.sampling_location}}</li>
          <li style="width:49%">样本采集时间：
            <span class="underline" style="display:inline-block; padding-left:10px;width:calc(100% - 22em); line-height:2;">
              {{reportData.jsonValue.sample_collection_time}}
            </span>
          </li>
          <li style="width:49%">样本检测时间：
            <span class="underline" style="display:inline-block; padding-left:10px;width:calc(100% - 22em);line-height:2;">
              {{reportData.jsonValue.sample_testing_time}}
            </span>
          </li>
        </ul> -->
        <table class="inlineItem">
          <tr>
            <td width="80px">样　本ID：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sample_id}}&nbsp;</div></td>
            <td width="80px">样本类型：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sample_type}}&nbsp;</div></td>
          </tr>
          <tr>
            <td>样本属性：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sample_attribute}}&nbsp;</div></td>
            <td>取样位置：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sampling_location}}&nbsp;</div></td>
          </tr>
          <tr>
            <td>采集时间：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sample_collection_time}}&nbsp;</div></td>
            <td>检测时间：</td>
            <td><div class="tableListItem">{{reportData.jsonValue.sample_testing_time}}&nbsp;</div></td>
          </tr>
        </table>
      </div>

      <!-- 肿瘤疫苗治疗方案汇总-->
      <div class="blockContent" v-if="reportData.blockKey === 'vaccinesSummary'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <br/>
        <table class="tipList">
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
          <el-table class="table-center" :data="reportData.list" @sort-change="sortChange">
            <el-table-column label="治疗方案" prop="drug" sortable="custom">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="NCCN/CSCO" width="120" prop="nccnCsCo" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" v-model.number="scope.row.nccnCsCo"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'nccnCsCo', scope.row.nccnCsCo)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="FDA/CFDA" width="120" prop="fdaCfda" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" v-model.number="scope.row.fdaCfda"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'fdaCfda', scope.row.fdaCfda)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="其他" width="120" prop="other" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'other', scope.row.other)" v-model.number="scope.row.other"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'other', scope.row.other)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床研究" width="120" prop="clinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" v-model.number="scope.row.clinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'clinicalTrails', scope.row.clinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="临床前研究" width="120" prop="preClinicalTrails" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" v-model.number="scope.row.preClinicalTrails"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)" trigger="click"><!-- trigger="click" 点击出-->
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
            <el-table-column label="功能预测" width="120" prop="functionPrediction" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-input type="number" @blur="inputSub(reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" v-model.number="scope.row.functionPrediction"></el-input> -->
                <el-dropdown @command="(command) => handleCommand(command, reportData.code, scope.row.code, 'functionPrediction', scope.row.functionPrediction)" trigger="click"><!-- trigger="click" 点击出-->
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
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>

      <!-- 肿瘤疫苗治疗方案详情-->
      <div class="blockContent" v-if="reportData.blockKey === 'vaccinesDetails'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont no-center" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table class="table-center" :data="reportData.list">
            <el-table-column label="治疗方案" width="260">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2)">
                  {{scope.row.drug}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'drug', scope.row.drug)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床注释">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2 + 1)">
                  <div v-html="scope.row.clinicalEvidence"></div>
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'clinicalEvidence', scope.row.clinicalEvidence, 'rich')">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      
      <!-- 检测平台信息及分析参考类目--><!--不给修改-->
      <div class="blockContent" v-if="reportData.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="tableItems" style="margin:20px auto 10px auto;">
            <!-- <div class="table-title" style="background-color: #003366;">
              <h2>{{ reportData.blockName }}</h2>
            </div> -->
            <div class="table-cont">
              <table style="color:#555;border-right: solid 1px #eee;">
                <tr style="border-top:solid 1px #eee;">
                  <td width="110px" style="font-weight:bold;">检测信息</td>
                  <td>{{reportData.jsonValue.sequencing_information}}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">测序平台</td>
                  <td>{{reportData.jsonValue.sequencing_platform}}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">检测基因数目</td>
                  <td>{{reportData.jsonValue.test_gene_num}}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">检出基因列表</td>
                  <td style="">
                    <div class="contextMenu" @contextmenu="showMenu(0)" style="width:96%">
                      <!-- <span style="font-size:12px;" v-if="i.checkOut === true" :class="{'':i.checkOut === false, 'color-red':i.checkOut === true}" v-for="(i, index) in geneList">{{ i.value }}，</span> -->
                      {{ reportData.jsonValue.testVariantGenes }}
                      <vue-context-menu :contextMenuData="contextMenuData"
                                        :transferIndex="transferIndex"
                                        @savedata="savedata()"
                                        @newdata="newdata()"
                                        @editCont="editCont(reportData.code, '0', 'testVariantGenes', reportData.jsonValue.testVariantGenes)">
                      </vue-context-menu>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">参考基因组</td>
                  <td>{{reportData.jsonValue.ref}}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">知识库版本</td>
                  <td>{{reportData.jsonValue.knowledge_ver}}
                  </td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">分析流程版本</td>
                  <td>Bainuo_ OncoAnalyzer_exon_ Version 2.0</td>
                </tr>
              </table>
            </div>
            <p style="font-size:13px; color:#777;">*检出的基因列表中所列出的基因为检测结果为阳性的所有基因</p>
          </div>
        </div>
      
      <!--参考文献-链接列表-->
      <div class="blockContent" v-if="reportData.blockKey === 'reference'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="tableItems" style="margin-top:0px;">
          <div class="table-title" style="padding:0;">
            <!-- <div class="table-edit"><a href="javascript:;" @click="part09check = true">编辑</a></div> -->
            <span class="itemsAdd el-button el-button--success el-button--small" style="top:-20px;" title="增加一条" v-loading='addLoading' @click="pushListItem('add')">+添加</span>
          </div>
          <div class="table-cont no-center" style="position:relative">
            <el-table class="needRemove" :data="reportData.list">
              <el-table-column label="序号" style="text-align:left" width="100">
                <template slot-scope="scope">
                  {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="标题">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2)">
                    {{scope.row.literature_name}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'literature_name', scope.row.literature_name)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="链接地址">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2 + 1)">
                    {{scope.row.literature_url}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'literature_url', scope.row.literature_url)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
        </div>
      </div>
      
      <!--推荐治疗方案-->
      <div class="blockContent" v-if="reportData.blockKey === 'recommendedTreatment'">
        <h3 style="margin-top:10px;">{{ reportData.currentDiseaseName }}</h3>
        <!--以下，是内容区域-->
        <!-- <div class="desc" style="overflow:hidden; margin-top:20px;">
          <el-col :span="24">
            <quill-editor ref="myTextEditor" v-model="formData.description"></quill-editor>
          </el-col>
        </div> -->
        <el-collapse v-model="activeName" accordion>

          <el-collapse-item title="概述" name="1" class="collapse_item_title">
            <el-input type="textarea" class="editorTextarea" autosize v-model="reportData.variantCheckResult"></el-input>
          </el-collapse-item>

          <el-collapse-item title="靶向" name="2" class="collapse_item_title">
            <p><el-input type="text" placeholder='总述' v-model.trim="reportData.drugDetails.targeted.recommendDrugSummary"></el-input></p>
            <div class="activeItems" v-for="(item, index) in reportData.drugDetails.targeted.drugClinicalNotes" :key="index">
              <p style="margin-bottom:10px;"><el-input type="text" placeholder='药物名' v-model.trim="item.drugName"></el-input></p>
              <div class="table_add"><a href="javascript:;" class="el-button el-button--primary el-button--small" @click="addpp2('targeted')">+药物</a></div>
              <div class="table_add" style="right:7em;"><a href="javascript:;" class="el-button el-button--danger el-button--small" @click="delpp2('targeted', index)">-</a></div>
              <div class="pp2" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="addpp3('targeted', index)">+标题</a></div>
                <div class="pp3" v-for="(item2, index2) in item.clinicalNotes" :key="index2">
                  <div class="table_add"><a href="javascript:;" class="el-button el-button--danger el-button--small" @click="delpp3('targeted', index2)">-</a></div>
                  <p><el-input type="text" placeholder='标题' v-model.trim="item2.diseaseNames"></el-input></p>
                  <p><el-input type="textarea" class="editorTextarea" autosize placeholder="内容" v-model.trim="item2.clinicalNote"></el-input></p>
                </div>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="免疫" name="3" class="collapse_item_title">
            <p><el-input type="text" placeholder='总述' v-model.trim="reportData.drugDetails.targeted.recommendDrugSummary"></el-input></p>
            <div class="activeItems" v-for="(item, index) in reportData.drugDetails.targeted.drugClinicalNotes" :key="index">
              <p style="margin-bottom:10px;"><el-input type="text" placeholder='药物名' v-model.trim="item.drugName"></el-input></p>
              <div class="table_add"><a href="javascript:;" class="el-button el-button--primary el-button--small" @click="addpp2('targeted')">+药物</a></div>
              <div class="table_add" style="right:7em;"><a href="javascript:;" class="el-button el-button--danger el-button--small" @click="delpp2('targeted', index)">-</a></div>
              <div class="pp2" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="addpp3('targeted', index)">+标题</a></div>
                <div class="pp3" v-for="(item2, index2) in item.clinicalNotes" :key="index2">
                  <div class="table_add"><a href="javascript:;" class="el-button el-button--danger el-button--small" @click="delpp3('targeted', index2)">-</a></div>
                  <p><el-input type="text" placeholder='标题' v-model.trim="item2.diseaseNames"></el-input></p>
                  <p><el-input type="textarea" class="editorTextarea" autosize placeholder="内容" v-model.trim="item2.clinicalNote"></el-input></p>
                </div>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="化疗" name="4" class="collapse_item_title">
            <div class="activeItems" style="margin:0px;">
              <div class="pp2" style="position:relative">
                <div class="table_add"><a href="javascript:;" class="el-button el-button--primary el-button--small" @click="addpp4()">+标题</a></div>
                <div class="pp3" v-for="(item, index) in reportData.drugDetails.chemo" :key="index">
                  <div class="table_add"><a href="javascript:;" class="el-button el-button--danger el-button--small" @click="delpp4(index)">-</a></div>
                  <p><el-input type="text" placeholder='标题' v-model.trim="item.drugEffective"></el-input></p>
                  <p><el-input type="textarea" class="editorTextarea" autosize placeholder="内容" v-model.trim="item.clinicalNote"></el-input></p>
                </div>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="结论" name="5" class="collapse_item_title">
            <div class="table-cont no-center" style="position:relative">
              <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加</a></div>
              <el-table :data="testItem.list" border style="width: 100%">
                <el-table-column width="50">
                  <template slot-scope="scope">
                      &nbsp;&nbsp;&nbsp;&nbsp;{{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                      <el-input type="textarea" autosize v-model="scope.row.text" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="　" width="60">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">-</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
        <!--以下，是按钮系列-->
        <div class="desc" style="margin:20px 0;">
          <el-button type="primary" :loading="isLoading" @click="setSummary()">
            {{ isLoading ? 'loading.' : '生成方案' }}
          </el-button>
          <!--修改操作-->
          <el-button type="success" :loading="isLoading" @click="inputSub(reportData.code, '0', 'recommendedTreatment', formData.description)">{{ isLoading ? 'loading.' : '保存' }}</el-button>
          <!--更新操作-->
          <el-button type="warning" :loading="isLoading" @click="updateRecommended">{{ isLoading ? 'loading.' : '更新临床入组' }}</el-button>
        </div>
        <el-table class="needRemove" :data="reportDataList.list">
          <el-table-column type="index" label="序号" style="text-align:left" width="100"></el-table-column>
          <el-table-column prop="description" label="小结内容">
            <template slot-scope="scope">
              <div :html="scope.row.description"></div>
            </template>
          </el-table-column>
          <el-table-column  prop="createTime" :formatter="dateFormat" label="时间" width="200">
          </el-table-column>
        </el-table>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getSummaryList"></pager>
      </div>

      <!-- 建议增加的检测项目-->
      <div class="blockContent" v-if="reportData.blockKey === 'recommendItem'">
        <h3 style="margin-bottom:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="检测项目" width="360">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2)">
                  {{scope.row.itemName}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'itemName', scope.row.itemName)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="临床意义">
              <template slot-scope="scope">
                <div class="contextMenu" @contextmenu="showMenu(scope.$index * 2 + 1)">
                  {{scope.row.meaning}}
                  <vue-context-menu :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @savedata="savedata()"
                                    @newdata="newdata()"
                                    @editCont="editCont(reportData.code, scope.row.code, 'meaning', scope.row.meaning)">
                  </vue-context-menu>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--疾病信号通路图-->
      <div class="blockContent" v-if="reportData.blockKey === 'diseasePathway'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <div class="table-cont" style="border:none">
          <div class="introduce toggleItem" style="padding:30px 0; margin-left:0;">
            <el-form>
              <el-form-item>
                <el-col :span="12">
                  <el-upload
                    :action="imgUploadUrl"
                    list-type="picture"
                    :data="updata"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :headers="uploadHeader"
                    :file-list="fileList"
                    >
                    <!-- <i class="el-icon-plus"></i> -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip" style="margin-left:10px; color:#ccc;">只能上传图片文件，且不超过2Mb</span>
                  </el-upload>
                </el-col>
                <el-col :span="12">
                  <ul class="imgList" style="margin-top:55px;">
                    <li v-for="(imgList, key) in reportData.list" :key="key">
                      <el-input type="text" class="reportsStyle" style="width:50%;margin: 0px 40px 0px 0px;line-height: 30px; font-weight:bold;  border: dashed 1px #ccc;" @blur="inputSub(reportData.code, imgList.code, 'pathway_name', imgList.pathway_name)" v-model="imgList.pathway_name"></el-input>
                    </li>
                  </ul>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <!--Disclaimer   block_23 免责声明-->
      <div class="blockContent" v-if="reportData.blockKey === 'disclaimer'">
        <h3 style="margin-top:10px;">{{ reportData.blockName }}</h3>
        <br/>
        <div class="tableItems" style="margin-top:0px;">
          <p style="line-height: 2;">
            <el-input type="textarea" autosize  @blur="inputSub(reportData.code, '0', 'disclaimer', reportData.jsonValue.disclaimer)" v-model="reportData.jsonValue.disclaimer" placeholder="Disclaimer"></el-input>
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
      <div class="blockContent" v-if="reportData.blockKey === 'chromosomeAbnormality'">
        <h3 style="margin-top:10px;">{{reportData.blockName}}</h3>
        <div class="table-cont" style="position:relative">
          <div class="table_add"><a href="javascript:;" class="el-button el-button--success el-button--small" @click="pushListItem('add')">+添加行</a></div>
          <el-table :data="reportData.list" class="table-center">
            <el-table-column label="染色体异常检出情况">
              <el-table-column label="染色体异常">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9)">
                    {{scope.row.chromosomeAbnormality}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'chromosomeAbnormality', scope.row.chromosomeAbnormality)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="检出情况">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 1)">
                    {{scope.row.checkResult}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'checkResult', scope.row.checkResult)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床意义">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 2)">
                    {{scope.row.clinicalSignificance}}
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
              <el-table-column label="NCCN/CSCO">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 3)">
                    {{scope.row.nccnCscoCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'nccnCscoCount', scope.row.nccnCscoCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="FDA/CFDA">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 4)">
                    {{scope.row.fdaCfadCount}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'fdaCfadCount', scope.row.fdaCfadCount)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="其他">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 5)">
                    {{scope.row.other_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'other_count', scope.row.other_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 6)">
                    {{scope.row.clinicalTrails_count}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'clinicalTrails_count', scope.row.clinicalTrails_count)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="临床前研究">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 7)">
                    {{scope.row.preClinicalTrails}}
                    <vue-context-menu :contextMenuData="contextMenuData"
                                      :transferIndex="transferIndex"
                                      @savedata="savedata()"
                                      @newdata="newdata()"
                                      @editCont="editCont(reportData.code, scope.row.code, 'preClinicalTrails', scope.row.preClinicalTrails)">
                    </vue-context-menu>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="功能预测">
                <template slot-scope="scope">
                  <div class="contextMenu" @contextmenu="showMenu(scope.$index * 9 + 8)">
                    {{scope.row.functionPrediction}}
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
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="pushListItem('del', scope.row.code)">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="pageNum" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="(val) => blockSearch(codeObj, val, reportData.sort, reportData.sortType)"></pager>
      </div>
      

      <!--所有的右键编辑内容框-->
      <el-dialog title="内容编辑" class="rightEditBox" :visible.sync="changeDialog" width="80%">
        <el-form :model="vauleForm">
          <el-form-item>
            <el-input v-if="vauleForm.type === 'text' || vauleForm.type === 'radio'" type="textarea" class="editorTextarea" autosize v-model="vauleForm.content"></el-input>
            <quill-editor v-if="vauleForm.type === 'rich'" ref="xxx" v-model="vauleForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="是否医保：" v-if="vauleForm.type === 'radio'">
            <el-radio-group v-model="vauleForm.isHealthInsurance" @change="inputSub(changeFrom.blockInstanceCode, changeFrom.fieldCode, 'isHealthInsurance', vauleForm.isHealthInsurance)">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeDialog = false">取 消</el-button>
          <el-button type="primary" @click="changeDialog = false, inputSub(changeFrom.blockInstanceCode, changeFrom.fieldCode, changeFrom.fieldName, vauleForm.content)">确 定</el-button>
        </div>
      </el-dialog>

      <!--临床入组选择框-->
      <el-dialog title="临床入组选择" :visible.sync="clinicalTrialsDialog" width="80%">
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
            <el-form-item label="nctId：">
              <el-input v-model="searchWrapper.nctId" placeholder=""></el-input>
            </el-form-item>
            <div class="xx" v-show="searchShow === true">
              <el-form-item label="年龄段范围：">
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
              <span class="el-tag el-tag--danger" @click="searchShow = true" v-if="searchShow === false">高级搜索</span>
              <span class="el-tag el-tag--danger" @click="searchShow = false" v-if="searchShow === true">简单搜索</span>
            </div>
            <div>
              <el-form-item>
                <el-button type="primary" :loading="listLoading" @click="getClinicalTrialsList(1)">{{ listLoading ? '正在查询' : '查询' }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="clinicalTrialsData">
          <el-table :data="clinicalTrialsData" v-loading="listLoading" border style="width: 100%">
            <el-table-column label="nctId" prop="clinical_id" width="140">
            </el-table-column>
            <el-table-column label="临床题目" prop="clinical_name">
              <!-- <template slot-scope="scope">
                <a :href="'https://clinicaltrials.gov/ct2/show/' + scope.row.nctId">{{ scope.row.briefTitle }}</a>
              </template> -->
            </el-table-column>
            <el-table-column label="临床阶段" prop="phase" width="90">
              <!-- <template slot-scope="scope">
                {{ scope.row.country }}{{ scope.row.state }}{{ scope.row.city }}
              </template> -->
            </el-table-column>
            <el-table-column label="药物/治疗方案" prop="intervention_name" width="160">
              <!-- <template slot-scope="scope">
                <div v-html="scope.row.intervention_name"></div>
              </template> -->
            </el-table-column>
            <el-table-column label="疾病/适应症" prop="indications" width="140">
            </el-table-column>
            <el-table-column label="招募地点" prop="recruit_place" width="200">
            </el-table-column>
            <el-table-column label="联系方式" prop="contact_information" width="140">
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="success" size="small"  v-loading='addLoading' @click="pushListItem('add', '无用占位', scope.row)">添加</el-button>
              </template> 
            </el-table-column>
          </el-table>
        </div>
        <pager :current-page="currentPage1" :pageSize="pageSize1" :total-count="totalCount1" v-on:handleCurrentChange="getClinicalTrialsList"></pager>
      </el-dialog>

    </div>

    <el-button size="small" @click="gobackList" style="position:absolute; top:-15px; right:110px;">返回列表</el-button>
    <el-button type="success" size="small" :loading="isLoading" @click="subSummary('formData')" style="position:absolute; top:-15px; right:20px;">
      {{ isLoading ? 'loading.' : '提交' }}
    </el-button>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  import Pager from '@/components/common/pager'
  import moment from 'moment'
  import {formatDate} from '@/common/js/Utils.js'
  import VueContextMenu from 'vue-contextmenu'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    created () {
      this.getNavList()
    },
    name: 'app',
    components: {
      Pager: Pager,
      quillEditor: quillEditor
    },
    computed: {
      uploadHeader () {
        return {
          token: JSON.parse(localStorage.getItem('authtoken'))
        }
      }
    },
    data () {
      return {
        code: this.$route.params.id,
        // restaurants 是autocomplate的备选项列表
        pager: this.$route.params.pager,
        activeName: '1',
        testItem: {
          text: '这里是测试内容',
          list: [{
            text: '第一条内容'
          },{
            text: '第二条内容'
          }]
        },
        restaurants: [],
        restaurantsList: [],
        language: 'EN',
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
          blockInstanceCode: 'qwekljqlwkjdklsjcklzxjdlkwjqklwer'
        },
        formData: {
          description: ''
        },
        isLoading: false,
        races: [{
          label: '',
          value: -1
        },{
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
          label: '本癌种',
          value: 1
        },{
          label: '其他癌种',
          value: 2
        },{
          label: '本癌种和其他癌种',
          value: 3
        },{
          label: '禁忌',
          value: 4
        },{
          label: '无循证医学证据',
          value: 5
        }],
        sequencingPlatforms:[{
          label:'lllumina',
          value: '1'
        }],
        analysisVersions:[{
          label:'Bainuo Knowledge Base Version 1.0',
          value: '1'
        }],
        sampleAttributes:[{
          label:"肿瘤样本",
          value:'1'
        },{
          label:"正常组织",
          value:'2'
        }],
        codeObj: {},
        part08check: false,
        part09check: false,
        geneList: [],
        fileList: [],
        addLoading: false,
        part07check: false,
        blockLoading: true,
        listLoading: false,
        searchShow: false,
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
        clinicalTrialsDialog: false,
        searchWrapper: {
          ageRange: '',
          condition: '',
          drug: '',
          nctId: '',
          phase: '',
          population: '',
          recruitCountry: '',
          sponsor: '',
          trialCountry: '',
          nctId: ''
        },
        clinicalTrialsData: [],
        pageSize1: 10,
        pageNum1: 1,
        totalCount1: 0,
        currentPage1: 1,
        pageSize: 8,
        pageNum: 1,
        totalCount: 0,
        reportData: {},
        reportDataList: {},
        changeDialog: false,
        vauleForm: {
          content: '',
          type: 'text',
          isHealthInsurance: '',
          radioValue: '否'
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
            }
            // {
            //   fnHandler: 'newdata',
            //   icoName: 'fa fa-home fa-fw',
            //   btnName: '菜单一'
            // },
            // {
            //   fnHandler: 'savedata', // Binding events(绑定事件)
            //   icoName: 'fa fa-home fa-fw', // icon (icon图标 )
            //   btnName: '菜单二' // The name of the menu option (菜单名称)
            // }
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
        // 显示右键菜单
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
      editCont(code, filecode, filedName, filedValue, editorType, radioValue) {
        // 编辑的菜单
        let that = this
        // alert(filedValue)
        // return false
        that.changeDialog = true
        that.vauleForm.content = filedValue
        if (editorType === 'rich') {
          // 富文本
          that.vauleForm.type = 'rich'
        } else if (editorType === 'text') {
          // 普通输入框
          that.vauleForm.type = 'text'
        } else if (editorType === 'radio') {
          // 药物 判断是否医保
          that.vauleForm.type = 'radio'
          // alert(radioValue)
          that.vauleForm['isHealthInsurance'] = radioValue
        } else {
          that.vauleForm.type = 'text'
        }
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
          if (res.data.code === '100') {
            that.navList = res.data.data
            that.navList[0].isCheck = "0"
            that.changeCheck(that.navList[0], that.pageNum)
          } else {
            that.$message({
              type: 'error',
              message: '列表查询失败',
              duration: 1000
            })
          }
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
          that.blockSearch(that.codeObj, that.pageNum)
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
          url: response.data.base64EncodeFile
        })
        if (that.reportData['list']) {
          console.log('true')
        } else {
          that.reportData['list'] = []
        }
        that.reportData['list'].push({
          pathway_name: response.data.fileName,
          pathway_path: response.data.base64EncodeFile
        })
        // 上传成功马上传到服务器
        axios.post(URL.api_name + 'report/field_update', {
          projectCode: that.reportData.projectCode,
          blockInstanceCode: that.reportData.code,
          info: {
            pathway_name: response.data.fileName,
            pathway_path: response.data.base64EncodeFile
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            that.fileList = []
            for (let n = 0; n < res.data.data.list.length; n++) {
              that.fileList.push({
                code: res.data.data.list[n].code,
                name: res.data.data.list[n].pathway_name,
                url: res.data.data.list[n].pathway_path
              })
            }
          } else {
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
      handleRemove (file, fileList) {
        // console.log(this.fileList)
        // console.log(fileList)
        console.log(file)
        let that = this
        // 删除提交到服务器
        axios.post(URL.api_name + 'report/field_update', {
          projectCode: that.reportData.projectCode,
          blockInstanceCode: that.reportData.code,
          fieldCode: file.code
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData = res.data.data
            // console.log('+++')
            // console.log(res.data.data)
            that.fileList = []
            for (let n = 0; n < res.data.data.list.length; n++) {
              that.fileList.push({
                code: res.data.data.list[n].code,
                name: res.data.data.list[n].pathway_name,
                url: res.data.data.list[n].pathway_path
              })
            }
            // console.log(that.fileList)
            // that.fileList = fileList
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
      changeCheck (itemText, num, sort, sortType) {
        // 点击左侧模块导航，请求右侧详情|| 点击分页
        // itemText参数为 blockInfo  整块内容
        // num 为当前页
        // sort 为当前排序的字段keyName
        // sortType 为当前排序的类型  asc、desc、''
        let that = this
        that.blockLoading = true
        that.pageNum = num
        that.totalCount = 0
        that.reportData = {}
        // 初始化查询的基因列表
        that.restaurants = []
        // 给所有的模块导航添加一个选中状态
        for (let i = 0; i < that.navList.length; i++) {
          that.navList[i].isCheck = "1"
        }
        if (itemText.isCheck === "1") {
          itemText.isCheck = "0"
        }
        // 重置查询条件内容
        for (let key in that.formInline) {
          that.formInline[key] = ''
        }
        that.blockSearch(itemText, num, sort, sortType)
      },
      inputSub (code, filecode, filedName, filedValue) {
        // 单个修改提交
        let that = this
        if (filecode === '0') {
          filecode = ''
        }
        axios.post(URL.api_name + 'report/field_update', {
          projectCode: that.reportData.projectCode,
          blockInstanceCode: code,
          pageSize: that.pageSize,
          fieldCode: filecode,
          fieldName: filedName,
          fieldValue: filedValue
        }).then(function (res) {
          if (res.data.code === '100') {
            // that.reportData = res.data.data
            // if (res.data.data.jsonValue) {
            //   that.reportData.jsonValue = JSON.parse(res.data.data.jsonValue)
            // } else if (res.data.data.list) {
            //   that.totalCount = res.data.data.total
            // }
            // if (that.reportData.blockKey === 'subjectInformation') {
            //   // 重设"基本信息"里的 race 种族的显示文本内容
            //   for (let n = 0; n < that.races.length; n++) {
            //     if (that.reportData.jsonValue.race === that.races[n].value) {
            //       that.reportData.jsonValue.race = that.races[n].label
            //     }
            //   }
            // }
            // // geneList
            // if (that.reportData.blockKey === 'testPlatformInformationAndAnalysisRefereneceCategory') {
            //   that.geneList = []
            //   for (let s in that.reportData.jsonValue.genes) {
            //     // that.geneList = that.geneList + s + ',' 
            //     that.geneList.push({
            //       value: s,
            //       checkOut: that.reportData.jsonValue.genes[s]
            //     })
            //   }
            // }
            // // 小结
            // if (that.reportData.blockKey === 'recommendedTreatment') {
            //   // alert('xxee')
            //   // that.formData = res.data.data
            //   that.getSummaryList(that.pageNum)
            // }
            // 修改完，回到当前页
            that.blockSearch(that.codeObj, that.pageNum, that.reportData.sort, that.reportData.sortType)
            // 修改完毕提示成功信息
            that.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000
            })
          } else {
            // console.log(error)
            that.$message({
              type: 'error',
              message: '修改失败：' + res.data.message,
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
      pushListItem(type, listCode, givesRow) {
        // 添加删除操作
        let that = this
        let postParame = {}
        if (type === 'add' && givesRow === undefined) {
          // 一般添加为添加空行
          postParame['info'] = {}
          // for (let n in that.reportData.list[0]) {
          //   postParame.info[n] = ''
          // }
          postParame['pageSize'] = that.pageSize
          postParame['blockKey'] = that.reportData.blockKey
          postParame['blockInstanceCode'] = that.reportData.code
          postParame['projectCode'] = that.reportData.projectCode
        } else if (type === 'del') {
          postParame['pageSize'] = that.pageSize
          postParame['fieldCode'] = listCode
          postParame['blockInstanceCode'] = that.reportData.code
          postParame['projectCode'] = that.reportData.projectCode
        } else if (type === 'add' && givesRow !== undefined) {
          // 临床入组情况特殊，添加一行的时候，会给一整个有具体内容的obj
          postParame['info'] = {}
          for (let ne in givesRow) {
            postParame.info[ne] = givesRow[ne]
          }
          postParame['pageSize'] = that.pageSize
          postParame['blockKey'] = that.reportData.blockKey
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
      blockSearch (itemText, num, sort, sortType) {
        // 点击搜索
        let that = this
        that.blockLoading = true
        that.pageNum = num
        if (sort === '' || sort === null || sort === undefined) {
          sort = ''
        }
        if (sortType === '' || sortType === null || sortType === undefined) {
          sortType = ''
        }
        // 有查询的模块，isSearch为1，没有查询的模块为空
        let isser = ''
        if (itemText.blockKey === 'geneMutation' || itemText.blockKey === 'geneFusion' || itemText.blockKey === 'geneExpression' || itemText.blockKey === 'tagSummary' || itemText.blockKey === 'tagDetails' || itemText.blockKey === 'chemotherapySummary' || itemText.blockKey === 'chemotherapyDetails' || itemText.blockKey === 'radiotherapySummary' || itemText.blockKey === 'radiotherapyDetails' || itemText.blockKey === 'checkpointSummary' || itemText.blockKey === 'otherSummary' || itemText.blockKey === 'otherDetails') {
          isser = '1'
        }
        let url = ''
        if (itemText.blockKey === 'recommendedTreatment') {
          url = '/static/recommend.json'
          axios.get(url, {
            params: {
              code: itemText.code
            }
          }).then((res) => {
            console.log(res)
            console.log(res.data)
            that.reportData = res.data
            that.blockLoading = false
          }).catch((error) => {
            console.log(error)
          })
          return false
        } else {
          url = URL.api_name + 'report/examine_detail'
        }
        axios.get(url, {
          params: {
            code: itemText.code,
            isSearch: isser,
            drug: that.formInline.drug,
            gene: that.formInline.gene,
            mutation: that.formInline.mutation,
            sourceEvidence: that.formInline.sourceEvidence,
            langType: that.formInline.langType,
            projectCode: that.formInline.projectCode,
            sort: itemText.sort,
            sortType: itemText.sortType,
            pageNum: num,
            pageSize: that.pageSize
          }
        }).then((res) => {
          if (res.data.code === '100') {
            console.log(that.blockLoading)
            that.reportData = res.data.data
            that.totalCount = res.data.data.total
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
              for (let n = 0; n < that.sequencingPlatforms.length; n++) {
                if (that.reportData.jsonValue.sequencing_platform === that.sequencingPlatforms[n].value) {
                  that.reportData.jsonValue.sequencing_platform = that.sequencingPlatforms[n].label
                }
              }
              for (let n = 0; n < that.analysisVersions.length; n++) {
                if (that.reportData.jsonValue.analysis_version === that.analysisVersions[n].value) {
                  that.reportData.jsonValue.analysis_version = that.analysisVersions[n].label
                }
              }
            }
            if(itemText.blockKey=='specimenInformation'){
               for (let n = 0; n < that.sampleAttributes.length; n++) {
                if (that.reportData.jsonValue.sample_attribute === that.sampleAttributes[n].value) {
                  that.reportData.jsonValue.sample_attribute = that.sampleAttributes[n].label
                }
              }
            }
            // 小结
            if (itemText.blockKey === 'recommendedTreatment') {
              // that.formData.description = that.reportData.jsonValue.recommendedTreatment
              that.getSummaryList(that.pageNum)
            } 

            if (itemText.blockKey === 'diseasePathway') {
              // 图片
              that.fileList = []
              for (let imgL = 0; imgL < that.reportData.list.length; imgL++) {
                that.fileList.push({
                  code: res.data.data.list[imgL].code,
                  url: that.reportData.list[imgL].pathway_path,
                  name: that.reportData.list[imgL].pathway_name
                })
              }
              that.updata.blockInstanceCode = that.reportData.code
            }
            // 查询__基因 备选 列表
            if (that.reportData.geneList) {
              for (let iee = 0; iee < that.reportData.geneList.length; iee++) {
                that.restaurants.push({
                  value: that.reportData.geneList[iee]
                })
              }
            } else {
              that.restaurants = []
              // alert('没的')
            }
            // return false
            that.blockLoading = false
            // console.log(that.reportData.list)
          }
        }).catch((error) => {
          console.log(error)
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
            // let drugs = ''
            // for (let i = 0; i < res.data.data.drugs.length; i++) {
            //   drugs += res.data.data.drugs[i]
            // }
            // console.log(drugs)
            // that.formData = res.data.data
            that.formData.description = res.data.data
            // console.log(that.formData.description)
          } else {
            that.$message({
              type: 'error',
              message: '生成失败：' + res.data.message,
              duration: 2000
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
      updateRecommended () {
        // 更新临床入组治疗方案
        let that = this
        that.$confirm('确定更新治疗方案吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.isLoading = true
          axios.get(URL.api_name + 'report/make_clinicalTrails', {
            params: {
              blockInstanceCode: that.reportData.code
            }
          }).then(function (res) {
            if (res.data.code === '100') {
              that.$message({
                type: 'success',
                message: '更新成功',
                duration: 1000
              })
            } else {
              that.$message({
                type: 'error',
                message: '更新失败：' + res.data.message,
                duration: 1000
              })
            }
            that.isLoading = false
          }, function (error) {
            console.log(error)
            that.$message({
              type: 'error',
              message: '请求失败',
              duration: 1000
            })
          })
        }).catch(() => {})
      },
      handleCommand (command, code, filecode, filedName, filedValue) {
        // xxxx
        console.log(command)
        console.log(code)
        console.log(filecode)
        console.log(filedName)
        console.log(filedValue)
        let that = this
        that.inputSub(code, filecode, filedName, command)
      },
      clinicalTrialsAdd() {
        // 临床入组添加
        let that = this
        that.clinicalTrialsDialog = true
        // searchWrapper 清理一遍
        for (let n in that.searchWrapper) {
          that.searchWrapper[n] = ''
        }
        that.getClinicalTrialsList(that.currentPage1)
      },
      getClinicalTrialsList(num) {
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
            pageSize: that.pageSize1
          }
        }).then(function (res) {
          // console.log(res.data.data)
          if (res.data.code === '100') {
            that.clinicalTrialsData = res.data.data.list
            that.totalCount1 = res.data.data.total
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
      sortChange(column, prop, order) {
        let that = this
        // sort:keyName    sortType: asc  、 desc
        if (that.reportData['sort'] === null || that.reportData["sort"] !== column.prop) {
          that.reportData.sortType = null
        }
        that.reportData["sort"] = column.prop
        if (that.reportData["sortType"] === null) {
          that.reportData.sortType = 'asc'
        } else if (that.reportData.sortType === 'asc') {
          that.reportData.sortType = 'desc'
        } else {
          that.reportData.sortType = null
        }
        that.blockSearch(that.reportData, that.pageNum, that.reportData.sort, that.reportData.sortType)
      },
      subSummary (formData) {
        // 提交小结
        // 上传成功马上传到服务器
        let that = this
        that.isLoading = true
        axios.post(URL.api_name + 'report/description_add', {
          projectCode: that.reportData.projectCode,
          // description: that.formData.description,
          langType: that.language
        }).then(function (res) {
          if (res.data.code === '100') {
            that.isLoading = false
            that.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000,
              onClose: function () {           
                that.$router.push({
                  path: '/examineNone/' + that.pager
                })
              }
            })
          } else {
            that.isLoading = false
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
      gobackList () {
        let that = this
        this.$confirm('此操作将撤销所有保存的表单信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$router.push({
            path: '/examineNone/' + that.pager
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
        // alert('xe')
      },
      changeClinicalDescribe (code, descrip) {
        // 修改 临床入组里的变异信息
        let that = this
        axios.post(URL.api_name + 'report/updateBlockInstanceDescribe', {
          code: code,
          describe: descrip
        }).then(function (res) {
          if (res.data.code === '100') {
            that.reportData.describe = res.data.data.describe
            that.$message({
              type: 'success',
              message: '修改成功',
              duration: 1000
            })
          } else {
            that.$message({
              type: 'error',
              message: '修改失败' + res.data.message,
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
      querySearch(queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        console.log(item)
      },
      addpp2(item) {
        let that = this
        let n = {
          "drugName": "",
          "clinicalNotes": [
              {
                  "diseaseNames": "",
                  "isCurrentDisease": 0,
                  "clinicalNote": ""
              }
          ]
        }
        that.reportData.drugDetails[item].drugClinicalNotes.push(n)
      },
      delpp2(item, index) {
        let that = this
        that.reportData.drugDetails[item].drugClinicalNotes.splice(index, 1)
      },
      addpp3(item, index) {
        let that = this
        let n = {
          "diseaseNames": "",
          "isCurrentDisease": 0,
          "clinicalNote": ""
        }
        that.reportData.drugDetails[item].drugClinicalNotes[index].clinicalNotes.push(n)
      },
      delpp3(item, index) {
        let that = this
        that.reportData.drugDetails[item].drugClinicalNotes[index].clinicalNotes.splice(index, 1)
      },
      addpp4() {
        let that = this
        that.reportData.drugDetails.chemo.push({
          drugEffective: '',
          clinicalNote: ''
        })
      },
      delpp4(index) {
        let that = this
        that.reportData.drugDetails.chemo.splice(index, 1)
      }
    },
    filters: {
      formatDate (time) {
        if (time !== undefined && time !== null && time !== '') {
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd')
        } else {
          return ''
        }
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
  .rightContent{ margin:20px 0 0 260px; background:#fff; height:700px; overflow: auto;border:solid 1px #ddd; }


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
  .table-cont { margin-bottom:20px;}
  .table-cont table { width: 100%;}
  .table-cont table tr:hover {background: #e1e1e1; cursor: pointer;}
  .table-cont table tr td,.table-cont table tr th {text-align:left; padding: 3px 15px; border-left:solid 1px #eee; border-bottom:solid 1px #eee; font-size:14px; }
  .table-cont table tr th {    line-height: 2; padding: 8px 15px; border-top:solid 1px #eee;}
  .table-cont table tr td { line-height: 2; position: relative; vertical-align: top }
  .table-cont table tr td input{ width:100%; }
  .table-cont .introduce{ padding: 15px 20px; line-height: 1.5; margin-left:30px;}
  .el-table--border, .el-table--group, .el-table {
    margin-top: 20px;
    border: 1px solid #ebebeb;
    border-radius: 3px;}
  
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
  .table_add{ position: absolute; top:-40px; right:0px; }
  .table_add a{ color:#fff;  text-decoration: none }
  .itemsAdd{ position: absolute; top:0; right:0; cursor: pointer;}
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
      .inlineItem{ margin:20px auto 10px auto; color:#555; }
      .inlineItem li{ display: inline-block; line-height: 3; }
      .list-decimal { padding: 20px 0; }
      .list-decimal li{ list-style: decimal outside; margin: 0 0 0 35px; padding: 5px 0 10px 10px}
      input[type="text"],textarea{ outline: none; border:none; width: 100%; resize:none; background: none; padding:0 5px;  }
      input[type="text"].underline{ border-bottom:solid 1px #444;}
      .innerDiv { position: relative; }
      .innerDiv ul { position: absolute; top:20px; left:-3px; }
      .table-cont table.table-center th,.table-cont table.table-center td{ padding: 8px 7px; text-align: center; font-size:12px; font-weight: bold;}
  .el-dropdown-menu {    width: 42px;    overflow: hidden;    min-width: 20px;}
  table.tipList { font-size:14px; width: 90%; color:#757575; margin:-10px 0;}
  .blockContent .search-wrapper + .table-cont{ margin-top:50px; }
  .tableListItem{border-bottom:solid 1px #eee; margin:0 0 0 -15px;font-size: 14px;width: 90%;line-height: 1.5;}
  table.inlineItem tr td:first-child { padding-left: 0px;}
</style>
<style>
  .reportsStyle { font:normal 14px  "微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif; color:#000;}
  .reportsStyle input.el-input__inner,.reportsStyle textarea{ border:none; border-radius: 0; height:auto; resize: none; background:none; }
  .reportsStyle .underline input{ border-bottom:solid 1px #444; }
  .table-center table.el-table__header th{ padding: 8px 7px; text-align: center; font-size:12px; font-weight: bold;  border-bottom:solid 1px #ebebeb; background: none;}
  .table-center table.el-table__header th>.cell { line-height: 2; background: none }
  .cont-items .part50 .el-input.is-disabled .el-input__inner{background: none;border-bottom:solid 1px #444; cursor: auto}
  .cont-items .part50 .el-select .el-input .el-input__icon { display: none; }
  .reportsStyle .el-table .cell{ padding:0 10px; }
  .color_blue .el-textarea__inner { color:blue; }
  .underline textarea{ border-bottom:solid 1px #444; }
  .underline textarea.el-textarea__inner{padding:0px 5px;}
  .editorTextarea textarea.el-textarea__inner{ word-break: break-all; min-height: 100px!important; }
  .blockContent{ height:680px; overflow: auto; padding:20px 30px 0 30px;}
  .blockContent table textarea,.blockContent table input{ border:none; background: none; }
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  .leftNav::-webkit-scrollbar{
      width: 6px;
      height: 6px;
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
      border-radius: 3px;
      /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
      background-color: #ddd;
  }
  .blockContent .el-collapse{margin-top:20px;}
  .blockContent .el-collapse-item__wrap{ border:solid 1px #ddd; border-top:none; }
  .blockContent .el-collapse-item.collapse_item_title .el-collapse-item__header {padding: 0 20px; border: solid 1px #ddd; margin-top:-1px; background: #f9f9f9;}
  .blockContent .el-collapse-item.collapse_item_title .el-collapse-item__content{padding: 25px 25px;}

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
  .blockContent .el-table .cell,.blockContent .el-table th div,.blockContent .el-table .cell,.blockContent .el-table--border td:first-child .cell,.blockContent .el-table--border th:first-child .cell{ padding: 0px; }
  .blockContent .el-table td{ padding: 0; }
  .blockContent .el-table td:last-child .cell {padding-left: 10px;}
  .blockContent .el-table--border td:last-child .cell,.blockContent .el-table--border th:last-child .cell{padding-left: 10px;}
  .contextMenu{ width: 100%; min-height: 33px; background: #F9F9F9; padding: 5px 10px; cursor: pointer; word-break: break-all;}
  .contextMenu.color_blue{ color:blue; }
  body .el-dropdown-menu.el-popper .el-dropdown-menu__item{ padding: 0 12px; }
  .blockContent .el-dropdown{ margin-left:40px; }
  .blockContent .ql-editor{ min-height:200px; max-height:400px; overflow: auto; }
  .blockContent .ql-editor strong{font-weight: bold;}
  .blockContent .ql-editor em{ font-style: italic; }
  .blockContent .ql-align.ql-picker.ql-icon-picker,.blockContent .ql-clean,.blockContent .ql-image,.blockContent .ql-video { display:none!important; }
  .introduce .el-upload-list--picture .el-upload-list__item{margin-top:60px;}
  .imgList li{ position: relative;  margin:10px 0 113px -100%;}
  .imgList .reportsStyle input.el-input__inner{ /*font-weight: bold;*/ }
  .needRemove .cell{max-height: 260px; overflow: auto; margin:5px;}
  .el-message{transition: opacity 0s,transform 0s!important;}
  .blockContent .query-form{margin-top:0; padding-top:15px;}
  .blockContent .search-wrapper{margin:10px 0 20px 0;}
  .blockContent .search-wrapper .el-form-item{margin-bottom:15px;}
  .tableOverflow .el-table__body-wrapper{overflow: auto;}
  .rightEditBox .ql-snow .ql-picker{ line-height: 1; }
  .rightEditBox .ql-toolbar.ql-snow{ padding: 0; }
  .rightEditBox .ql-editor{  min-height: 100px!important;}
  .pp3{ margin-bottom:10px; position: relative; z-index:3;}
  .pp3 p{margin-bottom:0; width: calc(100% - 20em); }
  .pp2{ position: relative; z-index: 2; }
  .pp2 > .table_add{top:0; right:10em; z-index:9;}
  .pp2 .pp3 .table_add{top:0px; right:16em; z-index:9;}
  .activeItems{ position: relative; margin: 20px 0 0 0; border: solid 1px #ddd; padding: 10px; background: #eee;}
  .activeItems > p { width: calc(100% - 10em);  }
  .activeItems > .table_add{ top:10px; right:10px; }
</style>
