import type { FormComponentEmits, FormComponentProps } from '@/types';

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

/**
 * 表格行类型：外部数据行 T 附加内部选中状态 isSelected
 * @typeParam T 外部传入的数据行类型，默认 Record<string, unknown>
 */
export type Row<T = Record<string, unknown>> = T & {
  isSelected: boolean;
};

/**
 * 表格数据行类型
 * @typeParam T 外部传入的数据行类型，默认 Record<string, unknown>
 */
export type FormTableModelValueRowType<T = Record<string, unknown>> = T;

/**
 * 表格数据 / 选中值类型（行数组）
 * @typeParam T 外部传入的数据行类型，默认 Record<string, unknown>
 */
export type FormTableModelValueType<T = Record<string, unknown>> = T[];

/**
 * FormTable 组件 Props
 * @typeParam T 外部传入的数据行类型，通过 data 推断，默认 Record<string, unknown>
 */
export interface FormTableProps<
  T = Record<string, unknown>,
> extends FormComponentProps<FormTableModelValueType<T>> {
  /**
   * 表格数据
   */
  data: T[];
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
  /**
   * 行唯一标识：字段名或取值函数
   * @description 提供后用作行 v-for 的 key，提升排序/分页下的 DOM 复用稳定性；
   * 未提供时回退使用行索引（向后兼容）
   */
  rowKey?: string | ((row: T) => string | number);
}

/**
 * FormTable 组件 Emits
 * @typeParam T 外部传入的数据行类型，默认 Record<string, unknown>
 */
export interface FormTableEmits<
  T = Record<string, unknown>,
> extends FormComponentEmits<FormTableModelValueType<T>> {
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
