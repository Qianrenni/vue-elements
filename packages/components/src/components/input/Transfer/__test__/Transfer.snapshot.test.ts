// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTransfer from '../Transfer.vue';

const dataSource = [
  { key: 'a', title: 'Apple', description: 'red fruit' },
  { key: 'b', title: 'Banana' },
  { key: 'c', title: 'Cherry', disabled: true },
  { key: 'd', title: 'Durian' },
];

describe('QTransfer 快照/交互', () => {
  it('初始渲染（左列表 + 禁用项）', () => {
    const wrapper = mount(QTransfer, {
      props: { dataSource, titles: ['源', '目标'] },
    });
    const panels = wrapper.findAll('.q-transfer-panel');
    const leftRows = panels[0].findAll('.q-transfer-item');
    expect(
      leftRows.map((r) => r.find('.q-transfer-item-title').text()),
    ).toEqual(['Apple', 'Banana', 'Cherry', 'Durian']);
    expect(
      leftRows
        .find((r) => r.text().includes('Cherry'))
        ?.classes('q-transfer-item--disabled'),
    ).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('勾选后向右移动，右侧出现该项', async () => {
    const wrapper = mount(QTransfer, {
      props: { dataSource, titles: ['源', '目标'] },
      attachTo: document.body,
    });
    const appleRow = wrapper
      .findAll('.q-transfer-panel')[0]
      .findAll('.q-transfer-item')[0];
    await appleRow.trigger('click');
    expect(appleRow.classes('q-transfer-item--checked')).toBe(true);
    const rightBtn = wrapper.find('.q-transfer-btn--right');
    expect(rightBtn.attributes('disabled')).toBeUndefined();
    await rightBtn.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']]);
    expect(wrapper.emitted('change')?.[0]).toEqual([['a'], 'right', ['a']]);
    // 父组件回写 v-model
    await wrapper.setProps({ modelValue: ['a'] });
    await wrapper.vm.$nextTick();
    const panels = wrapper.findAll('.q-transfer-panel');
    const leftTitles = panels[0]
      .findAll('.q-transfer-item-title')
      .map((n) => n.text());
    const rightTitles = panels[1]
      .findAll('.q-transfer-item-title')
      .map((n) => n.text());
    expect(leftTitles).toEqual(['Banana', 'Cherry', 'Durian']);
    expect(rightTitles).toEqual(['Apple']);
    // 双击右侧移回
    await panels[1].find('.q-transfer-item').trigger('dblclick');
    const updates = wrapper.emitted('update:modelValue');
    expect(updates?.[updates.length - 1]).toEqual([[]]);
    expect(wrapper.emitted('change')?.[1]).toEqual([[], 'left', ['a']]);
    wrapper.unmount();
  });
});
