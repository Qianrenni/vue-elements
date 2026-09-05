<!--
 * @component QSider
 * @description 侧边栏布局组件，作为 QLayout 的左/右侧栏，支持折叠，对齐 Ant Design Layout.Sider。
 -->
<template>
  <aside
    :class="[themeClass, { 'q-layout-sider--collapsed': props.collapsed }]"
    class="q-layout-sider"
    :style="siderStyle"
  >
    <div class="q-layout-sider-inner">
      <slot />
    </div>
    <button
      v-if="props.collapsible"
      type="button"
      class="q-layout-sider-trigger"
      :aria-label="props.collapsed ? '展开侧边栏' : '折叠侧边栏'"
      @click="toggle"
    >
      <slot name="trigger">
        <span class="q-layout-sider-trigger-icon" aria-hidden="true">
          {{ triggerIcon }}
        </span>
      </slot>
    </button>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useSider } from './composable';
import type { SiderEmits, SiderProps } from './type';

defineOptions({ name: 'QSider' });

const props = withDefaults(defineProps<SiderProps>(), {
  width: 200,
  collapsedWidth: 80,
  collapsible: false,
  collapsed: false,
  theme: 'dark',
});

const emit = defineEmits<SiderEmits>();

const { siderWidth, triggerIcon, themeClass } = useSider(props);

/** 宽度内联样式 */
const siderStyle = computed(() => ({
  width: `${siderWidth.value}px`,
}));

/** 点击折叠触发器 */
function toggle() {
  const next = !props.collapsed;
  emit('update:collapsed', next);
  emit('collapse', next, 'clickTrigger');
}
</script>

<style scoped>
.q-layout-sider {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: none;
  min-height: 0;
  transition: width var(--q-duration-base, 0.2s) ease;
  overflow: hidden;
}

.q-layout-sider-inner {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

/* — 主题：深色 — */
.q-layout-sider--dark {
  background: var(--q-color-bg-nav, #1f1f1f);
  color: rgba(255, 255, 255, 0.85);
}

/* — 主题：浅色 — */
.q-layout-sider--light {
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-right: 1px solid var(--q-color-border-light);
}

/* — 折叠触发器 — */
.q-layout-sider-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex: none;
  height: 40px;
  border: 0;
  border-top: 1px solid transparent;
  cursor: pointer;
  font: inherit;
  line-height: 1;
  transition: color var(--q-duration-base, 0.2s) ease;
}

.q-layout-sider--dark .q-layout-sider-trigger {
  background: var(--q-color-bg-nav-hover, #141414);
  color: rgba(255, 255, 255, 0.65);
}

.q-layout-sider--light .q-layout-sider-trigger {
  background: var(--q-color-bg);
  color: var(--q-color-text-muted);
  border-top-color: var(--q-color-border-light);
}

.q-layout-sider-trigger:hover {
  color: var(--q-color-primary);
}
</style>
