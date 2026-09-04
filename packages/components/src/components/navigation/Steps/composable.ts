import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { StepsProps, StepsStatus } from './type';

/** 单步派生状态 */
export interface StepState {
  /** 状态 */
  status: StepsStatus;
  /** 是否最后一步 */
  last: boolean;
  /** 是否为当前步 */
  current: boolean;
}

/** useSteps 返回值接口 */
export interface UseStepsReturn {
  /** 每步状态 */
  steps: ComputedRef<StepState[]>;
  /** 修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
}

/**
 * QSteps 组件核心逻辑
 * @param props 组件 Props
 * @returns 每步状态与容器类
 */
export const useSteps = (props: StepsProps): UseStepsReturn => {
  /** 当前索引 */
  const current = computed(() => props.current ?? 0);

  /** 当前步状态 */
  const status = computed(() => props.status ?? 'process');

  /** 每步状态 */
  const steps = computed<StepState[]>(() => {
    const list = props.items ?? [];
    return list.map((_item, index) => {
      const isCurrent = index === current.value;
      let s: StepsStatus = 'wait';
      if (index < current.value) s = 'finish';
      else if (isCurrent)
        s = status.value === 'wait' ? 'process' : status.value;
      return { status: s, last: index === list.length - 1, current: isCurrent };
    });
  });

  /** 修饰类 */
  const classList = computed(() => ({
    [`q-steps--${props.direction ?? 'horizontal'}`]: true,
    [`q-steps--${props.size ?? 'default'}`]: true,
    'q-steps--clickable': props.clickable ?? false,
  }));

  return { steps, classList };
};
