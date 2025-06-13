<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="全部节点信息" name="1">
      <el-button type="primary" @click="addDevice" class="mb-4">新增节点</el-button>
      <el-table :data="peers" stripe border style="width: 100%">
        <el-table-column prop="id" label="节点ID" align="center" sortable width="auto" />
        <el-table-column prop="ipv4" label="虚拟IPv4" align="center" sortable   min-width="100" > <template #default="scope">
            <div>
              <el-button link type="primary" icon="DocumentCopy" @click="copyData(scope.row)"></el-button>
              {{ scope.row.ipv4 }}
            </div>
          </template> </el-table-column>
        <el-table-column prop="hostname" label="主机名" align="center" sortable width="auto" />
        <el-table-column prop="cost" label="穿透方式" align="center" sortable width="auto" />
        <el-table-column prop="lat_ms" label="延迟" align="center" sortable width="auto" />
        <el-table-column prop="loss_rate" label="丢包率" align="center" sortable width="auto" />
        <el-table-column prop="rx_bytes" label="接收" align="center" sortable width="auto" />
        <el-table-column prop="tx_bytes" label="发送" align="center" sortable width="auto" />
        <el-table-column prop="tunnel_proto" label="协议类型" align="center" sortable width="auto" />
        <el-table-column prop="nat_type" label="Nat类型" align="center" sortable width="auto" />
        <el-table-column prop="version" label="内核版本" align="center" sortable width="auto" />
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

const copyData = row => {
  var Url2 = row.ipv4; //每一行的某个值，如选中的当前行的url
  var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
  oInput.value = Url2; //赋值
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display = 'none';
  ElMessage.success('已复制');
};


</script>