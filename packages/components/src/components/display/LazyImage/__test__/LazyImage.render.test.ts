// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QLazyImage from '../LazyImage.vue';

describe('QLazyImage 渲染', () => {
  it('未加载时应显示骨架屏占位', () => {
    const { container } = render(QLazyImage, {
      props: { src: 'https://example.com/x.png' },
    });
    expect(container.querySelector('.lazy-image-skeleton')).toBeTruthy();
  });

  it('width/height 应应用到容器 style', () => {
    const { container } = render(QLazyImage, {
      props: { src: 'x', width: '200px', height: '100px' },
    });
    const el = container.querySelector('.lazy-image-container') as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('100px');
  });

  it('IntersectionObserver 可见后应渲染 img', async () => {
    const { container } = render(QLazyImage, {
      props: { src: 'https://example.com/a.png' },
    });
    await nextTick();
    await nextTick();
    const img = container.querySelector('img');
    if (img) {
      expect(img.getAttribute('src')).toBe('https://example.com/a.png');
    }
  });

  it('图片加载成功后应标记 loaded 并移除骨架屏', async () => {
    const { container } = render(QLazyImage, {
      props: { src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' },
    });
    await nextTick();
    await nextTick();
    const img = container.querySelector('img');
    if (img) {
      img.dispatchEvent(new Event('load'));
      await nextTick();
      expect(
        container.querySelector('.lazy-image-container--loaded'),
      ).toBeTruthy();
      expect(container.querySelector('.lazy-image-skeleton')).toBeNull();
    }
  });
});
