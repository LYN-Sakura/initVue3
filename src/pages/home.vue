<template>
  <n-message-provider>
    <n-button type="primary" @click="clickBtn">{{ counter.count }}</n-button></n-message-provider
  >
</template>
<script setup lang="ts">
import { useIndexStore } from "@/store/index";
const counter = useIndexStore();
const clickBtn = () => {
  window.$message.success("使用成功");
};
</script>
