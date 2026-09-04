/** 下拉触发方式 */
export type DropdownTrigger = 'hover' | 'click';

/** 弹出位置（水平对齐） */
export type DropdownPlacement =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight';

/** 单个下拉菜单项 */
export interface DropdownItem {
  /** 唯一标识 */
  key: string;
  /** 显示文本 */
  label: string;
  /** 图标名（QIcon 的 icon 名，可选） */
  icon?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否危险项（红色文本） */
  danger?: boolean;
  /** 是否分隔线项 */
  divider?: boolean;
}

/** QDropdown 组件 Props（对齐 Ant Design Dropdown 常用能力） */
export interface DropdownProps {
  /**
   * @property items
   * @defaultValue []
   * @description 菜单数据：[{ key, label, icon?, disabled?, danger?, divider? }]
   */
  items?: DropdownItem[];

  /**
   * @property trigger
   * @defaultValue 'hover'
   * @description 触发方式：hover / click
   */
  trigger?: DropdownTrigger;

  /**
   * @property placement
   * @defaultValue 'bottomLeft'
   * @description 弹出位置：bottomLeft / bottomRight / topLeft / topRight
   */
  placement?: DropdownPlacement;

  /**
   * @property open
   * @defaultValue undefined
   * @description 展开状态（支持 v-model:open；缺省为非受控）
   */
  open?: boolean;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;
}

/** QDropdown 组件 Emits */
export interface DropdownEmits {
  /**
   * @property update:open
   * @description 展开状态变化时触发
   */
  (e: 'update:open', open: boolean): void;

  /**
   * @property select
   * @description 点击菜单项时触发
   */
  (e: 'select', item: DropdownItem): void;
}
