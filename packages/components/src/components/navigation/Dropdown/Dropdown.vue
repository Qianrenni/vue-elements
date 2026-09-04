<!--
 * @component QDropdown
 * @description 下拉菜单组件：包裹触发元素，展示浮层菜单，对齐 Ant Design Dropdown 常用能力
 * （hover/click 触发、受控展开、菜单项点击）。
 -->
<template>
  <span
    ref="wrapRef"
    class="q-dropdown-trigger"
    @click="onTriggerClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <slot />
  </span>

  <Teleport to="body">
    <div
      v-if="visible"
      ref="menuRef"
      :class="`q-dropdown--${verticalSide}-${horizontalAlign}`"
      class="q-dropdown"
      role="menu"
      :style="menuStyle"
      @click.stop
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <template v-if="items && items.length">
        <template v-for="item in items" :key="item.key">
          <div
            v-if="item.divider"
            class="q-dropdown-divider"
            role="separator"
          />
          <div
            v-else
            :class="{
              'q-dropdown-item--danger': item.danger,
              'q-dropdown-item--disabled': item.disabled,
            }"
            class="q-dropdown-item"
            role="menuitem"
            :tabindex="item.disabled ? -1 : 0"
            @click="onItemClick(item)"
            @keydown.enter.prevent="onItemClick(item)"
          >
            <span v-if="item.icon" class="q-dropdown-icon" aria-hidden="true">
              <QIcon :icon="item.icon" size="14" />
            </span>
            <span class="q-dropdown-label">{{ item.label }}</span>
          </div>
        </template>
      </template>
      <slot v-else name="content" />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useTemplateRef } from 'vue';

import { useDropdown } from './composable';
import type { DropdownEmits, DropdownItem, DropdownProps } from './type';

defineOptions({ name: 'QDropdown' });

const props = withDefaults(defineProps<DropdownProps>(), {
  items: () => [],
  trigger: 'hover',
  placement: 'bottomLeft',
  open: undefined,
  disabled: false,
});

const emit = defineEmits<DropdownEmits>();

const {
  isOpen,
  verticalSide,
  horizontalAlign,
  handleSelect,
  toggle,
  openMenu,
  closeMenu,
} = useDropdown(props, emit);

const wrapRef = useTemplateRef<HTMLElement>('wrapRef');
const menuRef = useTemplateRef<HTMLElement>('menuRef');

/** 菜单项（受控不可变；模板内使用） */
const items = computed<DropdownItem[]>(() => props.items ?? []);

/** 最终是否显示 */
const visible = computed(
  () => !props.disabled && (props.open ?? isOpen.value) === true,
);

/** 弹层坐标（fixed 视口） */
const pos = ref({ left: 0, top: 0 });

const menuStyle = computed(() => ({
  left: `${Math.round(pos.value.left)}px`,
  top: `${Math.round(pos.value.top)}px`,
}));

/** 弹层与触发元素间距 */
const GAP = 4;
/** 视口安全边距 */
const VIEWPORT_MARGIN = 6;

/** 计算 fixed 定位 */
async function updatePosition() {
  await nextTick();
  const wrap = wrapRef.value;
  const menu = menuRef.value;
  if (!wrap || !menu) return;

  const wr = wrap.getBoundingClientRect();
  const mw = menu.offsetWidth;
  const mh = menu.offsetHeight;
  const isTop = verticalSide.value === 'top';

  let left: number;
  if (horizontalAlign.value === 'right') left = wr.right - mw;
  else left = wr.left;

  let top: number;
  if (isTop) top = wr.top - mh - GAP;
  else top = wr.bottom + GAP;

  const maxLeft = window.innerWidth - mw - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - mh - VIEWPORT_MARGIN;
  pos.value = {
    left: Math.min(
      Math.max(left, VIEWPORT_MARGIN),
      Math.max(maxLeft, VIEWPORT_MARGIN),
    ),
    top: Math.min(
      Math.max(top, VIEWPORT_MARGIN),
      Math.max(maxTop, VIEWPORT_MARGIN),
    ),
  };
}

/** 跟随滚动 / 尺寸变化 */
function onMove() {
  if (visible.value) updatePosition();
}

watch(
  () => visible.value,
  (v) => {
    if (v) {
      updatePosition();
      window.addEventListener('resize', onMove);
      window.addEventListener('scroll', onMove, {
        capture: true,
        passive: true,
      });
    } else {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    }
  },
);

/** 事件：click 触发 */
function onTriggerClick() {
  if (props.trigger === 'hover') return;
  toggle();
}

/** hover 进出 */
function onMouseEnter() {
  if (props.trigger === 'click') return;
  openMenu();
}
function onMouseLeave() {
  if (props.trigger === 'click') return;
  closeMenu();
}

/** focus 进出（hover 触发时键盘可达） */
function onFocusIn() {
  if (props.trigger === 'hover') openMenu();
}
function onFocusOut() {
  if (props.trigger === 'hover') closeMenu();
}

/** 点击菜单项 */
function onItemClick(item: DropdownItem) {
  handleSelect(item);
}

/** 点击外部关闭（trigger=click 时） */
function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (wrapRef.value?.contains(target) || menuRef.value?.contains(target))
    return;
  if (isOpen.value) closeMenu();
}

watch(
  () => (props.trigger === 'click' ? isOpen.value : false),
  (open) => {
    if (open) document.addEventListener('click', onDocClick);
    else document.removeEventListener('click', onDocClick);
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('resize', onMove);
  window.removeEventListener('scroll', onMove, true);
  document.removeEventListener('click', onDocClick);
});
</script>

<style scoped>
.q-dropdown-trigger {
  display: inline-block;
}

.q-dropdown {
  position: fixed;
  z-index: var(--z-index-level-3);
  min-width: 120px;
  padding: var(--q-space-2);
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
}

.q-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--q-space-2);
  box-sizing: border-box;
  padding: var(--q-space-2) var(--q-space-4);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  font-size: var(--q-font-size-sm);
  transition:
    background-color var(--q-duration-fast, 150ms) ease,
    color var(--q-duration-fast, 150ms) ease;
}

.q-dropdown-item:hover {
  background: var(--q-color-primary-light);
  color: var(--q-color-primary);
}

.q-dropdown-icon {
  display: inline-flex;
}

.q-dropdown-item--danger {
  color: var(--q-color-red-400);
}
.q-dropdown-item--danger:hover {
  color: var(--q-color-red-400);
  background: var(--q-color-red-50, rgba(220, 53, 69, 0.08));
}

.q-dropdown-item--disabled,
.q-dropdown-item--disabled:hover {
  color: var(--q-color-text-tertiary);
  background: transparent;
  cursor: not-allowed;
}

.q-dropdown-divider {
  height: 1px;
  margin: var(--q-space-2) 0;
  background: var(--q-color-border-light);
}
</style>
