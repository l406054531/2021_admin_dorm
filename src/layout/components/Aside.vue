<template>
  <div class="side-bar">
    <!-- <template v-for="(item, index) of $store.state.permission.addRoutes"> -->
    <MenuItem />
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store.state.permission.addRoutes);
  },
};
</script>
<style lang='scss' scoped>
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  background-color: #ededed;
}
</style>