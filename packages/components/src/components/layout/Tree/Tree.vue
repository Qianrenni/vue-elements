<template>
  <div>
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
import type { TreeProps, TreeEmits } from './type';
import { useTree } from './composable';

defineOptions({
  name: 'QTree',
});

const props = defineProps<TreeProps>();
const emit = defineEmits<TreeEmits>();

const { handleNodeClick, handleNodeToggle } = useTree(props, emit);
</script>

<style scoped></style>
