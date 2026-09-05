<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTable } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayTable',
});

// —— 基础 + 单元格插槽 ——
const basicCols = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 70 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'role', title: '角色', dataIndex: 'role', align: 'center' as const },
  { key: 'age', title: '年龄', dataIndex: 'age', align: 'right' as const },
];
const basicRows = ref([
  { id: 1, name: '张三', role: '前端', age: 25 },
  { id: 2, name: '李四', role: '后端', age: 30 },
  { id: 3, name: '王五', role: '设计', age: 22 },
]);

// —— 排序 + 筛选 + 分页 ——
const filterCols = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  {
    key: 'dept',
    title: '部门',
    dataIndex: 'dept',
    filters: [
      { text: '研发', value: '研发' },
      { text: '市场', value: '市场' },
    ],
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    sorter: true,
    align: 'right' as const,
  },
];
const pagedRows = ref([
  { id: 1, name: '张三', dept: '研发', age: 25 },
  { id: 2, name: '李四', dept: '市场', age: 30 },
  { id: 3, name: '王五', dept: '研发', age: 22 },
  { id: 4, name: '赵六', dept: '市场', age: 35 },
  { id: 5, name: '钱七', dept: '研发', age: 28 },
  { id: 6, name: '孙八', dept: '市场', age: 41 },
]);

// —— 行选择 ——
const selectCols = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 70 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    align: 'center' as const,
  },
];
const selectRows = ref([
  { id: 1, name: '张三', status: '在线' },
  { id: 2, name: '李四', status: '离线' },
  { id: 3, name: '王五', status: '忙碌' },
]);
const keys = ref<Array<string | number>>([1]);

// —— 展开：树形 + 行级渲染 ——
const treeCols = [
  { key: 'name', title: '名称', dataIndex: 'name' },
  { key: 'count', title: '人数', dataIndex: 'count', width: 120 },
];
const treeRows = ref([
  {
    id: 1,
    name: '产品中心',
    count: 12,
    children: [
      { id: 11, name: '需求组', count: 5 },
      { id: 12, name: '设计组', count: 7 },
    ],
  },
  { id: 2, name: '研发中心', count: 36 },
]);
const expandKeys = ref<Array<string | number>>([1]);

const renderCols = [
  { key: 'name', title: '项目', dataIndex: 'name' },
  { key: 'owner', title: '负责人', dataIndex: 'owner' },
];
const renderRows = ref([
  { id: 1, name: '官网改版', owner: '张三' },
  { id: 2, name: '组件库建设', owner: '李四' },
]);
const renderKeys = ref<Array<string | number>>([]);

const basicCode = `
\`\`\`html
<template>
  <QTable :data-source="rows" :columns="columns" row-key="id" />
</template>
<script setup>
const rows = [
  { id: 1, name: '张三', role: '前端', age: 25 },
  { id: 2, name: '李四', role: '后端', age: 30 },
  { id: 3, name: '王五', role: '设计', age: 22 },
];
const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 70 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'role', title: '角色', dataIndex: 'role', align: 'center' },
  { key: 'age', title: '年龄', dataIndex: 'age', align: 'right' },
];
<\\/script>
\`\`\`
`;

const combinedCode = `
\`\`\`html
<template>
  <QTable
    :data-source="rows"
    :columns="columns"
    row-key="id"
    :pagination="{ pageSize: 4, showTotal: true }"
  />
</template>
<script setup>
const columns = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  {
    key: 'dept', title: '部门', dataIndex: 'dept',
    filters: [{ text: '研发', value: '研发' }, { text: '市场', value: '市场' }],
  },
  { key: 'age', title: '年龄', dataIndex: 'age', sorter: true, align: 'right' },
];
const rows = [
  { id: 1, name: '张三', dept: '研发', age: 25 },
  { id: 2, name: '李四', dept: '市场', age: 30 },
  // ...
];
<\\/script>
\`\`\`
`;

const selectCode = `
\`\`\`html
<template>
  <QTable
    v-model:selected-row-keys="keys"
    :data-source="rows"
    :columns="columns"
    row-key="id"
    :row-selection="{
      type: 'checkbox',
      getCheckboxProps: (r) => (r.id === 3 ? { disabled: true } : undefined),
    }"
  />
</template>
<script setup>
const keys = ref([]);
const rows = [
  { id: 1, name: '张三', status: '在线' },
  { id: 2, name: '李四', status: '离线' },
  { id: 3, name: '王五', status: '忙碌' },
];
<\\/script>
\`\`\`
`;

const expandCode = `
\`\`\`html
<template>
  <!-- 树形：行含 children 自动出现展开列 -->
  <QTable row-key="id" :data-source="tree" :columns="cols"
    v-model:expanded-row-keys="keys" />
  <!-- 行级渲染：配合 #expandedRowRender 插槽 -->
  <QTable row-key="id" :data-source="rows" :columns="cols" :expandable="{}">
    <template #expandedRowRender="{ record }">
      项目详情：{{ record.name }} / {{ record.owner }}
    </template>
  </QTable>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="basicCode">
    <QTable
      :columns="basicCols"
      :data-source="basicRows"
      row-key="id"
      :pagination="false"
    >
      <template #role="{ record }">
        <span class="chip">{{ record.role }}</span>
      </template>
    </QTable>
  </DemoBlock>

  <DemoBlock :code="combinedCode">
    <QTable
      :columns="filterCols"
      :data-source="pagedRows"
      row-key="id"
      :pagination="{ pageSize: 4, showTotal: true }"
    />
    <p class="tip">
      点「年龄」列头箭头排序；点「部门」漏斗筛选；右下分页 + 每页条数。
    </p>
  </DemoBlock>

  <DemoBlock :code="selectCode">
    <QTable
      v-model:selected-row-keys="keys"
      :columns="selectCols"
      :data-source="selectRows"
      row-key="id"
      :row-selection="{
        type: 'checkbox',
        getCheckboxProps: (r) => (r.id === 3 ? { disabled: true } : undefined),
      }"
    />
    <p class="tip">选中 key：{{ keys.join(', ') }}（王五已禁用）</p>
  </DemoBlock>

  <DemoBlock :code="expandCode">
    <QTable
      v-model:expanded-row-keys="expandKeys"
      :columns="treeCols"
      :data-source="treeRows"
      row-key="id"
      :pagination="false"
    />
    <QTable
      v-model:expanded-row-keys="renderKeys"
      :columns="renderCols"
      :data-source="renderRows"
      row-key="id"
      :expandable="{ expandRowByClick: true }"
      :pagination="false"
    >
      <template #expandedRowRender="{ record }">
        <div class="panel">
          项目详情：{{ record.name }}，负责人 {{ record.owner }}，点整行可折叠。
        </div>
      </template>
    </QTable>
  </DemoBlock>
</template>

<style scoped>
.chip {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--q-color-primary-light);
  color: var(--q-color-primary);
  font-size: 12px;
}
.panel {
  padding: 4px 8px;
  color: var(--q-color-text-secondary);
  background: var(--q-color-bg);
  border-radius: 4px;
}
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.demo-block + .demo-block {
  margin-top: 8px;
}
</style>
