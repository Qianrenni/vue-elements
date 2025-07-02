<template>
  <span class="course-tag btn-outline">{{ skill }}</span>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
// 定义 props 类型
interface Props {
  skill: string
}

// 使用 defineProps 接收属性
const props = defineProps<Props>()
</script>

<style scoped>
.course-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
}
</style>