<template>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="全部节点信息" name="1">
        <el-button type="primary" @click="addDevice" class="mb-4">新增节点</el-button>
        <el-table :data="peers" stripe border style="width: 100%">
          <el-table-column prop="id" label="节点ID" align="center" width="auto" />
          <el-table-column prop="ipv4" label="虚拟IPv4" align="center" sortable width="auto" />
          <el-table-column prop="hostname" label="主机名" align="center" width="auto" />
          <el-table-column prop="cost" label="穿透方式" align="center" width="auto" />
          <el-table-column prop="lat_ms" label="延迟" align="center" width="auto" />
          <el-table-column prop="loss_rate" label="丢包率" align="center" width="auto" />
          <el-table-column prop="rx_bytes" label="接收" align="center" width="auto" />
          <el-table-column prop="tx_bytes" label="发送" align="center" width="auto" />
          <el-table-column prop="tunnel_proto" label="协议类型" align="center" width="auto" />
          <el-table-column prop="nat_type" label="Nat类型" align="center" width="auto" />
          <el-table-column prop="version" label="内核版本" align="center" width="auto" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  defineProps(['peers']);
  const activeNames = ref(['1']);
  const addDevice = () => {
    window.open('https://easytier.cn/web/index.html#/config_generator', '_blank');
  };
  </script>