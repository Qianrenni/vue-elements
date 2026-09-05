// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import { QBadge } from '../index';

describe('QBadge 渲染', () => {
  it('默认渲染数字值', () => {
    const { getByText } = render(QBadge);
    expect(getByText('1')).toBeTruthy();
  });

  it('dot 模式应渲染圆点而不显示数字', () => {
    const { container } = render(QBadge, { props: { dot: true } });
    expect(container.querySelector('.q-badge__dot')).toBeTruthy();
    expect(container.querySelector('.q-badge__count')).toBeNull();
  });

  it('数字超过 max 应显示 99+', () => {
    const { getByText } = render(QBadge, { props: { value: 150, max: 99 } });
    expect(getByText('99+')).toBeTruthy();
  });

  it('数字未超过 max 应显示原数字', () => {
    const { getByText } = render(QBadge, { props: { value: 50, max: 99 } });
    expect(getByText('50')).toBeTruthy();
  });

  it('字符串 value 超过 max 应显示 99+', () => {
    const { getByText } = render(QBadge, {
      props: { value: '120', max: 99 },
    });
    expect(getByText('99+')).toBeTruthy();
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QBadge, {
      slots: { default: '<span class="slot-target">目标</span>' },
    });
    expect(getByText('目标')).toBeTruthy();
  });

  it('type 属性应反映到徽章的 class', () => {
    const { container } = render(QBadge, {
      props: { type: 'danger', value: 5 },
    });
    expect(container.querySelector('.q-badge--danger')).toBeTruthy();
  });
});
