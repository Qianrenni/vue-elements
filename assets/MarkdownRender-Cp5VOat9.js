import{d as e,o,c as t,w as a,a as n,e as s,u as r,s as c,_ as d}from"./index-ylzpC7RR.js";import{D as m}from"./DemoBlock-C0d0BQpt.js";const p={class:"markdown-demo"},l=`
# Markdown 渲染示例

## 标题

这是 **加粗** 和 *斜体* 文本。

## 列表

- 项目 1
- 项目 2
- 项目 3

## 代码

\`\`\`javascript
console.log('Hello World');
\`\`\`

## 引用

> 这是一段引用文本

## 链接

[访问官网](https://example.com)
`,_=`
\`\`\`html
<template>
  <QMarkdownRender :content="markdownContent" />
</template>

<script setup>
const markdownContent = \`
# 标题

这是 **加粗** 文本。
\`;
<\/script>
\`\`\`
`,k=e({name:"DisplayMarkdownRender",__name:"MarkdownRender",setup(i){return(w,f)=>(o(),t(m,{code:_},{default:a(()=>[n("div",p,[s(r(c),{content:l})])]),_:1}))}}),x=d(k,[["__scopeId","data-v-9c817b6b"]]);export{x as default};
