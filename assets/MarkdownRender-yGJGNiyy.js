import{D as e}from"./DemoBlock-D3lRM5dy.js";import{d as o,o as t,c as a,w as n,a as s,b as r,u as c,y as d,_ as m}from"./index-BM7kyQMa.js";const p={class:"markdown-demo"},l=`
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
`,k=o({name:"DisplayMarkdownRender",__name:"MarkdownRender",setup(i){return(w,f)=>(t(),a(e,{code:_},{default:n(()=>[s("div",p,[r(c(d),{content:l})])]),_:1}))}}),x=m(k,[["__scopeId","data-v-98fa9e3e"]]);export{x as default};
