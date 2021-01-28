<template>
  <div>
    <el-menu :default-active="$route.path"
             unique-opened
             :collapse-transition="false"
             :router="true"
             background-color="#fff"
             text-color="#000"
             active-text-color="#FF4500"
             style="height:100%">
      <div v-for="(item, index) of addRouters "
           :key="index">
        <el-submenu :index="index.toString()"
                    v-if="item.children && item.children.length > 1">
          <template slot="title">
            <i :class="'iconfont'+' '+item.meta.icon"
               style="margin:0 16px 0 5px"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <div v-for="(c, i) of item.children"
                 :key="i">
              <el-menu-item :index="item.path+'/'+c.path">
                {{ c.meta.title }}
              </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.redirect"
                      v-else>
          <i :class="'iconfont'+' '+ item.meta.icon"
             style="margin:0 16px 0 5px"></i>
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
    addRouters: Array
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-menu-item,
  .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
}
</style>