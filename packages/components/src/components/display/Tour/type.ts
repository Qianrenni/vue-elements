/** Tour 引导步骤 */
export interface QTourStep {
  /** 目标元素选择器（缺省居中展示） */
  target?: string;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 卡片相对目标的位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/** QTour 组件 Props */
export interface QTourProps {
  /**
   * @property open
   * @defaultValue false
   * @description 是否显示（v-model:open）
   */
  open?: boolean;
  /**
   * @property steps
   * @defaultValue []
   * @description 引导步骤
   */
  steps?: QTourStep[];
  /**
   * @property current
   * @defaultValue 0
   * @description 当前步骤索引（v-model:current）
   */
  current?: number;
  /**
   * @property maskColor
   * @defaultValue 'rgba(0, 0, 0, 0.45)'
   * @description 遮罩颜色
   */
  maskColor?: string;
  /**
   * @property closable
   * @defaultValue true
   * @description 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * @property prevText
   * @defaultValue '上一步'
   * @description 上一步文案
   */
  prevText?: string;
  /**
   * @property nextText
   * @defaultValue '下一步'
   * @description 下一步文案
   */
  nextText?: string;
  /**
   * @property onFinish
   * @defaultValue 无
   * @description 最后一步点击完成回调
   */
  onFinish?: () => void;
}

/** QTour 组件 Emits */
export interface QTourEmits {
  /**
   * @property update:open
   * @description 显示状态变化
   */
  (e: 'update:open', open: boolean): void;
  /**
   * @property update:current
   * @description 当前步骤变化
   */
  (e: 'update:current', current: number): void;
  /**
   * @property finish
   * @description 完成全部步骤
   */
  (e: 'finish'): void;
}
