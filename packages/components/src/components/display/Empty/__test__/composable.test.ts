import { describe, expect, it } from 'vitest';

import {
  DEFAULT_DESCRIPTION,
  isSimplePreset,
  resolveDescription,
} from '../composable';

describe('QEmpty 文案解析', () => {
  it('空/缺省回退到默认文案', () => {
    expect(resolveDescription(undefined)).toBe(DEFAULT_DESCRIPTION);
    expect(resolveDescription('')).toBe(DEFAULT_DESCRIPTION);
    expect(resolveDescription(' ')).toBe(' ');
  });

  it('传入文案原样保留', () => {
    expect(resolveDescription('还没有数据')).toBe('还没有数据');
  });
});

describe('QEmpty 预设判定', () => {
  it('simple 预设为真，其余为假', () => {
    expect(isSimplePreset('simple')).toBe(true);
    expect(isSimplePreset('default')).toBe(false);
    expect(isSimplePreset(undefined)).toBe(false);
  });
});
