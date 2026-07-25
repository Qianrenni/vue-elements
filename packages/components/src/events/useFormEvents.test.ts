import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormEvents } from './useFormEvents';

describe('useFormEvents', () => {
  it('应该在 handleInput 时触发 update:modelValue 与 input 事件', () => {
    const emit = vi.fn() as FormComponentEmits<string>;
    const { handleInput } = useFormEvents<string>(emit);

    handleInput('hello');

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'hello');
    expect(emit).toHaveBeenCalledWith('input', 'hello');
  });

  it('应该在 handleChange 时触发 update:modelValue 与 change 事件', () => {
    const emit = vi.fn() as FormComponentEmits<number>;
    const { handleChange } = useFormEvents<number>(emit);

    handleChange(42);

    expect(emit).toHaveBeenCalledWith('update:modelValue', 42);
    expect(emit).toHaveBeenCalledWith('change', 42);
  });

  it('应该在 handleFocus 时触发 focus 事件', () => {
    const emit = vi.fn() as FormComponentEmits<string>;
    const { handleFocus } = useFormEvents<string>(emit);

    handleFocus();

    expect(emit).toHaveBeenCalledWith('focus');
  });

  it('应该在 handleBlur 时触发 blur 事件', () => {
    const emit = vi.fn() as FormComponentEmits<string>;
    const { handleBlur } = useFormEvents<string>(emit);

    handleBlur();

    expect(emit).toHaveBeenCalledWith('blur');
  });

  it('应该在 handleClear 时触发 update:modelValue 与 clear 事件', () => {
    const emit = vi.fn() as FormComponentEmits<string>;
    const { handleClear } = useFormEvents<string>(emit);

    handleClear('');

    expect(emit).toHaveBeenCalledWith('update:modelValue', '');
    expect(emit).toHaveBeenCalledWith('clear');
  });
});
