<!--
 * @component QBreadcrumb
 * @description 面包屑导航，对齐 Ant Design Breadcrumb。
 -->
<template>
  <nav aria-label="面包屑" class="q-breadcrumb">
    <template v-if="items.length > 0">
      <ol class="q-breadcrumb-list">
        <li
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :aria-current="isLast(index) ? 'page' : undefined"
          class="q-breadcrumb-item"
        >
          <a
            v-if="!isLast(index) && item.href"
            :href="item.href"
            class="q-breadcrumb-link"
          >
            {{ item.title }}
          </a>
          <button
            v-else-if="!isLast(index)"
            class="q-breadcrumb-btn"
            type="button"
            @click="handleItem(item, index)"
          >
            {{ item.title }}
          </button>
          <span v-else class="q-breadcrumb-current">{{ item.title }}</span>
          <span
            v-if="!isLast(index)"
            aria-hidden="true"
            class="q-breadcrumb-sep"
          >
            {{ separator }}
          </span>
        </li>
      </ol>
    </template>
    <ol v-else class="q-breadcrumb-list">
      <slot />
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { useBreadcrumb } from './composable';
import type { BreadcrumbEmits, BreadcrumbItem, BreadcrumbProps } from './type';

defineOptions({ name: 'QBreadcrumb' });

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  separator: '/',
});

const emit = defineEmits<BreadcrumbEmits>();

const { items, separator } = useBreadcrumb(props);

/** 是否最后一项 */
function isLast(index: number): boolean {
  return index === items.value.length - 1;
}

/** 项点击 */
function handleItem(item: BreadcrumbItem, index: number) {
  emit('itemClick', item, index);
}
</script>

<style scoped>
.q-breadcrumb {
  font-size: var(--q-font-size-sm);
  color: var(--q-color-text);
}

.q-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--q-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.q-breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.q-breadcrumb-link a {
  color: var(--q-color-text-secondary);
  text-decoration: none;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-breadcrumb-link a:hover {
  color: var(--q-color-primary);
}

.q-breadcrumb-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--q-color-text-secondary);
  font: inherit;
  cursor: pointer;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-breadcrumb-btn:hover {
  color: var(--q-color-primary);
}

.q-breadcrumb-current {
  color: var(--q-color-text);
  font-weight: var(--q-font-weight-medium);
}

.q-breadcrumb-sep {
  color: var(--q-color-text-tertiary);
  user-select: none;
}
</style>
