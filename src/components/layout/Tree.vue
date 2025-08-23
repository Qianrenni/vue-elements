<template>
  <div class="tree-container">
    <TreeNode
        v-for="node in treeData"
        :key="node.id"
        :level="0"
        :node="node"
        @node-click="handleNodeClick"
        @node-toggle="handleNodeToggle"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import TreeNode from "@/components/layout/TreeNode.vue";
import {TreeNodeData} from "@/types";

defineOptions({
  name: 'Tree'
})


const props = defineProps<{
  data: TreeNodeData[]
}>()
const emit = defineEmits<{
  (event: 'node-click', node: TreeNodeData): void
}>()
const treeData = ref<TreeNodeData[]>(props.data)

const handleNodeClick = (node: TreeNodeData) => {
  // 选择节点逻辑
  treeData.value.forEach(n => traverseAndSelect(n, node.id))
}

const handleNodeToggle = (node: TreeNodeData) => {
  // 展开/收起节点逻辑
  node.expanded = !node.expanded
}

const traverseAndSelect = (currentNode: TreeNodeData, targetId: string | number) => {
  if (currentNode.id === targetId) {
    currentNode.selected = true;
    emit('node-click', currentNode)
  } else {
    currentNode.selected = false
  }

  if (currentNode.children) {
    for (const child of currentNode.children) {
      traverseAndSelect(child, targetId);
    }
  }
}
</script>

<style scoped>

</style>