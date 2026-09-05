import QRCode from 'qrcode';
import { computed, type ComputedRef } from 'vue';

import type { QQRCodeErrorLevel, QQRCodeProps } from './type';

/** 默认尺寸 */
export const DEFAULT_QR_SIZE = 160;
/** 默认边距（模块数） */
export const DEFAULT_QR_PADDING = 4;

/** 二维码矩阵读取接口 */
export interface QRMatrix {
  size: number;
  get: (row: number, col: number) => boolean;
}

/** 生成二维码矩阵（空值返回 null） */
export function createQRMatrix(
  value: string,
  errorLevel: QQRCodeErrorLevel,
): QRMatrix | null {
  const text = (value ?? '').trim();
  if (!text) return null;
  const created = QRCode.create(text, { errorCorrectionLevel: errorLevel });
  const modules = created.modules as unknown as QRMatrix;
  return modules;
}

/** 将矩阵深色模块合成为一条 path d（水平段合并，体积小且确定性强） */
export function buildQRPath(modules: QRMatrix, padding: number): string {
  const size = modules.size;
  const parts: string[] = [];
  for (let y = 0; y < size; y++) {
    let x = 0;
    while (x < size) {
      if (!modules.get(y, x)) {
        x++;
        continue;
      }
      const startX = x;
      while (x < size && modules.get(y, x)) x++;
      const px = padding + startX;
      const width = x - startX;
      parts.push(`M${px} ${padding + y}h${width}v1h-${width}z`);
    }
  }
  return parts.join('');
}

/** useQQRCode 返回值 */
export interface UseQQRCodeReturn {
  /** 矩阵（空值 null） */
  modules: ComputedRef<QRMatrix | null>;
  /** 深色模块 path（viewBox 坐标，含 padding 偏移） */
  pathD: ComputedRef<string>;
  /** 含边距的总模块数（viewBox 尺寸） */
  viewSize: ComputedRef<number>;
  /** 实际渲染像素尺寸 */
  pixelSize: ComputedRef<number>;
  /** 中心图标是否展示 */
  hasIcon: ComputedRef<boolean>;
  /** 图标尺寸 */
  iconPixel: ComputedRef<number>;
  /** 图标中心左上坐标（模块坐标，白底方块） */
  iconBox: ComputedRef<{ x: number; y: number; w: number }>;
}

/**
 * QQRCode 组件核心逻辑
 * @param props 组件 Props
 * @returns 矩阵 / path / 尺寸状态
 */
export const useQQRCode = (props: QQRCodeProps): UseQQRCodeReturn => {
  const modules = computed<QRMatrix | null>(() =>
    createQRMatrix(props.value ?? '', props.errorLevel ?? 'M'),
  );

  const viewSize = computed(() => {
    const m = modules.value;
    if (!m) return 0;
    return m.size + 2 * (props.padding ?? DEFAULT_QR_PADDING);
  });

  const pixelSize = computed(() =>
    props.size !== undefined && props.size > 0
      ? Math.floor(props.size)
      : DEFAULT_QR_SIZE,
  );

  const pathD = computed(() => {
    const m = modules.value;
    if (!m) return '';
    return buildQRPath(m, props.padding ?? DEFAULT_QR_PADDING);
  });

  const hasIcon = computed(() => !!props.icon);

  /** 图标像素尺寸（缺省为 1/4 码宽，clamp 不超一半） */
  const iconPixel = computed(() => {
    const icon = props.iconSize;
    const pixel = pixelSize.value;
    if (icon !== undefined && icon > 0) return Math.min(icon, pixel / 2);
    return pixel / 4;
  });

  /** 图标所在中心方块（模块坐标） */
  const iconBox = computed(() => {
    const m = modules.value;
    if (!m) return { x: 0, y: 0, w: 0 };
    const size = m.size;
    const total = viewSize.value;
    const modulePx = total / m.size; // 未用
    void modulePx;
    const iconModules = Math.max(
      3,
      Math.floor(iconPixel.value / (pixelSize.value / total)),
    );
    const w = iconModules;
    const x = (size - w) / 2;
    const y = x;
    return { x, y, w };
  });

  return {
    modules,
    pathD,
    viewSize,
    pixelSize,
    hasIcon,
    iconPixel,
    iconBox,
  };
};
