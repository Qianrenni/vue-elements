import type { FormComponentProps, FormComponentEmits } from '@/types';

// 列定义
export interface TableColumn {
  /**
   * 列元素变量key
   * @description like {id:1}-value:'id'
   */
  value: string;
  /**
   * 列标题
   */
  label: string;
  /**
   * 列宽度
   */
  width?: string;
  /**
   * 存在order字段表示可以排序
   * @description true--升序,false--降序
   */
  order?: boolean;
}

// 支持的 selection 模式
export type SelectionMode = 'single' | 'multiple' | null;
export type Row = {
  isSelected: boolean;
  [key: string]: unknown;
};
export type FormTableModelValueRowType = Record<string, unknown>;
export type FormTableModelValueType = FormTableModelValueRowType[];

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
