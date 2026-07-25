// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormSelect from '../FormSelect.vue';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

describe('QFormSelect 渲染', () => {
  it('应渲染 input 且初始下拉隐藏', () => {
    const { container } = render(QFormSelect, {
      props: { modelValue: null, options },
    });
    expect(container.querySelector('input')).toBeTruthy();
    const opts = container.querySelector('.form-select-options') as HTMLElement;
    // Transition + v-show：元素始终在 DOM，初始 isShowOptions=false 时 display:none
    expect(opts).toBeTruthy();
    expect(opts.style.display).toBe('none');
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormSelect, {
      props: { modelValue: null, options, label: '选择项' },
    });
    expect(getByText('选择项')).toBeTruthy();
  });

  it('placeholder 应反映到 input', () => {
    const { container } = render(QFormSelect, {
      props: { modelValue: null, options, placeholder: '请选择' },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).placeholder,
    ).toBe('请选择');
  });

  it('focus 后应显示下拉选项', async () => {
    const { container } = render(QFormSelect, {
      props: { modelValue: null, options },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.focus();
    await nextTick();
    const opts = container.querySelector('.form-select-options');
    expect(opts).toBeTruthy();
    expect(opts!.querySelectorAll('p')).toHaveLength(3);
  });

  it('modelValue 匹配的选项应高亮（bg-secondary）', async () => {
    const { container } = render(QFormSelect, {
      props: { modelValue: '2', options },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.focus();
    await nextTick();
    const items = container.querySelectorAll('.form-select-options p');
    expect(items[1].classList.contains('bg-secondary')).toBe(true);
  });

  it('点击选项应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormSelect, {
      props: { modelValue: null, options },
    });
    (container.querySelector('input') as HTMLInputElement).focus();
    await nextTick();
    const items = container.querySelectorAll('.form-select-options p');
    (items[2] as HTMLElement).click();
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual(['3']);
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QFormSelect, {
      props: { modelValue: null, options, disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });
});
