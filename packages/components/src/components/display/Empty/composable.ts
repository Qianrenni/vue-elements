import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { EmptyPreset, EmptyProps } from './type';

/** 默认描述文案 */
export const DEFAULT_DESCRIPTION = '暂无数据';

/**
 * 解析描述文案：为空时回退到默认文案。
 * @param description 传入描述
 * @returns 最终展示文案
 */
export function resolveDescription(description: string | undefined): string {
  return description === undefined || description === ''
    ? DEFAULT_DESCRIPTION
    : description;
}

/**
 * 判定是否使用简洁预设。
 * @param preset 预设名
 * @returns true = simple 预设
 */
export function isSimplePreset(preset: EmptyPreset | undefined): boolean {
  return preset === 'simple';
}

/** useEmpty 返回值接口 */
export interface UseEmptyReturn {
  /** 是否简洁预设 */
  simple: ComputedRef<boolean>;
  /** 展示文案 */
  description: ComputedRef<string>;
  /** 是否有底部操作区（默认插槽） */
  hasFooter: ComputedRef<boolean>;
  /** 是否渲染描述（description 或 description 插槽存在） */
  hasDescription: ComputedRef<boolean>;
}

/**
 * QEmpty 组件核心逻辑。
 * @param props 组件 Props
 * @param slots 组件插槽（用于感知插槽是否提供）
 * @returns 状态
 */
export const useEmpty = (
  props: EmptyProps,
  slots: Record<string, unknown>,
): UseEmptyReturn => {
  const simple = computed(() => isSimplePreset(props.preset));

  const description = computed(() => resolveDescription(props.description));

  const hasFooter = computed(() => Boolean(slots.default));

  const hasDescription = computed(() => {
    if (slots.description) return true;
    return description.value !== '';
  });

  return { simple, description, hasFooter, hasDescription };
};
