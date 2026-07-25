import { describe, expect, it } from 'vitest';

import { useFormButton } from '../composable';
import type { FormButtonProps } from '../type';

describe('useFormButton', () => {
  it('应该在禁用时添加 mouse-cursor-disable 类', () => {
    const props: FormButtonProps = { disabled: true };
    const { buttonClass } = useFormButton(props);

    expect(buttonClass.value['mouse-cursor-disable']).toBe(true);
  });

  it('应该在未禁用时移除 mouse-cursor-disable 类', () => {
    const props: FormButtonProps = { disabled: false };
    const { buttonClass } = useFormButton(props);

    expect(buttonClass.value['mouse-cursor-disable']).toBe(false);
  });

  it('应该在 size 为 large 时添加 text-12rem 类', () => {
    const props: FormButtonProps = { size: 'large' };
    const { buttonClass } = useFormButton(props);

    expect(buttonClass.value['text-12rem']).toBe(true);
  });

  it('应该在 size 为 small 时添加 text-08rem 类', () => {
    const props: FormButtonProps = { size: 'small' };
    const { buttonClass } = useFormButton(props);

    expect(buttonClass.value['text-08rem']).toBe(true);
  });

  it('应该在 size 为 middle 时不做特殊处理', () => {
    const props: FormButtonProps = { size: 'middle' };
    const { buttonClass } = useFormButton(props);

    expect(buttonClass.value['text-12rem']).toBe(false);
    expect(buttonClass.value['text-08rem']).toBe(false);
  });

  it('应该在禁用时返回禁用的 computed 值', () => {
    const props: FormButtonProps = { disabled: true };
    const { componentDisabled } = useFormButton(props);

    expect(componentDisabled.value).toBe(true);
  });
});
