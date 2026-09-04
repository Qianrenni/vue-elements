import{d as n,o as c,c as l,w as r,a,b as p,u as d,aC as i,_}from"./index-3RdcHt7C.js";import{D as m}from"./DemoBlock-6OThNZgy.js";const u={class:"container-column gap-6 w-400"},f=`
\`\`\`html
<template>
  <QTab 
    :list="['标签一', '标签二', '标签三']"
    @select="handleSelect"
  />
</template>
\`\`\`
`,b=n({name:"DisplayNavigationTab",__name:"Tab",setup(h){const o=["标签一","标签二","标签三"],s=e=>{console.log("选中索引:",e)};return(e,t)=>(c(),l(m,{code:f},{default:r(()=>[a("div",u,[p(d(i),{list:o,onSelect:s}),t[0]||(t[0]=a("p",null,"点击标签页切换内容",-1))])]),_:1}))}}),T=_(b,[["__scopeId","data-v-33efd2b9"]]);export{T as default};
