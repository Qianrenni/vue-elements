<template>
  <div class="container text-08rem container-wrap">
    <!-- 首页按钮 -->
    <FormButton
      :class="{ 'mouse-cursor-disable': currentPage === 1 }"
      @click="goToPage(1)"
    >
      <span class="text-one-line">首页</span>
    </FormButton>

    <!-- 上一页按钮 -->
    <FormButton
      :class="{ 'mouse-cursor-disable': currentPage === 1 }"
      @click="goToPage(currentPage - 1)"
    >
      <span class="text-one-line">上一页</span>
    </FormButton>

    <!-- 页码列表 -->
    <div class="container-center">
      <template v-for="(page, index) in displayedPages" :key="index">
        <FormButton
          v-if="page !== '...'"
          :class="page === currentPage ? 'button-primary' : 'button-outline'"
          @click="goToPage(<number>page)"
        >
          <span class="text-one-line">{{ page }}</span>
        </FormButton>
        <FormButton v-else>
          <span class="text-one-line">{{ page }}</span>
        </FormButton>
      </template>
    </div>

    <!-- 下一页按钮 -->
    <FormButton
      :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
      @click="goToPage(currentPage + 1)"
    >
      <span class="text-one-line">下一页</span>
    </FormButton>

    <!-- 末页按钮 -->
    <FormButton
      :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
      @click="goToPage(totalPages)"
    >
      <span class="text-one-line">末页</span>
    </FormButton>

    <!-- 跳转到指定页 -->
    <div class="container-center">
      <span class="text-one-line">跳至</span>
      <div>
        <input
          v-model="jumpPage"
          :max="totalPages"
          class="text-input"
          min="1"
          type="number"
        />
      </div>
      <FormButton @click="goToPage(<number>jumpPage)">
        <span class="text-one-line">跳转</span>
      </FormButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import FormButton from '../form/FormButton.vue';

// 定义Props接口
interface PaginationProps {
  // 当前页码
  currentPage: number;
  // 总页数
  totalPages: number;
  // 显示的页码数量
  maxVisiblePages?: number;
}

defineOptions({
  name: 'Pagination',
});
// 使用defineProps和withDefaults定义props
const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisiblePages: 5,
});

// 使用defineEmits定义事件
const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

// 使用ref创建响应式变量jumpPage
const jumpPage = ref<number | string>(props.currentPage);

// 使用computed实现displayedPages计算属性
const displayedPages = computed(() => {
  if (props.totalPages <= props.maxVisiblePages) {
    // 如果总页数小于等于最大可见页数，则显示所有页码
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  // 计算显示的页码范围
  const halfVisible = Math.floor(props.maxVisiblePages / 2);
  let startPage = Math.max(props.currentPage - halfVisible, 1);
  let endPage = Math.min(
    startPage + props.maxVisiblePages - 1,
    props.totalPages,
  );

  // 调整起始页，确保显示的页码数量正确
  if (endPage - startPage + 1 < props.maxVisiblePages) {
    startPage = Math.max(endPage - props.maxVisiblePages + 1, 1);
  }

  const pages: (number | string)[] = [];

  // 添加首页和省略号
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('...');
    }
  }

  // 添加中间页码
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 添加末页和省略号
  if (endPage < props.totalPages) {
    if (endPage < props.totalPages - 1) {
      pages.push('...');
    }
    pages.push(props.totalPages);
  }

  return pages;
});

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
};
</script>

<style scoped></style>
