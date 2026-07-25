// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QMessage from '../Message.vue';

describe('QMessage 渲染', () => {
  it('应渲染 message 文本', () => {
    const { getByText } = render(QMessage, {
      props: { message: '操作成功', type: 'success' },
    });
    expect(getByText('操作成功')).toBeTruthy();
  });

  it('type=success 应附加 text-success 类', () => {
    const { container } = render(QMessage, {
      props: { message: 'x', type: 'success' },
    });
    expect(
      container.querySelector('.message-container.text-success'),
    ).toBeTruthy();
  });

  it('type=error 应附加 text-danger 类', () => {
    const { container } = render(QMessage, {
      props: { message: 'x', type: 'error' },
    });
    expect(
      container.querySelector('.message-container.text-danger'),
    ).toBeTruthy();
  });

  it('type=warning 应附加 text-warning 类', () => {
    const { container } = render(QMessage, {
      props: { message: 'x', type: 'warning' },
    });
    expect(
      container.querySelector('.message-container.text-warning'),
    ).toBeTruthy();
  });

  it('type=info 应附加 text-gray 类', () => {
    const { container } = render(QMessage, {
      props: { message: 'x', type: 'info' },
    });
    expect(
      container.querySelector('.message-container.text-gray'),
    ).toBeTruthy();
  });
});
