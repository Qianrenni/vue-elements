/**
 * MarkdownRender 组件 Props
 */
export interface MarkdownRenderProps {
  /** Markdown 原始内容 */
  content: string;
  /** 是否显示复制按钮，默认 true */
  showCopy?: boolean;
  /** 是否显示悬浮目录，默认 false */
  showToc?: boolean;
}

/**
 * 目录项
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}
