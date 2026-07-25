// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QFormRangeSlider from '../FormRangeSlider.vue';

describe('QFormRangeSlider 渲染', () => {
  it('应渲染 range input', () => {
    const { container } = render(QFormRangeSlider, {
      props: { modelValue: 30 },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('range');
    expect(input.value).toBe('30');
  });

  it('min/max/step 应反映到 input', () => {
    const { container } = render(QFormRangeSlider, {
      props: { modelValue: 5, min: 0, max: 10, step: 1 },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.min).toBe('0');
    expect(input.max).toBe('10');
    expect(input.step).toBe('1');
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormRangeSlider, {
      props: { modelValue: 0, label: '音量' },
    });
    expect(getByText('音量:')).toBeTruthy();
  });

  it('displayValue 应在 output 中显示', () => {
    const { container } = render(QFormRangeSlider, {
      props: { modelValue: 42 },
    });
    expect(container.querySelector('output')!.textContent).toBe('42');
  });

  it('formatter 应格式化 displayValue', () => {
    const { container } = render(QFormRangeSlider, {
      props: {
        modelValue: 50,
        formatter: (v: number) => `${v}%`,
      },
    });
    expect(container.querySelector('output')!.textContent).toBe('50%');
  });

  it('disabled=true 应禁用 input', () => {
    const { container } = render(QFormRangeSlider, {
      props: { modelValue: 0, disabled: true },
    });
    expect(
      (container.querySelector('input') as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it('拖动应触发 update:modelValue', async () => {
    const { container, emitted } = render(QFormRangeSlider, {
      props: { modelValue: 0 },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = '60';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual([60]);
  });
});
