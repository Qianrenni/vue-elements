<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTreeNode } from 'qyani-components';
import type { TreeNodeData } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutTreeNode' });

const clickedLabel = ref('未选择');

const node = ref<TreeNodeData>({
  id: '1',
  label: '独立节点',
  expanded: true,
  children: [{ id: '1-1', label: '子节点' }],
});

const handleNodeClick = (node: TreeNodeData) => {
  clickedLabel.value = node.label;
};

const code = `
\`\`\`html
<template>
  <QTreeNode :node="node" :level="0" @node-click="handleNodeClick" />
</template>

<script setup>
import type { TreeNodeData } from 'qyani-components';

const node: TreeNodeData = {
  id: '1',
  label: '独立节点',
  expanded: true,
  children: [{ id: '1-1', label: '子节点' }],
};
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <p class="clicked-label">点击节点：{{ clickedLabel }}</p>
      <div class="tree-box">
        <QTreeNode :node="node" :level="0" @node-click="handleNodeClick" />
      </div>
      <p class="hint">
        TreeNode 通常由 QTree 自动渲染，也可单独使用以展示单节点。
      </p>
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
.hint {
  margin: 0;
  color: #999;
  font-size: 0.875rem;
}
.tree-box {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 6px;
}
</style>
