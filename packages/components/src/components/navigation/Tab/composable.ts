import { ref } from 'vue';
import type { TabEmits } from './type';

/**
 * Tab 组合式函数
 *
 * 封装 Tab 标签页切换逻辑：激活项管理和点击处理。
 *
 * @param props - 组件 props
 * @param emit  - 组件 emits
 * @returns 响应式状态和操作方法
 */
export function useTab(
  props: {
    list: string[];
  },
  emit: TabEmits,
) {
  const activeCategory = ref<number | null>(props.list.length > 0 ? 0 : null);

  function clickHandler(index: number) {
    activeCategory.value = index;
    emit('select', index);
  }

  return {
    activeCategory,
    clickHandler,
  };
}
