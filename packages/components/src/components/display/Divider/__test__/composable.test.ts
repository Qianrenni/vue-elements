import { describe, expect, it } from 'vitest';

import { useDivider } from '../composable';

describe('useDivider', () => {
  it('应该返回 divider CSS 类名', () => {
    const { containerClass } = useDivider();

    expect(containerClass.value).toBe('divider');
  });
});
