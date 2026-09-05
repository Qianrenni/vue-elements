import{D as f}from"./DemoBlock-CXFQJDZo.js";import{d as l,o as y,c as g,w as p,b as r,u as m,b2 as Q,a,e as n,b3 as k,b4 as t,g as c,j as A,f as _}from"./index-CRccyhqz.js";const b=`
\`\`\`html
<!-- QApp 子树内的任意组件中： -->
<QButton type="primary" @click="notification.success('已保存')">通知</QButton>
<QButton @click="message.info('这是一条消息')">消息</QButton>
<QButton @click="modal.confirm({ title: '删除确认', content: '确定删除？' })">弹窗</QButton>

<script setup>
// 由 useQApp() 取得绑定到本 App 作用域的 message / notification / modal
const { message, notification, modal } = useQApp();
const onDelete = async () => {
  const ok = await modal.confirm({ title: '删除确认', content: '确定删除？' });
  if (ok) message.success('已删除');
};
<\/script>
\`\`\`
`,w=l({name:"DisplayThemeApp",__name:"App",setup(B){const d=l({name:"DemoAppInner",setup(){const o=k(),s=[{type:"success",label:"成功",title:"已保存"},{type:"info",label:"信息",title:"有新消息"},{type:"warning",label:"警告",title:"磁盘空间不足"},{type:"error",label:"错误",title:"网络异常"}],i=A("未操作"),u=async()=>{const e=await o.modal.confirm({title:"删除确认",content:"确定要删除这条数据吗？"});i.value=e?"已确认删除":"已取消",e&&o.message.success("删除成功")};return()=>t("div",{class:"app-demo"},[t("div",{class:"row"},s.map(e=>t(c,{type:e.type==="success"?"primary":void 0,onClick:()=>o.notification.open({type:e.type,title:e.title})},()=>e.label))),t("div",{class:"row"},["info","success","warning","error"].map(e=>t(c,{size:"small",onClick:()=>o.message[e](`作用域消息：${e}`)},()=>`message.${e}`))),t("div",{class:"row"},[t(c,{onClick:u},()=>"modal.confirm"),t(c,{onClick:async()=>{await o.modal.alert({title:"提示",content:"操作成功"})}},()=>"modal.alert")]),t("p",{class:"tip"},`modal 结果：${i.value}`)])}});return(o,s)=>(y(),g(f,{code:b},{default:p(()=>[r(m(Q),null,{default:p(()=>[r(m(d)),s[0]||(s[0]=a("p",{class:"tip"},[n(" message / notification 由 "),a("code",null,"useQApp().message"),n(" 与 "),a("code",null,"useQApp().notification"),n(" 渲染进本 QApp 根（而非 body），可继承 外层 QConfigProvider 的 CSS 变量 / 主题；"),a("code",null,"useQApp().modal"),n(" 提供 命令式 confirm / alert。 ")],-1))]),_:1})]),_:1}))}}),D=_(w,[["__scopeId","data-v-0b21d73a"]]);export{D as default};
