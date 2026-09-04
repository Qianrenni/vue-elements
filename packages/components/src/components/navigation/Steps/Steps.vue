<!--
 * @component QSteps
 * @description 步骤条，对齐 Ant Design Steps（水平/垂直、finish/process/error 状态）。
 -->
<template>
  <ol :class="classList" class="q-steps">
    <li
      v-for="(item, index) in props.items"
      :key="`${item.title}-${index}`"
      :aria-current="stateList[index].current ? 'step' : undefined"
      :class="[
        `q-step--${stateList[index].status}`,
        { 'q-step--last': stateList[index].last },
      ]"
      class="q-step"
    >
      <div
        :class="{ 'q-step--clickable': props.clickable }"
        :role="props.clickable ? 'button' : undefined"
        class="q-step-head"
        :tabindex="props.clickable ? 0 : undefined"
        @click="handleClick(index)"
        @keydown.enter.prevent="handleClick(index)"
      >
        <span class="q-step-icon" aria-hidden="true">
          <template v-if="stateList[index].status === 'finish'">✓</template>
          <template v-else>{{ index + 1 }}</template>
        </span>
      </div>
      <div class="q-step-main">
        <div class="q-step-title">{{ item.title }}</div>
        <div v-if="item.description" class="q-step-desc">
          {{ item.description }}
        </div>
      </div>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { useSteps } from './composable';
import type { StepsEmits, StepsProps } from './type';

defineOptions({ name: 'QSteps' });

const props = withDefaults(defineProps<StepsProps>(), {
  current: 0,
  status: 'process',
  direction: 'horizontal',
  size: 'default',
  items: () => [],
  clickable: false,
});

const emit = defineEmits<StepsEmits>();

const { steps, classList } = useSteps(props);

/** 每步派生状态（与 items 一一对应） */
const stateList = steps;

/** 步骤点击 */
function handleClick(index: number) {
  if (props.clickable) emit('stepClick', index);
}
</script>

<style scoped>
.q-steps {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* — 每步布局 — */
.q-step {
  flex: 1;
  display: flex;
  gap: var(--q-space-3);
  min-width: 0;
}

.q-step-head {
  display: inline-flex;
}

.q-step-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--q-radius-full);
  background: var(--q-color-bg-secondary);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-sm);
  flex: none;
}

.q-step-main {
  min-width: 0;
  padding-top: 0.25rem;
}

.q-step-title {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.q-step-desc {
  color: var(--q-color-text-tertiary);
  font-size: var(--q-font-size-xs);
  line-height: 1.4;
}

.q-step--clickable {
  cursor: pointer;
}

/* — 状态 — */
.q-step--finish .q-step-icon {
  background: var(--q-color-primary);
  color: var(--q-color-white);
}

.q-step--finish .q-step-title {
  color: var(--q-color-text);
}

.q-step--process .q-step-icon {
  background: var(--q-color-primary);
  color: var(--q-color-white);
}

.q-step--process .q-step-title {
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-semibold);
}

.q-step--error .q-step-icon {
  background: var(--q-color-red-400);
  color: var(--q-color-white);
}

.q-step--error .q-step-title {
  color: var(--q-color-red-400);
}

/* — 水平模式连接线（finish 后绿色主色） — */
.q-steps--horizontal .q-step {
  position: relative;
}

.q-steps--horizontal .q-step:not(.q-step--last)::after {
  content: '';
  position: absolute;
  top: 0.8rem;
  left: calc(1.75rem + var(--q-space-3));
  right: var(--q-space-3);
  height: 1px;
  background: var(--q-color-bg-secondary);
}

.q-steps--horizontal .q-step--finish:not(.q-step--last)::after {
  background: var(--q-color-primary);
}

/* — 垂直模式 — */
.q-steps--vertical {
  flex-direction: column;
  gap: var(--q-space-6);
}

.q-steps--vertical .q-step {
  flex: none;
}

/* — 小尺寸 — */
.q-steps--small .q-step-icon {
  width: 1.25rem;
  height: 1.25rem;
  font-size: var(--q-font-size-xs);
}
</style>
