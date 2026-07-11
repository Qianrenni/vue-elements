/**
 * Pagination 组件 Props
 */
export interface PaginationProps {
  /** 当前页码 */
  currentPage: number;
  /** 总页数 */
  totalPages: number;
}

/**
 * Pagination 组件 Emits
 */
export interface PaginationEmits {
  /** 页码变化时触发 */
  (e: 'change', page: number): void;
  /** 支持 v-model:currentPage 双向绑定 */
  (e: 'update:currentPage', value: number): void;
}
