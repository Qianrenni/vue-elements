import type {
  FormComponentProps,
  FormComponentEmits,
  FormTableModelValueType,
  TableColumn,
  SelectionMode,
} from '@/types';

/**
 * FormTable 组件 Props
 */
export interface FormTableProps extends FormComponentProps<FormTableModelValueType> {
  /**
   * 表格数据
   */
  data: Record<string, unknown>[];
  /**
   * 列配置
   */
  columns: TableColumn[];
  /**
   * 是否可选择行
   */
  selectable?: boolean;
  /**
   * 选择模式：单选 / 多选
   */
  selectionMode?: SelectionMode;
  /**
   * 是否启用分页
   */
  pagination?: boolean;
  /**
   * 每页显示的行数
   */
  pageSize?: number;
  /**
   * 显示的页码数量
   */
  maxVisiblePages?: number;
}

/**
 * FormTable 组件 Emits
 */
export interface FormTableEmits extends FormComponentEmits<
  Record<string, unknown>[]
> {
  /** 页码变化时触发 */
  (e: 'page-change', value: number): void;
  /** 列排序配置变化时触发 */
  (e: 'update:columns', value: TableColumn[]): void;
}

/** 排序图标尺寸映射 */
export const ICON_SIZE: Record<string, string> = {
  small: '14',
  middle: '18',
  large: '22',
};
