<template>
    <el-container class="home-container">
      <el-header>
      <Header></Header>
      </el-header>
      <el-container>
        <!-- 侧边导航 -->
       <Aside></Aside>
        <!-- 右边 -->
        <Main></Main>
      </el-container>
    </el-container>
</template>

<script>
import Aside from "./components/Aside";
import Header from "./components/Header";
import Main from "./components/Main";
export default {
  components: { Aside, Header, Main },
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.home-container {
  height: 100%;
}
</style>