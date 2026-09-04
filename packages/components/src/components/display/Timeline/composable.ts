import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { TimelineItem, TimelineProps } from './type';

/** 圆点颜色预设 → token */
export const DOT_PRESET_COLORS: Record<string, string> = {
  blue: 'var(--q-color-blue-500)',
  red: 'var(--q-color-red-500)',
  green: 'var(--q-color-green-500)',
  gray: 'var(--q-color-gray-400)',
  success: 'var(--q-color-green-500)',
  error: 'var(--q-color-red-500)',
  warning: 'var(--q-color-orange-500)',
  processing: 'var(--q-color-primary)',
};

/** 默认圆点颜色 */
export const DEFAULT_DOT_COLOR = 'var(--q-color-primary)';

/**
 * 解析圆点颜色：预设名映射 token，其余视为 CSS 颜色。
 * @param color 颜色或预设
 * @returns 可用的颜色值
 */
export function resolveDotColor(color: TimelineItem['color']): string {
  if (!color) return DEFAULT_DOT_COLOR;
  return DOT_PRESET_COLORS[color] ?? color;
}

/** 展示用条目（携带派生信息） */
export interface TimelineDisplayItem {
  /** 原始条目 */
  item: TimelineItem;
  /** 是否为幽灵待定条目 */
  pending: boolean;
  /** 内容相对轴线所在侧：right = 内容在右（轴线居左） */
  side: 'left' | 'right';
}

/**
 * 计算某条目的内容侧。
 * @param mode 整体模式
 * @param index 索引
 * @param item 条目
 * @returns 'right'（内容在右）或 'left'
 */
export function resolveItemSide(
  mode: TimelineProps['mode'],
  index: number,
  item?: TimelineItem,
): 'left' | 'right' {
  if (mode === 'alternate') {
    if (item?.position) return item.position;
    return index % 2 === 0 ? 'right' : 'left';
  }
  // mode left → 轴线在左（内容在右）；mode right → 轴线在右（内容在左）
  return mode === 'right' ? 'left' : 'right';
}

/**
 * 组装最终展示列表：可选倒序 + 追加幽灵条目（始终在末尾）。
 * @param items 条目
 * @param reverse 是否倒序
 * @param pending 幽灵待定
 * @returns 展示列表
 */
export function buildDisplayItems(
  items: TimelineItem[] | undefined,
  reverse: boolean | undefined,
  pending: boolean | string | undefined,
): TimelineDisplayItem[] {
  const base = (items ?? []).map<TimelineDisplayItem>((item) => ({
    item,
    pending: false,
    side: 'right',
  }));
  const ordered = reverse ? base.slice().reverse() : base;
  const hasPending = pending !== undefined && pending !== false;
  if (!hasPending) return ordered;

  const pendingItem: TimelineDisplayItem = {
    item: { content: typeof pending === 'string' ? pending : '' },
    pending: true,
    side: 'right',
  };
  return [...ordered, pendingItem];
}

/** useTimeline 返回值接口 */
export interface UseTimelineReturn {
  /** 展示条目 */
  displayItems: ComputedRef<TimelineDisplayItem[]>;
  /** 是否 alternate 模式 */
  alternate: ComputedRef<boolean>;
  /** 容器修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
}

/**
 * QTimeline 组件核心逻辑：条目组装 + 侧向派生。
 * @param props 组件 Props
 * @returns 状态
 */
export const useTimeline = (props: TimelineProps): UseTimelineReturn => {
  const mode = computed(() => props.mode ?? 'left');
  const alternate = computed(() => mode.value === 'alternate');

  const displayItems = computed<TimelineDisplayItem[]>(() => {
    const built = buildDisplayItems(props.items, props.reverse, props.pending);
    // 逐一解析内容侧（含幽灵条目，参与 alternate 交替）
    return built.map((entry, i) => ({
      ...entry,
      side: resolveItemSide(mode.value, i, entry.item),
    }));
  });

  const classList = computed(() => ({
    'q-timeline--alternate': alternate.value,
    'q-timeline--reverse': props.reverse === true,
    'q-timeline--pending':
      props.pending !== undefined && props.pending !== false,
  }));

  return { displayItems, alternate, classList };
};
