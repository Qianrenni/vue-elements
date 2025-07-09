<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ summary }}</p>
    <!-- 插槽：附件 -->
    <slot name="attachments"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: '暂无摘要'
  }
})
defineOptions({
  name: 'ArticleCard'
})
</script>

<style scoped>
.card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  margin-bottom: 0.5rem;
}

.card a {
  display: block;
  margin-top: 1rem;
}
</style>