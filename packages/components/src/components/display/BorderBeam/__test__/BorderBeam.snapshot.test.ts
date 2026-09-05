// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QBorderBeam from '../BorderBeam.vue';

const mountBeam = (props: Record<string, unknown> = {}, slot = '') =>
  mount(QBorderBeam, {
    props,
    slots: slot
      ? { default: `<div class="card">${slot}</div>` }
      : { default: '<div class="card">卡片内容</div>' },
  });

describe('QBorderBeam 渲染', () => {
  it('渲染内容 + 光束层', () => {
    const wrapper = mountBeam();
    expect(wrapper.get('.q-border-beam__content .card').text()).toBe(
      '卡片内容',
    );
    expect(wrapper.get('.q-border-beam__layer').exists()).toBe(true);
    expect(wrapper.get('.q-border-beam__spin').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('hover 模式添加 --hover 类（默认常显不加）', () => {
    const normal = mountBeam();
    expect(normal.get('.q-border-beam').classes()).not.toContain(
      'q-border-beam--hover',
    );
    const hover = mountBeam({ hover: true });
    expect(hover.get('.q-border-beam').classes()).toContain(
      'q-border-beam--hover',
    );
  });

  it('自定义颜色/时长写入 spin 背景与动画时长', () => {
    const wrapper = mountBeam({ color: '#1677ff', duration: 3, size: 160 });
    const spin = wrapper.get('.q-border-beam__spin');
    expect(spin.attributes('style')).toContain('#1677ff');
    expect(spin.attributes('style')).toContain('animation-duration: 3s');
  });
});
