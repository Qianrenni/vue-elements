import { describe, expect, it } from 'vitest';

import {
  isHttpResult,
  normalizeResultStatus,
  RESULT_GLYPHS,
} from '../composable';

describe('QResult 纯函数', () => {
  it('normalizeResultStatus 缺省 info', () => {
    expect(normalizeResultStatus(undefined)).toBe('info');
    expect(normalizeResultStatus('success')).toBe('success');
  });

  it('HTTP 态识别与语义态字符', () => {
    expect(isHttpResult('404')).toBe(true);
    expect(isHttpResult('403')).toBe(true);
    expect(isHttpResult('500')).toBe(true);
    expect(isHttpResult('success')).toBe(false);
    expect(RESULT_GLYPHS.success).toBe('✓');
    expect(RESULT_GLYPHS.error).toBe('×');
  });
});
