// @vitest-environment browser
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QNavSection from '../NavSection.vue';

describe('QNavSection 渲染', () => {
  it('应渲染所有一级导航项标题', () => {
    const { getByText } = render(QNavSection, {
      props: {
        title: '根',
        sections: [{ title: '首页' }, { title: '设置' }, { title: '关于' }],
      },
    });
    expect(getByText('首页')).toBeTruthy();
    expect(getByText('设置')).toBeTruthy();
    expect(getByText('关于')).toBeTruthy();
  });

  it('stack.length<=1 时不应渲染返回按钮', () => {
    const { container } = render(QNavSection, {
      props: { title: '根', sections: [{ title: 'A' }] },
    });
    expect(container.querySelector('.back-button')).toBeNull();
  });

  it('点击含 children 的项应进入子级并显示返回按钮', async () => {
    const { container } = render(QNavSection, {
      props: {
        title: '根',
        sections: [
          {
            title: '父级',
            children: [{ title: '子级1' }, { title: '子级2' }],
          },
        ],
      },
    });
    const link = container.querySelectorAll('.nav-link')[0] as HTMLElement;
    link.click();
    await nextTick();
    expect(container.querySelector('.back-button')).toBeTruthy();
    expect(container.querySelectorAll('.nav-link')).toHaveLength(2);
  });

  it('点击叶子节点应触发 select 事件', async () => {
    const onSelect = vi.fn();
    const { container } = render(QNavSection, {
      props: {
        title: '根',
        sections: [{ title: '叶子', value: 'v1' }],
        onSelect,
      },
    });
    (container.querySelector('.nav-link') as HTMLElement).click();
    await nextTick();
    expect(onSelect).toHaveBeenCalled();
  });
});
