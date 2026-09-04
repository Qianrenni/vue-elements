import{d as i,o as n,c as u,w as a,a as r,b as o,u as l,E as d,e as p,ag as m,g as f,_ as v}from"./index-3RdcHt7C.js";import{D as c}from"./DemoBlock-6OThNZgy.js";const w={class:"container-column gap-6"},_=`
\`\`\`html
<template>
  <QFormButton @click="drawerVisible = true">打开抽屉</QFormButton>
  <QDrawer v-model:visible="drawerVisible" title="抽屉标题">
    <p>抽屉内容</p>
  </QDrawer>
</template>
\`\`\`
`,b=i({name:"DisplayLayoutDrawer",__name:"Drawer",setup(D){const t=f(!1);return(B,e)=>(n(),u(c,{code:_},{default:a(()=>[r("div",w,[o(l(d),{onClick:e[0]||(e[0]=s=>t.value=!0)},{default:a(()=>[...e[2]||(e[2]=[p("打开右侧抽屉",-1)])]),_:1}),o(l(m),{visible:t.value,"onUpdate:visible":e[1]||(e[1]=s=>t.value=s),title:"示例抽屉"},{default:a(()=>[...e[3]||(e[3]=[r("p",null,"这是抽屉的内容区域。",-1),r("p",null,"抽屉可以从上下左右四个方向滑出。",-1)])]),_:1},8,["visible"])])]),_:1}))}}),x=v(b,[["__scopeId","data-v-99797a82"]]);export{x as default};
