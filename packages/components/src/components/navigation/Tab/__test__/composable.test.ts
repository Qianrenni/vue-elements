import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

import { useTab } from '../composable';
import type { TabEmits } from '../type';

describe('useTab', () => {
  it('应该在列表非空时默认激活第一项', () => {
    const props = reactive({ list: ['标签一', '标签二'] });
    const { activeCategory } = useTab(props, vi.fn() as TabEmits);

    expect(activeCategory.value).toBe(0);
  });

  it('应该在列表为空时无激活项', () => {
    const props = reactive({ list: [] as string[] });
    const { activeCategory } = useTab(props, vi.fn() as TabEmits);

    expect(activeCategory.value).toBeNull();
  });

  it('应该在点击时更新激活项并触发 select 事件', () => {
    const props = reactive({ list: ['标签一', '标签二'] });
    const emit = vi.fn();
    const { activeCategory, clickHandler } = useTab(props, emit as TabEmits);

    clickHandler(1);

    expect(activeCategory.value).toBe(1);
    expect(emit).toHaveBeenCalledWith('select', 1);
  });
});
