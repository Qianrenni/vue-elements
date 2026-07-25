import { describe, expect, it } from 'vitest';

import { useCarouselItem } from '../composable';

describe('useCarouselItem', () => {
  it('应该返回 carousel-item CSS 类名', () => {
    const { containerClass } = useCarouselItem();

    expect(containerClass.value).toBe('carousel-item');
  });
});
