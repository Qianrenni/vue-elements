/** 排列方向 */
export type StepsDirection = 'horizontal' | 'vertical';

/** 当前步骤状态 */
export type StepsStatus = 'process' | 'finish' | 'wait' | 'error';

/** 尺寸 */
export type StepsSize = 'default' | 'small';

/** 单个步骤项 */
export interface StepItem {
  /** 标题 */
  title: string;
  /** 可选描述 */
  description?: string;
}

/** QSteps 组件 Props（对齐 Ant Design Steps） */
export interface StepsProps {
  /**
   * @property current
   * @defaultValue 0
   * @description 当前步骤索引（从 0 开始）
   */
  current?: number;

  /**
   * @property status
   * @defaultValue 'process'
   * @description 当前步骤状态：process / finish / error
   */
  status?: StepsStatus;

  /**
   * @property direction
   * @defaultValue 'horizontal'
   * @description 排列方向：horizontal / vertical
   */
  direction?: StepsDirection;

  /**
   * @property size
   * @defaultValue 'default'
   * @description 尺寸：default / small
   */
  size?: StepsSize;

  /**
   * @property items
   * @defaultValue []
   * @description 步骤项：[{ title, description? }]
   */
  items?: StepItem[];

  /**
   * @property clickable
   * @defaultValue false
   * @description 步骤标题是否可点击（点击触发 stepClick）
   */
  clickable?: boolean;
}

/** QSteps 组件 Emits */
export interface StepsEmits {
  /**
   * @property stepClick
   * @description 点击可点击步骤标题时触发
   */
  (e: 'stepClick', index: number): void;
}
