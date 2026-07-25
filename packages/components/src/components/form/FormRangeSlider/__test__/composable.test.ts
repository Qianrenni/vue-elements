import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormRangeSlider } from '../composable';
import type { FormRangeSliderProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的滑块输入事件
 * @param value 滑块数值
 * @returns 模拟的 Event 对象
 */
const createSliderEvent = (value: number): Event =>
  ({ target: { valueAsNumber: value } }) as unknown as Event;

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需覆盖的 Props 字段
 * @returns props 与 emit 模拟函数
 */
const createRangeSlider = (
  overrides: Partial<FormRangeSliderProps> = {},
): { props: FormRangeSliderProps; emit: ReturnType<typeof vi.fn> } => {
  const props: FormRangeSliderProps = {
    name: 'volume',
    modelValue: 30,
    formatter: (value: number) => `${value}%`,
    ...overrides,
  };
  return { props, emit: vi.fn() };
};

describe('useFormRangeSlider', () => {
  it('应该在未传 id 时基于 name 生成 label 与 output 的 ID', () => {
    const { props, emit } = createRangeSlider();
    const { labelId, outputId } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    expect(labelId.value).toBe('volume-label');
    expect(outputId.value).toBe('volume-output');
  });

  it('应该优先使用显式传入的 id 作为 labelId', () => {
    const { props, emit } = createRangeSlider({ id: 'custom-id' });
    const { labelId } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    expect(labelId.value).toBe('custom-id');
  });

  it('应该使用 formatter 格式化显示值', () => {
    const { props, emit } = createRangeSlider();
    const { displayValue } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    expect(displayValue.value).toBe('30%');
  });

  it('应该在 modelValue 为空时以 0 参与格式化', () => {
    const { props, emit } = createRangeSlider({ modelValue: null });
    const { displayValue } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    expect(displayValue.value).toBe('0%');
  });

  it('应该在输入时触发 update:modelValue 与 input 事件', () => {
    const { props, emit } = createRangeSlider();
    const { onInput } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    onInput(createSliderEvent(60));

    expect(emit).toHaveBeenCalledWith('update:modelValue', 60);
    expect(emit).toHaveBeenCalledWith('input', 60);
  });

  it('应该在变更时触发 update:modelValue 与 change 事件', () => {
    const { props, emit } = createRangeSlider();
    const { onChange } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    onChange(createSliderEvent(80));

    expect(emit).toHaveBeenCalledWith('update:modelValue', 80);
    expect(emit).toHaveBeenCalledWith('change', 80);
  });

  it('应该在聚焦与失焦时触发对应事件', () => {
    const { props, emit } = createRangeSlider();
    const { onFocus, onBlur } = useFormRangeSlider(
      props,
      emit as FormComponentEmits<number>,
    );

    onFocus();
    onBlur();

    expect(emit).toHaveBeenCalledWith('focus');
    expect(emit).toHaveBeenCalledWith('blur');
  });
});
