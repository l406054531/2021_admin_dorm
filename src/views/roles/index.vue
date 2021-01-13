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
  </div>
</template>

<script>
import mytable from './module/mytable';
import { getAdminList, del, Edit } from '@/api/admin';
export default {
  components: { mytable },
  data() {
    return {
      //表格表头
      tableHeader: [
        { label: '用户名', prop: 'name' },
        { label: '角色名', prop: 'role' },
        { label: '操作', prop: 'operate', },
      ],
      tableKey: null,
      paginationInfo: {
        page: 1,
        limit: 20,
      },
      total: 0,

    }
  },
  methods: {
    tabletotal(val) {
      this.total = val
    },
    /**分页变动 */
    handleSizeChange(paginationInfo) {
      let params = {}
      params.page = paginationInfo.page
      params.limit = paginationInfo.limit
      this.tableKey = Math.random() * 100 + new Date();
      //   this.$refs.tableRef.getList(params)
    },
    /**编辑 */
    handleEdit(data) {


    },
    /**点击删除 */
    handleDelete(data) {
      this.$confirm('是否删除改用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // let admin_id = data.admin_id
        // del(admin_id).then(response => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        //   this.tableKey = Math.random() * 100 + new Date();
        // })
      }).catch(() => {
      });
    },
  },
  mounted() {
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
  ::v-deep {
    .el-dialog {
      height: 320px;
    }
  }
}
</style>