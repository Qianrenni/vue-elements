<!--
 * @component QLoading
 * @description 加载组件，支持 breathing / spinner / skeleton 三种动画类型及提示文字
 -->
<template>
  <div
    v-if="props.show"
    class="gap container-w100 container-h100 container-column container-align-center"
  >
    <component :is="animationComponent" />
    <p v-if="props.text" class="text-description text-08rem animation-pulse">
      {{ props.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useLoading } from './composable';
import type { LoadingProps } from './type';

defineOptions({ name: 'QLoading' });

const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'breathing',
  show: true,
  text: '',
});

const { animationComponent } = useLoading(props);
</script>

<style scoped></style>
