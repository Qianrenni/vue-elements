<!--
 * @component QMenu
 * @description 导航菜单组件，数据驱动、支持两级子菜单，三种模式（horizontal/vertical/inline），
 * 对齐 Ant Design Menu 常用能力（选中受控、子菜单展开）。
 -->
<template>
  <nav
    :class="`q-menu--${props.mode}`"
    :aria-label="props.mode === 'horizontal' ? '横向菜单' : '菜单'"
    class="q-menu"
  >
    <ul class="q-menu-list" role="menu">
      <template v-for="item in props.items" :key="item.key">
        <!-- 分隔线 -->
        <li v-if="item.divider" class="q-menu-divider" role="separator" />
        <!-- 子菜单（有 children） -->
        <li
          v-else-if="item.children && item.children.length"
          :class="{
            'q-menu-submenu--open': isOpen(item.key),
            'q-menu-submenu--disabled': item.disabled,
          }"
          class="q-menu-submenu"
          role="none"
          @mouseenter="onSubmenuHover(item, true)"
          @mouseleave="onSubmenuHover(item, false)"
        >
          <div
            class="q-menu-submenu-title"
            :aria-expanded="isOpen(item.key)"
            :class="{ 'q-menu-item--selected': isSelected(item.key) }"
            role="menuitem"
            :tabindex="item.disabled ? -1 : 0"
            @click="handleSubmenuTrigger(item)"
            @keydown.enter.prevent="handleSubmenuTrigger(item)"
            @keydown.space.prevent="handleSubmenuTrigger(item)"
          >
            <span v-if="item.icon" class="q-menu-icon" aria-hidden="true">
              <QIcon :icon="item.icon" size="14" />
            </span>
            <span class="q-menu-label">{{ item.label }}</span>
            <span class="q-menu-arrow" aria-hidden="true">▾</span>
          </div>

          <!-- inline：内联展开（缩进子级） -->
          <ul
            v-if="props.mode === 'inline' && isOpen(item.key)"
            class="q-menu-sub"
            role="menu"
          >
            <li
              v-for="child in item.children"
              :key="child.key"
              :class="{
                'q-menu-item--selected': isSelected(child.key),
                'q-menu-item--danger': child.danger,
                'q-menu-item--disabled': child.disabled,
              }"
              class="q-menu-item"
              role="menuitem"
              :tabindex="child.disabled ? -1 : 0"
              @click="handleItemClick(child, [item])"
              @keydown.enter.prevent="handleItemClick(child, [item])"
            >
              <span v-if="child.icon" class="q-menu-icon" aria-hidden="true">
                <QIcon :icon="child.icon" size="14" />
              </span>
              <span class="q-menu-label">{{ child.label }}</span>
            </li>
          </ul>

          <!-- horizontal / vertical：浮层子菜单 -->
          <ul v-else-if="isOpen(item.key)" class="q-menu-popup" role="menu">
            <li
              v-for="child in item.children"
              :key="child.key"
              :class="{
                'q-menu-item--selected': isSelected(child.key),
                'q-menu-item--danger': child.danger,
                'q-menu-item--disabled': child.disabled,
              }"
              class="q-menu-item"
              role="menuitem"
              :tabindex="child.disabled ? -1 : 0"
              @click="handleItemClick(child, [item])"
              @keydown.enter.prevent="handleItemClick(child, [item])"
            >
              <span v-if="child.icon" class="q-menu-icon" aria-hidden="true">
                <QIcon :icon="child.icon" size="14" />
              </span>
              <span class="q-menu-label">{{ child.label }}</span>
            </li>
          </ul>
        </li>

        <!-- 顶层叶子项 -->
        <li
          v-else
          :class="{
            'q-menu-item--selected': isSelected(item.key),
            'q-menu-item--danger': item.danger,
            'q-menu-item--disabled': item.disabled,
          }"
          class="q-menu-item"
          role="menuitem"
          :tabindex="item.disabled ? -1 : 0"
          @click="handleItemClick(item)"
          @keydown.enter.prevent="handleItemClick(item)"
        >
          <span v-if="item.icon" class="q-menu-icon" aria-hidden="true">
            <QIcon :icon="item.icon" size="14" />
          </span>
          <span class="q-menu-label">{{ item.label }}</span>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';

import { useMenu } from './composable';
import type { MenuEmits, MenuItem, MenuProps } from './type';

defineOptions({ name: 'QMenu' });

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => [],
  mode: 'inline',
  selectedKeys: undefined,
  openKeys: undefined,
  multiple: false,
  disabled: false,
});

const emit = defineEmits<MenuEmits>();

const { isOpen, selectedKeys, handleItemClick, handleSubmenuTrigger } = useMenu(
  props,
  emit,
);

