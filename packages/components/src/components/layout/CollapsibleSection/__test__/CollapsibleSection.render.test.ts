// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QCollapsibleSection from '../CollapsibleSection.vue';

describe('QCollapsibleSection 渲染', () => {
  it('initialExpanded=true 时内容应可见', () => {
    const { container, getByText } = render(QCollapsibleSection, {
      props: { initialExpanded: true },
      slots: { default: '展开内容' },
    });
    expect(getByText('展开内容')).toBeTruthy();
    const content = container.querySelector('.content') as HTMLElement;
    expect(content.style.display).not.toBe('none');
  });

  it('direction=down 默认应渲染下方箭头按钮', () => {
    const { container } = render(QCollapsibleSection, {
      props: { direction: 'down' },
    });
    expect(container.querySelector('.toggle-button-down')).toBeTruthy();
    expect(container.querySelector('.toggle-button-up')).toBeNull();
  });

  it('direction=up 应渲染上方箭头按钮', () => {
    const { container } = render(QCollapsibleSection, {
      props: { direction: 'up' },
    });
    expect(container.querySelector('.toggle-button-up')).toBeTruthy();
  });

  it('direction=left 应渲染左侧箭头按钮', () => {
    const { container } = render(QCollapsibleSection, {
      props: { direction: 'left' },
    });
    expect(container.querySelector('.toggle-button-left')).toBeTruthy();
  });

  it('direction=right 应渲染右侧箭头按钮', () => {
    const { container } = render(QCollapsibleSection, {
      props: { direction: 'right' },
    });
    expect(container.querySelector('.toggle-button-right')).toBeTruthy();
  });

  it('isShowArrow=false 时不应渲染箭头按钮', () => {
    const { container } = render(QCollapsibleSection, {
      props: { isShowArrow: false, direction: 'down' },
    });
    expect(container.querySelector('.toggle-button-down')).toBeNull();
  });

  it('点击箭头应切换展开状态', async () => {
    const { container } = render(QCollapsibleSection, {
      props: { initialExpanded: true, direction: 'down' },
      slots: { default: '内容' },
    });
    const btn = container.querySelector('.toggle-button-down') as HTMLElement;
    btn.click();
    await nextTick();
    const content = container.querySelector('.content') as HTMLElement;
    expect(content.style.display).toBe('none');
  });

  it('initialExpanded=false 时内容应隐藏', () => {
    const { container } = render(QCollapsibleSection, {
      props: { initialExpanded: false },
      slots: { default: '隐藏内容' },
    });
    const content = container.querySelector('.content') as HTMLElement;
    expect(content.style.display).toBe('none');
  });
});
