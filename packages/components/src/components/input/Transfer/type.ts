import type { FormSize } from '@/types';

/** 穿梭项 key */
export type TransferKey = string | number;

/** 穿梭项数据 */
export interface TransferItem {
  /** 唯一标识 */
  key: TransferKey;
  /** 主标题 */
  title: string;
  /** 描述（可选） */
  description?: string;
  /** 是否禁用（不可勾选/移动） */
  disabled?: boolean;
}

/** 面板方向 */
export type TransferDirection = 'left' | 'right';

/** QTransfer 组件 Props（对齐 Ant Design Transfer 常用能力） */
export interface TransferProps {
  /**
   * @property dataSource
   * @defaultValue []
   * @description 穿梭框数据源：[{ key, title, description?, disabled? }]
   */
  dataSource?: TransferItem[];

  /**
   * @property modelValue
   * @defaultValue []
   * @description 右侧（目标）key 集合（支持 v-model）
   */
  modelValue?: TransferKey[];

  /**
   * @property titles
   * @defaultValue ['', '']
   * @description 左右面板标题
   */
  titles?: [string, string];

  /**
   * @property operations
   * @defaultValue ['', '']
   * @description 中部操作按钮文案（空串用 › / ‹ 图标）
   */
  operations?: [string, string];

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;

  /**
   * @property showSearch
   * @defaultValue false
   * @description 是否显示搜索框
   */
  showSearch?: boolean;

  /**
   * @property searchPlaceholder
   * @defaultValue ['搜索', '搜索']
   * @description 左右面板搜索占位
   */
  searchPlaceholder?: [string, string];

  /**
   * @property oneWay
   * @defaultValue false
   * @description 单向模式（禁止从右向左移回）
   */
  oneWay?: boolean;

  /**
   * @property showSelectAll
   * @defaultValue true
   * @description 是否显示全选复选框
   */
  showSelectAll?: boolean;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: FormSize;
}

/** QTransfer 组件 Emits */
export interface TransferEmits {
  /**
   * @property update:modelValue
   * @description 右侧 key 集合变化时触发
   */
  (e: 'update:modelValue', value: TransferKey[]): void;

  /**
   * @property change
   * @description 数据移动完成时触发
   */
  (
    e: 'change',
    value: TransferKey[],
    direction: TransferDirection,
    moveKeys: TransferKey[],
  ): void;
}
