// @vitest-environment browser
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QTab from '../Tab.vue';

describe('QTab 渲染', () => {
  it('应渲染所有标签项', () => {
    const { getByText } = render(QTab, {
      props: { list: ['首页', '设置', '关于'] },
    });
    expect(getByText('首页')).toBeTruthy();
    expect(getByText('设置')).toBeTruthy();
    expect(getByText('关于')).toBeTruthy();
  });

  it('默认激活第一项（activeClass=active）', () => {
    const { container } = render(QTab, {
      props: { list: ['A', 'B'] },
    });
    const items = container.querySelectorAll('.tab-item');
    expect(items[0].classList.contains('active')).toBe(true);
    expect(items[1].classList.contains('active')).toBe(false);
  });

  it('自定义 activeClass 应生效', () => {
    const { container } = render(QTab, {
      props: { list: ['A', 'B'], activeClass: 'my-active' },
    });
    expect(container.querySelectorAll('.my-active')).toHaveLength(1);
  });

  it('点击标签应切换激活项并触发 select 事件', async () => {
    const { container, emitted } = render(QTab, {
      props: { list: ['A', 'B', 'C'] },
    });
    const items = container.querySelectorAll('.tab-item');
    (items[2] as HTMLElement).click();
    await nextTick();

    expect(items[2].classList.contains('active')).toBe(true);
    expect(emitted('select')).toBeTruthy();
    expect(emitted('select')![0]).toEqual([2]);
  });

  it('select 事件参数应为被点击的 index', async () => {
    const onSelect = vi.fn();
    const { container } = render(QTab, {
      props: { list: ['A', 'B'], onSelect },
    });
    (container.querySelectorAll('.tab-item')[1] as HTMLElement).click();
    await nextTick();
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
