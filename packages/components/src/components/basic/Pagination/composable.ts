import { ref, watch, type Ref } from 'vue';
import type { PaginationProps, PaginationEmits } from './type';

/**
 * Pagination 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns jumpPage 跳转页码绑定值、goToPage 跳转方法
 */
export const usePagination = (
  props: PaginationProps,
  emit: PaginationEmits,
): {
  jumpPage: Ref<number | string>;
  goToPage: (page: number) => void;
} => {
  /** 跳转输入框绑定值 */
  const jumpPage = ref<number | string>(props.currentPage);

  /** 同步外部 currentPage 变化到输入框 */
  watch(
    () => props.currentPage,
    (newVal) => {
      jumpPage.value = newVal;
    },
  );

  /**
   * 跳转到指定页码
   * @param page 目标页码
   */
  const goToPage = (page: number): void => {
    if (page < 1 || page > props.totalPages || page === props.currentPage) {
      return;
    }
    jumpPage.value = page;
    emit('change', page);
    emit('update:currentPage', page);
  };

  return { jumpPage, goToPage };
};
