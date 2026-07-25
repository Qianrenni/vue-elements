// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import { QDivider } from '../index';

describe('QDivider 渲染', () => {
  it('应渲染 divider 根元素', () => {
    const { container } = render(QDivider);
    expect(container.querySelector('.divider')).toBeTruthy();
  });
});
