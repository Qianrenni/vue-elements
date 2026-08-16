<template>
  <div role="tree">
    <QTreeNode
      v-for="node in props.data"
      :key="node.id"
      :level="0"
      :node="node"
      @node-click="handleNodeClick"
      @node-toggle="handleNodeToggle"
    />
  </div>
</template>

<script lang="ts" setup>
import { QTreeNode } from '@/components/layout/TreeNode';

import { useTree } from './composable';
import type { TreeEmits, TreeProps } from './type';

defineOptions({
  name: 'QTree',
});

const props = defineProps<TreeProps>();
const emit = defineEmits<TreeEmits>();

const { handleNodeClick, handleNodeToggle } = useTree(props, emit);
</script>

<style scoped></style>
