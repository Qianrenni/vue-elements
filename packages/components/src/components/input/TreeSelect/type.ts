/** 树选择节点 */
export interface TreeSelectItem {
  /** 节点值（唯一） */
  value: string | number;
  /** 显示文本 */
  label: string;
  /** 子节点 */
  children?: TreeSelectItem[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选中（默认叶子或未禁用节点均可；false 强制不可选中） */
  selectable?: boolean;
}

/** QTreeSelect 组件 Props（对齐 Ant Design TreeSelect 常用能力） */
export interface TreeSelectProps {
  /**
   * @property items
   * @defaultValue []
   * @description 树数据：[{ value, label, children? }]
   */
  items?: TreeSelectItem[];

  /**
   * @property modelValue
   * @defaultValue undefined
   * @description 选中值（支持 v-model）
   */
  modelValue?: string | number | null;

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
   * @property expandAll
   * @defaultValue true
   * @description 初始是否展开全部含子节点
   */
  expandAll?: boolean;
}

/** QTreeSelect 组件 Emits */
export interface TreeSelectEmits {
  /**
   * @property update:modelValue
   * @description 选中值变化时触发
   */
  (e: 'update:modelValue', value: string | number | null): void;

  /**
   * @property change
   * @description 选中值提交变化时触发
   */
  (e: 'change', value: string | number | null): void;

  /**
   * @property select
   * @description 选中某节点时触发
   */
  (e: 'select', item: TreeSelectItem): void;
}
