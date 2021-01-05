<template>
  <div >
    <el-container>
      <el-header>
          <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px"><Aside></Aside></el-aside>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
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
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>