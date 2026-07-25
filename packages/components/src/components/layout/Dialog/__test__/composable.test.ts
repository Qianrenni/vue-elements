import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

import { useDialog } from '../composable';
import type { DialogEmits, DialogProps } from '../type';

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需要覆盖的 Props 属性
 * @returns props 与 emit 模拟函数
 */
const createDialog = (
  overrides: Partial<DialogProps> = {},
): { props: DialogProps; emit: ReturnType<typeof vi.fn> } => {
  const props = reactive<DialogProps>({ visible: true, ...overrides });
  return { props, emit: vi.fn() };
};

describe('useDialog', () => {
  it('应该计算包含自定义类名的对话框样式类', () => {
    const { props, emit } = createDialog({ customClass: 'my-dialog' });
    const { dialogClass } = useDialog(props, emit as DialogEmits);

    expect(dialogClass.value).toEqual(['dialog-wrapper', 'my-dialog']);
  });

  it('应该在关闭时触发 update:visible 与 close 事件', () => {
    const { props, emit } = createDialog();
    const { close } = useDialog(props, emit as DialogEmits);

    close();

    expect(emit).toHaveBeenCalledWith('update:visible', false);
    expect(emit).toHaveBeenCalledWith('close');
  });

  it('应该在允许点击遮罩关闭时点击遮罩触发关闭', () => {
    const { props, emit } = createDialog({ closeOnClickOverlay: true });
    const { handleOverlayClick } = useDialog(props, emit as DialogEmits);

    handleOverlayClick();

    expect(emit).toHaveBeenCalledWith('update:visible', false);
    expect(emit).toHaveBeenCalledWith('close');
  });

  it('应该在禁止点击遮罩关闭时点击遮罩不触发事件', () => {
    const { props, emit } = createDialog({ closeOnClickOverlay: false });
    const { handleOverlayClick } = useDialog(props, emit as DialogEmits);

    handleOverlayClick();

    expect(emit).not.toHaveBeenCalled();
  });

  it('应该在确认时触发 confirm 事件并关闭', () => {
    const { props, emit } = createDialog();
    const { handleConfirm } = useDialog(props, emit as DialogEmits);

    handleConfirm();

    expect(emit).toHaveBeenCalledWith('confirm');
    expect(emit).toHaveBeenCalledWith('update:visible', false);
  });

  it('应该在取消时触发 cancel 事件并关闭', () => {
    const { props, emit } = createDialog();
    const { handleCancel } = useDialog(props, emit as DialogEmits);

    handleCancel();

    expect(emit).toHaveBeenCalledWith('cancel');
    expect(emit).toHaveBeenCalledWith('update:visible', false);
  });
});
