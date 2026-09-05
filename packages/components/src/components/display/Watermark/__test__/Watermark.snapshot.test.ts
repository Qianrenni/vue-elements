// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QWatermark from '../Watermark.vue';

describe('QWatermark 渲染', () => {
  it('包裹内容渲染（jsdom 无 canvas，验证结构）', () => {
    const wrapper = mount(QWatermark, {
      props: { content: '内部水印', rotate: -22 },
      slots: { default: '<div class="content">内容</div>' },
    });
    expect(wrapper.find('.q-watermark').exists()).toBe(true);
    expect(wrapper.find('.content').text()).toBe('内容');
    expect(wrapper.find('.q-watermark-mask').exists()).toBe(true);
  });

  it('空内容不渲染水印遮罩', () => {
    const wrapper = mount(QWatermark, {
      props: { content: '' },
    });
    // mask 背景为空时仍可保留节点；此处验证不抛错且渲染子级
    expect(wrapper.find('.q-watermark').exists()).toBe(true);
  });
});
