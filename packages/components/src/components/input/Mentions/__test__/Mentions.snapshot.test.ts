// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QMentions from '../Mentions.vue';

const mountMt = (props: Record<string, unknown> = {}) =>
  mount(QMentions, {
    props: {
      options: [{ value: 'Alice' }, { value: 'Bob' }, { value: 'Carol' }],
      ...props,
    },
  });

describe('QMentions 交互', () => {
  it('输入 @q 触发候选并过滤', async () => {
    const wrapper = mountMt();
    await wrapper.find('textarea').setValue('hello @b');
    expect(wrapper.findAll('.q-mentions__item').map((n) => n.text())).toEqual([
      'Bob',
    ]);
    expect(wrapper.emitted('update:modelValue')!.at(-1)![0]).toBe('hello @b');
  });

  it('选择候选替换文本并关闭', async () => {
    const wrapper = mountMt({ open: true, modelValue: '@a' });
    // 直接触发一次 input 以建立 trigger
    await wrapper.find('textarea').setValue('@a');
    await wrapper.findAll('.q-mentions__item')[0].trigger('click');
    const value = wrapper.emitted('update:modelValue')!.at(-1)![0] as string;
    expect(value).toContain('@Alice');
    expect(wrapper.emitted('update:open')!.at(-1)![0]).toBe(false);
  });
});
