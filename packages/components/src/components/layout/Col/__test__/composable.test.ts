import { describe, expect, it } from 'vitest';

import { useCol } from '../composable';
import type { ColProps } from '../type';

describe('useCol', () => {
  it('默认 span 应为 24', () => {
    const props: ColProps = {};
    const { width, marginLeft } = useCol(props);

    expect(width.value).toBe('100%');
    expect(marginLeft.value).toBe('0%');
  });

  it('span 应转换为百分比', () => {
    const { width } = useCol({ span: 6 });
    expect(width.value).toBe('25%');
  });

  it('offset 应转换为百分比', () => {
    const { marginLeft } = useCol({ span: 8, offset: 8 });
    expect(marginLeft.value).toBe('33.33333333333333%');
  });

  it('flex 应原样保留', () => {
    const { flexValue } = useCol({ flex: '1 1 auto' });
    expect(flexValue.value).toBe('1 1 auto');
  });
});
