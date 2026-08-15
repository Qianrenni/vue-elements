// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormTextarea from '../FormTextarea.vue';

/**
 * QFormTextarea 快照测试：覆盖默认与带标签/必填的渲染。
 */
describe('QFormTextarea 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QFormTextarea, {
      props: { modelValue: '初始内容' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('带标签 + 必填 + 自定义行数渲染', () => {
    const wrapper = mount(QFormTextarea, {
      props: {
        modelValue: '',
        label: '备注',
        name: 'remark',
        required: true,
        rows: 3,
        placeholder: '请输入备注',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
