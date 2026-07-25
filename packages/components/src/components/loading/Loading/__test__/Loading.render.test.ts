// @vitest-environment browser
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';

import QLoading from '../Loading.vue';

describe('QLoading 渲染', () => {
  it('show=true 默认应渲染 breathing 动画', async () => {
    const { container } = render(QLoading);
    // 动画组件为 defineAsyncComponent，需等待动态 import 完成
    await vi.dynamicImportSettled();
    expect(container.querySelector('.loader-dots')).toBeTruthy();
  });

  it('type=spinner 应渲染 spinner 动画', async () => {
    const { container } = render(QLoading, { props: { type: 'spinner' } });
    await vi.dynamicImportSettled();
    expect(container.querySelector('.spinner')).toBeTruthy();
  });

  it('type=skeleton 应渲染 skeleton 动画', async () => {
    const { container } = render(QLoading, { props: { type: 'skeleton' } });
    await vi.dynamicImportSettled();
    expect(container.querySelector('.loader-skeleton')).toBeTruthy();
  });

  it('text 应渲染提示文字', () => {
    const { getByText } = render(QLoading, {
      props: { text: '加载中...' },
    });
    expect(getByText('加载中...')).toBeTruthy();
  });

  it('show=false 时不应渲染', () => {
    const { container } = render(QLoading, { props: { show: false } });
    expect(container.querySelector('.loader-dots')).toBeNull();
  });
});
