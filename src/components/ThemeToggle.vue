<template>
  <div class="theme-toggle" @click="toggleMode" aria-label="切换主题">
    <icon icon="Sun" v-if="isDarkMode" />
    <icon icon="Moon" v-else  />
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'

// 响应式状态：是否为暗黑模式
const isDarkMode = ref<boolean>(false)

// 组件挂载后初始化状态
onMounted(() => {
  nextTick(()=>{
    isDarkMode.value = document.body.classList.contains('dark-mode')
  })
})

// 切换主题的方法
function toggleMode(): void {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)

  // 可选：保存用户偏好到 localStorage
  localStorage.setItem('darkMode', String(isDarkMode.value))
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
}

.theme-toggle:hover {
  transform: scale(1.1);
}
</style>
