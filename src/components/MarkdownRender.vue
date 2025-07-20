<template>
  <div  class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {marked} from 'marked'
import markedKatex from 'marked-katex-extension'
import hljs from 'highlight.js'
import '../style/gitub-markdown.css'
import 'highlight.js/styles/github-dark.css'
import '../style/katex.css'
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

// props
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

// 状态
const htmlContent = ref('')

// slugify 函数：中文转拼音、生成 ID
function slugify(text) {
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
renderer.image = function (href, title, text) {
  let finalHref = href.href
  if (!finalHref.startsWith('http')) {
    finalHref = `/images/${finalHref.replace(/^\.\/images\//, '')}`
  }
  return `<img src="${finalHref}" alt="${text}" ${title ? `title="${title}"` : ''} />`
}

// 标题渲染
renderer.heading = function (text) {
  const id = slugify(text.text)
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
  highlight: (code, lang) => {
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
function parseMarkdown(content) {
  htmlContent.value = marked.parse(content)
  highlightCode()
}

// 高亮代码块
function highlightCode() {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block)
  })
}

// 处理锚点点击事件
function handleAnchorClick(e) {
  e.preventDefault()
  const targetId = e.target.getAttribute('href')
  const targetElement = document.querySelector(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({behavior: 'smooth'})
    history.pushState(null, '', targetId)
  }
}

// DOM 更新后绑定事件
function bindAnchorEvents() {
  document.querySelectorAll('a[data-anchor]').forEach((link) => {
    link.removeEventListener('click', handleAnchorClick)
    link.addEventListener('click', handleAnchorClick)
  })
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
onMounted(() => {
  parseMarkdown(props.content)
  bindAnchorEvents()
})
</script>

<style scoped>
/* 保持原有样式不变即可 */
</style>