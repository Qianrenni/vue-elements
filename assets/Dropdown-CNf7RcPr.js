import{D as c}from"./DemoBlock-854NQdRU.js";import{d as m,o as f,c as g,w as t,a as w,b as o,u as n,aZ as r,g as s,e as d,j as k}from"./index-Dsj8pkBt.js";const D={class:"container-row gap-6"},_=`
\`\`\`html
<QDropdown :items="items" trigger="click" @select="onSelect">
  <QButton>更多操作</QButton>
</QDropdown>

<QDropdown v-model:open="open" :items="items">
  <QButton>悬停展开</QButton>
</QDropdown>
\`\`\`
`,Q=m({name:"DisplayNavigationDropdown",__name:"Dropdown",setup(v){const a=k(!1),l=[{key:"view",label:"查看详情"},{key:"copy",label:"复制链接"},{key:"divider",label:"",divider:!0},{key:"delete",label:"删除",danger:!0}];function i(p){}return(p,e)=>(f(),g(c,{code:_},{default:t(()=>[w("div",D,[o(n(r),{items:l,trigger:"click",onSelect:i},{default:t(()=>[o(n(s),null,{default:t(()=>[...e[1]||(e[1]=[d("更多操作",-1)])]),_:1})]),_:1}),o(n(r),{open:a.value,"onUpdate:open":e[0]||(e[0]=u=>a.value=u),items:l},{default:t(()=>[o(n(s),{type:"default"},{default:t(()=>[...e[2]||(e[2]=[d("悬停展开",-1)])]),_:1})]),_:1},8,["open"])])]),_:1}))}});export{Q as default};
