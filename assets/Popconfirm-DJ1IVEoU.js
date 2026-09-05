import{D as d}from"./DemoBlock-854NQdRU.js";import{d as m,o as l,c as u,w as e,a as p,b as o,u as a,aI as r,g as i,e as c,i as _,K as k,j as x,f as B}from"./index-Dsj8pkBt.js";const P={class:"row"},g={key:0,class:"tip"},v=`
\`\`\`html
<QPopconfirm
  title="确定删除该记录？"
  description="删除后不可恢复。"
  ok-text="删除"
>
  <QButton>删除</QButton>
</QPopconfirm>
\`\`\`
`,w=m({name:"DisplayLayoutPopconfirm",__name:"Popconfirm",setup(y){const s=x(!1);async function f(){s.value=!0,await new Promise(n=>setTimeout(n,1200)),s.value=!1}return(n,t)=>(l(),u(d,{code:v},{default:e(()=>[p("div",P,[o(a(r),{title:"确定删除该记录？",description:"删除后不可恢复。","ok-text":"删除",onConfirm:f},{default:e(()=>[o(a(i),null,{default:e(()=>[...t[0]||(t[0]=[c("异步删除",-1)])]),_:1})]),_:1}),o(a(r),{title:"确定要退出登录吗？",placement:"bottomLeft","ok-text":"退出"},{default:e(()=>[o(a(i),null,{default:e(()=>[...t[1]||(t[1]=[c("退出登录",-1)])]),_:1})]),_:1})]),s.value?(l(),_("p",g,"异步请求中（确认按钮将保持 loading）…")):k("",!0)]),_:1}))}}),N=B(w,[["__scopeId","data-v-e83a3ac0"]]);export{N as default};
