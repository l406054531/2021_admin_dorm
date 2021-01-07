<template>
  <main class="page-board">
    <transition name="fade-transform"
                mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key()" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
      key() {
        return this.$route.path
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
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