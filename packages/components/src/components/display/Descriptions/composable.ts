import { computed, type ComputedRef } from 'vue';

import type { QDescriptionItem, QDescriptionsProps } from './type';

/** 默认列数 */
export const DEFAULT_COLUMN = 3;
/** 描述项键分隔（无 key 时用索引生成的插槽名不可用，仅作 v-for key） */
export function itemKeyOf(item: QDescriptionItem, index: number): string {
  return item.key ?? `q-desc-item-${index}`;
}

/** 列数（clamp >= 1，支持缺省） */
export function normalizeColumn(column: number | undefined): number {
  const n = column ?? DEFAULT_COLUMN;
  return n >= 1 ? Math.floor(n) : 1;
}

/** 项占列数（clamp 到 1..column） */
export function normalizeSpan(item: QDescriptionItem, column: number): number {
  const s = item.span ?? 1;
  if (s < 1) return 1;
  return Math.min(Math.floor(s), column);
}

/** 归一化后的展示项（附带稳定 key 与占列） */
export interface NormalizedDescriptionItem {
  item: QDescriptionItem;
  key: string;
  span: number;
}

/** 规整描述项 */
export function normalizeItems(
  items: QDescriptionItem[] | undefined,
  column: number,
): NormalizedDescriptionItem[] {
  return (items ?? []).map((item, index) => ({
    item,
    key: itemKeyOf(item, index),
    span: normalizeSpan(item, column),
  }));
}

/** useQDescriptions 返回值 */
export interface UseQDescriptionsReturn {
  /** 展示项（含 span/key） */
  displayItems: ComputedRef<NormalizedDescriptionItem[]>;
  /** 实际列数 */
  column: ComputedRef<number>;
  /** 尺寸类 */
  sizeClass: ComputedRef<string>;
  /** 是否 vertical 布局 */
  vertical: ComputedRef<boolean>;
}

/**
 * QDescriptions 组件核心逻辑
 * @param props 组件 Props
 * @returns 展示状态
 */
export const useQDescriptions = (
  props: QDescriptionsProps,
): UseQDescriptionsReturn => {
  const column = computed(() => normalizeColumn(props.column));
  const displayItems = computed(() =>
    normalizeItems(props.items, column.value),
  );
  const sizeClass = computed(
    () => `q-descriptions-size--${props.size ?? 'middle'}`,
  );
  const vertical = computed(() => props.layout === 'vertical');
  return { displayItems, column, sizeClass, vertical };
};
