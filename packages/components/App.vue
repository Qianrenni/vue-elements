<template>
  <div>
    <QScrollNotice :width="300">
      <span
        >无限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚限滚动</span
      >
    </QScrollNotice>
  </div>
</template>
<script setup lang="ts">
import { QScrollNotice, QFormSelect, QFormText, QSearch } from '@/index';
import { ref } from 'vue';
const form = ref({
  select: 'option5',
  text: '',
});
</script>
