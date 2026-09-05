<script lang="ts" setup>
import { groupLabel } from '@/utils/docsSections';
import type { DocsEntry } from '@/utils/useComponentInfo';
import { QTree } from 'qyani-components';
import type { TreeNodeData } from 'qyani-components';
import { onBeforeMount, ref, watch } from 'vue';

/**
 * 侧边栏目录：展示「当前顶层栏目」下的多级树。
 * - 树层级 = entry.category 去掉顶层栏目后的剩余段（如 basic/layout、Events、Utilities/business）
 * - category 只有顶层一段的条目（如设计系统页）作为叶子直接平铺
 */
const props = defineProps<{
  selected: DocsEntry | null;
  entries: DocsEntry[];
  title?: string;
}>();

const emit = defineEmits<{
  (event: 'select', entry: DocsEntry): void;
}>();

const trees = ref<TreeNodeData[]>([]);
const entriesById = new Map<number, DocsEntry>();

const createTree = (list: DocsEntry[]): TreeNodeData[] => {
  let nextId = 1;
  const root: TreeNodeData[] = [];
  entriesById.clear();

  for (const entry of list) {
    const path = entry.category.slice(1);
    if (path.length === 0) {
      const entryId = nextId;
      root.push({ id: entryId, label: entry.displayName, children: [] });
      entriesById.set(entryId, entry);
      nextId += 1;
      continue;
    }
    let level = root;
    for (const raw of path) {
      const label = groupLabel(raw);
      let node = level.find((item) => item.label === label);
      if (!node) {
        node = { id: nextId, label, children: [], expanded: true };
        nextId += 1;
        level.push(node);
      }
      level = node.children!;
    }
    const entryId = nextId;
    level.push({ id: entryId, label: entry.displayName, children: [] });
    entriesById.set(entryId, entry);
    nextId += 1;
  }
  return root;
};

const build = () => {
  trees.value = createTree(props.entries);
};

onBeforeMount(build);
watch(() => props.entries, build);
</script>

<template>
  <div class="component-list scroll-container scroll-y">
    <h2
      class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray"
    >
      {{ title ?? '文档目录' }}
    </h2>
    <QTree
      :data="trees"
      @node-click="
        (node) => {
          const entry = entriesById.get(node.id as number);
          if (entry) emit('select', entry);
        }
      "
    />
  </div>
</template>

<style scoped>
.component-list {
  width: 260px;
  border-right: 1px solid var(--q-color-primary);
  height: calc(100vh - 3.5rem);
}
</style>
