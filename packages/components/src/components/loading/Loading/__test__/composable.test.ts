import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';

import { useLoading } from '../composable';
import type { LoadingProps } from '../type';

describe('useLoading', () => {
  it('应该在未指定类型时默认使用 breathing 动画组件', () => {
    const props = reactive<LoadingProps>({});
    const { animationComponent } = useLoading(props);

    expect(animationComponent.value).toBeDefined();
  });

  it('应该根据类型返回对应的动画组件', () => {
    const props = reactive<LoadingProps>({ type: 'spinner' });
    const { animationComponent } = useLoading(props);
    const spinner = animationComponent.value;

    props.type = 'skeleton';
    const skeleton = animationComponent.value;

    expect(spinner).toBeDefined();
    expect(skeleton).toBeDefined();
    expect(spinner).not.toBe(skeleton);
  });

  it('应该在类型变化时响应式更新动画组件', () => {
    const props = reactive<LoadingProps>({ type: 'breathing' });
    const { animationComponent } = useLoading(props);
    const breathing = animationComponent.value;

    props.type = 'spinner';

    expect(animationComponent.value).not.toBe(breathing);
  });
});
