import { describe, expect, it } from 'vitest';

import {
  alertGlyph,
  DEFAULT_ALERT_TYPE,
  normalizeAlertType,
} from '../composable';

describe('QAlert 纯函数', () => {
  it('normalizeAlertType 缺省 info', () => {
    expect(normalizeAlertType(undefined)).toBe('info');
    expect(DEFAULT_ALERT_TYPE).toBe('info');
    expect(normalizeAlertType('success')).toBe('success');
  });

  it('alertGlyph 返回对应字符', () => {
    expect(alertGlyph('success')).toBe('✓');
    expect(alertGlyph('error')).toBe('×');
    expect(alertGlyph('warning')).toBe('!');
    expect(alertGlyph('info')).toBe('i');
  });
});
