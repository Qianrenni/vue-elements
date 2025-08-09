<template>
  <div class="container container-align-center container-center gap">
    <!-- 首页按钮 -->
    <div
        :class="{ 'mouse-cursor-disable': currentPage === 1 }"
        class="pagination-item button-outline radius-third-rem padding-24rem mouse-cursor"
        @click="goToPage(1)"
    >
      首页
    </div>

    <!-- 上一页按钮 -->
    <div
        :class="{ 'mouse-cursor-disable': currentPage === 1 }"
        class="pagination-item button-outline radius-third-rem padding-24rem mouse-cursor"
        @click="goToPage(currentPage - 1)"
    >
      上一页
    </div>

    <!-- 页码列表 -->
    <div class="container container-align-center gap-half">
      <template v-for="(page, index) in displayedPages" :key="index">
        <div
            v-if="page !== '...'"
            :class="page === currentPage ? 'button-primary' : 'button-outline'"
            class="pagination-item radius-third-rem padding-24rem mouse-cursor"
            @click="goToPage(page)"
        >
          {{ page }}
        </div>
        <div v-else class="pagination-ellipsis">{{ page }}</div>
      </template>
    </div>

    <!-- 下一页按钮 -->
    <div
        :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
        class="pagination-item button-outline radius-third-rem padding-24rem mouse-cursor"
        @click="goToPage(currentPage + 1)"
    >
      下一页
    </div>

    <!-- 末页按钮 -->
    <div
        :class="{ 'mouse-cursor-disable': currentPage === totalPages }"
        class="pagination-item button-outline radius-third-rem padding-24rem mouse-cursor"
        @click="goToPage(totalPages)"
    >
      末页
    </div>

    <!-- 跳转到指定页 -->
    <div class="container container-align-center gap-half margin-half-horizontal">
      <span>跳至</span>
      <div class="form-text-container">
        <input
            v-model="jumpPage"
            :max="totalPages"
            class="pagination-input"
            min="1"
            type="number"
        />
      </div>
      <div
          class="pagination-item button-outline radius-third-rem padding-24rem mouse-cursor"
          @click="goToPage(jumpPage)"
      >
        跳转
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watch} from 'vue';

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
  name: 'Pagination'
});
// 使用defineProps和withDefaults定义props
const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisiblePages: 5
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
    return Array.from({length: props.totalPages}, (_, i) => i + 1);
  }

  // 计算显示的页码范围
  const halfVisible = Math.floor(props.maxVisiblePages / 2);
  let startPage = Math.max(props.currentPage - halfVisible, 1);
  let endPage = Math.min(startPage + props.maxVisiblePages - 1, props.totalPages);

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
    }
);

// 实现goToPage方法
const goToPage = (page: number) => {
  // 验证页码是否有效
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return;
  }
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

<style scoped>
/* 使用common.css中的样式，这里只添加特定于分页器的样式 */
.pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
}

.pagination-input {
  width: 3rem;
  text-align: center;
  height: 2rem;
}

/* 禁用状态的样式 */
.mouse-cursor-disable {
  opacity: 0.6;
  pointer-events: none;
}
</style>
