<template>
  <div class="container-flex-start container-wrap">
    <Card v-for="(component, name) in iconMap" :key="name" class="margin-rem">  <!-- 添加 :key -->
      <template #default>
        <component
            :is="component"
            style="cursor: pointer; width: 32px; height: 32px;"
        />  <!-- 修复闭合标签 -->
      </template>
      <template #footer>
        {{ name }}
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, defineOptions } from 'vue'
import Card from './Card.vue'


// 获取 ions 目录下所有 .vue 文件
const iconFiles = import.meta.glob('../icons/*.vue')

// 自动生成图标名称映射
const iconMap = Object.fromEntries(
    Object.keys(iconFiles).map(path => {
      const name = path.split('/').pop()?.replace('.vue', '').toLowerCase() || ''
      return [name, defineAsyncComponent(iconFiles[path])]
    })
)

// const component = computed(() => iconMap[props.icon.toLowerCase()])
defineOptions({
  name: 'IconGroups'
})
</script>

<style scoped></style>
