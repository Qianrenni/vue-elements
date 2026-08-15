// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSkeleton from '../Skeleton.vue';

/**
 * QSkeleton 快照测试：无 props，校验骨架屏 DOM 结构。
 */
describe('QSkeleton 快照测试', () => {
  it('默认渲染骨架屏', () => {
    const wrapper = mount(QSkeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
