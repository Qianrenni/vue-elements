<script lang="ts" setup>
import { QSearch } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplaySearch',
});

const searchValue = ref('');
const searchResult = ref('');

const handleSearch = (value: string) => {
  searchResult.value = `搜索: ${value}`;
};

const code = `
\`\`\`html
<template>
  <QSearch 
    v-model="searchValue"
    placeholder="请输入搜索内容"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';
const searchValue = ref('');
const handleSearch = (value) => {
  console.log('搜索:', value);
};
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QSearch
        v-model="searchValue"
        placeholder="请输入搜索内容"
        @search="handleSearch"
      />
      <p>{{ searchResult }}</p>
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
</style>
