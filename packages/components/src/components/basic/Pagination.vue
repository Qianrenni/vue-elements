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
      <button @click="goToPage(<number>jumpPage)" class="button">
        <span class="text-one-line">跳转</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { QIcon } from '@/components/basic/Icon';

// 定义Props接口
interface PaginationProps {
  // 当前页码
  currentPage: number;
  // 总页数
  totalPages: number;
}

defineOptions({
  name: 'Pagination',
});
// 使用defineProps和withDefaults定义props
const props = defineProps<PaginationProps>();

// 使用defineEmits定义事件
const emit = defineEmits<{
  (e: 'change', page: number): void;
  (e: 'update:currentPage', value: number): void;
}>();

// 使用ref创建响应式变量jumpPage
const jumpPage = ref<number | string>(props.currentPage);

// 使用watch监听currentPage变化
watch(
  () => props.currentPage,
  (newVal) => {
    jumpPage.value = newVal;
  },
);

// 实现goToPage方法
const goToPage = (page: number) => {
  // 验证页码是否有效
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return;
  }
  // 更新jumpPage
  jumpPage.value = page;

  // 触发页码变化事件
  emit('change', page);
  emit('update:currentPage', page);
};
</script>

<style scoped></style>
