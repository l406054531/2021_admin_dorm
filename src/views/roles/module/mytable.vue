<template>
  <div>
    <el-table :data="tableData"
              border
              highlight-current-row>
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
                       @click="handleEdit(scope.row)"><i class="el-icon-edit" /> 用户权限</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleDelete(scope.row)"><i class="el-icon-delete" /> 删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.label=='#'"
                         type="index"
                         :label="item.label"
                         :key="index"
                         width="80"
                         align="center">
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
import { getRolesList } from '@/api/roles';
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
      getRolesList(params).then(response => {
        if (response.code == 1) {
          this.tableData = response.data
          this.$emit('tabletotal', response.count)
          this.total = response.count
        }
      })
    },
    /**编辑 */
    handleEdit (data) {
      this.$emit('handleEdit', data)
    },
    /**点击删除 */
    handleDelete (data) {
      this.$emit('handleDelete', data)
    },
  },
  mounted () {
    this.getList(this.params)
  },
}

</script>
<style lang='scss' scoped>
</style>