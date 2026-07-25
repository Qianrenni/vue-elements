import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormText } from '../composable';
import type { FormTextProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建模拟的文本输入事件
 * @param value 输入框文本值
 * @returns 模拟的 Event 对象
 */
const createInputEvent = (value: string): Event =>
  ({ target: { value } }) as unknown as Event;

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需覆盖的 Props 字段
 * @returns props 与 emit 模拟函数
 */
const createFormText = (
  overrides: FormTextProps = {},
): { props: FormTextProps; emit: ReturnType<typeof vi.fn> } => {
  const props: FormTextProps = { modelValue: '', ...overrides };
  return { props, emit: vi.fn() };
};

describe('useFormText', () => {
  it('应该在输入时触发 update:modelValue 与 input 事件', () => {
    const { props, emit } = createFormText();
    const { onInput } = useFormText(props, emit as FormComponentEmits<string>);

    onInput(createInputEvent('hello'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'hello');
    expect(emit).toHaveBeenCalledWith('input', 'hello');
  });

  it('应该在变更时触发 update:modelValue 与 change 事件', () => {
    const { props, emit } = createFormText();
    const { onChange } = useFormText(props, emit as FormComponentEmits<string>);

    onChange(createInputEvent('world'));

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'world');
    expect(emit).toHaveBeenCalledWith('change', 'world');
  });

  it('应该在聚焦时隐藏校验提示并触发 focus 事件', () => {
    const { props, emit } = createFormText();
    const { showHint, onFocus } = useFormText(
      props,
      emit as FormComponentEmits<string>,
    );

    showHint.value = true;
    onFocus();

    expect(showHint.value).toBe(false);
    expect(emit).toHaveBeenCalledWith('focus');
  });

  it('应该在必填校验失败时显示提示', () => {
    const { props, emit } = createFormText({
      modelValue: '',
      required: true,
      validate: (value: string) => value.length > 0,
    });
    const { showHint, onBlur } = useFormText(
      props,
      emit as FormComponentEmits<string>,
    );

    onBlur();

    expect(showHint.value).toBe(true);
    expect(emit).toHaveBeenCalledWith('blur');
  });

  it('应该在校验通过时不显示提示', () => {
    const { props, emit } = createFormText({
      modelValue: 'filled',
      required: true,
      validate: (value: string) => value.length > 0,
    });
    const { showHint, onBlur } = useFormText(
      props,
      emit as FormComponentEmits<string>,
    );

    onBlur();

    expect(showHint.value).toBe(false);
  });

  it('应该在非必填时跳过校验', () => {
    const { props, emit } = createFormText({ modelValue: '' });
    const { showHint, onBlur } = useFormText(
      props,
      emit as FormComponentEmits<string>,
    );

    onBlur();

    expect(showHint.value).toBe(false);
  });
});
