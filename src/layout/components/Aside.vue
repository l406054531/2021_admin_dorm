<template>
  <el-aside width="210px">
 <MenuItem  :addRouters="addRouters"/>
  </el-aside>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  data() {
    return {
        addRouters:this.$store.state.permission.addRoutes 
    };
  },
  mounted() {
  },
};
</script>
<style lang='scss' scoped>
.el-aside {
 background:  rgb(221, 227, 235);
  height: 100%;
}
</style>