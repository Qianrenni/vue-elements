<template>
  <div class="tree-node">
    <div
      :aria-expanded="hasChildren ? node.expanded : undefined"
      :aria-level="level + 1"
      :aria-selected="node.selected"
      :class="{
        'tree-node-selected': node.selected,
        'mouse-cursor-disable': node.disabled,
      }"
      :tabindex="node.disabled ? -1 : 0"
      class="tree-node-content container-align-center mouse-cursor"
      role="treeitem"
      @click="handleNodeClick"
      @keydown.enter.prevent="handleNodeClick"
      @keydown.space.prevent="handleNodeClick"
    >
      <div
        v-show="hasChildren"
        aria-hidden="true"
        class="tree-node-toggle container-align-center mouse-cursor"
      >
        <QIcon icon="Folder" size="16" />
      </div>
      <div
        v-show="!hasChildren"
        aria-hidden="true"
        class="tree-node-toggle container-align-center mouse-cursor"
      >
        <QIcon icon="File" size="16" />
      </div>
      <div class="tree-node-label container-align-center">
        {{ node.label }}
      </div>
    </div>

    <div
      v-show="node.expanded && hasChildren"
      role="group"
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

import { useTreeNode } from './composable';
import type { TreeNodeEmits, TreeNodeProps } from './type';

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
