import { describe, expect, it } from 'vitest';

import { DEFAULT_CANCEL_TEXT, DEFAULT_OK_TEXT } from '../composable';

describe('QPopconfirm 常量', () => {
  it('默认文案', () => {
    expect(DEFAULT_OK_TEXT).toBe('确定');
    expect(DEFAULT_CANCEL_TEXT).toBe('取消');
  });
});
