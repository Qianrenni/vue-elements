import{D as d}from"./DemoBlock-D4wge8Xk.js";import{d as u,o as m,c as k,w as e,a,b as n,u as s,g as i,e as r,Y as v,f as B}from"./index-ZsCVvRa6.js";const C={class:"row"},y=`
\`\`\`html
<QButton @click="notify.success({ title: '保存成功', description: '你的修改已保存。' })">
  Success
</QButton>
\`\`\`
`,N=u({name:"DisplayBasicNotification",__name:"Notification",setup(x){const f=v,l=(p,t,o)=>{f.open({type:p,title:t,description:o})};return(p,t)=>(m(),k(d,{code:y},{default:e(()=>[a("div",C,[n(s(i),{type:"primary",onClick:t[0]||(t[0]=o=>l("success","保存成功","你的修改已保存。"))},{default:e(()=>[...t[5]||(t[5]=[r(" 成功 ",-1)])]),_:1}),n(s(i),{onClick:t[1]||(t[1]=o=>l("info","系统通知","有新消息，请注意查收。"))},{default:e(()=>[...t[6]||(t[6]=[r(" 信息 ",-1)])]),_:1}),n(s(i),{onClick:t[2]||(t[2]=o=>l("warning","磁盘空间不足","建议及时清理无用文件。"))},{default:e(()=>[...t[7]||(t[7]=[r(" 警告 ",-1)])]),_:1}),n(s(i),{onClick:t[3]||(t[3]=o=>l("error","请求失败","网络异常，请稍后重试。"))},{default:e(()=>[...t[8]||(t[8]=[r(" 错误 ",-1)])]),_:1}),n(s(i),{onClick:t[4]||(t[4]=o=>s(f).open({type:"success",title:"底部弹窗",description:"使用 bottomLeft 位置。",placement:"bottomLeft"}))},{default:e(()=>[...t[9]||(t[9]=[r(" 底部位置 ",-1)])]),_:1})]),t[10]||(t[10]=a("p",{class:"tip"},"默认右上角弹出，4.5 秒自动关闭；通知顶部可手动 × 关闭。",-1))]),_:1}))}}),w=B(N,[["__scopeId","data-v-04e42d47"]]);export{w as default};
