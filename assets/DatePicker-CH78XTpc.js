import{D as p}from"./DemoBlock-B05dVkJ_.js";import{d as c,o as k,c as b,w as D,a as l,b as t,u as s,a3 as o,t as n,g as u,_ as V}from"./index-BxZBlDCD.js";const f={class:"container-column"},_={class:"container flex-wrap"},P={class:"item"},w={class:"item"},h={class:"item"},x={class:"item"},Q={class:"item"},U={class:"tip"},g=`
\`\`\`html
<!-- 日期粒度，支持清除 -->
<QDatePicker v-model:value="dateValue" allow-clear placeholder="请选择日期" />

<!-- 月粒度 -->
<QDatePicker v-model:value="monthValue" picker="month" placeholder="请选择月份" />

<!-- 日期 + 时间 -->
<QDatePicker v-model:value="datetimeValue" show-time placeholder="请选择日期时间" />

<!-- 禁用 -->
<QDatePicker v-model:value="disabledValue" disabled />

<!-- 错误态 + 大尺寸 -->
<QDatePicker v-model:value="errorValue" status="error" size="large" placeholder="校验错误" />
\`\`\`
`,B=c({name:"DisplayFormDatePicker",__name:"DatePicker",setup(y){const i=u("2026-09-13"),r=u("2026-09"),d=u(""),v=u("2026-01-01"),m=u("");return(z,e)=>(k(),b(p,{code:g},{default:D(()=>[l("div",f,[l("div",_,[l("div",P,[e[5]||(e[5]=l("p",{class:"item-label"},"日期（可清除）",-1)),t(s(o),{value:i.value,"onUpdate:value":e[0]||(e[0]=a=>i.value=a),"allow-clear":"",placeholder:"请选择日期"},null,8,["value"])]),l("div",w,[e[6]||(e[6]=l("p",{class:"item-label"},"月粒度",-1)),t(s(o),{value:r.value,"onUpdate:value":e[1]||(e[1]=a=>r.value=a),picker:"month",placeholder:"请选择月份"},null,8,["value"])]),l("div",h,[e[7]||(e[7]=l("p",{class:"item-label"},"日期 + 时间",-1)),t(s(o),{value:d.value,"onUpdate:value":e[2]||(e[2]=a=>d.value=a),"show-time":"",placeholder:"请选择日期时间"},null,8,["value"])]),l("div",x,[e[8]||(e[8]=l("p",{class:"item-label"},"禁用",-1)),t(s(o),{value:v.value,"onUpdate:value":e[3]||(e[3]=a=>v.value=a),disabled:""},null,8,["value"])]),l("div",Q,[e[9]||(e[9]=l("p",{class:"item-label"},"错误态 / 大尺寸",-1)),t(s(o),{value:m.value,"onUpdate:value":e[4]||(e[4]=a=>m.value=a),status:"error",size:"large",placeholder:"校验错误"},null,8,["value"])])]),l("p",U," 当前值："+n(i.value||"未选择")+" / "+n(r.value||"未选择")+" / "+n(d.value||"未选择"),1)])]),_:1}))}}),q=V(B,[["__scopeId","data-v-4077cb8b"]]);export{q as default};
