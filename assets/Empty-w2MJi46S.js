import{D as d}from"./DemoBlock-D_0QWcIO.js";import{d as u,o as p,c as n,w as t,a as y,u as s,U as m,b as a,y as r,e as l,g as f,h as v,_ as k}from"./index-By5sKUAP.js";const _={class:"empty-row"},E={key:1,class:"filled"},B=`
\`\`\`html
<!-- 默认插画 + 默认文案 -->
<QEmpty />

<!-- 自定义描述 + 底部操作 -->
<QEmpty description="暂无搜索结果">
  <QButton size="small" type="primary">重新搜索</QButton>
</QEmpty>

<!-- 简洁插画 -->
<QEmpty preset="simple" description="暂无数据" />
\`\`\`
`,Q=u({name:"DisplayEmpty",__name:"Empty",setup(x){const o=v(!0);return(C,e)=>(p(),n(d,{code:B},{default:t(()=>[y("div",_,[o.value?(p(),n(s(m),{key:0,description:"暂无数据"},{default:t(()=>[a(s(r),{size:"small",type:"primary",onClick:e[0]||(e[0]=i=>o.value=!1)},{default:t(()=>[...e[3]||(e[3]=[l("去创建",-1)])]),_:1})]),_:1})):(p(),f("div",E,[e[5]||(e[5]=l(" 已创建内容 ",-1)),a(s(r),{size:"small",onClick:e[1]||(e[1]=i=>o.value=!0)},{default:t(()=>[...e[4]||(e[4]=[l("清空",-1)])]),_:1})])),a(s(m),{description:"暂无搜索结果",preset:"simple"},{default:t(()=>[a(s(r),{size:"small",onClick:e[2]||(e[2]=i=>o.value=!0)},{default:t(()=>[...e[6]||(e[6]=[l("重新搜索",-1)])]),_:1})]),_:1})])]),_:1}))}}),w=k(Q,[["__scopeId","data-v-9340da2b"]]);export{w as default};
