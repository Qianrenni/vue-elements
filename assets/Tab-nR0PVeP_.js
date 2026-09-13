import{D as n}from"./DemoBlock-CA-OtkyE.js";import{d as c,o as l,c as r,w as p,a,b as i,u as _,b0 as d,_ as m}from"./index-D9J2GR8y.js";const f={class:"container-column gap-6 w-400"},u=`
\`\`\`html
<template>
  <QTab 
    :list="['标签一', '标签二', '标签三']"
    @select="handleSelect"
  />
</template>
\`\`\`
`,b=c({name:"DisplayNavigationTab",__name:"Tab",setup(h){const o=["标签一","标签二","标签三"],s=e=>{console.log("选中索引:",e)};return(e,t)=>(l(),r(n,{code:u},{default:p(()=>[a("div",f,[i(_(d),{list:o,onSelect:s}),t[0]||(t[0]=a("p",null,"点击标签页切换内容",-1))])]),_:1}))}}),T=m(b,[["__scopeId","data-v-0f802751"]]);export{T as default};
