import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type {
  QButtonLevel,
  QButtonProps,
  QButtonSize,
  QButtonType,
} from './type';

/** 兼容映射：旧 size → level 档位 */
const SIZE_LEVEL_MAP: Record<QButtonSize, QButtonLevel> = {
  small: 2,
  middle: 3,
  large: 4,
};

/** useQButton 返回值接口 */
export interface UseQButtonReturn {
  /** 按钮语义类型（含默认值） */
  type: ComputedRef<QButtonType>;
  /** 兼容旧 API 的尺寸（默认 middle） */
  size: ComputedRef<QButtonSize>;
  /** 有效大小档位 1~6（默认 3）；level 优先，未传时由 size 映射 */
  level: ComputedRef<QButtonLevel>;
  /** 根元素标签：传 href 时渲染为 a，否则为 button */
  tag: ComputedRef<'button' | 'a'>;
  /** 是否处于禁用态（含 loading） */
  isDisabled: ComputedRef<boolean>;
  /** disabled prop 原始值 */
  disabledState: ComputedRef<boolean>;
  /** 是否加载中 */
  isLoading: ComputedRef<boolean>;
  /** 按钮状态修饰类 */
  buttonClass: ComputedRef<Record<string, boolean>>;
}

/**
 * QButton 组件核心逻辑
 * @param props 组件 Props
 * @returns 按钮状态类、档位与派生状态
 */
export const useQButton = (props: QButtonProps): UseQButtonReturn => {
  /** 语义类型默认值 */
  const type = computed<QButtonType>(() => props.type ?? 'default');

  /** 兼容旧 API 的尺寸默认值 */
  const size = computed<QButtonSize>(() => props.size ?? 'middle');

  /** 有效档位：level 优先，否则按 size 映射（默认 3） */
  const level = computed<QButtonLevel>(
    () => props.level ?? SIZE_LEVEL_MAP[size.value],
  );

  /** 是否禁用 */
  const disabledState = computed(() => props.disabled ?? false);

  /** 是否加载中 */
  const isLoading = computed(() => props.loading ?? false);

  /** 禁用或加载中均视为不可点击 */
  const isDisabled = computed(() => disabledState.value || isLoading.value);

  /** 根标签：提供 href 时渲染为链接，否则为原生按钮 */
  const tag = computed<'button' | 'a'>(() => (props.href ? 'a' : 'button'));

  /** 按钮修饰类，供模板绑定到 class */
  const buttonClass = computed(() => ({
    [`q-btn--${type.value}`]: true,
    [`q-btn--level-${level.value}`]: true,
    'q-btn--danger': props.danger ?? false,
    'q-btn--ghost': props.ghost ?? false,
    'q-btn--block': props.block ?? false,
    'q-btn--disabled': disabledState.value,
    'q-btn--loading': isLoading.value,
  }));

  return {
    type,
    size,
    level,
    tag,
    isDisabled,
    disabledState,
    isLoading,
    buttonClass,
  };
};
