import{D as f}from"./DemoBlock-D_0QWcIO.js";import{d as m,o as l,c as u,w as e,a as p,b as o,u as a,aI as r,y as c,e as i,g as _,K as k,h as x,_ as y}from"./index-By5sKUAP.js";const B={class:"row"},P={key:0,class:"tip"},v=`
\`\`\`html
<QPopconfirm
  title="确定删除该记录？"
  description="删除后不可恢复。"
  ok-text="删除"
>
  <QButton>删除</QButton>
</QPopconfirm>
\`\`\`
`,w=m({name:"DisplayLayoutPopconfirm",__name:"Popconfirm",setup(g){const s=x(!1);async function d(){s.value=!0,await new Promise(n=>setTimeout(n,1200)),s.value=!1}return(n,t)=>(l(),u(f,{code:v},{default:e(()=>[p("div",B,[o(a(r),{title:"确定删除该记录？",description:"删除后不可恢复。","ok-text":"删除",onConfirm:d},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[0]||(t[0]=[i("异步删除",-1)])]),_:1})]),_:1}),o(a(r),{title:"确定要退出登录吗？",placement:"bottomLeft","ok-text":"退出"},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[1]||(t[1]=[i("退出登录",-1)])]),_:1})]),_:1})]),s.value?(l(),_("p",P,"异步请求中（确认按钮将保持 loading）…")):k("",!0)]),_:1}))}}),N=y(w,[["__scopeId","data-v-e83a3ac0"]]);export{N as default};
