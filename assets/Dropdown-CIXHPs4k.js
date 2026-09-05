import{D as c}from"./DemoBlock-A_lV7GyA.js";import{d as m,o as f,c as k,w as t,a as w,e as o,u as n,aM as r,f as s,g as d,k as D}from"./index-OW0U782s.js";const _={class:"container-row gap-6"},g=`
\`\`\`html
<QDropdown :items="items" trigger="click" @select="onSelect">
  <QButton>更多操作</QButton>
</QDropdown>

<QDropdown v-model:open="open" :items="items">
  <QButton>悬停展开</QButton>
</QDropdown>
\`\`\`
`,y=m({name:"DisplayNavigationDropdown",__name:"Dropdown",setup(v){const a=D(!1),l=[{key:"view",label:"查看详情"},{key:"copy",label:"复制链接"},{key:"divider",label:"",divider:!0},{key:"delete",label:"删除",danger:!0}];function i(p){}return(p,e)=>(f(),k(c,{code:g},{default:t(()=>[w("div",_,[o(n(r),{items:l,trigger:"click",onSelect:i},{default:t(()=>[o(n(s),null,{default:t(()=>[...e[1]||(e[1]=[d("更多操作",-1)])]),_:1})]),_:1}),o(n(r),{open:a.value,"onUpdate:open":e[0]||(e[0]=u=>a.value=u),items:l},{default:t(()=>[o(n(s),{type:"default"},{default:t(()=>[...e[2]||(e[2]=[d("悬停展开",-1)])]),_:1})]),_:1},8,["open"])])]),_:1}))}});export{y as default};
