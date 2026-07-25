// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormRadioGroup from '../FormRadioGroup.vue';

const options = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

describe('QFormRadioGroup 渲染', () => {
  it('应渲染所有选项', () => {
    const { getByText } = render(QFormRadioGroup, {
      props: { modelValue: '', options },
    });
    expect(getByText('男')).toBeTruthy();
    expect(getByText('女')).toBeTruthy();
  });

  it('应渲染 radio input', () => {
    const { container } = render(QFormRadioGroup, {
      props: { modelValue: '', options },
    });
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(2);
  });

  it('modelValue 匹配的项应 checked', () => {
    const { container } = render(QFormRadioGroup, {
      props: { modelValue: 'female', options },
    });
    const inputs = container.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormRadioGroup, {
      props: { modelValue: '', options, label: '性别' },
    });
    expect(getByText('性别')).toBeTruthy();
  });

  it('选中应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormRadioGroup, {
      props: { modelValue: '', options },
    });
    const inputs = container.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['male']);
  });

  it('disabled=true 应禁用所有 radio', () => {
    const { container } = render(QFormRadioGroup, {
      props: { modelValue: '', options, disabled: true },
    });
    const inputs = container.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((i) => expect(i.disabled).toBe(true));
  });
});
