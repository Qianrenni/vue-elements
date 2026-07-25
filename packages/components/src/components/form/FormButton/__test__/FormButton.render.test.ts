// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QFormButton from '../FormButton.vue';

describe('QFormButton 渲染', () => {
  it('应渲染 button 元素且默认 type=button', () => {
    const { container } = render(QFormButton);
    const btn = container.querySelector('button.button') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.type).toBe('button');
  });

  it('type=submit 应反映到 button type 属性', () => {
    const { container } = render(QFormButton, { props: { type: 'submit' } });
    expect((container.querySelector('button') as HTMLButtonElement).type).toBe(
      'submit',
    );
  });

  it('disabled=true 应禁用按钮并附加 mouse-cursor-disable 类', () => {
    const { container } = render(QFormButton, {
      props: { disabled: true },
    });
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('mouse-cursor-disable')).toBe(true);
  });

  it('size=large/small 应附加对应文字尺寸类', () => {
    const { container: largeC } = render(QFormButton, {
      props: { size: 'large' },
    });
    expect(largeC.querySelector('button.text-12rem')).toBeTruthy();

    const { container: smallC } = render(QFormButton, {
      props: { size: 'small' },
    });
    expect(smallC.querySelector('button.text-08rem')).toBeTruthy();
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QFormButton, {
      slots: { default: '提交' },
    });
    expect(getByText('提交')).toBeTruthy();
  });
});
