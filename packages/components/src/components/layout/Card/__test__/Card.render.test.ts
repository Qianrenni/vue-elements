// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QCard from '../Card.vue';

describe('QCard 渲染', () => {
  it('应渲染 card 根元素及 header/body/footer 三段', () => {
    const { container } = render(QCard);
    expect(container.querySelector('.card')).toBeTruthy();
    expect(container.querySelector('.card-header')).toBeTruthy();
    expect(container.querySelector('.card-body')).toBeTruthy();
    expect(container.querySelector('.card-footer')).toBeTruthy();
  });

  it('animation=true 应附加 card-animation 类', () => {
    const { container } = render(QCard, { props: { animation: true } });
    expect(container.querySelector('.card.card-animation')).toBeTruthy();
  });

  it('应渲染具名插槽内容', () => {
    const { getByText } = render(QCard, {
      slots: {
        header: '头部内容',
        default: '主体内容',
        left: '左侧',
        right: '右侧',
        footer: '底部内容',
      },
    });
    expect(getByText('头部内容')).toBeTruthy();
    expect(getByText('主体内容')).toBeTruthy();
    expect(getByText('左侧')).toBeTruthy();
    expect(getByText('右侧')).toBeTruthy();
    expect(getByText('底部内容')).toBeTruthy();
  });
});
