import { describe, expect, it } from 'vitest';

import {
  itemKeyOf,
  normalizeColumn,
  normalizeItems,
  normalizeSpan,
} from '../composable';
import type { QDescriptionItem } from '../type';

describe('QDescriptions 纯函数', () => {
  it('normalizeColumn clamp >= 1 与缺省 3', () => {
    expect(normalizeColumn(undefined)).toBe(3);
    expect(normalizeColumn(2)).toBe(2);
    expect(normalizeColumn(0)).toBe(1);
    expect(normalizeColumn(-3)).toBe(1);
    expect(normalizeColumn(4.5)).toBe(4);
  });

  it('normalizeSpan clamp 1..column', () => {
    expect(normalizeSpan({ label: 'x' }, 3)).toBe(1);
    expect(normalizeSpan({ label: 'x', span: 2 }, 3)).toBe(2);
    expect(normalizeSpan({ label: 'x', span: 9 }, 3)).toBe(3);
    expect(normalizeSpan({ label: 'x', span: 0 }, 3)).toBe(1);
  });

  it('normalizeItems 生成稳定 key 与 span', () => {
    const items: QDescriptionItem[] = [
      { key: 'a', label: 'A', span: 2 },
      { label: 'B' },
      { key: 'a2', label: 'C' },
    ];
    const out = normalizeItems(items, 3);
    expect(out.map((n) => n.key)).toEqual(['a', 'q-desc-item-1', 'a2']);
    expect(out[0].span).toBe(2);
    expect(out[1].span).toBe(1);
    expect(itemKeyOf({ key: 'k' }, 5)).toBe('k');
  });
});
