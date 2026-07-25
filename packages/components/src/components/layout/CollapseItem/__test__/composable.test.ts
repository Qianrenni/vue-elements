import { describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';

import type { CollapseContext } from '../../Collapse/type';
import { useCollapseItem } from '../composable';
import type { CollapseItemProps } from '../type';

const hoisted = vi.hoisted(() => ({
  injected: new Map<string, unknown>(),
}));

// 部分 mock vue，拦截 inject 以注入受控的 collapse 上下文
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    inject: <T>(key: string, defaultValue: T): T => {
      return (hoisted.injected.get(key) as T) ?? defaultValue;
    },
  };
});

/**
 * 创建测试用的 collapse 上下文并注入
 * @param activeNames 激活的面板名称列表
 * @returns 注入的上下文对象
 */
const injectContext = (activeNames: string[] = []): CollapseContext => {
  const context: CollapseContext = {
    activeNames: ref(activeNames),
    handleItemClick: vi.fn(),
  };
  hoisted.injected.set('collapse', context);
  return context;
};

describe('useCollapseItem', () => {
  it('应该在名称包含于激活列表时处于激活状态', () => {
    injectContext(['a', 'b']);
    const props = reactive<CollapseItemProps>({ name: 'a' });
    const { isActive } = useCollapseItem(props);

    expect(isActive.value).toBe(true);
  });

  it('应该在名称不在激活列表时处于非激活状态', () => {
    injectContext(['b']);
    const props = reactive<CollapseItemProps>({ name: 'a' });
    const { isActive } = useCollapseItem(props);

    expect(isActive.value).toBe(false);
  });

  it('应该在点击时调用上下文的 handleItemClick', () => {
    const context = injectContext();
    const props = reactive<CollapseItemProps>({ name: 'a' });
    const { handleClick } = useCollapseItem(props);

    handleClick();

    expect(context.handleItemClick).toHaveBeenCalledWith('a');
  });

  it('应该在禁用时忽略点击', () => {
    const context = injectContext();
    const props = reactive<CollapseItemProps>({ name: 'a', disabled: true });
    const { handleClick } = useCollapseItem(props);

    handleClick();

    expect(context.handleItemClick).not.toHaveBeenCalled();
  });

  it('应该在无上下文时使用兜底值且不报错', () => {
    hoisted.injected.clear();
    const props = reactive<CollapseItemProps>({ name: 'a' });
    const { isActive, handleClick } = useCollapseItem(props);

    expect(isActive.value).toBe(false);
    expect(() => handleClick()).not.toThrow();
  });
});
