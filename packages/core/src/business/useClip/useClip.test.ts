import { clipString } from '@/business/useClip/useClip';
import { describe, expect, it } from 'vitest';

describe('clipString', () => {
  it('应该在文本长度超过限制时截断并添加省略号', () => {
    expect(clipString('hello world', 5)).toBe('hello...');
  });

  it('应该在文本长度未超过限制时返回完整文本', () => {
    expect(clipString('hello', 10)).toBe('hello');
  });

  it('应该在不使用省略号时仅截断不添加后缀', () => {
    expect(clipString('hello world', 5, false)).toBe('hello');
  });

  it('应该处理空字符串', () => {
    expect(clipString('', 5)).toBe('');
  });
});
