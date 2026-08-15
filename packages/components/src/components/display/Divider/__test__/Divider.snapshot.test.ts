// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QDivider from '../Divider.vue';

/**
 * QDivider 快照测试：无 props，校验分割线 DOM 结构。
 */
describe('QDivider 快照测试', () => {
  it('默认渲染分割线', () => {
    const wrapper = mount(QDivider);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
