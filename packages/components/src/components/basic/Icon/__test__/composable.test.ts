import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { IconConfig, loadSvg } from '../composable';

/**
 * 创建模拟的 fetch Response 对象
 * @param body 响应体文本
 * @param ok HTTP 状态是否成功
 * @param contentType 响应的 Content-Type
 * @returns 模拟的 Response 对象
 */
const createResponse = (
  body: string,
  ok = true,
  contentType = 'image/svg+xml',
): Response =>
  ({
    ok,
    status: ok ? 200 : 404,
    statusText: ok ? 'OK' : 'Not Found',
    headers: { get: () => contentType },
    text: () => Promise.resolve(body),
  }) as unknown as Response;

describe('loadSvg', () => {
  beforeEach(() => {
    // 静默源码中的 console 输出，避免污染测试报告
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    IconConfig.setBase('');
  });

  it('应该加载 SVG 并注入宽高属性', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(createResponse('<svg viewBox="0 0 24 24"></svg>'));
    vi.stubGlobal('fetch', fetchMock);

    const content = await loadSvg('home', 16, 24);

    expect(fetchMock).toHaveBeenCalledWith('/assets/svg/home.svg');
    expect(content).toBe(
      '<svg width="16" height="24" viewBox="0 0 24 24"></svg>',
    );
  });

  it('应该使用 IconConfig.base 拼接请求地址', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse('<svg></svg>'));
    vi.stubGlobal('fetch', fetchMock);
    IconConfig.setBase('https://cdn.example.com');

    await loadSvg('user', 16, 16);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cdn.example.com/assets/svg/user.svg',
    );
  });

  it('应该在 HTTP 状态失败时返回空字符串', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(createResponse('not found', false)),
    );

    const content = await loadSvg('missing', 16, 16);

    expect(content).toBe('');
  });

  it('应该在响应内容不是 SVG 时返回空字符串', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(createResponse('<html></html>')),
    );

    const content = await loadSvg('bad-content', 16, 16);

    expect(content).toBe('');
  });

  it('应该在网络异常时返回空字符串', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network error')),
    );

    const content = await loadSvg('offline', 16, 16);

    expect(content).toBe('');
  });

  it('应该对相同图标的并发请求去重', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse('<svg></svg>'));
    vi.stubGlobal('fetch', fetchMock);

    const [first, second] = await Promise.all([
      loadSvg('dup', 16, 16),
      loadSvg('dup', 32, 32),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    // 复用同一个 Promise，两次结果一致（宽高取首个请求）
    expect(first).toBe(second);
  });

  it('应该在请求完成后清理缓存以支持重新加载', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse('<svg></svg>'));
    vi.stubGlobal('fetch', fetchMock);

    await loadSvg('reload', 16, 16);
    await loadSvg('reload', 16, 16);

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
