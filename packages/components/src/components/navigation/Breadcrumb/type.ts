/** 面包屑项 */
export interface BreadcrumbItem {
  /** 显示文本 */
  title: string;
  /** 可选跳转链接 */
  href?: string;
}

/** QBreadcrumb 组件 Props（对齐 Ant Design Breadcrumb） */
export interface BreadcrumbProps {
  /**
   * @property items
   * @defaultValue []
   * @description 面包屑数据：[{ title, href? }]
   */
  items?: BreadcrumbItem[];

  /**
   * @property separator
   * @defaultValue '/'
   * @description 分隔符文本
   */
  separator?: string;
}

/** QBreadcrumb 组件 Emits */
export interface BreadcrumbEmits {
  /**
   * @property itemClick
   * @description 点击可点击项（无 href）时触发
   */
  (e: 'itemClick', item: BreadcrumbItem, index: number): void;
}
