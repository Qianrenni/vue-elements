<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import {TimeUtils} from "../../src";
import {ref, onMounted, onUnmounted} from 'vue'


defineOptions({
  name: "DisplayTimeUtil",
})

const timeUtil = ref(new TimeUtils())
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setInterval(() => {
    timeUtil.value = new TimeUtils()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const code=`
\`\`\`js
const timeUtil = ref(new TimeUtils())
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setInterval(() => {
    timeUtil.value = new TimeUtils()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

//中文
const cn = TimeUtils.now('zh-CN');
console.log(cn.formatLocale('PPP')); // 2025年4月5日
console.log(cn.formatLocale('PP'));  // 2025年4月5日
console.log(cn.formatLocale('{weekday:long}, {month:long} {DD}, {YYYY}', 'zh-CN')); // 星期六, 四月 05, 2025

// 英文
const en = TimeUtils.now('zh-CN');
console.log(en.formatLocale('PPP')); // April 5, 2025
console.log(en.formatLocale('PPP p')); // April 5, 2025, 14:30
console.log(en.formatLocale('PPPP'))

// UTC 时间
const utc = TimeUtils.utc('2023-01-01T00:00:00Z');
console.log(utc.format()); // 2023-01-01 00:00:00 (UTC)
console.log(utc.formatLocale('PPP', 'zh-CN')); // 2023年1月1日 (UTC)

// 自定义格式
console.log(cn.formatLocale('{YYYY}年{MM}月{DD}日 {weekday:short}')); // 2025年04月05日 周六
\`\`\`
`

</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container-column">
    <h3>timeUtil.toString()</h3>
    <h1>{{timeUtil.toString()}}</h1>
    <h3>timeUtil.format('HH:mm:ss)</h3>
    <h1>{{timeUtil.format('HH:mm:ss')}}</h1>
  </div>
  <markdown-render :content="code"/>

</template>

<style scoped>

</style>
