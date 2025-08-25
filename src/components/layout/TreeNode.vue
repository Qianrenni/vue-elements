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
        <span
            :class="{ 'rotate-90': node.expanded }"
            class="toggle-icon"
        >
          <Icon icon="Right" size="24"/>
        </span>
      </div>

      <div class="tree-node-label container-align-center">
        {{ node.label }}
      </div>
    </div>

    <div
        v-if="node.expanded && hasChildren"
        class="tree-node-children padding-half-horizontal"
    >
      <TreeNode
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
import {computed} from 'vue'
import Icon from "@/components/basic/Icon.vue";

defineOptions({
  name: 'TreeNode'
})

interface TreeNodeData {
  id: string | number
  label: string
  children?: TreeNodeData[]
  expanded?: boolean
  selected?: boolean
  disabled?: boolean
}

const props = defineProps<{
  node: TreeNodeData,
  level: number
}>()

const emit = defineEmits<{
  (e: 'node-click', node: TreeNodeData): void,
  (e: 'node-toggle', node: TreeNodeData): void
}>()

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const handleNodeClick = () => {
  if (props.node.disabled) return
  emit('node-click', props.node)
  if (hasChildren) {
    handleToggle()
  }
}

const handleToggle = () => {
  if (props.node.disabled) return
  emit('node-toggle', props.node)
}

const handleChildNodeClick = (node: TreeNodeData) => {
  emit('node-click', node)
}

const handleChildNodeToggle = (node: TreeNodeData) => {
  emit('node-toggle', node)
}
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
  transition: transform 0.2s;
}

.toggle-icon {
  transition: transform 0.2s;
}

.tree-node-label {
  flex: 1;
}

.tree-node-children {
  margin-left: var(--distance);
  border-left: 1px dashed var(--border-color);
}
</style>