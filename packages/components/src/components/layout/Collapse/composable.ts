import { provide, ref, watch, type Ref } from 'vue';
import type { CollapseProps, CollapseEmits, CollapseContext } from './type';

/** 将 modelValue 规范化为 string[] */
const normalizeModelValue = (
  modelValue: string | string[] | undefined,
): string[] => {
  if (modelValue == null) return [];
  return Array.isArray(modelValue) ? [...modelValue] : [modelValue];
};

/**
 * Collapse 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns activeNames 当前激活的面板名称列表
 */
export const useCollapse = (
  props: CollapseProps,
  emit: CollapseEmits,
): {
  activeNames: Ref<string[]>;
} => {
  /** 内部激活状态 */
  const activeNames = ref<string[]>(normalizeModelValue(props.modelValue));

  /** 监听外部值变化 */
  watch(
    () => props.modelValue,
    (newVal) => {
      activeNames.value = normalizeModelValue(newVal);
    },
  );

  /**
   * 处理子项点击
   * @param name 点击的面板名称
   */
  const handleItemClick = (name: string): void => {
    if (props.accordion) {
      // 手风琴模式
      if (activeNames.value.includes(name)) {
        activeNames.value = [];
      } else {
        activeNames.value = [name];
      }
    } else {
      // 普通模式
      const index = activeNames.value.indexOf(name);
      if (index > -1) {
        activeNames.value.splice(index, 1);
      } else {
        activeNames.value.push(name);
      }
    }

    // 触发更新事件
    const value = props.accordion
      ? activeNames.value.length > 0
        ? activeNames.value[0]
        : ''
      : activeNames.value;
    emit('update:modelValue', value);
  };

  /** 向子组件提供状态和方法 */
  provide<CollapseContext>('collapse', {
    activeNames,
    handleItemClick,
  });

  return { activeNames };
};
