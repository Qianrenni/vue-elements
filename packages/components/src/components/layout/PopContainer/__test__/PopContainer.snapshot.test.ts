// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QPopContainer from '../PopContainer.vue';

/**
 * QPopContainer 快照测试：覆盖可见与指定弹出位置的渲染。
 */
describe('QPopContainer 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QPopContainer, {
      slots: { default: '<button>触发</button>', pop: '<div>弹层内容</div>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('可见 + 指定位置渲染', () => {
    const wrapper = mount(QPopContainer, {
      props: { visible: true, position: 'bottom-center' },
      slots: { default: '<button>触发</button>', pop: '<div>弹层内容</div>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
