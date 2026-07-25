// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QPopContainer from '../PopContainer.vue';

describe('QPopContainer 渲染', () => {
  it('应渲染默认插槽与 pop 插槽', () => {
    const { getByText } = render(QPopContainer, {
      slots: { default: '触发元素', pop: '弹出内容' },
    });
    expect(getByText('触发元素')).toBeTruthy();
    expect(getByText('弹出内容')).toBeTruthy();
  });

  it('position 应反映到 pop-content 的 class', () => {
    const { container } = render(QPopContainer, {
      props: { position: 'top-center' },
      slots: { default: 'x', pop: 'y' },
    });
    expect(container.querySelector('.pop-content.top-center')).toBeTruthy();
  });

  it('visible=true 时 pop-content 应含 visible 类', () => {
    const { container } = render(QPopContainer, {
      props: { visible: true },
      slots: { default: 'x', pop: 'y' },
    });
    expect(container.querySelector('.pop-content.visible')).toBeTruthy();
  });

  it('hoverShow=true 时 pop-content 应含 hover-show 类', () => {
    const { container } = render(QPopContainer, {
      props: { hoverShow: true },
      slots: { default: 'x', pop: 'y' },
    });
    expect(container.querySelector('.pop-content.hover-show')).toBeTruthy();
  });

  it('默认无 visible/hover-show 时 pop-content 不含这两个类', () => {
    const { container } = render(QPopContainer, {
      slots: { default: 'x', pop: 'y' },
    });
    const pop = container.querySelector('.pop-content')!;
    expect(pop.classList.contains('visible')).toBe(false);
    expect(pop.classList.contains('hover-show')).toBe(false);
  });
});
