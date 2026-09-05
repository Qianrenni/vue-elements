import{D as l}from"./DemoBlock-DMksGsUm.js";import{d as u,o as n,c,w as r,b as t,u as s,N as e,a,f as i}from"./index-Calvsw3q.js";const p={class:"row"},d=`
\`\`\`html
<QResult
  status="success"
  title="提交成功"
  sub-title="我们将在 1 个工作日内完成审核。"
>
  <template #extra>
    <QButton type="primary">再次提交</QButton>
  </template>
</QResult>
<QResult status="404" title="页面不存在" />
\`\`\`
`,m=u({name:"DisplayResult",__name:"Result",setup(_){return(b,o)=>(n(),c(l,{code:d},{default:r(()=>[t(s(e),{status:"success",title:"提交成功","sub-title":"我们将在 1 个工作日内完成审核，可在通知中心查看进度。",style:{border:"1px solid var(--q-color-gray-200)","border-radius":"8px"}},{extra:r(()=>[...o[0]||(o[0]=[a("div",{class:"extra"},[a("button",{class:"btn btn--primary",type:"button"},"返回首页"),a("button",{class:"btn",type:"button"},"查看详情")],-1)])]),_:1}),a("div",p,[t(s(e),{status:"error",title:"处理失败"}),t(s(e),{status:"warning",title:"存在未配置项"}),t(s(e),{status:"404",title:"页面不存在"})])]),_:1}))}}),y=i(m,[["__scopeId","data-v-91588c71"]]);export{y as default};
