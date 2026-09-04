// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSteps from '../Steps.vue';

describe('QSteps 快照测试', () => {
  it('水平默认渲染', () => {
    const wrapper = mount(QSteps, {
      props: {
        current: 1,
        items: [
          { title: '填写' },
          { title: '确认', description: '请核对' },
          { title: '完成' },
        ],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('垂直 + error 渲染', () => {
    const wrapper = mount(QSteps, {
      props: {
        direction: 'vertical',
        current: 0,
        status: 'error',
        items: [{ title: '失败步骤' }, { title: '重试' }],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
