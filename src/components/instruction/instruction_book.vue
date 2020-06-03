<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>> 操作说明</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
         </div>

        <div class="main">
            <div class="right">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="border:none" ></el-tree>
            </div>
            <div class="left">
                <iframe :src="htmlUrl" frameborder="0" style="width:100%; height:100%" ></iframe>
            </div>
        </div>

    </div>
</template>

<script>

  export default {
    data() {
      return {
        data: [{
          label: '首页',
          index: 1,
          htmlUrl:'static/instruction/instruction_home.html',
          contentText: '新手入门指引',
        }, {
          label: '服务项目',
          index: 2,
          htmlUrl:'static/instruction/instruction_service.html',
        },{
            label: '个人中心',
            index:3,
            htmlUrl: 'static/instruction/instruction_person.html'
            // children: [{
            //     label: '个人信息'
            // },{
            //     label: '修改密码'
            // }]
        }],
        contentText: '欢迎使用百诺操作手册',
        htmlUrl:'static/instruction/instruction_home.html',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
        handleNodeClick(data) {
            this.htmlUrl = data.htmlUrl;
         }
    },
    created() {

    },
  };
            
</script>

<style>
    html,body {
        height: 100%;
    }
    .is-current {
        background-color: #e4e8f1;
    }

    .main {
        height: 100%;
    }
    .right {
        width:20%;
        float: left;
        height: 750px;
        border: 1px solid #e4e8f1;
    }
    .left {
        width: 78%;
        position: absolute;
        top: 60px;
        bottom: 20px;
        left: 22%;
        overflow: hidden;
    }
    .el-tree-node {
    outline: 0;
    height: 40px;
    line-height: 40px;
}
    .el-tree-node__content{ height:40px; }
</style>

