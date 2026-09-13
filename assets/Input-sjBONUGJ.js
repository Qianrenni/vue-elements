import{D as x}from"./DemoBlock-D3lRM5dy.js";import{d as V,o as w,c as I,w as U,a as n,b as u,u as o,a5 as s,g as t,a1 as c}from"./index-BM7kyQMa.js";const h={class:"container-column gap-4",style:{"max-width":"420px"}},Q={class:"container flex-wrap"},b={class:"container flex-wrap"},y={class:"container flex-wrap"},g={class:"container flex-wrap"},z={class:"container flex-wrap"},B={class:"container flex-wrap"},C={class:"container flex-wrap"},k=`
\`\`\`html
<!-- 基础用法 -->
<QInput v-model:value="basicValue" placeholder="请输入内容" />

<!-- 前后缀图标 -->
<QInput v-model:value="affixValue" prefix="Search" suffix="User" placeholder="请输入关键字" />

<!-- 可清除 + 回车事件 -->
<QInput v-model:value="clearValue" allow-clear @press-enter="onPressEnter" @clear="onClear" />

<!-- 字数统计 -->
<QInput v-model:value="countValue" show-count :max-length="20" placeholder="最多 20 个字符" />

<!-- 密码 + 校验状态 -->
<QInput v-model:value="passwordValue" type="password" placeholder="请输入密码" />
<QInput v-model:value="statusValue" status="error" />

<!-- 尺寸 -->
<QInput v-model:value="basicValue" size="small" placeholder="小" />
<QInput v-model:value="basicValue" size="middle" placeholder="中" />
<QInput v-model:value="basicValue" size="large" placeholder="大" />

<!-- 禁用 / 只读 -->
<QInput v-model:value="basicValue" disabled placeholder="禁用" />
<QInput v-model:value="basicValue" readonly />
\`\`\`
`,P=V({name:"DisplayFormInput",__name:"Input",setup(D){const a=t(""),r=t(""),v=t("可清除的内容"),d=t(""),p=t(""),i=t("校验未通过"),m=()=>{c.info(`回车提交：${v.value||"空"}`)},f=()=>{c.info("已清空")};return(_,e)=>(w(),I(x,{code:k},{default:U(()=>[n("div",h,[n("div",Q,[u(o(s),{value:a.value,"onUpdate:value":e[0]||(e[0]=l=>a.value=l),placeholder:"请输入内容"},null,8,["value"])]),n("div",b,[u(o(s),{value:r.value,"onUpdate:value":e[1]||(e[1]=l=>r.value=l),prefix:"Search",suffix:"User",placeholder:"请输入关键字"},null,8,["value"])]),n("div",y,[u(o(s),{value:v.value,"onUpdate:value":e[2]||(e[2]=l=>v.value=l),"allow-clear":"",onPressEnter:m,onClear:f},null,8,["value"])]),n("div",g,[u(o(s),{value:d.value,"onUpdate:value":e[3]||(e[3]=l=>d.value=l),"show-count":"","max-length":20,placeholder:"最多 20 个字符"},null,8,["value"])]),n("div",z,[u(o(s),{value:p.value,"onUpdate:value":e[4]||(e[4]=l=>p.value=l),type:"password",placeholder:"请输入密码"},null,8,["value"]),u(o(s),{value:i.value,"onUpdate:value":e[5]||(e[5]=l=>i.value=l),status:"error"},null,8,["value"])]),n("div",B,[u(o(s),{value:a.value,"onUpdate:value":e[6]||(e[6]=l=>a.value=l),size:"small",placeholder:"小"},null,8,["value"]),u(o(s),{value:a.value,"onUpdate:value":e[7]||(e[7]=l=>a.value=l),size:"middle",placeholder:"中"},null,8,["value"]),u(o(s),{value:a.value,"onUpdate:value":e[8]||(e[8]=l=>a.value=l),size:"large",placeholder:"大"},null,8,["value"])]),n("div",C,[u(o(s),{value:a.value,"onUpdate:value":e[9]||(e[9]=l=>a.value=l),disabled:"",placeholder:"禁用"},null,8,["value"]),u(o(s),{value:a.value,"onUpdate:value":e[10]||(e[10]=l=>a.value=l),readonly:""},null,8,["value"])])])]),_:1}))}});export{P as default};
