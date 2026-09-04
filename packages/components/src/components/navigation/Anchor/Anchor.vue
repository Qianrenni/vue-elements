<!--
 * @component QAnchor
 * @description 锚点导航组件：数据驱动、滚动高亮 + 点击平滑滚动到锚点，对齐 Ant Design Anchor。
 -->
<template>
  <nav class="q-anchor" aria-label="锚点导航">
    <ul class="q-anchor-list">
      <template v-for="item in props.items" :key="item.href">
        <li
          :class="{ 'q-anchor-link--active': activeHref === item.href }"
          class="q-anchor-link"
        >
          <a
            :aria-current="activeHref === item.href ? 'true' : undefined"
            :href="item.href"
            @click.prevent="handleClick(item)"
          >
            {{ item.title }}
          </a>
        </li>
        <li
          v-for="child in item.children"
          :key="child.href"
          :class="{ 'q-anchor-link--active': activeHref === child.href }"
          class="q-anchor-link q-anchor-link--child"
        >
          <a
            :aria-current="activeHref === child.href ? 'true' : undefined"
            :href="child.href"
            @click.prevent="handleClick(child)"
          >
            {{ child.title }}
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useAnchor } from './composable';
import type { AnchorEmits, AnchorProps } from './type';

defineOptions({ name: 'QAnchor' });

const props = withDefaults(defineProps<AnchorProps>(), {
  items: () => [],
  offsetTop: 0,
  updateHash: true,
  disabled: false,
});

const emit = defineEmits<AnchorEmits>();

const { activeHref, handleClick } = useAnchor(props, emit);
</script>

<style scoped>
.q-anchor {
  box-sizing: border-box;
  font-size: var(--q-font-size-sm);
}

.q-anchor-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.q-anchor-link a {
  display: block;
  box-sizing: border-box;
  padding: 0.2rem var(--q-space-4);
  color: var(--q-color-text-secondary);
  text-decoration: none;
  border-left: 2px solid transparent;
  line-height: 1.6;
  transition:
    color var(--q-duration-fast, 150ms) ease,
    border-color var(--q-duration-fast, 150ms) ease;
}

.q-anchor-link a:hover {
  color: var(--q-color-primary);
}

.q-anchor-link--active a {
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-semibold);
  border-left-color: var(--q-color-primary);
}

.q-anchor-link--child a {
  padding-left: calc(var(--q-space-8) + var(--q-space-2));
}
</style>
