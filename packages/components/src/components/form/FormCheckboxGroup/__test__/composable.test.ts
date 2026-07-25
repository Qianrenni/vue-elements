import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormCheckboxGroup } from '../composable';
import type { FormCheckboxGroupProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的复选框 change 事件
 * @param value 复选框的值
 * @param checked 是否勾选
 * @returns 模拟的 Event 对象
 */
const createChangeEvent = (value: string, checked: boolean): Event =>
  ({ target: { value, checked } }) as unknown as Event;

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param modelValue 初始选中值
 * @returns props 与 emit 模拟函数
 */
const createCheckboxGroup = (
  modelValue: string[] | null = [],
): { props: FormCheckboxGroupProps; emit: ReturnType<typeof vi.fn> } => {
  const props: FormCheckboxGroupProps = {
    modelValue,
    options: [
      { label: '苹果', value: 'apple' },
      { label: '香蕉', value: 'banana' },
    ],
  };
  return { props, emit: vi.fn() };
};

describe('useFormCheckboxGroup', () => {
  it('应该在勾选时追加值并触发 update:modelValue 与 input 事件', () => {
    const { props, emit } = createCheckboxGroup(['apple']);
    const { onChange } = useFormCheckboxGroup(
      props,
      emit as FormComponentEmits<string[]>,
    );

    onChange(createChangeEvent('banana', true));

    expect(emit).toHaveBeenCalledWith('update:modelValue', ['apple', 'banana']);
    expect(emit).toHaveBeenCalledWith('input', ['apple', 'banana']);
  });

  it('应该在取消勾选时移除对应值', () => {
    const { props, emit } = createCheckboxGroup(['apple', 'banana']);
    const { onChange } = useFormCheckboxGroup(
      props,
      emit as FormComponentEmits<string[]>,
    );

    onChange(createChangeEvent('apple', false));

    expect(emit).toHaveBeenCalledWith('update:modelValue', ['banana']);
  });

  it('应该在取消勾选不存在的值时保持原值不变', () => {
    const { props, emit } = createCheckboxGroup(['apple']);
    const { onChange } = useFormCheckboxGroup(
      props,
      emit as FormComponentEmits<string[]>,
    );

    onChange(createChangeEvent('orange', false));

    expect(emit).toHaveBeenCalledWith('update:modelValue', ['apple']);
  });

  it('应该在 modelValue 为空时从空数组开始追加', () => {
    const { props, emit } = createCheckboxGroup(null);
    const { onChange } = useFormCheckboxGroup(
      props,
      emit as FormComponentEmits<string[]>,
    );

    onChange(createChangeEvent('apple', true));

    expect(emit).toHaveBeenCalledWith('update:modelValue', ['apple']);
  });
});
