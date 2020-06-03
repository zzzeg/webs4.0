<template>
  
  <div class="home_detail">
        <div class="nav_title">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item >> <span @click="getBack"> 首 页</span></el-breadcrumb-item>
                <el-breadcrumb-item>项目详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <div class="top" style="overflow:hidden">
                <div class="top_left">
                    <div class="img"></div>
                    <el-button size="small" type="success" class="btne" v-on:click="goCreat()">进入</el-button>
                    <!-- <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </div>
                <div class="top_right">
                  <h2> {{ dataList.businessName }} </h2>
                  <div v-for="(item, index) in dataList.descriptions" class="content_description"> {{ dataList.description }} </div>
                </div>
            </div>
            <div class="bottom">
              <div class="nav"> 
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="相关项目" name="first">
                        <div v-for="(item, index) in dataList.descriptions" class="content_description">{{ index + 1 + '、'}} {{ item.name + '：' }} {{ item.description }} </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="title1" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="title2" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="title3" name="fourth">定时任务补偿</el-tab-pane> -->
                  </el-tabs>
              </div>  
            </div>
        </div>
  </div>


</template>

<script>
import URL from '@/common/js/URL.js'
import axios from 'axios'

export default {
    created() {
      this.getInfo()
    },
    data() {
      return {
          dataList: [],
          activeName: 'first',
          imageUrl: ''
      }
    },
    methods: {
      getInfo() {
        let that = this
        axios.get(URL.api_name + 'cloud/project/getPrograms', {
          params: {
            businessCode: that.$route.params.id
          }
        }).then(function(resp){
            if(resp.data.code === '100') {
              that.dataList = resp.data.data
            
            }
        }),function(error){
            that.$message({
                type: 'error',
                message: resp.data.message,
                duration: '2000'
            })
        }
      },
      goCreat () {
        // 首页，进入单流程创建
        let id = this.$route.params.id
        this.$router.push({
          path: '/ServiceAddCode/' + id
        })
      },
      // tab点击
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getBack() {
        this.$router.push({
          path: '/home'
        })
      }
    }
}
</script>

<style>
.home_detail .content h2{font-size: 18px;color: #333;margin-bottom: 15px;margin-top:20px}
.home_detail .content_description{font-size: 14px;color: #6f6363;max-width: 70%;line-height: 22px}
.home_detail .nav{margin:10px 0 15px 0}
.home_detail .top_right{float: right;width: 85%;margin-top:5px}
.home_detail .top_left{float: left;margin:20px 0 0 0px}
.home_detail .btne{margin:10px 0 0 145px}
 .home_detail  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .home_detail .avatar-uploader .el-upload:hover {
    border-color: #288DF5;
  }
  .home_detail .img{width:200px;height:200px;background-color: #a7afb7}
 .home_detail  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
 .home_detail  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
