import { computed, ref, watch } from 'vue';

import type { NavSectionEmits, NavSectionProps } from './type';

/**
 * NavSection 组合式函数
 *
 * 封装导航分层的核心逻辑：菜单栈管理、子层级导航、返回、选中标记。
 *
 * @param props - 组件 props
 * @param emit  - 组件 emits
 * @returns 响应式状态和操作方法
 */
export function useNavSection(
  props: {
    sections: NavSectionProps[];
    title: string;
  },
  emit: NavSectionEmits,
) {
  const stack = ref<NavSectionProps[]>([{ title: props.title, children: [] }]);
  const activeId = ref<string | number | null>(null);

  /** 监听 sections 变化，重新初始化栈 */
  watch(
    () => props.sections,
    (newSections) => {
      stack.value = [{ title: props.title, children: newSections }];
      activeId.value = null;
    },
    { immediate: true },
  );

  /** 当前层级的菜单项 */
  const currentSections = computed(() => {
    return stack.value.length
      ? stack.value[stack.value.length - 1].children
      : props.sections;
  });

  /** 当前层级标题 */
  const currentLevelTitle = computed(() => {
    if (stack.value.length <= 1) return props.title;
    return stack.value[stack.value.length - 1].title;
  });

  /** 进入子层级 */
  function enterSubLevel(section: NavSectionProps, index: number) {
    stack.value.push(section);
    activeId.value = index;
  }

  /** 返回上一层级 */
  function goBack() {
    if (stack.value.length > 1) {
      stack.value.pop();
    }
    if (stack.value.length === 1) {
      stack.value[0].children = props.sections;
    }
  }

  /** 标记当前选中项并触发 select 事件 */
  function markActive(section: NavSectionProps, index: number) {
    activeId.value = index;
    emit('select', section);
  }

  return {
    stack,
    activeId,
    currentSections,
    currentLevelTitle,
    enterSubLevel,
    goBack,
    markActive,
  };
}
