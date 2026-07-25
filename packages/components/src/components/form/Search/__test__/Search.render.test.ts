// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QSearch from '../Search.vue';

describe('QSearch 渲染', () => {
  it('应渲染 search input', () => {
    const { container } = render(QSearch, { props: { modelValue: '' } });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.type).toBe('search');
  });

  it('placeholder 应反映到 input', () => {
    const { container } = render(QSearch, {
      props: { modelValue: '', placeholder: '搜索...' },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).placeholder,
    ).toBe('搜索...');
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QSearch, {
      props: { modelValue: '', disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it('输入应触发 update:modelValue', async () => {
    const { container, emitted } = render(QSearch, {
      props: { modelValue: '' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = 'kw';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
  });

  it('按 Enter 应触发 search 事件', async () => {
    const { container, emitted } = render(QSearch, {
      props: { modelValue: 'hello' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }),
    );
    await nextTick();
    expect(emitted('search')).toBeTruthy();
    expect(emitted('search')![0]).toEqual(['hello']);
  });
});
