<template>
  <div class="maintain_content">
        <div class="nav_title">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>> 服务管理</el-breadcrumb-item>
                <el-breadcrumb-item>服务维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 主版内容 -->
        <div class="block_content">
            <el-button type="primary" @click="addBlock" class="addBlock">+ 添 加</el-button>
            <el-form :inline="true" :model="formData" class="demo-form-inline table_content">
                <el-form-item label="名称">
                    <el-input v-model="formData.blockName" placeholder="请输入block名称"></el-input>
                </el-form-item>
                <div v-for="(item, value, index) in formData.items">
                    <el-form-item label="标题">
                        <el-input v-model="item.title" placeholder="请输入标题名称"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" >
                        <el-select v-model="item.filedType" placeholder="请选择类型">
                            <el-option label="input" value="input"></el-option> 
                            <el-option label="textarer" value="textarer"></el-option> 
                            <el-option label="time" value="time"></el-option>
                            <el-option label="select" value="select"></el-option>
                            <el-option label="radio" value="radio"></el-option>
                            <el-option label="checkbox" value="checkbox"></el-option>
                            <el-option label="file" value="file"></el-option>
                            <el-option label="list" value="list"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="默认值">
                        <el-input v-model="item.defaultVal" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="onSubmit">+ 添 加</el-button>
                        <el-button type="danger " size="small" @click="onRemove(value)">- 删 除</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!-- <el-form :inline="true" :model="formData" class="demo-form-inline table_content">
            <div class="steps_content" v-for="(step, value, keys) in formData">
                <el-button type="primary" @click="addBlock(step)" class="addBlock">+ 添 加</el-button>
                <el-form-item label="步骤名称">
                    <el-input v-model="step.name" placeholder="请输入block名称"></el-input>
                </el-form-item>
                <div class="block_content" v-for="(block, val, index) in step">
                    <el-button type="primary" @click="addBlock(block)" class="addBlock">+ 添 加</el-button>
                    <el-form-item label="模块名称">
                        <el-input v-model="block.blockName" placeholder="请输入block名称"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form> -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            formData:{
                blockName: '',
                title: '',
                filedType: '',
                defaultVal: '',
                items: [{
                    title: '',
                    filedType: '',
                    defaultVal: '',
                    initValue: [{label: '女', value: 1}, {label: '男', value: 2}]
                }]
            },
            formData1:[{
                name: '步骤名称1',
                code: '',
                blocks: []
            }],
            tableType: [
                {

                }
            ],
            optionType: ["input","textarer","time","select","radio","checkbox","file","list"]
        }
    },
    methods: {
        addBlock(){
            let that = this;
            this.formData.items.push({
                blockName: '',
                title: '',
                filedType: '',
                defaultVal: ''
            })
            console.log(that.formData)
        },
        onSubmit() {
            this.formData.items.push({
                title: '',
                filedType: '',
                defaultVal: ''
            })
            console.log(this.formData);
        },
        onRemove(index){
            alert(index)
            // this.formData.items.splice(index,1);
        }
    }

}
</script>


<style>
a{text-decoration: none;}
/* 添加block按钮 */
.addBlock{float: right;margin-right: -100px;}
/*  */
.nav_title{margin-bottom: 25px}
.table_content {padding: 30px 40px 0px 20px;}
.block_content{border: 1px solid #ccc;width: 70%;}
.el_input{width: 20%}

</style>
