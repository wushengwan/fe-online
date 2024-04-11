<template>
  <div class="content">
    <div>{{ msg }}</div>
    <div class="input">
      <el-input
        v-model="searchText"
        placeholder="亲输入姓名或用户id搜索"
        @input="handleSearch"
      ></el-input>
    </div>
    <el-table :data="filteredData" style="width: 100%" row-height="40px">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="id" label="用户名"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, watch, defineProps  } from 'vue';
import { ElTable, ElTableColumn, ElInput } from 'element-plus';
import userApi from '../api/user'

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElInput
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const tableData = ref([]);
    const msg = ref(props.msg)
    const searchText = ref('');
    const filteredData = ref([...tableData.value]); // 初始化时展示全部数据
    const selectedRows = ref([]); // 存储选中的行数据

    //根据传入ID为1的对象，获取部门的人数
   if(msg){
     userApi.query({id:1}).then((users) => {
      tableData.value.push(...users)
      filteredData.value=tableData.value
    })
   }


    //防抖
    const debounce = (fn,timer) => {console.log(1)
      let timeObj = null
      return function () {
        clearTimeout(timeObj)
        timeObj = setTimeout(() => {
          fn.apply(this)
        }, timer);
      }
    }
    let timer = ref(null); // 用于存储定时器
    const handleSearch = () => {

       // 清除之前的定时器
      clearTimeout(timer);
       clearTimeout(timer);
      // 创建一个新的定时器
      timer = setTimeout(() => {
        // 根据搜索条件过滤数据
        // 这里的过滤逻辑根据实际需求来编写
        // 这里只是简单地示范搜索功能,防抖
        filteredData.value = tableData.value.filter(item =>
          item.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
          String(item.id).includes(searchText.value)
        )
      }, 1000); // 设置防抖的时间间隔为 300 毫秒
    };
    // 监听搜索框输入事件，当输入发生变化时执行搜索逻辑
    watch(searchText, () => {
      handleSearch()
    });
    return {
      searchText,
      filteredData,
      selectedRows,
      debounce,
      timer,
      handleSearch
    };
  }
};
</script>
<style scoped>
.input,
input {
  width: 40vh;
  margin-bottom: 20px;
}
::v-deep .el-table__header th,
td {
  line-height: 30px;
}
::v-deep .el-table__body td {
  line-height: 30px;
}
</style>
