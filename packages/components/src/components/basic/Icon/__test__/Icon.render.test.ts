// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QIcon from '../Icon.vue';

describe('QIcon 渲染', () => {
  it('应渲染容器 div', () => {
    const { container } = render(QIcon, { props: { icon: 'Sun' } });
    expect(container.querySelector('.container-center')).toBeTruthy();
  });

  it('不同 icon 名称均应渲染容器', () => {
    const { container } = render(QIcon, { props: { icon: 'Moon' } });
    expect(container.querySelector('.container-center')).toBeTruthy();
  });
});
