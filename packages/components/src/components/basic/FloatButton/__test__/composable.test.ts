import { describe, expect, it } from 'vitest';

import {
  DEFAULT_BADGE_MAX,
  DEFAULT_VISIBILITY_HEIGHT,
  resolveBadge,
} from '../composable';

describe('QFloatButton resolveBadge', () => {
  it('无 badge 时为空角标', () => {
    expect(resolveBadge(undefined)).toEqual({
      dot: false,
      text: '',
      color: undefined,
    });
  });

  it('count 正常显示', () => {
    expect(resolveBadge({ count: 5 }).text).toBe('5');
    expect(resolveBadge({ count: '3' }).text).toBe('3');
  });

  it('count 超过 max 显示 max+', () => {
    expect(resolveBadge({ count: 120 }).text).toBe(`${DEFAULT_BADGE_MAX}+`);
    expect(resolveBadge({ count: 200, max: 50 }).text).toBe('50+');
  });

  it('dot 模式优先且不显示文本', () => {
    expect(resolveBadge({ dot: true, count: 120 })).toEqual({
      dot: true,
      text: '',
      color: undefined,
    });
  });

  it('透传 color', () => {
    expect(resolveBadge({ count: 1, color: '#52c41a' }).color).toBe('#52c41a');
  });
});

describe('QFloatButton 常量', () => {
  it('默认回顶阈值 400', () => {
    expect(DEFAULT_VISIBILITY_HEIGHT).toBe(400);
  });
});
