import{D as a}from"./DemoBlock-B05dVkJ_.js";import{d as i,o as c,c as r,w as m,a as l,b as e,u as t,S as o,_ as d}from"./index-BxZBlDCD.js";const _={class:"tl-row"},p={style:{flex:"1","min-width":"200px"}},b=`
\`\`\`html
<!-- 默认（轴线居左） -->
<QTimeline :items="basic" />

<!-- 居中交替 + 标签 -->
<QTimeline mode="alternate" :items="labeled" />

<!-- 倒序 + 幽灵待定 -->
<QTimeline :items="labeled" reverse pending="处理中…" />
\`\`\`
`,f=i({name:"DisplayTimeline",__name:"Timeline",setup(x){const s=[{content:"创建仓库",color:"green"},{content:"发布 v1.0",color:"blue"},{content:"修复若干问题",color:"red"}],n=[{label:"2024-01",content:"第一件事",color:"green"},{label:"2024-02",content:"第二件事",color:"blue",dot:"★"},{label:"2024-03",content:"第三件事",color:"gray"}];return(u,h)=>(c(),r(a,{code:b},{default:m(()=>[l("div",_,[e(t(o),{items:s,style:{flex:"1","min-width":"200px"}}),e(t(o),{mode:"alternate",items:n,style:{flex:"1.6","min-width":"260px"}}),l("div",p,[e(t(o),{items:n,pending:"处理中…"})])])]),_:1}))}}),T=d(f,[["__scopeId","data-v-486685fa"]]);export{T as default};
