import{d as n,o as d,c as u,w as l,a,e as t,u as o,O as r,R as s,h as i,_ as f}from"./index-BWAGKIrk.js";import{D as _}from"./DemoBlock-Bin6DJpm.js";const C={class:"w-400"},v=`
\`\`\`html
<template>
  <QCollapse v-model="activeNames">
    <QCollapseItem name="1" title="面板1">内容1</QCollapseItem>
    <QCollapseItem name="2" title="面板2">内容2</QCollapseItem>
  </QCollapse>
</template>
\`\`\`
`,c=n({name:"DisplayLayoutCollapse",__name:"Collapse",setup(Q){const m=i(["1"]);return(I,e)=>(d(),u(_,{code:v},{default:l(()=>[a("div",C,[t(o(r),{modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=p=>m.value=p)},{default:l(()=>[t(o(s),{name:"1",title:"面板一"},{default:l(()=>[...e[1]||(e[1]=[a("p",null,"这是面板一的内容",-1)])]),_:1}),t(o(s),{name:"2",title:"面板二"},{default:l(()=>[...e[2]||(e[2]=[a("p",null,"这是面板二的内容",-1)])]),_:1}),t(o(s),{name:"3",title:"面板三"},{default:l(()=>[...e[3]||(e[3]=[a("p",null,"这是面板三的内容",-1)])]),_:1})]),_:1},8,["modelValue"])])]),_:1}))}}),B=f(c,[["__scopeId","data-v-366618b9"]]);export{B as default};
