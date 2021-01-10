<template>
  <div>
    <el-table :data="tableData"
              border
              highlight-current-row>
      <template v-for="(item,index) in tableHeader">
        <el-table-column :label="item.label"
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
    params: Object
  },
  data () {
    return {
      tableData: [],
    };
  },
  methods: {
    getList (params) {
      getAdminList(params).then(response => {
        if (response.code == 1) {
          this.tableData = response.data
          this.$emit('tabletotal', response.count)
        }
      })
    },
  },
  mounted () {
    this.getList(this.params)
  },
  // watch: {
  //   "params.page": function (value, oldValue) {
  //     return console.log(value);
  //   }
  // },
}

</script>
<style lang='scss' scoped>
</style>