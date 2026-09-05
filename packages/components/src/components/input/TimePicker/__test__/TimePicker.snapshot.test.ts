// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import QTimePicker from '../TimePicker.vue';

afterEach(() => {
  document.removeEventListener('pointerdown', () => {});
});

const mountTp = (props: Record<string, unknown> = {}) =>
  mount(QTimePicker, {
    props: { modelValue: '12:30:45', ...props },
    attachTo: document.body,
  });

describe('QTimePicker', () => {
  it('展示格式化值', () => {
    const wrapper = mountTp();
    expect(wrapper.get('input').element.value).toBe('12:30:45');
  });

  it('受控 open 渲染时/分/秒列', () => {
    const wrapper = mountTp({ open: true });
    expect(wrapper.get('.q-timepicker__panel').exists()).toBe(true);
    const labels = wrapper
      .findAll('.q-timepicker__col-label')
      .map((n) => n.text());
    expect(labels).toEqual(['时', '分', '秒']);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('点击时/分/秒并确定 emit 新值并关闭', async () => {
    const wrapper = mountTp({ open: true });
    const hourItems = wrapper
      .findAll('.q-timepicker__col')[0]
      .findAll('.q-timepicker__item');
    await hourItems[13].trigger('click');
    await wrapper.findAll('.q-timepicker__btn').at(-1)!.trigger('click');
    expect(wrapper.emitted('update:modelValue')!.at(-1)![0]).toBe('13:30:45');
    expect(wrapper.emitted('update:open')!.at(-1)![0]).toBe(false);
  });

  it('清除 emit 空串', async () => {
    const wrapper = mountTp({ open: true });
    await wrapper.findAll('.q-timepicker__btn').at(0)!.trigger('click');
    expect(wrapper.emitted('update:modelValue')!.at(-1)![0]).toBe('');
  });
});
