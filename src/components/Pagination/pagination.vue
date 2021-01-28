<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="paginationInfo.page"
                 :page-sizes="[1, 20, 50, 100]"
                 :page-size="paginationInfo.limit"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    paginationInfo: {
      type: Object,
      default: function () {
        return {
          page: 1,
          limit: 20,
        }
      }
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSizeChange (val) {
      this.paginationInfo.limit = val
      this.$emit('handleSizeChange', this.paginationInfo)

    },
    handleCurrentChange (val) {
      this.paginationInfo.page = val
      this.$emit('handleSizeChange', this.paginationInfo)
    }
  },

}
</script>
<style lang="scss">
.el-pagination {
  margin-top: 20px;
}
</style>
