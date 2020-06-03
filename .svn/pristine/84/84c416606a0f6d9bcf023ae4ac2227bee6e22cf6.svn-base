<template>
  <div class="list">
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>> 基因解读</el-breadcrumb-item>
        <el-breadcrumb-item>修改项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-data"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px">
        <el-form-item label="选择检测的项目：" prop="code">
          <el-col :span="8">
            <el-select disabled v-model="formData.dynamicInfo.flowName" clearable placeholder="请选择" @change="selectChange" style="width: 50%;">
              <el-option :label="item.name" :value="item.code" v-for="(item, index) in checkItems" :key="index"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <div class="squerItmes" v-for="(squerItmes, index) in itemList" v-if="index === activeCheck">
          <el-form-item v-for="itemer in squerItmes.dynamicInfoDto" :label="itemer.label + '：'" v-show="itemer.type !== 'hidden'">
            <el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'text' && itemer.name != 'address'">
              <el-input type="text" v-model="formData.dynamicInfo[itemer.name]"></el-input>
            </el-col>
            <el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'hidden'">
              <el-input type="text" v-model="formData.dynamicInfo[itemer.name]"></el-input>
            </el-col>
            <el-col :span="4" v-if="itemer.element === 'input' && itemer.type === 'file'">
              <el-upload
                :data="updata"
                :action="imgUploadUrl"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :headers="uploadHeader"
                :file-list="fileList"
                >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传不超过500Mb的文件</div>
              </el-upload>
            </el-col>
            <!-- 日期类型date -->
            <el-col :span="8" v-if="itemer.element === 'input' && itemer.type === 'date'">
              <el-date-picker
                v-model="formData.dynamicInfo[itemer.name]"
                type="date"
                :editable='false'
                @change="(value) => formatTime(value, itemer.name)"
                placeholder="选择日期时间"
                style="width: 50%;"
                >
              </el-date-picker>
            </el-col>
            <el-col :span="8" v-if="itemer.element === 'select'">
              <el-select v-model="formData.dynamicInfo[itemer.name]" clearable placeholder="请选择" style="width: 50%;">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in itemer.initValue" :key="index"></el-option>
              </el-select>
            </el-col>
            <!-- 增加性别单选 -->
            <el-col :span="8" v-if="itemer.element === 'radio' && itemer.name === 'gender'">
              <el-radio v-model="formData.dynamicInfo[itemer.name]" :label="1">男</el-radio>
              <el-radio v-model="formData.dynamicInfo[itemer.name]" :label="2">女</el-radio>
            </el-col>
            <!-- 文本框 -->
            <el-col :span="8" v-if="itemer.element === 'textarea' || itemer.name === 'address'">
              <el-input type="textarea" :rows="2" v-model="formData.dynamicInfo[itemer.name]"></el-input>
            </el-col>
            <!-- 表格 -->
            <el-col :span="12" v-if="itemer.element === 'list' && itemer.code !== '0506' && itemer.code !== '0507'" style="position:relative">
              <!-- <el-input type="textarea" :rows="2" v-model="formData.dynamicInfo[itemer.name]"></el-input> -->
              <!-- <h2>{{ itemer.label }}</h2> -->
              <el-button type="success" size="mini" class="position_absolute" @click="objDataAdd(itemer.name)">+</el-button>
              <el-table :data="itemer.initValue" border style="width: 100%">
                <el-table-column v-for="(colums, keys, index) in itemer.initValue[0]" :prop="keys" :label="itemer.itemValue[index].name">
                  <template scope="scope">
                    <el-input type="text" v-model="scope.row[keys]" :placeholder="keys"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="　" width="60">
                  <template scope="scope">
                    <el-button type="danger" size="mini" plain @click="objDataRemove(itemer.name, scope.$index)">-</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12" v-if="itemer.element === 'list' && itemer.code === '0506'" >
              <table class="like_elTable">
                <tr>
                  <th colspan="2">检测项</th>
                  <th colspan="2">检测结果（阳性/阴性）</th>
                </tr>
                <tr>
                  <td rowspan="5">微卫星不稳定MSI</td>
                  <td>BAT25</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.BAT25" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                  <td rowspan="5">
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].msi" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>BAT26</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.BAT26" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>D2S123</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.D2S123" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>D5S346</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.D5S346" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>D17S250</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.D17S250" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td rowspan="9"><p>错配修复</p>
                  MMR</td>
                  <td>MLH1</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.MLH1" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                  <td rowspan="9">
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].mmr" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>MSH2</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.MSH2" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>MSH6</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.MSH6" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>PMS2</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.PMS2" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>MLH3</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.MLH3" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>MSH3</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.MSH3" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>PMS1</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.PMS1" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>POLE</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.POLE" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>POLD1</td>
                  <td>
                    <el-select v-model="formData.dynamicInfo.gene_msi[0].results.POLD1" clearable placeholder="请选择">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in yinyang" :key="index"></el-option>
                    </el-select>
                  </td>
                </tr>
              </table>
            </el-col>
            <el-col :span="12" v-if="itemer.element === 'list' && itemer.code === '0507'" >
              <el-table
                :data="itemer.initValue"
                border
                style="width: 100%">
                <el-table-column v-for="(colums, keys, index) in itemer.initValue[0]" :prop="keys" :label="itemer.itemValue[index].name">
                  <template scope="scope">
                    <el-input type="textarea" autosize v-model="scope.row[keys]" :placeholder="keys"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="stepPrev" v-if="activeCheck > 0">上一步</el-button>
          <el-button type="primary" :loading="isLoading" @click="sub('formData')" v-if="activeCheck === itemList.length - 1">
              {{ isLoading ? '正在提交' : '提交' }}
          </el-button>
          <el-button @click="stepNext" v-if="activeCheck < itemList.length - 1">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import URL from '@/common/js/URL.js'
  import axios from 'axios'
  export default {
    created () {
      // this.getProcessList()
      this.selectChange()
      this.getFromValue()
    },
    data () {
      return {
        imgUploadUrl: URL.api_name + 'cloud/upload_project',
        fileList: [],
        formData: {
          code: this.$route.params.id,
          status: '',
          dynamicInfo: {
          },
          dynamicInfoDto: {
          }
        },
        steps: 0,
        isChecked: false,
        selectOnly: true,
        activeCheck: 0,
        newData: {
          code: this.$route.params.id,
          status: '',
          dynamicInfo: {
          }
        },
        updata: {
          flowCode: this.$route.params.id
        },
        flowCode: '',
        yinyang: [{
          value: '阴性',
          label: '阴性'
        }, {
          value: '阳性',
          label: '阳性'
        }],
        dynamicInfo: {
          user_name: '',
          birthday: '',
          gender: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          code: [
            { required: true, message: '请选择检测项目', trigger: 'change' }
          ],
          user_name: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ]
        },
        checkItems: [],
        itemList: [],
        totalCount: 0,
        isLoading: false,
        loading: false
      }
    },
    methods: {
      getProcessList () {
        // 1、进图先获取可用流程列表
        var that = this
        axios.get(URL.api_name + 'cloud/flow_list', {
          params: {
            status: 2,
            pageSize: 999,
            pageNumber: 1
          }
        }).then(function (res) {
          if (res.data.code === '100') {
            that.checkItems = res.data.data.list
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
      selectChange () {
        // 2、选择后获取动态表单列表
        let that = this
        axios.get(URL.api_name + 'cloud/project/getBusinesInfo', {
          params: {
            // code: 
            code: 'c54ecaa233684444930e4dc0da04e62f'
          }
        }).then(function (res) {
          console.log('x1OK')
          if (res.data.code === '100') {
            that.itemList = res.data.data
            console.log(that.itemList)
            that.formData.dynamicInfoDto = {}
            for (let i = 0; i < that.itemList.length; i++) {
              for (let n = 0; n < that.itemList[i].dynamicInfoDto.length; n++) {
                let keyName = that.itemList[i].dynamicInfoDto[n].name
                if (that.itemList[i].dynamicInfoDto[n].element === 'list') {
                  that.formData.dynamicInfoDto[keyName] = that.itemList[i].dynamicInfoDto[n].initValue
                  that.formData.dynamicInfo[keyName] = that.itemList[i].dynamicInfoDto[n].initValue
                } else if (that.itemList[i].dynamicInfoDto[n].element === 'select') {
                  // 如果
                  that.formData.dynamicInfoDto[keyName] = that.itemList[i].dynamicInfoDto[n].initValue
                } else {
                  that.formData.dynamicInfoDto[keyName] = ''
                }
              }
            }
            that.updata.flowCode = that.formData.flowCode
            that.formData.dynamicInfo.gender = 1
            that.formData.dynamicInfoDto.gender = 1
          }
        }, function (error) {
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败' + error,
            duration: 1000
          })
        })
      },
      getFromValue () {
        // 3、获得默认值
        let that = this
        axios.get(URL.api_name + 'cloud/get_dynamic', {
          params: {
            // code: '643bbba3118b4f78a6ef74fd4155e51f'
            projectCode: that.$route.params.id
          }
        }).then(function (res) {
          console.log('x1OK')
          if (res.data.code === '100') {
            that.formData.dynamicInfo = res.data.data
            that.fileList = []
            if (res.data.data.upload_file && res.data.data.upload_file !== '') {
              that.fileList.push({
                name: 'vcf文件',
                url: res.data.data.upload_file
              })
            }
          }
          // console.log(that.itemList)
        }, function (error) {
          alert(1)
          console.log(error)
          that.$message({
            type: 'error',
            message: '查询失败11',
            duration: 1000
          })
        })
      },
      sub (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果验证通过，即提交
            axios.post(URL.api_name + 'cloud/modify_project', that.newData).then((res) => {
              that.isLoading = false
              if (res.data.code === '100') {
                that.$message({
                  message: res.data.message,
                  type: 'success',
                  onClose: function () {
                  }
                })
                that.$router.push({
                  path: '/service'
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
      formatTime (value, name) {
        this.formData.dynamicInfo[name] = value
        // console.log(name)
        // console.log(value)
      },
      beforeUpload (file) {
        if (this.fileList.length > 0) {
          this.$message({
            type: 'error',
            message: '最多上传一个vcf文件',
            duration: 1000
          })
          return false
        }
      },
      handleSuccess (response, file, fileList) {
        let that = this
        this.fileList = fileList
        if (response.code === '100') {
          this.formData.dynamicInfo.upload_file = response.data.projectUrl
          // this.formData.dynamicInfoDto.upload_file = response.data.projectUrl
          that.formData.code = response.data.code
        } else {
          this.fileList = []
        }
      },
      stepNext () {
        // let that = this
        this.activeCheck++
      },
      stepPrev () {
        this.activeCheck--
      },
      handleRemove (file, fileList) {
        this.fileList = fileList
        let that = this
        that.formData.code = ''
        console.log(file, fileList)
      },
      objDataRemove (partName, index) {
        let that = this
        // 删除一格
        // part.infos.splice(index, 1)
        // alert(partName + '-=-' + index)
        if (that.formData.dynamicInfoDto[partName].length > 1) {
          that.formData.dynamicInfoDto[partName].splice(index, 1)
        } else {
          that.$message({
            type: 'error',
            message: '只剩一条啦，再删没有啦',
            duration: 1000
          })
        }
      },
      objDataAdd (partName) {
        let that = this
        let xx = {}
        for (let n in that.formData.dynamicInfoDto[partName][0]) {
          xx[n] = ''
          // xx.push(that.formData.dynamicInfoDto[partName][n]: '')
        }
        that.formData.dynamicInfoDto[partName].push(xx)
      }
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
<style lang="less" scoped>
</style>
