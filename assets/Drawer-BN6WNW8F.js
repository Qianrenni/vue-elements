import{D as i}from"./DemoBlock-CA-OtkyE.js";import{d as n,o as p,c as u,w as a,a as r,b as o,u as l,e as d,f as m,aB as f,i as v,_ as b}from"./index-D9J2GR8y.js";const c={class:"container-column gap-6"},w=`
\`\`\`html
<template>
  <QButton type="primary" @click="drawerVisible = true">打开抽屉</QButton>
  <QDrawer v-model:visible="drawerVisible" title="抽屉标题">
    <p>抽屉内容</p>
  </QDrawer>
</template>
\`\`\`
`,_=n({name:"DisplayLayoutDrawer",__name:"Drawer",setup(D){const t=v(!1);return(y,e)=>(p(),u(i,{code:w},{default:a(()=>[r("div",c,[o(l(d),{type:"primary",onClick:e[0]||(e[0]=s=>t.value=!0)},{default:a(()=>[...e[2]||(e[2]=[m("打开右侧抽屉",-1)])]),_:1}),o(l(f),{visible:t.value,"onUpdate:visible":e[1]||(e[1]=s=>t.value=s),title:"示例抽屉"},{default:a(()=>[...e[3]||(e[3]=[r("p",null,"这是抽屉的内容区域。",-1),r("p",null,"抽屉可以从上下左右四个方向滑出。",-1)])]),_:1},8,["visible"])])]),_:1}))}}),k=b(_,[["__scopeId","data-v-3b884604"]]);export{k as default};
