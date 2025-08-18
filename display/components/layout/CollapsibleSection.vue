<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import CollapsibleSection from "@/components/layout/CollapsibleSection.vue";


const code = `
  <div class="container">
    <CollapsibleSection  style="width: 100%;">
      <div>
        <span>down</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection   direction="left">
      <div>
        <span>left</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection  style="width: 100%;" direction="right">
      <div>
        <span>right</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection direction="up" style="width: 100%;">
      <div>
        <span>up</span>
      </div>
    </CollapsibleSection>
  </div>`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container">
        <CollapsibleSection style="width: 100%;">
          <div>
            <span>down</span>
          </div>
        </CollapsibleSection>
      </div>
      <div class="container">
        <CollapsibleSection direction="left">
          <div>
            <span>left</span>
          </div>
        </CollapsibleSection>
      </div>
      <div class="container">
        <CollapsibleSection direction="right" style="width: 100%;">
          <div>
            <span>right</span>
          </div>
        </CollapsibleSection>
      </div>
      <div class="container">
        <CollapsibleSection direction="up" style="width: 100%;">
          <div>
            <span>up</span>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
