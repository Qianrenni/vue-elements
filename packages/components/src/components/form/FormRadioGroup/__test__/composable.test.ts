import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormRadioGroup } from '../composable';
import type { FormRadioGroupProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的 change 事件
 * @param value 选中项的值
 * @returns 模拟的 Event 对象
 */
const createChangeEvent = (value: string): Event =>
  ({ target: { value } }) as unknown as Event;

describe('useFormRadioGroup', () => {
  it('应该在选项变更时触发 update:modelValue 与 input 事件', () => {
    const props: FormRadioGroupProps = {
      modelValue: '',
      options: [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b' },
      ],
    };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onChange } = useFormRadioGroup(props, emit);

    onChange(createChangeEvent('b'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'b');
    expect(emit).toHaveBeenCalledWith('input', 'b');
  });
});
