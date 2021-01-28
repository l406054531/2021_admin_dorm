<template>
  <div>
    <el-table :data="tableData"
              border
              highlight-current-row
              height="650">
      <template v-for="(item,index) in tableHeader">
        <el-table-column v-if="item.label=='操作'"
                         :label="item.label"
                         :key="index"
                         :prop="item.prop"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="handleEdit(scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleReset(scope.row)"><i class="el-icon-refresh" /> 重置密码</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleDelete(scope.row)"><i class="el-icon-delete" /> 删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.prop==='role_name'"
                         :label="item.label"
                         :key="index"
                         :prop="item.prop"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <el-row v-text="ifRoleName(scope.row.role_name)"></el-row>
          </template>
        </el-table-column>
        <el-table-column v-else
                         :label="item.label"
                         :key="index"
                         :prop="item.prop"
                         :width="item.width"
                         align="center">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { getAdminList } from '@/api/admin';
export default {
  props: {
    tableHeader: Array,
    params: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: [],
      paging: {
        page: 1,
        limit: 20,
      },
      total: 0
    };
  },
  methods: {
    getList (params) {
      getAdminList(params).then(response => {
        if (response.code == 1) {
          this.tableData = response.data
          this.$emit('tabletotal', response.count)
          this.total = response.count
        }
      })
    },
    getParentData (data) {
      this.tableData = data
    },
    /**编辑 */
    handleEdit (data) {
      this.$emit('handleEdit', data)
    },
    /**点击删除 */
    handleDelete (data) {
      this.$emit('handleDelete', data)
    },
    /**重置密码 */
    handleReset (data) {
      this.$emit('handleReset', data)
    },
    /**判断角色名 */
    ifRoleName (name) {
      switch (name) {
        case 'admin':
          return '超级管理员';
          break;
        case 'weixiu':
          return '维修工';
          break;
        case 'weisheng':
          return '卫生工';
          break;
        default:
          return name
      }
    }
  },
  mounted () {
    this.getList(this.params)
  },
}

</script>
<style lang='scss' scoped>
</style>