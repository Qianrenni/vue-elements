// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QEmpty from '../Empty.vue';

describe('QEmpty 快照/渲染', () => {
  it('默认插画 + 默认文案', () => {
    const wrapper = mount(QEmpty);
    expect(wrapper.find('.q-empty').exists()).toBe(true);
    expect(wrapper.find('.q-empty-svg--default').exists()).toBe(true);
    expect(wrapper.find('.q-empty-description').text()).toBe('暂无数据');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('simple 预设', () => {
    const wrapper = mount(QEmpty, { props: { preset: 'simple' } });
    expect(wrapper.find('.q-empty-svg--simple').exists()).toBe(true);
  });

  it('自定义描述文案', () => {
    const wrapper = mount(QEmpty, {
      props: { description: '暂无搜索结果' },
    });
    expect(wrapper.find('.q-empty-description').text()).toBe('暂无搜索结果');
  });

  it('默认插槽渲染底部操作区', () => {
    const wrapper = mount(QEmpty, {
      slots: { default: '<button>去创建</button>' },
    });
    expect(wrapper.find('.q-empty-footer button').exists()).toBe(true);
  });

  it('image 插槽覆盖插画', () => {
    const wrapper = mount(QEmpty, {
      slots: { image: '<img class="my-img" />' },
    });
    expect(wrapper.find('.q-empty-svg--default').exists()).toBe(false);
    expect(wrapper.find('.my-img').exists()).toBe(true);
  });
});
