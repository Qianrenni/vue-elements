import { describe, expect, it } from 'vitest';

import { useQButton } from '../composable';
import type { QButtonProps } from '../type';

describe('useQButton', () => {
  it('默认应为 default 类型与 level3 档位', () => {
    const props: QButtonProps = {};
    const { type, size, level, buttonClass } = useQButton(props);

    expect(type.value).toBe('default');
    expect(size.value).toBe('middle');
    expect(level.value).toBe(3);
    expect(buttonClass.value['q-btn--default']).toBe(true);
    expect(buttonClass.value['q-btn--level-3']).toBe(true);
  });

  it('size 应兼容映射到 level（small→2 / middle→3 / large→4）', () => {
    const small = useQButton({ size: 'small' });
    expect(small.level.value).toBe(2);
    expect(small.buttonClass.value['q-btn--level-2']).toBe(true);

    const middle = useQButton({ size: 'middle' });
    expect(middle.level.value).toBe(3);

    const large = useQButton({ size: 'large' });
    expect(large.level.value).toBe(4);
    expect(large.buttonClass.value['q-btn--level-4']).toBe(true);
  });

  it('level 应生成对应修饰类并优先于 size', () => {
    const { level, buttonClass } = useQButton({ level: 6, size: 'small' });
    expect(level.value).toBe(6);
    expect(buttonClass.value['q-btn--level-6']).toBe(true);
    expect(buttonClass.value['q-btn--level-2']).toBeUndefined();

    const { buttonClass: primaryClass } = useQButton({ type: 'primary' });
    expect(primaryClass.value['q-btn--primary']).toBe(true);
    expect(primaryClass.value['q-btn--default']).toBeUndefined();
  });

  it('danger / ghost / block 应附加修饰类', () => {
    const props: QButtonProps = { danger: true, ghost: true, block: true };
    const { buttonClass } = useQButton(props);

    expect(buttonClass.value['q-btn--danger']).toBe(true);
    expect(buttonClass.value['q-btn--ghost']).toBe(true);
    expect(buttonClass.value['q-btn--block']).toBe(true);
  });

  it('disabled 与 loading 应进入禁用态', () => {
    const props: QButtonProps = { disabled: true };
    const disabled = useQButton(props);
    expect(disabled.disabledState.value).toBe(true);
    expect(disabled.isDisabled.value).toBe(true);

    const loading = useQButton({ loading: true });
    expect(loading.isLoading.value).toBe(true);
    expect(loading.isDisabled.value).toBe(true);
    expect(loading.buttonClass.value['q-btn--loading']).toBe(true);
  });

  it('未禁用未加载时 isDisabled 应为 false', () => {
    const props: QButtonProps = { disabled: false };
    const { isDisabled } = useQButton(props);

    expect(isDisabled.value).toBe(false);
  });

  it('提供 href 时应渲染为 a，否则为 button', () => {
    const button = useQButton({});
    expect(button.tag.value).toBe('button');

    const link = useQButton({ href: 'https://example.com' });
    expect(link.tag.value).toBe('a');
  });
});
