<template>
  <main class="page-board">
    <router-view />
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
  padding: 80px 30px 30px 220px;
  background-color: #ededed;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>