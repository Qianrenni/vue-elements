<template>
  <div
    :class="{
      'card-animation': animation,
    }"
    class="card container-column"
  >
    <div class="card-header container-space-between">
      <slot name="header" />
    </div>

    <div class="card-body container-space-between">
      <slot name="left" />
      <div class="container-flex-1">
        <slot name="default" />
      </div>
      <slot name="right" />
    </div>

    <div class="card-footer container-space-between">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CardProps } from './type';

defineOptions({
  name: 'QCard',
});

defineProps<CardProps>();
</script>

<style scoped></style>
