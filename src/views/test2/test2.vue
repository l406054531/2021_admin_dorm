<template>
  <div>
    <el-tree :data="data"
             ref="tree"
             node-key="id"
             :default-expanded-keys="expandedKyes"
             :props="defaultProps"
             default-expand-all
             :expand-on-click-node="false">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text"
                     size="mini"
                     @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text"
                     size="mini"
                     @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="添加页面"
               :visible.sync="dialogVisible"
               width="30%">
      <el-form ref="addformRef"
               :model="addform"
               label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="addform.title"></el-input>
        </el-form-item>
        <el-form-item label="name值">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addPages">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRouters, addUserPages } from '@/api/association';
import { addPages, getAllPages } from '@/api/pages';
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      expandedKyes: [],
      dialogVisible: false,
      addform: {
        pid: '',
        title: '',
        name: ''
      }
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
    getAllPages () {
      getAllPages().then(response => {
        console.log(response.data);
        this.data = this.formatRouterTree(response.data)
        // console.log(this.data);
        this.expandedKyes = this.data.map(item => {
          return item.id
        })
      })
    },
    append (data) {
      console.log(data);
      this.dialogVisible = true
      this.addform.pid = data.id
    },
    remove (data) { },
    addPages () {
      addPages(this.addform).then(response => {
        this.dialogVisible = false
        console.log(response);
      })
    },
  },
  mounted () {
    this.getAllPages()


  }
};
</script>
<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>