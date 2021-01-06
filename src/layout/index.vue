<template>
  <div class="main">
    <Header></Header>
    <Aside></Aside>
    <Main></Main>
  </div>
</template>

<script>
import Aside from "./components/Aside";
import Header from "./components/Header";
import Main from "./components/Main";
export default {
  components: { Aside, Header, Main },
  data () {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.main {
  width: 100%;
}
</style>