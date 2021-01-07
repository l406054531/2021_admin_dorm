<template>
  <div>
    <div>
      <mytable :tableHeader="tableHeader" />
    </div>
  </div>
</template>

<script>
import mytable from './module/mytable';
export default {
  components: { mytable },
  data () {
    return {
      tableHeader: [
        { label: 'a', prop: 'z' },
        { label: 'a', prop: 'z' },
      ]
    }
  },
}
</script>
<style  scoped>
</style>