<template>
  <div class="main">
    <div>
      <mytable ref="tableRef"
               :key="tableKey"
               :tableHeader="tableHeader"
               :params="paginationInfo"
               @tabletotal="tabletotal"
               @handleEdit="handleEdit"
               @handleDelete="handleDelete" />
    </div>
    <div>
      <my-pagination v-on:handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleSizeChange"
                     :paginationInfo="paginationInfo"
                     :total="total"></my-pagination>
    </div>

    <el-drawer title="权限分配"
               :visible.sync="drawer"
               size="20%">
      <!-- <span>我来啦!</span> -->
      <el-button @click="savePermissions">保存</el-button>
      <el-tree :data="data"
               ref="tree"
               show-checkbox
               node-key="id"
               :default-expanded-keys="expandedId"
               :default-checked-keys="checkedId"
               :props="defaultProps">
      </el-tree>
    </el-drawer>

  </div>
</template>

<script>
import mytable from './module/mytable';
import { getPages, addUserAssociation, delUserAssociation } from '@/api/association';
import { delRole } from '@/api/roles';
import { getAllPages } from '@/api/pages';
export default {
  components: { mytable },
  data () {
    return {
      //表格表头
      tableHeader: [
        { label: '#' },
        { label: '角色名', prop: 'role' },
        { label: '操作', prop: 'operate', },
      ],
      tableKey: null,
      paginationInfo: {
        page: 1,
        limit: 20,
      },
      total: 0,
      drawer: false,//抽屉状态
      data: [],
      roleData: [],//用户授权到的页面
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkedId: [],
      expandedId: [],
      role_name: '',
    }
  },
  methods: {
    tabletotal (val) {
      this.total = val
    },
    /**分页变动 */
    handleSizeChange (paginationInfo) {
      let params = {}
      params.page = paginationInfo.page
      params.limit = paginationInfo.limit
      this.tableKey = Math.random() * 100 + new Date();
      //   this.$refs.tableRef.getList(params)
    },
    /**编辑 */
    handleEdit (data) {
      this.drawer = true
      this.role_name = data.role
      this.getPages(data.role)
    },
    /**点击删除 */
    handleDelete (data) {
      this.$confirm('是否删除改用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let id = data.id
        delRole(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableKey = Math.random() * 100 + new Date();
        })
      }).catch(() => {
      });
    },
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
        this.data = this.formatRouterTree(response.data)
      })
    },
    /**授权页面 */
    getPages (role) {
      let data = {}
      let where = {}
      where.role_name = role
      where.nopage = 1
      data.where = JSON.stringify(where)
      getPages(data).then(response => {
        /**默认展开的节点 */
        this.roleData = this.formatRouterTree(response.data)
        this.checkedId = this.roleData.map(item => {
          return item.id
        })
        /**默认选中的节点 */
        this.expandedId = this.roleData.map(item => {
          if (item.children instanceof Array) {
            if (item.children.length > 0) {
              return item.id
            }
          }
        })
        this.getAllPages()
      })
    },

    /**保存按钮 */
    savePermissions () {
      let all = this.$refs.tree.getCheckedNodes(false, true).map((item) => {
        return item
      })
      this.delUserAssociation(all)
      // this.addUserAssociation(all)
      // this.$message({
      //   type: 'success',
      //   message: '保存成功'
      // })
      // this.drawer = false
    },
    /** 删除授权页面 */
    delUserAssociation (allPages) {
      let arrId = []
      let aid = []
      for (let aItem of allPages) {
        for (let rItem of this.roleData) {
          if (aItem.id == rItem.id) {
            arrId.push(aItem.id)
          }
        }
      }
      for (let rItem of this.roleData) {

      }
      console.log(this.roleData);
      /**异步 */
      // aid.forEach(a_id => {
      //   console.log(a_id);
      //   // delUserAssociation(a_id).then(response => { });
      // })
    },
    /**新增授权页面 */
    addUserAssociation (allPages) {
      let addArr = []
      /**过滤页面 */
      for (let aItem of allPages) {
        if (!this.roleData.some(rItem => rItem.name == aItem.name)) {
          addArr.push(aItem)
        }
      }
      /**异步 */
      addArr.forEach(item => {
        let postData = {}
        postData.role_name = this.role_name
        postData.page_name = item.name
        addUserAssociation(postData).then(response => { })
      })
    }
  },
  mounted () {

  },
  watch: {
    // drawer () {
    //   if (this.drawer == true) {
    //     return true
    //   } else {
    //     this.expandedId = []
    //     this.checkedId = []
    //   }
    // }

  }
}
</script>
<style lang="scss">
.el-message-box__wrapper {
  position: fixed;
  top: -400px;
}
</style>
<style lang="scss" scoped>
.main {
  .el-drawer {
    .el-button {
      border-radius: 20px;
      margin-left: 30px;
      height: 30px;
      line-height: 9px;
    }
    .el-tree {
      margin: 20px;
    }
  }
}
::v-deep :focus {
  outline: 0;
  // width: 20%;
}
</style>