import{D as m}from"./DemoBlock-A_lV7GyA.js";import{d,o as l,c as u,w as e,a as p,e as o,u as a,aw as r,f as c,g as i,h as _,K as k,k as x,_ as B}from"./index-OW0U782s.js";const v={class:"row"},w={key:0,class:"tip"},P=`
\`\`\`html
<QPopconfirm
  title="确定删除该记录？"
  description="删除后不可恢复。"
  ok-text="删除"
>
  <QButton>删除</QButton>
</QPopconfirm>
\`\`\`
`,y=d({name:"DisplayLayoutPopconfirm",__name:"Popconfirm",setup(C){const s=x(!1);async function f(){s.value=!0,await new Promise(n=>setTimeout(n,1200)),s.value=!1}return(n,t)=>(l(),u(m,{code:P},{default:e(()=>[p("div",v,[o(a(r),{title:"确定删除该记录？",description:"删除后不可恢复。","ok-text":"删除",onConfirm:f},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[0]||(t[0]=[i("异步删除",-1)])]),_:1})]),_:1}),o(a(r),{title:"确定要退出登录吗？",placement:"bottomLeft","ok-text":"退出"},{default:e(()=>[o(a(c),null,{default:e(()=>[...t[1]||(t[1]=[i("退出登录",-1)])]),_:1})]),_:1})]),s.value?(l(),_("p",w,"异步请求中（确认按钮将保持 loading）…")):k("",!0)]),_:1}))}}),Q=B(y,[["__scopeId","data-v-e83a3ac0"]]);export{Q as default};
