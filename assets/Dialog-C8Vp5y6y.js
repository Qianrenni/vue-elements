import{D as n}from"./DemoBlock-D3lRM5dy.js";import{d as r,o as p,c as u,w as a,a as o,b as i,u as s,T as d,e as m,ay as f,g as b,_ as c}from"./index-BM7kyQMa.js";const v={class:"container-column gap-6"},g=`
\`\`\`html
<template>
  <QButton type="primary" @click="dialogVisible = true">打开对话框</QButton>
  <QDialog v-model:visible="dialogVisible" title="标题">
    <p>对话框内容</p>
  </QDialog>
</template>
\`\`\`
`,_=r({name:"DisplayLayoutDialog",__name:"Dialog",setup(D){const t=b(!1);return(y,e)=>(p(),u(n,{code:g},{default:a(()=>[o("div",v,[i(s(d),{type:"primary",onClick:e[0]||(e[0]=l=>t.value=!0)},{default:a(()=>[...e[2]||(e[2]=[m("打开对话框",-1)])]),_:1}),i(s(f),{visible:t.value,"onUpdate:visible":e[1]||(e[1]=l=>t.value=l),title:"示例对话框"},{default:a(()=>[...e[3]||(e[3]=[o("p",null,"这是对话框的主要内容区域。",-1),o("p",null,"可以放置表单、文本或其他任何内容。",-1)])]),_:1},8,["visible"])])]),_:1}))}}),k=c(_,[["__scopeId","data-v-cbfbe90b"]]);export{k as default};
