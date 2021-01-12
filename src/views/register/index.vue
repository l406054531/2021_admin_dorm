<template>
  <div class="main">
    <particles style="background:rgba(245,245,245,0.2)"
               class="particles"
               :line-color="pColor"></particles>
    <img src="../../assets/img/1.jpg"
         alt=""
         class="bg-img">
    <div class="block-login">
      <div class="my-img">
        <img src="../../assets/img/user.png"
             alt="">
      </div>
      <el-form ref="form"
               :model="loginForm"
               :rules="rules">
        <el-form-item prop="user_name">
          <el-input v-model="loginForm.user_name"
                    placeholder="用户名">
            <i slot="prefix"
               class="iconfont icon-denglu"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="admin_name">
          <el-input v-model="loginForm.admin_name"
                    placeholder="账号">
            <i slot="prefix"
               class="iconfont icon-denglu"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="admin_password">
          <el-input v-model="loginForm.admin_password"
                    placeholder="密码"
                    show-password>
            <i slot="prefix"
               class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="new_password">
          <el-input v-model="loginForm.new_password"
                    placeholder="二次输入密码"
                    show-password>
            <i slot="prefix"
               class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser">注 册</el-button>
          <el-link icon="el-icon-edit"
                   @click="toLogin"
                   :underline="false">返回登录</el-link>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import particles from '@/components/Particles/src/main';
import { addUser } from '@/api/login';
export default {
  components: { particles },
  data () {
    const new_password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请二次输入密码'));
      }
      if (this.loginForm.admin_password !== this.loginForm.new_password) {
        return callback(new Error('两次密码输入不正确'));
      }
    }
    return {
      loginForm: {
        user_name: '',
        admin_name: '',
        admin_password: '',
        new_password: ''
      },
      rules: {
        user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        admin_name: [{ required: true, message: '请输入账号', trigger: 'blur' },],
        admin_password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
        new_password: { required: true, validator: new_password, trigger: 'blur' }
      },
      pColor: '#FFE4E1'
    };
  },
  methods: {
    addUser () {
      addUser(this.loginForm).then(response => {
        if (response.code == 1) {
          this.$message({
            message: '注册成功,即将为您跳转到登录页面',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        }
      })
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
};
</script>
<style lang='scss' scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  .particles {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .block-login {
    // background: pink;
    width: 300px;
    height: 350px;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -160px;
    margin-top: -250px;
    z-index: 999;
    box-sizing: content-box;
    transition: height 1s;
    .my-img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .el-form {
      padding-top: 20px;
      ::v-deep {
        .el-input__inner {
          color: #fff;
          border-radius: 30px;
          height: 45px;
          padding: 0 15px 0 38px;
          border: 0;
          background: rgba(255, 127, 80, 0.9);
          &::-webkit-input-placeholder {
            //placeholder颜色
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .el-input__clear {
          color: #fff;
        }
        .el-button {
          width: 100%;
          height: 45px;
          color: #fff;
          border-radius: 30px;
          border: 0;
          background: rgba(255, 127, 80, 0.9);
          //   &:hover {
          //     color: #000;
          //   }
        }
        .el-input__prefix {
          /**输入框图标 */
          padding-top: 4px;
          padding-left: 10px;
          color: #fff;
        }
        .el-link.el-link--default {
          color: #fff;
          margin-left: 5px;
          //   &:hover {
          //     color: #000;
          //   }
        }
        .el-form-item__error {
          color: rgba(255, 255, 255, 0.8);
          margin-left: 5px;
        }
      }
    }
  }
}
</style>