import { describe, expect, it } from 'vitest';

import { useTextArea } from '../composable';

describe('useTextArea', () => {
  it('value 缺省时 text 为空字符串', () => {
    const { text } = useTextArea({});

    expect(text.value).toBe('');
  });

  it('allowClear 且有内容时应展示清除按钮', () => {
    const { showClear } = useTextArea({ allowClear: true, value: 'abc' });

    expect(showClear.value).toBe(true);
  });

  it('allowClear 但内容为空时不展示清除按钮', () => {
    const { showClear } = useTextArea({ allowClear: true, value: '' });

    expect(showClear.value).toBe(false);
  });

  it('未开启 showCount 时统计文案为空', () => {
    const { countText } = useTextArea({ value: 'abc' });

    expect(countText.value).toBe('');
  });

  it('开启 showCount 且未设置 maxLength 时输出当前长度', () => {
    const { countText } = useTextArea({ showCount: true, value: 'abc' });

    expect(countText.value).toBe('3');
  });

  it('开启 showCount 且设置 maxLength 时输出 长度 / 上限', () => {
    const { countText } = useTextArea({
      showCount: true,
      maxLength: 10,
      value: 'abc',
    });

    expect(countText.value).toBe('3 / 10');
  });

  it('status 应生成对应状态类', () => {
    const { statusClass } = useTextArea({ status: 'error' });

    expect(statusClass.value).toBe('q-textarea--error');
  });

  it('未设置 status 时状态类为空', () => {
    const { statusClass } = useTextArea({});

    expect(statusClass.value).toBe('');
  });

  it('autoSize 为 true 时返回空配置对象', () => {
    const { autoSizeConfig } = useTextArea({ autoSize: true });

    expect(autoSizeConfig.value).toEqual({});
  });

  it('autoSize 为对象时透传 minRows / maxRows', () => {
    const { autoSizeConfig } = useTextArea({
      autoSize: { minRows: 2, maxRows: 6 },
    });

    expect(autoSizeConfig.value).toEqual({ minRows: 2, maxRows: 6 });
  });

  it('autoSize 为 false 时配置为 null', () => {
    const { autoSizeConfig } = useTextArea({ autoSize: false });

    expect(autoSizeConfig.value).toBeNull();
  });
});
