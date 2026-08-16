<!--
 * @component QPagination
 * @description 分页组件，提供上一页/下一页翻页和指定页码跳转功能
 -->
<template>
  <div class="container container-center container-wrap">
    <!-- 上一页按钮 -->
    <button
      :aria-label="'上一页'"
      :class="{ 'mouse-cursor-disable': currentPage === 1 }"
      :disabled="currentPage === 1"
      title="上一页"
      class="button"
      @click="goToPage(currentPage - 1)"
    >
      <span class="text-one-line hidden-768">上一页</span>
      <QIcon icon="Left" size="18" class="show-768" />
    </button>
    <!-- 页码列表 -->
    <span
      role="status"
      :aria-label="`第 ${currentPage} 页，共 ${totalPages} 页`"
    >
      {{ currentPage }} / {{ totalPages }}
    </span>
    <!-- 下一页按钮 -->
    <button
      :aria-label="'下一页'"
      :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      title="下一页"
      @click="goToPage(currentPage + 1)"
      class="button"
    >
      <span class="text-one-line hidden-768">下一页</span>
      <QIcon icon="Right" size="18" class="show-768" />
    </button>
    <!-- 跳转到指定页 -->
    <div class="container-center">
      <input
        v-model="jumpPage"
        :max="totalPages"
        aria-label="跳转到指定页"
        class="text-input"
        min="1"
        type="number"
      />
      <button @click="goToPage(Number(jumpPage))" class="button">
        <span class="text-one-line">跳转</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';

import { usePagination } from './composable';
import { PaginationEmits, PaginationProps } from './type';

defineOptions({
  name: 'QPagination',
});

const props = defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

const { jumpPage, goToPage } = usePagination(props, emit);
</script>

<style scoped></style>
