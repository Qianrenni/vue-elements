import{D as c}from"./DemoBlock-CA-OtkyE.js";import{d as m,o as f,c as w,w as t,a as k,b as o,u as n,aY as r,e as s,f as d,i as D}from"./index-D9J2GR8y.js";const _={class:"container-row gap-6"},v=`
\`\`\`html
<QDropdown :items="items" trigger="click" @select="onSelect">
  <QButton>更多操作</QButton>
</QDropdown>

<QDropdown v-model:open="open" :items="items">
  <QButton>悬停展开</QButton>
</QDropdown>
\`\`\`
`,g=m({name:"DisplayNavigationDropdown",__name:"Dropdown",setup(y){const a=D(!1),l=[{key:"view",label:"查看详情"},{key:"copy",label:"复制链接"},{key:"divider",label:"",divider:!0},{key:"delete",label:"删除",danger:!0}];function i(p){}return(p,e)=>(f(),w(c,{code:v},{default:t(()=>[k("div",_,[o(n(r),{items:l,trigger:"click",onSelect:i},{default:t(()=>[o(n(s),null,{default:t(()=>[...e[1]||(e[1]=[d("更多操作",-1)])]),_:1})]),_:1}),o(n(r),{open:a.value,"onUpdate:open":e[0]||(e[0]=u=>a.value=u),items:l},{default:t(()=>[o(n(s),{type:"default"},{default:t(()=>[...e[2]||(e[2]=[d("悬停展开",-1)])]),_:1})]),_:1},8,["open"])])]),_:1}))}});export{g as default};
