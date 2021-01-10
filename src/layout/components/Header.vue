<template>
  <div class="my-header">
    <div class="logo">
      <div>{{title}}</div>
    </div>
    <el-dropdown trigger="click"
                 @command="handleCommand"
                 @visible-change="dropdownChange">
      <span class="el-dropdown-link">
        <img :src="imageUrl"
             alt="">
        <span> {{userInfo.user_name}} <i :class="[active?'el-icon-caret-top':'el-icon-caret-bottom' ,'el-icon--right']"></i></span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="up">更改头像
        </el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <input type="file"
           class="uploadFile"
           ref="uploadFile"
           accept='image/jpeg,image/png'
           @change="upload" />
  </div>
</template>

<script>
import axios from 'axios'
import { imgEdit, upImg } from '@/api/admin';
export default {
  data () {
    return {
      title: 'LOGO',
      imageUrl: "",//图片路径
      active: false,//下拉选项箭头
      appCode: '418783FDA9E0090B1C990AE816ACDCE3',//应用Code标识 
      diyPath: 'images/',//自定义路径,
      userInfo: {},//用户信息
    };
  },
  methods: {
    /**退出登录 */
    logout () {
      sessionStorage.clear();
      this.$router.push('/login')
    },
    /**返回首页 */
    homepage () {
      let path = this.$store.getters.permission_routes[0].redirect
      this.$router.push(path)
    },
    handleCommand (command) {
      if (command == "logout") {
        this.logout()
      } else if (command == "home") {
        this.homepage()
      } else if (command == "up") {
        this.$refs.uploadFile.click();
      }
    },
    dropdownChange (e) {
      this.active = e
    },
    /**上传头像 */
    upload () {
      let file = this.$refs.uploadFile.files[0];
      let postData = new FormData();
      postData.append('file', file);
      for (let key in this.data) {
        postData.append(key, this.data[key]);

      }
      upImg(postData).then(response => {
        if (response.code === 1) {
          this.$message({
            message: '更换成功',
            type: 'success'
          });
          let data = {}
          data.admin_id = this.userInfo.admin_id
          data.img = response.data.url
          this.imgEdit(data)
          this.setUserInfo(response.data.url)
          this.dialogVisible = false
        }
        else {
          this.$message({
            message: '更换失败',
            type: 'error'
          });
        }
      });
    },
    /**修改数据库img路径 */
    imgEdit (data) {
      imgEdit(data).then(response => { })
    },
    /** 修改头像时修改缓存 实时更新头像 */
    setUserInfo (data) {
      let user = JSON.parse(sessionStorage.getItem('userInfo'))
      user.img = data
      let userInfo = JSON.stringify(user)
      sessionStorage.setItem('userInfo', userInfo)
      this.imageUrl = 'https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/' + data
    }
  },
  mounted () {
    this.userInfo = JSON.parse(this.$store.getters.userInfo)
    this.setUserInfo(this.userInfo.img)
  }
};
</script>
<style lang='scss' scoped>
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: rgb(211, 218, 226);
  color: #000;
  text-align: center;
  font-size: 22px;
  .logo {
    height: 100%;
    float: left;
    margin-left: 20px;
  }
  .el-dropdown {
    float: right;
    margin-right: 50px;
    height: 100%;
    cursor: pointer;
    .el-dropdown-link {
      display: flex;
      justify-content: space-around;
      img {
        width: 40px;
        height: 40px;
        margin: auto 8px;
        // line-height: 45px;
        border-radius: 50%;
      }
    }
    // .el-dropdown-menu {
    //   .el-dropdown-item {
    //     .uploadFile {
    //       color: red;
    //     }
    //   }
    // }
  }
}
::v-deep {
  input {
    display: none;
  }
}
</style>