<template>
  <div>
    <h5 class="mb-2">部門</h5>
    <el-menu :default-active="activeMenu" mode="vertical" @select="handleMenuSelect">
      <template v-for="(menu, index) in menus">
         <div>
            <span>{{ menu.title }}</span>
         </div>
        <el-submenu v-if="menu.children && menu.children.length > 0"  :index="'submenu-' + index">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item v-for="(child, childIndex) in menu.children" :index="'child-' + index + '-' + childIndex" :key="childIndex">
            {{ child.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="'menu-' + index" :key="index">
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref } from 'vue';
import orgApi from '../api/org'
export default {
  name: 'DynamicMenu',
  setup(_,{emit}) {
    const activeMenu = ref('');
    const menus = ref([ ]); 

    const handleMenuSelect = (index) => {
      activeMenu.value = index;
       // 触发名为 'send-data' 的自定义事件，并传递数据
      emit('send-data', index);
    };
    orgApi.query('1').then((res) => {
      menus.value = res
   })

    return {
      activeMenu,
      menus,
      handleMenuSelect
    };
  }
};
</script>

<style scoped>
.mb-2{
   text-align: left;
   padding-left:20px;
}
</style>
