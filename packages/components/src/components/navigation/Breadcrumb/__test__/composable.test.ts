import { describe, expect, it } from 'vitest';

import { useBreadcrumb } from '../composable';
import type { BreadcrumbProps } from '../type';

describe('useBreadcrumb', () => {
  it('默认应为空列表与 / 分隔符', () => {
    const props: BreadcrumbProps = {};
    const { items, separator } = useBreadcrumb(props);

    expect(items.value).toEqual([]);
    expect(separator.value).toBe('/');
  });

  it('应透传 items 与自定义分隔符', () => {
    const props: BreadcrumbProps = {
      items: [{ title: '首页' }, { title: '列表' }],
      separator: '>',
    };
    const { items, separator } = useBreadcrumb(props);

    expect(items.value).toHaveLength(2);
    expect(separator.value).toBe('>');
  });
});
