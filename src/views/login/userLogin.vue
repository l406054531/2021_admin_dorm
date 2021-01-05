<template>
  <div>
    <el-form ref="form"
             :model="loginForm"
             label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.name"
                  placeholder="用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password"
                  placeholder="密码"
                  type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="userLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: 'admin',
        password: 'admin'
      },

    };
  },
  methods: {
    userLogin () {
      let data = {}
      data.admin_name = this.loginForm.name;
      data.admin_password = this.loginForm.password;
      this.$store.dispatch('user/login', data).then(response=>{
      this.$router.push('/')
      })
     
    }
  }
};
</script>
<style lang='scss' scoped>
</style>