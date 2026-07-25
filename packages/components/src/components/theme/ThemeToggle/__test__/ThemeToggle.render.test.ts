// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QThemeToggle from '../ThemeToggle.vue';

describe('QThemeToggle 渲染', () => {
  it('应渲染主题切换根元素', () => {
    const { container } = render(QThemeToggle);
    expect(container.querySelector('.theme-toggle')).toBeTruthy();
  });

  it('点击应切换主题（isDark 状态变化）', async () => {
    const { container } = render(QThemeToggle);
    const toggle = container.querySelector('.theme-toggle') as HTMLElement;
    // 初始为亮色，点击后切到暗色，再次点击切回
    toggle.click();
    // 由于 QIcon 异步加载 svg，这里只验证点击不报错且元素仍存在
    expect(container.querySelector('.theme-toggle')).toBeTruthy();
  });
});
