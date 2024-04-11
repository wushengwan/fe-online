<script setup lang="ts">
import { ref } from 'vue'
import OrgTree from './OrgTree.vue'
import UserTale from './UserTale.vue'
defineProps<{ msg: string }>()

const receivedData = ref('');
const handleReceivedData = (data) => {
  // 更新父组件的数据
  receivedData.value = data;
};

const count = ref(0)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <ul>
          <li style="color: #747bff;border-bottom: 5px solid #747bff">成員管理</li>
          <li>團隊管理</li>
          <li>職位維護</li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <OrgTree @send-data="handleReceivedData"/>
        </el-aside>
        <el-main>
            <UserTale v-show="receivedData"  :msg="receivedData"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
