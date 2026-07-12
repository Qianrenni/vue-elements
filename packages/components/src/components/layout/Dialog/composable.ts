import { computed, type ComputedRef } from 'vue';
import type { DialogProps, DialogEmits } from './type';

/**
 * Dialog 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns dialogClass、close、handleOverlayClick、handleConfirm、handleCancel
 */
export const useDialog = (
  props: DialogProps,
  emit: DialogEmits,
): {
  dialogClass: ComputedRef<(string | undefined)[]>;
  close: () => void;
  handleOverlayClick: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
} => {
  /** 对话框样式类 */
  const dialogClass = computed(() => {
    return ['dialog-wrapper', props.customClass];
  });

  /** 关闭对话框 */
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

  /** 确认 */
  const handleConfirm = (): void => {
    emit('confirm');
    close();
  };

  /** 取消 */
  const handleCancel = (): void => {
    emit('cancel');
    close();
  };

  return {
    dialogClass,
    close,
    handleOverlayClick,
    handleConfirm,
    handleCancel,
  };
};
