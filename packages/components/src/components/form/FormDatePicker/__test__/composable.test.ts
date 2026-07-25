import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormDatePicker } from '../composable';
import type { FormDatePickerProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的输入事件
 * @param value input 的值
 * @returns 模拟的 Event 对象
 */
const createInputEvent = (value: string): Event =>
  ({ target: { value } }) as unknown as Event;

describe('useFormDatePicker', () => {
  it('应该在日期选择时触发 update:modelValue 与 input 事件', () => {
    const props: FormDatePickerProps = { modelValue: '' };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onInput } = useFormDatePicker(props, emit);

    onInput(createInputEvent('2024-01-15'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-01-15');
    expect(emit).toHaveBeenCalledWith('input', '2024-01-15');
  });

  it('应该正确处理空字符串输入', () => {
    const props: FormDatePickerProps = { modelValue: '2024-01-01' };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onInput } = useFormDatePicker(props, emit);

    onInput(createInputEvent(''));

    expect(emit).toHaveBeenCalledWith('update:modelValue', '');
  });
});
