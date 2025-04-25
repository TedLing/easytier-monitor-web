<template>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="服务器连接情况" name="1">
        <el-table :data="connectors" stripe style="width: 100%">
          <el-table-column prop="url" label="服务器地址" align="center" />
          <el-table-column prop="status" label="连接情况" align="center" sortable />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  defineProps(['connectors']);
  const activeNames = ref([]); // 默认折叠
  </script>