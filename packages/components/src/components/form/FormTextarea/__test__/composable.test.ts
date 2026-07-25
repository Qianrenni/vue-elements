import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormTextarea } from '../composable';
import type { FormTextareaProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的输入事件
 * @param value 文本域的值
 * @returns 模拟的 Event 对象
 */
const createInputEvent = (value: string): Event =>
  ({ target: { value } }) as unknown as Event;

describe('useFormTextarea', () => {
  it('应该在输入时触发 update:modelValue 与 input 事件', () => {
    const props: FormTextareaProps = { modelValue: '' };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onInput } = useFormTextarea(props, emit);

    onInput(createInputEvent('多行文本内容'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', '多行文本内容');
    expect(emit).toHaveBeenCalledWith('input', '多行文本内容');
  });

  it('应该在清空时触发 update:modelValue 为空字符串', () => {
    const props: FormTextareaProps = { modelValue: '原有内容' };
    const emit = vi.fn() as FormComponentEmits<string>;
    const { onInput } = useFormTextarea(props, emit);

    onInput(createInputEvent(''));

    expect(emit).toHaveBeenCalledWith('update:modelValue', '');
  });
});
