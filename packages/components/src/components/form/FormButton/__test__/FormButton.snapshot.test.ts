// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormButton from '../FormButton.vue';

/**
 * QFormButton 快照测试：覆盖默认、禁用、尺寸等组合下的 DOM 结构。
 */
describe('QFormButton 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QFormButton, { slots: { default: '提交' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('disabled + size=large 渲染', () => {
    const wrapper = mount(QFormButton, {
      props: { disabled: true, size: 'large' },
      slots: { default: '禁用' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('type=submit 渲染', () => {
    const wrapper = mount(QFormButton, {
      props: { type: 'submit' },
      slots: { default: '保存' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
