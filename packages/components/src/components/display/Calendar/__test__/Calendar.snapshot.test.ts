// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import QCalendar from '../Calendar.vue';

const mountCal = (props: Record<string, unknown> = {}) =>
  mount(QCalendar, { props });

describe('QCalendar 渲染', () => {
  // 固定“今天”，避免 is-today 高亮随真实日期漂移导致快照不稳定
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 6));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('渲染表头 + 42 格', () => {
    const wrapper = mountCal();
    expect(wrapper.findAll('.q-calendar__week-cell')).toHaveLength(7);
    expect(wrapper.findAll('.q-calendar__cell')).toHaveLength(42);
    expect(wrapper.find('.q-calendar__title').text()).toMatch(
      /\d{4} 年 \d{1,2} 月/,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('点击日期 emit 选中', async () => {
    const wrapper = mountCal({ modelValue: new Date(2026, 8, 5) });
    const cell = wrapper
      .findAll('.q-calendar__cell')
      .find((c) => !c.classes().includes('is-out') && c.text() === '10')!;
    await cell.trigger('click');
    const emitted = wrapper.emitted('update:modelValue')!.at(-1)![0] as Date;
    expect(emitted.getDate()).toBe(10);
    expect(emitted.getMonth()).toBe(8);
  });
});
