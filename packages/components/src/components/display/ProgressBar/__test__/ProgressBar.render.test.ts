// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QProgressBar from '../ProgressBar.vue';

describe('QProgressBar 渲染', () => {
  it('水平方向应将 percent 应用到 width', () => {
    const { container } = render(QProgressBar, {
      props: { percent: '40%' },
    });
    const bar = container.querySelector('.bg-gray-300 > div') as HTMLElement;
    expect(bar.style.width).toBe('40%');
    expect(bar.style.height).toBe('100%');
  });

  it('垂直方向应将 percent 应用到 height', () => {
    const { container } = render(QProgressBar, {
      props: { percent: '60%', direction: 'vertical' },
    });
    const bar = container.querySelector(
      '.container-column > div',
    ) as HTMLElement;
    expect(bar.style.height).toBe('60%');
    expect(bar.style.width).toBe('100%');
    expect(container.querySelector('.container-column')).toBeTruthy();
  });

  it('自定义 color 应应用到 backgroundColor', () => {
    const { container } = render(QProgressBar, {
      props: { percent: '50%', color: '#f00' },
    });
    const bar = container.querySelector('.bg-gray-300 > div') as HTMLElement;
    expect(bar.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
