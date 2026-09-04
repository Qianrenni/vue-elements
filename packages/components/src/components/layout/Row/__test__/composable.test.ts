import { describe, expect, it } from 'vitest';

import { useRow } from '../composable';
import type { RowProps } from '../type';

describe('useRow', () => {
  it('默认应为 start/top 对齐并允许换行', () => {
    const props: RowProps = {};
    const { classList, inlineStyle } = useRow(props);

    expect(classList.value['q-row--justify-start']).toBe(true);
    expect(classList.value['q-row--align-top']).toBe(true);
    expect(classList.value['q-row--no-wrap']).toBe(false);
    expect(inlineStyle.value.columnGap).toBe('0px');
  });

  it('数字 gutter 应同时作用于横纵间距', () => {
    const { inlineStyle } = useRow({ gutter: 16 });
    expect(inlineStyle.value.columnGap).toBe('16px');
    expect(inlineStyle.value.rowGap).toBe('16px');
  });

  it('数组 gutter 应为 [水平, 垂直]', () => {
    const { inlineStyle } = useRow({ gutter: [12, 24] });
    expect(inlineStyle.value.columnGap).toBe('12px');
    expect(inlineStyle.value.rowGap).toBe('24px');
  });

  it('justify / align / wrap=false 应生成修饰类', () => {
    const { classList } = useRow({
      justify: 'space-between',
      align: 'middle',
      wrap: false,
    });

    expect(classList.value['q-row--justify-space-between']).toBe(true);
    expect(classList.value['q-row--align-middle']).toBe(true);
    expect(classList.value['q-row--no-wrap']).toBe(true);
  });
});
