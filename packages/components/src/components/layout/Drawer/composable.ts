import type { DrawerProps, DrawerEmits } from './type';

/**
 * Drawer 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns close、handleOverlayClick
 */
export const useDrawer = (
  props: DrawerProps,
  emit: DrawerEmits,
): {
  close: () => void;
  handleOverlayClick: () => void;
} => {
  /** 关闭抽屉 */
  const close = (): void => {
    emit('update:visible', false);
    emit('close');
  };

  /** 点击遮罩层 */
  const handleOverlayClick = (): void => {
    if (props.closeOnClickOverlay) {
      close();
    }
  };

  return { close, handleOverlayClick };
};
