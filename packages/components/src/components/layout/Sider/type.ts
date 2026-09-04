/** Sider 主题 */
export type SiderTheme = 'light' | 'dark';

/** QSider 组件 Props（对齐 Ant Design Layout.Sider） */
export interface SiderProps {
  /**
   * @property width
   * @defaultValue 200
   * @description 侧边栏宽度（px）
   */
  width?: number;

  /**
   * @property collapsedWidth
   * @defaultValue 80
   * @description 折叠后宽度（px）
   */
  collapsedWidth?: number;

  /**
   * @property collapsible
   * @defaultValue false
   * @description 是否可折叠（显示折叠触发按钮）
   */
  collapsible?: boolean;

  /**
   * @property collapsed
   * @defaultValue false
   * @description 折叠状态（支持 v-model:collapsed）
   */
  collapsed?: boolean;

  /**
   * @property theme
   * @defaultValue 'dark'
   * @description 主题：dark / light
   */
  theme?: SiderTheme;

  /**
   * @property trigger
   * @defaultValue '底部折叠按钮'
   * @description 自定义折叠触发器内容；传 null/undefined 时显示默认箭头
   */
  trigger?: unknown;
}

/** QSider 组件 Emits */
export interface SiderEmits {
  /**
   * @property update:collapsed
   * @description 折叠状态变化时触发
   */
  (e: 'update:collapsed', collapsed: boolean): void;

  /**
   * @property collapse
   * @description 折叠状态变化时触发（对齐 antd onCollapse）
   */
  (
    e: 'collapse',
    collapsed: boolean,
    type: 'clickTrigger' | 'responsive',
  ): void;
}
