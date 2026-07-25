import { describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

import { useCollapse } from '../composable';
import type { CollapseContext, CollapseEmits, CollapseProps } from '../type';

const hoisted = vi.hoisted(() => ({
  provided: new Map<string, unknown>(),
}));

// 部分 mock vue，拦截 provide 以捕获 Collapse 提供的上下文
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    provide: (key: string, value: unknown) => {
      hoisted.provided.set(key, value);
    },
  };
});

/**
 * 创建测试用的 Props 与 Emits 模拟对象，并捕获 provide 的上下文
 * @param overrides 需要覆盖的 Props 属性
 * @returns props、emit 模拟函数、activeNames 与捕获的上下文
 */
const createCollapse = (
  overrides: Partial<CollapseProps> = {},
): {
  props: CollapseProps;
  emit: ReturnType<typeof vi.fn>;
  activeNames: ReturnType<typeof useCollapse>['activeNames'];
  context: CollapseContext;
} => {
  const props = reactive<CollapseProps>({ ...overrides });
  const emit = vi.fn();
  const { activeNames } = useCollapse(props, emit as CollapseEmits);
  const context = hoisted.provided.get('collapse') as CollapseContext;
  return { props, emit, activeNames, context };
};

describe('useCollapse', () => {
  it('应该将字符串 modelValue 规范化为数组', () => {
    const { activeNames } = createCollapse({ modelValue: 'a' });

    expect(activeNames.value).toEqual(['a']);
  });

  it('应该在 modelValue 为空时初始化为空数组', () => {
    const { activeNames } = createCollapse();

    expect(activeNames.value).toEqual([]);
  });

  it('应该在外部 modelValue 变化时同步激活状态', async () => {
    const { props, activeNames } = createCollapse({ modelValue: ['a'] });

    props.modelValue = ['b', 'c'];
    await nextTick();

    expect(activeNames.value).toEqual(['b', 'c']);
  });

  it('应该向子组件提供 collapse 上下文', () => {
    const { context } = createCollapse();

    expect(context).toBeDefined();
    expect(typeof context.handleItemClick).toBe('function');
  });

  it('应该在普通模式下切换面板并触发数组形式的更新事件', () => {
    const { emit, activeNames, context } = createCollapse({
      modelValue: ['a'],
    });

    context.handleItemClick('b');
    expect(activeNames.value).toEqual(['a', 'b']);
    expect(emit).toHaveBeenCalledWith('update:modelValue', ['a', 'b']);

    context.handleItemClick('a');
    expect(activeNames.value).toEqual(['b']);
    expect(emit).toHaveBeenCalledWith('update:modelValue', ['b']);
  });

  it('应该在手风琴模式下互斥展开并触发字符串形式的更新事件', () => {
    const { emit, activeNames, context } = createCollapse({
      accordion: true,
      modelValue: 'a',
    });

    context.handleItemClick('b');
    expect(activeNames.value).toEqual(['b']);
    expect(emit).toHaveBeenCalledWith('update:modelValue', 'b');

    context.handleItemClick('b');
    expect(activeNames.value).toEqual([]);
    expect(emit).toHaveBeenCalledWith('update:modelValue', '');
  });
});
