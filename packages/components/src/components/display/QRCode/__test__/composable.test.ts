import { describe, expect, it } from 'vitest';

import { buildQRPath, createQRMatrix, DEFAULT_QR_PADDING } from '../composable';

describe('QQRCode 纯函数', () => {
  it('空值返回 null，非空生成矩阵', () => {
    expect(createQRMatrix('', 'M')).toBeNull();
    expect(createQRMatrix('   ', 'M')).toBeNull();
    const m = createQRMatrix('https://example.com', 'M');
    expect(m).not.toBeNull();
    expect(m!.size).toBeGreaterThan(0);
  });

  it('buildQRPath 生成确定且非空 path', () => {
    const m = createQRMatrix('HELLO', 'H')!;
    const path = buildQRPath(m, DEFAULT_QR_PADDING);
    expect(path).toBeTruthy();
    expect(path).toContain('M');
    // 含 padding 的横向起始坐标
    expect(path).toContain(`M${DEFAULT_QR_PADDING}`);
    // 确定性
    expect(buildQRPath(m, DEFAULT_QR_PADDING)).toBe(path);
  });
});
