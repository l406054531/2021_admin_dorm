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
import { getRouters } from '@/utils/cache';
export default {
  components: { Aside, Header, Main },
  data () {
    return {
      list: [],
      roles: '',
      r: []
    };
  },
  methods: {
    formatRouterTree (data) {
      let parents = data.filter(p => p.pid === 0),
        children = data.filter(c => c.pid !== 0);

      dataToTree(parents, children);

      function dataToTree (parents, children) {
        parents.map((p) => {
          children.map((c, i) => {
            if (c.pid === p.id) {
              let _c = JSON.parse(JSON.stringify(children));
              _c.splice(i, 1);
              dataToTree([c], _c);

              if (p.children) {
                p.children.push(c);
              } else {
                p.children = [c];
              }
            }
          })
        })
      }
      return parents;
    },
    recursionRouter (userRouter, allRouter) {
      var realRoutes = []
      let arr = []
      allRouter.forEach((v) => {
        userRouter.forEach((item) => {
          if (v.name == item.page_name) {
            arr.push(v)
          }
          arr.forEach(parent => {
            parent.children.forEach(children => {
              if (children.name == item.page_name) {
                parent.children = []
                parent.children.push(children)
                realRoutes.push(parent)
              }
            })
          })
        })

      })
      console.log(realRoutes);
      return realRoutes
    },
    test () {
      this.recursionRouter(this.list, this.$store.state.permission.routes)
    },

  },
  mounted () {
    //   console.log(JSON.parse(this.$store.getters.routers));
    // this.roles = this.$store.getters.role
    this.list = JSON.parse(this.$store.getters.routers)
    // console.log(this.list);
    // this.r = this.$store.state.permission.routes
    // console.log(this.r);
    // console.log(this.$store.state.permission.routes);
    this.test()
    // console.log(this.recursionRouter);

  }
};
</script>
<style lang='scss' scoped>
.home-container {
  height: 100%;
}
</style>