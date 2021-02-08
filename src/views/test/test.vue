 <template>
  <div>
    <el-table :data="tableData"
              :span-method="objectSpanMethod"
              border
              style="width: 100%; margin-top: 20px">
      <el-table-column prop="date"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名">
      </el-table-column>
      <el-table-column prop="amount1"
                       label="数值 1（元）">
      </el-table-column>
      <el-table-column prop="amount2"
                       label="数值 2（元）">
      </el-table-column>
      <el-table-column prop="amount3"
                       label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      tableData: [{
        date: '上午',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        date: '上午',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      },
      {
        date: '上午',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }, {
        date: '下午',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        date: '下午',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      },

      ],
      testArr: [],
      position: '',
      dataList: [
        {
          id: '1',
          name: '父级',
          pid: "0"
        },
        {
          id: '101',
          name: '子级',
          pid: "1"
        },
        {
          id: '102',
          name: '子级',
          pid: "1"
        },
        {
          id: '2',
          name: '父级',
          pid: "0"
        },
      ]
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let _row = this.testArr[rowIndex]
        let _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    test() {
      let dataList = this.dataList
      let parent = dataList.filter(pItem => pItem.pid == 0),
        children = dataList.filter(cItem => cItem.pid != 0)
      let arr = parent.map(pItem => {
        let a = []
        children.map(cItem => {
          if (pItem.id == cItem.pid) {
            a.push(cItem)
          }
        })
        pItem.children = a
        return pItem
      })
    }
  },
  mounted() {
    this.tableData.forEach((item, index) => {

      if (index === 0) {
        this.testArr.push(1)
        this.position = 0
      } else {
        if (this.tableData[index]['date'] == this.tableData[index - 1]['date']) {
          this.testArr[this.position] += 1
          this.testArr.push(0)
        } else {
          this.testArr.push(1)
          this.position = index
        }
      }
    })
    this.test()
  }
};
</script>