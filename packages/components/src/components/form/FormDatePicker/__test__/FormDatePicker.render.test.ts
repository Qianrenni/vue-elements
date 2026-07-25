// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormDatePicker from '../FormDatePicker.vue';

describe('QFormDatePicker 渲染', () => {
  it('应渲染 input 且默认 type=date', () => {
    const { container } = render(QFormDatePicker, {
      props: { modelValue: '2025-01-01' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('date');
    expect(input.value).toBe('2025-01-01');
  });

  it('type=time 应反映到 input', () => {
    const { container } = render(QFormDatePicker, {
      props: { modelValue: '12:30', type: 'time' },
    });
    expect((container.querySelector('input') as HTMLInputElement).type).toBe(
      'time',
    );
  });

  it('type=datetime-local 应反映到 input', () => {
    const { container } = render(QFormDatePicker, {
      props: { modelValue: '2025-01-01T12:30', type: 'datetime-local' },
    });
    expect((container.querySelector('input') as HTMLInputElement).type).toBe(
      'datetime-local',
    );
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormDatePicker, {
      props: { modelValue: '', label: '生日' },
    });
    expect(getByText('生日:')).toBeTruthy();
  });

  it('placeholder 应反映到 input', () => {
    const { container } = render(QFormDatePicker, {
      props: { modelValue: '', placeholder: '选择日期' },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).placeholder,
    ).toBe('选择日期');
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QFormDatePicker, {
      props: { modelValue: '', disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it('input 应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormDatePicker, {
      props: { modelValue: '' },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = '2025-06-06';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['2025-06-06']);
  });
});
