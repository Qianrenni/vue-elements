import type { FormSize } from '@/types';

/** 级联值（叶子链上的每个节点值） */
export type CascaderValue = string | number;

/** 级联候选项 */
export interface CascaderOption {
  /** 节点值（同一层级内唯一） */
  value: CascaderValue;
  /** 显示文本 */
  label: string;
  /** 子级 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为已知叶子（true 时不触发 loadData 懒加载） */
  isLeaf?: boolean;
}

/** QCascader 组件 Props（对齐 Ant Design Cascader 常用能力） */
export interface CascaderProps {
  /**
   * @property options
   * @defaultValue []
   * @description 级联数据：[{ value, label, children?, disabled?, isLeaf? }]
   */
  options?: CascaderOption[];

  /**
   * @property modelValue
   * @defaultValue 无
   * @description 选中值：从根到当前节点的 value 路径数组（支持 v-model；可为 null）
   */
  modelValue?: CascaderValue[] | null;

  /**
   * @property placeholder
   * @defaultValue '请选择'
   * @description 占位文本
   */
  placeholder?: string;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;

  /**
   * @property allowClear
   * @defaultValue true
   * @description 是否显示清空按钮
   */
  allowClear?: boolean;

  /**
   * @property separator
   * @defaultValue '/'
   * @description 路径显示分隔符
   */
  separator?: string;

  /**
   * @property changeOnSelect
   * @defaultValue false
   * @description 是否每选中一级即触发 change（缺省仅叶子选中触发）
   */
  changeOnSelect?: boolean;

  /**
   * @property showSearch
   * @defaultValue false
   * @description 是否允许搜索
   */
  showSearch?: boolean;

  /**
   * @property searchPlaceholder
   * @defaultValue '输入搜索'
   * @description 搜索框占位文本
   */
  searchPlaceholder?: string;

  /**
   * @property loadData
   * @defaultValue 无
   * @description 懒加载子级：传入当前路径选项数组；可通过返回 children 数组或直接修改传入选项的 children 提供数据
   */
  loadData?: (selectedOptions: CascaderOption[]) => unknown | Promise<unknown>;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: FormSize;
}

/** QCascader 组件 Emits */
export interface CascaderEmits {
  /**
   * @property update:modelValue
   * @description 选中路径变化时触发
   */
  (e: 'update:modelValue', value: CascaderValue[] | null): void;

  /**
   * @property change
   * @description 选中路径提交时触发
   */
  (e: 'change', value: CascaderValue[] | null): void;

  /**
   * @property select
   * @description 选中某节点（携带路径）时触发
   */
  (e: 'select', value: CascaderValue[], option: CascaderOption): void;

  /**
   * @property clear
   * @description 清空时触发
   */
  (e: 'clear'): void;
}
