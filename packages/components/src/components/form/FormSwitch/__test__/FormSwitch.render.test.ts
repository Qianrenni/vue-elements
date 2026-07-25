// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import { QFormSwitch } from '../index';

describe('QFormSwitch 渲染', () => {
  it('modelValue 为 true 时应包含 checked 类', () => {
    const { container } = render(QFormSwitch, {
      props: { modelValue: true },
    });
    expect(container.querySelector('.form-switch--checked')).toBeTruthy();
  });

  it('modelValue 为 false 时不应包含 checked 类', () => {
    const { container } = render(QFormSwitch, {
      props: { modelValue: false },
    });
    expect(container.querySelector('.form-switch--checked')).toBeNull();
  });

  it('点击应触发 update:modelValue 与 change 事件', async () => {
    const { container, emitted } = render(QFormSwitch, {
      props: { modelValue: false },
    });
    (container.querySelector('.form-switch') as HTMLElement).click();

    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual([true]);
    expect(emitted('change')).toBeTruthy();
    expect(emitted('change')![0]).toEqual([true]);
  });

  it('disabled 时点击不应触发事件', async () => {
    const { container, emitted } = render(QFormSwitch, {
      props: { modelValue: false, disabled: true },
    });
    // 直接派发 click 事件，组件内部 disabled 逻辑应阻止事件触发
    (container.querySelector('.form-switch') as HTMLElement).click();

    expect(emitted('update:modelValue')).toBeFalsy();
    expect(emitted('change')).toBeFalsy();
  });

  it('应渲染 label 文本', () => {
    const { getByText } = render(QFormSwitch, {
      props: { modelValue: false, label: '启用通知' },
    });
    expect(getByText('启用通知')).toBeTruthy();
  });

  it('未传 label 时不应渲染 label 文本节点', () => {
    const { container } = render(QFormSwitch, {
      props: { modelValue: false },
    });
    expect(container.querySelector('.form-switch__label-text')).toBeNull();
  });

  it('size 属性应反映到 slider 的 class', () => {
    const { container } = render(QFormSwitch, {
      props: { modelValue: false, size: 'large' },
    });
    expect(
      container.querySelector('.form-switch__slider.size-large'),
    ).toBeTruthy();
  });

  it('rerender 更新 modelValue 应切换 checked 类', async () => {
    const { container, rerender } = render(QFormSwitch, {
      props: { modelValue: false },
    });
    expect(container.querySelector('.form-switch--checked')).toBeNull();

    await rerender({ modelValue: true });
    expect(container.querySelector('.form-switch--checked')).toBeTruthy();
  });
});
