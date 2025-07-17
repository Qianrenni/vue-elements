<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import IconGroups from "../../src/components/IconGroups.vue";
defineOptions({
  name: "DisplayDisplayIconGroups",
})
const code=`
# Props
\`\`\`json
{
  vertical: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type:  Boolean,
    default: true
  },
  //变换时间
  duration: {
    type: Number,
    default: 500
  },
  indicator: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String  as () => 'center-bottom' | 'center-top' | 'left-bottom' | 'left-top' | 'left-center' | 'right-bottom' | 'right-top' | 'right-center',
    default: 'center-bottom'
  },
  width:{
    type: Number,
    required: true
  },
  height:{
    type: Number,
    required: true
  },
  //间隔时间
  interval:{
    type: Number,
    default: 1500
  },
  //轮播方向
  direction:{
    type: String,
    default: 'next',
    validator(value:string) {
      return ['next', 'prev'].includes(value)
    }
  },
  showButton:{
    type: Boolean,
    default: true
  }

}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container-flex-start  margin-vetical gap" >
    <IconGroups/>
  </div>
</template>

<style scoped>

</style>
