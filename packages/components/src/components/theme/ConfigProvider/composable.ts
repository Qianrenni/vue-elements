import {
  computed,
  type ComputedRef,
  inject,
  type InjectionKey,
  provide,
  ref,
  type Ref,
} from 'vue';

import type {
  QConfigComponentSize,
  QConfigCssVars,
  QConfigDirection,
} from './type';

/** 默认组件尺寸 */
export const DEFAULT_COMPONENT_SIZE: QConfigComponentSize = 'middle';
/** 默认文本方向 */
export const DEFAULT_DIRECTION: QConfigDirection = 'ltr';

/** 由 QConfigProvider 提供的全局配置上下文 */
export interface QConfigContext {
  /** 组件尺寸 */
  componentSize: Ref<QConfigComponentSize>;
  /** 文本方向 */
  direction: Ref<QConfigDirection>;
  /** CSS 自定义属性覆盖 */
  cssVars: ComputedRef<QConfigCssVars>;
  /** 弹层挂载容器解析函数 */
  getPopupContainer?: () => HTMLElement;
  /** 自定义空状态渲染 */
  renderEmpty?: () => unknown;
}

/** provide/inject 用的 key */
export const Q_CONFIG_PROVIDER_KEY: InjectionKey<QConfigContext> =
  Symbol('q-config-provider');

/**
 * 注入全局配置（组件内部）
 * @param context 配置上下文
 */
export function provideQConfig(context: QConfigContext): void {
  provide(Q_CONFIG_PROVIDER_KEY, context);
}

/**
 * 读取最近的 QConfigProvider 配置；未包裹时返回 null。
 * 组件消费示例：`const config = useQConfig();` 然后 `config?.getPopupContainer?.()`。
 */
export function useQConfig(): QConfigContext | null {
  return inject(Q_CONFIG_PROVIDER_KEY, null);
}

/** useQConfigProvider 返回值 */
export interface UseQConfigProviderReturn {
  /** 组件尺寸 ref（响应式） */
  componentSize: Ref<QConfigComponentSize>;
  /** 文本方向 ref（响应式） */
  direction: Ref<QConfigDirection>;
  /** cssVars（响应式） */
  cssVars: ComputedRef<QConfigCssVars>;
  /** 尺寸样式类名 */
  sizeClassName: ComputedRef<string>;
  /** 注入配置上下文 */
  context: QConfigContext;
}

/**
 * QConfigProvider 核心逻辑：维护响应式配置并注入到子树。
 * @param props 组件 Props
 */
export function useQConfigProvider(props: {
  componentSize?: QConfigComponentSize;
  direction?: QConfigDirection;
  cssVars?: QConfigCssVars;
  getPopupContainer?: () => HTMLElement;
  renderEmpty?: () => unknown;
}): UseQConfigProviderReturn {
  const componentSize = ref<QConfigComponentSize>(
    props.componentSize ?? DEFAULT_COMPONENT_SIZE,
  );
  const direction = ref<QConfigDirection>(props.direction ?? DEFAULT_DIRECTION);
  const cssVars = computed<QConfigCssVars>(() => props.cssVars ?? {});

  const sizeClassName = computed(() =>
    componentSize.value === 'middle'
      ? ''
      : `q-config-provider--${componentSize.value}`,
  );

  const context: QConfigContext = {
    componentSize,
    direction,
    cssVars,
    getPopupContainer: props.getPopupContainer,
    renderEmpty: props.renderEmpty,
  };

  return { componentSize, direction, cssVars, sizeClassName, context };
}
