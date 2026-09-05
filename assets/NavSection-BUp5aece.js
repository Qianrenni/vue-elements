import{d as a,o as s,c,w as l,a as n,b as i,u as r,a$ as p,_ as u}from"./index-By45x_bw.js";import{D as d}from"./DemoBlock-ClDmiYtN.js";const m={class:"w-300"},_=`
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
`,v=a({name:"DisplayNavigationNavSection",__name:"NavSection",setup(h){const t=[{title:"首页",value:"home",children:[{title:"首页1",value:"home1"},{title:"首页2",value:"home2"}]},{title:"产品",value:"products"},{title:"关于",value:"about"}],o=e=>{console.log("选中:",e)};return(e,f)=>(s(),c(d,{code:_},{default:l(()=>[n("div",m,[i(r(p),{sections:t,title:"示例导航",onSelect:o})])]),_:1}))}}),x=u(v,[["__scopeId","data-v-3c5d6b37"]]);export{x as default};
