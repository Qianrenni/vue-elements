import { describe, expect, it } from 'vitest';

import { usePopContainer } from '../composable';
import type { PopContainerProps } from '../type';

describe('usePopContainer', () => {
  it('应该在 hoverShow 为 true 时添加 hover-show 类', () => {
    const props: PopContainerProps = { hoverShow: true };
    const { popClass } = usePopContainer(props);

    expect(popClass.value['hover-show']).toBe(true);
  });

  it('应该在 hoverShow 为 false 时不移除 hover-show 类', () => {
    const props: PopContainerProps = { hoverShow: false };
    const { popClass } = usePopContainer(props);

    expect(popClass.value['hover-show']).toBe(false);
  });

  it('应该在 visible 为 true 时添加 visible 类', () => {
    const props: PopContainerProps = { visible: true };
    const { popClass } = usePopContainer(props);

    expect(popClass.value['visible']).toBe(true);
  });

  it('应该在 visible 为 false 时不移除 visible 类', () => {
    const props: PopContainerProps = { visible: false };
    const { popClass } = usePopContainer(props);

    expect(popClass.value['visible']).toBe(false);
  });

  it('应该根据 position 添加对应的定位类', () => {
    const props: PopContainerProps = { position: 'top-left' };
    const { popClass } = usePopContainer(props);

    expect(popClass.value['top-left']).toBe(true);
  });

  it('应该在 position 未传入时使用默认 bottom-center', () => {
    const props: PopContainerProps = {};
    const { popClass } = usePopContainer(props);

    expect(popClass.value['bottom-center']).toBe(true);
  });
});
