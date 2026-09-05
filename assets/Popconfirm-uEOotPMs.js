import{D as d}from"./DemoBlock-ClDmiYtN.js";import{d as m,o as l,c as p,w as e,a as u,b as o,u as a,aI as r,p as c,e as i,f as _,H as k,h as x,_ as B}from"./index-By45x_bw.js";const P={class:"row"},v={key:0,class:"tip"},w=`
\`\`\`html
<QPopconfirm
  title="确定删除该记录？"
  description="删除后不可恢复。"
  ok-text="删除"
>
  <QButton>删除</QButton>
</QPopconfirm>
\`\`\`
`,y=m({name:"DisplayLayoutPopconfirm",__name:"Popconfirm",setup(C){const s=x(!1);async function f(){s.value=!0,await new Promise(n=>setTimeout(n,1200)),s.value=!1}return(n,t)=>(l(),p(d,{code:w},{default:e(()=>[u("div",P,[o(a(r),{title:"确定删除该记录？",description:"删除后不可恢复。","ok-text":"删除",onConfirm:f},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[0]||(t[0]=[i("异步删除",-1)])]),_:1})]),_:1}),o(a(r),{title:"确定要退出登录吗？",placement:"bottomLeft","ok-text":"退出"},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[1]||(t[1]=[i("退出登录",-1)])]),_:1})]),_:1})]),s.value?(l(),_("p",v,"异步请求中（确认按钮将保持 loading）…")):k("",!0)]),_:1}))}}),Q=B(y,[["__scopeId","data-v-e83a3ac0"]]);export{Q as default};
