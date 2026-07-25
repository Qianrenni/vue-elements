import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

import { useSearch } from '../composable';
import type { SearchEmits, SearchProps } from '../type';

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param modelValue 初始搜索值
 * @returns props 与 emit 模拟函数
 */
const createSearch = (
  modelValue = '',
): { props: SearchProps; emit: ReturnType<typeof vi.fn> } => {
  const props: SearchProps = { modelValue };
  return { props, emit: vi.fn() };
};

describe('useSearch', () => {
  it('应该以 modelValue 初始化搜索值', () => {
    const { props, emit } = createSearch('vue');
    const { searchValue } = useSearch(props, emit as SearchEmits);

    expect(searchValue.value).toBe('vue');
  });

  it('应该在按下 Enter 键时触发 search 事件', () => {
    const { props, emit } = createSearch('keyword');
    const { keyDownhandler } = useSearch(props, emit as SearchEmits);

    keyDownhandler({ key: 'Enter' } as KeyboardEvent);

    expect(emit).toHaveBeenCalledWith('search', 'keyword');
  });

  it('应该在按下非 Enter 键时触发 change 事件', () => {
    const { props, emit } = createSearch('keyword');
    const { keyDownhandler } = useSearch(props, emit as SearchEmits);

    keyDownhandler({ key: 'a' } as KeyboardEvent);

    expect(emit).toHaveBeenCalledWith('change', 'keyword');
  });

  it('应该在点击搜索图标时触发 search 事件', () => {
    const { props, emit } = createSearch('icon-click');
    const { handleSearchClick } = useSearch(props, emit as SearchEmits);

    handleSearchClick();

    expect(emit).toHaveBeenCalledWith('search', 'icon-click');
  });

  it('应该在聚焦与失焦时触发对应事件', () => {
    const { props, emit } = createSearch();
    const { handleFocus, handleBlur } = useSearch(props, emit as SearchEmits);

    handleFocus();
    handleBlur();

    expect(emit).toHaveBeenCalledWith('focus');
    expect(emit).toHaveBeenCalledWith('blur');
  });

  it('应该在搜索值变化时同步触发 update:modelValue 与 change 事件', async () => {
    const { props, emit } = createSearch();
    const { searchValue } = useSearch(props, emit as SearchEmits);

    searchValue.value = 'new value';
    await nextTick();

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'new value');
    expect(emit).toHaveBeenCalledWith('change', 'new value');
  });
});
