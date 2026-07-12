/**
 * 导航区域数据结构
 */
export interface NavSectionProps {
  title: string;
  value?: unknown;
  children?: NavSectionProps[];
}

/**
 * 导航区域 Emits
 */
export interface NavSectionEmits {
  (e: 'select', section: NavSectionProps): void;
}
