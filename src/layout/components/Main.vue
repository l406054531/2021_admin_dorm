<template>
  <main class="page-board">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  data () {
    return {
    };
  },
}

</script>
<style lang='scss' scoped>
.page-board {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 90px 30px 30px 230px;
}
</style>