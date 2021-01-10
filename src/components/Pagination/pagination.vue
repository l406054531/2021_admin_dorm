<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="paging.page"
                 :page-sizes="[1, 20, 50, 100]"
                 :page-size="paging.limit"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
  </el-pagination>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    paging: {
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
      this.$emit('handleSizeChange', this.paging)
      this.paging.limit = val
    },
    handleCurrentChange (val) {
      this.$emit('handleSizeChange', this.paging)
      this.paging.page = val
    }
  },

}
</script>
