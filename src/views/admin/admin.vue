<template>
  <div class="main">
    <div>
      <mytable ref="tableRef"
               :key="tableKey"
               :tableHeader="tableHeader"
               :params="paginationInfo"
               @tabletotal="tabletotal"
               @handleEdit="handleEdit"
               @handleDelete="handleDelete"
               @handleReset="handleReset" />
    </div>
    <div>
      <my-pagination v-on:handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleSizeChange"
                     :paginationInfo="paginationInfo"
                     :total="total"></my-pagination>
    </div>
    <div>
      <el-dialog title="权限分配"
                 :visible.sync="dialogVisible"
                 :close-on-click-modal="false"
                 width="32%">
        <el-form ref="form"
                 :model="roleForm"
                 label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="roleForm.user_name"
                      disabled
                      style="width:92%"></el-input>
          </el-form-item>
          <el-form-item label="权限名称">
            <el-select v-model="roleForm.role_name"
                       clearable
                       placeholder="请选择"
                       style="width:92%">
              <el-option v-for="item in roleSelect"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="editUserRole">确 定</el-button>
        </span>
      </el-dialog>
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
        { label: '用户名', prop: 'user_name' },
        { label: '账号', prop: 'admin_name' },
        { label: '权限名称', prop: 'role_name' },
        { label: '操作', prop: 'role_name', },
      ],
      tableKey: null,
      paginationInfo: {
        page: 1,
        limit: 20,
      },
      total: 0,
      dialogVisible: false,
      roleForm: {
        admin_id: '',
        user_name: '',
        role_name: '',
      },
      roleSelect: [
        {
          label: '超级管理员',
          value: 'admin'
        },
        {
          label: '维修工',
          value: 'weixiu'
        },
        {
          label: '卫生工',
          value: 'weisheng'
        },
      ]
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
      this.dialogVisible = true
      this.roleForm.admin_id = data.admin_id
      this.roleForm.user_name = data.user_name
      this.roleForm.role_name = data.role_name
      //   this.user_name=data.user_name
    },
    /**点击删除 */
    handleDelete(data) {
      this.$confirm('是否删除改用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let admin_id = data.admin_id
        del(admin_id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableKey = Math.random() * 100 + new Date();
        })
      }).catch(() => {
      });
    },
    /**重置密码 */
    handleReset(data) {
      this.$confirm('是否重置该用户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {}
        postData.admin_id = data.admin_id
        postData.admin_password = '123456'
        Edit(postData).then(response => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        })
      }).catch(() => {
      });
    },
    /**修改用户权限名 */
    editUserRole() {
      Edit(this.roleForm).then(response => {
        if (response.code == 1) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.dialogVisible = false
          this.tableKey = Math.random() * 100 + new Date();
        }
        // console.log(response);
      })
    }
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