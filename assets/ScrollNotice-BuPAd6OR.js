import{d as a,o as r,c as d,w as o,a as i,e as t,u as l,I as s,p as c,_ as n}from"./index-ugmjvJmX.js";import{D as p}from"./DemoBlock-BhWeZx4P.js";const _={class:"container-column gap-6"},u=`
\`\`\`html
<!-- 基础用法 -->
<QScrollNotice>
  这是一条滚动通知消息
</QScrollNotice>

<!-- 自定义速度 -->
<QScrollNotice :speed="2">
  更快的滚动速度
</QScrollNotice>

<QScrollNotice :speed="0.5">
  更慢的滚动速度
</QScrollNotice>
\`\`\`
`,N=a({name:"DisplayScrollNotice",__name:"ScrollNotice",setup(f){return(m,e)=>(r(),d(p,{code:u},{default:o(()=>[i("div",_,[t(l(s),null,{default:o(()=>[...e[0]||(e[0]=[c(" 这是一条默认的滚动通知消息，用于显示重要提示信息 ",-1)])]),_:1}),t(l(s),{speed:2},{default:o(()=>[...e[1]||(e[1]=[c(" 这是快速滚动的通知消息，速度为2像素/帧 ",-1)])]),_:1}),t(l(s),{speed:.5},{default:o(()=>[...e[2]||(e[2]=[c(" 这是慢速滚动的通知消息，速度为0.5像素/帧 ",-1)])]),_:1})])]),_:1}))}}),x=n(N,[["__scopeId","data-v-285e0431"]]);export{x as default};
