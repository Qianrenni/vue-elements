/** QCol 组件 Props（对齐 Ant Design Col） */
export interface ColProps {
  /**
   * @property span
   * @defaultValue 24
   * @description 占据栅格列数 0~24；0 表示不渲染占位宽度
   */
  span?: number;

  /**
   * @property offset
   * @defaultValue 0
   * @description 左侧偏移的栅格列数
   */
  offset?: number;

  /**
   * @property flex
   * @defaultValue 无
   * @description 自定义 flex（如 '1 1 auto' 或数字），设置后优先于 span/offset
   */
  flex?: string | number;
}
