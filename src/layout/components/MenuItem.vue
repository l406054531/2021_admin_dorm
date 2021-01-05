<template>
  <div>
    <el-menu class="el-menu-vertical-demo"
             unique-opened
             :collapse-transition="false"
             :router="true"
             background-color="#F2D09D"
             text-color="#fff"
             active-text-color="#F27E86">
      <div v-for="(item, index) of $store.state.permission.addRoutes"
           :key="index">
        <el-submenu :index="index.toString()"
                    v-if="item.children && item.children.length > 0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <div v-for="(c, i) of item.children"
                 :key="i">
              <el-menu-item :index="index.toString()+'-'+i.toString()"
                            @click="test(item, c)">
                {{ c.meta.title }}</el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="i.toString()"
                      v-else
                      @click="test(item, c)">
          <i class="el-icon-location"></i>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </div>

    </el-menu>

  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    test (i, c) {
      let path = i.path + "/" + c.path;
      this.$router.push(path);
      return path;
      // this.$router.push(path);
    },
  },
  mounted () {
    console.log(this.$route.path);
  },
};
</script>

<style>
</style>