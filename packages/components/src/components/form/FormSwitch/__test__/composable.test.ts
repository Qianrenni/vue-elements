import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormSwitch } from '../composable';
import type { FormSwitchProps } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param modelValue 初始开关状态
 * @param disabled 是否禁用
 * @returns props 与 emit 模拟函数
 */
const createSwitch = (
  modelValue: boolean,
  disabled = false,
): { props: FormSwitchProps; emit: ReturnType<typeof vi.fn> } => {
  const props: FormSwitchProps = { modelValue, disabled };
  return { props, emit: vi.fn() };
};

describe('useFormSwitch', () => {
  it('应该在切换时触发 update:modelValue 与 change 事件', () => {
    const { props, emit } = createSwitch(false);
    const { toggle } = useFormSwitch(
      props,
      emit as FormComponentEmits<boolean>,
    );

    toggle();

    expect(emit).toHaveBeenCalledWith('update:modelValue', true);
    expect(emit).toHaveBeenCalledWith('change', true);
  });

  it('应该将开启状态切换为关闭', () => {
    const { props, emit } = createSwitch(true);
    const { toggle } = useFormSwitch(
      props,
      emit as FormComponentEmits<boolean>,
    );

    toggle();

    expect(emit).toHaveBeenCalledWith('update:modelValue', false);
  });

  it('应该在禁用状态下阻止切换', () => {
    const { props, emit } = createSwitch(false, true);
    const { toggle } = useFormSwitch(
      props,
      emit as FormComponentEmits<boolean>,
    );

    toggle();

    expect(emit).not.toHaveBeenCalled();
  });
});
