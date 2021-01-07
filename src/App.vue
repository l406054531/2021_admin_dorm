<template>
  <div id="app">
      <router-view :key="key()" :to="key()"></router-view>
  </div>
</template>
<script>
export default {
    methods:{
         key(){
	      return Math.random();
	    }
    }
}
</script>
<style>
</style>
