// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QDrawer from '../Drawer.vue';

describe('QDrawer 渲染', () => {
  it('visible=false 时容器应隐藏（display:none）', () => {
    render(QDrawer, { props: { visible: false } });
    const overlay = document.querySelector('.drawer-overlay') as HTMLElement;
    expect(overlay).toBeTruthy();
    expect(overlay.style.display).toBe('none');
  });

  it('visible=true 时容器应可见', () => {
    render(QDrawer, { props: { visible: true } });
    const overlay = document.querySelector('.drawer-overlay') as HTMLElement;
    expect(overlay.style.display).not.toBe('none');
  });

  it('title 应渲染标题文本', () => {
    const { getByText } = render(QDrawer, {
      props: { visible: true, title: '抽屉标题' },
    });
    expect(getByText('抽屉标题')).toBeTruthy();
  });

  it('direction=left/right/top/bottom 应反映到容器 class', () => {
    const { unmount: u1 } = render(QDrawer, {
      props: { visible: true, direction: 'left' },
    });
    expect(document.querySelector('.drawer-left')).toBeTruthy();
    u1();

    const { unmount: u2 } = render(QDrawer, {
      props: { visible: true, direction: 'right' },
    });
    expect(document.querySelector('.drawer-right')).toBeTruthy();
    u2();

    const { unmount: u3 } = render(QDrawer, {
      props: { visible: true, direction: 'top' },
    });
    expect(document.querySelector('.drawer-top')).toBeTruthy();
    u3();

    render(QDrawer, { props: { visible: true, direction: 'bottom' } });
    expect(document.querySelector('.drawer-bottom')).toBeTruthy();
  });

  it('overlay=true 应附加 overlay 类', () => {
    render(QDrawer, { props: { visible: true, overlay: true } });
    expect(document.querySelector('.drawer-overlay.overlay')).toBeTruthy();
  });

  it('overlay=false 应附加 bg-transparent 类', () => {
    render(QDrawer, {
      props: { visible: true, overlay: false },
    });
    expect(
      document.querySelector('.drawer-overlay.bg-transparent'),
    ).toBeTruthy();
  });

  it('点击 overlay（closeOnClickOverlay=true）应触发关闭', async () => {
    const { emitted } = render(QDrawer, {
      props: { visible: true, closeOnClickOverlay: true },
    });
    (document.querySelector('.drawer-overlay') as HTMLElement).click();
    await nextTick();
    expect(emitted('update:visible')!.at(-1)).toEqual([false]);
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QDrawer, {
      props: { visible: true },
      slots: { default: '抽屉内容' },
    });
    expect(getByText('抽屉内容')).toBeTruthy();
  });
});
