<template>
  <div class="container">
    <auto-refresh @refresh="() => fetchAllData(false)" />
    <node-info :node-info="nodeInfo" v-if="nodeInfo" />
    <server-connection :connectors="connectors" v-if="connectors.length" />
    <peer-list :peers="peers" :device-count="deviceCount" :last-time="lastTime" v-if="peers.length" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElLoading, ElMessage } from 'element-plus';
import axios from 'axios';
import AutoRefresh from './components/AutoRefresh.vue';
import NodeInfo from './components/NodeInfo.vue';
import ServerConnection from './components/ServerConnection.vue';
import PeerList from './components/PeerList.vue';

const API_BASE_URL = '/api';
const API_ENDPOINTS = {
  NODE: `${API_BASE_URL}/node`,
  CONNECTOR: `${API_BASE_URL}/connector`,
  PEER: `${API_BASE_URL}/peer`,
};

const nodeInfo = ref(null);
const connectors = ref([]);
const peers = ref([]);
const loadingInstance = ref(null);
const deviceCount = ref(0); // 定义 deviceCount
const lastTime = ref(null);

const fetchNodeInfo = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.NODE);
    if (response.data.code === 0 && response.data.data) {
      nodeInfo.value = response.data.data;
    } else {
      ElMessage.error('数据加载失败: ' + response.data.msg);
    }
  } catch (error) {
    ElMessage.error('请求失败，请检查网络或接口');
  }
};

const fetchConnectors = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.CONNECTOR);
    if (response.data.code === 0 && response.data.data) {
      connectors.value = response.data.data;
    } else {
      ElMessage.error('数据加载失败: ' + response.data.msg);
    }
  } catch (error) {
    ElMessage.error('请求失败，请检查网络或接口');
  }
};

const fetchPeers = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.PEER);
    if (response.data.code === 0 && response.data.data) {
      peers.value = response.data.data;
      deviceCount.value = response.data.data.length; // 更新设备数量
      lastTime.value = nowDate() //当前时间
    } else {
      ElMessage.error('数据加载失败: ' + response.data.msg);
    }
  } catch (error) {
    console.log(error);
    ElMessage.error('请求失败，请检查网络或接口');
  }
};

//获取当前时间
function nowDate() {
  var getTime = new Date().getTime(); //获取到当前时间戳
  var time = new Date(getTime); //创建一个日期对象
  var year = time.getFullYear(); // 年
  var month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
  var date = time.getDate().toString().padStart(2, '0'); // 日
  var hour = time.getHours().toString().padStart(2, '0'); // 时
  var minute = time.getMinutes().toString().padStart(2, '0'); // 分
  var second = time.getSeconds().toString().padStart(2, '0'); // 秒
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  )
}

const isInitialLoad = ref(true);
const fetchAllData = async (showLoading = false) => {
  if (showLoading && isInitialLoad.value) {
    loadingInstance.value = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }
  try {
    await Promise.all([fetchNodeInfo(), fetchConnectors(), fetchPeers()]);
  } finally {
    if (loadingInstance.value) {
      loadingInstance.value.close();
      loadingInstance.value = null;
    }
    isInitialLoad.value = false;
  }
};

onMounted(() => fetchAllData(true));
</script>

<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}
</style>