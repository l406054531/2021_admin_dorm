<template>
  <div>
    <div class="my-header">
      <div class="logo">
        <div>{{title}}</div>
      </div>
      <el-dropdown trigger="click"
                   @command="handleCommand"
                   @visible-change="dropdownChange">
        <span class="el-dropdown-link">
          <img src="https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/img/wlop/bg_030.jpg"
               alt="">
          <span> {{$store.getters.username}} <i :class="[active?'el-icon-caret-top':'el-icon-caret-bottom' ,'el-icon--right']"></i></span>
          <!-- <span> 彭于晏 <i class="el-icon-arrow-down el-icon--right"></i></span> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="up">更改头像</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <el-dialog title="更改头像"
               :visible.sync="dialogVisible"
               width="30%">
      <el-upload class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 :limit="1"
                 :on-exceed="handleExceed"
                 :file-list="fileList"
                 style="margin-left:20px">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'LOGO',
      imageUrl: '',
      active:false,
      dialogVisible: false,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    logout() {
      sessionStorage.clear();
      this.$router.push('/login')
    },
    homepage() {
      let path = this.$store.getters.permission_routes[0].redirect
      this.$router.push(path)
    },
    handleCommand(command) {
      if (command == "logout") {
        this.logout()
      } else if (command == "home") {
        this.homepage()
      } else if (command == "up") {
        this.dialogVisible = true
      }
    },
    dropdownChange(e){
        this.active=e
    }
  }
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
  background-color: rgb(211, 218, 226);
  color: #000;
  text-align: center;
  font-size: 22px;
  .logo {
    height: 100%;
    float: left;
    margin-left: 20px;
  }
  .el-dropdown {
    float: right;
    margin-right: 50px;
    height: 100%;
    // display: flex;
    // justify-content: space-around;
    cursor: pointer;
    .el-dropdown-link {
      display: flex;
      justify-content: space-around;
      img {
        width: 40px;
        height: 40px;
        margin: auto 8px;
        // line-height: 45px;
        border-radius: 50%;
      }
    }
  }
}
</style>