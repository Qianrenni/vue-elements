import { describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

import { useNavSection } from '../composable';
import type { NavSectionEmits, NavSectionProps } from '../type';

/**
 * 创建测试用的导航数据
 * @returns 两层结构的导航项数组
 */
const createSections = (): NavSectionProps[] => [
  {
    title: '一级菜单一',
    children: [{ title: '二级菜单一', children: [] }],
  },
  { title: '一级菜单二', children: [] },
];

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @returns props 与 emit 模拟函数
 */
const createNav = (): {
  props: { sections: NavSectionProps[]; title: string };
  emit: ReturnType<typeof vi.fn>;
} => {
  const props = reactive({ sections: createSections(), title: '根标题' });
  return { props, emit: vi.fn() };
};

describe('useNavSection', () => {
  it('应该初始化栈为根层级并展示传入的菜单项', () => {
    const { props, emit } = createNav();
    const { stack, currentSections, currentLevelTitle } = useNavSection(
      props,
      emit as NavSectionEmits,
    );

    expect(stack.value).toHaveLength(1);
    expect(currentSections.value).toHaveLength(2);
    expect(currentLevelTitle.value).toBe('根标题');
  });

  it('应该在进入子层级时入栈并更新标题与菜单项', () => {
    const { props, emit } = createNav();
    const { activeId, currentSections, currentLevelTitle, enterSubLevel } =
      useNavSection(props, emit as NavSectionEmits);

    enterSubLevel(props.sections[0], 0);

    expect(currentLevelTitle.value).toBe('一级菜单一');
    expect(currentSections.value).toHaveLength(1);
    expect(activeId.value).toBe(0);
  });

  it('应该在返回上一层级时出栈并恢复根菜单', () => {
    const { props, emit } = createNav();
    const { stack, currentSections, goBack, enterSubLevel } = useNavSection(
      props,
      emit as NavSectionEmits,
    );

    enterSubLevel(props.sections[0], 0);
    goBack();

    expect(stack.value).toHaveLength(1);
    expect(currentSections.value).toHaveLength(2);
  });

  it('应该在根层级调用返回时保持栈不变', () => {
    const { props, emit } = createNav();
    const { stack, goBack } = useNavSection(props, emit as NavSectionEmits);

    goBack();

    expect(stack.value).toHaveLength(1);
  });

  it('应该在标记选中项时更新 activeId 并触发 select 事件', () => {
    const { props, emit } = createNav();
    const { activeId, markActive } = useNavSection(
      props,
      emit as NavSectionEmits,
    );

    markActive(props.sections[1], 1);

    expect(activeId.value).toBe(1);
    expect(emit).toHaveBeenCalledWith('select', props.sections[1]);
  });

  it('应该在 sections 变化时重置栈与选中状态', async () => {
    const { props, emit } = createNav();
    const { stack, activeId, enterSubLevel } = useNavSection(
      props,
      emit as NavSectionEmits,
    );

    enterSubLevel(props.sections[0], 0);
    props.sections = [{ title: '新菜单', children: [] }];
    await nextTick();

    expect(stack.value).toHaveLength(1);
    expect(stack.value[0].children).toHaveLength(1);
    expect(activeId.value).toBeNull();
  });

  it('应该在栈为空时使用原始的 props.sections 作为当前菜单', () => {
    const { props, emit } = createNav();
    const { stack, currentSections } = useNavSection(
      props,
      emit as NavSectionEmits,
    );

    stack.value = [];

    expect(currentSections.value).toBe(props.sections);
  });
});
