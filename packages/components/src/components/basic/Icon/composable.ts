/** 存储正在加载中的 SVG 请求 Promise，实现对相同图标的并发请求去重 */
const pendingRequests = new Map<string, Promise<string>>();

export const IconConfig = {
  base: '',
  setBase: function (base: string) {
    this.base = base;
  },
};

/**
 * 加载svg
 * @param icon  图标名称
 * @param width  图标宽度
 * @param height 图标高度
 * @returns SVG 内容字符串
 */
export const loadSvg = async (
  icon: string,
  width: number | string,
  height: number | string,
) => {
  const key = `Qicon-${icon}`;

  // 如果相同图标正在加载中，直接复用已有请求
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  const promise = (async () => {
    try {
      const response = await fetch(`${IconConfig.base}/assets/svg/${icon}.svg`);

      // 1. 检查 HTTP 状态是否成功
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 2. 检查 Content-Type 是否表明是 SVG
      const contentType = response.headers.get('content-type') || '';
      if (
        !contentType.includes('image/svg+xml') &&
        !contentType.includes('text/xml') &&
        !contentType.includes('application/xml')
      ) {
        // 有些服务器可能返回 text/plain，但内容仍是 SVG，所以不能仅凭 MIME 拒绝，可以继续检查内容
        // 这里记录警告，但不立即报错，留待内容检查
        console.warn(
          `Response for ${icon} has unexpected Content-Type: ${contentType}, attempting to parse as SVG anyway.`,
        );
      }

      const rawContent = await response.text();

      // 3. 检查内容是否包含 <svg 标签（忽略前导空白和 XML 声明）
      if (!/<svg[\s>]/i.test(rawContent.trim())) {
        throw new Error(
          'Response content does not appear to be SVG (no <svg tag found)',
        );
      }

      // 4. 替换并返回
      const content = rawContent.replace(
        /<svg/,
        `<svg width="${width}" height="${height}"`,
      );
      return content;
    } catch (e) {
      console.error(`Failed to load SVG "${icon}":`, e);
      return ''; // 返回空字符串，上层需要做好降级处理
    } finally {
      // 请求完成后清理记录，以便后续可以重新尝试
      pendingRequests.delete(key);
    }
  })();

  pendingRequests.set(key, promise);
  return promise;
};
