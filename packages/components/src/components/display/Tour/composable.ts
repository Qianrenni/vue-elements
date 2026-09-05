/** 默认遮罩色 */
export const DEFAULT_TOUR_MASK = 'rgba(0, 0, 0, 0.45)';
/** 卡片距目标的偏移 */
export const TOUR_GAP = 10;
/** 卡片近似宽度 */
export const TOUR_CARD_WIDTH = 280;

/** 目标矩形 */
export interface TourRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

/** 四块遮罩矩形 */
export interface MaskPanes {
  top: { top: number; left: number; width: number; height: number };
  bottom: { top: number; left: number; width: number; height: number };
  left: { top: number; left: number; width: number; height: number };
  right: { top: number; left: number; width: number; height: number };
}

/**
 * 由目标矩形与视口尺寸构造四周遮罩（中间留出高亮孔）
 * @param rect 目标矩形（视口坐标）
 * @param viewport 视口宽高
 */
export function computeMaskPanes(
  rect: TourRect,
  viewport: { width: number; height: number },
): MaskPanes {
  return {
    top: {
      top: 0,
      left: 0,
      width: viewport.width,
      height: Math.max(0, rect.top),
    },
    bottom: {
      top: rect.bottom,
      left: 0,
      width: viewport.width,
      height: Math.max(0, viewport.height - rect.bottom),
    },
    left: {
      top: rect.top,
      left: 0,
      width: Math.max(0, rect.left),
      height: rect.height,
    },
    right: {
      top: rect.top,
      left: rect.right,
      width: Math.max(0, viewport.width - rect.right),
      height: rect.height,
    },
  };
}

/**
 * 计算卡片位置（默认下方，放不下则上方；横向夹在视口内）
 * @param rect 目标矩形
 * @param placement 期望位置
 * @param viewport 视口
 */
export function computeCardPos(
  rect: TourRect,
  placement: 'top' | 'bottom' | 'left' | 'right',
  viewport: { width: number; height: number },
): { top: number; left: number; flip: boolean } {
  const centerX = Math.min(
    Math.max(rect.left + rect.width / 2 - TOUR_CARD_WIDTH / 2, 12),
    viewport.width - TOUR_CARD_WIDTH - 12,
  );
  if (placement === 'top') {
    if (rect.top > TOUR_CARD_WIDTH) {
      return {
        top: rect.top - TOUR_CARD_WIDTH - TOUR_GAP,
        left: centerX,
        flip: false,
      };
    }
    return { top: rect.bottom + TOUR_GAP, left: centerX, flip: true };
  }
  if (placement === 'left' || placement === 'right') {
    const left =
      placement === 'left'
        ? Math.max(12, rect.left - TOUR_CARD_WIDTH - TOUR_GAP)
        : rect.right + TOUR_GAP;
    return {
      top: rect.top,
      left: Math.min(left, viewport.width - TOUR_CARD_WIDTH - 12),
      flip: false,
    };
  }
  // bottom
  if (rect.bottom + TOUR_CARD_WIDTH > viewport.height) {
    return {
      top: Math.max(12, rect.top - TOUR_CARD_WIDTH - TOUR_GAP),
      left: centerX,
      flip: true,
    };
  }
  return { top: rect.bottom + TOUR_GAP, left: centerX, flip: false };
}
