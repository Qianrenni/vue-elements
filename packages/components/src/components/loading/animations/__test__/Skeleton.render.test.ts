// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QSkeleton from '../Skeleton.vue';

describe('QSkeleton 渲染', () => {
  it('应渲染骨架屏根元素', () => {
    const { container } = render(QSkeleton);
    expect(container.querySelector('.loader-skeleton')).toBeTruthy();
  });
});
