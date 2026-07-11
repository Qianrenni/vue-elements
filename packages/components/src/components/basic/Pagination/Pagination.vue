<!--
 * @component QPagination
 * @description 分页组件，提供上一页/下一页翻页和指定页码跳转功能
 -->
<template>
  <div class="container container-center container-wrap">
    <!-- 上一页按钮 -->
    <button
      :class="{ 'mouse-cursor-disable': currentPage === 1 }"
      :disabled="currentPage === 1"
      class="button"
      @click="goToPage(currentPage - 1)"
    >
      <span class="text-one-line hidden-768">上一页</span>
      <QIcon icon="Left" size="18" class="show-768" />
    </button>
    <!-- 页码列表 -->
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <!-- 下一页按钮 -->
    <button
      :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
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
import { PaginationProps, PaginationEmits } from './type';
import { usePagination } from './composable';

defineOptions({
  name: 'QPagination',
});

const props = defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

const { jumpPage, goToPage } = usePagination(props, emit);
</script>

<style scoped></style>
