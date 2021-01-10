<template>
  <div>
    <div>
      <mytable ref="tableRef"
               :tableHeader="tableHeader"
               :params="paginationInfo"
               @tabletotal="tabletotal" />
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

// import { getAdminList } from '@/api/admin';
export default {
  components: { mytable },
  data () {
    return {
      //表格表头
      tableHeader: [
        { label: '用户名', prop: 'user_name' },
        { label: '账号', prop: 'admin_name' },
        { label: '角色名称', prop: 'role_name' },
      ],
      paginationInfo: {
        page: 1,
        limit: 20,
      },
      total: 0,
    }
  },
  methods: {
    tabletotal (val) {
      this.total = val
      // console.log(val);
    },
    handleSizeChange (val) {
      console.log(val);
      this.$refs.tableRef.getList(val)
    }
  },
  mounted () {

  }
}
</script>
<style  scoped>
</style>