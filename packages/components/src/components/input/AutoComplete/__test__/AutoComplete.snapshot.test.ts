// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import QAutoComplete from '../AutoComplete.vue';

const options = ['Option A', 'Option B', 'Option C'];

describe('QAutoComplete 快照/基础', () => {
  afterEach(() => {
    document.body.querySelectorAll('.q-auto-complete-dropdown').forEach((n) => {
      n.remove();
    });
  });

  it('占位态渲染', () => {
    const wrapper = mount(QAutoComplete, {
      props: { options, placeholder: '输入关键字' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('输入关键字');
    expect(wrapper.find('.q-auto-complete-dropdown').isVisible()).toBe(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('聚焦展开全部候选', async () => {
    const wrapper = mount(QAutoComplete, {
      props: { options },
      attachTo: document.body,
    });
    await wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.q-auto-complete-dropdown').isVisible()).toBe(true);
    const texts = wrapper
      .findAll('.q-auto-complete-option')
      .map((n) => n.text());
    expect(texts).toEqual(options);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('输入过滤并点击选中派发', async () => {
    const wrapper = mount(QAutoComplete, {
      props: { options },
      attachTo: document.body,
    });
    await wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    await wrapper.find('input').setValue('B');
    await wrapper.vm.$nextTick();
    // 模拟父组件 v-model 回写
    await wrapper.setProps({ modelValue: 'B' });
    await wrapper.vm.$nextTick();
    const texts = wrapper
      .findAll('.q-auto-complete-option')
      .map((n) => n.text());
    expect(texts).toEqual(['Option B']);
    await wrapper.find('.q-auto-complete-option').trigger('mousedown');
    await wrapper.find('.q-auto-complete-option').trigger('click');
    const updates = wrapper.emitted('update:modelValue');
    expect(updates?.[updates.length - 1]).toEqual(['Option B']);
    expect(wrapper.emitted('select')?.[0]).toEqual([
      'Option B',
      { value: 'Option B', label: 'Option B', disabled: false },
    ]);
    wrapper.unmount();
  });
});
