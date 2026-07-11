import { ref, watch, type Ref } from 'vue';
import type { SearchProps, SearchEmits } from './type';

/**
 * Search 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns 搜索值绑定和事件处理
 */
export const useSearch = (
  props: SearchProps,
  emit: SearchEmits,
): {
  searchValue: Ref<string>;
  keyDownhandler: (e: KeyboardEvent) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleSearchClick: () => void;
} => {
  /** 搜索输入值 */
  const searchValue = ref(props.modelValue || '');

  /** 键盘事件处理 */
  const keyDownhandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      emit('search', searchValue.value);
    } else {
      emit('change', searchValue.value);
    }
  };

  /** 聚焦事件 */
  const handleFocus = () => {
    emit('focus');
  };

  /** 失焦事件 */
  const handleBlur = () => {
    emit('blur');
  };

  /** 点击搜索图标 */
  const handleSearchClick = () => {
    emit('search', searchValue.value);
  };

  // 双向同步
  watch(
    () => searchValue.value,
    (newValue) => {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    },
  );

  return {
    searchValue,
    keyDownhandler,
    handleFocus,
    handleBlur,
    handleSearchClick,
  };
};
