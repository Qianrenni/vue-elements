import{D as u}from"./DemoBlock-A_lV7GyA.js";import{d as o,o as f,c as d,w as a,e as s,u as n,aR as m,a as c,g as i,aS as y,aT as r,f as _,_ as A}from"./index-OW0U782s.js";const Q=`
\`\`\`html
<!-- QApp 子树内的任意组件中： -->
<QButton type="primary" @click="notification.success('已保存')">成功</QButton>

<script setup>
// 由 useQApp() 取得绑定到本 App 作用域的 notification
const { notification } = useQApp();
<\/script>
\`\`\`
`,b=o({name:"DisplayThemeApp",__name:"App",setup(B){const l=o({name:"DemoAppInner",setup(){const p=y(),e=[{type:"success",label:"成功",title:"已保存"},{type:"info",label:"信息",title:"有新消息"},{type:"warning",label:"警告",title:"磁盘空间不足"},{type:"error",label:"错误",title:"网络异常"}];return()=>r("div",{class:"row"},e.map(t=>r(_,{type:t.type==="success"?"primary":void 0,onClick:()=>p.notification.open({type:t.type,title:t.title})},()=>t.label)))}});return(p,e)=>(f(),d(u,{code:Q},{default:a(()=>[s(n(m),null,{default:a(()=>[s(n(l)),e[0]||(e[0]=c("p",{class:"tip"},[i(" 通知由 "),c("code",null,"useQApp().notification"),i(" 渲染进本 QApp 根（而非 body），可继承外层 QConfigProvider 的 CSS 变量 / 主题。 ")],-1))]),_:1})]),_:1}))}}),C=A(b,[["__scopeId","data-v-584bf711"]]);export{C as default};
