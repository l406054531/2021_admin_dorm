<template>
  <el-aside width="210px">
    <MenuItem :addRouters="addRouters"
              style="height:100%" />
  </el-aside>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  data () {
    return {
      addRouters: []
    };
  },
  mounted () {
    this.addRouters = this.$store.state.permission.addRoutes
  },
  destroyed () {
    this.addRouters = null
    //   console.log(this.addRouters);
  }
};
</script>
<style lang='scss' scoped>
.el-aside {
  background: #fff;
  height: 100%;
}
</style>