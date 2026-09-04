// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTreeSelect from '../TreeSelect.vue';

const items = [
  {
    value: 'parent1',
    label: '父级 1',
    children: [
      { value: 'child1-1', label: '子级 1-1' },
      { value: 'child1-2', label: '子级 1-2' },
    ],
  },
  { value: 'leaf', label: '叶子' },
];

describe('QTreeSelect 快照/基础', () => {
  it('占位态渲染', () => {
    const wrapper = mount(QTreeSelect, {
      props: { items, placeholder: '请选择分类' },
    });
    expect(wrapper.find('.q-tree-select-placeholder').text()).toBe(
      '请选择分类',
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('已选中渲染', () => {
    const wrapper = mount(QTreeSelect, {
      props: { items, modelValue: 'child1-1' },
    });
    expect(wrapper.find('.q-tree-select-value').text()).toBe('子级 1-1');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('展开后点击叶子项选中并派发', async () => {
    const wrapper = mount(QTreeSelect, {
      props: { items },
      attachTo: document.body,
    });
    await wrapper.find('.q-tree-select-trigger').trigger('click');
    await wrapper.vm.$nextTick();
    const dropdown = document.querySelector('.q-tree-select-dropdown');
    const children = dropdown
      ? Array.from(dropdown.querySelectorAll('.q-tree-select-node'))
      : [];
    expect(children.map((n) => n.textContent?.trim())).toContain('子级 1-2');
    // 点击叶子
    const leaf = Array.from(
      (dropdown as HTMLElement).querySelectorAll('.q-tree-select-node'),
    ).find((n) => n.textContent?.includes('子级 1-2'));
    (leaf as HTMLElement).click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['child1-2']);
    wrapper.unmount();
    document.body
      .querySelectorAll('.q-tree-select-dropdown')
      .forEach((n) => n.remove());
  });
});
