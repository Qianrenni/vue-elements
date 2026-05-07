<!-- src/docs/ComponentList.vue -->
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useComponentInfo } from '@/utils/useComponentInfo.ts';
import type { ComponentInfo } from '@/utils/useComponentInfo.ts';
import type { TreeNodeData } from 'qyani-components';
defineProps<{
  selected: ComponentInfo | null;
}>();

const emit = defineEmits<{
  (e: 'select', comp: ComponentInfo): void;
}>();
const trees = ref<TreeNodeData[]>([]);
const p = new Map<number, ComponentInfo>();
onBeforeMount(() => {
  let id = 1;
  const src: TreeNodeData[] = [];
  useComponentInfo.forEach((comp: ComponentInfo) => {
    const levels = comp.category.split('/').filter((el) => el != '');
    let temp = src;
    for (const level of levels) {
      const index = temp.find((item) => item.label === level);
      if (!index) {
        const newNode = { id: id, label: level, children: [] };
        id += 1;
        temp.push(newNode);
        temp = newNode.children;
      } else {
        temp = index.children!;
      }
    }
    temp.push({ id: id, label: comp.name });
    p.set(id, comp);
    id += 1;
  });
  trees.value = src;
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
    <QTree
      :data="trees"
      @node-click="
        (v) => {
          if (!v.children) {
            emit('select', p.get(v.id)!);
          }
        }
      "
    />
  </div>
</template>

<style scoped>
.component-list {
  width: 260px;
  border-right: 1px solid var(--primary-color);
  height: calc(100vh - 2.5rem);
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
