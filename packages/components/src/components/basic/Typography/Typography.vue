<!--
 * @component QTypography
 * @description 排版组件，单组件覆盖 Text / Title / Paragraph，对齐 Ant Design Typography 常用 API。
 -->
<template>
  <component :is="tag" :class="classList" class="q-typ" :style="styleVars">
    <template v-if="editing">
      <textarea
        ref="editRef"
        v-model="draft"
        :aria-label="'编辑文本'"
        :rows="editRows"
        class="q-typ-edit"
        @blur="commitEdit"
        @keydown.enter.exact.prevent="commitEdit"
        @keydown.esc.prevent="cancelEdit"
      />
      <span class="q-typ-actions">
        <button
          aria-label="保存"
          class="q-typ-action"
          title="保存"
          type="button"
          @mousedown.prevent
          @click="commitEdit"
        >
          ✓
        </button>
        <button
          aria-label="取消"
          class="q-typ-action"
          title="取消"
          type="button"
          @mousedown.prevent
          @click="cancelEdit"
        >
          ✕
        </button>
      </span>
    </template>
    <template v-else>
      <span v-if="contentWrapped" ref="contentRef" class="q-typ-content">
        <slot />
      </span>
      <slot v-else />
      <button
        v-if="props.editable"
        aria-label="编辑"
        class="q-typ-edit-trigger"
        title="编辑"
        type="button"
        @click="startEdit"
      >
        ✎
      </button>
      <button
        v-if="showCopy"
        :aria-label="copied ? '已复制' : '复制'"
        :title="copied ? '已复制' : '复制'"
        class="q-typ-copy"
        type="button"
        @click="handleCopy"
      >
        {{ copied ? '✓' : '⧉' }}
      </button>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useTemplateRef } from 'vue';

import { useQTypography } from './composable';
import type { QTypographyEmits, QTypographyProps } from './type';

defineOptions({ name: 'QTypography' });

const props = withDefaults(defineProps<QTypographyProps>(), {
  paragraph: false,
  disabled: false,
  strong: false,
  italic: false,
  underline: false,
  delete: false,
  mark: false,
  code: false,
  keyboard: false,
  ellipsis: false,
  copyable: false,
  editable: false,
});

const emit = defineEmits<QTypographyEmits>();

const { tag, classList, styleVars, showCopy } = useQTypography(props);

const contentRef = useTemplateRef<HTMLElement>('contentRef');
const editRef = useTemplateRef<HTMLTextAreaElement>('editRef');

/** 需要包裹内容以读取文本（复制 / 编辑） */
const contentWrapped = computed(() => showCopy.value || !!props.editable);

/** 复制成功短暂反馈 */
const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | null = null;

/** 复制文本：copyText 优先，其次内容文本 */
function handleCopy() {
  const text = props.copyText ?? contentRef.value?.textContent ?? '';
  if (!text) return;
  navigator.clipboard?.writeText(text);
  copied.value = true;
  emit('copy');
  if (copyTimer) clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copied.value = false;
  }, 2000);
}

/** 是否处于编辑态 */
const editing = ref(false);
/** 编辑草稿 */
const draft = ref('');

/** 编辑框行数：段落/标题给多行，否则单行 */
const editRows = computed(() => (props.paragraph || props.level ? 3 : 1));

/** 读取当前展示文本 */
function currentText(): string {
  return props.copyText ?? contentRef.value?.textContent ?? '';
}

/** 进入编辑态 */
function startEdit() {
  draft.value = currentText();
  editing.value = true;
  nextTick(() => {
    editRef.value?.focus();
    editRef.value?.select();
  });
}

/** 提交编辑 */
function commitEdit() {
  if (!editing.value) return;
  const value = draft.value;
  editing.value = false;
  emit('change', value);
}

/** 取消编辑 */
function cancelEdit() {
  editing.value = false;
}
</script>

<style scoped>
.q-typ {
  --q-typ-lines: 1;
  color: var(--q-color-text);
}

/* — 标题层级 — */
h1.q-typ {
  margin: 0 0 var(--q-space-5);
  font-size: var(--q-font-size-3xl);
  font-weight: var(--q-font-weight-bold);
  line-height: var(--q-line-height-tight);
}

h2.q-typ {
  margin: 0 0 var(--q-space-5);
  font-size: var(--q-font-size-2xl);
  font-weight: var(--q-font-weight-bold);
  line-height: var(--q-line-height-tight);
}

h3.q-typ {
  margin: 0 0 var(--q-space-5);
  font-size: var(--q-font-size-xl);
  font-weight: var(--q-font-weight-semibold);
  line-height: var(--q-line-height-tight);
}

h4.q-typ {
  margin: 0 0 var(--q-space-4);
  font-size: var(--q-font-size-lg);
  font-weight: var(--q-font-weight-semibold);
  line-height: var(--q-line-height-normal);
}

h5.q-typ {
  margin: 0 0 var(--q-space-4);
  font-size: var(--q-font-size-base);
  font-weight: var(--q-font-weight-semibold);
  line-height: var(--q-line-height-normal);
}

/* — 段落 — */
p.q-typ {
  margin: 0 0 var(--q-space-5);
  line-height: var(--q-line-height-relaxed);
}

/* — 语义类型 — */
.q-typ--type-secondary {
  color: var(--q-color-text-secondary);
}

.q-typ--type-success {
  color: var(--q-color-green-400);
}

.q-typ--type-warning {
  color: var(--q-color-orange-400);
}

.q-typ--type-danger {
  color: var(--q-color-red-400);
}

.q-typ--disabled {
  color: var(--q-color-text-muted);
  cursor: not-allowed;
  user-select: none;
}

/* — 文本样式 — */
.q-typ--strong {
  font-weight: var(--q-font-weight-bold);
}

.q-typ--italic {
  font-style: italic;
}

.q-typ--underline {
  text-decoration: underline;
}

.q-typ--delete {
  text-decoration: line-through;
}

.q-typ--mark {
  background-color: var(--q-color-primary-lighter);
  padding-inline: 0.15em;
}

.q-typ--code,
.q-typ--keyboard {
  padding: 0.1em 0.35em;
  background-color: var(--q-color-bg-secondary);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
  font-family: var(--q-font-family-mono);
  font-size: 0.9em;
}

.q-typ--keyboard {
  border-bottom-width: 2px;
}

/* — 省略：默认单行 — */
.q-typ--ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--q-typ-lines);
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: normal;
}

.q-typ--ellipsis.q-typ--copyable {
  display: inline-flex;
}

/* — 复制 — */
.q-typ--copyable {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-2);
  max-width: 100%;
}

.q-typ-content {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-typ-copy {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--q-color-text-secondary);
  cursor: pointer;
  font-size: 0.9em;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-typ-copy:hover,
.q-typ-edit-trigger:hover,
.q-typ-action:hover {
  color: var(--q-color-primary);
}

/* — 编辑 — */
.q-typ-edit-trigger,
.q-typ-action {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--q-color-text-secondary);
  cursor: pointer;
  font-size: 0.9em;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-typ-edit {
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-width: 12rem;
  margin: 0;
  padding: var(--q-space-1) var(--q-space-2);
  border: 1px solid var(--q-color-primary);
  border-radius: var(--q-radius-sm);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  font: inherit;
  line-height: var(--q-line-height-normal);
  outline: none;
  resize: vertical;
}

.q-typ-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-3);
  margin-left: var(--q-space-2);
  vertical-align: middle;
}
</style>
