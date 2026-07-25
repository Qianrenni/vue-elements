// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QBreathing from '../Breathing.vue';

describe('QBreathing 渲染', () => {
  it('应渲染三个呼吸点', () => {
    const { container } = render(QBreathing);
    expect(container.querySelectorAll('.loader-dot')).toHaveLength(3);
    expect(container.querySelector('.loader-dots')).toBeTruthy();
  });
});
