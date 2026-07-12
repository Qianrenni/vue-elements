<template>
  <div class="tree-node">
    <div
      :class="{
        'tree-node-selected': node.selected,
        'mouse-cursor-disable': node.disabled,
      }"
      class="tree-node-content container-align-center mouse-cursor"
      @click="handleNodeClick"
    >
      <div
        v-if="hasChildren"
        class="tree-node-toggle container-align-center mouse-cursor"
      >
        <QIcon icon="Folder" size="16" />
      </div>
      <div v-else class="tree-node-toggle container-align-center mouse-cursor">
        <QIcon icon="File" size="16" />
      </div>
      <div class="tree-node-label container-align-center">
        {{ node.label }}
      </div>
    </div>

    <div
      v-if="node.expanded && hasChildren"
      class="tree-node-children padding-half-horizontal"
    >
      <QTreeNode
        v-for="child in node.children"
        :key="child.id"
        :level="level + 1"
        :node="child"
        @node-click="handleChildNodeClick"
        @node-toggle="handleChildNodeToggle"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import type { TreeNodeProps, TreeNodeEmits } from './type';
import { useTreeNode } from './composable';

defineOptions({
  name: 'QTreeNode',
});

const props = defineProps<TreeNodeProps>();
const emit = defineEmits<TreeNodeEmits>();

const {
  hasChildren,
  handleNodeClick,
  handleChildNodeClick,
  handleChildNodeToggle,
} = useTreeNode(props, emit);
</script>

<style scoped>
.tree-node {
  width: 100%;
}

.tree-node-content {
  padding: var(--fourth-distance);
  border-radius: 0.33rem;
  transition: background-color 0.2s;
}

.tree-node-content:hover:not(.mouse-cursor-disable) {
  background-color: var(--secondary-background-color);
}

.tree-node-selected {
  background-color: var(--secondary-background-color);
}

.tree-node-toggle {
  margin-right: var(--fourth-distance);
}

.tree-node-label {
  flex: 1;
}

.tree-node-children {
  margin-left: 0.75rem;
  border-left: 1px dashed var(--border-color);
}
</style>
