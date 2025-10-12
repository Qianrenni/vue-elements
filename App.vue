<template>
  <div >
    {{ isLessThan768 }}
  </div>
</template>
<script lang="ts" setup>
import { useScreenSize } from './src';
const isLessThan768 = useScreenSize.getWidth(768);
</script>
<style lang="css" scoped>

</style>