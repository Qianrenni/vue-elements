import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

import { useDrawer } from '../composable';
import type { DrawerEmits, DrawerProps } from '../type';

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需要覆盖的 Props 属性
 * @returns props 与 emit 模拟函数
 */
const createDrawer = (
  overrides: Partial<DrawerProps> = {},
): { props: DrawerProps; emit: ReturnType<typeof vi.fn> } => {
  const props = reactive<DrawerProps>({ visible: true, ...overrides });
  return { props, emit: vi.fn() };
};

describe('useDrawer', () => {
  it('应该在关闭时触发 update:visible 与 close 事件', () => {
    const { props, emit } = createDrawer();
    const { close } = useDrawer(props, emit as DrawerEmits);

    close();

    expect(emit).toHaveBeenCalledWith('update:visible', false);
    expect(emit).toHaveBeenCalledWith('close');
  });

  it('应该在允许点击遮罩关闭时点击遮罩触发关闭', () => {
    const { props, emit } = createDrawer({ closeOnClickOverlay: true });
    const { handleOverlayClick } = useDrawer(props, emit as DrawerEmits);

    handleOverlayClick();

    expect(emit).toHaveBeenCalledWith('update:visible', false);
    expect(emit).toHaveBeenCalledWith('close');
  });

  it('应该在禁止点击遮罩关闭时点击遮罩不触发事件', () => {
    const { props, emit } = createDrawer({ closeOnClickOverlay: false });
    const { handleOverlayClick } = useDrawer(props, emit as DrawerEmits);

    handleOverlayClick();

    expect(emit).not.toHaveBeenCalled();
  });
});
