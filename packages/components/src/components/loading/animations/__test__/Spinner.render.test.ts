// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QSpinner from '../Spinner.vue';

describe('QSpinner 渲染', () => {
  it('应渲染 svg 旋转动画及内部 circle', () => {
    const { container } = render(QSpinner);
    const svg = container.querySelector('svg.spinner');
    expect(svg).toBeTruthy();
    expect(svg!.getAttribute('viewBox')).toBe('0 0 100 100');
    expect(container.querySelector('.spinner-circle')).toBeTruthy();
  });
});
