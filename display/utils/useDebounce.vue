<script lang="ts" setup>

import DemoBlock from "../../components/display/DemoBlock.vue";
import {ref} from "vue";
import {useDebounce} from "../../index";

const count = ref(0);
const debounceAdd = useDebounce(() => {
  count.value += 1
}, 500);
const code = `
\`\`\`html
<div class="container-column container-align-center">
  <span class="button-outline padding-24rem radius-third-rem user-select-none" @click="debounceAdd">
     点击我
  </span>
  {{ count }}
</div>
\`\`\`
` + `
\`\`\`ts
import {ref} from "vue";
import {useDebounce} from "@";

const count = ref(0);
const debounceAdd = useDebounce(() => {
  count.value += 1
}, 500);
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container-column container-align-center">
      <span class="button-outline padding-24rem radius-third-rem user-select-none" @click="debounceAdd">
         点击我
      </span>
      {{ count }}
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
