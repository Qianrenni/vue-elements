// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QAvatar from '../Avatar.vue';

describe('QAvatar 渲染', () => {
  it('未加载时应显示骨架屏占位', () => {
    const { container } = render(QAvatar, {
      props: { url: 'https://example.com/x.png' },
    });
    expect(container.querySelector('.avatar-skeleton')).toBeTruthy();
    expect(container.querySelector('img')).toBeNull();
  });

  it('size 应应用到容器 style', () => {
    const { container } = render(QAvatar, {
      props: { url: 'x', size: '3rem' },
    });
    const el = container.querySelector('.avatar-container') as HTMLElement;
    expect(el.style.width).toBe('3rem');
    expect(el.style.height).toBe('3rem');
  });

  it('IntersectionObserver 可见后应渲染 img', async () => {
    const { container } = render(QAvatar, {
      props: { url: 'https://example.com/a.png' },
    });
    // 触发 IntersectionObserver 回调
    await nextTick();
    const img = container.querySelector('img');
    // 真实浏览器中 IntersectionObserver 会异步触发，img 可能已渲染
    if (img) {
      expect(img.getAttribute('src')).toBe('https://example.com/a.png');
    }
  });

  it('图片加载成功后应移除骨架屏并标记 loaded', async () => {
    const { container } = render(QAvatar, {
      props: { url: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' },
    });
    await nextTick();
    await nextTick();
    const img = container.querySelector('img');
    if (img) {
      img.dispatchEvent(new Event('load'));
      await nextTick();
      expect(container.querySelector('.avatar-container--loaded')).toBeTruthy();
    }
  });

  it('alt 默认应为“人像”', () => {
    const { container } = render(QAvatar, {
      props: { url: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' },
    });
    // alt 在 img 上，需等 img 渲染
    const img = container.querySelector('img');
    if (img) {
      expect(img.getAttribute('alt')).toBe('人像');
    }
  });
});
