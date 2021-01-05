<template>
  <div>
    <!-- <template v-for="(item, index) of $store.state.permission.addRoutes"> -->
    <MenuItem />

  </div>
</template>

<script>
import MenuItem from './MenuItem';
export default {
  components: { MenuItem },
  data () {
    return {
    };
  },
  mounted () {
    // console.log(this.$store.state.permission.addRoutes);
  }
}

</script>
<style lang='scss' scoped>
</style>