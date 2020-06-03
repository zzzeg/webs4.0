<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>添加报告小结</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabCard">
      <a @click="tabShow = 0" :class="{'active':tabShow === 0 , 'no':tabShow === 1}">分析内容</a><a @click="tabShow = 1" :class="{'active':tabShow === 1 , 'no':tabShow === 0}">疗法小结</a>
    </div>
    <div class="clearT" style="overflow:hidden">
      <div class="table-message" v-if="tabShow === 1">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
          <el-form-item label="小结：" >
            <el-col :span="12">
              <el-form-item prop="description">
               <el-input type="textarea" v-model="formData.description" :rows="8" placeholder="小结内容"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="　">
            <el-button type="primary" :loading="isLoading" @click="subSummary('formData')">
              {{ isLoading ? '正在提交' : '提交' }}
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="table-data"
         v-loading="false"
         element-loading-text="拼命加载中" style="margin:40px 20px 0 0; padding-top:40px; border-top:solid 1px #ddd">
          <el-table :data="tableData" border style="">
            <el-table-column type="index" label="序号" width="80">
              <!-- <template scope="scope">
                <img :src="scope.row.logo" class="coupon-logo">
              </template> -->
            </el-table-column>
            <el-table-column prop="description" label="历史记录">
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <pager :current-page="sumCurrent"  :pageSize="sumPagesize" :total-count="sumtotal" v-on:handleCurrentChange="getsummary_msg"></pager>
      </div>
      <!--报告-->
      <div class="table-data" element-loading-text="拼命加载中" style="" v-if="tabShow === 0">
        <!--report_begin-->
        <div class="reportAll" style="margin:0 auto; width:960px; width:80%;">
          <div class="headers">
            <span style="float:left"><img src="http://bainuo.cn/images/logo.png" alt="logo"></span>
            <span>{{reportData.name}}</span>
          </div>
          <h1><span style="float:right">报告日期：{{reportData.createTime | formatDate}}</span><span style="float:left">受检者ID：{{ reportData.projectCode }}</span></h1>

          <div class="tableLists" >
            
            <!--表格开始--><!--01 受检者基本信息-->
            <div :class="{'tableItems':part01.check === false, 'tableItems toggleHide':part01.check === true}"  style="width:30%;float: left" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part01.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part01)">编辑</a></div>
              </div>
              <div class="table-cont" v-if="part01.check === false">
                <table>
                  <tr>
                    <td>id</td>
                    <td>{{part01.infos.id}}</td>
                  </tr>
                  <tr>
                    <td>姓名：</td>
                    <td>{{part01.infos.user_name}}</td>
                  </tr>
                  <tr>
                    <td>性别：</td>
                    <td>{{part01.infos.gender}}</td>
                  </tr>
                  <tr>
                    <td>出生日期：</td>
                    <td>{{part01.infos.birthday}}</td>
                  </tr>
                  <tr>
                    <td>种族：</td>
                    <td>{{part01.infos.race}}</td>
                  </tr>
                  <tr>
                    <td>地域来源：</td>
                    <td>{{part01.infos.address}}</td>
                  </tr>
                </table>
              </div>
              <div class="table-cont toggleHide" v-if="part01.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part01)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part01, part01.blockCode)">取消</a>
                </div>
                <table>
                  <tr>
                    <td>id</td>
                    <td><el-input  type="text" v-model="part01.infos.id"></el-input></td>
                  </tr>
                  <tr>
                    <td>姓名：</td>
                    <td><el-input  type="text" v-model="part01.infos.user_name"></el-input></td>
                  </tr>
                  <tr>
                    <td>性别：</td>
                    <td>
                      <el-select  v-model="part01.infos.gender" style="width:100%" clearable placeholder="请选择">
                        <el-option :label="item.label" :value="item.value" v-for="item in gender"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td>出生日期：</td>
                    <td><el-input  type="text" v-model="part01.infos.birthday"></el-input></td>
                  </tr>
                  <tr>
                    <td>种族：</td>
                    <td>
                      <!-- <el-input  type="text" v-model="part01.infos.race"></el-input> -->
                      <el-select  v-model="part01.infos.race" style="width:100%" clearable placeholder="请选择">
                        <el-option :label="item.label" :value="item.value" v-for="item in race"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td>地域来源：</td>
                    <td><el-input  type="text" v-model="part01.infos.address"></el-input></td>
                  </tr>
                </table>
              </div>
            </div>
            <!--表格结束-->

            <!--表格开始--><!--02 疾病信息-->
            <div :class="{'tableItems':part02.check === false, 'tableItems toggleHide':part02.check === true}" style="width:64%; float:right;"  >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part02.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part02)">编辑</a></div>
              </div>
              <div class="table-cont" v-if="part02.check === false">
                <table>
                  <tr>
                    <td>临床诊断：</td>
                    <td>{{part02.infos.clinical_diagnosis}}</td>
                  </tr>
                  <tr>
                    <td>病理诊断：</td>
                    <td>{{part02.infos.pathology_diagnosis}}</td>
                  </tr>
                  <tr>
                    <td>现病史：</td>
                    <td>{{part02.infos.recent_medical_history}}</td>
                  </tr>
                  <tr>
                    <td>既往史：</td>
                    <td>{{part02.infos.before_medical_history}}</td>
                  </tr>
                  <tr>
                    <td>家族史：</td>
                    <td>{{part02.infos.family_medical_history}}</td>
                  </tr>
                  <tr>
                    <td>疾病风险因素：</td>
                    <td>{{part02.infos.disease_risk_factory}}</td>
                  </tr>
                </table>
              </div>
              <div class="table-cont toggleHide" v-if="part02.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part02)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part02, part02.blockCode)">取消</a>
                </div>
                <table>
                  <tr>
                    <td>临床诊断：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.clinical_diagnosis"></el-input></td>
                  </tr>
                  <tr>
                    <td>病理诊断：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.pathology_diagnosis"></el-input></td>
                  </tr>
                  <tr>
                    <td>现病史：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.recent_medical_history"></el-input></td>
                  </tr>
                  <tr>
                    <td>既往史：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.before_medical_history"></el-input></td>
                  </tr>
                  <tr>
                    <td>家族史：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.family_medical_history"></el-input></td>
                  </tr>
                  <tr>
                    <td>疾病风险因素：</td>
                    <td><el-input  type="textarea" v-model="part02.infos.disease_risk_factory"></el-input></td>
                  </tr>
                </table>
              </div>
            </div>
            <br clear="all" />
            <!--表格结束-->
            
            <!--表格开始--><!--03 样本信息-->
            <div :class="{'tableItems':part03.check === false, 'tableItems toggleHide':part03.check === true}"  >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part03.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part03)">编辑</a></div>
              </div>
              <div class="table-cont" v-if="part03.check === false">
                <table>
                  <tr>
                    <th>样本ID</th>
                    <th>样本类型</th>
                    <th>样本属性</th>
                    <th>采集时间</th>
                    <th>检测时间</th>
                  </tr>
                  <tr>
                    <td>{{part03.infos.sample_id}}</td>
                    <td>{{part03.infos.sample_type}}</td>
                    <td>{{part03.infos.sample_attribute}}</td>
                    <td>{{part03.infos.sample_collection_time}}</td>
                    <td>{{part03.infos.sample_testing_time}}</td>
                  </tr>
                </table>
              </div>
              <div class="table-cont toggleHide" v-if="part03.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part03)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part03, part03.blockCode)">取消</a>
                </div>
                <table>
                  <tr>
                    <th>样本ID</th>
                    <th>样本类型</th>
                    <th>样本属性</th>
                    <th>采集时间</th>
                    <th>检测时间</th>
                  </tr>
                  <tr>
                    <td><el-input  v-model="part03.infos.sample_id" type="text"></el-input></td>
                    <td><el-input  v-model="part03.infos.sample_type" type="text"></el-input></td>
                    <td><el-input  v-model="part03.infos.sample_attribute" type="text"></el-input></td>
                    <td><el-input  v-model="part03.infos.sample_collection_time" type="text"></el-input></td>
                    <td><el-input  v-model="part03.infos.sample_testing_time" type="text"></el-input></td>
                  </tr>
                </table>
              </div>
            </div>
            <!--表格结束-->
            
            <!--表格开始--> <!--04 检测平台信息及分析参考类目-->
            <div :class="{'tableItems':part04.check === false, 'tableItems toggleHide':part04.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part04.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part04)">编辑</a></div>
              </div>
              <div class="table-cont toggleHide" v-if="part04.check === false">
                <table>
                  <tr>
                    <td width="200px">检测信息:</td>
                    <td>{{part04.infos.sequencing_information}}</td>
                  </tr>
                  <tr>
                    <td>测序平台:</td>
                    <td>{{part04.infos.sequencing_platform}}</td>
                  </tr>
                  <tr>
                    <td>检测基因数目:</td>
                    <td>{{part04.infos.test_gene_num}}</td>
                  </tr>
                  <tr>
                    <td>基因列表:</td>
                    <td>{{part04.infos.gene_list1}}</td>
                  </tr>
                  <tr>
                    <td>参考基因组:</td>
                    <td>{{part04.infos.ref}}</td>
                  </tr>
                  <tr>
                    <td>分析流程版本:</td>
                    <td>{{part04.infos.analysis_version}}</td>
                  </tr>
                </table>
              </div>
              <div class="table-cont" v-if="part04.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part04)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part04, part04.blockCode)">取消</a>
                </div>
                <table>
                  <tr>
                    <td>检测信息:</td>
                    <td><el-input  type="textarea" v-model="part04.infos.sequencing_information"></el-input></td>
                  </tr>
                  <tr>
                    <td>测序平台:</td>
                    <td><el-input  type="textarea" v-model="part04.infos.sequencing_platform"></el-input></td>
                  </tr>
                  <tr>
                    <td>检测基因数目:</td>
                    <td><el-input  type="text" v-model="part04.infos.test_gene_num"></el-input></td>
                  </tr>
                  <tr>
                    <td>基因列表:</td>
                    <td><el-input  type="textarea" v-model="part04.infos.gene_list1"></el-input></td>
                  </tr>
                  <tr>
                    <td>参考基因组:</td>
                    <td><el-input  type="textarea" v-model="part04.infos.ref"></el-input></td>
                  </tr>
                  <tr>
                    <td>分析流程版本:</td>
                    <td><el-input  type="text"  v-model="part04.infos.analysis_version"></el-input></td>
                  </tr>
                </table>
              </div>
            </div>
            <!--表格结束-->

            <!--表格开始--><!--0501 基因突变-->
            <div :class="{'tableItems':part0501.check === false, 'tableItems toggleHide':part0501.check === true}" >
              <h2>基因变异结果总览</h2>
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0501.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0501)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0501)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0501.check === false">
                <el-table :data="part0501.infos">
                  <el-table-column label="基因 / 突变" prop="mutation_gene">
                  </el-table-column>
                  <el-table-column label="rs 号" prop="rs_num">
                  </el-table-column>
                  <el-table-column label="突变类型" prop="mutation_type">
                  </el-table-column>
                  <el-table-column label="临床意义" prop="clinical_significant">
                  </el-table-column>
                  <el-table-column label="参考序列" prop="reference_sequence">
                  </el-table-column>
                  <el-table-column label="丰度" prop="mutation_freq">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont toggleHide" v-show="part0501.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0501)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0501, part0501.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0501.infos">
                  <el-table-column label="基因 / 突变">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.mutation_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="rs 号">
                    <template scope="scope">
                      <el-input  v-model="scope.row.rs_num" type="text"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="突变类型">
                    <template scope="scope">
                      <el-input  v-model="scope.row.mutation_type" type="text"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="临床意义">
                    <template scope="scope">
                      <el-input  v-model="scope.row.clinical_significant" type="text"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参考序列">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.reference_sequence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="丰度">
                    <template scope="scope">
                      <el-input  v-model="scope.row.mutation_freq" type="text"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0501, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!--表格结束-->


            <h2>临床解读结果汇总</h2>

            <!--小结 part 11-->
            <div :class="{'tableItems':part11.check === false, 'tableItems toggleHide':part11.check === true}"  >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part11.name }}</h3>
                <!-- <div class="table-edit"><a href="javascript:;" @click="edit(part11)">编辑</a></div> -->
              </div>
              <div class="table-cont">
                <!-- <div class="table-btns" v-show="part11.check === true">
                    <a href="javascript:;" class="sub" @click="sub(part11)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part11, part11.blockCode)">取消</a>
                </div> -->
                <div class="introduce" v-show="part11.check === false">
                  <p>{{ part11.infos.summary_msg }}</p>
                </div>
                <!-- <div class="introduce toggleHide" v-show="part11.check === true">
                  <el-row><el-input  type="textarea" :rows="10" v-model="part11.infos.disclaimer"></el-input></el-row>
                </div> -->
              </div>
            </div>
            <!--小结-->

            <dl class="dl_tip">
             <dt>附加说明：</dt>
              <dt>1.红色标注的药物表示该药物在对应变异下表现为耐药；另外，临床医师需将变异频率纳入临床决策考量。</dt>
              <dt>2.证据等级：为该条注释的最高证据等级。</dt>
              <dd><b>Level 1A：</b><span>来源于NCCN/CSCO指南、FDA/CFDA批准方案的结论。</span></dd>
              <dd><b>Level 1B：</b><span>来源于ASCO/ESMO/ACMG指南、EMA/PMDA/HCSC批准方案的结论。</span></dd>
              <dd><b>Level 2A：</b><span>来源于其他指南、共识的结论。</span></dd>
              <dd><b>Level 2B：</b><span>来源于PharmGKB数据库的结论。</span></dd>
              <dd><b>Level 3A：</b><span>来源于临床研究文献、clinicaltrials中的结论。clinicaltrials</span></dd>
              <dd><b>Level 3B：</b><span>来源于临床前研究文献中的结论。</span></dd>
              <dd><b>Level 4：</b><span>基于功能预测得出的结论。</span></dd>
            </dl>
            <!--表格开始--><!--0502 基因融合-->
            <div :class="{'tableItems':part0502.check === false, 'tableItems toggleHide':part0502.check === true}" style="display:none">
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0502.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0502)">编辑</a></div>
              </div>
              <div class="table-cont" v-show="part0502.check === false">
                <el-table :data="part0502.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0502.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0502)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0502, part0502.blockCode)">取消</a>
                </div>
                <el-table :data="part0502.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!--表格结束-->
            
            <!--0503 基因表达-->
            <div :class="{'tableItems':part0503.check === false, 'tableItems toggleHide':part0503.check === true}" style="display:none">
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0503.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0503)">编辑</a></div>
              </div>
              <div class="table-cont" v-show="part0503.check === false">
                <el-table :data="part0503.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0503.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0503)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0503, part0503.blockCode)">取消</a>
                </div>
                <el-table :data="part0503.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
              
            <!--0504 基因扩增-->
            <div :class="{'tableItems':part0504.check === false, 'tableItems toggleHide':part0504.check === true}" style="display:none">
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0504.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0504)">编辑</a></div>
              </div>
              <div class="table-cont" v-show="part0504.check === false">
                <el-table :data="part0504.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0504.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0504)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0504, part0504.blockCode)">取消</a>
                </div>
                <el-table :data="part0504.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
              
            <!--0505 基因拷贝数变异-->
            <div :class="{'tableItems':part0505.check === false, 'tableItems toggleHide':part0505.check === true}" style="display:none">
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0505.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0505)">编辑</a></div>
              </div>
              <div class="table-cont" v-show="part0505.check === false">
                <el-table :data="part0505.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0505.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0505)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0505, part0505.blockCode)">取消</a>
                </div>
                <el-table :data="part0505.infos">
                  <el-table-column label="" prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            
            <!--0601 靶向治疗相关解读信息-->
            <div :class="{'tableItems':part0601.check === false, 'tableItems toggleHide':part0601.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0601.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0601)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0601)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0601.check === false">
                <el-table :data="part0601.infos">
                  <el-table-column width="160px" label="基因" prop="approval_gene">
                  </el-table-column>
                  <el-table-column label="药物名称" prop="approval_drug_general_name">
                  </el-table-column>
                  <el-table-column width="120px" label="药物敏感性" prop="approval_drug_sensitivity">
                  </el-table-column>
                  <el-table-column width="100px" label="癌种" prop="approval_disease">
                  </el-table-column>
                  <el-table-column label="注释" prop="approval_annotation">
                  </el-table-column>
                  <el-table-column width="100px" label="证据等级" prop="approval_level_evidence">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0601.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0601)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0601, part0601.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0601.infos">
                  <el-table-column label="基因">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_drug_general_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物敏感性">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_drug_sensitivity"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="癌种">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_disease"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.approval_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0601, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>


            <!--part0602 免疫靶向治疗相关解读信息-->
            <div :class="{'tableItems':part0602.check === false, 'tableItems toggleHide':part0602.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0602.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0602)">编辑</a></div> 
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0602)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0602.check === false">
                <el-table :data="part0602.infos">
                  <el-table-column label="基因" prop="immune_gene">
                  </el-table-column>
                  <el-table-column label="药物名称" prop="immune_drug_general_name">
                  </el-table-column>
                  <el-table-column label="药物敏感性" prop="immune_drug_sensitivity">
                  </el-table-column>
                  <el-table-column label="癌种" prop="immune_disease">
                  </el-table-column>
                  <el-table-column label="注释" prop="immune_annotation">
                  </el-table-column>
                  <el-table-column label="证据等级" prop="immune_level_evidence">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0602.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0602)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0602, part0602.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0602.infos">
                  <el-table-column label="基因">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_drug_general_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物敏感性">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_drug_sensitivity"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="癌种">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_disease"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.immune_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0602, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <!--0603 细胞免疫治疗相关解读信息-->
            <div :class="{'tableItems':part0603.check === false, 'tableItems toggleHide':part0603.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0603.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0603)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0603)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0603.check === false">
                <el-table :data="part0603.infos">
                  <el-table-column label="免疫细胞名称" prop="cellular_immunity_name">
                  </el-table-column>
                  <el-table-column label="药物名称" prop="cellular_immunity_drug_general_name">
                  </el-table-column>
                  <el-table-column label="癌种" prop="cellular_immunity_disease">
                  </el-table-column>
                  <el-table-column label="注释" prop="cellular_immunity_annotation">
                  </el-table-column>
                  <el-table-column label="证据等级" prop="cellular_immunity_level_evidence">
                  </el-table-column>
                  <el-table-column label="临床研究阶段" prop="cellular_health_insurance">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0603.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0603)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0603, part0603.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0603.infos">
                  <el-table-column label="免疫细胞名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_immunity_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_immunity_drug_general_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="癌种">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_immunity_disease"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_immunity_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_immunity_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="临床研究阶段">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.cellular_health_insurance"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0603, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            
            <!--0604 化疗药物相关解读信息-->
            <div :class="{'tableItems':part0604.check === false, 'tableItems toggleHide':part0604.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0604.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0604)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0604)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0604.check === false">
                <el-table :data="part0604.infos">
                  <el-table-column label="基因/变异" prop="chemotherapy_gene">
                  </el-table-column>
                  <el-table-column label="rs号" prop="chemotherapy_rs_num">
                  </el-table-column>
                  <el-table-column label="基因型" prop="chemotherapy_gene_type">
                  </el-table-column>
                  <el-table-column label="药物名称" prop="chemotherapy_drug_general_name">
                  </el-table-column>
                  <el-table-column label="不良反应" prop="chemotherapy_drug_adverse_reactions" width="200">
                  </el-table-column>
                  <el-table-column label="剂量" prop="chemotherapy_drug_dose">
                  </el-table-column>
                  <el-table-column label="效率" prop="chemotherapy_effectiveness">
                  </el-table-column>
                  <el-table-column label="注释" prop="chemotherapy_annotation" width="320">
                  </el-table-column>
                  <el-table-column label="证据等级" prop="chemotherapy_level_evidence">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0604.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0604)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0604, part0604.blockCode)">取消</a>
                </div>
                <el-table  class="needRemove" :data="part0604.infos">
                  <el-table-column label="基因/变异">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="rs号">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_rs_num"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="基因型">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_gene_type"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="药物名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_drug_general_name"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column label="不良反应" width="200">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_drug_adverse_reactions"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="剂量">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_drug_dose"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="效率">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_effectiveness"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释" width="320">
                    <template scope="scope">
                      <el-input type="textarea" :rows="5" v-model="scope.row.chemotherapy_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.chemotherapy_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0604, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            


            <!--0605 放疗药物相关解读信息-->
            <div :class="{'tableItems':part0605.check === false, 'tableItems toggleHide':part0605.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0605.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0605)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0605)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0605.check === false">
                <el-table :data="part0605.infos">
                  <el-table-column label="基因/变异" prop="radiotherapy_gene">
                  </el-table-column>
                  <el-table-column label="rs号" prop="radiotherapy_rs_num">
                  </el-table-column>
                  <el-table-column label="基因型" prop="radiotherapy_gene_type">
                  </el-table-column>
                  <el-table-column label="药物名称" prop="radiotherapy_drug_general_name">
                  </el-table-column>
                  <el-table-column label="不良反应" prop="radiotherapy_drug_brand_name">
                  </el-table-column>
                  <el-table-column label="剂量" prop="radiotherapy_drug_adverse_reactions">
                  </el-table-column>
                  <el-table-column label="效率" prop="radiotherapy_drug_dose">
                  </el-table-column>
                  <el-table-column label="注释" prop="radiotherapy_annotation" width="420">
                  </el-table-column>
                  <el-table-column label="证据等级" prop="radiotherapy_level_evidence">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0605.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0605)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0605, part0605.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0605.infos">
                  <el-table-column label="基因/变异">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="rs号">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_rs_num"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="基因型">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_gene_type"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column label="药物名称">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_drug_general_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="不良反应">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_drug_brand_name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="剂量">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_drug_adverse_reactions"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="效率">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_drug_dose"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释" width="420">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.radiotherapy_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0605, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <!--0606 预后相关解读信息-->
            <div :class="{'tableItems':part0606.check === false, 'tableItems toggleHide':part0606.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part0606.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part0606)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part0606)">+添加</span>
              </div>
              <div class="table-cont" v-show="part0606.check === false">
                <el-table :data="part0606.infos">
                  <el-table-column label="基因/变异" prop="prognosis_gene">
                  </el-table-column>
                  <el-table-column label="对预后影响" prop="prognosis">
                  </el-table-column>
                  <el-table-column label="注释" prop="prognosis_annotation">
                  </el-table-column>
                  <el-table-column label="证据等级" prop="prognosis_level_evidence">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-cont" v-show="part0606.check === true">
                <div class="table-btns">
                    <a href="javascript:;" class="sub" @click="sub(part0606)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part0606, part0606.blockCode)">取消</a>
                </div>
                <el-table class="needRemove" :data="part0606.infos">
                  <el-table-column label="基因/变异">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.prognosis_gene"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="对预后影响">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.prognosis"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="注释">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.prognosis_annotation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="证据等级">
                    <template scope="scope">
                      <el-input  type="textarea" v-model="scope.row.prognosis_level_evidence"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <el-button type="danger" size="small" @click="delListItem(part0606, scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>


            <!--临床试验入组推荐-->
            <div :class="{'tableItems':part07.check === false, 'tableItems toggleHide':part07.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part07.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part07)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part07)">+添加</span>
              </div>
              <div class="table-cont">
                <div class="table-btns" v-show="part07.check === true">
                    <a href="javascript:;" class="sub" @click="sub(part07)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part07, part07.blockCode)">取消</a>
                </div>
                <div class="introduce">
                  根据对受检者基因变异情况的分析，从clinicaltrials.gov和chinadrugtrials.org网站对正在招募中的临床试验进行检索，结合受检者所在地点，推荐以下临床试验入组详细信息。 详细信息请参看ClinicalTrials等相关网站的具体介绍。
                </div>
                <div class="table_list" v-for="(iteme, index) in part07.infos">
                  <table>
                    <tr>
                      <th>{{ iteme.clinical_id }}</th>
                      <th align="right"><el-button type="danger" size="small" @click="delListItem(part07, index)" v-if="part07.check === true">删除</el-button></th>
                    </tr>
                    <tr>
                      <td>临床试验题目</td>
                      <td>{{ iteme.clinical_name }}</td>
                    </tr>
                    <tr>
                      <td>试验分期:</td>
                      <td>{{ iteme.phase }}</td>
                    </tr>
                    <tr>
                      <td>干预类型:</td>
                      <td>{{ iteme.intervention_type }}</td>
                    </tr>
                    <tr>
                      <td>干预名字：</td>
                      <td>{{ iteme.intervention_name }}</td>
                    </tr>
                    <tr>
                      <td>适应症:</td>
                      <td>{{ iteme.indications }}</td>
                    </tr>
                    <tr>
                      <td>联系方式:</td>
                      <td>{{ iteme.contact_information }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <el-dialog title="临床入组选择" :visible.sync="showprty07" size="large">
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
                    <!-- <el-autocomplete
                      class="inline-input"
                      v-model="searchWrapper.recruitCountry"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入内容"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                    ></el-autocomplete> -->
                  </el-form-item>
                  <div class="xx" v-show="searchShow === true">
                    <el-form-item label="年龄段范围：">
                      <el-select  v-model="searchWrapper.ageRange" style="width:100%" clearable placeholder="请选择">
                        <el-option :label="item.label" :value="item.value" v-for="item in ageList"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="试验分期：">
                      <el-select  v-model="searchWrapper.phase" style="width:100%" clearable placeholder="请选择">
                        <el-option :label="item.label" :value="item.value" v-for="item in phaseList"></el-option>
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
                      <el-button type="primary" @click="getPrat07Item">查询</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div class="part07Data">
                <el-table :data="part07Data" v-loading="listLoading" border style="width: 100%">
                  <!-- <el-table-column type="index" label="序号" width="80">
                  </el-table-column> -->
                  <el-table-column label="研究课题" width="400">
                    <template scope="scope">
                      <a :href="'https://clinicaltrials.gov/ct2/show/' + scope.row.nctId">{{ scope.row.briefTitle }}</a>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="城市" prop="city">
                  </el-table-column> -->
                  <el-table-column label="地址">
                    <template scope="scope">
                      {{ scope.row.country }}{{ scope.row.state }}{{ scope.row.city }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="州" prop="state">
                  </el-table-column> -->
                  <el-table-column label="邮件" prop="email">
                  </el-table-column>
                  <el-table-column label="招募机构" prop="facilityName">
                  </el-table-column>
                  <el-table-column label="联系人" prop="peopleName">
                  </el-table-column>
                  <!-- <el-table-column label="手机号" prop="phone">
                  </el-table-column> -->
                  <el-table-column label="操作" width="100">
                    <template scope="scope">
                      <el-button type="success" size="small" @click="pushpart07(part07, scope.row)">添加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <pager :current-page="currentPage" :pageSize="pageSize" :total-count="totalCount" v-on:handleCurrentChange="getPrat07Item"></pager>
            </el-dialog>


            <!--结直肠癌信号通路图-->
            <div :class="{'tableItems':part08.check === false, 'tableItems toggleHide':part08.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part08.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part08)">编辑</a></div>
                <!-- <span class="itemsAdd" title="增加一条" @click="pushListItem(part)">+添加</span> -->
              </div>
              <div class="table-cont">
                <div class="table-btns" v-show="part08.check === true">
                    <a href="javascript:;" class="sub" @click="sub(part08)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part08, part08.blockCode)">取消</a>
                </div>
                <div class="introduce" v-for="itemr in part08.infos" v-show="part08.check === false">
                  <img :src="itemr.pathway_path">
                </div>
                <div class="introduce toggleItem" v-show="part08.check === true">
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

            <!--参考文献-->
            <div :class="{'tableItems':part09.check === false, 'tableItems toggleHide':part09.check === true}" >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part09.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part09)">编辑</a></div>
                <span class="itemsAdd" title="增加一条" @click="pushListItem(part09)">+添加</span>
              </div>
              <div class="table-cont">
                <div class="table-btns" v-show="part09.check === true">
                    <a href="javascript:;" class="sub" @click="sub(part09)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part09, part09.blockCode)">取消</a>
                </div>
                <div class="introduce"  v-show="part09.check === false">
                  <div class="text_list" v-for="(itemr, indexer) in part09.infos" :key="indexer">
                    <p>{{ indexer + 1 }}、{{itemr.literature_name}}</p>
                    <p><a :href="itemr.literature_url">{{ itemr.literature_url }}</a></p>
                  </div>
                </div>
                <div class="toggleHide"  v-show="part09.check === true">
                  <el-table class="needRemove" :data="part09.infos">
                    <el-table-column type="index" label="序号" style="text-align:left" width="100"></el-table-column>
                    <el-table-column label="标题">
                      <template scope="scope">
                        <el-col :span="18"><el-input type="text" v-model="scope.row.literature_name"></el-input></el-col>
                      </template>
                    </el-table-column>
                    <el-table-column label="链接地址">
                      <template scope="scope">
                        <el-col :span="18"><el-input type="text" v-model="scope.row.literature_url"></el-input></el-col>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                      <template scope="scope">
                        <el-button type="danger" size="small" @click="delListItem(part09, scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>


            <!--免责声明-->
            <div :class="{'tableItems':part10.check === false, 'tableItems toggleHide':part10.check === true}"  >
              <div class="table-title" style="background-color: #14CB6A;">
                <h3>{{ part10.name }}</h3>
                <div class="table-edit"><a href="javascript:;" @click="edit(part10)">编辑</a></div>
              </div>
              <div class="table-cont">
                <div class="table-btns" v-show="part10.check === true">
                    <a href="javascript:;" class="sub" @click="sub(part10)">保存</a>
                    <a href="javascript:;" class="cancel" @click="cancel(part10, part10.blockCode)">取消</a>
                </div>
                <div class="introduce" v-show="part10.check === false">
                  <p>{{ part10.infos.disclaimer }}</p>
                </div>
                <div class="introduce toggleHide" v-show="part10.check === true">
                  <el-row><el-input  type="textarea" :rows="10" v-model="part10.infos.disclaimer"></el-input></el-row>
                </div>
              </div>
            </div>
            <!--免责声明end-->

          </div>
        </div>
        <!--report_end-->
      </div>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import Pager from '@/components/common/pager'
  import axios from 'axios'
  import {formatDate} from '@/common/js/Utils.js'

  export default {
    created () {
      // this.htmlUrlF = 'report/genereport?projectCode=b552a50047774b4f8da41efd00aaeb28'
      // this.pdfUrlF = 'report/genereport?projectCode=b552a50047774b4f8da41efd00aaeb28&rf=pdf'
      this.getReportData()
      // 获取小结列表
      this.getsummary_msg(this.sumCurrent)
    },
    data () {
      return {
        htmlUrlF: '',
        pdfUrlF: '',
        tabShow: 0,
        tableData: [],
        code: this.$route.params.id,
        // code: 'e0448bfa286b4ad7b14e4d576ec6101b',
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
        imgUploadUrl: URL.api_name + 'cloud/upload_flow_image',
        fileList: [],
        gender: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }],
        race: [{
          label: '欧洲',
          value: 0
        }, {
          label: '亚洲',
          value: 1
        }],
        formData: {
          description: ''
        },
        listLoading: true,
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
        part07Data: [],
        showprty07: false,
        copyData: {},
        reportData: {},
        part01: {},
        part02: {},
        part03: {},
        part04: {},
        part0501: {},
        part0502: {},
        part0503: {},
        part0504: {},
        part0505: {},
        part0601: {},
        part0602: {},
        part0603: {},
        part0604: {},
        part0605: {},
        part0606: {},
        part07: {},
        part08: {},
        part09: {},
        part10: {},
        part11: {}
      }
    },
    methods: {
      getReportData () {
        let that = this
        that.loading = true
        // let url = './static/block.json'
        let url = URL.api_name + 'report/report_detail'
        axios.get(url, {
          params: {
            projectCode: that.code
          }
        }).then(function (respose) {
          if (respose.data.code === '100') {
            that.reportData = respose.data.data
            // that.copyData = respose.data.data
            // 获取图片
            for (let i = 0; i < that.reportData.blockInfos.length; i++) {
              if (that.reportData.blockInfos[i].blockCode === '01') {
                that.part01 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '02') {
                that.part02 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '03') {
                that.part03 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '04') {
                that.part04 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0501') {
                that.part0501 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0502') {
                that.part0502 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0503') {
                that.part0503 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0504') {
                that.part0504 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0505') {
                that.part0505 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0601') {
                that.part0601 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0602') {
                that.part0602 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0603') {
                that.part0603 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0604') {
                that.part0604 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0605') {
                that.part0605 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '0606') {
                that.part0606 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '07') {
                that.part07 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '09') {
                that.part09 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '10') {
                that.part10 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '11') {
                that.part11 = that.reportData.blockInfos[i]
              } else if (that.reportData.blockInfos[i].blockCode === '08') {
                that.part08 = that.reportData.blockInfos[i]
                for (let n = 0; n < that.reportData.blockInfos[i].infos.length; n++) {
                  that.fileList.push({
                    name: that.reportData.blockInfos[i].infos[n].pathway_name,
                    url: that.reportData.blockInfos[i].infos[n].pathway_path
                  })
                }
              }
            }
            // console.log(that.reportData)
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
            message: '提交失败' + error,
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
        that.part08.infos.push({
          fileName: response.data.fileName,
          pathway_path: response.data.flowImageUrl
        })
        console.log(fileList)
        console.log(that.part08)
        // console.log(response)
        // if (response.code === '100') {
        //   for (let i = 0 ; i< that.reportData.blockInfos.length; i++) {
        //     if (that.reportData.blockInfos[i].blockCode === '08') {
        //       that.reportData.blockInfos[i].infos.push({
        //         pathway_name: respose.data.pathway_name,
        //         pathway_path: respose.data.pathway_path
        //       })
        //       that.reportData.blockInfos[i].infos = fileList
        //     }
        //   }
        // } else {
        //   this.fileList = []
        // }
      },
      handleRemove (file, fileList) {
        this.fileList = fileList
        let that = this
        that.part08.infos = []
        for (let i = 0; i < that.fileList.length; i++) {
          that.part08.infos.push({
            fileName: that.fileList[i].name,
            pathway_path: that.fileList[i].url
          })
        }
        console.log(fileList)
        console.log(that.part08)
        // console.log(file, fileList);
      },
      subSummary (formName) {
        // 提交小结
        var that = this
        this.$refs[formName].validate((valid) => {
          axios.post(URL.api_name + 'report/description_add', {
            description: that.formData.description,
            projectCode: that.code
          }).then(function (res) {
            // console.log('x2')
            if (res.data.code === '100') {
              that.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              })
            }
            that.part11.infos.summary_msg = that.formData.description
          }, function (error) {
            console.log(error)
            that.$message({
              type: 'error',
              message: '提交失败',
              duration: 1000
            })
          })
        })
      },
      sub (part) {
        // 提交单个表格
        // alert('x')
        let that = this
        that.isEdit = false
        part.check = false
        console.log(part)
        axios.post(URL.api_name + 'report/block_update', part).then(function (res) {
          if (res.data.code === '100') {
            that.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            part = res.data.data
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
      delListItem (part, index) {
        // 删除单条
        console.log(part)
        console.log(index)
        // splice用法  索引, 删几个
        part.infos.splice(index, 1)
      },
      pushListItem (part) {
        // 添加一条
        let that = this
        if (part.blockCode === '0501') {
          part.infos.push({
            mutation_gene: '',
            mutation: '',
            rs_num: '',
            mutation_type: '',
            clinical_significant: '',
            reference_sequence: '',
            mutation_freq: ''
          })
        } else if (part.blockCode === '0601') {
          part.infos.push({
            approval_gene: '',
            approval_mutation: '',
            approval_disease: '',
            approval_drug_general_name: '',
            approval_drug_brand_name: '',
            approval_drug_sensitivity: '',
            approval_annotation: '',
            approval_level_evidence: '',
            approval_health_insurance: ''
          })
        } else if (part.blockCode === '0602') {
          part.infos.push({
            immune_gene: '',
            immune_drug_general_name: '',
            immune_drug_sensitivity: '',
            immune_disease: '',
            immune_annotation: '',
            immune_level_evidence: ''
          })
        } else if (part.blockCode === '0603') {
          part.infos.push({
            cellular_immunity_name: '',
            cellular_immunity_drug_general_name: '',
            cellular_immunity_disease: '',
            cellular_immunity_annotation: '',
            cellular_immunity_level_evidence: '',
            cellular_health_insurance: ''
          })
        } else if (part.blockCode === '0604') {
          part.infos.push({
            chemotherapy_gene: '',
            chemotherapy_mutation: '',
            chemotherapy_rs_num: '',
            chemotherapy_gene_type: '',
            chemotherapy_drug_general_name: '',
            chemotherapy_drug_brand_name: '',
            chemotherapy_drug_adverse_reactions: '',
            chemotherapy_drug_dose: '',
            chemotherapy_annotation: '',
            chemotherapy_level_evidence: '',
            chemotherapy_effectiveness: '',
            chemotherapy_health_insurance: ''
          })
        } else if (part.blockCode === '0605') {
          part.infos.push({
            radiotherapy_gene: '',
            radiotherapy_rs_num: '',
            radiotherapy_gene_type: '',
            radiotherapy_drug_general_name: '',
            radiotherapy_drug_brand_name: '',
            radiotherapy_drug_adverse_reactions: '',
            radiotherapy_drug_dose: '',
            radiotherapy_annotation: '',
            radiotherapy_level_evidence: ''
          })
        } else if (part.blockCode === '0606') {
          part.infos.push({
            prognosis_gene: '',
            prognosis: '',
            prognosis_annotation: '',
            prognosis_level_evidence: ''
          })
        } else if (part.blockCode === '07') {
          // 显示临床入组选择框
          that.showprty07 = true
          that.getPrat07Item()
        } else if (part.blockCode === '09') {
          part.infos.push({
            literature_name: '',
            literature_url: ''
          })
        }
      },
      getPrat07Item () {
        // 临床入组 查询
        let that = this
        axios.get(URL.api_name + 'report/get_clinical_info', {
          params: {
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
            pageNumber: that.currentPage,
            pageSize: that.pageSize
          }
        }).then(function (res) {
          // console.log(res.data.data)
          that.part07Data = res.data.data.list
          that.totalCount = res.data.data.total
          that.listLoading = false
        })
      },
      pushpart07 (part, scope) {
        // 添加临床入组数据
        // let that = this
        // that.part07Data
        console.log(scope)
        part.infos.push({
          clinical_id: scope.nctId,
          clinical_name: scope.briefTitle,
          intervention_type: scope.drug,
          // name 为drugList拼接
          intervention_name: '',
          indication: scope.condition,
          contact_information: scope.phone
        })
        // part.infos.push({
        //   // nctId:  scope.nctId,
        //   // briefTitle: scope.briefTitle,
        //   // country: scope.country,
        //   // state: scope.state,
        //   // city: scope.city,
        //   // facilityName: scope.facilityName,
        //   // email: scope.email,
        //   // peopleName: scope.peopleName,
        //   clinical_id: '',
        //   clinical_name: '',
        //   phase: '',
        //   intervention_type: '',
        //   intervention_name: '',
        //   indications: '',
        //   contact_information: ''
        // })
      },
      edit (part) {
        // alert(num)
        let that = this
        // 禁止多个同时编辑
        if (that.isEdit === true) {
          that.$message({
            type: 'error',
            message: '目前有未编辑完的表格',
            duration: 2000
          })
          return false
        } else if (that.isEdit === false) {
          that.isEdit = true
        }
        part.check = true
        // console.log(part.check)
        // for (let i = 0; i < that.reportData.blockInfos.length; i++) {
        //   if (that.reportData.blockInfos[i].blockCode === num) {
        //     that.reportData.blockInfos[i].check = false
        //   }
        // }
      },
      cancel (part, num) {
        // 取消提交
        let that = this
        part.check = false
        that.isEdit = false
        console.log(part)
        axios.get(URL.api_name + 'report/block_detail', {
          params: {
            flowInsCode: part.flowInsCode,
            blockCode: part.blockCode
          }
        }).then(function (res) {
          // console.log('x2')
          if (res.data.code === '100') {
            part.infos = res.data.data.infos
          }
        }, function (error) {
          // console.log(error)
          that.$message({
            type: 'error',
            message: '提交失败' + error,
            duration: 1000
          })
        })
        // for (let i = 0; i < that.copyData.blockInfos.length; i++) {
        //   if (that.copyData.blockInfos[i].blockCode === num) {
        //     part = that.copyData.blockInfos[i]
        //   }
        // }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
.checkOutPdf{ position: fixed; top:70px; right:36px;}
.tabCard { margin:0 0 30px 0; background:#eef1f6;}
.tabCard a{color:#48576a; display:inline-block; vertical-align: top; margin:0 0px 0 0px; padding:15px 30px; cursor: pointer}
.tabCard a.active{border-color:#ddd; background:#d1dbe5}
.headers{ height:120px; line-height: 120px; font-size:40px; color:rgb(72, 61, 139); text-align: center; overflow: hidden; }
 h1{ overflow: hidden; text-align: center; padding: 40px 0 10px 0; font-weight: normal; display: block; border-bottom:solid 1px #969696; margin-bottom:30px; font-size:20px; height:30px; }
 h2{ padding: 20px 0; font-size:30px; font-weight: normal; }
.tableItems { width: 100%; margin:0 auto 30px auto;}
.tableItems.toggleHide{ margin:0 auto 80px auto; }
.table-title {padding: 10px 15px;border-bottom: 1px solid transparent; position: relative;
    border-bottom-color: transparent;border-top-left-radius: 3px;border-top-right-radius: 3px;}
.table-title h3 { font-family: PingFangSC-Regular; font-size: 24px; color: #FFFFFF; font-weight: normal; }
.table-cont { border:solid 1px #ccc;}
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
.itemsAdd{ position: absolute; top:5px; right:-80px; cursor: pointer; background: #d1dbe5; height:40px; width:auto; line-height: 40px; text-align: center; font-size:14px; padding:0 20px; border-radius: 5px; color:#48576a; display: none;}
.toggleHide .itemsAdd { display: block; }
.table-btns { position: absolute; bottom:-60px; height:60px; line-height: 60px; border:solid 1px #ddd;  width:calc(100% - 1px); margin:-1px 0 0 0px;text-align: right; padding-right:10px; box-sizing: border-box; background: #eee;}
.table-btns a{ display: inline-block; font-size:14px; padding:10px 15px; text-align: center; color:#fff; border-radius: 4px; line-height: 1;  margin:5px 10px 5px 0; text-decoration: none;}
.table-btns a.sub{ background: rgb(247, 186, 42); border:solid 1px rgb(247, 186, 42); }
.table-btns a.cancel{ background: #fff; color:#444; border:solid 1px #ddd; }
.table-edit{ display: none;}
.tableItems:hover .table-edit{display: block}
.tableItems.toggleHide:hover .table-edit{display: none}
.leftMore{ position: absolute; top:5px; right:20px; }
.el-tag{ cursor: pointer }
</style>
