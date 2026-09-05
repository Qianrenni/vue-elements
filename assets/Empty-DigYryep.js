import{D as d}from"./DemoBlock-A_lV7GyA.js";import{d as u,o as p,c as m,w as t,a as f,u as s,O as n,e as l,f as r,g as a,h as y,k,_ as v}from"./index-OW0U782s.js";const _={class:"empty-row"},E={key:1,class:"filled"},B=`
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
`,Q=u({name:"DisplayEmpty",__name:"Empty",setup(c){const o=k(!0);return(x,e)=>(p(),m(d,{code:B},{default:t(()=>[f("div",_,[o.value?(p(),m(s(n),{key:0,description:"暂无数据"},{default:t(()=>[l(s(r),{size:"small",type:"primary",onClick:e[0]||(e[0]=i=>o.value=!1)},{default:t(()=>[...e[3]||(e[3]=[a("去创建",-1)])]),_:1})]),_:1})):(p(),y("div",E,[e[5]||(e[5]=a(" 已创建内容 ",-1)),l(s(r),{size:"small",onClick:e[1]||(e[1]=i=>o.value=!0)},{default:t(()=>[...e[4]||(e[4]=[a("清空",-1)])]),_:1})])),l(s(n),{description:"暂无搜索结果",preset:"simple"},{default:t(()=>[l(s(r),{size:"small",onClick:e[2]||(e[2]=i=>o.value=!0)},{default:t(()=>[...e[6]||(e[6]=[a("重新搜索",-1)])]),_:1})]),_:1})])]),_:1}))}}),w=v(Q,[["__scopeId","data-v-9340da2b"]]);export{w as default};
