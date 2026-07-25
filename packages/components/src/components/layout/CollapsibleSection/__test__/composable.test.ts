import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';

import { useCollapsibleSection } from '../composable';
import type { CollapsibleSectionProps } from '../type';

describe('useCollapsibleSection', () => {
  it('应该默认处于展开状态', () => {
    const props = reactive<CollapsibleSectionProps>({});
    const { isExpanded } = useCollapsibleSection(props);

    expect(isExpanded.value).toBe(true);
  });

  it('应该根据 initialExpanded 初始化展开状态', () => {
    const props = reactive<CollapsibleSectionProps>({
      initialExpanded: false,
    });
    const { isExpanded } = useCollapsibleSection(props);

    expect(isExpanded.value).toBe(false);
  });

  it('应该支持切换展开/收起状态', () => {
    const props = reactive<CollapsibleSectionProps>({});
    const { isExpanded, toggle } = useCollapsibleSection(props);

    toggle();
    expect(isExpanded.value).toBe(false);

    toggle();
    expect(isExpanded.value).toBe(true);
  });

  it('应该支持 close 与 open 显式控制状态', () => {
    const props = reactive<CollapsibleSectionProps>({});
    const { isExpanded, close, open } = useCollapsibleSection(props);

    close();
    expect(isExpanded.value).toBe(false);

    open();
    expect(isExpanded.value).toBe(true);
  });

  it('应该根据方向计算过渡动画名称', () => {
    const props = reactive<CollapsibleSectionProps>({ direction: 'up' });
    const { transitionName } = useCollapsibleSection(props);

    expect(transitionName.value).toBe('slide-up');

    props.direction = 'left';
    expect(transitionName.value).toBe('slide-left');
  });

  it('应该在未指定方向时默认使用 slide-down', () => {
    const props = reactive<CollapsibleSectionProps>({});
    const { transitionName } = useCollapsibleSection(props);

    expect(transitionName.value).toBe('slide-down');
  });
});
