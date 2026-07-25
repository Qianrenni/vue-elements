// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormCheckboxGroup from '../FormCheckboxGroup.vue';

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
];

describe('QFormCheckboxGroup 渲染', () => {
  it('应渲染所有选项', () => {
    const { getByText } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options },
    });
    expect(getByText('苹果')).toBeTruthy();
    expect(getByText('香蕉')).toBeTruthy();
    expect(getByText('橙子')).toBeTruthy();
  });

  it('应渲染 checkbox input', () => {
    const { container } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options },
    });
    expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(
      3,
    );
  });

  it('modelValue 中的项应 checked', () => {
    const { container } = render(QFormCheckboxGroup, {
      props: { modelValue: ['banana'], options },
    });
    const inputs = container.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
    expect(inputs[2].checked).toBe(false);
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options, label: '水果' },
    });
    expect(getByText('水果')).toBeTruthy();
  });

  it('勾选应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options },
    });
    const inputs = container.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual([['apple']]);
  });

  it('disabled=true 应禁用所有 checkbox', () => {
    const { container } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options, disabled: true },
    });
    const inputs = container.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((i) => expect(i.disabled).toBe(true));
  });

  it('direction=vertical 时容器应为 container-column', () => {
    const { container } = render(QFormCheckboxGroup, {
      props: { modelValue: [], options, direction: 'vertical' },
    });
    expect(container.querySelector('.container-column')).toBeTruthy();
  });
});