/** 某 key 是否选中 */
function isSelected(key: string): boolean {
  return selectedKeys.value.includes(key);
}

/** 悬停子菜单：仅 horizontal / vertical 模式下悬停展开 */
function onSubmenuHover(item: MenuItem, open: boolean) {
  if (props.mode === 'inline') return;
  handleSubmenuTrigger(item, open);
}
</script>

<style scoped>
.q-menu {
  box-sizing: border-box;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm);
}

.q-menu-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* ==================== 模式布局 ==================== */
.q-menu--horizontal .q-menu-list {
  flex-direction: row;
  border-bottom: 1px solid var(--q-color-border-light);
}

.q-menu--vertical .q-menu-list,
.q-menu--inline .q-menu-list {
  flex-direction: column;
  border-right: 1px solid var(--q-color-border-light);
}

.q-menu--inline .q-menu-list {
  border-right: 0;
}

/* ==================== 顶层项 ==================== */
.q-menu-item,
.q-menu-submenu-title {
  display: flex;
  align-items: center;
  gap: var(--q-space-2);
  box-sizing: border-box;
  padding: 0 var(--q-space-4);
  cursor: pointer;
  user-select: none;
  line-height: var(--q-line-height-normal);
  white-space: nowrap;
  transition:
    color var(--q-duration-fast, 150ms) ease,
    background-color var(--q-duration-fast, 150ms) ease;
}

.q-menu--horizontal .q-menu-item,
.q-menu--horizontal .q-menu-submenu-title {
  height: 40px;
}

.q-menu--vertical .q-menu-item,
.q-menu--inline .q-menu-item,
.q-menu--vertical .q-menu-submenu-title,
.q-menu--inline .q-menu-submenu-title {
  height: 40px;
}

/* ==================== 选中 / 悬停态 ==================== */
.q-menu--inline .q-menu-item--selected {
  background: var(--q-color-primary-light);
  color: var(--q-color-primary);
}

.q-menu--vertical .q-menu-item--selected {
  background: var(--q-color-primary-light);
  color: var(--q-color-primary);
  border-right: 2px solid var(--q-color-primary);
}

.q-menu--horizontal .q-menu-item--selected,
.q-menu--horizontal .q-menu-item--selected:hover {
  color: var(--q-color-primary);
}

.q-menu--horizontal .q-menu-item--selected {
  box-shadow: inset 0 -2px 0 0 var(--q-color-primary);
}

.q-menu-item:hover,
.q-menu-submenu-title:hover {
  color: var(--q-color-primary);
}

.q-menu-item--danger {
  color: var(--q-color-red-400);
}

.q-menu-item--disabled,
.q-menu-submenu--disabled .q-menu-submenu-title {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-menu-item--disabled:hover {
  color: var(--q-color-text-tertiary);
}

/* ==================== 图标 / 箭头 ==================== */
.q-menu-icon {
  display: inline-flex;
}

.q-menu-arrow {
  margin-left: auto;
  font-size: var(--q-font-size-xs);
  transition: transform var(--q-duration-normal, 300ms) ease;
}

.q-menu-submenu--open > .q-menu-submenu-title .q-menu-arrow {
  transform: rotate(180deg);
}

/* ==================== 子菜单（inline 内联） ==================== */
.q-menu--inline .q-menu-sub {
  margin: 0;
  padding: 0;
  list-style: none;
}

.q-menu--inline .q-menu-sub .q-menu-item {
  padding-left: calc(var(--q-space-8) + var(--q-space-2));
}

/* ==================== 子菜单浮层（horizontal/vertical） ==================== */
.q-menu-submenu {
  position: relative;
}

.q-menu--horizontal .q-menu-popup {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: var(--z-index-level-2);
}

.q-menu--vertical .q-menu-popup {
  position: absolute;
  top: 0;
  left: 100%;
  z-index: var(--z-index-level-2);
}

.q-menu-popup {
  margin: 0;
  padding: var(--q-space-2);
  list-style: none;
  background: var(--q-color-bg-card);
  border-radius: var(--q-radius-md);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--q-color-border-light);
}

.q-menu-popup .q-menu-item {
  min-width: 120px;
  border-radius: var(--q-radius-sm);
}

.q-menu-popup .q-menu-item--selected {
  background: var(--q-color-primary-light);
  color: var(--q-color-primary);
}

/* ==================== 分隔线 ==================== */
.q-menu-divider {
  align-self: stretch;
  width: 1px;
  margin: var(--q-space-2) var(--q-space-2);
  background: var(--q-color-border-light);
}

.q-menu--vertical .q-menu-divider,
.q-menu--inline .q-menu-divider {
  width: auto;
  height: 1px;
}
</style>
