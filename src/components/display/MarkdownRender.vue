<template>
  <div class="markdown-container">
    <div class="markdown-body" v-html="htmlContent"></div>
    <span
        v-if="showCopy&&props.content.trim()!==''"
        class="copy" @click.prevent="copyHandler"><Icon
        icon="Copy" size="16"></Icon></span>
    <!-- 悬浮目录 -->
    <div
        v-if="toc.length>0"
        :class="{ 'toc-collapsed': !tocExpanded }" class="floating-toc">
      <div class="toc-header" @click="toggleToc">
        <span v-if="tocExpanded">目录</span>
        <div v-else class="toc-icon">
          <Icon icon="Minus"></Icon>
        </div>
      </div>
      <div v-show="tocExpanded" class="toc-content scroll-container scroll-y">
        <div
            v-for="item in toc"
            :key="item.id"
            :class="{ [`level-${item.level}`]: true }"
            class="toc-item"
            @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onBeforeMount, ref, watch} from 'vue'
import {marked} from 'marked'
import markedKatex from 'marked-katex-extension'
import hljs from 'highlight.js'
import '@/style/gitub-markdown.css'
import 'highlight.js/styles/github-dark.css'
import '@/style/katex.css'
import {pinyin} from 'pinyin-pro'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/vbscript-html'
import typescript from 'highlight.js/lib/languages/typescript'
import kotlin from 'highlight.js/lib/languages/kotlin'
import cplus from 'highlight.js/lib/languages/cpp'
import c from 'highlight.js/lib/languages/c'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import Icon from "@/components/basic/Icon.vue";

hljs.registerLanguage('java', java)
// 注册语言
hljs.registerLanguage('python', python)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('c++', cplus)
hljs.registerLanguage('c', c)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)


defineOptions({
  name: 'MarkdownRender'
})
// props
const props = withDefaults(defineProps<{
  content: string,
  showCopy?: boolean
}>(), {
  showCopy: true
})

// 状态
const htmlContent = ref('')
// toc
const toc = ref<{ id: string, text: string, level: number }[]>([])
// 目录展开状态
const tocExpanded = ref(false)

// 切换目录展开/收起
function toggleToc() {
  tocExpanded.value = !tocExpanded.value
}

// 点击目录项滚动到对应位置
function scrollToHeading(id: string) {
  scrollToId(id)
}

// slugify 函数：中文转拼音、生成 ID
function slugify(text: string) {
  return text
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[\u4e00-\u9fa5]/g, (char) => pinyin(char))
      .replace(/[^a-z\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
}

// 自定义 renderer
const renderer = new marked.Renderer()

// 图片渲染
renderer.image = function ({href, title, text}) {
  let finalHref = href
  if (!finalHref.startsWith('http')) {
    finalHref = `/images/${finalHref.replace(/^\.\/images\//, '')}`
  }
  return `<img src="${finalHref}" alt="${text}" ${title ? `title="${title}"` : ''} />`
}

// 标题渲染
renderer.heading = function (text) {
  const id = slugify(text.text);
  toc.value.push({id, text: text.text, level: text.depth})
  return `<h${text.depth} id="${id}">${text.text.replace(/\*+/g, '')}</h${text.depth}>`
}

// 链接渲染
renderer.link = (payload) => {
  const href = payload.href
  const text = payload.text
  const title = payload.title || ''
  if (href && href.startsWith('#')) {
    return `<a href="#${slugify(href)}" data-anchor>${text}</a>`
  }
  return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank">${text}</a>`
}

// 配置 marked
marked.use(markedKatex({output: 'mathml', strict: false, throwOnError: false}))
marked.setOptions({
  highlight: function (code: string, lang: string) {
    if (!lang) return hljs.highlight(code, {language: 'plaintext'}).value
    try {
      return hljs.highlight(code, {language: lang}).value
    } catch (e) {
      console.warn(`Highlight.js 无法识别语言：${lang}，已自动降级为 plaintext`)
      return hljs.highlight(code, {language: 'plaintext'}).value
    }
  },
  renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
  langPrefix: 'language-'
})

// 解析 Markdown
async function parseMarkdown(content: string) {
  // 清空toc
  toc.value = []
  htmlContent.value = await marked.parse(content)
  nextTick(() => {
    highlightCode()
    bindAnchorEvents()
  })
}

// 高亮代码块v
function highlightCode() {
  document.querySelectorAll('pre code').forEach((block) => {
    if (!block.hasAttribute('data-highlighted')) {
      hljs.highlightElement(<HTMLElement>block)
    }
  })
}

// 滚动到指定 ID
function scrollToId(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({behavior: 'smooth'})
    history.pushState(null, '', '#' + id)
  }
}

// 处理锚点点击事件
function handleAnchorClick(e: MouseEvent) {
  e.preventDefault()
  const targetId = (e.target as HTMLAnchorElement)?.getAttribute('href')
  if (!targetId) return
  if (targetId.startsWith('#')) {
    scrollToId(targetId.slice(1))
  }
}

// DOM 更新后绑定事件
function bindAnchorEvents() {
  const links = document.querySelectorAll('a[data-anchor]')
  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement
    anchor.removeEventListener('click', handleAnchorClick)
    anchor.addEventListener('click', handleAnchorClick)
  })
}

const copyHandler = async () => {
  navigator.clipboard.writeText(props.content)
}
// 监听 content 变化
watch(
    () => props.content,
    (newVal) => {
      parseMarkdown(newVal)
    },
    {immediate: true}
)

// mounted 生命周期
onBeforeMount(() => {
  parseMarkdown(props.content)

})
defineExpose({
  /**
   * 获取目录结构
   */
  getTOC() {
    return toc.value
  },

  /**
   * 滚动到指定标题 ID
   * @param id 标题的 ID（不含 #）
   */
  scrollTo(id: string) {
    scrollToId(id)
  },

  /**
   * 获取原始内容
   */
  getContent() {
    return props.content
  }
})
</script>

<style scoped>
.markdown-container {
  position: relative;
}

.copy {
  display: flex;
  justify-content: flex-end;
}

.floating-toc {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 10px var(--box-shadow);
  transition: all 0.3s ease;
  z-index: 1000;
  max-width: 300px;
  max-height: 60vh;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.toc-collapsed {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.toc-header {
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toc-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.toc-content {
  max-height: calc(60vh - 40px);
  overflow-y: auto;
}

.toc-item {
  padding: 4px 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s;
}

.toc-item:hover {
  background-color: var(--gray-100);
  color: var(--primary-color);
}

.level-1 {
  font-weight: bold;
  margin-left: 0;
}

.level-2 {
  margin-left: 12px;
}

.level-3 {
  margin-left: 24px;
  font-size: 0.95em;
}

.level-4, .level-5, .level-6 {
  margin-left: 36px;
  font-size: 0.9em;
  color: var(--subtle-text-color);
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .floating-toc {
    top: 10px;
    right: 10px;
    max-width: 250px;
  }

  .toc-collapsed {
    width: 32px;
    height: 32px;
  }
}
</style>
