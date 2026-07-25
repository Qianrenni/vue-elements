// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QFormTextarea from '../FormTextarea.vue';

describe('QFormTextarea 渲染', () => {
  it('应渲染 textarea 元素', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: 'hello' },
    });
    const ta = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(ta).toBeTruthy();
    expect(ta.value).toBe('hello');
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormTextarea, {
      props: { modelValue: '', label: '描述' },
    });
    expect(getByText('描述')).toBeTruthy();
  });

  it('placeholder 应反映到 textarea', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', placeholder: '请输入' },
    });
    expect(
      (container.querySelector('textarea') as HTMLTextAreaElement).placeholder,
    ).toBe('请输入');
  });

  it('rows 应反映到 textarea rows 属性', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', rows: 8 },
    });
    expect(
      (container.querySelector('textarea') as HTMLTextAreaElement).rows,
    ).toBe(8);
  });

  it('resizable=false 时 resize 样式应为 none', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', resizable: false },
    });
    expect(
      (container.querySelector('textarea') as HTMLTextAreaElement).style.resize,
    ).toBe('none');
  });

  it('resizable=true 时 resize 样式应为 both', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', resizable: true },
    });
    expect(
      (container.querySelector('textarea') as HTMLTextAreaElement).style.resize,
    ).toBe('both');
  });

  it('disabled=true 应禁用 textarea', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', disabled: true },
    });
    expect(
      (container.querySelector('textarea') as HTMLTextAreaElement).disabled,
    ).toBe(true);
  });

  it('required=true 时 label 应含 required 类', () => {
    const { container } = render(QFormTextarea, {
      props: { modelValue: '', label: '必填', required: true },
    });
    expect(container.querySelector('.text-label.required')).toBeTruthy();
  });

  it('输入应触发 update:modelValue 事件', async () => {
    const { container, emitted } = render(QFormTextarea, {
      props: { modelValue: '' },
    });
    const ta = container.querySelector('textarea') as HTMLTextAreaElement;
    ta.value = 'abc';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['abc']);
  });
});
