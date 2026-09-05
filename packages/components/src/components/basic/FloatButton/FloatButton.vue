<!--
 * @component QFloatButton
 * @description 悬浮按钮（对齐 antd FloatButton）：圆形/方形、primary/default、图标(#icon)/文字、角标(badge count·dot)、tooltip、href 链接与 backTop 回顶模式。
 -->
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { useQFloatButton } from './composable';
import type { QFloatButtonEmits, QFloatButtonProps } from './type';

defineOptions({ name: 'QFloatButton' });

const props = withDefaults(defineProps<QFloatButtonProps>(), {
  type: 'default',
  shape: 'circle',
  description: '',
  tooltip: '',
  href: '',
  target: '',
  backTop: false,
  visibilityHeight: undefined,
  disabled: false,
  badge: undefined,
});

const emit = defineEmits<QFloatButtonEmits>();

const { isLink, isDisabled, defaultGlyph, badgeView } = useQFloatButton(props);

/** backTop 可见性 */
const visible = ref(!props.backTop);

function onScroll() {
  const threshold = props.visibilityHeight ?? 400;
  visible.value = window.scrollY > threshold;
}

function handleClick(ev: MouseEvent) {
  if (isDisabled.value) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    return;
  }
  if (props.backTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  emit('click', ev);
}

onMounted(() => {
  if (props.backTop) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});
onBeforeUnmount(() => {
  if (props.backTop) {
    window.removeEventListener('scroll', onScroll);
  }
});
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :target="isLink ? target : undefined"
    :aria-disabled="isDisabled || undefined"
    :class="[
      'q-float-btn',
      `q-float-btn--${type}`,
      `q-float-btn--${shape}`,
      { 'q-float-btn--hidden': backTop && !visible },
    ]"
    :title="tooltip || undefined"
    class="q-float-btn"
    type="button"
    @click="handleClick"
  >
    <span
      v-if="badgeView.dot || badgeView.text"
      class="q-float-btn__badge"
      :class="{ 'q-float-btn__badge--dot': badgeView.dot }"
      :style="
        badgeView.color ? { backgroundColor: badgeView.color } : undefined
      "
    >
      {{ badgeView.text }}
    </span>

    <span v-if="tooltip" class="q-float-btn__tip" aria-hidden="true">
      {{ tooltip }}
    </span>

    <span class="q-float-btn__content">
      <span class="q-float-btn__icon">
        <slot name="icon">
          <span v-if="defaultGlyph" aria-hidden="true">{{ defaultGlyph }}</span>
        </slot>
      </span>
      <span v-if="shape === 'square' && description" class="q-float-btn__desc">
        {{ description }}
      </span>
    </span>
  </component>
</template>

<style scoped>
.q-float-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  color: var(--q-color-text);
  background: var(--q-color-bg-card);
  box-shadow: var(--q-shadow-md, 0 4px 10px rgba(0, 0, 0, 0.14));
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
  box-sizing: border-box;
  text-decoration: none;
}
.q-float-btn--circle {
  border-radius: 50%;
}
.q-float-btn--square {
  border-radius: var(--q-radius-md, 8px);
}
.q-float-btn--primary {
  color: var(--q-color-white);
  background: var(--q-color-primary);
}
.q-float-btn--primary:hover:not(.q-float-btn--hidden) {
  background: var(--q-color-primary-hover, var(--q-color-primary));
}
.q-float-btn:hover:not(.q-float-btn--primary):not(.q-float-btn--hidden) {
  background: var(--q-color-bg-secondary);
}
.q-float-btn:active:not(.q-float-btn--hidden) {
  transform: scale(0.94);
}
.q-float-btn--hidden {
  opacity: 0;
  pointer-events: none;
}
.q-float-btn__content {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.q-float-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.q-float-btn__desc {
  font-size: 10px;
  line-height: 1;
  opacity: 0.85;
}
.q-float-btn__badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 11px;
  line-height: 1;
  color: #fff;
  background: var(--q-color-red-500, #ff4d4f);
  box-sizing: border-box;
}
.q-float-btn__badge--dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  padding: 0;
  border-radius: 50%;
  top: 0;
  right: 0;
}
.q-float-btn__tip {
  position: absolute;
  top: 50%;
  right: calc(100% + 10px);
  transform: translateY(-50%);
  padding: 4px 8px;
  white-space: nowrap;
  border-radius: 4px;
  font-size: 12px;
  color: var(--q-color-text);
  background: var(--q-color-bg-card);
  box-shadow: var(--q-shadow-md, 0 4px 10px rgba(0, 0, 0, 0.14));
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  z-index: 1;
}
.q-float-btn:hover .q-float-btn__tip {
  opacity: 1;
  visibility: visible;
}
</style>
