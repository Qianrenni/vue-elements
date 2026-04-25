<!-- components/DemoBlock.vue -->
<template>
  <div class="demo-block">
    <div class="demo-header">
      <span class="title">{{ title }}</span>
      <QFormButton
        class="button-outline padding-24rem radius-half-rem"
        @click="copyCode"
        >复制源代码</QFormButton
      >
    </div>
    <div class="demo-example container-center">
      <slot />
    </div>
    <q-markdown-render :content="wrapCode" :show-copy="false" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { QMarkdownRender } from 'qyani-components';
const props = defineProps<{
  title?: string;
  code?: string;
}>();

const wrapCode = computed(() => {
  return props.code || ``;
});
const copyCode = () => {
  if (!props.code) return;
  navigator.clipboard.writeText(props.code);
};
</script>

<style scoped>
.demo-block {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.demo-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
