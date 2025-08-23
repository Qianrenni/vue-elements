<template>
  <div class="tree-test container-column padding-rem">
    <theme-toggle size="32"/>
    <h2 class="text-title margin-half-vetical">Tree 树形控件</h2>
    <p class="text-description margin-half-vetical">
      展示层级数据的树形控件，支持展开/收起、选中等交互操作。
    </p>

    <div class="container margin-vetical">
      <Tree
          ref="treeRef"
          :data="treeData"
          @nodeClick="node => console.log(node)"
      />
    </div>

    <div class="container-column margin-vetical">
      <h3 class="text-title margin-half-vetical">功能说明</h3>
      <ul class="padding-half-rem">
        <li class="margin-half-vetical">点击箭头图标可以展开/收起节点</li>
        <li class="margin-half-vetical">点击节点文本可以选择/取消选择节点</li>
        <li class="margin-half-vetical">选中的节点会高亮显示</li>
        <li class="margin-half-vetical">支持多级嵌套结构</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import Tree from "@/components/layout/Tree.vue";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";

interface TreeNodeData {
  id: string | number
  label: string
  children?: TreeNodeData[]
  expanded?: boolean
  selected?: boolean
  disabled?: boolean
}

const treeData: TreeNodeData[] = [
  {
    id: 1,
    label: '根节点 1',
    expanded: true,
    children: [
      {
        id: 2,
        label: '子节点 1-1',
        children: [
          {
            id: 3,
            label: '子节点 1-1-1'
          },
          {
            id: 4,
            label: '子节点 1-1-2',
            disabled: true
          }
        ]
      },
      {
        id: 5,
        label: '子节点 1-2'
      }
    ]
  },
  {
    id: 6,
    label: '根节点 2',
    children: [
      {
        id: 7,
        label: '子节点 2-1'
      },
      {
        id: 8,
        label: '子节点 2-2',
        expanded: true,
        children: [
          {
            id: 9,
            label: '子节点 2-2-1'
          },
          {
            id: 10,
            label: '子节点 2-2-2'
          }
        ]
      }
    ]
  },
  {
    id: 11,
    label: '根节点 3 (无子节点)'
  }
]

const treeRef = ref<InstanceType<typeof Tree> | null>(null)
</script>

<style scoped>
.test {
  width: 100%;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: var(--half-distance);
}
</style>