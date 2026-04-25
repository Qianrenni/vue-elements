<!-- src/docs/ComponentList.vue -->
<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useComponentInfo } from '@/utils/useComponentInfo.ts';
import type { ComponentInfo } from '@/utils/useComponentInfo.ts';
defineProps<{
  selected: ComponentInfo | null;
}>();

const emit = defineEmits<{
  (e: 'select', comp: ComponentInfo): void;
}>();
// ✅ 按 category 分组
let grouped: Map<string, ComponentInfo[]> | null = null;

onBeforeMount(() => {
  const map = new Map<string, ComponentInfo[]>();
  useComponentInfo.forEach((comp: ComponentInfo) => {
    if (!map.has(comp.category)) {
      map.set(comp.category, []);
    }
    map.get(comp.category)!.push(comp);
  });
  grouped = map;
});
</script>

<template>
  <div class="component-list scroll-container scroll-y">
    <!-- 左侧标题 -->
    <h2
      class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray"
    >
      组件列表
    </h2>

    <div
      v-for="[category, list] in grouped"
      :key="category"
      class="category margin-half-vetical"
    >
      <div class="text-12rem text-muted padding-half-rem radius-third-rem">
        <strong
          ><em>{{ category }}</em></strong
        >
      </div>
      <div class="container-column padding-half-rem">
        <span
          v-for="comp in list"
          :key="comp.name"
          :class="{ 'component-active': selected?.name === comp.name }"
          class="component-item padding-24rem margin-fourth-vetical radius-third-rem"
          @click="emit('select', comp)"
        >
          {{ comp.displayName }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-list {
  width: 260px;
  border-right: 1px solid var(--primary-color);
  height: calc(100vh - 3.5rem);
}

/* 组件项样式 */
.component-item {
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.component-item:hover {
  background-color: var(--gray-200);
  transform: translateX(5px);
  border-left: 3px solid var(--primary-light);
}

.component-active {
  background-color: var(--primary-color);
  color: white;
  border-left: 3px solid var(--primary-light);
  font-weight: bold;
}

/* 添加进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
