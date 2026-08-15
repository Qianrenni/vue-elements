// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCollapseItem from '../../CollapseItem/CollapseItem.vue';
import QCollapse from '../Collapse.vue';

/**
 * QCollapse 快照测试：校验折叠面板容器的组合渲染（含激活项）。
 */
describe('QCollapse 快照测试', () => {
  it('含激活项的折叠面板渲染', () => {
    const wrapper = mount(QCollapse, {
      props: { modelValue: ['1'] },
      slots: {
        default: `
          <QCollapseItem name="1" title="面板一"><p>内容一</p></QCollapseItem>
          <QCollapseItem name="2" title="面板二"><p>内容二</p></QCollapseItem>
        `,
      },
      global: {
        components: { QCollapseItem },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
