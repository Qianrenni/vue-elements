import { describe, expect, it } from 'vitest';

import { useInput } from '../composable';

describe('useInput', () => {
  it('value 缺省时 text 为空字符串', () => {
    const { text } = useInput({});

    expect(text.value).toBe('');
  });

  it('allowClear 且有内容时应展示清除按钮', () => {
    const { showClear } = useInput({ allowClear: true, value: 'abc' });

    expect(showClear.value).toBe(true);
  });

  it('allowClear 但内容为空时不展示清除按钮', () => {
    const { showClear } = useInput({ allowClear: true, value: '' });

    expect(showClear.value).toBe(false);
  });

  it('开启 showCount 且设置 maxLength 时输出 长度 / 上限', () => {
    const { countText } = useInput({
      showCount: true,
      maxLength: 8,
      value: 'abc',
    });

    expect(countText.value).toBe('3 / 8');
  });

  it('未开启 showCount 时统计文案为空', () => {
    const { countText } = useInput({ value: 'abc' });

    expect(countText.value).toBe('');
  });

  it('status 应生成对应状态类', () => {
    const { statusClass } = useInput({ status: 'warning' });

    expect(statusClass.value).toBe('q-input--warning');
  });

  it('size 应生成尺寸类，默认 middle', () => {
    expect(useInput({}).sizeClass.value).toBe('q-input--middle');
    expect(useInput({ size: 'large' }).sizeClass.value).toBe('q-input--large');
    expect(useInput({ size: 'small' }).sizeClass.value).toBe('q-input--small');
  });
});
