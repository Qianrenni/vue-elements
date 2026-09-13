import{D as a}from"./DemoBlock-D3lRM5dy.js";import{d as s,o as c,c as l,w as n,a as i,b as r,u as p,aZ as u,_ as d}from"./index-BM7kyQMa.js";const m={class:"w-300"},_=`
\`\`\`html
<template>
  <QNavSection 
    :sections="sections"
    title="导航"
    @select="handleSelect"
  />
</template>

<script setup>
const sections = [
  { title: '首页', value: 'home' },
  { title: '产品', value: 'products' },
];
<\\/script>
\`\`\`
`,v=s({name:"DisplayNavigationNavSection",__name:"NavSection",setup(h){const t=[{title:"首页",value:"home",children:[{title:"首页1",value:"home1"},{title:"首页2",value:"home2"}]},{title:"产品",value:"products"},{title:"关于",value:"about"}],o=e=>{console.log("选中:",e)};return(e,f)=>(c(),l(a,{code:_},{default:n(()=>[i("div",m,[r(p(u),{sections:t,title:"示例导航",onSelect:o})])]),_:1}))}}),w=d(v,[["__scopeId","data-v-7d0935e5"]]);export{w as default};
