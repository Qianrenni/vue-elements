import{D as p}from"./DemoBlock-D3lRM5dy.js";import{d as m,o as x,c as w,w as f,a as l,b as o,u as t,ae as u,g as n,a1 as V}from"./index-BM7kyQMa.js";const h={class:"container-column gap-4",style:{"max-width":"420px"}},A={class:"container flex-wrap"},T={class:"container flex-wrap"},_={class:"container flex-wrap"},b={class:"container flex-wrap"},Q={class:"container flex-wrap"},U={class:"container flex-wrap"},y=`
\`\`\`html
<!-- 基础用法（默认 3 行） -->
<QTextArea v-model:value="basicValue" placeholder="请输入内容" />

<!-- 自适应高度（限制 2~6 行） -->
<QTextArea
  v-model:value="autoSizeValue"
  :auto-size="{ minRows: 2, maxRows: 6 }"
  placeholder="输入多行内容，高度自适应"
/>

<!-- 字数统计 -->
<QTextArea
  v-model:value="countValue"
  show-count
  :max-length="200"
  placeholder="最多 200 个字符"
/>

<!-- 可清除 -->
<QTextArea v-model:value="clearValue" allow-clear @clear="onClear" />

<!-- 校验状态 / 禁用 / 只读 -->
<QTextArea v-model:value="statusValue" status="error" />
<QTextArea v-model:value="basicValue" disabled placeholder="禁用" />
<QTextArea v-model:value="basicValue" readonly />
\`\`\`
`,R=m({name:"DisplayFormTextArea",__name:"TextArea",setup(B){const s=n(""),r=n(""),v=n(""),d=n("可以一键清除的多行文本"),i=n("内容校验未通过"),c=()=>{V.info("已清空")};return(g,e)=>(x(),w(p,{code:y},{default:f(()=>[l("div",h,[l("div",A,[o(t(u),{value:s.value,"onUpdate:value":e[0]||(e[0]=a=>s.value=a),placeholder:"请输入内容"},null,8,["value"])]),l("div",T,[o(t(u),{value:r.value,"onUpdate:value":e[1]||(e[1]=a=>r.value=a),"auto-size":{minRows:2,maxRows:6},placeholder:"输入多行内容，高度自适应"},null,8,["value"])]),l("div",_,[o(t(u),{value:v.value,"onUpdate:value":e[2]||(e[2]=a=>v.value=a),"show-count":"","max-length":200,placeholder:"最多 200 个字符"},null,8,["value"])]),l("div",b,[o(t(u),{value:d.value,"onUpdate:value":e[3]||(e[3]=a=>d.value=a),"allow-clear":"",onClear:c},null,8,["value"])]),l("div",Q,[o(t(u),{value:i.value,"onUpdate:value":e[4]||(e[4]=a=>i.value=a),status:"error"},null,8,["value"])]),l("div",U,[o(t(u),{value:s.value,"onUpdate:value":e[5]||(e[5]=a=>s.value=a),disabled:"",placeholder:"禁用"},null,8,["value"]),o(t(u),{value:s.value,"onUpdate:value":e[6]||(e[6]=a=>s.value=a),readonly:""},null,8,["value"])])])]),_:1}))}});export{R as default};
