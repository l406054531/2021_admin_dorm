<template>
  <el-form ref="ruleform"
           :rules="rules"
           :model="dialogform">
    <el-col :span="colSpan"
            v-for="(item,index) in appdialogHeader"
            :key="index">
      <el-form-item :label="item.label"
                    :prop="item.prop"
                    :label-width="labelWidth">
        <!-- 输入框 -->
        <el-input clearable
                  v-if="item.type==='input'"
                  v-model="dialogform[item.prop]"
                  :placeholder="item.placeholder"
                  :show-password="item.show"></el-input>
        <!-- 文本域 -->
        <el-input clearable
                  v-if="item.type==='textarea'"
                  type="textarea"
                  :rows="2"
                  v-model="dialogform[item.prop]"
                  :placeholder="item.placeholder"
                  style="width:90%"></el-input>
        <!-- 选择器    带搜索 filterable  多选multiple-->
        <el-select v-if="item.type==='select'"
                   v-model="dialogform[item.prop]"
                   clearable
                   :filterable="item.filterable"
                   :multiple="item.multiple"
                   :placeholder="item.placeholder"
                   @blur="item.blur($event,dialogform[item.prop])">
          <el-option v-for="(selectedItem,index) in item.typeselects"
                     :key="index"
                     :label="selectedItem.label||selectedItem.name"
                     :value="selectedItem.value">
          </el-option>
        </el-select>
        <!-- 级联选择器 -->
        <!-- :show-all-levels="false" 仅显示最后一级 -->
        <el-cascader v-if="item.type==='cascader'"
                     v-model="dialogform[item.prop]"
                     clearable
                     :filterable="item.filterable"
                     :show-all-levels="item.levels"
                     :props="{ checkStrictly: item.check }"
                     :placeholder="item.placeholder"
                     :options="item.options"></el-cascader>
        <!-- 日期时间选择器 -->
        <!-- 选传： format日期显示格式  默认0年1月2日  0.1.2 ,  valueFormat存储格式见 https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi 时间戳timestamp  -->

        <el-date-picker v-if="item.type==='date'"
                        v-model="dialogform[item.prop]"
                        :type="item.dateType"
                        :placeholder="item.placeholder"
                        :format="item.format"
                        :value-format="item.valueFormat">
        </el-date-picker>
      </el-form-item>
    </el-col>
  </el-form>

</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: "120px"
    },
    colSpan: {
      type: Number,
      // default: ''
    },
    dialogform: {
      type: Object,
      default: () => { }
    },
    rules: {
      type: Object,
      default: () => []
    },
    appdialogHeader: {
      type: Array,
      default: () => []
    },
    dialogTitle: {
      type: String
    },

  },
  methods: {
    validateForm() {
      // debugger;
      let flag = null
      this.$refs['ruleform'].validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
    },

  },
  mounted() {

  },
  created() {

  },

}
</script>
<style lang="scss" scoped>
.el-form {
  .el-form-item {
    .el-input {
      width: 90%;
    }
    .el-select {
      width: 90%;
    }
    .el-cascader {
      width: 90%;
    }
    .el-date-editor.el-input {
      width: 90%;
    }
  }
}
</style>