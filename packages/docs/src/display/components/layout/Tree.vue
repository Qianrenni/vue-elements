<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTree } from 'qyani-components';
import type { TreeNodeData } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutTree' });

const clickedLabel = ref('未选择');

const treeData = ref<TreeNodeData[]>([
  {
    id: '1',
    label: '根节点',
    expanded: true,
    children: [
      {
        id: '1-1',
        label: '子节点 1',
        expanded: true,
        children: [
          { id: '1-1-1', label: '叶子节点 1' },
          { id: '1-1-2', label: '叶子节点 2' },
        ],
      },
      { id: '1-2', label: '子节点 2' },
      { id: '1-3', label: '禁用节点', disabled: true },
    ],
  },
]);

const handleNodeClick = (node: TreeNodeData) => {
  clickedLabel.value = node.label;
};

const code = `
\`\`\`html
<template>
  <QTree :data="treeData" @node-click="handleNodeClick" />
</template>

<script setup>
import { ref } from 'vue';
import type { TreeNodeData } from 'qyani-components';

const treeData = ref<TreeNodeData[]>([
  {
    id: '1',
    label: '根节点',
    expanded: true,
    children: [
      { id: '1-1', label: '子节点 1' },
      { id: '1-2', label: '子节点 2' },
    ],
  },
]);

const handleNodeClick = (node) => console.log(node.label);
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <p class="clicked-label">选中节点：{{ clickedLabel }}</p>
      <div class="tree-box">
        <QTree :data="treeData" @node-click="handleNodeClick" />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
.clicked-label {
  margin: 0;
  color: #666;
}
.tree-box {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 6px;
}
</style>
