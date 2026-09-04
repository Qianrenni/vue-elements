import{D as n}from"./DemoBlock-6OThNZgy.js";import{d as s,o as d,c as p,w as i,a as l,b as t,u as a,ab as o,_ as r}from"./index-3RdcHt7C.js";const c={class:"container-column gap-8 w-400"},u=`
\`\`\`html
<!-- 向下展开（默认） -->
<QCollapsibleSection direction="down" :initial-expanded="true">
  <div>可折叠内容</div>
</QCollapsibleSection>

<!-- 向上展开 -->
<QCollapsibleSection direction="up" :initial-expanded="false">
  <div>可折叠内容</div>
</QCollapsibleSection>

<!-- 隐藏箭头 -->
<QCollapsibleSection :initial-expanded="true" :is-show-arrow="false">
  <div>可折叠内容</div>
</QCollapsibleSection>
\`\`\`
`,f=s({name:"DisplayLayoutCollapsibleSection",__name:"CollapsibleSection",setup(b){return(v,e)=>(d(),p(n,{code:u},{default:i(()=>[l("div",c,[t(a(o),{direction:"down","initial-expanded":!0},{default:i(()=>[...e[0]||(e[0]=[l("div",{class:"collapsible-content"},"向下展开的内容区域",-1)])]),_:1}),t(a(o),{direction:"up","initial-expanded":!1},{default:i(()=>[...e[1]||(e[1]=[l("div",{class:"collapsible-content"},"向上展开的内容区域",-1)])]),_:1}),t(a(o),{direction:"left","initial-expanded":!0},{default:i(()=>[...e[2]||(e[2]=[l("div",{class:"collapsible-content"},"向左展开的内容区域",-1)])]),_:1}),t(a(o),{direction:"right","initial-expanded":!1},{default:i(()=>[...e[3]||(e[3]=[l("div",{class:"collapsible-content"},"向右展开的内容区域",-1)])]),_:1}),t(a(o),{"initial-expanded":!0,"is-show-arrow":!1},{default:i(()=>[...e[4]||(e[4]=[l("div",{class:"collapsible-content"},"隐藏箭头的可折叠区域",-1)])]),_:1})])]),_:1}))}}),C=r(f,[["__scopeId","data-v-2e725297"]]);export{C as default};
