/** 单个锚点项 */
export interface AnchorItem {
  /** 目标元素 id（以 # 开头，如 '#section-1'） */
  href: string;
  /** 显示文本 */
  title: string;
  /** 可选二级锚点 */
  children?: AnchorItem[];
}

/** QAnchor 组件 Props（对齐 Ant Design Anchor） */
export interface AnchorProps {
  /**
   * @property items
   * @defaultValue []
   * @description 锚点数据：[{ href, title, children? }]
   */
  items?: AnchorItem[];

  /**
   * @property offsetTop
   * @defaultValue 0
   * @description 滚动高亮触发偏移（px）：元素顶部距视口顶部小于等于该值即判定激活
   */
  offsetTop?: number;

  /**
   * @property updateHash
   * @defaultValue true
   * @description 点击锚点时是否更新地址栏 hash
   */
  updateHash?: boolean;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用点击跳转（仅高亮）
   */
  disabled?: boolean;
}

/** QAnchor 组件 Emits */
export interface AnchorEmits {
  /**
   * @property change
   * @description 激活锚点变化时触发（参数为当前激活的 href）
   */
  (e: 'change', activeLink: string): void;

  /**
   * @property click
   * @description 点击锚点时触发
   */
  (e: 'click', item: AnchorItem): void;
}
