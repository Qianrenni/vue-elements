// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormText from '../FormText.vue';

describe('QFormText 渲染', () => {
  it('应渲染 input 元素且默认 type=text', () => {
    const { container } = render(QFormText, { props: { modelValue: 'x' } });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
    expect(input.value).toBe('x');
  });

  it('label 应渲染标题文本', () => {
    const { getByText } = render(QFormText, {
      props: { modelValue: '', label: '用户名' },
    });
    expect(getByText('用户名')).toBeTruthy();
  });

  it('placeholder 应反映到 input', () => {
    const { container } = render(QFormText, {
      props: { modelValue: '', placeholder: '请输入' },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).placeholder,
    ).toBe('请输入');
  });

  it('disabled=true 应禁用 input 并附加 uneditable 类', () => {
    const { container } = render(QFormText, {
      props: { modelValue: '', disabled: true },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.classList.contains('uneditable')).toBe(true);
  });

  it('type=password 应反映到 input type', () => {
    const { container } = render(QFormText, {
      props: { modelValue: 'secret', type: 'password' },
    });
    expect((container.querySelector('input') as HTMLInputElement).type).toBe(
      'password',
    );
  });

  it('direction=vertical 时容器应为 container-column', () => {
    const { container } = render(QFormText, {
      props: { modelValue: '', direction: 'vertical' },
    });
    expect(container.querySelector('.container-column')).toBeTruthy();
  });

  it('输入应触发 update:modelValue 事件', async () => {
    const { container, emitted } = render(QFormText, {
      props: { modelValue: '' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = 'abc';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['abc']);
  });
});
