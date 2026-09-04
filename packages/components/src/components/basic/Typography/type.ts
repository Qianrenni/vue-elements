/** 语义类型（对齐 Ant Design Typography 的 type） */
export type QTypographyType = 'secondary' | 'success' | 'warning' | 'danger';

/** 标题层级 */
export type QTypographyLevel = 1 | 2 | 3 | 4 | 5;

/** QTypography 组件 Props（单组件覆盖 Text / Title / Paragraph 用法） */
export interface QTypographyProps {
  /**
   * @property level
   * @defaultValue 无
   * @description 以标题渲染并指定层级 1~5，根标签为 h1~h5
   */
  level?: QTypographyLevel;

  /**
   * @property paragraph
   * @defaultValue false
   * @description 是否以段落渲染（根标签为 p）
   */
  paragraph?: boolean;

  /**
   * @property tag
   * @defaultValue 无
   * @description 自定义根标签名（span/div/strong…），优先级高于 level/paragraph
   */
  tag?: string;

  /**
   * @property type
   * @defaultValue 无
   * @description 语义颜色：secondary / success / warning / danger
   */
  type?: QTypographyType;

  /**
   * @property disabled
   * @defaultValue false
   * @description 弱化显示（置灰）
   */
  disabled?: boolean;

  /**
   * @property strong
   * @defaultValue false
   * @description 是否加粗
   */
  strong?: boolean;

  /**
   * @property italic
   * @defaultValue false
   * @description 是否斜体
   */
  italic?: boolean;

  /**
   * @property underline
   * @defaultValue false
   * @description 是否加下划线
   */
  underline?: boolean;

  /**
   * @property delete
   * @defaultValue false
   * @description 是否加删除线
   */
  delete?: boolean;

  /**
   * @property mark
   * @defaultValue false
   * @description 是否高亮标记（背景色）
   */
  mark?: boolean;

  /**
   * @property code
   * @defaultValue false
   * @description 是否以行内代码样式渲染
   */
  code?: boolean;

  /**
   * @property keyboard
   * @defaultValue false
   * @description 是否以键盘按键样式渲染
   */
  keyboard?: boolean;

  /**
   * @property ellipsis
   * @defaultValue false
   * @description 溢出省略：true 单行省略；数字表示最多行数（多行截断）
   */
  ellipsis?: boolean | number;

  /**
   * @property copyable
   * @defaultValue false
   * @description 是否显示复制按钮，点击复制文本内容
   */
  copyable?: boolean;

  /**
   * @property editable
   * @defaultValue false
   * @description 是否可编辑：点击编辑图标进入编辑态，保存时触发 change
   */
  editable?: boolean;

  /**
   * @property copyText
   * @defaultValue 无
   * @description 复制内容；缺省时复制元素文本
   */
  copyText?: string;
}

/** QTypography 组件 Emits */
export interface QTypographyEmits {
  /**
   * @property copy
   * @description 复制成功后触发
   */
  (e: 'copy'): void;

  /**
   * @property change
   * @description 编辑保存后触发，参数为编辑后的文本
   */
  (e: 'change', value: string): void;
}
