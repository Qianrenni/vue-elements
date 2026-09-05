// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSplitter from '../Splitter.vue';

const mountSplitter = (props: Record<string, unknown> = {}) =>
  mount(QSplitter, {
    props: { direction: 'row', ...props },
    slots: {
      first: '<div class="pane-a">A</div>',
      second: '<div class="pane-b">B</div>',
    },
    attachTo: document.body,
  });

describe('QSplitter 渲染', () => {
  it('两个面板 + 分隔条，首个面板宽度 = size', () => {
    const wrapper = mountSplitter({ size: 200 });
    const panes = wrapper.findAll('.q-splitter-pane');
    expect(panes).toHaveLength(2);
    expect(wrapper.get('.q-splitter-gutter').exists()).toBe(true);
    expect(wrapper.get('.q-splitter-pane').attributes('style')).toContain(
      'width: 200px',
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('column 方向使用高度', () => {
    const wrapper = mountSplitter({ direction: 'column', size: 120 });
    expect(wrapper.get('.q-splitter-pane').attributes('style')).toContain(
      'height: 120px',
    );
    expect(wrapper.get('.q-splitter').classes()).toContain(
      'q-splitter--column',
    );
  });

  it('resizable=false 时 gutter 不可聚焦', () => {
    const wrapper = mountSplitter({ resizable: false });
    expect(
      wrapper.get('.q-splitter-gutter').attributes('tabindex'),
    ).toBeUndefined();
  });

  it('键盘方向键调整尺寸并 emit', async () => {
    const wrapper = mountSplitter({ size: 200 });
    await wrapper
      .get('.q-splitter-gutter')
      .trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:size')!.at(-1)![0]).toBe(190);
  });
});
