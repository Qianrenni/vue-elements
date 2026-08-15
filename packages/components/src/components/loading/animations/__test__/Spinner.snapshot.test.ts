// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSpinner from '../Spinner.vue';

/**
 * QSpinner 快照测试：无 props，校验旋转圆环 SVG 结构。
 */
describe('QSpinner 快照测试', () => {
  it('默认渲染旋转圆环', () => {
    const wrapper = mount(QSpinner);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
