import{D as p}from"./DemoBlock-A_lV7GyA.js";import{d as r,o as u,c as y,w as v,a as s,e as c,u as i,aN as m,k as o,_}from"./index-OW0U782s.js";const k={class:"container-column gap-8"},K={class:"menu-box"},b={class:"menu-box"},f=`
\`\`\`html
<QMenu
  mode="inline"
  :items="items"
  v-model:selectedKeys="selected"
  v-model:openKeys="open"
/>

<QMenu mode="horizontal" :items="items" />
\`\`\`
`,x=r({name:"DisplayNavigationMenu",__name:"Menu",setup(h){const t=[{key:"nav",label:"导航",children:[{key:"menu",label:"菜单"},{key:"dropdown",label:"下拉菜单"},{key:"anchor",label:"锚点"}]},{key:"components",label:"组件"},{key:"utils",label:"工具函数"},{key:"danger",label:"危险操作",danger:!0}],l=o(["components"]),a=o(["nav"]),d=o(["components"]);return(M,e)=>(u(),y(p,{code:f},{default:v(()=>[s("div",k,[s("div",K,[c(i(m),{mode:"inline",items:t,selectedKeys:l.value,"onUpdate:selectedKeys":e[0]||(e[0]=n=>l.value=n),openKeys:a.value,"onUpdate:openKeys":e[1]||(e[1]=n=>a.value=n)},null,8,["selectedKeys","openKeys"])]),s("div",b,[c(i(m),{mode:"horizontal",items:t,selectedKeys:d.value,"onUpdate:selectedKeys":e[2]||(e[2]=n=>d.value=n)},null,8,["selectedKeys"])])])]),_:1}))}}),N=_(x,[["__scopeId","data-v-e480d13c"]]);export{N as default};
