<template>
  <div>
    <div class="my-header">
      <div class="logo">
        <p v-if="this.radio=='员工'"> 员工</p>
        <p v-if="this.radio=='学生'"> 学生</p>
        <div>{{title}}</div>
      </div>
      <el-dropdown @command="handleCommand"
                   @visible-change="dropdownChange">
        <span class="el-dropdown-link">
          <img :src="imageUrl"
               alt="">
          <span> {{userInfo.user_name}} <i :class="[active?'el-icon-caret-top':'el-icon-caret-bottom' ,'el-icon--right']"></i></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="myInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="editPssword">修改密码</el-dropdown-item>
          <el-dropdown-item command="up">更改头像</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <input type="file"
             style="display: none"
             ref="uploadFile"
             accept='image/jpeg,image/png'
             @change="upload" />
    </div>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               :before-close="emptyForm"
               width="32%">
      <my-form v-if="this.dialogTitle=='个人信息'"
               :rules="rulesInfo"
               :dialogform="infoDialogform"
               :appdialogHeader="infoDialogHeader"
               labelWidth="80px"></my-form>
      <my-form ref="passwordRef"
               v-if="this.dialogTitle=='修改密码'"
               :rules="rulesPassword"
               :dialogform="passwordDialogform"
               :appdialogHeader="passwordDialogHeader"
               labelWidth="80px"></my-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="emptyForm">取 消</el-button>
        <el-button type="primary"
                   @click="editPassword"
                   v-if="this.dialogTitle=='修改密码'?true:false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { Edit, upImg } from '@/api/admin';
import { Encrypt, Decrypt } from '@/utils/Crypto';
import { getRadio } from '@/utils/cache';
import { getUserInfo, setUserInfo } from '@/utils/cache';
export default {
  data () {
    const password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入原密码'));
      }
      if (this.passwordDialogform.password !== this.userInfo.admin_password) {
        return callback(new Error('原密码不正确'));
      }
    }
    const confirm_password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请二次输入密码'));
      }
      if (this.passwordDialogform.new_password !== this.passwordDialogform.confirm_password) {
        return callback(new Error('两次密码输入不正确'));
      }
    }
    return {
      title: 'LOGO',
      imageUrl: "",//图片路径
      active: false,//下拉选项箭头
      appCode: '418783FDA9E0090B1C990AE816ACDCE3',//应用Code标识 
      diyPath: 'images/',//自定义路径,
      userInfo: {},//用户信息
      dialogVisible: false,//弹框状态
      dialogTitle: '修改密码',//弹框标题
      infoTitle: '个人信息',//弹框标题
      passwordTitle: '修改密码',//弹框标题
      rulesInfo: {},//个人信息校验
      rulesPassword: {
        password: { required: true, validator: password, trigger: 'blur' },
        new_password: { required: true, message: "请输入新密码", trigger: 'blur' },
        confirm_password: { required: true, validator: confirm_password, trigger: 'blur' }
      },//修改密码校验
      infoDialogform: {},//个人信息model
      passwordDialogform: {
        password: '',
        new_password: '',
        confirm_password: '',
      },//修改密码model
      infoDialogHeader: [{//个人信息input
        label: '用户名',
        type: 'input',
        prop: 'user_name',
        disabled: true
      }, {
        label: '账号',
        type: 'input',
        prop: 'admin_name',
        disabled: true
      }, {
        label: '角色名',
        type: 'input',
        prop: 'role_name',
        disabled: true
      }],
      passwordDialogHeader: [{//修改密码input
        label: '原密码',
        type: 'input',
        prop: 'password',
      }, {
        label: '新密码',
        type: 'input',
        prop: 'new_password',
        show: true
      }, {
        label: '确认密码',
        type: 'input',
        prop: 'confirm_password',
        show: true
      },],
      radio: ''
    };
  },
  methods: {
    /**退出登录 */
    logout () {
      sessionStorage.clear();
      //   this.$router.push('/login')
      this.$router.go(0)
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
      } else if (command == 'myInfo') {
        this.dialogVisible = true
        this.dialogTitle = this.infoTitle
        // this.getInfo(this.userInfo) 
        /**获取个人信息 */
        this.infoDialogform = this.userInfo
      } else if (command == 'editPssword') {
        this.dialogVisible = true
        this.dialogTitle = this.passwordTitle
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
          /**修改数据库img路径 */
          Edit(data).then(response => { })
          // this.setUserImg(response.data.url)
          this.setUserInfo(response.data.url, 'img', (data) => {
            this.imageUrl = 'https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/' + data
          })
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
    /**获取个人信息 */
    // getInfo (info) {
    //   this.infoDialogform = info
    // },
    /**确认修改密码 */
    async editPassword () {
      let flag = await this.$refs.passwordRef.validateForm();
      if (flag == null) {
        let data = {}
        data.admin_id = this.userInfo.admin_id
        data.admin_password = this.passwordDialogform.confirm_password
        Edit(data).then(response => {
          this.setUserInfo(data.admin_password, 'admin_password', (data) => {
            this.userInfo.admin_password = data
          })
          this.emptyForm()
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }

    },
    /** 实时修改缓存 */
    setUserInfo (data, key, Callback) {
      let userInfo = this.userInfo
      userInfo[key] = data
      setUserInfo(JSON.stringify(userInfo))
      Callback(data)
    },
    /**清空表单 */
    emptyForm () {
      this.passwordDialogform = {}
      this.passwordDialogHeader.forEach((item) => {
        this.$set(this.passwordDialogform, item.prop, "");
      });
      if (this.dialogTitle == '修改密码') {
        this.$nextTick(() => {
          this.$refs.passwordRef.resetFields()
        })
      }
      this.dialogVisible = false
    },
  },
  mounted () {
    this.userInfo = JSON.parse(this.$store.getters.userInfo)
    this.imageUrl = 'https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/' + this.userInfo.img
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
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  box-sizing: border-box;
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
    padding-top: 3px;
    cursor: pointer;
    .el-dropdown-link {
      display: flex;
      justify-content: space-around;
      img {
        width: 50px;
        height: 50px;
        margin: 0 8px;
        line-height: 45px;
        border-radius: 50%;
      }
    }
  }
}
</style>