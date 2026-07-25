// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormColorPicker from '../FormColorPicker.vue';

describe('QFormColorPicker 渲染', () => {
  it('应渲染 color input', () => {
    const { container } = render(QFormColorPicker, {
      props: { modelValue: '#ff0000' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('color');
    expect(input.value).toBe('#ff0000');
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormColorPicker, {
      props: { modelValue: '#fff', label: '颜色' },
    });
    expect(getByText('颜色')).toBeTruthy();
  });

  it('modelValue 应显示在 span 文本中', () => {
    const { getByText } = render(QFormColorPicker, {
      props: { modelValue: '#00ff00' },
    });
    expect(getByText('#00ff00')).toBeTruthy();
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QFormColorPicker, {
      props: { modelValue: '#fff', disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it('input 应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormColorPicker, {
      props: { modelValue: '#fff' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = '#000000';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['#000000']);
  });
});
