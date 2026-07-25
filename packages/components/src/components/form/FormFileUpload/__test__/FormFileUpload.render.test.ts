// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormFileUpload from '../FormFileUpload.vue';

describe('QFormFileUpload 渲染', () => {
  it('应渲染 file input', () => {
    const { container } = render(QFormFileUpload);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('file');
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormFileUpload, {
      props: { label: '上传附件' },
    });
    expect(getByText('上传附件')).toBeTruthy();
  });

  it('accept 应反映到 input', () => {
    const { container } = render(QFormFileUpload, {
      props: { accept: 'image/*' },
    });
    expect((container.querySelector('input') as HTMLInputElement).accept).toBe(
      'image/*',
    );
  });

  it('multiple=true 应开启多选', () => {
    const { container } = render(QFormFileUpload, {
      props: { multiple: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).multiple,
    ).toBe(true);
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QFormFileUpload, {
      props: { disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it('required=true 时 label 应含 required 类', () => {
    const { container } = render(QFormFileUpload, {
      props: { label: '必传', required: true },
    });
    expect(container.querySelector('.text-label.required')).toBeTruthy();
  });

  it('选择文件应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormFileUpload);
    const input = container.querySelector('input') as HTMLInputElement;
    const file = new File(['x'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
  });
});
