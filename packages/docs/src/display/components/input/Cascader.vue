<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCascader } from 'qyani-components';
import type { CascaderOption } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputCascader' });

const value = ref<(string | number)[] | null>(null);
const value2 = ref<(string | number)[] | null>(null);

const options: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'yuhang', label: '余杭' },
        ],
      },
      { value: 'ningbo', label: '宁波' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
    ],
  },
];

// 懒加载示例
const lazyOptions = ref<CascaderOption[]>([
  { value: 'city', label: '城市（懒加载）', isLeaf: false },
]);
const lazyValue = ref<(string | number)[] | null>(null);
const loadData = async (sel: CascaderOption[]) => {
  const target = sel[sel.length - 1];
  if (target.value === 'city') {
    await new Promise((r) => setTimeout(r, 500));
    target.children = [
      { value: 'xihu', label: '西湖', isLeaf: true },
      { value: 'wulin', label: '武林', isLeaf: true },
      { value: 'binjiang', label: '滨江', isLeaf: true },
    ];
  }
};

const code = `
\`\`\`html
<QCascader v-model="value" :options="options" placeholder="请选择地址" />

<QCascader
  v-model="value2"
  :options="options"
  show-search
  change-on-select
  placeholder="可搜索 / 选中即触发"
/>

<QCascader v-model="lazyValue" :options="lazyOptions" :load-data="loadData" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-10 w-420">
      <QCascader v-model="value" :options="options" placeholder="请选择地址" />
      <QCascader
        v-model="value2"
        :options="options"
        show-search
        change-on-select
        placeholder="可搜索 / 选中即触发"
      />
      <QCascader
        v-model="lazyValue"
        :options="lazyOptions"
        :load-data="loadData"
        placeholder="点击后异步加载子级"
      />
      <div class="q-cas-note">已选路径：{{ value?.join(' / ') || '(空)' }}</div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-420 {
  width: 420px;
  max-width: 100%;
}
.q-cas-note {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
}
</style>
