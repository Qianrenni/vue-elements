<template>
  <div v-html="content" style="cursor: pointer;"
  />
</template>

<script lang="ts" setup>
import {ref, onMounted, useTemplateRef} from 'vue'
import { defineProps } from 'vue'
const iconRef=useTemplateRef('icon')
const props = defineProps({
  icon: {
    type: String,
    default: 'User' // 默认图标名称
  },
  size: {
    type: String,
    default: '32' // 默认图标大小
  }
})

// 定义一个响应式变量来存储 SVG 字符串
const content = ref('') // 初始为空字符串

// 动态导入 SVG 字符串
const loadSvg = async () => {
  try {
    // 动态拼接路径，如：'../icons/user.svg?raw'
    const module = await import(`../icons/${props.icon[0].toUpperCase()}${props.icon.slice(1)}.svg?raw`)
    content.value = module.default // Vite 的 ?raw 导入会将内容放在 default 中
    // 设置SVG的宽度和高度
    content.value = module.default.replace('<svg', `<svg width="${props.size}" height="${props.size}"`)
  } catch (error) {
    console.error(`Failed to load SVG: ../icons/${props.icon}.svg`, error)
    content.value = '' // 加载失败时清空内容（或设置一个默认图标）
  }
}

// 在组件挂载后加载 SVG
onMounted(() => {
  loadSvg();
})
</script>

<style scoped></style>
