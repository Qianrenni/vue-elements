// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QBreathing from '../Breathing.vue';

/**
 * QBreathing 快照测试：无 props，校验三个呼吸点的 DOM 结构。
 */
describe('QBreathing 快照测试', () => {
  it('默认渲染三个呼吸点', () => {
    const wrapper = mount(QBreathing);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
