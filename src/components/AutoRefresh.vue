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
import { ref, watch, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['refresh']);
const autoRefresh = ref(false);
const activeNames = ref(['1']);
let refreshTimer = null;

const startRefresh = () => {
  if (refreshTimer) return;
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
  if (newVal) startRefresh();
  else stopRefresh();
});

onMounted(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      stopRefresh();
    } else if (document.visibilityState === 'visible' && autoRefresh.value) {
      // 👇 切回页面时立即刷新一次
      emit('refresh');
      // 然后重新启动定时器
      startRefresh();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  window.addEventListener('blur', stopRefresh);
  window.addEventListener('focus', () => {
    if (autoRefresh.value && !refreshTimer) {
      emit('refresh'); // 👈 同样在窗口重新聚焦时立即刷新
      startRefresh();
    }
  });

  onUnmounted(() => {
    stopRefresh();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', stopRefresh);
  });
});
</script>