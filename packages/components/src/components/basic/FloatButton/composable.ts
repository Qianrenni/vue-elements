import { computed, type ComputedRef } from 'vue';

import type {
  QFloatButtonBadge,
  QFloatButtonProps,
  QFloatButtonShape,
} from './type';

/** backTop 默认显示阈值 */
export const DEFAULT_VISIBILITY_HEIGHT = 400;

/** 角标默认计数上限 */
export const DEFAULT_BADGE_MAX = 99;

/** 角标解析结果 */
export interface QFloatButtonBadgeView {
  /** 是否展示红点（优先于数字） */
  dot: boolean;
  /** 显示文本（红点模式为空串） */
  text: string;
  /** 角标背景色（缺省使用红/主题色） */
  color: string | undefined;
}

/**
 * 解析角标显示
 * @param badge 角标配置
 */
export function resolveBadge(
  badge: QFloatButtonBadge | undefined,
): QFloatButtonBadgeView {
  if (!badge) return { dot: false, text: '', color: undefined };
  const max = badge.max ?? DEFAULT_BADGE_MAX;
  let text = '';
  if (!badge.dot && badge.count !== undefined && badge.count !== null) {
    const num = Number(badge.count);
    if (!Number.isNaN(num) && num > max) text = `${max}+`;
    else text = String(badge.count);
  }
  return { dot: !!badge.dot, text, color: badge.color };
}

/** useQFloatButton 返回值 */
export interface UseQFloatButtonReturn {
  /** 是否为链接形态 */
  isLink: ComputedRef<boolean>;
  /** 是否禁用点击 */
  isDisabled: ComputedRef<boolean>;
  /** 默认图标文本（backTop 时为 ↑） */
  defaultGlyph: ComputedRef<string>;
  /** 角标解析结果 */
  badgeView: ComputedRef<QFloatButtonBadgeView>;
  /** 尺寸档位类名（未用，占位保持一致 API） */
  shapeClass: ComputedRef<string>;
}

/**
 * QFloatButton 核心逻辑
 * @param props 组件 Props
 */
export const useQFloatButton = (
  props: QFloatButtonProps,
): UseQFloatButtonReturn => {
  const isLink = computed(() => !!props.href);
  const isDisabled = computed(() => props.disabled === true);
  const defaultGlyph = computed(() => (props.backTop ? '↑' : ''));
  const badgeView = computed(() => resolveBadge(props.badge));
  const shapeClass = computed<QFloatButtonShape>(() => props.shape ?? 'circle');
  return { isLink, isDisabled, defaultGlyph, badgeView, shapeClass };
};
