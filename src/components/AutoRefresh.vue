<template>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="面板操作" name="1">
        <div class="flex items-center">
          <el-switch v-model="autoRefresh" active-text="开启" inactive-text="关闭" />
          <span class="ml-2">自动刷新（每10秒）</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const emit = defineEmits(['refresh']);
  const autoRefresh = ref(false);
  const activeNames = ref(['1']);
  let refreshTimer = null;
  
  const startRefresh = () => {
    refreshTimer = setInterval(() => {
      emit('refresh');
    }, 10000);
  };
  
  const stopRefresh = () => {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  };
  
  watch(autoRefresh, (newVal) => {
    if (newVal) {
      startRefresh();
    } else {
      stopRefresh();
    }
  });
  
  onMounted(() => {
    window.addEventListener('blur', stopRefresh);
    window.addEventListener('focus', () => {
      if (autoRefresh.value && !refreshTimer) {
        startRefresh();
      }
    });
  });
  </script>