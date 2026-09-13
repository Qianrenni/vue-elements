import{D as i}from"./DemoBlock-D3lRM5dy.js";import{d as n,o as p,c as u,w as a,a as r,b as o,u as l,T as d,e as m,az as f,g as v,_ as c}from"./index-BM7kyQMa.js";const w={class:"container-column gap-6"},_=`
\`\`\`html
<template>
  <QButton type="primary" @click="drawerVisible = true">打开抽屉</QButton>
  <QDrawer v-model:visible="drawerVisible" title="抽屉标题">
    <p>抽屉内容</p>
  </QDrawer>
</template>
\`\`\`
`,b=n({name:"DisplayLayoutDrawer",__name:"Drawer",setup(D){const t=v(!1);return(y,e)=>(p(),u(i,{code:_},{default:a(()=>[r("div",w,[o(l(d),{type:"primary",onClick:e[0]||(e[0]=s=>t.value=!0)},{default:a(()=>[...e[2]||(e[2]=[m("打开右侧抽屉",-1)])]),_:1}),o(l(f),{visible:t.value,"onUpdate:visible":e[1]||(e[1]=s=>t.value=s),title:"示例抽屉"},{default:a(()=>[...e[3]||(e[3]=[r("p",null,"这是抽屉的内容区域。",-1),r("p",null,"抽屉可以从上下左右四个方向滑出。",-1)])]),_:1},8,["visible"])])]),_:1}))}}),k=c(b,[["__scopeId","data-v-3b884604"]]);export{k as default};
