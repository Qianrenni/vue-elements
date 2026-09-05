<!--
 * @component QCalendar
 * @description 日历（对齐 antd Calendar 基础能力）：月视图网格、选中/今天高亮、前后月切换、今日按钮、disabledDate。
 -->
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import {
  inMonth,
  isSameDay,
  monthMatrix,
  monthTitle,
  WEEK_HEADERS,
} from './composable';
import type { QCalendarEmits, QCalendarProps } from './type';

defineOptions({ name: 'QCalendar' });

const props = withDefaults(defineProps<QCalendarProps>(), {
  modelValue: undefined,
  disabledDate: undefined,
  allowClear: true,
});

const emit = defineEmits<QCalendarEmits>();

const today = new Date();
const viewYear = ref(
  props.modelValue ? props.modelValue.getFullYear() : today.getFullYear(),
);
const viewMonth = ref(
  props.modelValue ? props.modelValue.getMonth() : today.getMonth(),
);

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      viewYear.value = value.getFullYear();
      viewMonth.value = value.getMonth();
    }
  },
);

const cells = computed(() => monthMatrix(viewYear.value, viewMonth.value));

function goMonth(delta: number) {
  const d = new Date(viewYear.value, viewMonth.value + delta, 1);
  viewYear.value = d.getFullYear();
  viewMonth.value = d.getMonth();
  emit('panel-change', viewYear.value, viewMonth.value);
}
function goToday() {
  viewYear.value = today.getFullYear();
  viewMonth.value = today.getMonth();
  emit('panel-change', viewYear.value, viewMonth.value);
}
function select(date: Date) {
  if (props.disabledDate?.(date)) return;
  const current = props.modelValue;
  if (props.allowClear && current && isSameDay(current, date)) {
    emit('update:modelValue', null);
    emit('change', null);
    return;
  }
  const next = new Date(date);
  emit('update:modelValue', next);
  emit('change', next);
}
</script>

<template>
  <div class="q-calendar">
    <div class="q-calendar__header">
      <div class="q-calendar__nav">
        <button type="button" class="q-calendar__btn" @click="goMonth(-1)">
          ‹
        </button>
        <span class="q-calendar__title">{{
          monthTitle(viewYear, viewMonth)
        }}</span>
        <button type="button" class="q-calendar__btn" @click="goMonth(1)">
          ›
        </button>
      </div>
      <button
        type="button"
        class="q-calendar__btn q-calendar__today"
        @click="goToday"
      >
        今天
      </button>
    </div>
    <div class="q-calendar__week">
      <span v-for="h in WEEK_HEADERS" :key="h" class="q-calendar__week-cell">
        {{ h }}
      </span>
    </div>
    <div class="q-calendar__grid">
      <button
        v-for="(date, index) in cells"
        :key="index"
        type="button"
        class="q-calendar__cell"
        :class="{
          'is-out': !inMonth(date, viewYear, viewMonth),
          'is-today': isSameDay(date, today),
          'is-selected': isSameDay(date, modelValue),
          'is-disabled': disabledDate && disabledDate(date),
        }"
        @click="select(date)"
      >
        {{ date.getDate() }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.q-calendar {
  width: 320px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  padding: 8px;
  background: var(--q-color-bg-card);
}
.q-calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.q-calendar__nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.q-calendar__title {
  font-weight: 600;
  color: var(--q-color-text);
}
.q-calendar__btn {
  border: 1px solid var(--q-color-border-light);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 6px);
  padding: 2px 8px;
  cursor: pointer;
}
.q-calendar__btn:hover {
  color: var(--q-color-primary);
  border-color: var(--q-color-primary);
}
.q-calendar__today {
  font-size: 12px;
}
.q-calendar__week,
.q-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.q-calendar__week-cell {
  text-align: center;
  font-size: 12px;
  color: var(--q-color-text-muted);
  padding: 4px 0;
}
.q-calendar__cell {
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 6px);
}
.q-calendar__cell:hover:not(.is-disabled) {
  background: var(--q-color-bg-secondary);
}
.q-calendar__cell.is-out {
  color: var(--q-color-text-disabled, #bbb);
}
.q-calendar__cell.is-today {
  color: var(--q-color-primary);
  font-weight: 700;
}
.q-calendar__cell.is-selected {
  background: var(--q-color-primary);
  color: var(--q-color-white);
}
.q-calendar__cell.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
