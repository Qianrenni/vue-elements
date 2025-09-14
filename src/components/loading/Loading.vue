<template>
  <div v-if="show"
       class="loading-content gap container-w100 container-h100
              container-column container-align-center"
  >
    <component
        :is="animationComponent"
    />
    <p v-if="text" class="text-description text-08rem">{{ text }}</p>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'Loading'
})
const props = withDefaults(defineProps<{
  type?: 'breathing' | 'spinner' | 'skeleton'
  show?: boolean,
  text?: string,
}>(), {
  type: 'breathing',
  show: true,
  text: '',
})
// import component
import Breathing from "@/components/loading/animations/Breathing.vue";
import Spinner from "@/components/loading/animations/Spinner.vue";
import Skeleton from "@/components/loading/animations/Skeleton.vue";

const animationMap = {
  'breathing': Breathing,
  'spinner': Spinner,
  'skeleton': Skeleton,
}
const animationComponent = animationMap[props.type] || Breathing
</script>
<style scoped>
</style>