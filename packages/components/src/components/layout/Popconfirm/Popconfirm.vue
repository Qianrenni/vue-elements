<!--
 * @component QPopconfirm
 * @description 气泡确认框：点击/悬停弹出「标题 + 描述 + 确认/取消」卡片，复用 QPopover 定位与触发，支持异步确认 loading，对齐 Ant Design Popconfirm 常用能力。
 -->
<template>
  <QPopover
    :arrow="arrow"
    :disabled="disabled"
    :mouse-enter-delay="mouseEnterDelay"
    :mouse-leave-delay="mouseLeaveDelay"
    :open="effectiveOpen"
    :placement="placement"
    :trigger="trigger"
    @update:open="syncOpen"
  >
    <slot />

    <template #content>
      <div class="q-popconfirm">
        <div v-if="hasHeader" class="q-popconfirm-body">
          <span v-if="showIcon" class="q-popconfirm-icon" aria-hidden="true">
            <slot name="icon">
              <span class="q-popconfirm-icon-glyph">!</span>
            </slot>
          </span>
          <div class="q-popconfirm-text">
            <div v-if="title" class="q-popconfirm-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="description" class="q-popconfirm-desc">
              <slot name="description">{{ description }}</slot>
            </div>
          </div>
        </div>

        <div class="q-popconfirm-actions">
          <button
            v-if="showCancel !== false"
            class="q-popconfirm-btn"
            type="button"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            :disabled="okLoading"
            class="q-popconfirm-btn q-popconfirm-btn--primary"
            type="button"
            @click="handleOk"
          >
            <span
              v-if="okLoading"
              class="q-popconfirm-spinner"
              aria-hidden="true"
            />
            {{ okText }}
          </button>
        </div>
      </div>
    </template>
  </QPopover>
</template>

<script lang="ts" setup>
import { QPopover } from '@/components/layout/Popover';
import { computed, ref } from 'vue';

import { useQPopconfirm } from './composable';
import type { QPopconfirmEmits, QPopconfirmProps } from './type';

defineOptions({ name: 'QPopconfirm' });

const props = withDefaults(defineProps<QPopconfirmProps>(), {
  title: '',
  description: '',
  trigger: 'click',
  placement: 'top',
  open: undefined,
  arrow: true,
  disabled: false,
  okText: '',
  cancelText: '',
  showCancel: true,
  showIcon: true,
  mouseEnterDelay: 0,
  mouseLeaveDelay: 120,
  onConfirm: undefined,
  onCancel: undefined,
});

const emit = defineEmits<QPopconfirmEmits>();

const { okText, cancelText, isControlled } = useQPopconfirm(props);

/** 内部显隐（未受控时使用） */
const internalOpen = ref(false);
/** 确认中 loading */
const okLoading = ref(false);

/** 传给 QPopover 的 open */
const effectiveOpen = computed(() =>
  isControlled.value ? props.open === true : internalOpen.value,
);

const hasHeader = computed(() => !!props.title || !!props.description);

/** QPopover 显隐变化同步（含外部点击/Esc 关闭、trigger 切换） */
function syncOpen(open: boolean) {
  internalOpen.value = open;
  emit('update:open', open);
}

/** 关闭并同步 */
function close() {
  internalOpen.value = false;
  emit('update:open', false);
}

/** 点击确认：支持异步（Promise 结束后关闭） */
async function handleOk() {
  if (okLoading.value) return;
  emit('confirm');
  const result = props.onConfirm?.();
  if (result && typeof (result as Promise<unknown>).then === 'function') {
    okLoading.value = true;
    try {
      await result;
      close();
    } catch {
      // 确认失败：保持展开并退出加载态
    } finally {
      okLoading.value = false;
    }
    return;
  }
  close();
}

/** 点击取消 */
function handleCancel() {
  if (okLoading.value) return;
  emit('cancel');
  props.onCancel?.();
  close();
}
</script>

<style scoped>
.q-popconfirm {
  min-width: 180px;
}
.q-popconfirm-body {
  display: flex;
  gap: var(--q-space-2, 8px);
  align-items: flex-start;
}
.q-popconfirm-icon {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--q-color-orange-300);
  color: #fff;
  font-size: 12px;
  font-weight: var(--q-font-weight-semibold, 600);
}
.q-popconfirm-text {
  flex: 1;
  min-width: 0;
}
.q-popconfirm-title {
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
}
.q-popconfirm-desc {
  margin-top: 4px;
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-xs, 12px);
}
.q-popconfirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--q-space-2, 8px);
  margin-top: var(--q-space-3, 12px);
}
.q-popconfirm-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 14px;
  border: 1px solid var(--q-color-border-light);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 6px);
  cursor: pointer;
  font-size: var(--q-font-size-sm, 14px);
  line-height: 1.6;
}
.q-popconfirm-btn:hover {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}
.q-popconfirm-btn--primary {
  border-color: var(--q-color-primary);
  background: var(--q-color-primary);
  color: var(--q-color-white, #fff);
}
.q-popconfirm-btn--primary:hover {
  background: var(--q-color-primary-hover);
  color: #fff;
}
.q-popconfirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.q-popconfirm-spinner {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: q-popconfirm-spin 0.7s linear infinite;
}
@keyframes q-popconfirm-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
