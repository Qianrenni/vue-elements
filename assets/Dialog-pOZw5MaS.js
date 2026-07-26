import{d as n,o as r,c as p,w as o,a,e as s,u as i,I as u,p as d,Q as m,g as c,_ as f}from"./index-zY1AF0ER.js";import{D as v}from"./DemoBlock-Ct33r_AN.js";const g={class:"container-column gap-6"},_=`
\`\`\`html
<template>
  <QFormButton @click="dialogVisible = true">打开对话框</QFormButton>
  <QDialog v-model:visible="dialogVisible" title="标题">
    <p>对话框内容</p>
  </QDialog>
</template>
\`\`\`
`,D=n({name:"DisplayLayoutDialog",__name:"Dialog",setup(b){const t=c(!1);return(B,e)=>(r(),p(v,{code:_},{default:o(()=>[a("div",g,[s(i(u),{onClick:e[0]||(e[0]=l=>t.value=!0)},{default:o(()=>[...e[2]||(e[2]=[d("打开对话框",-1)])]),_:1}),s(i(m),{visible:t.value,"onUpdate:visible":e[1]||(e[1]=l=>t.value=l),title:"示例对话框"},{default:o(()=>[...e[3]||(e[3]=[a("p",null,"这是对话框的主要内容区域。",-1),a("p",null,"可以放置表单、文本或其他任何内容。",-1)])]),_:1},8,["visible"])])]),_:1}))}}),x=f(D,[["__scopeId","data-v-c10cc090"]]);export{x as default};
