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
               :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.name"
                    placeholder="账号">
            <i slot="prefix"
               class="iconfont icon-denglu"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password"
                    placeholder="密码"
                    show-password
                    @keyup.enter.native="userLogin">
            <i slot="prefix"
               class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-radio-group v-model="radio"
                          size="medium">
            <el-radio-button label="员工"></el-radio-button>
            <el-radio-button label="学生"></el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="userLogin">登 录</el-button>
          <el-link icon="el-icon-edit"
                   @click="toRegister"
                   :underline="false">注册账号</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import particles from '@/components/Particles/src/main';
export default {
  components: { particles },
  data() {
    return {
      loginForm: {
        name: 'admin',
        password: '123456'
      },
      radio: '员工',
      pColor: '#FFE4E1'
    };
  },
  methods: {
    userLogin() {
      let data = {}
      data.admin_name = this.loginForm.name;
      data.admin_password = this.loginForm.password;
      this.$store.dispatch('user/login', data).then(response => {
        this.$store.dispatch('radio/setRadio', this.radio)
        this.$router.push('/')
      })
    },
    toRegister() {
      this.$router.push('/register')
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
      }
    }
  }
}
</style>