/** 菜单方向模式 */
export type MenuMode = 'horizontal' | 'vertical' | 'inline';

/** 单个菜单项 */
export interface MenuItem {
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
  /** 是否分隔线项（此项目不渲染文本，仅分隔） */
  divider?: boolean;
  /** 子菜单（最多两级） */
  children?: MenuItem[];
}

/** QMenu 组件 Props（对齐 Ant Design Menu） */
export interface MenuProps {
  /**
   * @property items
   * @defaultValue []
   * @description 菜单数据：[{ key, label, icon?, disabled?, danger?, children? }]
   */
  items?: MenuItem[];

  /**
   * @property mode
   * @defaultValue 'inline'
   * @description 菜单方向模式：horizontal / vertical / inline
   */
  mode?: MenuMode;

  /**
   * @property selectedKeys
   * @defaultValue []
   * @description 选中项 key 集合（支持 v-model:selectedKeys）
   */
  selectedKeys?: string[];

  /**
   * @property openKeys
   * @defaultValue []
   * @description 展开的子菜单 key 集合（支持 v-model:openKeys）
   */
  openKeys?: string[];

  /**
   * @property multiple
   * @defaultValue false
   * @description 是否允许多选
   */
  multiple?: boolean;

  /**
   * @property disabled
   * @defaultValue false
   * @description 整体禁用
   */
  disabled?: boolean;
}

/** 菜单点击信息（对齐 antd MenuInfo 的子集） */
export interface MenuClickInfo {
  /** 被点击项 key */
  key: string;
  /** key 路径（从根到当前） */
  keyPath: string[];
}

/** QMenu 组件 Emits */
export interface MenuEmits {
  /**
   * @property update:selectedKeys
   * @description 选中项变化时触发
   */
  (e: 'update:selectedKeys', keys: string[]): void;

  /**
   * @property update:openKeys
   * @description 展开项变化时触发
   */
  (e: 'update:openKeys', keys: string[]): void;

  /**
   * @property click
   * @description 点击菜单项（含叶子项）时触发
   */
  (e: 'click', info: MenuClickInfo): void;

  /**
   * @property openChange
   * @description 展开状态变化时触发
   */
  (e: 'openChange', keys: string[]): void;
}
