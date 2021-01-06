<template>
  <header class="my-header">
 
      <div class="logo">
         <div>{{title}}</div>
      </div>

       <div class="user">
          {{user}}
      </div>

   
  </header>
</template>

<script>
export default {
  data () {
    return {
        title:'LOGO',
        user:'USER'
    };
  },
};
</script>
<style lang='scss' scoped>
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: pink;
  color: #000;
  text-align: center;
  font-size: 22px;
  .logo{
    float: left;
    margin-left: 20px;
  }
  .user{
    float: right;
    margin-right: 20px;
  }
  
}
</style>