import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormColorPicker } from '../composable';
import type { FormColorPickerProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的输入事件
 * @param value input 的值
 * @returns 模拟的 Event 对象
 */
const createInputEvent = (value: string): Event =>
  ({ target: { value } }) as unknown as Event;

describe('useFormColorPicker', () => {
  it('应该在颜色选择时触发 update:modelValue 与 input 事件', () => {
    const props: FormColorPickerProps = { modelValue: '#fff' };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onInput } = useFormColorPicker(props, emit);

    onInput(createInputEvent('#ff0000'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', '#ff0000');
    expect(emit).toHaveBeenCalledWith('input', '#ff0000');
  });
});
