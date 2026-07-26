<script lang="ts" setup>
import { docsEntries } from '@/utils/useComponentInfo.ts';
import type { DocsEntry } from '@/utils/useComponentInfo.ts';
import { QTree } from 'qyani-components';
import type { TreeNodeData } from 'qyani-components';
import { onBeforeMount, ref } from 'vue';

defineProps<{
  selected: DocsEntry | null;
}>();

const emit = defineEmits<{
  (event: 'select', entry: DocsEntry): void;
}>();

const trees = ref<TreeNodeData[]>([]);
const entriesById = new Map<number, DocsEntry>();

/**
 * Build a deterministic tree from the generated documentation category paths.
 * @returns Tree data compatible with QTree.
 */
const createTree = (): TreeNodeData[] => {
  let nextId = 1;
  const root: TreeNodeData[] = [];

  for (const entry of docsEntries) {
    let currentLevel = root;
    for (const label of entry.category) {
      let node = currentLevel.find((item) => item.label === label);
      if (!node) {
        node = { id: nextId, label, children: [], expanded: true };
        nextId += 1;
        currentLevel.push(node);
      }
      currentLevel = node.children!;
    }

    const entryId = nextId;
    currentLevel.push({ id: entryId, label: entry.displayName });
    entriesById.set(entryId, entry);
    nextId += 1;
  }

  return root;
};

onBeforeMount(() => {
  trees.value = createTree();
});
</script>

<template>
  <div class="component-list scroll-container scroll-y">
    <h2
      class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray"
    >
      文档目录
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
  border-right: 1px solid var(--primary-color);
  height: calc(100vh - 2.5rem);
}
</style>
