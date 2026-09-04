// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTimeline from '../Timeline.vue';

const ITEMS = [
  { label: '2024-01-01', content: '创建仓库', color: 'green' },
  { label: '2024-02-15', content: '发布 v1.0', color: 'blue' },
  { content: '回退问题', color: 'red' },
];

describe('QTimeline 快照/渲染', () => {
  it('默认 left 模式渲染条目', () => {
    const wrapper = mount(QTimeline, { props: { items: ITEMS } });
    const items = wrapper.findAll('.q-timeline-item');
    expect(items).toHaveLength(3);
    expect(wrapper.find('.q-timeline-content').text()).toContain('创建仓库');
    expect(wrapper.findAll('.q-timeline-label')[0].text()).toBe('2024-01-01');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('alternate 模式左右交替', () => {
    const wrapper = mount(QTimeline, {
      props: { items: ITEMS, mode: 'alternate' },
    });
    const items = wrapper.findAll('.q-timeline-item');
    expect(items[0].classes()).toContain('q-timeline-item--right');
    expect(items[1].classes()).toContain('q-timeline-item--left');
  });

  it('reverse 倒序', () => {
    const wrapper = mount(QTimeline, {
      props: { items: ITEMS, reverse: true },
    });
    const contents = wrapper
      .findAll('.q-timeline-content')
      .map((n) => n.text());
    expect(contents[0]).toContain('回退问题');
  });

  it('pending 幽灵条目', () => {
    const wrapper = mount(QTimeline, {
      props: { items: ITEMS.slice(0, 1), pending: true },
    });
    const pend = wrapper.find('.q-timeline-item--pending');
    expect(pend.exists()).toBe(true);
    expect(wrapper.findAll('.q-timeline-item')).toHaveLength(2);
  });

  it('自定义圆点字符', () => {
    const wrapper = mount(QTimeline, {
      props: { items: [{ content: 'x', dot: '★' }] },
    });
    const dot = wrapper.find('.q-timeline-dot');
    expect(dot.classes()).toContain('q-timeline-dot--custom');
    expect(dot.text()).toBe('★');
  });
});
