<template>
  <div>
    <el-button @click="SaveMenuCheckeds">保存</el-button>
    <el-tree :data="data"
             ref="tree"
             show-checkbox
             node-key="id"
             :default-expanded-keys="expandedId"
             :default-checked-keys="checkedId"
             :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
import { getAllPages,getRouters } from '@/api/association';
export default {
  data() {
    return {
      data: [],
      roleData: [],//用户授权到的页面
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkedId: [],
      expandedId: []
    };
  },
  methods: {
    formatRouterTree(data) {
      let parents = data.filter(p => p.pid === 0),
        children = data.filter(c => c.pid !== 0);
      dataToTree(parents, children);
      function dataToTree(parents, children) {
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
    SaveMenuCheckeds() {
      let all = this.$refs.tree.getCheckedNodes(false, true).map((item) => {
        return item
      })
      console.log(all);
    },
    getAllPages() {
      getAllPages().then(response => {
        this.data = this.formatRouterTree(response.data)
        this.roleData = this.formatRouterTree(this.$store.getters.routers)
        this.checkedId = this.roleData.map(item => {
          return item.id
        })
        this.expandedId = this.roleData.map(item => {
          if (item.children instanceof Array) {
            if (item.children.length > 0) {
              return item.id
            }
          }
        })

      })
    },
    
  },
  mounted() {
    this.getAllPages()


  }
};
</script>
<style lang='scss' scoped>
</style>