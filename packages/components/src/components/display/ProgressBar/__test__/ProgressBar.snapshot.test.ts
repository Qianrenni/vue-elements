// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QProgressBar from '../ProgressBar.vue';

/**
 * QProgressBar 快照测试：覆盖水平与垂直两种方向的进度填充。
 */
describe('QProgressBar 快照测试', () => {
  it('水平方向渲染', () => {
    const wrapper = mount(QProgressBar, {
      props: { percent: '30%' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('垂直方向 + 自定义颜色渲染', () => {
    const wrapper = mount(QProgressBar, {
      props: { percent: '70%', direction: 'vertical', color: '#f60' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
