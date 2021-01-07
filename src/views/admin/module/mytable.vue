<template>
  <div>
    <el-table :data="tableData"
              border
              highlight-current-row
              style="width: 87.5%">
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
export default {
  props: {
    tableHeader: Array
  },
  data() {
    return {
      tableData: [],
    };
  },
}

</script>
<style lang='scss' scoped>
</style>