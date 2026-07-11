import type { FormComponentProps, FormComponentEmits } from '@/types';

/**
 * Search 组件 Props
 */
export type SearchProps = FormComponentProps<string>;

/**
 * Search 组件 Emits
 */
export interface SearchEmits extends FormComponentEmits<string> {
  /** 搜索事件（Enter 键或点击图标触发） */
  (e: 'search', value: string): void;
}
