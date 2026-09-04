import { describe, expect, it } from 'vitest';

import {
  buildDisplayItems,
  DEFAULT_DOT_COLOR,
  resolveDotColor,
  resolveItemSide,
  useTimeline,
} from '../composable';

describe('resolveDotColor', () => {
  it('预设映射 token', () => {
    expect(resolveDotColor('blue')).toBe('var(--q-color-blue-500)');
    expect(resolveDotColor('red')).toBe('var(--q-color-red-500)');
    expect(resolveDotColor('processing')).toBe('var(--q-color-primary)');
  });

  it('自定义颜色 / 缺省', () => {
    expect(resolveDotColor('#f00')).toBe('#f00');
    expect(resolveDotColor(undefined)).toBe(DEFAULT_DOT_COLOR);
  });
});

describe('resolveItemSide', () => {
  it('mode=left 内容在右；mode=right 内容在左', () => {
    expect(resolveItemSide('left', 0)).toBe('right');
    expect(resolveItemSide('right', 0)).toBe('left');
  });

  it('alternate 奇偶交替，position 覆盖', () => {
    expect(resolveItemSide('alternate', 0)).toBe('right');
    expect(resolveItemSide('alternate', 1)).toBe('left');
    expect(resolveItemSide('alternate', 2, { position: 'left' })).toBe('left');
  });
});

describe('buildDisplayItems', () => {
  const items = [{ content: 'A' }, { content: 'B' }];

  it('基本展开', () => {
    const list = buildDisplayItems(items, false, undefined);
    expect(list.map((e) => e.item.content)).toEqual(['A', 'B']);
    expect(list.every((e) => !e.pending)).toBe(true);
  });

  it('reverse 倒序', () => {
    const list = buildDisplayItems(items, true, undefined);
    expect(list.map((e) => e.item.content)).toEqual(['B', 'A']);
  });

  it('pending=true 追加幽灵条目（倒序时不参与）', () => {
    const list = buildDisplayItems(items, false, true);
    expect(list).toHaveLength(3);
    expect(list[2].pending).toBe(true);
    expect(list[2].item.content).toBe('');

    const rev = buildDisplayItems(items, true, true);
    expect(rev.map((e) => e.item.content)).toEqual(['B', 'A', '']);
  });

  it('pending 字符串作为内容', () => {
    const list = buildDisplayItems(items, false, '加载中…');
    expect(list[2].item.content).toBe('加载中…');
  });

  it('pending=false 不追加', () => {
    const list = buildDisplayItems(items, false, false);
    expect(list).toHaveLength(2);
  });
});

describe('useTimeline', () => {
  it('默认 mode=left', () => {
    const { displayItems, alternate } = useTimeline({
      items: [{ content: 'x' }, { content: 'y' }],
    });
    expect(alternate.value).toBe(false);
    expect(displayItems.value[0].side).toBe('right');
  });

  it('alternate 模式逐项交替侧', () => {
    const { displayItems, alternate, classList } = useTimeline({
      items: [{ content: 'a' }, { content: 'b' }, { content: 'c' }],
      mode: 'alternate',
    });
    expect(alternate.value).toBe(true);
    expect(displayItems.value.map((e) => e.side)).toEqual([
      'right',
      'left',
      'right',
    ]);
    expect(classList.value['q-timeline--alternate']).toBe(true);
  });

  it('pending 条目进入展示列表', () => {
    const { displayItems, classList } = useTimeline({
      items: [{ content: 'a' }],
      pending: true,
    });
    expect(displayItems.value).toHaveLength(2);
    expect(displayItems.value[1].pending).toBe(true);
    expect(classList.value['q-timeline--pending']).toBe(true);
  });
});
