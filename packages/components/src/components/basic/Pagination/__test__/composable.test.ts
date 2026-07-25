import { describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

import { usePagination } from '../composable';
import type { PaginationEmits, PaginationProps } from '../type';

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param currentPage 初始当前页码
 * @param totalPages 总页数
 * @returns props 响应式 Props、emit 模拟函数
 */
const createPagination = (
  currentPage: number,
  totalPages: number,
): { props: PaginationProps; emit: ReturnType<typeof vi.fn> } => {
  // 使用 reactive 模拟组件运行时的响应式 Props
  const props = reactive<PaginationProps>({ currentPage, totalPages });
  const emit = vi.fn();
  return { props, emit };
};

describe('usePagination', () => {
  it('应该以当前页码初始化跳转输入框绑定值', () => {
    const { props, emit } = createPagination(3, 10);
    const { jumpPage } = usePagination(props, emit as PaginationEmits);

    expect(jumpPage.value).toBe(3);
  });

  it('应该在跳转到合法页码时触发 change 与 update:currentPage 事件', () => {
    const { props, emit } = createPagination(1, 10);
    const { jumpPage, goToPage } = usePagination(
      props,
      emit as PaginationEmits,
    );

    goToPage(5);

    expect(jumpPage.value).toBe(5);
    expect(emit).toHaveBeenCalledTimes(2);
    expect(emit).toHaveBeenNthCalledWith(1, 'change', 5);
    expect(emit).toHaveBeenNthCalledWith(2, 'update:currentPage', 5);
  });

  it('应该忽略小于 1 的页码', () => {
    const { props, emit } = createPagination(2, 10);
    const { jumpPage, goToPage } = usePagination(
      props,
      emit as PaginationEmits,
    );

    goToPage(0);
    goToPage(-1);

    expect(jumpPage.value).toBe(2);
    expect(emit).not.toHaveBeenCalled();
  });

  it('应该忽略超过总页数的页码', () => {
    const { props, emit } = createPagination(2, 10);
    const { jumpPage, goToPage } = usePagination(
      props,
      emit as PaginationEmits,
    );

    goToPage(11);

    expect(jumpPage.value).toBe(2);
    expect(emit).not.toHaveBeenCalled();
  });

  it('应该忽略与当前页相同的页码', () => {
    const { props, emit } = createPagination(4, 10);
    const { goToPage } = usePagination(props, emit as PaginationEmits);

    goToPage(4);

    expect(emit).not.toHaveBeenCalled();
  });

  it('应该允许跳转到边界页码（首页与末页）', () => {
    const { props, emit } = createPagination(5, 10);
    const { goToPage } = usePagination(props, emit as PaginationEmits);

    goToPage(1);
    expect(emit).toHaveBeenNthCalledWith(1, 'change', 1);

    goToPage(10);
    expect(emit).toHaveBeenNthCalledWith(3, 'change', 10);
  });

  it('应该在外部 currentPage 变化时同步跳转输入框绑定值', async () => {
    const { props, emit } = createPagination(1, 10);
    const { jumpPage } = usePagination(props, emit as PaginationEmits);

    // 模拟父组件通过 v-model:currentPage 更新页码
    props.currentPage = 7;
    await nextTick();

    expect(jumpPage.value).toBe(7);
  });

  it('应该在多次跳转时保持事件参数正确', () => {
    const { props, emit } = createPagination(1, 20);
    const { goToPage } = usePagination(props, emit as PaginationEmits);

    goToPage(3);
    goToPage(8);

    expect(emit).toHaveBeenCalledTimes(4);
    expect(emit).toHaveBeenNthCalledWith(3, 'change', 8);
    expect(emit).toHaveBeenNthCalledWith(4, 'update:currentPage', 8);
  });
});
