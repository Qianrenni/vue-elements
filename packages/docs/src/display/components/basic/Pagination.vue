<script lang="ts" setup>
import { QPagination } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayBasicPagination',
});

const currentPage = ref(1);
const totalPages = 20;

const handleChange = (page: number) => {
  currentPage.value = page;
};

const code = `
\`\`\`html
<template>
  <QPagination
    :current-page="currentPage"
    :total-pages="20"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';
const currentPage = ref(1);
const handleChange = (page) => {
  currentPage.value = page;
};
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4">
      <QPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handleChange"
      />
      <p class="text-center">当前页：{{ currentPage }}</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.text-center {
  text-align: center;
}
</style>
