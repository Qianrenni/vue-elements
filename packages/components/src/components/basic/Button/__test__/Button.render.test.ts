// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QButton from '../Button.vue';

describe('QButton 渲染', () => {
  it('应默认渲染为 button 且 type=button、附加 default/level3 类', () => {
    const { container } = render(QButton, { slots: { default: '按钮' } });
    const btn = container.querySelector('button.q-btn') as HTMLButtonElement;

    expect(btn).toBeTruthy();
    expect(btn.type).toBe('button');
    expect(btn.classList.contains('q-btn--default')).toBe(true);
    expect(btn.classList.contains('q-btn--level-3')).toBe(true);
  });

  it('size=large 应兼容映射到 level4 修饰类', () => {
    const { container } = render(QButton, {
      props: { type: 'primary', size: 'large' },
      slots: { default: '主按钮' },
    });
    const btn = container.querySelector('button.q-btn') as HTMLButtonElement;

    expect(btn.classList.contains('q-btn--primary')).toBe(true);
    expect(btn.classList.contains('q-btn--level-4')).toBe(true);
  });

  it('level=1 应附加 level1 修饰类', () => {
    const { container } = render(QButton, {
      props: { type: 'primary', level: 1 },
      slots: { default: '最小' },
    });
    const btn = container.querySelector('button.q-btn') as HTMLButtonElement;

    expect(btn.classList.contains('q-btn--level-1')).toBe(true);
    expect(btn.classList.contains('q-btn--level-3')).toBe(false);
  });

  it('htmlType=submit 应反映到 button type', () => {
    const { container } = render(QButton, {
      props: { htmlType: 'submit' },
      slots: { default: '提交' },
    });
    expect((container.querySelector('button') as HTMLButtonElement).type).toBe(
      'submit',
    );
  });

  it('disabled=true 应禁用按钮', () => {
    const { container } = render(QButton, {
      props: { disabled: true },
      slots: { default: '禁用' },
    });
    const btn = container.querySelector('button') as HTMLButtonElement;

    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('q-btn--disabled')).toBe(true);
  });

  it('loading=true 应禁用按钮并渲染加载指示器', () => {
    const { container } = render(QButton, {
      props: { loading: true },
      slots: { default: '加载' },
    });
    const btn = container.querySelector('button.q-btn') as HTMLButtonElement;

    expect(btn.disabled).toBe(true);
    expect(btn.querySelector('.q-btn-spinner')).toBeTruthy();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('提供 href 时应渲染为 a 链接', () => {
    const { container } = render(QButton, {
      props: { href: 'https://example.com', target: '_blank' },
      slots: { default: '链接' },
    });
    const link = container.querySelector('a.q-btn') as HTMLAnchorElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('danger 按钮应附加 danger 类', () => {
    const { container } = render(QButton, {
      props: { danger: true, type: 'primary' },
      slots: { default: '删除' },
    });
    expect(
      (container.querySelector('button') as HTMLElement).classList.contains(
        'q-btn--danger',
      ),
    ).toBe(true);
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QButton, { slots: { default: '确定' } });
    expect(getByText('确定')).toBeTruthy();
  });
});
