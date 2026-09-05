// @vitest-environment jsdom
import QConfigProvider from '@/components/theme/ConfigProvider/ConfigProvider.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';

import QTable from '../Table.vue';

describe('QTable 空态 renderEmpty（QConfigProvider）', () => {
  const emptyTable = () => h(QTable, { dataSource: [], columns: [] });

  it('未配置 renderEmpty 时回退内置 QEmpty', () => {
    const wrapper = mount(QTable, { props: { dataSource: [], columns: [] } });
    expect(wrapper.find('.q-table-empty .q-empty').exists()).toBe(true);
    expect(wrapper.find('.q-table-empty').text()).toContain('暂无数据');
  });

  it('QConfigProvider.renderEmpty 覆盖默认空态', () => {
    const wrapper = mount(QConfigProvider, {
      props: {
        renderEmpty: () => h('div', { class: 'my-empty' }, '自定义空态'),
      },
      slots: { default: emptyTable },
    });
    const empty = wrapper.find('.q-table-empty .my-empty');
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toBe('自定义空态');
    expect(wrapper.find('.q-table-empty .q-empty').exists()).toBe(false);
  });

  it('#empty 插槽仍优先于 renderEmpty', () => {
    const wrapper = mount(QConfigProvider, {
      props: {
        renderEmpty: () => h('div', { class: 'my-empty' }, '自定义空态'),
      },
      slots: {
        default: () =>
          h(
            QTable,
            { dataSource: [], columns: [] },
            { empty: () => h('div', { class: 'slot-empty' }, '插槽空态') },
          ),
      },
    });
    expect(wrapper.find('.q-table-empty .slot-empty').text()).toBe('插槽空态');
    expect(wrapper.find('.q-table-empty .my-empty').exists()).toBe(false);
  });
});
